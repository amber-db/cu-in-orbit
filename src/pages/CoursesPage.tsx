import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { ArrowRight, BookOpen, Star, Lock } from "lucide-react";

const courses = [
  {
    id: "pre-calculus",
    title: "Pre-Calculus",
    subtitle: "Foundation for Calculus",
    description:
      "Master functions, trigonometry, conic sections, and polar coordinates — the essential toolkit before entering calculus.",
    topics: ["Functions & Graphs", "Trigonometry", "Conic Sections", "Polar Coords", "Sequences & Series"],
    weeks: 8,
    level: "Beginner–Intermediate",
    color: "gold",
    status: "open",
  },
  {
    id: "calculus-1",
    title: "Calculus I",
    subtitle: "Limits, Derivatives & Applications",
    description:
      "From the epsilon-delta definition of a limit through the Fundamental Theorem of Calculus — your first deep dive into the mathematics of change.",
    topics: ["Limits & Continuity", "Derivatives", "Differentiation Rules", "Applications", "Integration Intro"],
    weeks: 10,
    level: "Intermediate",
    color: "cyan",
    status: "open",
  },
  {
    id: "calculus-2",
    title: "Calculus II",
    subtitle: "Integration Techniques & Series",
    description:
      "Deep integration techniques, improper integrals, parametric curves, polar coordinates, and infinite series with convergence tests.",
    topics: ["Integration Techniques", "Improper Integrals", "Sequences & Series", "Parametric & Polar", "Taylor Series"],
    weeks: 12,
    level: "Intermediate",
    color: "teal",
    status: "open",
  },
  {
    id: "calculus-3",
    title: "Calculus III",
    subtitle: "Multivariable Calculus",
    description:
      "Extend calculus to multiple dimensions — vectors, partial derivatives, multiple integrals, and the theorems of Green, Stokes, and Gauss.",
    topics: ["3D Vectors", "Partial Derivatives", "Multiple Integrals", "Vector Fields", "Stokes & Gauss Theorems"],
    weeks: 14,
    level: "Advanced",
    color: "cyan",
    status: "open",
  },
];

const colorMap = {
  cyan: {
    badge: "bg-cosmos-cyan/10 text-cosmos-cyan border-cosmos-cyan/30",
    btn: "cosmos" as const,
    glow: "hover:border-cosmos-cyan/50 hover:shadow-[0_0_30px_hsl(191_97%_55%/0.15)]",
    border: "border-cosmos-cyan/20",
    tag: "bg-cosmos-cyan/10 text-cosmos-cyan",
  },
  gold: {
    badge: "bg-cosmos-gold/10 text-cosmos-gold border-cosmos-gold/30",
    btn: "cosmosGold" as const,
    glow: "hover:border-cosmos-gold/50 hover:shadow-[0_0_30px_hsl(43_96%_56%/0.15)]",
    border: "border-cosmos-gold/20",
    tag: "bg-cosmos-gold/10 text-cosmos-gold",
  },
  teal: {
    badge: "bg-cosmos-teal/10 text-cosmos-teal border-cosmos-teal/30",
    btn: "cosmos" as const,
    glow: "hover:border-cosmos-teal/50 hover:shadow-[0_0_30px_hsl(174_72%_45%/0.15)]",
    border: "border-cosmos-teal/20",
    tag: "bg-cosmos-teal/10 text-cosmos-teal",
  },
};

export default function CoursesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-cosmos-cyan text-sm font-medium tracking-widest uppercase mb-3">
              Your Learning Constellation
            </p>
            <h1 className="font-display font-bold text-5xl md:text-6xl text-foreground mb-5">
              Mathematics Courses
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Structured, reference-backed pathways from Pre-Calculus through Multivariable Calculus.
            </p>
          </div>

          {/* Course Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {courses.map((course) => {
              const c = colorMap[course.color as keyof typeof colorMap];
              return (
                <div
                  key={course.id}
                  className={`card-cosmos rounded-2xl p-8 border ${c.border} ${c.glow} transition-all duration-300 flex flex-col`}
                >
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${c.badge}`}>
                      {course.level}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <BookOpen className="w-3.5 h-3.5" />
                      {course.weeks} weeks
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="font-display font-bold text-2xl text-foreground mb-1">{course.title}</h2>
                  <p className="text-sm font-medium text-muted-foreground mb-3">{course.subtitle}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{course.description}</p>

                  {/* Topic tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {course.topics.map((t) => (
                      <span key={t} className={`text-xs px-2.5 py-1 rounded-md font-medium ${c.tag}`}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <Button
                    variant={c.btn}
                    className="mt-auto w-full"
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    Start Learning
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
