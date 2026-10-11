import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "../utils/cn";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Fade-up reveal. Content is visible at mount when it is already on
 * screen; otherwise an IntersectionObserver flips `.on`. A timed
 * fallback guarantees nothing stays invisible if the observer never
 * fires (zero-height boxes, restored scroll, unusual viewports).
 */
export default function Reveal({ children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    const fallback = window.setTimeout(() => setOn(true), 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("rv", on && "on", className)}
      style={{ "--rvd": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
