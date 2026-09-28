import { cn } from "../utils/cn";
import { EXPERIENCE } from "../data";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

/**
 * SERVICE_RECORD.LOG — professional experience, imported 1:1 from
 * resume.pdf (VINO platform · TELUS · Dotin Financial Technologies Lab).
 */
export default function Experience() {
  return (
    <section id="log" className="relative border-b border-line">
      <SectionHead
        index="03"
        title="SERVICE_RECORD"
        note="SOURCE: RESUME.PDF — PROFESSIONAL EXPERIENCE, VERIFIED AGAINST DELIVERED BUILDS."
      />

      {/* divide-y draws row hairlines between Reveal wrappers */}
      <div className="divide-y divide-line">
        {EXPERIENCE.map((e, k) => (
          <Reveal key={e.id} delay={k * 70}>
            <article className="group grid transition-colors duration-300 hover:bg-ink/[0.035] md:grid-cols-12">
              {/* index + period rail */}
              <div className="flex items-start justify-between gap-4 border-b border-line px-4 py-5 md:col-span-3 md:border-b-0 md:border-r md:px-6">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.3em] text-acc">
                    [{e.index}]
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-[10px] tabular tracking-[0.2em] text-ink/70">
                    {e.current && (
                      <span className="inline-block h-1.5 w-1.5 animate-blink bg-acc" />
                    )}
                    {e.period}
                  </div>
                  <div className="mt-1 text-[9px] tracking-[0.25em] text-ink/45">{e.where}</div>
                </div>
                <div className="plus mt-1 hidden text-ink/20 md:block" />
              </div>

              {/* role + points */}
              <div className="px-4 py-5 md:col-span-6 md:px-6">
                <h3 className="cond font-display text-[clamp(1.3rem,2.6vw,2rem)] font-bold leading-[0.95]">
                  {e.role}
                </h3>
                {/* org strings run very long (Dotin lab) — tight tracking */}
                <p className="mt-1.5 text-[10px] font-bold tracking-[0.06em] text-ink/80">
                  {e.org}
                </p>
                <p className="mt-0.5 text-[9px] tracking-[0.1em] text-ink/45">{e.orgNote}</p>
                <ul className="mt-4 space-y-2">
                  {e.points.map((pt) => (
                    <li
                      key={pt}
                      className="copy-sm flex items-baseline gap-3 text-ink/75"
                    >
                      <span className="text-acc">▸</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>

              {/* tags */}
              <div className="flex flex-wrap content-start items-start gap-2 border-t border-line px-4 py-5 md:col-span-3 md:border-t-0 md:border-l md:px-6">
                {e.tags.map((t) => (
                  <span
                    key={t}
                    className={cn(
                      "border border-line px-2 py-1 text-[8.5px] tracking-[0.12em] text-ink/60",
                      "transition-colors group-hover:border-ink/30"
                    )}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
