import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { courses } from "@/data/courseContent";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Lightbulb,
  ListChecks,
} from "lucide-react";

const colorTokens = {
  cyan: {
    accent: "text-cosmos-cyan",
    border: "border-cosmos-cyan/25",
    bg: "bg-cosmos-cyan/10",
    badge: "bg-cosmos-cyan/10 text-cosmos-cyan border border-cosmos-cyan/30",
    btn: "cosmos" as const,
    progress: "bg-cosmos-cyan",
  },
  gold: {
    accent: "text-cosmos-gold",
    border: "border-cosmos-gold/25",
    bg: "bg-cosmos-gold/10",
    badge: "bg-cosmos-gold/10 text-cosmos-gold border border-cosmos-gold/30",
    btn: "cosmosGold" as const,
    progress: "bg-cosmos-gold",
  },
  teal: {
    accent: "text-cosmos-teal",
    border: "border-cosmos-teal/25",
    bg: "bg-cosmos-teal/10",
    badge: "bg-cosmos-teal/10 text-cosmos-teal border border-cosmos-teal/30",
    btn: "cosmos" as const,
    progress: "bg-cosmos-teal",
  },
};

export default function CourseLessonPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const course = courses[courseId ?? ""];

  const [activeUnit, setActiveUnit] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);

  if (!course) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Course not found.</p>
          <Button variant="cosmos" onClick={() => navigate("/courses")}>
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  const c = colorTokens[course.color];
  const lesson = course.units[activeUnit]?.lessons[activeLesson];
  const allLessons = course.units.flatMap((u) => u.lessons);
  const currentIdx = allLessons.indexOf(lesson);

  const goNext = () => {
    const lessons = course.units[activeUnit].lessons;
    if (activeLesson < lessons.length - 1) {
      setActiveLesson(activeLesson + 1);
    } else if (activeUnit < course.units.length - 1) {
      setActiveUnit(activeUnit + 1);
      setActiveLesson(0);
    }
  };

  const goPrev = () => {
    if (activeLesson > 0) {
      setActiveLesson(activeLesson - 1);
    } else if (activeUnit > 0) {
      const prevUnit = course.units[activeUnit - 1];
      setActiveUnit(activeUnit - 1);
      setActiveLesson(prevUnit.lessons.length - 1);
    }
  };

  const isFirst = activeUnit === 0 && activeLesson === 0;
  const isLast =
    activeUnit === course.units.length - 1 &&
    activeLesson === course.units[course.units.length - 1].lessons.length - 1;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20 flex h-[calc(100vh-5rem)]">
        {/* Sidebar */}
        <aside
          className="hidden lg:flex flex-col w-72 border-r overflow-y-auto flex-shrink-0"
          style={{ borderColor: "hsl(var(--border))" }}
        >
          {/* Back link */}
          <div className="p-4 border-b" style={{ borderColor: "hsl(var(--border))" }}>
            <button
              onClick={() => navigate("/courses")}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All Courses
            </button>
          </div>

          {/* Course title */}
          <div className="p-5 border-b" style={{ borderColor: "hsl(var(--border))" }}>
            <p className={`text-xs font-semibold tracking-widest uppercase mb-1 ${c.accent}`}>
              {course.subtitle}
            </p>
            <h2 className="font-display font-bold text-lg text-foreground">{course.title}</h2>
            <p className="text-xs text-muted-foreground mt-1">
              {allLessons.length} lessons · {course.units.length} units
            </p>
          </div>

          {/* Units & Lessons */}
          <nav className="flex-1 p-3 space-y-1">
            {course.units.map((unit, ui) => (
              <div key={unit.unit}>
                <button
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-sm font-semibold text-foreground hover:bg-secondary/60 transition-colors"
                  onClick={() => {
                    setActiveUnit(ui);
                    setActiveLesson(0);
                  }}
                >
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">
                    Unit {unit.unit} · {unit.title}
                  </span>
                  {activeUnit === ui ? (
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {activeUnit === ui && (
                  <div className="ml-3 space-y-0.5 mt-1">
                    {unit.lessons.map((l, li) => {
                      const isActive = ui === activeUnit && li === activeLesson;
                      return (
                        <button
                          key={l.id}
                          onClick={() => { setActiveUnit(ui); setActiveLesson(li); }}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-150 flex items-start gap-2 ${
                            isActive
                              ? `${c.bg} ${c.accent} font-semibold`
                              : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                          }`}
                        >
                          <BookOpen className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
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
                <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
                  {lesson.title}
                </h1>
                <p className="text-muted-foreground text-sm">{lesson.duration} read</p>
              </div>

              {/* Summary */}
              <div
                className={`card-cosmos rounded-xl p-6 border ${c.border} mb-6`}
              >
                <h2 className={`font-display font-semibold text-lg mb-3 ${c.accent}`}>
                  📖 Lesson Summary
                </h2>
                <p className="text-foreground leading-relaxed">{lesson.summary}</p>
              </div>

              {/* Key Concepts */}
              <div className="card-cosmos rounded-xl p-6 border border-secondary mb-6">
                <h2 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                  <ListChecks className="w-5 h-5 text-muted-foreground" />
                  Key Concepts
                </h2>
                <div className="flex flex-wrap gap-2">
                  {lesson.keyConcepts.map((kc) => (
                    <span
                      key={kc}
                      className="text-sm px-3 py-1.5 rounded-lg font-medium"
                      style={{ background: "hsl(var(--secondary))", color: "hsl(var(--foreground))" }}
                    >
                      {kc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Worked Example */}
              <div
                className="rounded-xl p-6 border mb-6"
                style={{
                  background: "hsl(var(--card))",
                  borderColor: "hsl(43 96% 56% / 0.25)",
                }}
              >
                <h2 className="font-display font-semibold text-lg text-cosmos-gold mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Worked Example
                </h2>
                <div
                  className="rounded-lg p-4 mb-4 text-sm font-mono leading-relaxed"
                  style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground))" }}
                >
                  <span className="text-cosmos-gold font-semibold block mb-1">Problem:</span>
                  {lesson.worked_example.problem}
                </div>
                <div
                  className="rounded-lg p-4 text-sm font-mono leading-relaxed"
                  style={{
                    background: "hsl(191 97% 55% / 0.05)",
                    border: "1px solid hsl(191 97% 55% / 0.15)",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <span className="text-cosmos-cyan font-semibold block mb-1">Solution:</span>
                  {lesson.worked_example.solution}
                </div>
              </div>

              {/* References */}
              <div className="card-cosmos rounded-xl p-6 border border-secondary mb-10">
                <h2 className="font-display font-semibold text-lg text-foreground mb-4">
                  📚 References & Further Reading
                </h2>
                <ul className="space-y-3">
                  {lesson.references.map((ref, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className={`text-sm font-bold flex-shrink-0 ${c.accent}`}>[{i + 1}]</span>
                      <div>
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-foreground hover:underline flex items-center gap-1"
                        >
                          {ref.title}
                          <ExternalLink className="w-3 h-3 text-muted-foreground" />
                        </a>
                        <p className="text-xs text-muted-foreground">{ref.author}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Navigation */}
              <div className="flex justify-between gap-4">
                <Button
                  variant="cosmosOutline"
                  onClick={goPrev}
                  disabled={isFirst}
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button
                  variant={c.btn}
                  onClick={isLast ? () => navigate("/courses") : goNext}
                  className="flex-1"
                >
                  {isLast ? "Finish Course" : "Next Lesson"}
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
