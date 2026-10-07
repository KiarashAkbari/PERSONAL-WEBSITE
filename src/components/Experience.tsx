import { EXPERIENCE } from "../data";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="log" className="relative border-b border-line">
      <SectionHead
        index="02"
        title="Experience"
        note="Client delivery, enterprise software, and applied AI research."
      />

      <div className="mx-auto max-w-6xl divide-y divide-line px-4 md:px-6">
        {EXPERIENCE.map((item, index) => (
          <Reveal key={item.id} delay={index * 50}>
            <article className="grid gap-3 py-7 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10 md:py-8">
              <div>
                <p className="text-sm font-semibold text-ink">{item.period}</p>
                {item.current && <p className="mt-1 text-sm font-medium text-acc">Current</p>}
                <p className="mt-1 text-sm text-ink/65">{item.where}</p>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold leading-snug text-ink md:text-2xl">
                  {item.role}
                </h3>
                <p className="mt-1 text-base font-semibold text-ink/85">{item.org}</p>
                <p className="mt-1 text-sm text-ink/60">{item.orgNote}</p>
                <ul className="mt-4 max-w-4xl space-y-2.5">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 copy-sm text-ink/75">
                      <span className="mt-0.5 text-acc" aria-hidden>•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
