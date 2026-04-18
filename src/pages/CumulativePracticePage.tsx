import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { StarField } from "@/components/StarField";
import { Button } from "@/components/ui/button";
import { MathText } from "@/components/MathRenderer";
import { courses } from "@/data/courseContent";
import { practiceProblems, type PracticeQuestion } from "@/data/practiceProblems";
import { CheckCircle, XCircle, Brain, RotateCcw, Trophy, Shuffle, ArrowLeft, Timer, Zap } from "lucide-react";
import { BADGES, computeBadges, type BadgeId } from "@/lib/achievements";

type QuizQuestion = PracticeQuestion & { lessonId: string; lessonTitle: string };
type Mode = "classic" | "timed";

const STORAGE_KEY = "orbit_cumulative_scores";
const LEADERBOARD_KEY = "orbit_leaderboard";
const QUIZ_LENGTH = 10;
const TIME_PER_Q = 60; // seconds
const BASE_POINTS = 100;
const MAX_BONUS = 100; // up to +100 for instant correct answer

export type LeaderboardEntry = {
  id: string;
  courseId: string;
  mode: Mode;
  correct: number;
  total: number;
  points: number;
  date: string;
  fastestCorrectSeconds?: number | null;
  badges?: BadgeId[];
};

function loadHighScores(): Record<string, { best: number; total: number; date: string }> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

function saveHighScore(courseId: string, correct: number, total: number) {
  const scores = loadHighScores();
  const prev = scores[courseId];
  if (!prev || correct > prev.best) {
    scores[courseId] = { best: correct, total, date: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  }
}

function saveToLeaderboard(entry: Omit<LeaderboardEntry, "id" | "date">) {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    const list: LeaderboardEntry[] = raw ? JSON.parse(raw) : [];
    list.push({ ...entry, id: crypto.randomUUID(), date: new Date().toISOString() });
    // Keep only top 200 most recent across all
    const trimmed = list.slice(-200);
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(trimmed));
  } catch {}
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function CumulativePracticePage() {
  const [courseId, setCourseId] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("classic");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [points, setPoints] = useState(0);
  const [lastBonus, setLastBonus] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<{ q: QuizQuestion; selected: number | null; bonus: number; secondsTaken: number | null }[]>([]);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_Q);
  const [earnedBadges, setEarnedBadges] = useState<BadgeId[]>([]);
  const questionStartRef = useRef<number>(Date.now());

  const highScores = loadHighScores();

  // Timer effect for timed mode
  useEffect(() => {
    if (mode !== "timed" || !courseId || finished || showResult) return;
    if (timeLeft <= 0) {
      // Time's up — auto-submit as wrong
      const q = questions[current];
      setShowResult(true);
      setSelected(-1);
      setAnswers((a) => [...a, { q, selected: null, bonus: 0, secondsTaken: TIME_PER_Q }]);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, mode, courseId, finished, showResult, current, questions]);

  const startQuiz = (id: string, m: Mode) => {
    const course = courses[id];
    if (!course) return;
    const pool: QuizQuestion[] = [];
    course.units.forEach((u) =>
      u.lessons.forEach((l) => {
        const probs = practiceProblems[l.id];
        if (probs) probs.forEach((p) => pool.push({ ...p, lessonId: l.id, lessonTitle: l.title }));
      })
    );
    const picked = shuffle(pool).slice(0, Math.min(QUIZ_LENGTH, pool.length));
    setCourseId(id);
    setMode(m);
    setQuestions(picked);
    setCurrent(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setPoints(0);
    setLastBonus(0);
    setFinished(false);
    setAnswers([]);
    setEarnedBadges([]);
    setTimeLeft(TIME_PER_Q);
    questionStartRef.current = Date.now();
  };

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    const q = questions[current];
    const isCorrect = idx === q.correctIndex;
    const secondsTaken =
      mode === "timed"
        ? TIME_PER_Q - timeLeft
        : Math.round((Date.now() - questionStartRef.current) / 1000);
    let bonus = 0;
    if (isCorrect) {
      setScore((s) => s + 1);
      if (mode === "timed") {
        bonus = Math.round((timeLeft / TIME_PER_Q) * MAX_BONUS);
        setPoints((p) => p + BASE_POINTS + bonus);
      } else {
        setPoints((p) => p + BASE_POINTS);
      }
    }
    setLastBonus(bonus);
    setAnswers((a) => [...a, { q, selected: idx, bonus, secondsTaken }]);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowResult(false);
      setLastBonus(0);
      setTimeLeft(TIME_PER_Q);
      questionStartRef.current = Date.now();
    } else {
      if (courseId) {
        const correctTimes = answers
          .filter((a) => a.selected === a.q.correctIndex && a.secondsTaken !== null)
          .map((a) => a.secondsTaken as number);
        const fastestCorrectSeconds = correctTimes.length > 0 ? Math.min(...correctTimes) : null;
        const badges = computeBadges({
          mode,
          correct: score,
          total: questions.length,
          points,
          fastestCorrectSeconds,
        });
        setEarnedBadges(badges);
        saveHighScore(courseId, score, questions.length);
        saveToLeaderboard({
          courseId,
          mode,
          correct: score,
          total: questions.length,
          points,
          fastestCorrectSeconds,
          badges,
        });
      }
      setFinished(true);
    }
  };

  const handleReset = () => {
    setCourseId(null);
    setQuestions([]);
    setFinished(false);
  };

  // ── Course Selector ──
  if (!courseId) {
    return (
      <div className="min-h-screen bg-background relative">
        <StarField />
        <Navbar />
        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-20">
          <div className="text-center mb-10">
            <Shuffle className="w-12 h-12 mx-auto mb-4 text-cosmos-cyan" />
            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-3">
              Cumulative Practice
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Test your mastery with {QUIZ_LENGTH} randomized questions drawn from every lesson in a course.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {Object.values(courses).map((c) => {
              const totalQs = c.units.reduce(
                (sum, u) => sum + u.lessons.reduce((s, l) => s + (practiceProblems[l.id]?.length || 0), 0),
                0
              );
              const hs = highScores[c.id];
              return (
                <div
                  key={c.id}
                  className="card-cosmos rounded-xl p-6 border border-secondary"
                >
                  <h3 className="font-display font-semibold text-xl text-foreground mb-1">
                    {c.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{c.subtitle}</p>
                  <div className="flex items-center justify-between text-xs mb-4">
                    <span className="text-muted-foreground">{totalQs} questions in pool</span>
                    {hs && (
                      <span className="flex items-center gap-1 text-cosmos-gold font-semibold">
                        <Trophy className="w-3 h-3" /> Best: {hs.best}/{hs.total}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="cosmosOutline"
                      size="sm"
                      className="flex-1"
                      disabled={totalQs === 0}
                      onClick={() => startQuiz(c.id, "classic")}
                    >
                      <Brain className="w-3.5 h-3.5 mr-1" /> Classic
                    </Button>
                    <Button
                      variant="cosmosGold"
                      size="sm"
                      className="flex-1"
                      disabled={totalQs === 0}
                      onClick={() => startQuiz(c.id, "timed")}
                    >
                      <Timer className="w-3.5 h-3.5 mr-1" /> Timed
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 card-cosmos rounded-xl p-5 border border-secondary text-sm text-muted-foreground">
            <p className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-cosmos-gold mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-foreground">Timed mode:</strong> {TIME_PER_Q} seconds per question.
                Earn {BASE_POINTS} points for each correct answer plus up to +{MAX_BONUS} bonus points
                based on how quickly you respond.
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Results ──
  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    const passed = pct >= 70;
    return (
      <div className="min-h-screen bg-background relative">
        <StarField />
        <Navbar />
        <div className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-20">
          <div className="card-cosmos rounded-xl p-8 border border-secondary">
            <div className="text-center mb-8">
              <Trophy className={`w-16 h-16 mx-auto mb-4 ${passed ? "text-cosmos-gold" : "text-muted-foreground"}`} />
              <h2 className="font-display font-bold text-3xl text-foreground mb-2">
                {passed ? "Excellent Work!" : "Keep Practicing"}
              </h2>
              <p className="text-5xl font-bold text-cosmos-cyan mb-1">
                {score}/{questions.length}
              </p>
              <p className="text-muted-foreground mb-3">{pct}% correct</p>
              {mode === "timed" && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cosmos-gold/10 border border-cosmos-gold/30">
                  <Zap className="w-4 h-4 text-cosmos-gold" />
                  <span className="font-bold text-cosmos-gold">{points} points</span>
                </div>
              )}
            </div>

            <div className="border-t border-secondary pt-6 mb-6">
              <h3 className="font-semibold text-foreground mb-4">Review Answers</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {answers.map((a, i) => {
                  const correct = a.selected === a.q.correctIndex;
                  return (
                    <div
                      key={i}
                      className={`p-3 rounded-lg border text-sm ${correct ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5"}`}
                    >
                      <div className="flex items-start gap-2">
                        {correct ? (
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-xs text-muted-foreground">{a.q.lessonTitle}</p>
                            {correct && a.bonus > 0 && (
                              <span className="text-xs text-cosmos-gold font-semibold">+{a.bonus} bonus</span>
                            )}
                          </div>
                          <div className="text-foreground">
                            <MathText text={a.q.question} />
                          </div>
                          {!correct && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Correct: <MathText text={a.q.choices[a.q.correctIndex]} />
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <Button variant="cosmosOutline" onClick={handleReset}>
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Choose Course
              </Button>
              <Button variant="cosmos" onClick={() => courseId && startQuiz(courseId, mode)}>
                <RotateCcw className="w-4 h-4 mr-1.5" /> Retake ({mode})
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Quiz In Progress ──
  const q = questions[current];
  const isCorrect = selected === q.correctIndex;
  const timedOut = mode === "timed" && timeLeft <= 0 && selected === -1;

  return (
    <div className="min-h-screen bg-background relative">
      <StarField />
      <Navbar />
      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-20">
        <button
          onClick={handleReset}
          className="text-sm text-muted-foreground hover:text-cosmos-cyan transition-colors mb-4 flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Exit Quiz
        </button>

        <div className="card-cosmos rounded-xl p-6 md:p-8 border border-secondary">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
              {mode === "timed" ? <Timer className="w-5 h-5 text-cosmos-gold" /> : <Brain className="w-5 h-5 text-cosmos-cyan" />}
              {courses[courseId].title} · {mode === "timed" ? "Timed" : "Classic"}
            </h2>
            <div className="flex items-center gap-3 text-xs font-medium">
              <span className="text-muted-foreground">
                {current + 1}/{questions.length}
              </span>
              <span className="text-muted-foreground">Score: {score}</span>
              {mode === "timed" && (
                <span className="text-cosmos-gold font-bold flex items-center gap-1">
                  <Zap className="w-3 h-3" /> {points} pts
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-1.5 mb-4">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  i < current ? "bg-cosmos-cyan" : i === current ? "bg-cosmos-cyan/50" : "bg-secondary"
                }`}
              />
            ))}
          </div>

          {/* Timer bar */}
          {mode === "timed" && !showResult && (
            <div className="mb-5">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Timer className="w-3 h-3" /> Time remaining
                </span>
                <span
                  className={`font-bold tabular-nums ${
                    timeLeft <= 10 ? "text-red-400" : timeLeft <= 30 ? "text-cosmos-gold" : "text-cosmos-cyan"
                  }`}
                >
                  {timeLeft}s
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ease-linear ${
                    timeLeft <= 10 ? "bg-red-500" : timeLeft <= 30 ? "bg-cosmos-gold" : "bg-cosmos-cyan"
                  }`}
                  style={{ width: `${(timeLeft / TIME_PER_Q) * 100}%` }}
                />
              </div>
            </div>
          )}

          <p className="text-xs text-cosmos-gold mb-2 font-medium">From: {q.lessonTitle}</p>
          <div className="mb-5">
            <p className="text-foreground font-medium leading-relaxed">
              <MathText text={q.question} />
            </p>
          </div>

          <div className="space-y-2.5 mb-5">
            {q.choices.map((choice, i) => {
              let borderClass = "border-secondary hover:border-cosmos-cyan/40";
              let bgClass = "hover:bg-secondary/40";
              if (showResult) {
                if (i === q.correctIndex) {
                  borderClass = "border-green-500/50";
                  bgClass = "bg-green-500/10";
                } else if (i === selected && !isCorrect) {
                  borderClass = "border-red-500/50";
                  bgClass = "bg-red-500/10";
                } else {
                  borderClass = "border-secondary/50 opacity-50";
                  bgClass = "";
                }
              }
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={showResult}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all text-sm flex items-center gap-3 ${borderClass} ${bgClass}`}
                >
                  <span className="w-6 h-6 rounded-full border border-secondary flex items-center justify-center text-xs font-bold text-muted-foreground flex-shrink-0">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-foreground">
                    <MathText text={choice} />
                  </span>
                  {showResult && i === q.correctIndex && (
                    <CheckCircle className="w-4 h-4 text-green-400 ml-auto flex-shrink-0" />
                  )}
                  {showResult && i === selected && !isCorrect && (
                    <XCircle className="w-4 h-4 text-red-400 ml-auto flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div
              className={`rounded-lg p-4 mb-4 text-sm border ${isCorrect ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5"}`}
            >
              <div className="flex items-center justify-between mb-1">
                <p className={`font-semibold ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                  {timedOut ? "⏱ Time's Up!" : isCorrect ? "✓ Correct!" : "✗ Incorrect"}
                </p>
                {isCorrect && mode === "timed" && lastBonus > 0 && (
                  <span className="text-xs font-bold text-cosmos-gold flex items-center gap-1">
                    <Zap className="w-3 h-3" /> +{BASE_POINTS} +{lastBonus} bonus
                  </span>
                )}
              </div>
              <p className="text-muted-foreground">
                <MathText text={q.explanation} />
              </p>
            </div>
          )}

          {showResult && (
            <div className="flex justify-end">
              <Button variant="cosmos" size="sm" onClick={handleNext}>
                {current < questions.length - 1 ? "Next Question" : "See Results"} →
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
