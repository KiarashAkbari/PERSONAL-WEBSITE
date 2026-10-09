import { useEffect, useState } from "react";
import { ThemeProvider } from "./theme/ThemeProvider";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Work from "./components/Work";
import WaveBand from "./components/WaveBand";
import Experience from "./components/Experience";
import Profile from "./components/Profile";
import Signal from "./components/Signal";
import { initScroll, destroyScroll, stopScroll, startScroll } from "./lib/scroll";

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
      <div className="punk-page relative min-h-screen bg-paper font-display text-ink">
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
          <Work />
          <Experience />
          <Profile />
          <WaveBand />
          <Signal />
        </main>
      </div>
    </ThemeProvider>
  );
}
