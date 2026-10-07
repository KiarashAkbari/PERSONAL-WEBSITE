import { useState } from "react";
import { ArrowUpRight, Lock, Plus } from "lucide-react";
import { cn } from "../utils/cn";
import { PROJECTS, type Project } from "../data";
import SectionHead from "./SectionHead";
import AsciiImage from "./AsciiImage";
import Reveal from "./Reveal";

function Chip({ children, hot }: { children: string; hot?: boolean }) {
  return (
    <span
      className={cn(
        "border px-2.5 py-1 text-xs tracking-wide font-medium",
        hot ? "border-acc text-acc bg-acc/5" : "border-line text-ink/75"
      )}
    >
      {children}
    </span>
  );
}

function Schematic({ lines, title }: { lines: string[]; title: string }) {
  return (
    <div className="relative border border-line bg-ink">
      <pre className="scanlines relative select-none overflow-x-auto p-5 font-ascii text-[11px] leading-[1.6] text-paper/85">
        {lines.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </pre>
      <div className="border-t border-line-inv px-3.5 py-2 text-[11px] tracking-wide text-paper/60">
        {title}
      </div>
    </div>
  );
}

function Item({
  p,
  open,
  onToggle,
}: {
  p: Project;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-line last:border-b-0">
      <button
        onClick={onToggle}
        data-cursor={open ? "CLOSE" : "OPEN"}
        aria-expanded={open}
        aria-controls={`work-panel-${p.id}`}
        className={cn(
          "group flex w-full items-center gap-3 px-4 py-5 text-left transition-colors duration-300 md:gap-6 md:px-6",
          open ? "bg-ink text-paper" : "bg-paper hover:bg-ink/[0.035]"
        )}
      >
        <span className="w-8 shrink-0 font-mono text-xs font-bold tracking-wider text-acc" aria-hidden>
          {p.index}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-display text-[clamp(1.3rem,3.2vw,2.4rem)] font-bold leading-tight">
            {p.title}
          </span>
          <span
            className={cn(
              "mt-1 block truncate text-xs md:text-sm font-medium tracking-normal",
              open ? "text-paper/70" : "text-ink/60"
            )}
          >
            {p.sub}
          </span>
        </span>
        <span className="hidden shrink-0 flex-col items-end gap-1.5 font-mono text-xs lg:flex">
          <span className={open ? "text-paper/70" : "text-ink/65"}>
            {p.lang} <span className="text-acc">·</span> {p.year}
          </span>
          <span className="flex items-center gap-1.5 font-semibold text-acc">
            {p.private && <Lock size={11} className="text-acc" />}
            <span>[{p.status}]</span>
          </span>
        </span>
        <Plus
          size={20}
          strokeWidth={1.75}
          className={cn(
            "shrink-0 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
            open && "rotate-[135deg] text-acc"
          )}
        />
      </button>

      <div
        id={`work-panel-${p.id}`}
        className={cn(
          "grid transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="grid gap-8 border-t border-line bg-paper px-4 py-8 md:grid-cols-12 md:px-6 md:py-10">
            {/* details column */}
            <div className="md:col-span-7">
              <p className="copy max-w-2xl text-base leading-relaxed text-ink/80">{p.desc}</p>

              <h4 className="mt-8 flex items-center gap-2 text-xs font-bold tracking-wider text-ink">
                <span className="inline-block h-1.5 w-1.5 bg-acc" />
                Key Highlights & Architecture:
              </h4>
              <ul className="mt-3 border-t border-line">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-baseline gap-3 border-b border-line py-2.5 text-xs md:text-sm leading-relaxed text-ink/75"
                  >
                    <span className="font-bold text-acc">+</span>
                    {f}
                  </li>
                ))}
              </ul>

              {p.flow && (
                <div className="mt-8">
                  <h4 className="mb-3 text-xs font-bold tracking-wider text-ink/70">
                    Execution Pipeline:
                  </h4>
                  <pre className="scanlines relative overflow-x-auto border border-ink bg-ink p-4 font-ascii text-xs leading-relaxed text-paper/85">
                    {p.flow.map((line, i) => (
                      <div
                        key={i}
                        className={line.trim() === "▼" || line.trim() === "│" ? "text-acc font-bold" : ""}
                      >
                        {line}
                      </div>
                    ))}
                  </pre>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-2">
                {p.stack.map((s, i) => (
                  <Chip key={s} hot={i === 0}>
                    {s}
                  </Chip>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {p.repo && (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="REPO"
                    aria-label={`Open ${p.title} repository on GitHub`}
                    className="group inline-flex items-center gap-2 border border-ink bg-ink px-5 py-2.5 text-xs font-bold tracking-wider text-paper transition-colors hover:border-acc hover:bg-acc hover:text-ink"
                  >
                    View on GitHub
                    <ArrowUpRight
                      size={13}
                      aria-hidden
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                )}
                {p.private && (
                  <span className="inline-flex items-center gap-2 border border-acc/60 bg-acc/5 px-4 py-2.5 text-xs font-semibold text-acc">
                    <Lock size={12} aria-hidden />
                    Private Client Repository — Code Available on Request
                  </span>
                )}
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="LIVE"
                    aria-label={`Open ${p.title} live site`}
                    className="inline-flex items-center gap-2 border border-ink px-5 py-2.5 text-xs font-bold tracking-wider text-ink transition-colors hover:bg-ink hover:text-paper"
                  >
                    View Live Site
                    <ArrowUpRight size={13} aria-hidden />
                  </a>
                )}
              </div>
            </div>

            {/* visual column */}
            <div className="md:col-span-5">
              {p.img ? (
                <>
                  <AsciiImage src={p.img} caption={p.fig} eager={p.index === "03"} />
                  <p className="mt-2 text-xs leading-relaxed text-ink/50">
                    Interactive Preview: Hover to inspect raw capture mode
                  </p>
                </>
              ) : p.schematic ? (
                <Schematic lines={p.schematic} title={p.fig ?? p.title} />
              ) : (
                <div className="flex h-full min-h-[220px] items-center justify-center border border-line bg-ink/[0.02]">
                  <span className="font-display text-xl font-bold text-ink/20">
                    System Architecture
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const [openId, setOpenId] = useState<string | null>("vino");

  return (
    <section id="work" className="relative border-b border-line">
      <SectionHead
        index="02"
        title="Featured Projects"
        note="Production platforms, hybrid RAG systems, network security tooling, and resilient data engines."
      />
      <Reveal>
        <div className="border-b border-line">
          {PROJECTS.map((p) => (
            <Item
              key={p.id}
              p={p}
              open={openId === p.id}
              onToggle={() => setOpenId(openId === p.id ? null : p.id)}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
