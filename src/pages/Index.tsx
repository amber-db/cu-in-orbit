import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { LearningPathPreview } from "@/components/LearningPathPreview";
import { StatsSection } from "@/components/StatsSection";
import { CtaSection } from "@/components/CtaSection";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <LearningPathPreview />
        <StatsSection />
        <CtaSection />
      </main>
      <footer className="border-t py-10" style={{ borderColor: "hsl(var(--border))" }}>
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: "radial-gradient(circle at 35% 35%, hsl(191 97% 70%), hsl(191 97% 40%))" }}
            >
              <span className="font-display font-bold text-xs text-background">O</span>
            </div>
            <span className="font-display font-semibold text-foreground">Orbit</span>
          </div>
          <p className="text-muted-foreground text-sm text-center">
            Supporting UN SDG 4 — Quality Education for all. Built with ♥ for learners worldwide.
          </p>
          <p className="text-muted-foreground text-xs">© 2025 Orbit AI</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
