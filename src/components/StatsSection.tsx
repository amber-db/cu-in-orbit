import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 50000, suffix: "+", label: "Learners Guided", color: "cyan" },
  { value: 98, suffix: "%", label: "Completion Rate", color: "gold" },
  { value: 200, suffix: "+", label: "Learning Paths", color: "teal" },
  { value: 40, suffix: "+", label: "Countries Reached", color: "cyan" },
];

const colorMap = {
  cyan: "text-cosmos-cyan",
  gold: "text-cosmos-gold",
  teal: "text-cosmos-teal",
};

function useCountUp(target: number, duration = 1800, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);
  return count;
}

const StatItem = ({ value, suffix, label, color, active }: (typeof stats)[0] & { active: boolean }) => {
  const count = useCountUp(value, 1600, active);
  const colorClass = colorMap[color as keyof typeof colorMap];
  return (
    <div className="text-center">
      <div className={`font-display font-bold text-5xl md:text-6xl mb-2 ${colorClass}`}>
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-muted-foreground text-sm font-medium uppercase tracking-wide">{label}</div>
    </div>
  );
};

export const StatsSection = () => {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to right, transparent, hsl(191 97% 55% / 0.03), transparent)",
        }}
      />
      <div className="container mx-auto px-6">
        <div className="card-cosmos rounded-2xl p-12 border-cosmos-cyan/15">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map((stat) => (
              <StatItem key={stat.label} {...stat} active={active} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
