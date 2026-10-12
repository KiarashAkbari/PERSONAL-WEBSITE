import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { CAPABILITIES, EDUCATION, EXPERIENCE, PROJECTS } from "@/data";
import { cn } from "@/utils/cn";

type MemoryChamberProps = {
  initialExpId?: string;
  onSelectProject: (projectId: string) => void;
  onPulse: () => void;
};

export default function MemoryChamber({
  initialExpId,
  onSelectProject,
  onPulse,
}: MemoryChamberProps) {
  const [activeLobeId, setActiveLobeId] = useState<string>(CAPABILITIES[0].id);
  const [activeExpId, setActiveExpId] = useState<string>(
    initialExpId ?? EXPERIENCE[0].id
  );

  useEffect(() => {
    if (initialExpId) setActiveExpId(initialExpId);
  }, [initialExpId]);

  const activeLobe =
    CAPABILITIES.find((c) => c.id === activeLobeId) ?? CAPABILITIES[0];

  return (
    <section
      id="panel-memory"
      role="tabpanel"
      aria-labelledby="tab-memory"
      className="chamber-stage border-b border-line"
    >
      {/* Chamber Masthead */}
      <div className="grid grid-cols-1 border-b border-line lg:grid-cols-12">
        <div className="border-b border-line p-5 sm:p-8 lg:col-span-7 lg:border-b-0 lg:border-r">
          <span className="meta-label">
            CHAMBER 04 // EPISODIC SERVICE LOG &amp; SEMANTIC CAPABILITY WEIGHTS
          </span>
          <h1 className="display-monograph mt-2 text-[clamp(2.3rem,5vw,4.5rem)] uppercase">
            Memory{" "}
            <span className="font-editorial font-normal italic lowercase text-ink-soft">
              trace &amp; imprint
            </span>
          </h1>
        </div>
        <div className="flex flex-col justify-center p-5 sm:p-8 lg:col-span-5">
          <p className="text-sm leading-relaxed text-ink/85">
            I build backend and AI-integrated systems: a product catalog in production, a RAG
            assistant that cites its sources, anomaly detection on live traffic, and offline maps
            for unreliable networks.
          </p>
        </div>
      </div>

      {/* Main Split Grid: Episodic Memory (Left) vs Semantic Skill Weights (Right) */}
      <div className="grid grid-cols-1 divide-y divide-line lg:grid-cols-12 lg:divide-x lg:divide-y-0">
        {/* Left 6 Columns: Episodic Service Record (Experience) */}
        <div className="flex flex-col justify-between p-5 sm:p-8 lg:col-span-6">
          <div>
            <div className="flex items-center justify-between border-b border-line pb-3">
              <span className="meta-label text-ink">
                01 // EPISODIC MEMORY — PROFESSIONAL EXPERIENCE
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                03 VERIFIED NODES
              </span>
            </div>

            <ol className="mt-5 space-y-4">
              {EXPERIENCE.map((exp) => {
                const isSelected = exp.id === activeExpId;
                const linkedSpecs = PROJECTS.filter((p) =>
                  exp.relatedProjects.includes(p.id)
                );

                return (
                  <li
                    key={exp.id}
                    onClick={() => {
                      setActiveExpId(exp.id);
                      onPulse();
                    }}
                    className={cn(
                      "cursor-pointer border p-5 transition-colors",
                      isSelected
                        ? "border-ink bg-paper-2/60"
                        : "border-line bg-paper hover:border-ink/50"
                    )}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10.5px] uppercase tracking-[0.15em]">
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-acc">MEM.{exp.index}</span>
                        <span className="text-ink-soft">{exp.period}</span>
                        {exp.current && (
                          <span className="border border-acc px-1.5 py-0.2 text-[9px] font-bold text-acc">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <span className="text-ink-soft">{exp.where}</span>
                    </div>

                    <h2 className="mt-3 text-xl font-bold tracking-tight text-ink sm:text-2xl">
                      {exp.role}
                    </h2>
                    <p className="mt-1 text-sm font-medium text-ink">
                      {exp.org}{" "}
                      <span className="font-editorial font-normal italic text-ink-soft">
                        — {exp.orgNote}
                      </span>
                    </p>

                    <ul className="mt-4 space-y-2 border-t border-line pt-3.5">
                      {exp.points.map((pt) => (
                        <li
                          key={pt}
                          className="flex items-start gap-3 text-sm leading-relaxed text-ink/85"
                        >
                          <span
                            className="mt-2 h-px w-3.5 shrink-0 bg-acc"
                            aria-hidden
                          />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3.5">
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="border border-line px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-soft"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {linkedSpecs.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          {linkedSpecs.map((spec) => (
                            <button
                              key={spec.id}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectProject(spec.id);
                              }}
                              className="inline-flex items-center gap-1 bg-ink px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.12em] text-paper transition-colors hover:bg-acc hover:text-[#09090a]"
                            >
                              <span>Spec.{spec.index}</span>
                              <ArrowUpRight size={10} aria-hidden />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Right 6 Columns: Semantic Skill Weights & Academic Imprint */}
        <div className="flex flex-col justify-between p-5 sm:p-8 lg:col-span-6">
          <div>
            <div className="flex items-center justify-between border-b border-line pb-3">
              <span className="meta-label text-ink">
                02 // SEMANTIC MEMORY — CAPABILITY LOBES
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                SELECT A LOBE TO TRACE SPECIMENS
              </span>
            </div>

            {/* Lobe Selector Grid */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {CAPABILITIES.map((cluster) => {
                const isSelected = cluster.id === activeLobeId;
                return (
                  <button
                    key={cluster.id}
                    type="button"
                    onClick={() => {
                      setActiveLobeId(cluster.id);
                      onPulse();
                    }}
                    className={cn(
                      "flex flex-col justify-between border p-4 text-left transition-colors",
                      isSelected
                        ? "border-ink bg-ink text-paper"
                        : "border-line bg-paper text-ink hover:bg-paper-2"
                    )}
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em]">
                      <span className={isSelected ? "text-acc" : "text-ink-soft"}>
                        {cluster.code}
                      </span>
                      <span className={isSelected ? "text-paper/75" : "text-ink-soft"}>
                        {cluster.items.length} NODES
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-bold tracking-tight">
                      {cluster.group}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 text-xs leading-relaxed",
                        isSelected ? "text-paper/80" : "text-ink-soft"
                      )}
                    >
                      {cluster.summary}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Active Lobe Pathway Breakdown */}
            <div className="mt-5 border border-line bg-paper-2/40 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
                <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.15em] text-ink">
                  ACTIVE PATHWAY // {activeLobe.code}: {activeLobe.group}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-acc">
                  {activeLobe.relatedProjects.length} CONNECTED SPECIMENS
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {activeLobe.items.map((skill) => (
                  <span
                    key={skill}
                    className="border border-ink/40 bg-paper px-3 py-1 font-mono text-xs font-medium text-ink"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-5 border-t border-line pt-4">
                <span className="meta-label">
                  ACTIVATED IN SPECIMENS (CLICK TO OPEN CASE FILE):
                </span>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {PROJECTS.filter((p) =>
                    activeLobe.relatedProjects.includes(p.id)
                  ).map((proj) => (
                    <button
                      key={proj.id}
                      type="button"
                      onClick={() => onSelectProject(proj.id)}
                      className="inline-flex items-center gap-2 border border-ink bg-paper px-3 py-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.13em] text-ink transition-colors hover:bg-ink hover:text-paper"
                    >
                      <span className="text-acc">{proj.index}</span>
                      <span>{proj.title}</span>
                      <ArrowUpRight size={12} aria-hidden />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Academic & Certification Imprint */}
          <div className="mt-8 border-t border-line pt-6">
            <div className="flex items-center justify-between pb-3">
              <span className="meta-label text-ink">
                03 // FOUNDATIONAL IMPRINT — EDUCATION &amp; CERTIFICATIONS
              </span>
            </div>

            <div className="border border-line bg-paper">
              <div className="flex flex-col justify-between gap-1 border-b border-line p-4 sm:flex-row sm:items-baseline">
                <span className="text-base font-bold text-ink">
                  {EDUCATION.degree}
                </span>
                <span className="font-editorial text-sm italic text-ink-soft">
                  {EDUCATION.school}
                </span>
              </div>
              <div className="grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                {EDUCATION.certs.map(([name, instructor], idx) => (
                  <div
                    key={name}
                    className={cn(
                      "flex items-baseline justify-between gap-3 p-3.5",
                      idx >= 2 && "sm:border-t sm:border-line"
                    )}
                  >
                    <span className="text-xs font-semibold text-ink">{name}</span>
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                      {instructor}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
