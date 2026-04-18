import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { StarField } from "@/components/StarField";
import { Button } from "@/components/ui/button";
import { MathText } from "@/components/MathRenderer";
import { courses } from "@/data/courseContent";
import { practiceProblems, type PracticeQuestion } from "@/data/practiceProblems";
import { CheckCircle, XCircle, Brain, RotateCcw, Trophy, Shuffle, ArrowLeft } from "lucide-react";

type QuizQuestion = PracticeQuestion & { lessonId: string; lessonTitle: string };

const STORAGE_KEY = "orbit_cumulative_scores";

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

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const QUIZ_LENGTH = 10;

export default function CumulativePracticePage() {
  const navigate = useNavigate();
  const [courseId, setCourseId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<{ q: QuizQuestion; selected: number }[]>([]);

  const highScores = loadHighScores();

  const startQuiz = (id: string) => {
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
    setQuestions(picked);
    setCurrent(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
    setAnswers([]);
  };

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    const q = questions[current];
    if (idx === q.correctIndex) setScore((s) => s + 1);
    setAnswers((a) => [...a, { q, selected: idx }]);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      if (courseId) saveHighScore(courseId, score, questions.length);
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
                <button
                  key={c.id}
                  onClick={() => startQuiz(c.id)}
                  disabled={totalQs === 0}
                  className="card-cosmos rounded-xl p-6 border border-secondary text-left hover:border-cosmos-cyan/60 transition-all disabled:opacity-40 disabled:cursor-not-allowed group"
                >
                  <h3 className="font-display font-semibold text-xl text-foreground mb-1 group-hover:text-cosmos-cyan transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{c.subtitle}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{totalQs} questions in pool</span>
                    {hs && (
                      <span className="flex items-center gap-1 text-cosmos-gold font-semibold">
                        <Trophy className="w-3 h-3" /> Best: {hs.best}/{hs.total}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
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
              <p className="text-5xl font-bold text-cosmos-cyan mb-2">
                {score}/{questions.length}
              </p>
              <p className="text-muted-foreground">{pct}% correct</p>
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
                          <p className="text-xs text-muted-foreground mb-1">{a.q.lessonTitle}</p>
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

            <div className="flex gap-3 justify-center">
              <Button variant="cosmosOutline" onClick={handleReset}>
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Choose Course
              </Button>
              <Button variant="cosmos" onClick={() => courseId && startQuiz(courseId)}>
                <RotateCcw className="w-4 h-4 mr-1.5" /> Retake Quiz
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
              <Brain className="w-5 h-5 text-cosmos-cyan" />
              {courses[courseId].title} · Cumulative
            </h2>
            <span className="text-xs text-muted-foreground font-medium">
              {current + 1} / {questions.length} · Score: {score}
            </span>
          </div>

          <div className="flex gap-1.5 mb-5">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  i < current ? "bg-cosmos-cyan" : i === current ? "bg-cosmos-cyan/50" : "bg-secondary"
                }`}
              />
            ))}
          </div>

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
              <p className={`font-semibold mb-1 ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
              </p>
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
