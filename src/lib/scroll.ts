import Lenis from "lenis";
import { prefersReducedMotionSync } from "../hooks/usePrefersReducedMotion";

let lenis: Lenis | null = null;
let rafId = 0;

function prefersReducedMotion(): boolean {
  return prefersReducedMotionSync();
}

export function initScroll(): Lenis {
  if (lenis) return lenis;
  // honor reduced-motion: no lerp smooth scrolling
  if (prefersReducedMotion()) {
    // create a no-op lenis so callers still have an instance, but don't hijack wheel
    lenis = new Lenis({
      lerp: 1,
      smoothWheel: false,
      wheelMultiplier: 1,
    });
    // do not start RAF loop — native scroll stays
    lenis.stop();
    return lenis;
  }
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
  // query first — fail immediately with a console warning rather than silent no-op
  const target = document.querySelector(id);
  if (!target) {
    console.warn(`[scroll] scrollToId: no element matches "${id}"`);
    return;
  }
  if (prefersReducedMotion()) {
    target.scrollIntoView({ behavior: "instant" as ScrollBehavior });
    return;
  }
  if (!lenis) {
    target.scrollIntoView({ behavior: "smooth" });
    return;
  }
  lenis.scrollTo(target as HTMLElement, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
}

export function scrollTop() {
  if (prefersReducedMotion()) {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    return;
  }
  if (!lenis) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  lenis.scrollTo(0, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
}

export function destroyScroll() {
  cancelAnimationFrame(rafId);
  rafId = 0;
  lenis?.destroy();
  lenis = null;
}

/** allow callers to check without importing matchMedia duplicates */
export function isReducedMotion(): boolean {
  return prefersReducedMotion();
}
