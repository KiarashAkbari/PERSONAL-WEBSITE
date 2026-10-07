import { cn } from "../utils/cn";
import { EXPERIENCE } from "../data";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

/**
 * Professional work experience component.
 */
export default function Experience() {
  return (
    <section id="log" className="relative border-b border-line">
      <SectionHead
        index="02"
        title="Experience"
        note="Client delivery, enterprise software, and applied AI research."
      />

      <div className="divide-y divide-line">
        {EXPERIENCE.map((e, k) => (
          <Reveal key={e.id} delay={k * 70}>
            <article className="group grid transition-colors duration-300 hover:bg-ink/[0.025] md:grid-cols-12">
              {/* index + period rail */}
              <div className="flex items-start justify-between gap-4 border-b border-line px-4 py-6 md:col-span-3 md:border-b-0 md:border-r md:px-6">
                <div>
                  <div className="font-mono text-xs font-bold tracking-wider text-acc">
                    [{e.index}]
                  </div>
                  <div className="mt-2.5 flex items-center gap-2 text-xs font-semibold text-ink">
                    {e.current && (
                      <span className="inline-block h-2 w-2 animate-blink rounded-full bg-acc" />
                    )}
                    {e.period}
                  </div>
                  <div className="mt-1 text-xs text-ink/50">{e.where}</div>
                </div>
              </div>

              {/* role + points */}
              <div className="px-4 py-6 md:col-span-6 md:px-6">
                <h3 className="font-display text-[clamp(1.2rem,2.2vw,1.75rem)] font-bold leading-snug text-ink">
                  {e.role}
                </h3>
                <p className="mt-1 text-xs md:text-sm font-semibold text-ink/80">
                  {e.org}
                </p>
                <p className="mt-0.5 text-xs text-ink/50">{e.orgNote}</p>
                <ul className="mt-4 space-y-2.5">
                  {e.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-baseline gap-2.5 text-xs md:text-sm leading-relaxed text-ink/75"
                    >
                      <span className="font-bold text-acc">▸</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* tags */}
              <div className="flex flex-wrap content-start items-start gap-2 border-t border-line px-4 py-6 md:col-span-3 md:border-t-0 md:border-l md:px-6">
                {e.tags.map((t) => (
                  <span
                    key={t}
                    className={cn(
                      "border border-line bg-paper px-2.5 py-1 text-xs font-medium text-ink/70",
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
