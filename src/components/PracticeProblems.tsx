import { useState } from "react";
import { practiceProblems } from "@/data/practiceProblems";
import { MathText } from "@/components/MathRenderer";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Brain, RotateCcw } from "lucide-react";

const STORAGE_KEY = "orbit_practice_scores";

function loadScores(): Record<string, { correct: number; total: number }> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

function saveScores(s: Record<string, { correct: number; total: number }>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

export function PracticeProblems({ lessonId }: { lessonId: string }) {
  const questions = practiceProblems[lessonId];
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!questions || questions.length === 0) return null;

  const q = questions[current];
  const isCorrect = selected === q.correctIndex;

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === q.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      // Save score
      const finalScore = score; // already updated
      const scores = loadScores();
      scores[lessonId] = { correct: finalScore, total: questions.length };
      saveScores(scores);
      setFinished(true);
    }
  };

  const handleReset = () => {
    setCurrent(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="card-cosmos rounded-xl p-6 border border-secondary mb-6">
        <div className="text-center">
          <Brain className="w-10 h-10 mx-auto mb-3 text-cosmos-cyan" />
          <h3 className="font-display font-bold text-xl text-foreground mb-1">Practice Complete!</h3>
          <p className="text-3xl font-bold text-cosmos-cyan mb-1">{score}/{questions.length}</p>
          <p className="text-sm text-muted-foreground mb-4">{pct}% correct</p>
          <Button variant="cosmosOutline" size="sm" onClick={handleReset}>
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="card-cosmos rounded-xl p-6 border border-secondary mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
          <Brain className="w-5 h-5 text-cosmos-cyan" /> Practice Problems
        </h2>
        <span className="text-xs text-muted-foreground font-medium">
          {current + 1} / {questions.length} · Score: {score}
        </span>
      </div>

      {/* Progress dots */}
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

      {/* Question */}
      <div className="mb-5">
        <p className="text-foreground font-medium leading-relaxed">
          <MathText text={q.question} />
        </p>
      </div>

      {/* Choices */}
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
              {showResult && i === q.correctIndex && <CheckCircle className="w-4 h-4 text-green-400 ml-auto flex-shrink-0" />}
              {showResult && i === selected && !isCorrect && i !== q.correctIndex && <XCircle className="w-4 h-4 text-red-400 ml-auto flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showResult && (
        <div className={`rounded-lg p-4 mb-4 text-sm border ${isCorrect ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5"}`}>
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
  );
}
