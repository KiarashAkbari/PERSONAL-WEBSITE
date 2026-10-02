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
        "border px-2 py-1 text-[9px] tracking-[0.14em]",
        hot ? "border-acc text-acc" : "border-line text-ink/70"
      )}
    >
      {children}
    </span>
  );
}

function Schematic({ lines, title }: { lines: string[]; title: string }) {
  return (
    <div className="relative border border-line bg-ink">
      <div className="plus absolute left-2 top-2 z-10 text-paper/40" />
      <div className="plus absolute right-2 top-2 z-10 text-paper/40" />
      <div className="plus absolute bottom-2 left-2 z-10 text-paper/40" />
      <div className="plus absolute bottom-2 right-2 z-10 text-paper/40" />
      <pre className="scanlines relative select-none overflow-x-auto p-5 font-ascii text-[8.5px] leading-[1.5] text-paper/85 md:text-[10px]">
        {lines.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </pre>
      <div className="border-t border-line-inv px-3 py-2 text-[8.5px] tracking-[0.08em] text-paper/45">
        {title} — NO_PUBLIC_CAPTURE // SCHEMATIC_RENDER
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
          "group flex w-full items-center gap-3 px-4 py-5 text-left transition-colors duration-300 md:gap-5 md:px-6",
          open ? "bg-ink text-paper" : "bg-paper hover:bg-ink/[0.045]"
        )}
      >
        <span className="w-8 shrink-0 font-mono text-[10px] tracking-[0.3em] text-acc" aria-hidden>
          {p.index}
        </span>
        <span className="min-w-0 flex-1">
          {/* h3 inside <button> is invalid HTML — use accessible spans with heading role via aria */}
          <span className="cond block truncate font-display text-[clamp(1.4rem,4vw,2.9rem)] font-bold leading-[0.95]">
            {p.title}
            <span
              className={cn(
                "ml-3 align-middle font-mono text-[9px] font-normal tracking-[0.25em]",
                open ? "text-paper/40" : "text-ink/35"
              )}
              aria-hidden
            >
              .EXE
            </span>
          </span>
          <span
            className={cn(
              "mt-1.5 block truncate font-mono text-[9px] tracking-[0.09em] md:text-[10px]",
              open ? "text-paper/55" : "text-ink/50"
            )}
          >
            {p.sub}
          </span>
        </span>
        <span className="hidden shrink-0 flex-col items-end gap-1 font-mono text-[9px] tracking-[0.25em] lg:flex">
          <span className={open ? "text-paper/55" : "text-ink/55"}>
            {p.lang} <span className="text-acc">//</span> {p.year}
          </span>
          <span className="flex items-center gap-2">
            {p.private && <Lock size={9} className="text-acc" />}
            <span className="text-acc">[{p.status}]</span>
          </span>
        </span>
        <Plus
          size={20}
          strokeWidth={1.5}
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
            {/* details column — the readable part */}
            <div className="md:col-span-7">
              <p className="copy max-w-2xl text-ink/80">{p.desc}</p>

              <h4 className="mt-8 flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] text-ink">
                <span className="inline-block h-1.5 w-1.5 bg-acc" />
                CORE_CAPABILITIES://
              </h4>
              <ul className="mt-3 border-t border-line">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="copy-sm flex items-baseline gap-3 border-b border-line py-2 text-ink/75"
                  >
                    <span className="text-acc">+</span>
                    {f}
                  </li>
                ))}
              </ul>

              {p.flow && (
                <div className="mt-8">
                  <h4 className="mb-3 text-[10px] font-bold tracking-[0.3em] text-ink/60">
                    PIPELINE://
                  </h4>
                  <pre className="scanlines relative overflow-x-auto border border-ink bg-ink p-4 font-ascii text-[10px] leading-[1.7] text-paper/85 md:text-[11px]">
                    {p.flow.map((line, i) => (
                      <div
                        key={i}
                        className={line.trim() === "▼" || line.trim() === "│" ? "text-acc" : ""}
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
                    className="group inline-flex items-center gap-2 border border-ink bg-ink px-5 py-3 text-[10px] font-bold tracking-[0.18em] text-paper transition-colors hover:border-acc hover:bg-acc hover:text-ink"
                  >
                    OPEN_REPO
                    <ArrowUpRight
                      size={13}
                      aria-hidden
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                )}
                {p.private && (
                  <span className="inline-flex items-center gap-2 border border-acc px-5 py-3 text-[10px] font-bold tracking-[0.12em] text-acc">
                    <Lock size={12} aria-hidden />
                    PRIVATE_TEAM_REPO — CODEBASE ON REQUEST
                  </span>
                )}
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="LIVE"
                    aria-label={`Open ${p.title} live site`}
                    className="inline-flex items-center gap-2 border border-ink px-5 py-3 text-[10px] font-bold tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-paper"
                  >
                    LIVE_SITE
                    <ArrowUpRight size={13} aria-hidden />
                  </a>
                )}
                <span className="font-mono text-[9px] tracking-[0.25em] text-ink/40">
                  SRC:RESUME.PDF <span className="text-acc">▸</span> VERIFIED
                </span>
              </div>
            </div>

            {/* visual column */}
            <div className="md:col-span-5">
              {p.img ? (
                <>
                  <AsciiImage src={p.img} caption={`FIG.${p.index}A — ${p.fig}`} eager={p.index === "03"} />
                  <p className="mt-2 font-mono text-[9px] leading-relaxed tracking-[0.08em] text-ink/40">
                    HOVER TO SWITCH OPTICS <span className="text-acc">⇆</span> ASCII ↔
                    RAW_CAPTURE
                  </p>
                </>
              ) : p.schematic ? (
                <Schematic lines={p.schematic} title={`FIG.${p.index}S — ${p.fig ?? p.title}`} />
              ) : (
                <div className="flex h-full min-h-[220px] items-center justify-center border border-line">
                  <span className="cond font-display text-3xl font-bold text-ink/15">
                    NO_SIGNAL
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
        title="WORK_RECORDS"
        note={`SOURCE: GITHUB.COM/KIARASHAKBARI + RESUME.PDF — ${PROJECTS.length} RECORDS FOUND. CLICK TO DECRYPT DETAILS.`}
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
