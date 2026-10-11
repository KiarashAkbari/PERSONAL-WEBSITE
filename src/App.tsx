import { useEffect } from "react";
import { ThemeProvider } from "./theme/ThemeProvider";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Work from "./components/Work";
import Experience from "./components/Experience";
import WaveLab from "./components/WaveLab";
import Profile from "./components/Profile";
import Signal from "./components/Signal";
import { initScroll, destroyScroll } from "./lib/scroll";

const TICKER = ["RAG", "FastAPI", "Neo4j", "ChromaDB", "TensorFlow", "Playwright", "React", "TypeScript", "Docker", "Scapy", "PostgreSQL"];

export default function App() {
  useEffect(() => {
    initScroll();
    return () => destroyScroll();
  }, []);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-paper font-sans text-ink">
        <a href="#hero" className="skip-link">
          Skip to content
        </a>
        <div className="noise-layer" aria-hidden />
        <Nav />
        <main className="pb-24 pt-[84px] md:pb-0">
          <Hero />
          <Marquee items={TICKER} />
          <Work />
          <Experience />
          <WaveLab />
          <Profile />
          <Signal />
        </main>
      </div>
    </ThemeProvider>
  );
}
