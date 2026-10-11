import { CAPABILITIES, EDUCATION } from "../data";
import Reveal from "./Reveal";
import ScanMesh from "./ScanMesh";
import SectionHead from "./SectionHead";

export default function Profile() {
  return (
    <section id="profile" aria-labelledby="profile-title" className="scroll-mt-20">
      <SectionHead id="profile-title" index="03" title="About & Skills" note="How I think about software, and the tools I reach for." />

      <div className="grid gap-12 px-4 md:grid-cols-12 md:gap-8 md:px-6">
        <Reveal className="md:col-span-7">
          <p className="text-[clamp(1.5rem,3.2vw,2.5rem)] font-semibold leading-[1.18] tracking-[-0.025em]">
            I build backend and AI-integrated systems: a product catalog in production, a RAG assistant that cites its
            sources, anomaly detection on live traffic, and offline maps for unreliable networks.
          </p>
          <div className="mt-10 border-t border-line pt-6">
            <p className="eyebrow mb-4">Capabilities</p>
            <dl className="ios-group">
              {CAPABILITIES.map((c) => (
                <div key={c.group} className="ios-row grid gap-2 p-4 md:grid-cols-[13rem_1fr] md:gap-6 md:p-5">
                  <dt className="text-sm font-bold">{c.group}</dt>
                  <dd className="text-sm leading-relaxed text-ink/75">{c.summary}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <div className="flex flex-col gap-8 md:col-span-5">
          <Reveal delay={120}>
            <figure className="term iron-screen m-0">
              <div className="relative h-[300px] md:h-[340px]">
                <ScanMesh />
              </div>
              <figcaption className="flex items-center justify-between gap-3 border-t border-paper/20 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/80">
                <span>Computer Vision / Mesh Study</span>
                <span>2026</span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={180}>
            <div>
              <p className="eyebrow mb-4">Education</p>
              <div className="ios-group">
                <div className="ios-row p-4 md:p-5">
                  <p className="font-bold">{EDUCATION.degree}</p>
                  <p className="text-sm text-ink/65">{EDUCATION.school}</p>
                </div>
                {EDUCATION.certs.map(([name, by]) => (
                  <div key={name} className="ios-row flex items-baseline justify-between gap-4 p-4 md:p-5">
                    <span className="text-sm font-semibold">{name}</span>
                    <span className="shrink-0 font-mono text-[11px] text-ink/60">{by}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
