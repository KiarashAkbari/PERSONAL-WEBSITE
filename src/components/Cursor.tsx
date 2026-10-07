import { useEffect, useRef, useState } from "react";
import { prefersReducedMotionSync } from "../hooks/usePrefersReducedMotion";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let fine = false;
    const reduced = prefersReducedMotionSync();
    try {
      fine = window.matchMedia("(pointer:fine)").matches;
    } catch {
      return;
    }
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("kursor");

    // restore native cursor when user switches to keyboard nav
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        document.documentElement.classList.add("kursor-allow");
        document.documentElement.classList.remove("kursor");
      }
    };
    const onMouseMoveOnce = () => {
      document.documentElement.classList.remove("kursor-allow");
      document.documentElement.classList.add("kursor");
    };

    const pos = { x: -100, y: -100 };
    const cur = { x: -100, y: -100 };
    let scale = 1;
    let curScale = 1;
    let raf = 0;
    let label = "";
    let visible = false;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      visible = true;
      const t = (e.target as HTMLElement).closest?.("a,button,[data-cursor]") as HTMLElement | null;
      if (t) {
        scale = 2.3;
        label = t.dataset.cursor ?? "";
      } else {
        scale = 1;
        label = "";
      }
    };
    const onLeave = () => {
      visible = false;
    };

    const loop = () => {
      cur.x += (pos.x - cur.x) * 0.16;
      cur.y += (pos.y - cur.y) * 0.16;
      curScale += (scale - curScale) * 0.18;
      const d = dotRef.current;
      const b = boxRef.current;
      const l = labelRef.current;
      if (d && b) {
        d.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        d.style.opacity = visible ? "1" : "0";
        b.style.transform = `translate(${cur.x}px, ${cur.y}px) scale(${curScale})`;
        b.style.opacity = visible ? "1" : "0";
      }
      if (l) {
        l.style.transform = `translate(${cur.x + 20}px, ${cur.y + 14}px)`;
        l.style.opacity = visible && Boolean(label) ? "1" : "0";
        const txt = label !== "" ? `[ ${label} ]` : "";
        if (l.textContent !== txt) l.textContent = txt;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    // single-shot restore on next mouse movement after Tab
    const restoreOnce = () => onMouseMoveOnce();
    window.addEventListener("mousemove", restoreOnce, { once: true, passive: true } as AddEventListenerOptions);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("kursor", "kursor-allow");
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      {/* trailing box — difference blend stays legible in both optics */}
      <div
        ref={boxRef}
        className="pointer-events-none fixed left-0 top-0 z-[99] opacity-0 mix-blend-difference"
        aria-hidden
      >
        <div className="h-4 w-4 -translate-x-1/2 -translate-y-1/2 border border-white" />
      </div>
      {/* exact dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[99] opacity-0"
        aria-hidden
      >
        <div className="h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-acc" />
      </div>
      {/* label */}
      <div
        ref={labelRef}
        className="pointer-events-none fixed left-0 top-0 z-[99] whitespace-nowrap font-mono text-[9px] tracking-[0.15em] text-acc opacity-0"
        aria-hidden
      />
    </>
  );
}
