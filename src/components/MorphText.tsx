import { useEffect, useRef, useState } from "react";
import { prefersReducedMotionSync } from "../hooks/usePrefersReducedMotion";
import { cn } from "../utils/cn";

const GLYPHS = "█▓▒░<>/\\|=+*#·:;";

/**
 * Real-time character morph — text decodes from one phrase into the
 * next, cell by cell, the way aino.agency morphs everything through
 * a single text grid. Cycles `phrases`; resolves left → right with
 * per-cell noise; honors reduced-motion by hard-cutting.
 */
export default function MorphText({
  phrases,
  hold = 2400,
  morph = 780,
  className,
}: {
  phrases: string[];
  hold?: number;
  morph?: number;
  className?: string;
}) {
  const [out, setOut] = useState(phrases[0] ?? "");
  const idx = useRef(0);
  const raf = useRef(0);
  const timer = useRef(0);
  const seeds = useRef<number[]>([]);

  useEffect(() => {
    if (phrases.length < 2) return;
    const reduce = prefersReducedMotionSync();

    const runMorph = () => {
      const from = phrases[idx.current];
      idx.current = (idx.current + 1) % phrases.length;
      const to = phrases[idx.current];
      const len = Math.max(from.length, to.length);
      seeds.current = Array.from({ length: len }, () => Math.random());
      const t0 = performance.now();

      if (reduce) {
        setOut(to);
        timer.current = window.setTimeout(runMorph, hold);
        return;
      }

      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / morph);
        let s = "";
        for (let i = 0; i < len; i++) {
          const target = to[i] ?? "";
          if (target === " ") {
            s += " ";
            continue;
          }
          /* each cell resolves between its own start/end fraction */
          const start = seeds.current[i] * 0.55;
          const end = start + 0.45;
          if (p >= end) {
            s += target;
          } else if (p >= start) {
            s += GLYPHS[(i * 7 + ((now / 46) | 0)) % GLYPHS.length];
          } else {
            s += from[i] ?? "·";
          }
        }
        setOut(s);
        if (p < 1) raf.current = requestAnimationFrame(step);
        else timer.current = window.setTimeout(runMorph, hold);
      };
      raf.current = requestAnimationFrame(step);
    };

    timer.current = window.setTimeout(runMorph, hold);
    return () => {
      cancelAnimationFrame(raf.current);
      clearTimeout(timer.current);
    };
  }, [phrases, hold, morph]);

  return (
    <>
      {/* stable text for assistive tech; the morph is decorative motion */}
      <span className="sr-only">{phrases.join(" / ")}</span>
      <span className={cn("whitespace-pre", className)} aria-hidden>
        {out}
      </span>
    </>
  );
}
