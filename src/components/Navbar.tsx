import { Orbit } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#path" },
  { label: "For Teachers", href: "#teachers" },
  { label: "About", href: "#about" },
];

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      style={{
        background: "hsl(222 47% 5% / 0.8)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid hsl(222 30% 15% / 0.6)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "radial-gradient(circle at 35% 35%, hsl(191 97% 70%), hsl(191 97% 40%))" }}
        >
          <span className="font-display font-bold text-sm text-background">O</span>
        </div>
        <span className="font-display font-bold text-xl text-foreground tracking-tight">
          Orbit
        </span>
      </div>

      {/* Links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium hidden sm:block">
          Sign In
        </button>
        <button
          className="text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200"
          style={{
            background: "hsl(var(--nebula-cyan))",
            color: "hsl(var(--background))",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "var(--glow-cyan)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
};
