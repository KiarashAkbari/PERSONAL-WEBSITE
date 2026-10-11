import { useState } from "react";
import { ArrowUpRight, ChevronDown, Lock } from "lucide-react";
import { PROJECTS, type Project } from "../data";
import { cn } from "../utils/cn";
import AsciiImage from "./AsciiImage";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

function Diagram({ lines }: { lines: string[] }) {
  return (
    <pre className="scanlines term iron-screen overflow-x-auto p-4 font-ascii text-[clamp(12px,1.25vw,16px)] leading-[1.5] text-paper/90 md:p-6">
      {lines.map((line, i) => (
        <div key={i} className="whitespace-pre">
          {line || " "}
        </div>
      ))}
    </pre>
  );
}

function Detail({ p }: { p: Project }) {
  const diagram = p.schematic ?? p.flow;
  return (
    <div className="grid gap-10 px-4 pb-10 pt-2 md:grid-cols-12 md:px-6">
      <div className="flex flex-col gap-7 md:col-span-6">
        {p.fig && <p className="eyebrow">{p.fig}</p>}
        <p className="copy text-[16px] text-ink/85">{p.desc}</p>
        <ul className="flex flex-col">
          {p.features.map((f, i) => (
            <li key={f} className="flex gap-4 border-t border-line py-3 text-sm leading-relaxed">
              <span className="font-mono text-[11px] text-acc">{String(i + 1).padStart(2, "0")}</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span key={s} className="border border-line px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink/80">
              {s}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 pt-1">
          {p.repo && (
            <a href={p.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 border-b-2 border-acc pb-0.5 text-sm font-bold">
              Source <ArrowUpRight size={14} aria-hidden />
            </a>
          )}
          {p.live && (
            <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 border-b-2 border-acc pb-0.5 text-sm font-bold">
              Live <ArrowUpRight size={14} aria-hidden />
            </a>
          )}
          {p.private && (
            <span className="inline-flex items-center gap-1.5 text-sm text-ink/70">
              <Lock size={13} aria-hidden /> Private client work — no public source
            </span>
          )}
        </div>
      </div>
      <div className="md:col-span-6">
        {p.img ? (
          <AsciiImage src={p.img} caption={p.fig} cols={84} />
        ) : diagram ? (
          <Diagram lines={diagram} />
        ) : null}
      </div>
    </div>
  );
}

export default function Work() {
  const [open, setOpen] = useState<string | null>(PROJECTS[0]?.id ?? null);

  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-20">
      <SectionHead id="work-title" index="01" title="Selected Work" note="Seven projects. Open a row to read the case." />
      <ul className="border-t border-line">
        {PROJECTS.map((p) => {
          const isOpen = open === p.id;
          return (
            <li key={p.id} className="border-b border-line">
              <Reveal>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`work-${p.id}`}
                  onClick={() => setOpen(isOpen ? null : p.id)}
                  data-cursor={isOpen ? "CLOSE" : "OPEN"}
                  className={cn(
                    "group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-4 px-4 py-6 text-left transition-colors duration-300 md:grid-cols-[5rem_1fr_7rem_11rem_3rem] md:gap-6 md:px-6 md:py-8",
                    isOpen ? "bg-ink text-paper" : "hover:bg-ink/[0.04]"
                  )}
                >
                  <span className={cn("font-mono text-xs font-bold", isOpen ? "text-acc" : "text-acc")}>{p.index}</span>
                  <span className="min-w-0">
                    <span className="block truncate text-[clamp(1.4rem,3.4vw,2.6rem)] font-bold leading-[1.02] tracking-[-0.03em]">
                      {p.title}
                    </span>
                    <span className={cn("mt-1.5 block text-sm", isOpen ? "text-paper/70" : "text-ink/65")}>{p.sub}</span>
                  </span>
                  <span className={cn("hidden font-mono text-xs md:block", isOpen ? "text-paper/70" : "text-ink/65")}>{p.year}</span>
                  <span className={cn("hidden font-mono text-[11px] uppercase tracking-[0.1em] md:block", isOpen ? "text-paper/70" : "text-ink/65")}>
                    {p.status}
                  </span>
                  <ChevronDown
                    size={20}
                    aria-hidden
                    className={cn("justify-self-end transition-transform duration-500", isOpen && "rotate-180 text-acc")}
                  />
                </button>
              </Reveal>
              <div id={`work-${p.id}`} className="acc-body" data-open={isOpen}>
                <div>
                  <Detail p={p} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
