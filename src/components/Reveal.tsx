import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "../utils/cn";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  clip?: boolean;
  as?: "div" | "span";
};

export default function Reveal({ children, className, delay = 0, clip = false, as = "div" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = as as unknown as "div";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reveal = () => el.classList.add("on");

    // if JS fails or IO unsupported, ensure content visible (progressive enhancement)
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }

    // An inline reveal (`as="span"`) whose only child is a block box generates
    // no client rects of its own, so getBoundingClientRect() is all zeros and
    // Chrome reports it as never intersecting — `.on` never lands and the
    // clip-path stays shut forever. Safari ignores clip-path on inline
    // elements, which is why the same markup looked fine there. Observe the
    // nearest ancestor that actually has a box; the class still lands on `el`.
    let proxy: Element = el;
    let box = el.getBoundingClientRect();
    while (box.width === 0 && box.height === 0 && proxy.parentElement) {
      proxy = proxy.parentElement;
      box = proxy.getBoundingClientRect();
    }

    // Synchronous first pass — IO's initial callback is async and is the thing
    // that goes missing here. Only reveals what is already on screen, so
    // below-the-fold content still waits and keeps its scroll choreography.
    if (box.bottom > 0 && box.top < window.innerHeight * 0.94) {
      reveal();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal();
            io.disconnect();
          }
        });
      },
      // threshold 0, not 0.1: fires on the first pixel and tolerates
      // degenerate boxes. rootMargin keeps the -6% bottom inset.
      { threshold: 0, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(proxy);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn(clip ? "rv-clip" : "rv", className)}
      style={{ "--rvd": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
