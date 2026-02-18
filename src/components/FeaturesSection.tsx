import { Brain, Map, BarChart3, Zap, GraduationCap, Users } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Skill Diagnostic",
    description:
      "Adaptive quizzes powered by Item Response Theory classify your exact knowledge level — Beginner, Intermediate, or Advanced — in minutes.",
    color: "cyan",
    delay: "0s",
  },
  {
    icon: Map,
    title: "AI Path Generator",
    description:
      "Input your goal, time availability, and background. Orbit's ML engine maps a structured week-by-week learning sequence with prerequisites.",
    color: "gold",
    delay: "0.1s",
  },
  {
    icon: BarChart3,
    title: "Mastery Tracking",
    description:
      "Visual progress dashboard with completion percentages, confidence scores, and weak area detection — see your galaxy of knowledge grow.",
    color: "teal",
    delay: "0.2s",
  },
  {
    icon: Zap,
    title: "Adaptive Sequencing",
    description:
      "Struggling? Orbit detects failure patterns and inserts reinforcement modules. Excelling? It unlocks advanced topics automatically.",
    color: "gold",
    delay: "0.3s",
  },
  {
    icon: GraduationCap,
    title: "Multi-Format Learning",
    description:
      "Curate paths that match how you learn — video lectures, interactive exercises, reading materials, or mixed-mode sequences.",
    color: "cyan",
    delay: "0.4s",
  },
  {
    icon: Users,
    title: "Teacher Dashboard",
    description:
      "Educators can upload modules, monitor class analytics, and identify concepts where entire cohorts are struggling.",
    color: "teal",
    delay: "0.5s",
  },
];

const colorMap = {
  cyan: {
    icon: "text-cosmos-cyan",
    bg: "bg-cosmos-cyan/10",
    border: "border-cosmos-cyan/20",
    glow: "hover:border-cosmos-cyan/40 hover:shadow-[0_0_20px_hsl(191_97%_55%/0.15)]",
  },
  gold: {
    icon: "text-cosmos-gold",
    bg: "bg-cosmos-gold/10",
    border: "border-cosmos-gold/20",
    glow: "hover:border-cosmos-gold/40 hover:shadow-[0_0_20px_hsl(43_96%_56%/0.15)]",
  },
  teal: {
    icon: "text-cosmos-teal",
    bg: "bg-cosmos-teal/10",
    border: "border-cosmos-teal/20",
    glow: "hover:border-cosmos-teal/40 hover:shadow-[0_0_20px_hsl(174_72%_45%/0.15)]",
  },
};

export const FeaturesSection = () => {
  return (
    <section className="py-28 bg-nebula relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-cosmos-cyan text-sm font-medium tracking-widest uppercase mb-3">
            Core Constellation
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            Every Tool You Need to
            <br />
            <span className="text-gradient-primary">Navigate Knowledge</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Six powerful features that work together as a complete learning intelligence system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const colors = colorMap[feature.color as keyof typeof colorMap];
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`card-cosmos rounded-xl p-7 border transition-all duration-300 cursor-default group ${colors.border} ${colors.glow}`}
                style={{ animationDelay: feature.delay }}
              >
                <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
                <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
