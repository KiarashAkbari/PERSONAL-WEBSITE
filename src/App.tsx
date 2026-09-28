import { useEffect, useState } from "react";
import { ThemeProvider } from "./theme/ThemeProvider";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Work from "./components/Work";
import WaveBand from "./components/WaveBand";
import Experience from "./components/Experience";
import Profile from "./components/Profile";
import Signal from "./components/Signal";
import { TICKER_ITEMS } from "./data";
import { initScroll, destroyScroll, stopScroll, startScroll } from "./lib/scroll";

const AVAIL = [
  "OPEN_TO_WORK",
  "AI SOFTWARE ENGINEERING",
  "BACKEND & AI-INTEGRATED SYSTEMS",
  "REMOTE OK",
  "BRING A HARD PROBLEM",
];

function FrameTicks() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[85] hidden text-white mix-blend-difference md:block"
      aria-hidden
    >
      <div className="plus absolute left-3 top-[54px]" />
      <div className="plus absolute right-3 top-[54px]" />
      <div className="plus absolute bottom-3 left-3" />
      <div className="plus absolute bottom-3 right-3" />
      {/* side rulers */}
      <div className="absolute left-3 top-1/2 flex -translate-y-1/2 flex-col items-center gap-[10vh] text-[9px] tabular opacity-70">
        {[10, 20, 30, 40, 50].map((n) => (
          <span key={n} className="flex items-center gap-1">
            <span className="inline-block h-px w-2 bg-white" />
            {n}
          </span>
        ))}
      </div>
      <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col items-center gap-[10vh] text-[9px] tabular opacity-70">
        {[60, 70, 80, 90, 100].map((n) => (
          <span key={n} className="flex items-center gap-1">
            {n}
            <span className="inline-block h-px w-2 bg-white" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    initScroll();
    return () => destroyScroll();
  }, []);

  useEffect(() => {
    if (ready) startScroll();
    else stopScroll();
  }, [ready]);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-paper font-mono text-ink">
        {/* preloader unmounts after its slide-up completes — no idle loops left running */}
        {!booted && (
          <Preloader
            onDone={() => {
              setReady(true);
              setBooted(true);
            }}
          />
        )}
        <Cursor />
        <div className="noise-layer" aria-hidden />
        <FrameTicks />
        <Nav ready={ready} />

        <main>
          <Hero ready={ready} />
          <Marquee items={TICKER_ITEMS} inverted />
          <Work />
          <WaveBand />
          <Experience />
          <Profile />
          <Marquee items={AVAIL} slow />
          <Signal />
        </main>
      </div>
    </ThemeProvider>
  );
}
