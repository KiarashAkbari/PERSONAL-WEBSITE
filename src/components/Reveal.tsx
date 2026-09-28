import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "../utils/cn";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  clip?: boolean;
};

export default function Reveal({ children, className, delay = 0, clip = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("on");
            io.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(clip ? "rv-clip" : "rv", className)}
      style={{ "--rvd": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
