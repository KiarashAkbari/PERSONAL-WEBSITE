import { EXPERIENCE } from "../data";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

export default function Experience() {
  return (
    <section id="log" aria-labelledby="log-title" className="scroll-mt-20">
      <SectionHead id="log-title" index="02" title="Experience" note="Service record, most recent first." />
      <ol className="ios-group mx-4 md:mx-6">
        {EXPERIENCE.map((e, i) => (
          <li key={e.id} className="ios-row">
            <Reveal delay={i * 90}>
              <article className="grid gap-6 p-5 md:grid-cols-12 md:gap-8 md:p-8">
                <header className="flex flex-col gap-3 md:col-span-4">
                  <span className="font-mono text-[11px] text-acc">{e.index}</span>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink/70">
                    <span>{e.period}</span>
                    {e.current && <span className="tape">Current</span>}
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/60">{e.where}</span>
                </header>
                <div className="flex flex-col gap-4 md:col-span-8">
                  <h3 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold leading-[1.05] tracking-[-0.03em]">{e.role}</h3>
                  <p className="text-sm font-semibold">
                    {e.org} <span className="font-normal text-ink/60">— {e.orgNote}</span>
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {e.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-ink/85">
                        <span className="mt-2.5 h-px w-4 shrink-0 bg-acc" aria-hidden />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {e.tags.map((t) => (
                      <span key={t} className="bg-ink/[0.07] px-2.5 py-1 text-xs font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
