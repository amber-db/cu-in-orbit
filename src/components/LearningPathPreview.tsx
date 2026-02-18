import { CheckCircle2, Lock, Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const weeks = [
  {
    week: 1,
    title: "Linear Algebra Foundations",
    topics: ["Vectors & Matrices", "Dot Products", "Transformations"],
    status: "complete",
    mastery: 94,
  },
  {
    week: 2,
    title: "Probability & Statistics",
    topics: ["Distributions", "Bayes' Theorem", "Expectation"],
    status: "complete",
    mastery: 81,
  },
  {
    week: 3,
    title: "Calculus for ML",
    topics: ["Derivatives", "Chain Rule", "Gradient Descent"],
    status: "active",
    mastery: 52,
  },
  {
    week: 4,
    title: "Linear Regression",
    topics: ["Cost Functions", "Optimization", "Regularization"],
    status: "locked",
    mastery: 0,
  },
  {
    week: 5,
    title: "Neural Networks Intro",
    topics: ["Perceptrons", "Activation Fns", "Backprop"],
    status: "locked",
    mastery: 0,
  },
];

const statusConfig = {
  complete: {
    icon: CheckCircle2,
    iconColor: "text-cosmos-cyan",
    lineColor: "bg-cosmos-cyan",
    badgeStyle: { background: "hsl(191 97% 55% / 0.12)", color: "hsl(var(--nebula-cyan))", border: "1px solid hsl(191 97% 55% / 0.3)" },
    badgeText: "Complete",
    cardClass: "card-cosmos border-cosmos-cyan/25",
  },
  active: {
    icon: Circle,
    iconColor: "text-cosmos-gold",
    lineColor: "bg-secondary",
    badgeStyle: { background: "hsl(43 96% 56% / 0.12)", color: "hsl(var(--star-gold))", border: "1px solid hsl(43 96% 56% / 0.3)" },
    badgeText: "In Progress",
    cardClass: "card-cosmos-glow animate-pulse-glow",
  },
  locked: {
    icon: Lock,
    iconColor: "text-muted-foreground",
    lineColor: "bg-secondary",
    badgeStyle: { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border))" },
    badgeText: "Locked",
    cardClass: "card-cosmos opacity-60",
  },
};

export const LearningPathPreview = () => {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "hsl(191 97% 55% / 0.05)" }}
      />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <p className="text-cosmos-gold text-sm font-medium tracking-widest uppercase mb-3">
              Your Trajectory
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
              A Structured Path
              <br />
              <span className="text-gradient-primary">Through the Cosmos</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Tell Orbit your goal — "Learn Machine Learning" — and it generates a week-by-week
              learning sequence with prerequisites mapped automatically.
            </p>
            <div className="space-y-4">
              {[
                { label: "Goal", value: "Learn Machine Learning" },
                { label: "Background", value: "Basic Calculus & Algebra" },
                { label: "Time", value: "3 hours / week" },
                { label: "Format", value: "Video + Exercises" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-xs font-medium text-muted-foreground w-24 uppercase tracking-wide">{item.label}</span>
                  <span
                    className="text-sm font-medium px-3 py-1 rounded-md"
                    style={{ background: "hsl(var(--secondary))", color: "hsl(var(--foreground))" }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — path visualization */}
          <div className="space-y-3">
            {weeks.map((item, idx) => {
              const config = statusConfig[item.status as keyof typeof statusConfig];
              const Icon = config.icon;
              return (
                <div key={item.week} className="flex gap-4">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${item.status === "active" ? "bg-cosmos-gold/15" : item.status === "complete" ? "bg-cosmos-cyan/10" : "bg-secondary"}`}>
                      <Icon className={`w-4 h-4 ${config.iconColor}`} />
                    </div>
                    {idx < weeks.length - 1 && (
                      <div className={`w-px flex-1 mt-1 min-h-4 ${config.lineColor} opacity-40`} />
                    )}
                  </div>

                  {/* Card */}
                  <div className={`flex-1 rounded-xl p-4 mb-2 border transition-all duration-300 ${config.cardClass}`}>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <span className="text-xs text-muted-foreground">Week {item.week}</span>
                        <h4 className="font-display font-semibold text-sm text-foreground">{item.title}</h4>
                      </div>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                        style={config.badgeStyle}
                      >
                        {config.badgeText}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.topics.map((topic) => (
                        <span
                          key={topic}
                          className="text-xs px-2 py-0.5 rounded text-muted-foreground"
                          style={{ background: "hsl(var(--muted))" }}
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                    {item.status !== "locked" && (
                      <div>
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Mastery</span>
                          <span>{item.mastery}%</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "hsl(var(--muted))" }}>
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${item.mastery}%`,
                              background: item.status === "complete"
                                ? "hsl(var(--nebula-cyan))"
                                : "hsl(var(--star-gold))",
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
