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
  "Available for Full-Time Roles & Consulting",
  "AI & Backend Software Engineering",
  "RAG & Intelligent Architectures",
  "Distributed Teams & Remote Worldwide",
  "Let's Build Something Great",
];

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
        {/* sleek fast preloader */}
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
