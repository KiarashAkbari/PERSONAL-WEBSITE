import { useEffect, useRef } from "react";
import { readPalette, useTheme } from "../theme/ThemeProvider";
import { prefersReducedMotionSync } from "../hooks/usePrefersReducedMotion";
import { cn } from "../utils/cn";

const RAMP = " .·:;=+*#%@";

type V3 = { x: number; y: number; z: number; kind: number; s: number };

function buildCore(n: number): V3[] {
  const pts: V3[] = [];
  const ga = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const th = ga * i;
    pts.push({
      x: Math.cos(th) * r,
      y,
      z: Math.sin(th) * r,
      kind: 0,
      s: Math.random(),
    });
  }
  return pts;
}

function buildRing(n: number, rad: number, tilt: number, jit: number): V3[] {
  const pts: V3[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const r = rad + (Math.random() - 0.5) * jit * rad;
    let x = Math.cos(a) * r;
    let y = 0;
    let z = Math.sin(a) * r;
    const y2 = y * Math.cos(tilt) - z * Math.sin(tilt);
    const z2 = y * Math.sin(tilt) + z * Math.cos(tilt);
    y = y2;
    z = z2;
    pts.push({ x, y, z, kind: 1, s: Math.random() });
  }
  return pts;
}

function buildDust(n: number): V3[] {
  const pts: V3[] = [];
  for (let i = 0; i < n; i++) {
    const r = 2.2 + Math.random() * 1.6;
    const a = Math.random() * Math.PI * 2;
    const b = Math.acos(2 * Math.random() - 1);
    pts.push({
      x: r * Math.sin(b) * Math.cos(a),
      y: r * Math.cos(b),
      z: r * Math.sin(b) * Math.sin(a),
      kind: 2,
      s: Math.random(),
    });
  }
  return pts;
}

/**
 * NEURAL_CORE.ASCII — 3D point cloud rendered through an ASCII ramp.
 * Aino-style upgrades: every projected point is a physical particle —
 * the pointer repels it (spring-damped return), clicks fire impulse
 * waves through the field. Palette re-reads on optic switch; rainbow
 * mode hue-cycles the ramp (the easter egg, with love to aino.agency).
 */
export default function AsciiField({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, rainbow } = useTheme();
  const stateRef = useRef({ theme, rainbow });
  stateRef.current = { theme, rainbow };
  const palRef = useRef(readPalette());

  /* instant palette re-read on optic switch — next frame, after the
     class flip, so the canvas never lags behind the page */
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

    const core = buildCore(1500);
    const ringA = buildRing(520, 1.5, 0.5, 0.05);
    const ringB = buildRing(360, 1.86, -0.85, 0.04);
    const dust = buildDust(220);
    const all = [...core, ...ringA, ...ringB, ...dust];
    const N = all.length;

    /* particle physics state (screen space) */
    const ox = new Float32Array(N);
    const oy = new Float32Array(N);
    const vx = new Float32Array(N);
    const vy = new Float32Array(N);

    let W = 0;
    let H = 0;
    let dpr = 1;
    let fs = 11;
    let cellW = fs * 0.6;
    let cellH = fs;
    let S = 100;

    const mouse = { x: -9999, y: -9999, tx: 0, ty: 0 };
    const impulses: { x: number; y: number; t: number }[] = [];
    let running = true;
    let inView = true;
    let raf = 0;
    let last = 0;
    let spin = 0.6;
    const reduce = prefersReducedMotionSync();

    palRef.current = readPalette();
    let lastPal = 0;
    const grid = new Map<number, { z: number; ch: string; c: string; a: number }>();

    const resize = () => {
      dpr = Math.min(1.6, window.devicePixelRatio || 1);
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fs = Math.max(8, Math.min(13, Math.floor(W / 92)));
      cellW = fs * 0.6;
      cellH = fs;
      S = Math.min(W, H) * 0.36;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const lx = e.clientX - r.left;
      const ly = e.clientY - r.top;
      mouse.x = lx;
      mouse.y = ly;
      mouse.tx = (lx / r.width) * 2 - 1;
      mouse.ty = (ly / r.height) * 2 - 1;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.tx = 0;
      mouse.ty = 0;
    };
    const onDown = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      impulses.push({ x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() });
      if (impulses.length > 4) impulses.shift();
    };
    wrap.addEventListener("pointermove", onMove, { passive: true });
    wrap.addEventListener("pointerleave", onLeave, { passive: true });
    wrap.addEventListener("pointerdown", onDown, { passive: true });

    const render = (now: number) => {
      if (!running || !inView) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(render);
      if (now - last < 33) return; // ~30fps like the spec
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const t = now / 1000;
      if (!reduce) spin += dt * 0.22;

      /* backup re-read — also follows the rainbow accent animation */
      if (now - lastPal > 500) {
        lastPal = now;
        palRef.current = readPalette();
      }
      const pal = palRef.current;

      const cx = W / 2;
      const cy = H / 2;
      const tiltX = mouse.ty * 0.35;
      const tiltY = mouse.tx * 0.6;

      grid.clear();
      const { rainbow: rb } = stateRef.current;

      for (let i = 0; i < N; i++) {
        const p = all[i];

        /* rotate around Y (+ mouse tilt) then X */
        const aY = spin * (p.kind === 1 ? 1.35 : 1) + p.s * 0.02 + tiltY * 0.8;
        const cosY = Math.cos(aY);
        const sinY = Math.sin(aY);
        let x = p.x * cosY - p.z * sinY;
        let z = p.x * sinY + p.z * cosY;
        let y = p.y;
        const aX = 0.42 + tiltX;
        const cosX = Math.cos(aX);
        const sinX = Math.sin(aX);
        const y2 = y * cosX - z * sinX;
        const z2 = y * sinX + z * cosX;
        y = y2;
        z = z2;

        const persp = 3.4 / (3.4 + z);
        let sx = cx + x * S * persp;
        let syy = cy + y * S * persp;

        /* -------- AINO 2D PHYSICS LAYER -------- */
        if (!reduce) {
          /* pointer repulsion */
          const dx = sx - mouse.x;
          const dy = syy - mouse.y;
          const d2 = dx * dx + dy * dy;
          const R = 120;
          if (d2 < R * R && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = (1 - d / R) * 230 * dt;
            vx[i] += (dx / d) * f;
            vy[i] += (dy / d) * f;
          }
          /* impulse shockwaves from clicks */
          for (let q = 0; q < impulses.length; q++) {
            const im = impulses[q];
            const age = (now - im.t) / 1000;
            if (age > 1.1) continue;
            const waveR = age * 520;
            const idx = sx - im.x;
            const idy = syy - im.y;
            const id = Math.sqrt(idx * idx + idy * idy) || 1;
            const band = Math.abs(id - waveR);
            if (band < 46) {
              const amp = (1 - age / 1.1) * (1 - band / 46) * 410 * dt;
              vx[i] += (idx / id) * amp;
              vy[i] += (idy / id) * amp;
            }
          }
          /* spring return + damping */
          vx[i] += -ox[i] * 0.07;
          vy[i] += -oy[i] * 0.07;
          vx[i] *= 0.86;
          vy[i] *= 0.86;
          ox[i] += vx[i];
          oy[i] += vy[i];
          sx += ox[i];
          syy += oy[i];
        }

        if (sx < -20 || sx > W + 20 || syy < -20 || syy > H + 20) continue;

        const nf = Math.max(0, Math.min(1, (persp - 0.68) / 0.42));
        let ch: string;
        let color: string = pal.paper;
        let alpha = 0.28 + nf * 0.72;

        if (p.kind === 2) {
          const tw = 0.5 + 0.5 * Math.sin(t * 1.4 + p.s * 5);
          if (tw > 0.86) {
            ch = "@";
            color = pal.acc;
            alpha = 0.95;
          } else {
            ch = ".";
            alpha *= 0.5;
          }
        } else {
          ch = RAMP[Math.min(RAMP.length - 1, 1 + Math.floor(nf * (RAMP.length - 1.4)))];
          if (Math.abs(nf) > 0.86) {
            color = pal.acc;
            alpha = Math.min(1, alpha + 0.25);
          }
          if (rb && ch !== " ") {
            /* rainbow optic — hue flows across the field */
            const hue = Math.floor(((sx / W) * 140 + (syy / H) * 90 + t * 46) % 360);
            color = `hsl(${hue} 96% 58%)`;
            if (alpha < 0.75) alpha = 0.75;
          }
        }

        const gx = Math.round(sx / cellW);
        const gy = Math.round(syy / cellH);
        const key = gx + gy * 4096;
        const ex = grid.get(key);
        if (!ex || z < ex.z) grid.set(key, { z, ch, c: color, a: alpha });
      }

      ctx.clearRect(0, 0, W, H);
      /* plotting grid — OS monospace keeps cell advances exact */
      ctx.font = `${fs}px ui-monospace, "SF Mono", Menlo, Consolas, monospace`;
      ctx.textBaseline = "top";
      grid.forEach((v, key) => {
        ctx.globalAlpha = v.a;
        ctx.fillStyle = v.c;
        ctx.fillText(v.ch, (key % 4096) * cellW, Math.floor(key / 4096) * cellH);
      });

      /* occasional glitch row */
      if (!reduce && Math.random() < 0.012) {
        const gy = Math.floor(Math.random() * (H / cellH));
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = pal.acc;
        for (let gx = 0; gx < W / cellW; gx += 3) {
          ctx.fillText(RAMP[2 + Math.floor(Math.random() * (RAMP.length - 3))], gx * cellW, gy * cellH);
        }
      }
      ctx.globalAlpha = 1;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) {
          if (!raf) {
            last = 0;
            raf = requestAnimationFrame(render);
          }
        } else {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0.02 }
    );
    io.observe(wrap);
    raf = requestAnimationFrame(render);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      wrap.removeEventListener("pointerdown", onDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={wrapRef}
      className={cn("h-full w-full", className)}
      data-cursor="CORE"
      role="img"
      aria-label="Animated ASCII point-cloud of a neural core, reacting to the pointer"
    >
      <canvas ref={canvasRef} className="block h-full w-full" aria-hidden />
    </div>
  );
}
