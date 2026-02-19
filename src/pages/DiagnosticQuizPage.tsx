import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { quizzes } from "@/data/quizData";
import { courses } from "@/data/courseContent";
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Brain, Target, Sparkles } from "lucide-react";

const courseColors: Record<string, { accent: string; badge: string; bg: string; btn: "cosmos" | "cosmosGold" | "cosmosOutline" }> = {
  "pre-calculus": {
    accent: "text-cosmos-gold",
    badge: "bg-cosmos-gold/10 text-cosmos-gold border-cosmos-gold/30",
    bg: "bg-cosmos-gold/10",
    btn: "cosmosGold",
  },
  "calculus-1": {
    accent: "text-cosmos-cyan",
    badge: "bg-cosmos-cyan/10 text-cosmos-cyan border-cosmos-cyan/30",
    bg: "bg-cosmos-cyan/10",
    btn: "cosmos",
  },
  "calculus-2": {
    accent: "text-cosmos-teal",
    badge: "bg-cosmos-teal/10 text-cosmos-teal border-cosmos-teal/30",
    bg: "bg-cosmos-teal/10",
    btn: "cosmos",
  },
  "calculus-3": {
    accent: "text-cosmos-cyan",
    badge: "bg-cosmos-cyan/10 text-cosmos-cyan border-cosmos-cyan/30",
    bg: "bg-cosmos-cyan/10",
    btn: "cosmos",
  },
};

function classifyResult(correct: number, total: number): { level: string; icon: string; description: string; startUnit: number } {
  const pct = correct / total;
  if (pct >= 0.75) return { level: "Advanced", icon: "🚀", description: "Excellent! You have a strong grasp of the material. Start at the advanced units to challenge yourself.", startUnit: 3 };
  if (pct >= 0.5) return { level: "Intermediate", icon: "⚙️", description: "Good foundation! You understand the basics but have room to deepen your knowledge. Start at Unit 2.", startUnit: 2 };
  return { level: "Beginner", icon: "🌱", description: "No worries — everyone starts somewhere! Begin from the first unit and build a solid foundation step by step.", startUnit: 1 };
}

export default function DiagnosticQuizPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const questions = quizzes[courseId ?? ""] ?? [];
  const course = courses[courseId ?? ""];
  const c = courseColors[courseId ?? "calculus-1"];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [done, setDone] = useState(false);

  if (!course || questions.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Quiz not found.</p>
          <Button variant="cosmos" onClick={() => navigate("/courses")}>Back to Courses</Button>
        </div>
      </div>
    );
  }

  const q = questions[current];

  const handleSelect = (idx: number) => {
    if (confirmed) return;
    setSelected(idx);
  };

  const handleConfirm = () => {
    if (selected === null) return;
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
    setConfirmed(true);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
      setConfirmed(false);
    } else {
      setDone(true);
    }
  };

  const correctCount = answers.filter((a, i) => a === questions[i].correctIndex).length;
  const result = classifyResult(correctCount, questions.length);

  if (done) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-28 pb-20 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="card-cosmos rounded-2xl p-10 border border-secondary text-center mb-8 animate-fade-in-up">
              <div className="text-6xl mb-4">{result.icon}</div>
              <div className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border ${c.badge} mb-4`}>
                {result.level} Level
              </div>
              <h1 className="font-display font-bold text-4xl text-foreground mb-3">
                Diagnostic Complete!
              </h1>
              <p className={`text-xl font-semibold mb-2 ${c.accent}`}>
                {correctCount} / {questions.length} correct ({Math.round((correctCount / questions.length) * 100)}%)
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">{result.description}</p>

              {/* Score breakdown */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: "Correct", value: correctCount, color: "text-green-400" },
                  { label: "Incorrect", value: questions.length - correctCount, color: "text-red-400" },
                  { label: "Total", value: questions.length, color: c.accent },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl p-4" style={{ background: "hsl(var(--secondary))" }}>
                    <div className={`text-3xl font-bold font-display ${s.color}`}>{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Suggested starting point */}
              <div className={`rounded-xl p-5 mb-8 border ${c.badge.includes("gold") ? "border-cosmos-gold/25" : c.badge.includes("teal") ? "border-cosmos-teal/25" : "border-cosmos-cyan/25"} ${c.bg}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4" />
                  <span className="font-semibold text-sm">Recommended Starting Point</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Begin at <strong>Unit {Math.min(result.startUnit, course.units.length)}: {course.units[Math.min(result.startUnit, course.units.length) - 1]?.title}</strong>
                </p>
              </div>

              <div className="flex gap-4">
                <Button variant="cosmosOutline" className="flex-1" onClick={() => navigate("/courses")}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> All Courses
                </Button>
                <Button variant={c.btn} className="flex-1" onClick={() => navigate(`/courses/${courseId}`)}>
                  Start Learning <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Question Review */}
            <div className="space-y-4">
              <h2 className="font-display font-semibold text-lg text-foreground">Review Answers</h2>
              {questions.map((q, i) => {
                const userAns = answers[i];
                const correct = userAns === q.correctIndex;
                return (
                  <div key={q.id} className="card-cosmos rounded-xl p-5 border border-secondary">
                    <div className="flex items-start gap-3 mb-3">
                      {correct ? (
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      )}
                      <p className="text-sm font-medium text-foreground">{q.question}</p>
                    </div>
                    {!correct && (
                      <div className="ml-8 mb-2">
                        <p className="text-xs text-red-400 mb-1">Your answer: {userAns !== null ? q.options[userAns] : "—"}</p>
                        <p className="text-xs text-green-400 mb-1">Correct: {q.options[q.correctIndex]}</p>
                      </div>
                    )}
                    <div className="ml-8">
                      <p className="text-xs text-muted-foreground italic">{q.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    );
  }

  const progress = ((current) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-28 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link to="/courses" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Courses
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <Brain className="w-5 h-5 text-muted-foreground" />
              <span className={`text-xs font-semibold tracking-widest uppercase ${c.accent}`}>Skill Diagnostic</span>
            </div>
            <h1 className="font-display font-bold text-3xl text-foreground">{course.title} — Placement Quiz</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {questions.length} questions · Classifies you as Beginner, Intermediate, or Advanced
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Question {current + 1} of {questions.length}</span>
              <span className={`font-medium ${c.accent}`}>{Math.round(progress)}% complete</span>
            </div>
            <div className="w-full h-2 rounded-full" style={{ background: "hsl(var(--secondary))" }}>
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  background: c.accent.includes("gold")
                    ? "hsl(var(--star-gold))"
                    : c.accent.includes("teal")
                    ? "hsl(var(--nebula-teal))"
                    : "hsl(var(--nebula-cyan))",
                }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="card-cosmos rounded-2xl p-8 border border-secondary mb-6 animate-fade-in-up">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: "hsl(var(--secondary))", color: "hsl(var(--muted-foreground))" }}>
                {q.difficulty.toUpperCase()}
              </span>
            </div>
            <h2 className="font-display font-semibold text-xl text-foreground mb-6 leading-relaxed">{q.question}</h2>

            <div className="space-y-3">
              {q.options.map((opt, idx) => {
                let optStyle = "border-secondary text-foreground hover:border-opacity-60";
                let bg = "hsl(var(--secondary))";

                if (confirmed) {
                  if (idx === q.correctIndex) {
                    optStyle = "border-green-500/50 text-green-300";
                    bg = "hsl(142 70% 45% / 0.12)";
                  } else if (idx === selected && idx !== q.correctIndex) {
                    optStyle = "border-red-500/50 text-red-300";
                    bg = "hsl(0 84% 60% / 0.12)";
                  }
                } else if (idx === selected) {
                  optStyle = c.accent.includes("gold")
                    ? "border-cosmos-gold/60 text-cosmos-gold"
                    : c.accent.includes("teal")
                    ? "border-cosmos-teal/60 text-cosmos-teal"
                    : "border-cosmos-cyan/60 text-cosmos-cyan";
                  bg = c.accent.includes("gold")
                    ? "hsl(var(--star-gold) / 0.1)"
                    : c.accent.includes("teal")
                    ? "hsl(var(--nebula-teal) / 0.1)"
                    : "hsl(var(--nebula-cyan) / 0.1)";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={confirmed}
                    className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 text-sm font-medium ${optStyle} ${!confirmed ? "cursor-pointer hover:opacity-90" : ""}`}
                    style={{ background: bg }}
                  >
                    <span className="text-muted-foreground mr-3 font-bold text-xs">
                      {["A", "B", "C", "D"][idx]}.
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {confirmed && (
              <div className="mt-5 p-4 rounded-xl" style={{ background: "hsl(var(--muted))" }}>
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-cosmos-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-cosmos-gold mb-1">Explanation</p>
                    <p className="text-sm text-muted-foreground">{q.explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            {!confirmed ? (
              <Button
                variant={c.btn}
                className="w-full"
                disabled={selected === null}
                onClick={handleConfirm}
              >
                Confirm Answer
              </Button>
            ) : (
              <Button variant={c.btn} className="w-full" onClick={handleNext}>
                {current < questions.length - 1 ? "Next Question" : "See Results"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
