import { useEffect, useRef, useState } from "react";

type Point = readonly [number, number];

// Fixed landmarks make the computer-vision mesh deterministic at every size.
const POINTS: readonly Point[] = [
  [95, 180], [114, 145], [143, 113], [176, 91], [211, 84], [243, 96],
  [271, 76], [304, 92], [334, 113], [357, 139], [376, 170], [356, 194],
  [374, 224], [347, 250], [317, 264], [283, 252], [251, 276], [220, 257],
  [186, 278], [154, 260], [125, 242], [106, 213], [147, 183], [157, 145],
  [189, 128], [214, 159], [240, 126], [269, 147], [300, 120], [324, 159],
  [344, 182], [321, 208], [292, 227], [261, 205], [231, 229], [200, 207],
  [169, 226], [221, 187], [272, 184], [122, 176], [42, 36], [445, 34],
  [445, 312], [40, 310],
];

const LONG_EDGES: readonly (readonly [number, number])[] = [
  [40, 2], [40, 4], [41, 7], [41, 9], [42, 13], [42, 15], [43, 18], [43, 20],
  [4, 32], [6, 38], [12, 24], [18, 8], [22, 30], [25, 35],
];

function buildEdges() {
  const edges = new Set<string>();
  POINTS.forEach(([x, y], index) => {
    POINTS.map(([otherX, otherY], otherIndex) => ({
      otherIndex,
      distance: (otherX - x) ** 2 + (otherY - y) ** 2,
    }))
      .filter(({ otherIndex }) => otherIndex !== index)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, index % 5 === 0 ? 4 : 3)
      .forEach(({ otherIndex }) => {
        const a = Math.min(index, otherIndex);
        const b = Math.max(index, otherIndex);
        edges.add(`${a}:${b}`);
      });
  });

  LONG_EDGES.forEach(([a, b]) => edges.add(`${Math.min(a, b)}:${Math.max(a, b)}`));
  return Array.from(edges, (edge) => edge.split(":").map(Number) as [number, number]);
}

const EDGES = buildEdges();
const TARGETS = [4, 10, 16, 24, 30, 40, 41, 42, 43];

export default function ScanMesh() {
  const meshRef = useRef<SVGSVGElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(Boolean(entry?.isIntersecting));
    }, { threshold: 0 });
    observer.observe(mesh);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={meshRef}
      className={`scan-mesh${inView ? " scan-mesh-active" : ""}`}
      viewBox="0 0 480 360"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby="scan-mesh-title scan-mesh-description"
    >
      <title id="scan-mesh-title">Computer-vision tracking mesh</title>
      <desc id="scan-mesh-description">
        A triangulated field of tracked points, projection lines, contour arcs, and detection brackets.
      </desc>

      <g className="scan-mesh-contours" fill="none">
        <ellipse cx="236" cy="180" rx="166" ry="116" />
        <ellipse cx="236" cy="180" rx="127" ry="88" />
        <path d="M67 188a170 122 0 0 1 111-122M304 64a169 122 0 0 1 104 118M93 249a171 124 0 0 0 109 57" />
      </g>

      <g className="scan-mesh-lines">
        {EDGES.map(([a, b], index) => (
          <line
            key={`${a}-${b}`}
            x1={POINTS[a][0]}
            y1={POINTS[a][1]}
            x2={POINTS[b][0]}
            y2={POINTS[b][1]}
            strokeOpacity={index % 5 === 0 ? 0.7 : index % 3 === 0 ? 0.48 : 0.3}
          />
        ))}
      </g>

      <g className="scan-mesh-targets" fill="none">
        <rect x="190" y="63" width="45" height="41" />
        <rect x="326" y="158" width="43" height="46" />
        <rect x="137" y="224" width="43" height="39" />
        <path d="M214 50v12h12M190 104v11h12M316 149h10v12M369 204h11v-12M128 218h9v10M180 263v10h12" />
      </g>

      <g className="scan-mesh-nodes">
        {POINTS.map(([x, y], index) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={TARGETS.includes(index) ? 2.7 : 2.1} />
        ))}
      </g>

      <g className="scan-mesh-data" aria-hidden="true">
        <text x="74" y="124">0.0006</text>
        <text x="388" y="251">0.0204</text>
        <text x="216" y="318">0.0012</text>
        <text x="347" y="91">0.0003</text>
      </g>

      <line className="scan-mesh-sweep" x1="36" y1="180" x2="444" y2="180" />
    </svg>
  );
}
