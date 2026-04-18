import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { StarField } from "@/components/StarField";
import { Button } from "@/components/ui/button";
import { courses } from "@/data/courseContent";
import { Trophy, Medal, Award, Timer, Brain, Trash2 } from "lucide-react";
import { BADGES } from "@/lib/achievements";
import type { LeaderboardEntry } from "./CumulativePracticePage";

const LEADERBOARD_KEY = "orbit_leaderboard";

function loadEntries(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(loadEntries);
  const [filterMode, setFilterMode] = useState<"all" | "classic" | "timed">("all");

  const grouped = useMemo(() => {
    const filtered = filterMode === "all" ? entries : entries.filter((e) => e.mode === filterMode);
    const byCourse: Record<string, LeaderboardEntry[]> = {};
    Object.keys(courses).forEach((id) => (byCourse[id] = []));
    filtered.forEach((e) => {
      if (!byCourse[e.courseId]) byCourse[e.courseId] = [];
      byCourse[e.courseId].push(e);
    });
    // Sort each course by points desc (timed) or correct desc (classic), top 10
    Object.keys(byCourse).forEach((id) => {
      byCourse[id].sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        return b.correct - a.correct;
      });
      byCourse[id] = byCourse[id].slice(0, 10);
    });
    return byCourse;
  }, [entries, filterMode]);

  const handleClear = () => {
    if (confirm("Clear all leaderboard entries? This cannot be undone.")) {
      localStorage.removeItem(LEADERBOARD_KEY);
      setEntries([]);
    }
  };

  const totalEntries = entries.length;

  return (
    <div className="min-h-screen bg-background relative">
      <StarField />
      <Navbar />
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center mb-8">
          <Trophy className="w-12 h-12 mx-auto mb-4 text-cosmos-gold" />
          <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-3">
            Leaderboard
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Top scores from cumulative practice quizzes, ranked by points across each course.
          </p>
        </div>

        {/* Achievements legend */}
        <div className="card-cosmos rounded-xl p-5 border border-secondary mb-6">
          <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
            Achievements
          </h3>
          <div className="grid sm:grid-cols-3 gap-3">
            {Object.values(BADGES).map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.id} className={`flex items-start gap-2.5 p-2.5 rounded-lg border ${b.bgClass}`}>
                  <Icon className={`w-5 h-5 ${b.colorClass} flex-shrink-0 mt-0.5`} />
                  <div>
                    <p className={`text-sm font-bold ${b.colorClass}`}>{b.label}</p>
                    <p className="text-[11px] text-muted-foreground leading-tight">{b.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter & actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex gap-2">
            <Button
              variant={filterMode === "all" ? "cosmos" : "cosmosOutline"}
              size="sm"
              onClick={() => setFilterMode("all")}
            >
              All
            </Button>
            <Button
              variant={filterMode === "classic" ? "cosmos" : "cosmosOutline"}
              size="sm"
              onClick={() => setFilterMode("classic")}
            >
              <Brain className="w-3.5 h-3.5 mr-1" /> Classic
            </Button>
            <Button
              variant={filterMode === "timed" ? "cosmosGold" : "cosmosOutline"}
              size="sm"
              onClick={() => setFilterMode("timed")}
            >
              <Timer className="w-3.5 h-3.5 mr-1" /> Timed
            </Button>
          </div>
          {totalEntries > 0 && (
            <Button variant="ghost" size="sm" onClick={handleClear} className="text-muted-foreground hover:text-red-400">
              <Trash2 className="w-3.5 h-3.5 mr-1" /> Clear All
            </Button>
          )}
        </div>

        {totalEntries === 0 && (
          <div className="card-cosmos rounded-xl p-12 border border-secondary text-center">
            <Trophy className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-40" />
            <h3 className="font-display font-semibold text-xl text-foreground mb-2">
              No scores yet
            </h3>
            <p className="text-sm text-muted-foreground mb-5">
              Complete a cumulative practice quiz to appear on the leaderboard.
            </p>
            <Button variant="cosmos" asChild>
              <a href="/practice">Start a Quiz</a>
            </Button>
          </div>
        )}

        {/* Per-course boards */}
        <div className="grid lg:grid-cols-2 gap-5">
          {Object.entries(grouped).map(([courseId, courseEntries]) => {
            const course = courses[courseId];
            if (!course) return null;
            return (
              <div key={courseId} className="card-cosmos rounded-xl p-5 border border-secondary">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-secondary">
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground">
                      {course.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{course.subtitle}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {courseEntries.length} {courseEntries.length === 1 ? "entry" : "entries"}
                  </span>
                </div>

                {courseEntries.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6">
                    No entries yet — be the first!
                  </p>
                ) : (
                  <ol className="space-y-2">
                    {courseEntries.map((e, i) => {
                      const rank = i + 1;
                      const RankIcon = rank === 1 ? Trophy : rank === 2 ? Medal : rank === 3 ? Award : null;
                      const rankColor =
                        rank === 1
                          ? "text-cosmos-gold"
                          : rank === 2
                            ? "text-muted-foreground"
                            : rank === 3
                              ? "text-orange-400"
                              : "text-muted-foreground";
                      const pct = Math.round((e.correct / e.total) * 100);
                      return (
                        <li
                          key={e.id}
                          className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                            rank <= 3 ? "border-cosmos-gold/20 bg-cosmos-gold/5" : "border-secondary/50"
                          }`}
                        >
                          <div className={`w-7 flex justify-center ${rankColor}`}>
                            {RankIcon ? <RankIcon className="w-5 h-5" /> : <span className="font-bold text-sm">{rank}</span>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-foreground tabular-nums">{e.points} pts</span>
                              <span
                                className={`text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded ${
                                  e.mode === "timed"
                                    ? "bg-cosmos-gold/15 text-cosmos-gold"
                                    : "bg-cosmos-cyan/15 text-cosmos-cyan"
                                }`}
                              >
                                {e.mode}
                              </span>
                              {e.badges?.map((bid) => {
                                const b = BADGES[bid];
                                if (!b) return null;
                                const Icon = b.icon;
                                return (
                                  <span
                                    key={bid}
                                    title={`${b.label} — ${b.description}`}
                                    className={`inline-flex items-center justify-center w-5 h-5 rounded-full border ${b.bgClass}`}
                                  >
                                    <Icon className={`w-3 h-3 ${b.colorClass}`} />
                                  </span>
                                );
                              })}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {e.correct}/{e.total} correct · {pct}% · {formatDate(e.date)}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
