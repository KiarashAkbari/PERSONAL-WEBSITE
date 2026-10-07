import { CAPABILITIES, EDUCATION } from "../data";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

export default function Profile() {
  return (
    <section id="profile" className="relative border-b border-line">
      <SectionHead
        index="03"
        title="About & Skills"
        note="How I approach engineering and the areas I work in."
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-9 md:px-6 md:py-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <Reveal>
          <div>
            <h3 className="font-display text-2xl font-bold leading-snug text-ink md:text-3xl">
              Software for practical problems.
            </h3>
            <p className="copy mt-4 max-w-xl text-ink/80">
              I’m a software engineer focused on backend development and applied AI. I’ve shipped a
              smart-home product catalog, built an assistant that answers building-code questions
              with citations, and researched machine-learning tools for network and financial data.
              I value clear interfaces, reliable systems, and answers people can verify.
            </p>
          </div>

          <div className="mt-9 border-t border-line pt-5">
            <h3 className="text-base font-semibold text-ink">Education</h3>
            <p className="mt-3 text-base font-semibold text-ink">{EDUCATION.degree}</p>
            <p className="mt-1 text-sm text-ink/65">{EDUCATION.school}</p>

            <h4 className="mt-6 text-sm font-semibold text-ink">Selected courses</h4>
            <ul className="mt-2 divide-y divide-line border-y border-line">
              {EDUCATION.certs.map(([certificate, issuer]) => (
                <li key={certificate} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2.5 text-sm">
                  <span className="font-medium text-ink/85">{certificate}</span>
                  <span className="text-ink/60">{issuer}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div>
            <h3 className="font-display text-2xl font-bold text-ink md:text-3xl">Areas of focus</h3>
            <div className="mt-4 divide-y divide-line border-y border-line">
              {CAPABILITIES.map((area) => (
                <article key={area.group} className="grid gap-1 py-4 sm:grid-cols-[170px_minmax(0,1fr)] sm:gap-5">
                  <h4 className="text-sm font-semibold text-acc">{area.group}</h4>
                  <p className="copy-sm text-ink/75">{area.summary}</p>
                </article>
              ))}
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
