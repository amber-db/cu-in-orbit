import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

/**
 * Renders a string that may contain inline LaTeX delimited by $...$ 
 * or display LaTeX delimited by $$...$$.
 * Non-math text is rendered as-is.
 */
export function MathText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    // Split on display math first ($$...$$), then inline ($...$)
    const html = text
      // Display math
      .replace(/\$\$(.+?)\$\$/g, (_, tex) => {
        try {
          return katex.renderToString(tex.trim(), { displayMode: true, throwOnError: false });
        } catch { return tex; }
      })
      // Inline math
      .replace(/\$(.+?)\$/g, (_, tex) => {
        try {
          return katex.renderToString(tex.trim(), { displayMode: false, throwOnError: false });
        } catch { return tex; }
      });
    ref.current.innerHTML = html;
  }, [text]);

  return <span ref={ref} className={className} />;
}

/** Renders a single KaTeX expression (block or inline). */
export function MathBlock({ tex, display = true, className = "" }: { tex: string; display?: boolean; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    try {
      katex.render(tex, ref.current, { displayMode: display, throwOnError: false });
    } catch {
      ref.current.textContent = tex;
    }
  }, [tex, display]);

  return <span ref={ref} className={className} />;
}
