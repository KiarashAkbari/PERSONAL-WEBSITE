import { useState } from "react";
import { ArrowRight, ArrowUpRight, FileText, Network, Radio } from "lucide-react";
import AsciiField from "@/components/AsciiField";
import Connectome from "@/components/Connectome";
import { EXPERIENCE, PROJECTS, RESUME_URL } from "@/data";
import type { ChamberId } from "@/types/navigation";
import { cn } from "@/utils/cn";

type CortexChamberProps = {
  onNavigate: (chamber: ChamberId) => void;
  onSelectProject: (projectId: string) => void;
  onSelectExperience: (expId?: string) => void;
  onPulse: () => void;
};

const DENSITY_SCALES = [
  { label: "FINE // 1.15x", value: 1.15 },
  { label: "NORM // 1.45x", value: 1.45 },
  { label: "BOLD // 1.75x", value: 1.75 },
] as const;

export default function CortexChamber({
  onNavigate,
  onSelectProject,
  onSelectExperience,
  onPulse,
}: CortexChamberProps) {
  const [scaleIdx, setScaleIdx] = useState<number>(1);
  const activeScale = DENSITY_SCALES[scaleIdx]?.value ?? 1.45;

  return (
    <section
      id="panel-cortex"
      role="tabpanel"
      aria-labelledby="tab-cortex"
      className="chamber-stage grid grid-cols-1 border-b border-line lg:grid-cols-12"
    >
      {/* Left 7 Columns: Editorial Manifesto & Interactive Synaptic Connectome */}
      <div className="flex flex-col justify-between border-b border-line lg:col-span-7 lg:border-b-0 lg:border-r">
        {/* Top Editorial Installation */}
        <div className="p-5 sm:p-8 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
            <span className="meta-label">
              SPECIMEN MONOGRAPH // AI &amp; BACKEND SYSTEMS ARCHITECT
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-acc" aria-hidden />
              OPEN TO FULL-TIME ROLES (REMOTE)
            </span>
          </div>

          <div className="mt-7">
            <p className="font-editorial text-lg italic text-ink-soft md:text-xl">
              On the architecture of grounded intelligence &amp; resilient machines —
            </p>
            <h1 className="display-monograph mt-2 text-[clamp(3.1rem,8.5vw,7.2rem)] uppercase tracking-[-0.05em]">
              Kiarash{" "}
              <span className="font-editorial font-normal italic lowercase tracking-[-0.02em] text-ink-soft">
                of
              </span>{" "}
              <span className="block sm:inline">Akbari.</span>
            </h1>
          </div>

          <p className="mt-6 max-w-2xl text-[15.5px] leading-[1.78] text-ink/85 md:text-[16.5px]">
            I engineer backend architectures and applied AI systems where every output is accountable
            to source truth—from{" "}
            <button
              type="button"
              onClick={() => onSelectProject("bim")}
              className="border-b border-acc font-medium text-ink transition-colors hover:text-acc"
            >
              hybrid graph-and-vector RAG pipelines
            </button>{" "}
            that verify building-code citations, to{" "}
            <button
              type="button"
              onClick={() => onSelectProject("nids")}
              className="border-b border-acc font-medium text-ink transition-colors hover:text-acc"
            >
              unsupervised neural autoencoders
            </button>{" "}
            flagging zero-day network anomalies, and{" "}
            <button
              type="button"
              onClick={() => onSelectProject("vino")}
              className="border-b border-acc font-medium text-ink transition-colors hover:text-acc"
            >
              data-driven product platforms
            </button>{" "}
            in production.
          </p>

          {/* Spatial Chamber Entry Controls */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate("specimens")}
              className="group inline-flex items-center gap-3 bg-ink px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-acc hover:text-[#09090a]"
            >
              <span>02 // Inspect 07 Specimens</span>
              <ArrowRight
                size={14}
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

            <button
              type="button"
              onClick={() => onNavigate("synapse")}
              className="inline-flex items-center gap-2.5 border border-ink px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              <Network size={13} aria-hidden />
              <span>03 // Synapse Lab</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate("transmission")}
              className="inline-flex items-center gap-2 border border-line px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink"
            >
              <Radio size={13} aria-hidden className="text-acc" />
              <span>05 // Uplink</span>
            </button>

            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-line px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft transition-colors hover:border-ink hover:text-ink"
            >
              <FileText size={13} aria-hidden />
              <span>Résumé.PDF</span>
              <ArrowUpRight size={12} aria-hidden />
            </a>
          </div>
        </div>

        {/* Interactive 3-Layer Connectome Graph */}
        <div className="px-5 pb-6 sm:px-8 md:px-10 md:pb-10">
          <Connectome
            onOpenProject={onSelectProject}
            onOpenMemory={onSelectExperience}
            onPulse={onPulse}
          />
        </div>
      </div>

      {/* Right 5 Columns: 3D Cortical Manifold (AsciiField) & Specimen Directory */}
      <div className="flex flex-col justify-between lg:col-span-5">
        {/* Live 3D Cortical Core */}
        <div className="flex flex-col border-b border-line">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-3">
            <span className="meta-label text-ink">
              FIG 1.1 // CORTICAL MANIFOLD (NEURAL_CORE.ASCII)
            </span>
            <div className="flex items-center gap-1" role="group" aria-label="Cell density">
              {DENSITY_SCALES.map((item, idx) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setScaleIdx(idx);
                    onPulse();
                  }}
                  className={cn(
                    "border px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.12em] transition-colors",
                    scaleIdx === idx
                      ? "border-ink bg-ink text-paper"
                      : "border-line text-ink-soft hover:text-ink"
                  )}
                >
                  {item.label.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          <div
            className="term scanlines relative h-[370px] w-full sm:h-[430px]"
            onPointerDown={onPulse}
          >
            <div className="plus left-3 top-3 text-paper/45" />
            <div className="plus right-3 top-3 text-paper/45" />
            <div className="plus bottom-3 left-3 text-paper/45" />
            <div className="plus bottom-3 right-3 text-paper/45" />

            <AsciiField className="absolute inset-0" scale={activeScale} />

            {/* Top HUD inside chamber */}
            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/70">
              <span>2,600 PARTICLES // SPRING-DAMPED</span>
              <span>30 FPS CAP</span>
            </div>

            {/* Bottom HUD inside chamber */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.15em] text-paper/75">
              <span>POINTER REPELS SOMA · CLICK TO FIRE SHOCKWAVE</span>
              <span className="text-acc">LIVE</span>
            </div>
          </div>
        </div>

        {/* Rapid Specimen & Telemetry Ledger */}
        <div className="flex flex-1 flex-col justify-between p-5 sm:p-7">
          <div>
            <div className="flex items-center justify-between border-b border-line pb-2.5">
              <span className="meta-label">DIRECT SPECIMEN JUMP // 01—07</span>
              <span className="font-editorial text-xs italic text-ink-soft">
                Select a node to open its case file
              </span>
            </div>

            <ul className="divide-y divide-line border-b border-line">
              {PROJECTS.map((project) => (
                <li key={project.id}>
                  <button
                    type="button"
                    onClick={() => onSelectProject(project.id)}
                    className="group flex w-full items-center justify-between gap-3 py-2.5 text-left transition-colors hover:bg-paper-2 px-2 -mx-2"
                  >
                    <div className="flex min-w-0 items-baseline gap-3">
                      <span className="font-mono text-[10.5px] text-acc">
                        {project.index}
                      </span>
                      <span className="truncate text-sm font-bold tracking-tight text-ink group-hover:underline">
                        {project.title}
                      </span>
                      <span className="hidden truncate font-editorial text-xs italic text-ink-soft sm:inline">
                        — {project.sub}
                      </span>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                      <span>{project.lang}</span>
                      <ArrowUpRight
                        size={12}
                        aria-hidden
                        className="text-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Cortical Summary Metrics */}
          <dl className="mt-6 grid grid-cols-3 gap-px border border-line bg-line">
            <div className="bg-paper p-3">
              <dt className="meta-label">Specimens</dt>
              <dd className="mt-1 font-mono text-xl font-bold text-ink">
                0{PROJECTS.length}
              </dd>
            </div>
            <div className="bg-paper p-3">
              <dt className="meta-label">Service Roles</dt>
              <dd className="mt-1 font-mono text-xl font-bold text-ink">
                0{EXPERIENCE.length}
              </dd>
            </div>
            <div className="bg-paper p-3">
              <dt className="meta-label">Base Node</dt>
              <dd className="mt-1 font-mono text-sm font-bold uppercase text-ink">
                Mashhad · IR
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
