import Lenis from "lenis";

let lenis: Lenis | null = null;
let rafId = 0;

export function initScroll(): Lenis {
  if (lenis) return lenis;
  lenis = new Lenis({
    lerp: 0.092,
    smoothWheel: true,
    wheelMultiplier: 1,
  });
  const raf = (t: number) => {
    lenis?.raf(t);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);
  return lenis;
}

export function stopScroll() {
  lenis?.stop();
}

export function startScroll() {
  lenis?.start();
}

export function scrollToId(id: string) {
  if (!lenis) {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    return;
  }
  lenis.scrollTo(id, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
}

export function scrollTop() {
  if (!lenis) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  lenis.scrollTo(0, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
}

export function destroyScroll() {
  cancelAnimationFrame(rafId);
  lenis?.destroy();
  lenis = null;
}
