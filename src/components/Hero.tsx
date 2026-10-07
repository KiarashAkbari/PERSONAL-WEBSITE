import { ArrowDown, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import AsciiField from "./AsciiField";
import MorphText from "./MorphText";
import { scrollToId } from "../lib/scroll";
import { CONTACT } from "../data";

const SPECS: [string, string, boolean?][] = [
  ["Role", "AI Software Engineer"],
  ["Focus", "Backend Systems & Applied AI"],
  ["Location", `${CONTACT.location} · Remote Worldwide`],
  ["GitHub", "github.com/KiarashAkbari"],
  ["Status", "Open to Full-Time Roles & Projects", true],
];

const MORPH_PHRASES = [
  "RAG Architectures",
  "Graph & Vector Search",
  "FastAPI & Backend Systems",
  "Deep Learning Anomaly Detection",
  "Resilient Data Pipelines",
  "Production Web Platforms",
];

export default function Hero({ ready }: { ready: boolean }) {
  return (
    <section id="hero" className="relative border-b border-line pt-[42px]">
      {/* index strip */}
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5 text-xs text-ink/70 md:px-6">
        <span className="font-semibold tracking-wider">01 // Portfolio & Systems Overview</span>
        <span className="hidden md:inline text-ink/50">Kiarash Akbari · AI Engineering</span>
        <span className="flex items-center gap-1.5 font-semibold text-acc">
          <span className="inline-block h-1.5 w-1.5 animate-blink bg-acc" />
          Available for Work
        </span>
      </div>

      <div className="relative grid lg:grid-cols-12">
        {/* type column */}
        <div className="relative border-b border-line px-4 pb-10 pt-10 md:px-6 md:pt-14 lg:col-span-7 lg:border-b-0 lg:border-r lg:pb-14">
          {/* h1 split across two clipped reveals. `block` is load-bearing */}
          <h1 className="font-display text-[clamp(3.2rem,10vw,8.5rem)] font-bold leading-[0.88] tracking-tight text-ink">
            <Reveal as="span" clip className="block" delay={ready ? 100 : 400}>
              <span className="block">Kiarash</span>
            </Reveal>
            <Reveal as="span" clip className="block" delay={ready ? 180 : 500}>
              <span className="block text-ink">
                Akbari
              </span>
            </Reveal>
          </h1>

          <Reveal clip delay={ready ? 260 : 600}>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="border border-ink bg-ink px-3 py-1.5 text-xs font-bold tracking-wider text-paper">
                AI & Software Engineer
              </span>
              <span className="border border-line px-3 py-1.5 text-xs font-medium tracking-wide text-ink/75">
                Backend Architectures & Machine Learning
              </span>
            </div>
          </Reveal>

          {/* real-time morphing discipline line */}
          <Reveal delay={340}>
            <div className="mt-5 flex items-center gap-2 text-xs md:text-sm text-ink/80">
              <span className="font-bold text-acc">▸</span>
              <span className="font-semibold text-ink/60">Focus Areas:</span>
              <MorphText phrases={MORPH_PHRASES} className="font-bold text-ink" />
              <span className="ml-1 inline-block h-3.5 w-[7px] animate-blink bg-acc" />
            </div>
          </Reveal>

          <Reveal delay={420}>
            <p className="copy mt-6 max-w-xl text-base leading-relaxed text-ink/80">
              I design and build resilient AI-integrated systems, robust backend architectures,
              and high-performance data pipelines. Experienced in shipping production client platforms
              end-to-end, engineering hybrid graph/vector RAG pipelines with verified citations,
              and training unsupervised neural networks for network anomaly detection.
            </p>
          </Reveal>

          {/* spec sheet */}
          <Reveal delay={500}>
            <dl className="mt-8 max-w-xl border-t border-line">
              {SPECS.map(([k, v, hot]) => (
                <div
                  key={k}
                  className="group flex items-baseline justify-between gap-4 border-b border-line py-2.5 text-xs md:text-sm"
                >
                  <dt className="flex shrink-0 items-center gap-2 font-medium text-ink/55">
                    <span className="text-acc">›</span>
                    {k}
                  </dt>
                  <dd className="flex min-w-0 items-center justify-end gap-2 text-right font-semibold text-ink">
                    {hot && <span className="inline-block h-1.5 w-1.5 animate-blink bg-acc" />}
                    <span className={hot ? "text-acc" : ""}>{v}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={580}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToId("#work")}
                data-cursor="SCROLL"
                className="group inline-flex items-center gap-2.5 border border-ink bg-ink px-6 py-3.5 text-xs font-bold tracking-wider text-paper transition-colors hover:border-acc hover:bg-acc hover:text-ink"
              >
                Explore Projects
                <ArrowDown
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </button>

              <button
                onClick={() => scrollToId("#signal")}
                data-cursor="CONTACT"
                className="group inline-flex items-center gap-2.5 border border-line bg-transparent px-6 py-3.5 text-xs font-bold tracking-wider text-ink transition-colors hover:border-ink hover:bg-ink/[0.05]"
              >
                Get in Touch
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>
            </div>
          </Reveal>
        </div>

        {/* ASCII core column — interactive 3D planet */}
        <div className="relative min-h-[58vh] bg-ink text-paper lg:col-span-5 lg:min-h-[calc(100vh-90px)]">
          <AsciiField className="absolute inset-0" />
          <div className="scanlines pointer-events-none absolute inset-0" />
          <div className="scan-band pointer-events-none" />

          {/* HUD */}
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 md:p-6">
            <div className="flex items-start justify-between text-xs tracking-wider text-paper/70">
              <span className="font-semibold">Interactive 3D Neural Core</span>
              <span className="flex items-center gap-1.5 font-bold text-acc">
                <span className="inline-block h-2 w-2 animate-blink rounded-full bg-acc" />
                Live Physics
              </span>
            </div>
            
            <div className="flex items-end justify-between text-xs tracking-wide text-paper/70">
              <span className="hidden sm:inline">Move cursor to repel · Click for shockwave</span>
              <span className="sm:hidden">Tap to trigger shockwave</span>
              <span className="text-paper/40 font-mono text-[11px]">ASCII Point Cloud</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
