import { Button } from "@/components/ui/button";
import { Telescope, ArrowRight } from "lucide-react";

export const CtaSection = () => {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Glows */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "hsl(191 97% 55% / 0.06)" }}
      />
      <div
        className="absolute top-0 right-1/4 w-48 h-48 rounded-full blur-2xl pointer-events-none"
        style={{ background: "hsl(43 96% 56% / 0.04)" }}
      />

      <div className="container mx-auto px-6 text-center relative z-10">
        <div
          className="max-w-3xl mx-auto rounded-2xl p-12 md:p-16"
          style={{
            background: "linear-gradient(145deg, hsl(222 40% 9%), hsl(222 35% 13%))",
            border: "1px solid hsl(191 97% 55% / 0.2)",
            boxShadow: "0 0 60px hsl(191 97% 55% / 0.08), inset 0 1px 0 hsl(191 97% 55% / 0.1)",
          }}
        >
          {/* Decorative orbit ring */}
          <div className="flex justify-center mb-8">
            <div className="relative w-16 h-16">
              <div
                className="absolute inset-0 rounded-full border-2 animate-orbit"
                style={{ borderColor: "hsl(var(--nebula-cyan) / 0.4)" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Telescope className="w-7 h-7 text-cosmos-cyan" />
              </div>
            </div>
          </div>

          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            Ready to Find Your
            <br />
            <span className="text-gradient-primary">Learning Orbit?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Join thousands of learners worldwide who have discovered their personalized path
            through the cosmos of knowledge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cosmos" size="lg">
              Begin Free Assessment
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="cosmosOutline" size="lg">
              Watch Demo
            </Button>
          </div>
          <p className="text-muted-foreground text-xs mt-6">
            No credit card required · SDG 4 aligned · Available worldwide
          </p>
        </div>
      </div>
    </section>
  );
};
