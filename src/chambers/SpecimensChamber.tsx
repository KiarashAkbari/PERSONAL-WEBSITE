import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Lock,
  Play,
  Terminal,
} from "lucide-react";
import AsciiImage from "@/components/AsciiImage";
import { PROJECTS, type Project, type ProjectDomain } from "@/data";
import { cn } from "@/utils/cn";

type SpecimensChamberProps = {
  selectedProjectId: string;
  onSelectProject: (id: string) => void;
  onPulse: () => void;
};

const DOMAIN_FILTERS: readonly ("ALL" | ProjectDomain)[] = [
  "ALL",
  "AI & ML",
  "Systems & Automation",
  "Full-Stack & Interface",
] as const;

type ParsedStage = {
  node: string;
  detail: string;
};

function parseFlowStages(flow?: string[]): ParsedStage[] {
  if (!flow) return [];
  const stages: ParsedStage[] = [];
  for (const line of flow) {
    const match = line.match(/^\[\s*([^\]]+?)\s*\]\s*(.*)$/);
    if (match) {
      stages.push({
        node: match[1].trim(),
        detail: match[2].trim(),
      });
    }
  }
  return stages;
}

function AsciiDiagramBox({ lines, caption }: { lines: string[]; caption?: string }) {
  return (
    <div className="term scanlines relative border border-line">
      <div className="plus left-2.5 top-2.5 text-paper/40" />
      <div className="plus right-2.5 top-2.5 text-paper/40" />
      <div className="plus bottom-2.5 left-2.5 text-paper/40" />
      <div className="plus bottom-2.5 right-2.5 text-paper/40" />
      <div className="flex items-center justify-between border-b border-paper/15 px-4 py-2 font-mono text-[9.5px] uppercase tracking-[0.16em] text-paper/65">
        <span>SYSTEM_TOPOLOGY.ASCII</span>
        <span>VERIFIED PIPELINE</span>
      </div>
      <pre className="overflow-x-auto p-4 font-ascii text-[clamp(11.5px,1.15vw,14px)] leading-[1.55] text-paper/90 sm:p-5">
        {lines.map((line, idx) => (
          <div key={idx} className="whitespace-pre">
            {line || " "}
          </div>
        ))}
      </pre>
      {caption && (
        <div className="border-t border-paper/15 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/65">
          FIG // {caption}
        </div>
      )}
    </div>
  );
}

export default function SpecimensChamber({
  selectedProjectId,
  onSelectProject,
  onPulse,
}: SpecimensChamberProps) {
  const [domainFilter, setDomainFilter] = useState<"ALL" | ProjectDomain>("ALL");
  const [viewMode, setViewMode] = useState<"topology" | "artifact">("topology");
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);
  const [isPropagating, setIsPropagating] = useState<boolean>(false);

  const filteredProjects = useMemo(() => {
    if (domainFilter === "ALL") return PROJECTS;
    return PROJECTS.filter((p) => p.domain === domainFilter);
  }, [domainFilter]);

  const activeProject: Project = useMemo(() => {
    return (
      PROJECTS.find((p) => p.id === selectedProjectId) ??
      filteredProjects[0] ??
      PROJECTS[0]
    );
  }, [selectedProjectId, filteredProjects]);

  const stages = useMemo(
    () => parseFlowStages(activeProject.flow),
    [activeProject.flow]
  );

  /* Reset stage index on specimen switch */
  useEffect(() => {
    setActiveStageIdx(0);
    setIsPropagating(false);
    setViewMode("topology");
  }, [activeProject.id]);

  /* Automated signal propagation across pipeline stages */
  useEffect(() => {
    if (!isPropagating || stages.length === 0) return;
    const timer = window.setInterval(() => {
      setActiveStageIdx((prev) => {
        if (prev + 1 >= stages.length) {
          setIsPropagating(false);
          return 0;
        }
        return prev + 1;
      });
    }, 650);
    return () => window.clearInterval(timer);
  }, [isPropagating, stages.length]);

  const triggerSignalRun = () => {
    onPulse();
    setActiveStageIdx(0);
    setIsPropagating(true);
  };

  const stepSpecimen = useCallback(
    (delta: number) => {
      const list = filteredProjects.length > 0 ? filteredProjects : PROJECTS;
      const idx = list.findIndex((p) => p.id === activeProject.id);
      const next = list[(idx + delta + list.length) % list.length];
      if (next) {
        onSelectProject(next.id);
        onPulse();
      }
    },
    [activeProject.id, filteredProjects, onPulse, onSelectProject]
  );

  /* Keyboard ArrowLeft / ArrowRight steps through specimens */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable))
        return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        stepSpecimen(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        stepSpecimen(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stepSpecimen]);

  const diagramLines = activeProject.schematic ?? activeProject.flow ?? [];

  return (
    <section
      id="panel-specimens"
      role="tabpanel"
      aria-labelledby="tab-specimens"
      className="chamber-stage grid grid-cols-1 border-b border-line lg:grid-cols-12"
    >
      {/* Left 4 Columns: Specimen Catalog & Domain Filter */}
      <aside className="flex flex-col justify-between border-b border-line lg:col-span-4 lg:border-b-0 lg:border-r">
        <div>
          {/* Chamber Header */}
          <div className="border-b border-line p-5 sm:p-6">
            <span className="meta-label">CHAMBER 02 // ENGINEERING ARCHIVE</span>
            <h1 className="display-monograph mt-2 text-3xl uppercase sm:text-4xl">
              Selected{" "}
              <span className="font-editorial font-normal italic lowercase text-ink-soft">
                specimens
              </span>
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-ink-soft">
              Seven production systems and research tools. Select a specimen node to inspect its
              architecture and signal flow.
            </p>

            {/* Domain Filter Pills */}
            <div
              className="mt-4 flex flex-wrap gap-1.5"
              role="group"
              aria-label="Filter specimens by domain"
            >
              {DOMAIN_FILTERS.map((domain) => {
                const on = domainFilter === domain;
                return (
                  <button
                    key={domain}
                    type="button"
                    onClick={() => {
                      setDomainFilter(domain);
                      onPulse();
                    }}
                    className={cn(
                      "border px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] transition-colors",
                      on
                        ? "border-ink bg-ink text-paper"
                        : "border-line text-ink-soft hover:border-ink hover:text-ink"
                    )}
                  >
                    {domain}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Specimen Selector List */}
          <ul className="divide-y divide-line border-b border-line" role="listbox" aria-label="Project Specimens">
            {filteredProjects.map((project) => {
              const isSelected = project.id === activeProject.id;
              return (
                <li key={project.id} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectProject(project.id);
                      onPulse();
                    }}
                    className={cn(
                      "group flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors sm:px-6",
                      isSelected
                        ? "bg-ink text-paper"
                        : "bg-paper hover:bg-paper-2 text-ink"
                    )}
                  >
                    <div className="flex min-w-0 items-start gap-3.5">
                      <span
                        className={cn(
                          "mt-0.5 font-mono text-xs font-bold",
                          isSelected ? "text-acc" : "text-ink-soft"
                        )}
                      >
                        {project.index}
                      </span>
                      <div className="min-w-0">
                        <span className="block truncate text-base font-bold tracking-tight">
                          {project.title}
                        </span>
                        <span
                          className={cn(
                            "mt-0.5 block truncate font-editorial text-xs italic",
                            isSelected ? "text-paper/75" : "text-ink-soft"
                          )}
                        >
                          {project.sub}
                        </span>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-col items-end gap-1 font-mono text-[9.5px] uppercase tracking-[0.14em]">
                      <span className={isSelected ? "text-paper/80" : "text-ink-soft"}>
                        {project.year}
                      </span>
                      <span
                        className={cn(
                          "border px-1.5 py-0.5 text-[8.5px]",
                          isSelected
                            ? "border-paper/30 text-paper"
                            : "border-line text-ink-soft"
                        )}
                      >
                        {project.lang}
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Bottom Prev / Next Specimen Controls */}
        <div className="flex items-center justify-between gap-2 p-4 sm:px-6">
          <button
            type="button"
            onClick={() => stepSpecimen(-1)}
            className="inline-flex items-center gap-2 border border-line px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          >
            <ArrowLeft size={12} aria-hidden />
            <span>Prev Specimen</span>
          </button>
          <span className="font-mono text-[10px] tracking-[0.16em] text-ink-soft">
            {activeProject.index} / 0{PROJECTS.length}
          </span>
          <button
            type="button"
            onClick={() => stepSpecimen(1)}
            className="inline-flex items-center gap-2 border border-line px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          >
            <span>Next Specimen</span>
            <ArrowRight size={12} aria-hidden />
          </button>
        </div>
      </aside>

      {/* Right 8 Columns: Active Specimen Exhibition Stage */}
      <div className="flex flex-col justify-between lg:col-span-8">
        {/* Specimen Stage Masthead */}
        <div className="border-b border-line p-5 sm:p-8 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
            <div className="flex flex-wrap items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.16em]">
              <span className="bg-ink px-2 py-0.5 font-bold text-paper">
                SPECIMEN {activeProject.index}
              </span>
              <span className="text-acc">{activeProject.domain}</span>
              <span className="text-ink-soft">·</span>
              <span className="text-ink-soft">{activeProject.year}</span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.15em]">
              <span className="h-1.5 w-1.5 rounded-full bg-acc" aria-hidden />
              <span>STATUS: {activeProject.status}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="display-monograph text-[clamp(2.2rem,5vw,4.4rem)] uppercase">
                {activeProject.title}
              </h2>
              <p className="mt-2 font-editorial text-lg italic text-ink-soft sm:text-xl">
                — {activeProject.sub}
              </p>
            </div>

            {/* External Action Links */}
            <div className="flex flex-wrap items-center gap-2.5">
              {activeProject.repo && (
                <a
                  href={activeProject.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-ink px-4 py-2.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.15em] text-paper transition-colors hover:bg-acc hover:text-[#09090a]"
                >
                  <span>Source Code</span>
                  <ArrowUpRight size={13} aria-hidden />
                </a>
              )}
              {activeProject.live && (
                <a
                  href={activeProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-ink px-4 py-2.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.15em] text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  <span>Live Deployment</span>
                  <ArrowUpRight size={13} aria-hidden />
                </a>
              )}
              {activeProject.private && (
                <span className="inline-flex items-center gap-2 border border-line px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                  <Lock size={12} aria-hidden className="text-acc" />
                  <span>Private Client Repository</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Specimen Anatomy Body (2 Columns on XL) */}
        <div className="grid flex-1 grid-cols-1 divide-y divide-line xl:grid-cols-12 xl:divide-x xl:divide-y-0">
          {/* Left Narrative & Engineering Specifications (6 cols) */}
          <div className="flex flex-col justify-between p-5 sm:p-8 xl:col-span-6">
            <div>
              <span className="meta-label">01 // ARCHITECTURAL BRIEF</span>
              <p className="mt-3 text-[15.5px] leading-[1.78] text-ink/90">
                {activeProject.desc}
              </p>

              <div className="mt-8">
                <span className="meta-label">02 // VERIFIED CAPABILITIES &amp; MECHANISMS</span>
                <ol className="mt-3 divide-y divide-line border-y border-line">
                  {activeProject.features.map((feat, idx) => (
                    <li
                      key={feat}
                      className="flex items-start gap-3.5 py-3.5 text-sm leading-relaxed text-ink/85"
                    >
                      <span className="font-mono text-[11px] font-bold text-acc">
                        0{idx + 1}
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <span className="meta-label">03 // TECHNICAL SUBSTRATE</span>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {activeProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="border border-line bg-paper-2/50 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Interactive Topology & Visual Artifact Stage (6 cols) */}
          <div className="flex flex-col justify-between p-5 sm:p-8 xl:col-span-6">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4">
                <span className="meta-label">
                  04 // {viewMode === "topology" ? "SIGNAL TOPOLOGY" : "VISUAL ARTIFACT"}
                </span>

                <div className="flex items-center gap-1.5">
                  {stages.length > 0 && viewMode === "topology" && (
                    <button
                      type="button"
                      onClick={triggerSignalRun}
                      className="inline-flex items-center gap-1.5 border border-acc px-2.5 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-acc transition-colors hover:bg-acc hover:text-[#09090a]"
                    >
                      <Play size={10} aria-hidden />
                      <span>Fire Pulse</span>
                    </button>
                  )}

                  {activeProject.img && (
                    <div className="flex border border-line">
                      <button
                        type="button"
                        onClick={() => setViewMode("topology")}
                        className={cn(
                          "inline-flex items-center gap-1 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.12em]",
                          viewMode === "topology"
                            ? "bg-ink text-paper"
                            : "text-ink-soft hover:text-ink"
                        )}
                      >
                        <Terminal size={10} aria-hidden />
                        <span>Topology</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode("artifact")}
                        className={cn(
                          "inline-flex items-center gap-1 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.12em]",
                          viewMode === "artifact"
                            ? "bg-ink text-paper"
                            : "text-ink-soft hover:text-ink"
                        )}
                      >
                        <Cpu size={10} aria-hidden />
                        <span>Matrix</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Interactive Step-by-Step Neural Pipeline (when flow stages exist) */}
              {viewMode === "topology" && stages.length > 0 && (
                <div className="mb-5 border border-line bg-paper-2/30 p-4">
                  <div className="mb-3 flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-soft">
                    <span>INTERACTIVE EXECUTION PATHWAY</span>
                    <span>CLICK ANY NODE TO INSPECT STAGE</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {stages.map((st, idx) => {
                      const isCurrent = idx === activeStageIdx;
                      return (
                        <button
                          key={st.node}
                          type="button"
                          onClick={() => {
                            setIsPropagating(false);
                            setActiveStageIdx(idx);
                            onPulse();
                          }}
                          className={cn(
                            "flex items-center justify-between gap-3 border px-3.5 py-2.5 text-left transition-all",
                            isCurrent
                              ? "border-acc bg-ink text-paper"
                              : "border-line bg-paper text-ink hover:border-ink"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={cn(
                                "font-mono text-[10px] font-bold",
                                isCurrent ? "text-acc" : "text-ink-soft"
                              )}
                            >
                              STAGE 0{idx + 1}
                            </span>
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.08em]">
                              [{st.node}]
                            </span>
                          </div>
                          <span
                            className={cn(
                              "text-right text-xs",
                              isCurrent ? "text-paper/85" : "text-ink-soft"
                            )}
                          >
                            {st.detail}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Schematic / ASCII Visual Display */}
              {viewMode === "artifact" && activeProject.img ? (
                <AsciiImage
                  src={activeProject.img}
                  caption={activeProject.fig}
                  cols={82}
                  fallback={
                    <AsciiDiagramBox lines={diagramLines} caption={activeProject.fig} />
                  }
                />
              ) : (
                <AsciiDiagramBox lines={diagramLines} caption={activeProject.fig} />
              )}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft">
              <span>DOMAIN: {activeProject.domain}</span>
              <span>RUNTIME: {activeProject.lang}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
