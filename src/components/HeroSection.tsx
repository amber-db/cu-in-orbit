import heroImage from "@/assets/hero-cosmos.jpg";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Telescope, ArrowRight } from "lucide-react";
import { StarField } from "@/components/StarField";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background cosmos image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />

      {/* Star particles */}
      <StarField />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">
        <Badge
          className="mb-6 px-4 py-2 text-sm font-medium border animate-fade-in"
          style={{
            background: "hsl(var(--nebula-cyan) / 0.12)",
            borderColor: "hsl(var(--nebula-cyan) / 0.4)",
            color: "hsl(var(--nebula-cyan))",
            animationDelay: "0.1s",
            opacity: 0,
          }}
        >
          <Sparkles className="w-3.5 h-3.5 mr-1.5 inline" />
          AI-Powered Learning · SDG 4 Quality Education
        </Badge>

        <h1
          className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-none mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          <span className="text-foreground">Find Your</span>
          <br />
          <span className="text-gradient-primary">Learning Orbit</span>
        </h1>

        <p
          className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 animate-fade-in-up"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          Orbit uses AI to map your unique learning universe — diagnosing knowledge gaps,
          generating personalized pathways, and guiding you from your current position
          to the stars.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.6s", opacity: 0 }}
        >
          <Button variant="cosmos" size="lg">
            <Telescope className="w-4 h-4 mr-2" />
            Start Your Journey
          </Button>
          <Button variant="cosmosOutline" size="lg">
            Explore Features
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Orbit ring animation */}
        <div
          className="mt-20 relative w-64 h-64 animate-fade-in"
          style={{ animationDelay: "0.8s", opacity: 0 }}
        >
          {/* Outer ring */}
          <div
            className="absolute inset-0 rounded-full border opacity-20 animate-orbit"
            style={{ borderColor: "hsl(var(--nebula-cyan))" }}
          />
          {/* Middle ring */}
          <div
            className="absolute inset-8 rounded-full border opacity-30"
            style={{
              borderColor: "hsl(var(--star-gold))",
              animation: "orbit-spin 14s linear infinite reverse",
            }}
          />
          {/* Inner planet */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-20 h-20 rounded-full animate-pulse-glow animate-float flex items-center justify-center"
              style={{
                background: "radial-gradient(circle at 35% 35%, hsl(191 97% 70%), hsl(191 97% 40%))",
              }}
            >
              <span className="font-display font-bold text-2xl text-background">O</span>
            </div>
          </div>
          {/* Orbiting dot 1 */}
          <div className="absolute inset-0 animate-orbit">
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
              style={{ background: "hsl(var(--star-gold))", boxShadow: "var(--glow-gold)" }}
            />
          </div>
          {/* Orbiting dot 2 */}
          <div className="absolute inset-8" style={{ animation: "orbit-spin 14s linear infinite reverse" }}>
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{ background: "hsl(var(--nebula-teal))" }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-float">
        <span className="text-xs tracking-widest uppercase">Explore</span>
        <div
          className="w-px h-12"
          style={{ background: "linear-gradient(to bottom, hsl(var(--nebula-cyan) / 0.6), transparent)" }}
        />
      </div>
    </section>
  );
};
