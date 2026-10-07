import { CAPABILITIES, CONTACT, EDUCATION, GH, TIMELINE } from "../data";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import { ArrowUpRight, GraduationCap } from "lucide-react";

const DOSSIER: [string, string][] = [
  ["Name", "Kiarash Akbari"],
  ["Role", "AI Software Engineer"],
  ["Focus", "Backend Architectures & Machine Learning"],
  ["Location", `${CONTACT.location} (UTC+03:30)`],
  ["Remote", "Available Worldwide"],
  ["Email", CONTACT.email],
  ["Status", "Open to Opportunities"],
];

const TAGS = ["Systems Thinking", "Production Quality", "Reliable Delivery"];

export default function Profile() {
  return (
    <section id="profile" className="relative border-b border-line">
      <SectionHead
        index="04"
        title="About & Skills"
        note="Engineering philosophy, technical skill matrix, education, and career milestones."
      />

      <div className="grid lg:grid-cols-2">
        {/* statement & timeline */}
        <div className="border-b border-line px-4 py-10 md:px-6 lg:border-b-0 lg:border-r">
          <Reveal>
            <h3 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-tight text-ink">
              Engineering for Resilience &amp; Real-World Impact.
            </h3>
          </Reveal>
          
          <Reveal delay={120}>
            <p className="copy mt-5 max-w-xl text-base leading-relaxed text-ink/80">
              I am an AI software engineer focused on building robust, scalable systems where
              machine learning meets practical production demands. My work spans end-to-end client
              architectures, verifiable RAG pipelines utilizing graph and vector databases,
              and deep learning models for network defense. Currently conducting applied machine
              learning research at the Dotin Financial Technologies Laboratory (FANAP Group / Ferdowsi
              University of Mashhad). I prioritize deterministic data flows, clean software design,
              and systems that perform reliably under real-world conditions.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {TAGS.map((t) => (
                <li
                  key={t}
                  className="border border-line bg-paper px-3 py-1 text-xs font-semibold text-ink/80"
                >
                  <span className="text-acc mr-1.5">▸</span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* timeline */}
          <Reveal delay={260}>
            <h4 className="mt-12 flex items-center gap-2 text-xs font-bold tracking-wider text-ink">
              <span className="inline-block h-1.5 w-1.5 bg-acc" />
              Career Milestones &amp; Journey:
            </h4>
            <div className="mt-3 border-t border-line">
              {TIMELINE.map(([year, tag, blurb]) => (
                <div
                  key={tag + year}
                  className="group grid grid-cols-[64px_1fr] gap-x-4 border-b border-line py-3 md:grid-cols-[72px_150px_1fr]"
                >
                  <span className="pt-0.5 text-xs font-semibold tabular text-ink/50">
                    {year}
                  </span>
                  <span className="text-xs font-bold text-acc">
                    {tag}
                  </span>
                  <span className="col-span-2 mt-1 text-xs md:text-sm leading-relaxed text-ink/75 md:col-span-1 md:mt-0">
                    {blurb}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* education & certifications */}
          <Reveal delay={320}>
            <div className="mt-10 border border-line">
              <div className="flex items-center justify-between border-b border-line px-4 py-3 bg-ink/[0.02]">
                <span className="flex items-center gap-2 text-xs font-bold tracking-wider text-ink">
                  <GraduationCap size={15} className="text-acc" />
                  Education &amp; Credentials
                </span>
                <span className="text-xs text-ink/50">Academic &amp; Professional</span>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-3">
                  <span className="text-sm font-bold text-ink">
                    {EDUCATION.degree}
                  </span>
                  <span className="text-xs font-medium text-ink/60">
                    {EDUCATION.school}
                  </span>
                </div>
                <ul className="mt-2 divide-y divide-line">
                  {EDUCATION.certs.map(([cert, issuer]) => (
                    <li
                      key={cert}
                      className="flex items-baseline justify-between gap-3 py-2 text-xs"
                    >
                      <span className="font-medium text-ink/80">
                        <span className="mr-2 text-acc">+</span>
                        {cert}
                      </span>
                      <span className="shrink-0 text-xs text-ink/50">
                        {issuer}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        {/* dossier + capabilities */}
        <div className="px-4 py-10 md:px-6">
          <Reveal>
            <div className="border border-line">
              <div className="flex items-center justify-between border-b border-line px-4 py-3 bg-ink/[0.02]">
                <h4 className="text-xs font-bold tracking-wider text-ink">
                  Professional Profile Snapshot
                </h4>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-acc">
                  <span className="inline-block h-1.5 w-1.5 animate-blink bg-acc" />
                  Verified
                </span>
              </div>
              <dl className="divide-y divide-line">
                {DOSSIER.map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-4 px-4 py-2.5 text-xs md:text-sm"
                  >
                    <dt className="shrink-0 font-medium text-ink/50">{k}</dt>
                    <dd className="min-w-0 truncate text-right font-semibold text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          {/* technical skills */}
          <Reveal delay={120}>
            <div className="mt-8 border border-line">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3 bg-ink/[0.02]">
                <h4 className="text-xs font-bold tracking-wider text-ink">
                  Technical Skills &amp; Competencies
                </h4>
                <span className="text-xs font-medium text-acc">
                  Categorized Directory
                </span>
              </div>
              <div className="p-4 space-y-6">
                {CAPABILITIES.map((g) => (
                  <div key={g.group}>
                    <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-acc">
                      <span className="inline-block h-1.5 w-1.5 bg-acc" />
                      {g.group}
                    </div>
                    <ul className="mt-2 border-t border-line divide-y divide-line">
                      {g.rows.map((label) => (
                        <li
                          key={label}
                          className="py-2 text-xs md:text-sm text-ink/80 flex items-center justify-between"
                        >
                          <span>{label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="border-t border-line px-4 py-3 text-xs leading-relaxed text-ink/60 bg-ink/[0.01] flex items-center justify-between">
                <span>All source implementations and repositories:</span>
                <a
                  href={GH}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="GH"
                  className="font-bold text-ink underline decoration-acc decoration-1 underline-offset-4 transition-colors hover:text-acc inline-flex items-center gap-1"
                >
                  Explore on GitHub
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
