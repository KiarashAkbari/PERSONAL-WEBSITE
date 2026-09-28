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
  "> BOOT KIA.SYS v5.2 — PERSONNEL_DOSSIER",
  "> MOUNT /dev/paper ................ [OK]",
  "> MOUNT /dev/ink .................. [OK]",
  "> LOAD MODULE ascii.core .......... [LINKED]",
  "> LOAD MODULE rag.pipeline ........ [LINKED]",
  "> LOAD SECTION resume.pdf ......... [IMPORTED]",
  "> CALIBRATE anomaly.threshold ..... σ3.2",
  "> AUTH KIARASH_AKBARI ............. [VERIFIED]",
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
  const t0 = useRef(performance.now());

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setGone(true);
    window.setTimeout(onDone, 620);
  };

  useEffect(() => {
    let raf = 0;
    let iv = 0;
    const DUR = 2100;
    const step = (now: number) => {
      const p = Math.min(1, (now - t0.current) / DUR);
      /* eased with tactical stalls — feels like a real boot */
      const eased = Math.min(1, p * (1 + 0.25 * Math.sin(p * 9)) * 1.08);
      setPct(Math.floor(Math.min(1, eased) * 100));
      if (p < 1) raf = requestAnimationFrame(step);
      else {
        setPct(100);
        window.clearInterval(iv); /* scramble halts once decoded */
        window.setTimeout(finish, 420);
      }
    };
    raf = requestAnimationFrame(step);
    iv = window.setInterval(() => setTick((t) => t + 1), 90);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(iv);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logCount = Math.max(1, Math.ceil((pct / 100) * LOGS.length));

  return (
    <div
      onClick={finish}
      className={cn(
        /* term = fixed firmware palette — always a dark terminal, both optics */
        "term fixed inset-0 z-[100] flex flex-col bg-ink text-paper transition-transform duration-[620ms] ease-[cubic-bezier(.76,0,.24,1)]",
        gone ? "-translate-y-full" : "translate-y-0"
      )}
      role="status"
      aria-label="Loading dossier"
    >
      <div className="blueprint-inv flex flex-1 flex-col items-start justify-center px-6 md:px-16">
        {/* ASCII logo — character decode on tick */}
        <pre className="select-none font-ascii text-[clamp(10px,2.4vw,16px)] font-bold leading-[1.15] text-paper">
          {ASCII_LOGO.map((row, i) => (
            <div key={i}>{pct >= 100 ? row : scrambleRow(row, tick + i * 31)}</div>
          ))}
        </pre>
        <p className="mt-4 text-[10px] tracking-[0.18em] text-paper/60">
          KIARASH AKBARI <span className="text-acc">//</span> AI_SOFTWARE_ENGINEER
        </p>

        {/* log */}
        <div className="mt-8 w-full max-w-xl font-mono text-[10px] leading-[1.9] text-paper/70 md:text-[11px]">
          {LOGS.slice(0, logCount).map((l, i) => (
            <div key={l}>
              {l.replace("[LINKED]", "[OK]")}
              {i === logCount - 1 && pct < 100 && (
                <span className="ml-1 inline-block h-3 w-[7px] animate-blink bg-acc align-middle" />
              )}
            </div>
          ))}
          {pct >= 100 && (
            <div className="text-acc">{"> ACCESS GRANTED — ENTERING DOSSIER ▓▓"}</div>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-paper/80">
              [{buildBar(pct / 100, 30, "█", "░")}]
            </span>
            <span className="tabular text-acc">{padNum(pct, 3)}%</span>
            <span className="text-paper/40">// TAP ANYWHERE TO SKIP</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-line-inv px-6 py-3 text-[9px] tracking-[0.18em] text-paper/50 md:px-16">
        <span>KIA.SYS // BOOT_SEQUENCE</span>
        <span className="hidden sm:inline">OPTIC:AUTO_DETECT</span>
        <span className="text-acc">EST.2024 ▓</span>
      </div>
    </div>
  );
}
