import { useState } from "react";
import { ArrowUpRight, ChevronDown, Lock, Plus } from "lucide-react";
import { cn } from "../utils/cn";
import { PROJECTS, type Project } from "../data";
import SectionHead from "./SectionHead";
import AsciiImage from "./AsciiImage";
import Reveal from "./Reveal";

function Chip({ children }: { children: string }) {
  return (
    <span className="border border-line px-2.5 py-1 text-xs font-medium text-ink/75">
      {children}
    </span>
  );
}

function Schematic({ lines, title }: { lines: string[]; title: string }) {
  return (
    <details className="group border border-line bg-ink">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-paper marker:hidden">
        <span>View system sketch</span>
        <ChevronDown size={16} className="shrink-0 transition-transform group-open:rotate-180" aria-hidden />
      </summary>
      <pre className="scanlines relative overflow-x-auto border-t border-line-inv p-4 font-ascii text-[11px] leading-[1.6] text-paper/85 md:p-5">
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </pre>
      <p className="border-t border-line-inv px-4 py-2.5 text-xs leading-relaxed text-paper/75">
        {title}
      </p>
    </details>
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
  const hasVisual = Boolean(p.img || p.schematic);

  return (
    <article className="border-b border-line last:border-b-0">
      <button
        onClick={onToggle}
        data-cursor={open ? "CLOSE" : "DETAILS"}
        aria-expanded={open}
        aria-controls={`work-panel-${p.id}`}
        aria-label={`${open ? "Hide" : "View"} details for ${p.title}`}
        className={cn(
          "group flex w-full items-center gap-3 px-4 py-5 text-left transition-colors duration-200 md:gap-5 md:px-6",
          open ? "bg-ink text-paper" : "bg-paper hover:bg-ink/[0.035]"
        )}
      >
        <span className="w-7 shrink-0 font-mono text-xs font-semibold text-acc" aria-hidden>
          {p.index}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-[clamp(1.25rem,2.8vw,2rem)] font-bold leading-tight">
            {p.title}
          </span>
          <span
            className={cn(
              "mt-1 block text-sm leading-relaxed",
              open ? "text-paper/75" : "text-ink/65"
            )}
          >
            {p.sub}
          </span>
        </span>
        <span className="shrink-0 text-xs font-semibold">
          {open ? "Close" : "Details"}
        </span>
        <Plus
          size={18}
          strokeWidth={1.75}
          className={cn(
            "shrink-0 transition-transform duration-300",
            open && "rotate-[135deg] text-acc"
          )}
          aria-hidden
        />
      </button>

      <div
        id={`work-panel-${p.id}`}
        {...(!open ? ({ inert: true } as unknown as Record<string, unknown>) : {})}
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={cn(
              "grid gap-7 border-t border-line bg-paper px-4 py-7 md:px-6 md:py-8",
              hasVisual && "md:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)]"
            )}
          >
            <div>
              <p className="mb-3 text-sm font-medium text-ink/60">
                {p.year} <span className="mx-1 text-acc">·</span> {p.status}
              </p>
              <p className="copy max-w-3xl text-ink/80">{p.desc}</p>

              <h4 className="mt-6 text-base font-semibold text-ink">What I built</h4>
              <ul className="mt-2 space-y-2 border-t border-line pt-2">
                {p.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 copy-sm text-ink/75">
                    <span className="mt-0.5 font-bold text-acc" aria-hidden>·</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {p.flow && (
                <details className="group mt-5 border-y border-line">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-3 text-sm font-semibold text-ink marker:hidden">
                    <span>How it works</span>
                    <ChevronDown size={16} className="shrink-0 transition-transform group-open:rotate-180" aria-hidden />
                  </summary>
                  <pre className="scanlines relative mb-3 overflow-x-auto border border-ink bg-ink p-4 font-ascii text-xs leading-relaxed text-paper/85">
                    {p.flow.map((line, i) => (
                      <div key={i} className={line.trim() === "▼" || line.trim() === "│" ? "font-bold text-acc" : ""}>
                        {line}
                      </div>
                    ))}
                  </pre>
                </details>
              )}

              <div className="mt-5">
                <p className="mb-2 text-sm font-semibold text-ink">Built with</p>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((item) => <Chip key={item}>{item}</Chip>)}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {p.repo && (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="REPO"
                    aria-label={`Open ${p.title} repository on GitHub`}
                    className="group inline-flex items-center gap-2 border border-ink bg-ink px-4 py-3 text-sm font-semibold text-paper transition-colors hover:border-acc hover:bg-acc hover:text-ink"
                  >
                    View source
                    <ArrowUpRight size={15} aria-hidden />
                  </a>
                )}
                {p.private && (
                  <span className="inline-flex items-center gap-2 text-sm text-ink/65">
                    <Lock size={14} className="text-acc" aria-hidden />
                    Client code is private
                  </span>
                )}
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="LIVE"
                    aria-label={`Open ${p.title} live site`}
                    className="inline-flex items-center gap-2 border border-line px-4 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    Open live site
                    <ArrowUpRight size={15} aria-hidden />
                  </a>
                )}
              </div>
            </div>

            {hasVisual && open && (
              <div className="space-y-3">
                {p.img ? (
                  <>
                    <AsciiImage src={p.img} caption={p.fig} eager={p.id === "nids"} />
                  </>
                ) : p.schematic ? (
                  <Schematic lines={p.schematic} title={p.fig ?? p.title} />
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="work" className="relative border-b border-line">
      <SectionHead
        index="01"
        title="Selected Work"
        note="A selection of products and tools, from production software to applied AI."
      />
      <Reveal>
        <div className="divide-y divide-line border-b border-line">
          {PROJECTS.map((project) => (
            <Item
              key={project.id}
              p={project}
              open={openId === project.id}
              onToggle={() => setOpenId(openId === project.id ? null : project.id)}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
