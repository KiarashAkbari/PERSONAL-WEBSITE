import { useEffect, useRef, useState } from "react";
import { prefersReducedMotionSync } from "../hooks/usePrefersReducedMotion";
import { cn } from "../utils/cn";

const RAMP = " .·:;=+*#%@";
const GLITCH = "█▓▒░<>#*+=";

type Burst = { cells: { i: number; t: number }[] };

/**
 * Dot-matrix image decoder — text-mode optics for raster captures.
 * BUGFIX vs upstream: `crossOrigin="anonymous"` is set *before* src
 * so remote (CORS-enabled) captures don't taint the decode canvas.
 * Decode burst plays on first scroll-into-view; hover flips to RAW.
 */
export default function AsciiImage({
  src,
  caption,
  cols = 72,
  eager,
  className,
}: {
  src: string;
  caption?: string;
  cols?: number;
  eager?: boolean;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [base, setBase] = useState<string[] | null>(null);
  const [shown, setShown] = useState<string[] | null>(null);
  const [err, setErr] = useState(false);
  const [hover, setHover] = useState(false);
  const progress = useRef(0);
  const rafRef = useRef(0);

  /* build ascii from image */
  useEffect(() => {
    let cancelled = false;
    setBase(null);
    setShown(null);
    setErr(false);
    progress.current = 0;
    const img = new Image();
    img.crossOrigin = "anonymous"; // must precede src assignment
    img.src = src;
    img.onload = () => {
      if (cancelled) return;
      const ratio = img.naturalHeight / img.naturalWidth;
      const rows = Math.max(8, Math.round(cols * ratio * 0.5));
      const cv = document.createElement("canvas");
      cv.width = cols;
      cv.height = rows;
      const ctx = cv.getContext("2d", { willReadFrequently: true });
      if (!ctx) return setErr(true);
      try {
        ctx.drawImage(img, 0, 0, cols, rows);
        const d = ctx.getImageData(0, 0, cols, rows).data;
        const lines: string[] = [];
        for (let y = 0; y < rows; y++) {
          let line = "";
          for (let x = 0; x < cols; x++) {
            const k = (y * cols + x) * 4;
            const lum = (0.2126 * d[k] + 0.7152 * d[k + 1] + 0.0722 * d[k + 2]) / 255;
            const boosted = Math.pow(lum, 0.8);
            line += RAMP[Math.min(RAMP.length - 1, Math.floor(boosted * RAMP.length))];
          }
          lines.push(line);
        }
        setBase(lines);
      } catch {
        setErr(true); // tainted canvas — fall back to raw capture
      }
    };
    img.onerror = () => setErr(true);
    return () => {
      cancelled = true;
    };
  }, [src, cols]);

  /* decode animation on view */
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !base) return;
    const reduce = prefersReducedMotionSync();
    if (reduce) {
      setShown(base);
      return;
    }
    const burst: Burst[] = base.map((_, y) => {
      const cells = [];
      for (let x = 0; x < cols; x++)
        cells.push({ i: y * cols + x, t: Math.pow(Math.random(), 1.6) });
      return { cells };
    });
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1100;
        const step = (now: number) => {
          const p = Math.min(1, (now - t0) / dur);
          progress.current = p;
          const out = base.map((line, y) => {
            let s = "";
            for (let x = 0; x < cols; x++) {
              const c = burst[y].cells[x];
              if (line[x] === " ") {
                s += " ";
                continue;
              }
              if (c.t <= p) s += line[x];
              else if (c.t - p < 0.13)
                s += GLITCH[(c.i * 31 + ((now / 90) | 0)) % GLITCH.length];
              else s += " ";
            }
            return s;
          });
          setShown(out);
          if (p < 1) rafRef.current = requestAnimationFrame(step);
        };
        rafRef.current = requestAnimationFrame(step);
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [base, cols]);

  /* fit: char grid width = cols·fs·0.6 must stay under ~330px for the
     narrowest card slot — the /1.7 divisor guarantees that at any cols */
  const fs = Math.max(5, Math.min(9, 924 / cols / 1.7));

  return (
    <figure
      ref={rootRef}
      className={cn("group/fig", className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-cursor="RAW"
    >
      <div className="relative border border-line bg-ink">
        {/* corners */}
        <div className="plus absolute left-2 top-2 z-10 text-paper/40" />
        <div className="plus absolute right-2 top-2 z-10 text-paper/40" />
        <div className="plus absolute bottom-2 left-2 z-10 text-paper/40" />
        <div className="plus absolute bottom-2 right-2 z-10 text-paper/40" />

        {err ? (
          <div className="flex min-h-[220px] items-center justify-center p-6 text-[10px] tracking-[0.3em] text-paper/50">
            [ SIGNAL_LOST — RAW BELOW ]
          </div>
        ) : (
          <pre
            className="scanlines relative select-none overflow-hidden p-3 font-ascii leading-[1.05] text-paper/85"
            style={{ fontSize: `${fs}px` }}
            aria-hidden
          >
            {(shown ?? base ?? []).map((l, i) => (
              <div key={i}>{l}</div>
            ))}
            {!base && <div className="p-6 text-[10px] tracking-[0.3em]">DECODING…</div>}
          </pre>
        )}

        {/* raw capture — pixel-stepped loader feel on hover */}
        <img
          src={src}
          alt={caption ?? "capture"}
          crossOrigin="anonymous"
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          decoding={eager ? "sync" : "async"}
          className={cn(
            "pixelated absolute inset-0 h-full w-full object-cover transition-opacity duration-150",
            hover || err ? "opacity-100" : "opacity-0"
          )}
        />
      </div>

      {/* caption bar */}
      {caption && (
        <figcaption className="flex items-center justify-between gap-4 pt-2 text-[9px] tracking-[0.08em] text-ink/45">
          <span className="truncate">{caption}</span>
          <span className="shrink-0 text-acc">OPTIC:{hover ? "RAW" : "ASCII"}</span>
        </figcaption>
      )}
    </figure>
  );
}
