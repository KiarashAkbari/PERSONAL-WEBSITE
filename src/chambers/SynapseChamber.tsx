import { useMemo, useRef, useState, type PointerEvent } from "react";
import AsciiImage from "@/components/AsciiImage";
import AsciiWave from "@/components/AsciiWave";
import { cn } from "@/utils/cn";

type Point = readonly [number, number];

const LANDMARKS: readonly Point[] = [
  [95, 180], [114, 145], [143, 113], [176, 91], [211, 84], [243, 96],
  [271, 76], [304, 92], [334, 113], [357, 139], [376, 170], [356, 194],
  [374, 224], [347, 250], [317, 264], [283, 252], [251, 276], [220, 257],
  [186, 278], [154, 260], [125, 242], [106, 213], [147, 183], [157, 145],
  [189, 128], [214, 159], [240, 126], [269, 147], [300, 120], [324, 159],
  [344, 182], [321, 208], [292, 227], [261, 205], [231, 229], [200, 207],
  [169, 226], [221, 187], [272, 184], [122, 176],
] as const;

function buildTriangulation(): readonly (readonly [number, number])[] {
  const set = new Set<string>();
  LANDMARKS.forEach(([x, y], idx) => {
    LANDMARKS.map(([ox, oy], oIdx) => ({
      oIdx,
      d2: (ox - x) ** 2 + (oy - y) ** 2,
    }))
      .filter((item) => item.oIdx !== idx)
      .sort((a, b) => a.d2 - b.d2)
      .slice(0, 3)
      .forEach(({ oIdx }) => {
        const a = Math.min(idx, oIdx);
        const b = Math.max(idx, oIdx);
        set.add(`${a}:${b}`);
      });
  });
  return Array.from(set, (pair) => pair.split(":").map(Number) as [number, number]);
}

const EDGES = buildTriangulation();

const WAVE_SCALES = [
  { label: "DENSE // 1.15x", scale: 1.15 },
  { label: "STD // 1.50x", scale: 1.5 },
  { label: "MACRO // 1.85x", scale: 1.85 },
] as const;

export default function SynapseChamber({ onPulse }: { onPulse: () => void }) {
  const [waveScaleIdx, setWaveScaleIdx] = useState<number>(1);
  const [visionMode, setVisionMode] = useState<"lens" | "color" | "ascii">("lens");
  const [lensPos, setLensPos] = useState<{ x: number; y: number; active: boolean }>({
    x: 50,
    y: 46,
    active: false,
  });
  const stageRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setLensPos({ x, y, active: true });
  };

  /* Compute active landmarks closest to pointer in viewBox (480x360) */
  const activeLandmarks = useMemo(() => {
    const vx = (lensPos.x / 100) * 480;
    const vy = (lensPos.y / 100) * 360;
    const scored = LANDMARKS.map(([lx, ly], index) => {
      const dist = Math.hypot(lx - vx, ly - vy);
      return { index, lx, ly, dist };
    }).sort((a, b) => a.dist - b.dist);
    return new Set(scored.slice(0, 8).map((s) => s.index));
  }, [lensPos.x, lensPos.y]);

  const activeScale = WAVE_SCALES[waveScaleIdx]?.scale ?? 1.5;

  return (
    <section
      id="panel-synapse"
      role="tabpanel"
      aria-labelledby="tab-synapse"
      className="chamber-stage border-b border-line"
    >
      {/* Chamber Masthead */}
      <div className="grid grid-cols-1 border-b border-line lg:grid-cols-12">
        <div className="border-b border-line p-5 sm:p-8 lg:col-span-7 lg:border-b-0 lg:border-r">
          <span className="meta-label">
            CHAMBER 03 // INTERACTIVE SIGNAL &amp; PERCEPTION LABORATORY
          </span>
          <h1 className="display-monograph mt-2 text-[clamp(2.3rem,5vw,4.5rem)] uppercase">
            Synapse{" "}
            <span className="font-editorial font-normal italic lowercase text-ink-soft">
              &amp; machine perception
            </span>
          </h1>
        </div>
        <div className="flex flex-col justify-center p-5 sm:p-8 lg:col-span-5">
          <p className="text-sm leading-relaxed text-ink/85">
            Two live studies in computational physics and computer vision: a two-buffer wave
            propagation field on a character lattice, paired with a feature-triangulation lens where
            monochrome structure gives way to natural pigment under inspection.
          </p>
        </div>
      </div>

      {/* Two Coupled Experiments */}
      <div className="grid grid-cols-1 divide-y divide-line lg:grid-cols-12 lg:divide-x lg:divide-y-0">
        {/* Experiment I: 2D Wave Propagation Field (AsciiWave) */}
        <div className="flex flex-col justify-between lg:col-span-6">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-3.5 sm:px-6">
              <div>
                <span className="meta-label text-ink">
                  STUDY 01 // CORTICAL WAVE INTERFERENCE (RIPPLE_FIELD.ASCII)
                </span>
              </div>
              <div className="flex items-center gap-1" role="group" aria-label="Wave grid scale">
                {WAVE_SCALES.map((item, idx) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setWaveScaleIdx(idx);
                      onPulse();
                    }}
                    className={cn(
                      "border px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.12em] transition-colors",
                      waveScaleIdx === idx
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
              className="term scanlines relative h-[380px] w-full sm:h-[440px]"
              onPointerDown={onPulse}
            >
              <div className="plus left-3 top-3 text-paper/45" />
              <div className="plus right-3 top-3 text-paper/45" />
              <div className="plus bottom-3 left-3 text-paper/45" />
              <div className="plus bottom-3 right-3 text-paper/45" />

              <AsciiWave className="absolute inset-0" scale={activeScale} />

              <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/70">
                <span>EQUATION: u(t+1) = ½∇²u − u(t−1) · 0.982</span>
                <span>25 FPS CAP</span>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.15em] text-paper/75">
                <span>DRAG POINTER TO EXCITE WAVEFRONT · CLICK FOR IMPULSE</span>
                <span className="text-acc">ACTIVE MEDIUM</span>
              </div>
            </div>
          </div>

          <div className="border-t border-line p-5 sm:p-6">
            <div className="grid grid-cols-3 gap-4 font-mono text-[10.5px] uppercase tracking-[0.14em]">
              <div>
                <span className="block text-ink-soft">DAMPING RATIO</span>
                <strong className="mt-1 block text-sm text-ink">γ = 0.982</strong>
              </div>
              <div>
                <span className="block text-ink-soft">LATTICE RAMP</span>
                <strong className="mt-1 block text-sm text-ink">10-STEP ASCII</strong>
              </div>
              <div>
                <span className="block text-ink-soft">SOLVER</span>
                <strong className="mt-1 block text-sm text-ink">2-BUFFER EULER</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Experiment II: Perceptual Triangulation & Chromatic Specimen Lens */}
        <div className="flex flex-col justify-between lg:col-span-6">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-3.5 sm:px-6">
              <span className="meta-label text-ink">
                STUDY 02 // FEATURE TRIANGULATION &amp; PIGMENT LENS
              </span>

              <div className="flex items-center gap-1" role="group" aria-label="Perception optic">
                {(
                  [
                    ["lens", "LENS INSPECT"],
                    ["color", "FULL PIGMENT"],
                    ["ascii", "DOT-MATRIX"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setVisionMode(id);
                      onPulse();
                    }}
                    className={cn(
                      "border px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.12em] transition-colors",
                      visionMode === id
                        ? "border-ink bg-ink text-paper"
                        : "border-line text-ink-soft hover:text-ink"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {visionMode === "ascii" ? (
              <div className="p-5 sm:p-6">
                <AsciiImage
                  src="./scan/tulip-analysis.png"
                  caption="Botanical specimen decoded into a 90-column luminance matrix"
                  cols={90}
                  eager
                />
              </div>
            ) : (
              <div
                ref={stageRef}
                onPointerMove={handlePointerMove}
                onPointerEnter={() => setLensPos((p) => ({ ...p, active: true }))}
                onPointerLeave={() => setLensPos((p) => ({ ...p, active: false }))}
                onPointerDown={onPulse}
                className="term relative h-[380px] w-full cursor-crosshair overflow-hidden select-none sm:h-[440px]"
              >
                {/* Base Layer: Stark Monochrome Archival Specimen */}
                <img
                  src="./scan/tulip-analysis.png"
                  alt="Botanical computer-vision specimen in monochrome"
                  className={cn(
                    "absolute inset-0 h-full w-full object-contain transition-all duration-300",
                    visionMode === "color"
                      ? "contrast-110 saturate-125"
                      : "grayscale contrast-125 brightness-90"
                  )}
                />

                {/* Chromatic Reveal Lens Layer (Color inside the picture where pointer inspects!) */}
                {visionMode === "lens" && (
                  <img
                    src="./scan/tulip-analysis.png"
                    alt=""
                    aria-hidden
                    style={{
                      clipPath: `circle(${lensPos.active ? "125px" : "95px"} at ${lensPos.x}% ${lensPos.y}%)`,
                    }}
                    className="pointer-events-none absolute inset-0 h-full w-full object-contain contrast-115 saturate-150 transition-[clip-path] duration-75"
                  />
                )}

                {/* Computer-Vision Delaunay / Feature Mesh Overlay */}
                <svg
                  viewBox="0 0 480 360"
                  preserveAspectRatio="xMidYMid meet"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  aria-hidden
                >
                  {/* Mesh Edges */}
                  <g>
                    {EDGES.map(([a, b]) => {
                      const isHot =
                        activeLandmarks.has(a) && activeLandmarks.has(b);
                      return (
                        <line
                          key={`${a}:${b}`}
                          x1={LANDMARKS[a][0]}
                          y1={LANDMARKS[a][1]}
                          x2={LANDMARKS[b][0]}
                          y2={LANDMARKS[b][1]}
                          stroke={isHot ? "var(--acc)" : "#f3f1ec"}
                          strokeOpacity={isHot ? 0.9 : 0.25}
                          strokeWidth={isHot ? 1.15 : 0.6}
                          vectorEffect="non-scaling-stroke"
                        />
                      );
                    })}
                  </g>

                  {/* Feature Landmarks */}
                  <g>
                    {LANDMARKS.map(([lx, ly], idx) => {
                      const isHot = activeLandmarks.has(idx);
                      return (
                        <g key={`${lx}-${ly}`}>
                          <circle
                            cx={lx}
                            cy={ly}
                            r={isHot ? 3.4 : 1.9}
                            fill={isHot ? "var(--acc)" : "#070708"}
                            stroke={isHot ? "#f3f1ec" : "#f3f1ec"}
                            strokeWidth="0.9"
                            strokeOpacity={isHot ? 1 : 0.55}
                          />
                          {isHot && (
                            <text
                              x={lx + 6}
                              y={ly - 4}
                              fill="#f3f1ec"
                              style={{
                                fontFamily: "var(--stack-mono)",
                                fontSize: "7px",
                                letterSpacing: "0.08em",
                              }}
                            >
                              L{String(idx).padStart(2, "0")}
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </g>
                </svg>

                {/* HUD Overlays */}
                <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/75">
                  <span>SPECIMEN: TULIPA // 40 FEATURE KEYPOINTS</span>
                  <span>
                    ROI: ({lensPos.x.toFixed(1)}%, {lensPos.y.toFixed(1)}%)
                  </span>
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.15em] text-paper/75">
                  <span>
                    {visionMode === "lens"
                      ? "MOVE POINTER TO REVEAL CHROMATIC PIGMENT & NEAREST KEYPOINTS"
                      : "FULL CHROMATIC PIGMENT LAYER ACTIVE"}
                  </span>
                  <span className="text-acc">CV // MESH</span>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-line p-5 sm:p-6">
            <div className="grid grid-cols-3 gap-4 font-mono text-[10.5px] uppercase tracking-[0.14em]">
              <div>
                <span className="block text-ink-soft">KEYPOINTS</span>
                <strong className="mt-1 block text-sm text-ink">40 VERTICES</strong>
              </div>
              <div>
                <span className="block text-ink-soft">ACTIVE KNN</span>
                <strong className="mt-1 block text-sm text-ink">K = 8 NEAREST</strong>
              </div>
              <div>
                <span className="block text-ink-soft">OPTIC MODE</span>
                <strong className="mt-1 block text-sm uppercase text-ink">
                  {visionMode}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
