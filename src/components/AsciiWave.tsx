import { useEffect, useRef } from "react";
import { readPalette, useTheme } from "../theme/ThemeProvider";
import { prefersReducedMotionSync } from "../hooks/usePrefersReducedMotion";
import { cn } from "../utils/cn";

const RAMP = " .·:;=+*#%@";

/**
 * RIPPLE_FIELD.ASCII — classic 2D water simulation (height-field
 * wave equation on a character grid, two-buffer propagation).
 * The pointer disturbs the field; clicks splash. Ambient shimmer
 * keeps it breathing between rain drops. Pure lo-fi physics maths
 * through one monospace grid — the aino.agency signature.
 */
export default function AsciiWave({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ rainbow: false });
  const { theme, rainbow } = useTheme();
  stateRef.current = { rainbow };
  const palRef = useRef(readPalette());

  /* instant palette re-read on optic switch */
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      palRef.current = readPalette();
    });
    return () => cancelAnimationFrame(raf);
  }, [theme]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = prefersReducedMotionSync();

    let W = 0;
    let H = 0;
    let cols = 0;
    let rows = 0;
    const CW = 7;
    const CH = 12;
    let cur = new Float32Array(0);
    let nxt = new Float32Array(0);
    let running = true;
    let inView = true;
    let raf = 0;
    let last = 0;
    let lastDrop = 0;
    palRef.current = readPalette();
    let lastPal = 0;

    const disturb = (cx: number, cy: number, r: number, amp: number) => {
      for (let y = Math.max(1, cy - r); y < Math.min(rows + 1, cy + r); y++) {
        for (let x = Math.max(1, cx - r); x < Math.min(cols + 1, cx + r); x++) {
          const dx = x - cx;
          const dy = y - cy;
          if (dx * dx + dy * dy <= r * r) cur[y * (cols + 2) + x] += amp;
        }
      }
    };

    const resize = () => {
      const dpr = Math.min(1.6, window.devicePixelRatio || 1);
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.max(24, Math.floor(W / CW) - 2);
      rows = Math.max(10, Math.floor(H / CH) - 2);
      cur = new Float32Array((cols + 2) * (rows + 2));
      nxt = new Float32Array((cols + 2) * (rows + 2));
      /* seed some standing waves */
      for (let i = 0; i < 4; i++) {
        disturb(
          2 + Math.floor(Math.random() * cols),
          2 + Math.floor(Math.random() * rows),
          3,
          6
        );
      }
      ctx.font = `10px ui-monospace, "SF Mono", Menlo, Consolas, monospace`;
      ctx.textBaseline = "top";
    };
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const toCell = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      return {
        x: Math.round((e.clientX - r.left) / CW),
        y: Math.round((e.clientY - r.top) / CH),
      };
    };
    const onMove = (e: PointerEvent) => {
      const { x, y } = toCell(e);
      disturb(x, y, 2, 2.4);
    };
    const onDown = (e: PointerEvent) => {
      const { x, y } = toCell(e);
      disturb(x, y, 4, 14);
    };
    wrap.addEventListener("pointermove", onMove, { passive: true });
    wrap.addEventListener("pointerdown", onDown, { passive: true });

    const io = new IntersectionObserver(([e]) => (inView = e.isIntersecting), {
      threshold: 0.02,
    });
    io.observe(wrap);

    const stepPhysics = () => {
      const w = cols + 2;
      for (let y = 1; y <= rows; y++) {
        const row = y * w;
        for (let x = 1; x <= cols; x++) {
          const i = row + x;
          let v = (cur[i - 1] + cur[i + 1] + cur[i - w] + cur[i + w]) / 2 - nxt[i];
          nxt[i] = v * 0.982;
        }
      }
      const tmp = cur;
      cur = nxt;
      nxt = tmp;
    };

    const render = (now: number) => {
      raf = requestAnimationFrame(render);
      if (!running || !inView) return;
      if (now - last < 40) return;
      last = now;
      const t = now / 1000;
      if (now - lastPal > 500) {
        lastPal = now;
        palRef.current = readPalette();
      }
      const pal = palRef.current;
      const rb = stateRef.current.rainbow;

      /* rain */
      if (!reduce && now - lastDrop > 1200 + Math.random() * 900) {
        lastDrop = now;
        disturb(2 + Math.floor(Math.random() * cols), 2 + Math.floor(Math.random() * rows), 2, 5 + Math.random() * 5);
      }
      if (!reduce) stepPhysics();

      ctx.clearRect(0, 0, W, H);

      /* ambient sheen — batched per row as a single string */
      ctx.fillStyle = pal.ink;
      ctx.globalAlpha = 0.16;
      for (let y = 1; y <= rows; y++) {
        let line = "";
        for (let x = 1; x <= cols; x++) {
          const sheen = Math.sin(x * 0.31 + t * 0.9) * Math.sin(y * 0.47 - t * 0.6);
          line += sheen > 0.55 ? "·" : " ";
        }
        ctx.fillText(line, CW, y * CH);
      }

      /* wave crests / troughs — sparse per-cell pass */
      const w = cols + 2;
      for (let y = 1; y <= rows; y++) {
        for (let x = 1; x <= cols; x++) {
          const v = cur[y * w + x];
          const n = Math.max(-1, Math.min(1, v * 0.55));
          const m = Math.abs(n);
          if (m < 0.08) continue;
          const ch = RAMP[Math.min(RAMP.length - 1, Math.floor(m * RAMP.length))];
          if (ch === " ") continue;
          if (rb) {
            ctx.fillStyle = `hsl(${Math.floor(((x / cols) * 220 + t * 60) % 360)} 95% 58%)`;
            ctx.globalAlpha = 0.28 + m * 0.72;
          } else if (n > 0.5) {
            ctx.fillStyle = pal.acc;
            ctx.globalAlpha = Math.min(1, 0.35 + m * 0.75);
          } else {
            ctx.fillStyle = pal.ink;
            ctx.globalAlpha = 0.14 + m * 0.8;
          }
          ctx.fillText(ch, x * CW, y * CH);
        }
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(render);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerdown", onDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={wrapRef}
      className={cn("h-full w-full", className)}
      data-cursor="DISTURB"
      role="img"
      aria-label="Interactive ASCII wave simulation — move the pointer to create ripples"
    >
      <canvas ref={canvasRef} className="block h-full w-full" aria-hidden />
    </div>
  );
}
