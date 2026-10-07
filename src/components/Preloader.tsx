import { useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";

const ASCII_LOGO = [
  "██╗  ██╗██╗ █████╗ ",
  "██║ ██╔╝██║██╔══██╗",
  "█████╔╝ ██║███████║",
  "██╔═██╗ ██║██╔══██║",
  "██║  ██╗██║██║  ██║",
  "╚═╝  ╚═╝╚═╝╚═╝  ╚═╝",
];

const GLYPHS = "!<>-_\\/[]{}—=+*^?#____";

function scrambleRow(row: string, seed: number) {
  return row
    .split("")
    .map((ch, i) =>
      ch === " " ? " " : Math.sin(seed * 12.9898 + i * 78.233) * 43758.5453 % 1 > 0.75
        ? GLYPHS[(seed + i) % GLYPHS.length]
        : ch
    )
    .join("");
}

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);
  const [tick, setTick] = useState(0);
  const doneRef = useRef(false);
  const t0 = useRef(0);
  const rafRef = useRef(0);
  const intervalRef = useRef<number | null>(null);
  const finishTimerRef = useRef<number | null>(null);

  const finish = (instant = false) => {
    if (doneRef.current) {
      if (instant && finishTimerRef.current !== null) {
        window.clearTimeout(finishTimerRef.current);
        finishTimerRef.current = null;
        onDone();
      }
      return;
    }
    doneRef.current = true;
    cancelAnimationFrame(rafRef.current);
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setGone(true);

    if (instant) {
      onDone();
      return;
    }
    finishTimerRef.current = window.setTimeout(() => {
      finishTimerRef.current = null;
      onDone();
    }, 110);
  };

  useEffect(() => {
    const duration = 480;
    t0.current = performance.now();
    const step = (now: number) => {
      const progress = Math.min(1, (now - t0.current) / duration);
      setPct(Math.floor(progress * 100));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
      else {
        setPct(100);
        if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
        finish();
      }
    };

    rafRef.current = requestAnimationFrame(step);
    intervalRef.current = window.setInterval(() => setTick((value) => value + 1), 60);
    const skipWithKeyboard = (event: KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== " " && event.key !== "Escape") return;
      const target = event.target as HTMLElement | null;
      if (
        target?.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName ?? "")
      ) return;
      event.preventDefault();
      finish(true);
    };
    window.addEventListener("keydown", skipWithKeyboard);

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
      if (finishTimerRef.current !== null) window.clearTimeout(finishTimerRef.current);
      window.removeEventListener("keydown", skipWithKeyboard);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      onClick={() => finish(true)}
      role="button"
      tabIndex={0}
      aria-label="Loading portfolio — press Enter, Space or Escape, or tap to skip"
      className={cn(
        "term fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink px-6 text-paper transition-transform duration-[100ms] ease-[cubic-bezier(.76,0,.24,1)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-acc focus-visible:outline-offset-2",
        gone ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className="blueprint-inv w-full max-w-xl">
        <pre aria-hidden="true" className="select-none font-ascii text-[clamp(14px,2.4vw,20px)] font-bold leading-[1.15] text-paper">
          {ASCII_LOGO.map((row, index) => (
            <div key={index}>{pct >= 100 ? row : scrambleRow(row, tick + index * 31)}</div>
          ))}
        </pre>

        <p className="mt-5 text-base font-semibold text-paper">Kiarash Akbari</p>
        <p className="mt-1 text-sm text-paper/70">AI &amp; Software Engineer</p>

        <div className="mt-8">
          <div className="mb-2 flex items-center justify-between gap-4 text-sm">
            <span className="text-paper/75">Loading portfolio</span>
            <span className="tabular font-semibold text-acc">{pct}%</span>
          </div>
          <div
            role="progressbar"
            aria-label="Portfolio loading progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            className="h-1.5 overflow-hidden bg-paper/20"
          >
            <div className="h-full bg-acc transition-[width] duration-100" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <p className="mt-4 text-sm text-paper/65">
          Tap anywhere or press Enter, Space, or Escape to skip.
        </p>
      </div>
    </div>
  );
}
