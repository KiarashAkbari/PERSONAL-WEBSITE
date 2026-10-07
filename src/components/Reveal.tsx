import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "../utils/cn";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  clip?: boolean;
  as?: "div" | "span";
};

/* ============================================================
   REVEAL REGISTRY — one shared, frame-throttled rect sweep.

   IntersectionObserver alone cannot be trusted here: Chromium does
   not deliver a usable intersection for an INLINE element that
   carries its own `clip-path` (exactly what `clip` reveals are).
   It reports an empty intersection rect and — depending on how the
   element arrived on screen (deep link, reload while scrolled,
   programmatic jump) — never flips `isIntersecting` to true. `.on`
   then never lands and the copy stays invisible forever.

   Rect math against the viewport is immune to clip-path, so this
   sweep backstops the observer on scroll / resize. The observer
   stays in place because it also catches layout shifts that move
   content into view with no scroll event at all (accordion toggles,
   canvas resize, font swap).
   ============================================================ */
type Pending = { proxy: Element; fire: () => void };

const pending = new Set<Pending>();
let frame = 0;
let listening = false;

function sweep() {
  frame = 0;
  const limit = window.innerHeight * 0.94;
  const due: Pending[] = [];
  /* read every rect first, then mutate — a single layout pass */
  pending.forEach((entry) => {
    const box = entry.proxy.getBoundingClientRect();
    if (box.bottom > 0 && box.top < limit) due.push(entry);
  });
  due.forEach((entry) => {
    pending.delete(entry);
    entry.fire();
  });
}

function schedule() {
  if (frame || pending.size === 0) return;
  frame = requestAnimationFrame(sweep);
}

function watch(entry: Pending) {
  pending.add(entry);
  if (!listening) {
    listening = true;
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("orientationchange", schedule);
  }
  schedule();
}

function unwatch(entry: Pending) {
  pending.delete(entry);
}

export default function Reveal({ children, className, delay = 0, clip = false, as = "div" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = as as unknown as "div";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reveal = () => el.classList.add("on");

    // JS-less / IO-less fallback: nothing to animate, just show the content.
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }

    /* Observation target — the nearest ancestor that actually paints.
       An inline reveal (`as="span"`) whose only child is a block box has no
       client rects of its own, and a target carrying its own clip-path is
       reported by Chromium as never intersecting: either one strands the
       content shut. Walk up until the box is real AND unclipped. The class
       still lands on `el`; only what we watch moves up. */
    let proxy: Element = el;
    for (;;) {
      const style = getComputedStyle(proxy);
      const box = proxy.getBoundingClientRect();
      const paintable =
        (box.width > 0 || box.height > 0) &&
        style.clipPath === "none" &&
        /* an inline box wrapping block children is Chromium's blind spot:
           it neither intersects nor clips-and-paints. Watch its parent. */
        style.display !== "inline";
      if (paintable) break;
      if (!proxy.parentElement) break;
      proxy = proxy.parentElement;
    }

    const entry: Pending = { proxy, fire: reveal };
    const limit = window.innerHeight * 0.94;

    /* Synchronous first pass — the observer's initial callback is async and
       is the thing that goes missing here. Only reveals what is already on
       screen, so below-the-fold content keeps its scroll choreography. */
    const box = proxy.getBoundingClientRect();
    if (box.bottom > 0 && box.top < limit) {
      reveal();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            unwatch(entry);
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
    watch(entry);

    return () => {
      io.disconnect();
      unwatch(entry);
    };
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
