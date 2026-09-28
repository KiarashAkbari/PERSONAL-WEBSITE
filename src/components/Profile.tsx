import { CAPABILITIES, CONTACT, EDUCATION, GH, TIMELINE } from "../data";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import { ArrowUpRight, GraduationCap } from "lucide-react";

const DOSSIER: [string, string][] = [
  ["NAME", "KIARASH AKBARI"],
  ["ROLE", "AI SOFTWARE ENGINEER"],
  ["SCOPE", "BACKEND & AI-INTEGRATED SYSTEMS"],
  ["BASE", CONTACT.location],
  ["REMOTE", `YES — ${CONTACT.tz}`],
  ["MAIL", CONTACT.email.toUpperCase()],
  ["STATUS", "OPEN_TO_WORK"],
];

const TAGS = ["PRAGMATIC", "SYSTEMS-FIRST", "SHIPS CODE"];

export default function Profile() {
  return (
    <section id="profile" className="relative border-b border-line">
      <SectionHead
        index="04"
        title="PROFILE"
        note="PERSONNEL DOSSIER — STATEMENT, ENGAGEMENT LOG, EDUCATION + CAPABILITY MATRIX. SOURCED FROM RESUME.PDF."
      />

      <div className="grid lg:grid-cols-2">
        {/* statement */}
        <div className="border-b border-line px-4 py-10 md:px-6 lg:border-b-0 lg:border-r">
          <Reveal>
            <h3 className="xcond font-display text-[clamp(2.4rem,5.4vw,4.6rem)] font-bold leading-[0.9]">
              MACHINES THAT NOTICE WHAT
              <span className="text-acc"> HUMANS MISS.</span>
            </h3>
          </Reveal>
          <Reveal delay={120}>
            <p className="copy mt-6 max-w-md text-ink/75">
              AI software engineer working where machine learning meets
              adversarial reality. Shipped a production product platform
              end-to-end, contributed backend and RAG engineering to a hybrid
              graph/vector AI system for BIM data, and built a full ML pipeline
              for network anomaly detection — currently applying ML research at
              the Dotin Financial Technologies Laboratory, Ferdowsi University
              of Mashhad. I care about systems that keep running when
              conditions stop being polite.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-bold tracking-[0.3em]">
              {TAGS.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="text-acc">▸</span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* timeline */}
          <Reveal delay={260}>
            <h4 className="mt-12 flex items-center gap-2 text-[10px] font-bold tracking-[0.3em]">
              <span className="inline-block h-1.5 w-1.5 bg-acc" />
              ENGAGEMENT_LOG://
            </h4>
            <div className="mt-3 border-t border-line">
              {TIMELINE.map(([year, tag, blurb]) => (
                <div
                  key={tag + year}
                  className="group grid grid-cols-[64px_1fr] gap-x-4 border-b border-line py-2.5 md:grid-cols-[80px_130px_1fr]"
                >
                  <span className="pt-0.5 text-[10px] tabular tracking-[0.12em] text-ink/45">
                    {year}
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.18em] text-acc">
                    {tag}
                  </span>
                  <span className="copy-sm col-span-2 mt-1 text-ink/70 md:col-span-1 md:mt-0">
                    {blurb}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* dossier + capabilities */}
        <div className="px-4 py-10 md:px-6">
          <Reveal>
            <div className="border border-line">
              <h4 className="flex items-center justify-between border-b border-line px-4 py-3 text-[10px] font-bold tracking-[0.3em]">
                PERSONNEL.DAT
                <span className="flex items-center gap-1.5 text-acc">
                  <span className="inline-block h-1.5 w-1.5 animate-blink bg-acc" />
                  SYNCED
                </span>
              </h4>
              <dl>
                {DOSSIER.map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-4 border-b border-line px-4 py-2.5 text-[10px] last:border-b-0"
                  >
                    <dt className="shrink-0 tracking-[0.2em] text-ink/45">{k}</dt>
                    <dd className="min-w-0 truncate text-right font-bold tracking-[0.04em]">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          {/* CAPABILITY_MATRIX.CSV — titles only. No bars. No numbers. */}
          <Reveal delay={120}>
            <div className="mt-8 border border-line">
              <h4 className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3 text-[10px] font-bold tracking-[0.3em]">
                CAPABILITY_MATRIX.CSV
                <span className="text-[8.5px] font-normal tracking-[0.25em] text-acc">
                  TITLES_ONLY
                </span>
              </h4>
              <div className="px-4 py-4">
                {CAPABILITIES.map((g) => (
                  <div key={g.group} className="mb-5 last:mb-0">
                    <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.28em] text-acc">
                      <span className="inline-block h-1.5 w-1.5 bg-acc" />
                      {g.group}
                    </div>
                    <ul className="mt-2 border-t border-line">
                      {g.rows.map((label) => (
                        /* capability titles run long (e.g. the RAG row) —
                           tight tracking keeps them on one readable line */
                        <li
                          key={label}
                          className="border-b border-line py-1.5 text-[10.5px] tracking-[0.04em] text-ink/80 md:text-[11px]"
                        >
                          {label}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="border-t border-line px-4 py-3 text-[9px] leading-[1.75] tracking-[0.06em] text-ink/45">
                NOTE: SELF-SCORED BARS + NUMERIC SCALES REMOVED BY REQUEST —
                TITLES SPEAK FOR THEMSELVES. GROUND TRUTH AVAILABLE{" "}
                <a
                  href={GH}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="GH"
                  className="font-bold text-ink underline decoration-acc decoration-1 underline-offset-4 transition-colors hover:text-acc"
                >
                  ON_GITHUB
                  <ArrowUpRight size={10} className="mb-0.5 ml-0.5 inline" />
                </a>
              </p>
            </div>
          </Reveal>

          {/* education + certifications — resume.pdf §05 */}
          <Reveal delay={200}>
            <div className="mt-8 border border-line">
              <h4 className="flex items-center justify-between gap-2 border-b border-line px-4 py-3 text-[10px] font-bold tracking-[0.3em]">
                <span className="flex items-center gap-2">
                  <GraduationCap size={13} className="text-acc" />
                  EDUCATION.LOG
                </span>
                <span className="text-[8.5px] font-normal tracking-[0.25em] text-ink/45">
                  §05_RESERVE
                </span>
              </h4>
              <div className="px-4 py-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-2.5">
                  <span className="text-[11px] font-bold tracking-[0.08em]">
                    {EDUCATION.degree}
                  </span>
                  <span className="text-[9.5px] tracking-[0.14em] text-ink/55">
                    {EDUCATION.school}
                  </span>
                </div>
                <ul className="mt-1">
                  {EDUCATION.certs.map(([cert, issuer]) => (
                    <li
                      key={cert}
                      className="flex items-baseline justify-between gap-3 border-b border-line py-1.5 text-[10px] last:border-b-0"
                    >
                      <span className="tracking-[0.05em] text-ink/80">
                        <span className="mr-2 text-acc">+</span>
                        {cert}
                      </span>
                      <span className="shrink-0 text-[8.5px] tracking-[0.12em] text-ink/45">
                        {issuer}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
