import { ArrowRight, Briefcase, FolderOpen, Mail, User } from "lucide-react";
import AsciiField from "./AsciiField";
import Reveal from "./Reveal";
import { EXPERIENCE, PROJECTS } from "../data";
import { scrollToId } from "../lib/scroll";
import { cn } from "../utils/cn";

const TILES = [
  { id: "#work", label: "Projects", count: PROJECTS.length, icon: FolderOpen, tone: "app-tile-ink" },
  { id: "#log", label: "Experience", count: EXPERIENCE.length, icon: Briefcase, tone: "app-tile-steel" },
  { id: "#profile", label: "About", count: "•", icon: User, tone: "app-tile-steel" },
  { id: "#signal", label: "Contact", count: "@", icon: Mail, tone: "app-tile-acc" },
] as const;

export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative overflow-hidden px-4 pb-14 pt-6 md:px-6 md:pb-20 md:pt-8">
      <div className="eyebrow flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
        <span>
          <span className="text-acc">KA—01</span> / Software &amp; Applied AI
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-acc" aria-hidden />
          Open to full-time roles
        </span>
      </div>

      <div className="grid gap-10 pt-8 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col justify-between gap-10 lg:col-span-7">
          <Reveal>
            <h1 id="hero-title" className="poster">
              <span className="block">Kiarash</span>
              <span className="outline-ink block">
                Akbari<span className="text-acc">/</span>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="tape">AI Software Engineer</span>
                <span className="eyebrow">Mashhad, Iran · Available remotely</span>
              </div>
              <p className="copy max-w-xl text-ink/85 md:text-[17px]">
                I build reliable software for practical problems—from smart-home products to AI tools that answer
                building-code questions and identify unusual network traffic.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#work"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId("#work");
                  }}
                  data-cursor="PROJECTS"
                  className="group inline-flex items-center gap-2.5 bg-ink px-5 py-3.5 text-sm font-bold text-paper transition-colors hover:bg-acc hover:text-[#0c0d0f]"
                >
                  View selected work
                  <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#signal"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId("#signal");
                  }}
                  className="inline-flex items-center gap-2.5 border border-ink px-5 py-3.5 text-sm font-bold transition-colors hover:bg-ink hover:text-paper"
                >
                  Get in touch
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* the iron device holding the 3D ASCII field */}
        <Reveal delay={220} className="lg:col-span-5">
          <div className="iron-bezel">
            <div className="iron-screen term relative h-[400px] md:h-[500px]">
              <AsciiField className="absolute inset-0" scale={1.55} />
              <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/80">
                <span>Field 01 / ASCII</span>
                <span>3D · Live</span>
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/70">
                <span className="hidden sm:inline">Move to shape · Click for a ripple</span>
                <span className="sm:hidden">Tap for a ripple</span>
                <span className="text-right">Neural<br />study / 01</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* springboard: app tiles as navigation */}
      <Reveal delay={260}>
        <nav aria-label="Jump to section" className="mt-14 grid grid-cols-4 gap-4 md:mt-20 md:max-w-3xl md:gap-8">
          {TILES.map((t) => (
            <a
              key={t.id}
              href={t.id}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(t.id);
              }}
              className="group flex flex-col items-center gap-2.5 text-center"
            >
              <span className={cn("app-icon relative grid aspect-square w-full max-w-[104px] place-items-center", t.tone)}>
                <t.icon size={28} aria-hidden strokeWidth={1.6} />
                <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-ink px-1.5 py-0.5 font-mono text-[10px] leading-none text-paper">
                  {t.count}
                </span>
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] md:text-xs">{t.label}</span>
            </a>
          ))}
        </nav>
      </Reveal>
    </section>
  );
}
