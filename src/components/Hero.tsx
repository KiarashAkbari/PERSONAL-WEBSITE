import { ArrowDown } from "lucide-react";
import Reveal from "./Reveal";
import AsciiField from "./AsciiField";
import MorphText from "./MorphText";
import { scrollToId } from "../lib/scroll";
import { CONTACT } from "../data";

const SPECS: [string, string, boolean?][] = [
  ["ROLE", "AI SOFTWARE ENGINEER"],
  ["FOCUS", "BACKEND & AI-INTEGRATED SYSTEMS"],
  ["BASE", `${CONTACT.location} — REMOTE OK`],
  ["SRC", "GITHUB.COM/KIARASHAKBARI"],
  ["STATUS", "OPEN_TO_WORK", true],
];

const MORPH_PHRASES = [
  "RAG_PIPELINES",
  "ANOMALY_DETECTION",
  "GRAPH⊕VECTOR_SEARCH",
  "OFFLINE-FIRST_TOOLING",
  "BACKEND_SYSTEMS",
  "GROUNDED_CITATIONS",
];

export default function Hero({ ready }: { ready: boolean }) {
  return (
    <section id="hero" className="relative border-b border-line pt-[42px]">
      {/* index strip */}
      <div className="flex items-center justify-between border-b border-line px-4 py-2 text-[9px] tracking-[0.16em] text-ink/60 md:px-6 md:text-[10px]">
        <span>01 // INDEX — PERSONNEL_DOSSIER</span>
        <span className="hidden md:inline">FILE: KIA_AKBARI.SYS</span>
        <span className="text-acc">EST.2024 ▓</span>
      </div>

      <div className="relative grid lg:grid-cols-12">
        {/* type column */}
        <div className="relative border-b border-line px-4 pb-8 pt-10 md:px-6 md:pt-14 lg:col-span-7 lg:border-b-0 lg:border-r lg:pb-12">
          <div className="pointer-events-none absolute left-1/2 top-10 hidden lg:block">
            <div className="plus text-ink/25" />
          </div>

          <Reveal clip delay={ready ? 100 : 800}>
            <h1 className="xcond font-display text-[clamp(3.4rem,12vw,10.5rem)] font-bold leading-[0.84] tracking-[-0.015em]">
              KIARASH
            </h1>
          </Reveal>
          <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
            <Reveal clip delay={ready ? 220 : 920}>
              <h1 className="xcond font-display text-[clamp(3.4rem,12vw,10.5rem)] font-bold leading-[0.84] tracking-[-0.015em]">
                AKBARI
                <span className="ml-3 align-top font-mono text-sm font-normal tracking-normal text-acc">
                  [v5.2]
                </span>
              </h1>
            </Reveal>
          </div>

          <Reveal clip delay={ready ? 340 : 1040}>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="stroke-ink cond font-display text-[clamp(1.8rem,4.6vw,3.6rem)] font-bold leading-none">
                AI_ENGINEER®
              </span>
              <span className="border border-ink px-2 py-1 text-[9px] tracking-[0.3em] md:text-[10px]">
                SIGNAL <span className="text-acc">&gt;</span> NOISE
              </span>
            </div>
          </Reveal>

          {/* real-time morphing discipline line — aino-style */}
          <Reveal delay={460}>
            <p className="mt-5 flex items-center gap-2 text-[11px] tracking-[0.1em] text-ink/75 md:text-xs">
              <span className="text-acc">▸</span>
              DEPLOYING::
              <MorphText phrases={MORPH_PHRASES} className="font-bold text-ink" />
              <span className="ml-1 inline-block h-3 w-[7px] animate-blink bg-acc" />
            </p>
          </Reveal>

          <Reveal delay={540}>
            <p className="copy mt-6 max-w-md text-ink/75">
              AI software engineer for backend and AI-integrated systems — shipped
              a production product platform end-to-end, engineered RAG
              correctness for hybrid graph/vector Q&amp;A, and trained
              autoencoders that flag zero-day intrusions by reconstruction
              error. Everything below is running code, not vaporware.
            </p>
          </Reveal>

          {/* spec sheet */}
          <Reveal delay={640}>
            <dl className="mt-10 max-w-xl border-t border-line">
              {SPECS.map(([k, v, hot]) => (
                <div
                  key={k}
                  className="group flex items-baseline justify-between gap-4 border-b border-line py-2 text-[10px] md:text-[11px]"
                >
                  {/* keys are short → they keep the wide technical tracking */}
                  <dt className="flex shrink-0 items-center gap-2 tracking-[0.2em] text-ink/50">
                    <span className="text-ink/30">›</span>
                    {k}
                  </dt>
                  {/* values are long prose-strings → tight tracking or they ribbon out */}
                  <dd className="flex min-w-0 items-center justify-end gap-2 text-right font-bold tracking-[0.04em]">
                    {hot && <span className="inline-block h-1.5 w-1.5 animate-blink bg-acc" />}
                    <span className={hot ? "text-acc" : ""}>{v}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={760}>
            <button
              onClick={() => scrollToId("#work")}
              data-cursor="SCROLL"
              className="group mt-10 inline-flex items-center gap-3 border border-ink bg-ink px-5 py-3 text-[10px] font-bold tracking-[0.2em] text-paper transition-colors hover:border-acc hover:bg-acc hover:text-ink"
            >
              OPEN_WORK_RECORDS
              <ArrowDown
                size={13}
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </button>
          </Reveal>
        </div>

        {/* ASCII core column */}
        <div className="relative min-h-[58vh] bg-ink text-paper lg:col-span-5 lg:min-h-[calc(100vh-90px)]">
          <AsciiField className="absolute inset-0" />
          <div className="scanlines pointer-events-none absolute inset-0" />
          <div className="scan-band pointer-events-none" />

          {/* HUD */}
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 md:p-5">
            <div className="flex items-start justify-between text-[9px] tracking-[0.14em] text-paper/60">
              <span>FIG.01 — NEURAL_CORE.ASCII</span>
              <span className="text-acc">OPTICS:LIVE ⦿</span>
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="plus text-paper/30" />
            </div>
            <div className="flex items-end justify-between text-[9px] tabular tracking-[0.12em] text-paper/60">
              <span>
                σ:3.2 <span className="text-paper/30">//</span> ANOMALY:
                <span className="text-acc">FLAGGED</span>
              </span>
              <span className="hidden sm:inline">MOVE:REPEL · CLICK:SHOCKWAVE</span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 animate-blink bg-acc" />
                REC
              </span>
            </div>
          </div>

          <div className="plus absolute left-3 top-3 text-paper/40" />
          <div className="plus absolute right-3 top-3 text-paper/40" />
          <div className="plus absolute bottom-3 left-3 text-paper/40" />
          <div className="plus absolute bottom-3 right-3 text-paper/40" />
        </div>
      </div>
    </section>
  );
}
