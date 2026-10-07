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

const LOGS = [
  "> Kiarash Akbari — Portfolio",
  "> Loading UI & interactive physics engines ... [OK]",
  "> Linking projects & technical experience .... [OK]",
  "> Portfolio ready",
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

function buildBar(p: number, w: number, fill: string, empty: string) {
  const n = Math.round(p * w);
  return fill.repeat(n) + empty.repeat(Math.max(0, w - n));
}

function padNum(n: number, w: number) {
  return String(n).padStart(w, "0");
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
      // Let a manual skip cut short the brief automatic exit transition.
      if (instant && finishTimerRef.current !== null) {
        window.clearTimeout(finishTimerRef.current);
        finishTimerRef.current = null;
        onDone();
      }
      return;
    }
    doneRef.current = true;
    setGone(true);

    // A manual skip removes the overlay immediately. The automatic finish
    // gets a brief exit transition while keeping total blocking time < 700ms.
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
    const DUR = 520;
    t0.current = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0.current) / DUR);
      setPct(Math.floor(p * 100));
      if (p < 1) rafRef.current = requestAnimationFrame(step);
      else {
        setPct(100);
        if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
        finish();
      }
    };
    rafRef.current = requestAnimationFrame(step);
    intervalRef.current = window.setInterval(() => setTick((t) => t + 1), 60);
    const skipWithKeyboard = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " " && e.key !== "Escape") return;
      const target = e.target as HTMLElement | null;
      if (
        target?.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName ?? "")
      )
        return;
      e.preventDefault();
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

  const logCount = Math.max(1, Math.ceil((pct / 100) * LOGS.length));

  return (
    <div
      onClick={() => finish(true)}
      role="button"
      tabIndex={0}
      aria-label="Loading portfolio — press Enter, Space or Escape, or tap to skip"
      className={cn(
        "term fixed inset-0 z-[100] flex flex-col bg-ink text-paper transition-transform duration-[100ms] ease-[cubic-bezier(.76,0,.24,1)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-acc focus-visible:outline-offset-2",
        gone ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className="blueprint-inv flex flex-1 flex-col items-start justify-center px-6 md:px-16">
        {/* ASCII logo */}
        <pre className="select-none font-ascii text-[clamp(10px,2.4vw,16px)] font-bold leading-[1.15] text-paper">
          {ASCII_LOGO.map((row, i) => (
            <div key={i}>{pct >= 100 ? row : scrambleRow(row, tick + i * 31)}</div>
          ))}
        </pre>
        <p className="mt-4 text-xs font-semibold tracking-wider text-paper/70">
          Kiarash Akbari <span className="text-acc">//</span> AI & Software Engineer
        </p>

        {/* log */}
        <div className="mt-6 w-full max-w-xl font-mono text-xs leading-relaxed text-paper/70">
          {LOGS.slice(0, logCount).map((l, i) => (
            <div key={l}>
              {l}
              {i === logCount - 1 && pct < 100 && (
                <span className="ml-1 inline-block h-3 w-[7px] animate-blink bg-acc align-middle" />
              )}
            </div>
          ))}
          {pct >= 100 && (
            <div className="font-semibold text-acc">{"> Welcome"}</div>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
            <span className="text-paper/80">
              [{buildBar(pct / 100, 24, "█", "░")}]
            </span>
            <span className="tabular font-semibold text-acc">{padNum(pct, 3)}%</span>
            <span className="text-paper/40">· Tap anywhere or press Space to skip</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-line-inv px-6 py-3 text-[11px] tracking-wider text-paper/50 md:px-16">
        <span>Kiarash Akbari Portfolio</span>
        <span className="hidden sm:inline">Interactive Systems</span>
        <span className="text-acc">2026</span>
      </div>
    </div>
  );
}
