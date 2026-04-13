import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { courses } from "@/data/courseContent";
import { useProgress } from "@/hooks/useProgress";
import { MathText } from "@/components/MathRenderer";
import { PracticeProblems } from "@/components/PracticeProblems";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import {
  ArrowLeft, ArrowRight, BookOpen, ChevronDown, ChevronRight,
  ExternalLink, Lightbulb, ListChecks, CheckCircle, Circle, Brain, BarChart2,
} from "lucide-react";

const colorTokens = {
  cyan: { accent: "text-cosmos-cyan", border: "border-cosmos-cyan/25", bg: "bg-cosmos-cyan/10", badge: "bg-cosmos-cyan/10 text-cosmos-cyan border border-cosmos-cyan/30", btn: "cosmos" as const, progress: "hsl(191 97% 55%)" },
  gold: { accent: "text-cosmos-gold", border: "border-cosmos-gold/25", bg: "bg-cosmos-gold/10", badge: "bg-cosmos-gold/10 text-cosmos-gold border border-cosmos-gold/30", btn: "cosmosGold" as const, progress: "hsl(43 96% 56%)" },
  teal: { accent: "text-cosmos-teal", border: "border-cosmos-teal/25", bg: "bg-cosmos-teal/10", badge: "bg-cosmos-teal/10 text-cosmos-teal border border-cosmos-teal/30", btn: "cosmos" as const, progress: "hsl(174 72% 45%)" },
};

const ChartTooltipCustom = ({ active, payload }: { active?: boolean; payload?: { value: number }[] }) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-lg px-3 py-2 text-xs shadow-xl" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))" }}>
        {payload[0].value}
      </div>
    );
  }
  return null;
};

/** Renders text with $...$ inline math via KaTeX */
function MathParagraph({ text, className = "" }: { text: string; className?: string }) {
  return (
    <p className={className}>
      <MathText text={text} />
    </p>
  );
}

export default function CourseLessonPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const course = courses[courseId ?? ""];
  const { isCompleted, markComplete, markIncomplete } = useProgress();

  const [activeUnit, setActiveUnit] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [showDetailed, setShowDetailed] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Course not found.</p>
          <Button variant="cosmos" onClick={() => navigate("/courses")}>Back to Courses</Button>
        </div>
      </div>
    );
  }

  const c = colorTokens[course.color];
  const lesson = course.units[activeUnit]?.lessons[activeLesson];
  const allLessons = course.units.flatMap((u) => u.lessons);
  const completed = lesson ? isCompleted(lesson.id) : false;

  const goNext = () => {
    const lessons = course.units[activeUnit].lessons;
    if (activeLesson < lessons.length - 1) { setActiveLesson(activeLesson + 1); setShowDetailed(false); }
    else if (activeUnit < course.units.length - 1) { setActiveUnit(activeUnit + 1); setActiveLesson(0); setShowDetailed(false); }
  };

  const goPrev = () => {
    if (activeLesson > 0) { setActiveLesson(activeLesson - 1); setShowDetailed(false); }
    else if (activeUnit > 0) {
      const prev = course.units[activeUnit - 1];
      setActiveUnit(activeUnit - 1);
      setActiveLesson(prev.lessons.length - 1);
      setShowDetailed(false);
    }
  };

  const isFirst = activeUnit === 0 && activeLesson === 0;
  const isLast = activeUnit === course.units.length - 1 && activeLesson === course.units[course.units.length - 1].lessons.length - 1;

  const renderChart = () => {
    if (!lesson?.visual) return null;
    const { visual } = lesson;
    const commonProps = {
      data: visual.data,
      margin: { top: 5, right: 10, left: 0, bottom: 5 },
    };
    const axisStyle = { fill: "hsl(var(--muted-foreground))", fontSize: 11 };

    return (
      <div className="card-cosmos rounded-xl p-6 border border-secondary mb-6">
        <div className="flex items-center gap-2 mb-1">
          <BarChart2 className="w-4 h-4 text-muted-foreground" />
          <h2 className="font-display font-semibold text-base text-foreground">{visual.title}</h2>
        </div>
        <p className="text-xs text-muted-foreground mb-5">{visual.description}</p>
        <ResponsiveContainer width="100%" height={200}>
          {visual.type === "bar" ? (
            <BarChart {...commonProps}>
              <XAxis dataKey="label" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} label={{ value: visual.yLabel, angle: -90, position: "insideLeft", style: { fill: "hsl(var(--muted-foreground))", fontSize: 10 } }} />
              <Tooltip content={<ChartTooltipCustom />} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {visual.data.map((d, i) => (
                  <Cell key={i} fill={d.color ?? c.progress} />
                ))}
              </Bar>
            </BarChart>
          ) : visual.type === "area" ? (
            <AreaChart {...commonProps}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={c.progress} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={c.progress} stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <XAxis dataKey="label" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltipCustom />} />
              <Area type="monotone" dataKey="value" stroke={c.progress} fill="url(#areaGrad)" strokeWidth={2} dot={{ fill: c.progress, r: 3 }} />
            </AreaChart>
          ) : (
            <LineChart {...commonProps}>
              <XAxis dataKey="label" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltipCustom />} />
              <Line type="monotone" dataKey="value" stroke={c.progress} strokeWidth={2} dot={{ fill: c.progress, r: 3 }} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20 flex h-[calc(100vh-5rem)]">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-72 border-r overflow-y-auto flex-shrink-0" style={{ borderColor: "hsl(var(--border))" }}>
          <div className="p-4 border-b" style={{ borderColor: "hsl(var(--border))" }}>
            <button onClick={() => navigate("/courses")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> All Courses
            </button>
          </div>
          <div className="p-5 border-b" style={{ borderColor: "hsl(var(--border))" }}>
            <p className={`text-xs font-semibold tracking-widest uppercase mb-1 ${c.accent}`}>{course.subtitle}</p>
            <h2 className="font-display font-bold text-lg text-foreground">{course.title}</h2>
            <p className="text-xs text-muted-foreground mt-1">{allLessons.length} lessons · {course.units.length} units</p>
            <Button variant="cosmosOutline" size="sm" className="mt-3 w-full text-xs" onClick={() => navigate(`/quiz/${courseId}`)}>
              <Brain className="w-3 h-3 mr-1" /> Take Diagnostic Quiz
            </Button>
          </div>
          <nav className="flex-1 p-3 space-y-1">
            {course.units.map((unit, ui) => (
              <div key={unit.unit}>
                <button
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-sm font-semibold text-foreground hover:bg-secondary/60 transition-colors"
                  onClick={() => { setActiveUnit(ui); setActiveLesson(0); setShowDetailed(false); }}
                >
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">Unit {unit.unit} · {unit.title}</span>
                  {activeUnit === ui ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />}
                </button>
                {activeUnit === ui && (
                  <div className="ml-3 space-y-0.5 mt-1">
                    {unit.lessons.map((l, li) => {
                      const isActive = ui === activeUnit && li === activeLesson;
                      const done = isCompleted(l.id);
                      return (
                        <button
                          key={l.id}
                          onClick={() => { setActiveUnit(ui); setActiveLesson(li); setShowDetailed(false); }}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-150 flex items-start gap-2 ${isActive ? `${c.bg} ${c.accent} font-semibold` : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"}`}
                        >
                          {done ? <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-green-400" /> : <BookOpen className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />}
                          <span>{l.title}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {lesson && (
            <div className="max-w-3xl mx-auto px-6 py-10">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
                <Link to="/courses" className="hover:text-foreground transition-colors">Courses</Link>
                <ChevronRight className="w-3 h-3" />
                <span>{course.title}</span>
                <ChevronRight className="w-3 h-3" />
                <span className={c.accent}>Unit {course.units[activeUnit].unit}</span>
              </div>

              {/* Lesson Header */}
              <div className="mb-8">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.badge} mb-3 inline-block`}>
                  {course.units[activeUnit].title}
                </span>
                <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">{lesson.title}</h1>
                <div className="flex items-center gap-4">
                  <p className="text-muted-foreground text-sm">{lesson.duration} read</p>
                  <button
                    onClick={() => completed ? markIncomplete(lesson.id) : markComplete(lesson.id)}
                    className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${completed ? "border-green-500/40 text-green-400 bg-green-500/10" : "border-secondary text-muted-foreground hover:text-foreground"}`}
                  >
                    {completed ? <CheckCircle className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                    {completed ? "Completed" : "Mark Complete"}
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className={`card-cosmos rounded-xl p-6 border ${c.border} mb-6`}>
                <h2 className={`font-display font-semibold text-lg mb-3 ${c.accent}`}>📖 Lesson Summary</h2>
                <MathParagraph text={lesson.summary} className="text-foreground leading-relaxed" />
              </div>

              {/* Detailed Explanation (toggle) */}
              <div className="card-cosmos rounded-xl border border-secondary mb-6 overflow-hidden">
                <button
                  onClick={() => setShowDetailed(!showDetailed)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <span className="font-display font-semibold text-base text-foreground">In-Depth Explanation</span>
                  </div>
                  {showDetailed ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                </button>
                {showDetailed && (
                  <div className="px-6 pb-6 border-t" style={{ borderColor: "hsl(var(--border))" }}>
                    <div className="mt-4 space-y-3">
                      {lesson.detailedExplanation.split("\n\n").map((para, i) => {
                        if (para.startsWith("**") && para.includes(":**")) {
                          const [heading, ...rest] = para.split(":**");
                          return (
                            <div key={i}>
                              <p className={`font-semibold text-sm mb-1 ${c.accent}`}>{heading.replace(/\*\*/g, "")}:</p>
                              <MathParagraph text={rest.join(":**").replace(/\*\*/g, "")} className="text-sm text-muted-foreground leading-relaxed" />
                            </div>
                          );
                        }
                        return <MathParagraph key={i} text={para.replace(/\*\*/g, "")} className="text-sm text-muted-foreground leading-relaxed" />;
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Visual / Chart */}
              {renderChart()}

              {/* Key Concepts */}
              <div className="card-cosmos rounded-xl p-6 border border-secondary mb-6">
                <h2 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                  <ListChecks className="w-5 h-5 text-muted-foreground" /> Key Concepts
                </h2>
                <div className="flex flex-wrap gap-2">
                  {lesson.keyConcepts.map((kc) => (
                    <span key={kc} className="text-sm px-3 py-1.5 rounded-lg font-medium" style={{ background: "hsl(var(--secondary))", color: "hsl(var(--foreground))" }}>
                      <MathText text={kc} />
                    </span>
                  ))}
                </div>
              </div>

              {/* Worked Example */}
              <div className="rounded-xl p-6 border mb-6" style={{ background: "hsl(var(--card))", borderColor: "hsl(43 96% 56% / 0.25)" }}>
                <h2 className="font-display font-semibold text-lg text-cosmos-gold mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" /> Worked Example
                </h2>
                <div className="rounded-lg p-4 mb-4 text-sm font-mono leading-relaxed" style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground))" }}>
                  <span className="text-cosmos-gold font-semibold block mb-1">Problem:</span>
                  <MathText text={lesson.worked_example.problem} />
                </div>
                <div className="rounded-lg p-4 text-sm font-mono leading-relaxed" style={{ background: "hsl(191 97% 55% / 0.05)", border: "1px solid hsl(191 97% 55% / 0.15)", color: "hsl(var(--foreground))" }}>
                  <span className="text-cosmos-cyan font-semibold block mb-1">Solution:</span>
                  <MathText text={lesson.worked_example.solution} />
                </div>
              </div>

              {/* Practice Problems */}
              <PracticeProblems lessonId={lesson.id} />

              {/* References */}
              <div className="card-cosmos rounded-xl p-6 border border-secondary mb-10">
                <h2 className="font-display font-semibold text-lg text-foreground mb-4">📚 References & Further Reading</h2>
                <ul className="space-y-3">
                  {lesson.references.map((ref, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className={`text-sm font-bold flex-shrink-0 ${c.accent}`}>[{i + 1}]</span>
                      <div>
                        <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:underline flex items-center gap-1">
                          {ref.title} <ExternalLink className="w-3 h-3 text-muted-foreground" />
                        </a>
                        <p className="text-xs text-muted-foreground">{ref.author}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Navigation */}
              <div className="flex justify-between gap-4">
                <Button variant="cosmosOutline" onClick={goPrev} disabled={isFirst} className="flex-1">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                </Button>
                <Button
                  variant={c.btn}
                  onClick={() => { if (!completed) markComplete(lesson.id); isLast ? navigate("/dashboard") : goNext(); }}
                  className="flex-1"
                >
                  {isLast ? "Go to Dashboard" : "Next Lesson"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
