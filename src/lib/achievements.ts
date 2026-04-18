import { Trophy, Zap, Target, type LucideIcon } from "lucide-react";

export type BadgeId = "speed_demon" | "perfectionist" | "century_club";

export type Badge = {
  id: BadgeId;
  label: string;
  description: string;
  icon: LucideIcon;
  colorClass: string; // tailwind text color
  bgClass: string;
};

export const BADGES: Record<BadgeId, Badge> = {
  speed_demon: {
    id: "speed_demon",
    label: "Speed Demon",
    description: "Answered a question correctly in under 10 seconds",
    icon: Zap,
    colorClass: "text-cosmos-cyan",
    bgClass: "bg-cosmos-cyan/15 border-cosmos-cyan/30",
  },
  perfectionist: {
    id: "perfectionist",
    label: "Perfectionist",
    description: "Scored a perfect 10/10 on a cumulative quiz",
    icon: Target,
    colorClass: "text-green-400",
    bgClass: "bg-green-500/15 border-green-500/30",
  },
  century_club: {
    id: "century_club",
    label: "Century Club",
    description: "Earned 1000+ points on a single timed quiz",
    icon: Trophy,
    colorClass: "text-cosmos-gold",
    bgClass: "bg-cosmos-gold/15 border-cosmos-gold/30",
  },
};

export type QuizSummary = {
  mode: "classic" | "timed";
  correct: number;
  total: number;
  points: number;
  fastestCorrectSeconds: number | null; // time taken on the fastest correct answer
};

export function computeBadges(s: QuizSummary): BadgeId[] {
  const earned: BadgeId[] = [];
  if (s.mode === "timed" && s.fastestCorrectSeconds !== null && s.fastestCorrectSeconds < 10) {
    earned.push("speed_demon");
  }
  if (s.correct === s.total && s.total > 0) {
    earned.push("perfectionist");
  }
  if (s.points >= 1000) {
    earned.push("century_club");
  }
  return earned;
}
