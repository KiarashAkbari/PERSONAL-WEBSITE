import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { CAPABILITIES, EXPERIENCE, PROJECTS } from "@/data";
import { cn } from "@/utils/cn";

type NodeKind = "lobe" | "specimen" | "memory";

type GraphNode = {
  id: string;
  rawId: string;
  kind: NodeKind;
  code: string;
  label: string;
  sub: string;
  x: number;
  y: number;
};

type GraphEdge = {
  id: string;
  from: string;
  to: string;
};

type ConnectomeProps = {
  onOpenProject: (projectId: string) => void;
  onOpenMemory: (expId?: string) => void;
  onPulse?: () => void;
};

export default function Connectome({
  onOpenProject,
  onOpenMemory,
  onPulse,
}: ConnectomeProps) {
  const { nodes, edges } = useMemo(() => {
    const lobeNodes: GraphNode[] = CAPABILITIES.map((c, idx) => ({
      id: `lobe:${c.id}`,
      rawId: c.id,
      kind: "lobe",
      code: c.code,
      label: c.group,
      sub: c.summary,
      x: 115,
      y: 62 + idx * 72,
    }));

    const specimenNodes: GraphNode[] = PROJECTS.map((p, idx) => ({
      id: `specimen:${p.id}`,
      rawId: p.id,
      kind: "specimen",
      code: `SPEC.${p.index}`,
      label: p.title,
      sub: p.sub,
      x: 390,
      y: 36 + idx * 46,
    }));

    const memoryNodes: GraphNode[] = EXPERIENCE.map((e, idx) => ({
      id: `memory:${e.id}`,
      rawId: e.id,
      kind: "memory",
      code: `MEM.${e.index}`,
      label: e.org.split("—")[0].trim(),
      sub: `${e.role} (${e.period})`,
      x: 665,
      y: 84 + idx * 86,
    }));

    const allEdges: GraphEdge[] = [];

    for (const c of CAPABILITIES) {
      for (const pid of c.relatedProjects) {
        allEdges.push({
          id: `lobe:${c.id}->specimen:${pid}`,
          from: `lobe:${c.id}`,
          to: `specimen:${pid}`,
        });
      }
    }

    for (const e of EXPERIENCE) {
      for (const pid of e.relatedProjects) {
        allEdges.push({
          id: `specimen:${pid}->memory:${e.id}`,
          from: `specimen:${pid}`,
          to: `memory:${e.id}`,
        });
      }
    }

    return {
      nodes: [...lobeNodes, ...specimenNodes, ...memoryNodes],
      edges: allEdges,
    };
  }, []);

  const [selectedId, setSelectedId] = useState<string>("specimen:bim");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeId = hoveredId ?? selectedId;

  const nodeMap = useMemo(() => {
    const map = new Map<string, GraphNode>();
    for (const n of nodes) map.set(n.id, n);
    return map;
  }, [nodes]);

  const { connectedNodes, connectedEdges } = useMemo(() => {
    const nSet = new Set<string>([activeId]);
    const eSet = new Set<string>();
    for (const edge of edges) {
      if (edge.from === activeId || edge.to === activeId) {
        eSet.add(edge.id);
        nSet.add(edge.from);
        nSet.add(edge.to);
      }
    }
    return { connectedNodes: nSet, connectedEdges: eSet };
  }, [activeId, edges]);

  const activeNode = nodeMap.get(activeId) ?? nodes[0];

  const handleSelect = (id: string) => {
    setSelectedId(id);
    onPulse?.();
  };

  return (
    <div className="flex flex-col border border-line bg-paper">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-acc" aria-hidden />
          <span className="meta-label text-ink">
            FIG 1.2 // INTERACTIVE SYNAPTIC CONNECTOME (3-LAYER TOPOLOGY)
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
          14 GANGLIA · {edges.length} AXONS · HOVER OR CLICK TO FIRE
        </span>
      </div>

      {/* Layer Legend */}
      <div className="grid grid-cols-3 border-b border-line font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-soft">
        <div className="border-r border-line px-4 py-2">
          LAYER I // CAPABILITY LOBES (INPUT)
        </div>
        <div className="border-r border-line px-4 py-2 text-center">
          LAYER II // ENGINEERED SPECIMENS (HIDDEN)
        </div>
        <div className="px-4 py-2 text-right">
          LAYER III // PRODUCTION MEMORY (OUTPUT)
        </div>
      </div>

      {/* Interactive SVG Connectome */}
      <div className="relative overflow-x-auto bg-paper-2/40">
        <svg
          viewBox="0 0 780 356"
          className="block h-auto min-w-[620px] w-full select-none"
          role="img"
          aria-label="Interactive neural network connectome linking capabilities, projects, and experience"
        >
          {/* Subtle vertical layer guide lines */}
          <line x1="115" y1="16" x2="115" y2="340" stroke="var(--line)" strokeDasharray="2 4" />
          <line x1="390" y1="16" x2="390" y2="340" stroke="var(--line)" strokeDasharray="2 4" />
          <line x1="665" y1="16" x2="665" y2="340" stroke="var(--line)" strokeDasharray="2 4" />

          {/* Synaptic Axons (Curves) */}
          <g fill="none">
            {edges.map((edge) => {
              const from = nodeMap.get(edge.from);
              const to = nodeMap.get(edge.to);
              if (!from || !to) return null;
              const isHot = connectedEdges.has(edge.id);
              const midX = (from.x + to.x) / 2;
              const d = `M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`;
              return (
                <path
                  key={edge.id}
                  d={d}
                  stroke={isHot ? "var(--acc)" : "var(--ink)"}
                  strokeOpacity={isHot ? 0.92 : 0.14}
                  strokeWidth={isHot ? 1.65 : 0.85}
                  className={cn(isHot && "axon-active")}
                />
              );
            })}
          </g>

          {/* Neural Nodes */}
          <g>
            {nodes.map((node) => {
              const isCurrent = node.id === activeId;
              const isConnected = connectedNodes.has(node.id);
              const textAnchor =
                node.kind === "lobe"
                  ? "end"
                  : node.kind === "memory"
                  ? "start"
                  : "start";
              const textX =
                node.kind === "lobe"
                  ? node.x - 14
                  : node.kind === "memory"
                  ? node.x + 14
                  : node.x + 13;

              return (
                <g
                  key={node.id}
                  tabIndex={0}
                  role="button"
                  aria-label={`${node.code} ${node.label}: ${node.sub}`}
                  onClick={() => handleSelect(node.id)}
                  onMouseEnter={() => setHoveredId(node.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSelect(node.id);
                    }
                  }}
                  className="cursor-pointer focus:outline-none"
                >
                  {/* Outer excitation halo when active */}
                  {isCurrent && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={12}
                      fill="none"
                      stroke="var(--acc)"
                      strokeWidth="1"
                      strokeOpacity="0.7"
                    />
                  )}

                  {/* Soma / Neuron body */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isCurrent ? 6 : isConnected ? 4.8 : 3.5}
                    fill={
                      isCurrent
                        ? "var(--acc)"
                        : isConnected
                        ? "var(--ink)"
                        : "var(--paper)"
                    }
                    stroke={isCurrent ? "var(--acc)" : "var(--ink)"}
                    strokeWidth={isConnected ? 1.6 : 1}
                    opacity={isConnected ? 1 : 0.42}
                  />

                  {/* Node Label */}
                  <text
                    x={textX}
                    y={node.y - 3}
                    textAnchor={textAnchor}
                    fill="var(--ink)"
                    opacity={isConnected ? 1 : 0.42}
                    style={{
                      fontFamily: "var(--stack-mono)",
                      fontSize: "8.5px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {node.code}
                  </text>
                  <text
                    x={textX}
                    y={node.y + 9}
                    textAnchor={textAnchor}
                    fill={isCurrent ? "var(--acc)" : "var(--ink)"}
                    opacity={isConnected ? 1 : 0.48}
                    style={{
                      fontFamily: "var(--stack-sans)",
                      fontSize: "11px",
                      fontWeight: isCurrent || isConnected ? 700 : 500,
                    }}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Selected Ganglion Readout Bar */}
      <div className="flex flex-col justify-between gap-4 border-t border-line bg-paper px-4 py-3.5 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.16em]">
            <span className="text-acc">{activeNode.code}</span>
            <span className="text-ink-soft">·</span>
            <span className="font-bold text-ink">{activeNode.label}</span>
            <span className="text-ink-soft">
              ({connectedEdges.size} ACTIVE SYNAPSES)
            </span>
          </div>
          <p className="mt-1 truncate text-xs text-ink-soft">{activeNode.sub}</p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {activeNode.kind === "specimen" && (
            <button
              type="button"
              onClick={() => onOpenProject(activeNode.rawId)}
              className="inline-flex items-center gap-1.5 border border-ink bg-ink px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-paper transition-colors hover:border-acc hover:bg-acc hover:text-[#09090a]"
            >
              <span>Inspect Specimen</span>
              <ArrowUpRight size={12} aria-hidden />
            </button>
          )}
          {activeNode.kind === "memory" && (
            <button
              type="button"
              onClick={() => onOpenMemory(activeNode.rawId)}
              className="inline-flex items-center gap-1.5 border border-ink bg-ink px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-paper transition-colors hover:border-acc hover:bg-acc hover:text-[#09090a]"
            >
              <span>Open Service Record</span>
              <ArrowUpRight size={12} aria-hidden />
            </button>
          )}
          {activeNode.kind === "lobe" && (
            <button
              type="button"
              onClick={() => onOpenMemory()}
              className="inline-flex items-center gap-1.5 border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              <span>View Skill Weights</span>
              <ArrowUpRight size={12} aria-hidden />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
