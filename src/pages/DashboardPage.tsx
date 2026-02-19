import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { courses } from "@/data/courseContent";
import { useProgress } from "@/hooks/useProgress";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
} from "recharts";
import { ArrowRight, RotateCcw, BookOpen, CheckCircle, Star, Telescope, Brain } from "lucide-react";

const COURSE_ORDER = ["pre-calculus", "calculus-1", "calculus-2", "calculus-3"];
const COURSE_LABELS: Record<string, string> = {
  "pre-calculus": "Pre-Calc",
  "calculus-1": "Calc I",
  "calculus-2": "Calc II",
  "calculus-3": "Calc III",
};
const COURSE_COLORS: Record<string, string> = {
  "pre-calculus": "hsl(43 96% 56%)",
  "calculus-1": "hsl(191 97% 55%)",
  "calculus-2": "hsl(174 72% 45%)",
  "calculus-3": "hsl(191 97% 55%)",
};
const COURSE_BADGE: Record<string, string> = {
  "pre-calculus": "bg-cosmos-gold/10 text-cosmos-gold border-cosmos-gold/30",
  "calculus-1": "bg-cosmos-cyan/10 text-cosmos-cyan border-cosmos-cyan/30",
  "calculus-2": "bg-cosmos-teal/10 text-cosmos-teal border-cosmos-teal/30",
  "calculus-3": "bg-cosmos-cyan/10 text-cosmos-cyan border-cosmos-cyan/30",
};
const COURSE_BTN: Record<string, "cosmos" | "cosmosGold"> = {
  "pre-calculus": "cosmosGold",
  "calculus-1": "cosmos",
  "calculus-2": "cosmos",
  "calculus-3": "cosmos",
};

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { value: number; name: string }[] }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg px-3 py-2 text-xs shadow-xl" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))" }}>
        <p className="font-semibold">{payload[0].value}% complete</p>
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const { getCourseStats, getUnitStats, isCompleted, markComplete, markIncomplete, resetProgress } = useProgress();

  const overallStats = COURSE_ORDER.map((id) => getCourseStats(id));
  const totalLessons = overallStats.reduce((a, s) => a + s.total, 0);
  const totalCompleted = overallStats.reduce((a, s) => a + s.completed, 0);
  const overallPct = totalLessons ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  // Radar chart data (mastery by course)
  const radarData = COURSE_ORDER.map((id) => ({
    subject: COURSE_LABELS[id],
    value: getCourseStats(id).pct,
    fullMark: 100,
  }));

  // Bar chart data
  const barData = COURSE_ORDER.map((id) => ({
    name: COURSE_LABELS[id],
    pct: getCourseStats(id).pct,
    id,
  }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <p className="text-cosmos-cyan text-sm font-medium tracking-widest uppercase mb-3">
              Mission Control
            </p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="font-display font-bold text-5xl text-foreground">Your Dashboard</h1>
                <p className="text-muted-foreground mt-2">Track your constellation of knowledge across all courses.</p>
              </div>
              <Button
                variant="cosmosOutline"
                onClick={() => {
                  if (confirm("Reset all progress? This cannot be undone.")) resetProgress();
                }}
                className="flex items-center gap-2 self-start md:self-auto"
              >
                <RotateCcw className="w-4 h-4" /> Reset Progress
              </Button>
            </div>
          </div>

          {/* Overall Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Total Lessons", value: totalLessons, icon: BookOpen, color: "text-cosmos-cyan" },
              { label: "Completed", value: totalCompleted, icon: CheckCircle, color: "text-green-400" },
              { label: "Remaining", value: totalLessons - totalCompleted, icon: Star, color: "text-cosmos-gold" },
              { label: "Overall Progress", value: `${overallPct}%`, icon: Telescope, color: "text-cosmos-teal" },
            ].map((s) => (
              <div key={s.label} className="card-cosmos rounded-xl p-5 border border-secondary">
                <s.icon className={`w-5 h-5 mb-3 ${s.color}`} />
                <div className={`font-display font-bold text-3xl mb-1 ${s.color}`}>{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Radar — Mastery Map */}
            <div className="card-cosmos rounded-2xl p-6 border border-secondary">
              <h2 className="font-display font-semibold text-lg text-foreground mb-1">Mastery Constellation</h2>
              <p className="text-xs text-muted-foreground mb-6">Your completion percentage across all four courses</p>
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <Radar
                    name="Mastery"
                    dataKey="value"
                    stroke="hsl(191 97% 55%)"
                    fill="hsl(191 97% 55%)"
                    fillOpacity={0.25}
                    dot={{ fill: "hsl(191 97% 55%)", r: 4 }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Bar — Progress per course */}
            <div className="card-cosmos rounded-2xl p-6 border border-secondary">
              <h2 className="font-display font-semibold text-lg text-foreground mb-1">Course Progress</h2>
              <p className="text-xs text-muted-foreground mb-6">Percentage of lessons completed per course</p>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={barData} barSize={32}>
                  <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="pct" radius={[6, 6, 0, 0]}>
                    {barData.map((entry) => (
                      <Cell key={entry.id} fill={COURSE_COLORS[entry.id]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Constellation Map — per course lesson tracking */}
          <h2 className="font-display font-bold text-2xl text-foreground mb-6">Lesson Constellation Map</h2>
          <div className="space-y-8">
            {COURSE_ORDER.map((courseId) => {
              const course = courses[courseId];
              const stats = getCourseStats(courseId);
              const badge = COURSE_BADGE[courseId];
              const color = COURSE_COLORS[courseId];
              const btn = COURSE_BTN[courseId];

              return (
                <div key={courseId} className="card-cosmos rounded-2xl border border-secondary overflow-hidden">
                  {/* Course header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between p-6 pb-4 gap-4">
                    <div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${badge} mr-3`}>
                        {course.subtitle}
                      </span>
                      <h3 className="font-display font-bold text-xl text-foreground mt-2">{course.title}</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-display font-bold text-2xl" style={{ color }}>
                          {stats.pct}%
                        </div>
                        <div className="text-xs text-muted-foreground">{stats.completed}/{stats.total} lessons</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="cosmosOutline" size="sm" onClick={() => navigate(`/quiz/${courseId}`)}>
                          <Brain className="w-3.5 h-3.5 mr-1" /> Quiz
                        </Button>
                        <Button variant={btn} size="sm" onClick={() => navigate(`/courses/${courseId}`)}>
                          Continue <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mx-6 mb-5 h-1.5 rounded-full" style={{ background: "hsl(var(--secondary))" }}>
                    <div
                      className="h-1.5 rounded-full transition-all duration-700"
                      style={{ width: `${stats.pct}%`, background: color }}
                    />
                  </div>

                  {/* Units & Lessons as constellation nodes */}
                  <div className="px-6 pb-6 space-y-5">
                    {course.units.map((unit, ui) => {
                      const uStats = getUnitStats(courseId, ui);
                      return (
                        <div key={unit.unit}>
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                              Unit {unit.unit} · {unit.title}
                            </p>
                            <span className="text-xs text-muted-foreground">{uStats.completed}/{uStats.total}</span>
                          </div>
                          {/* Lesson nodes */}
                          <div className="flex flex-wrap gap-2">
                            {unit.lessons.map((lesson, li) => {
                              const done = isCompleted(lesson.id);
                              return (
                                <button
                                  key={lesson.id}
                                  title={lesson.title}
                                  onClick={() => done ? markIncomplete(lesson.id) : markComplete(lesson.id)}
                                  className={`group relative flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-all duration-200 ${
                                    done
                                      ? "border-transparent text-background"
                                      : "border-secondary text-muted-foreground hover:text-foreground hover:border-opacity-60"
                                  }`}
                                  style={done ? { background: color } : { background: "hsl(var(--secondary))" }}
                                >
                                  {done ? (
                                    <CheckCircle className="w-3 h-3 flex-shrink-0" />
                                  ) : (
                                    <div
                                      className="w-2 h-2 rounded-full flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity"
                                      style={{ background: color }}
                                    />
                                  )}
                                  <span className="hidden sm:inline max-w-[120px] truncate">{lesson.title}</span>
                                  <span className="sm:hidden">L{li + 1}</span>
                                </button>
                              );
                            })}
                          </div>
                          {/* Unit progress bar */}
                          <div className="mt-2 h-1 rounded-full" style={{ background: "hsl(var(--border))" }}>
                            <div
                              className="h-1 rounded-full transition-all duration-500"
                              style={{ width: `${uStats.pct}%`, background: color, opacity: 0.6 }}
                            />
                          </div>
                        </div>
                      );
                    })}
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
