import AsciiWave from "./AsciiWave";
import Reveal from "./Reveal";

/**
 * Interactive 2D wave equation simulation rendered through an ASCII character grid.
 */
export default function WaveBand() {
  return (
    <section aria-label="Interactive ASCII ripple field" className="relative border-b border-line">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5 text-xs text-ink/70 md:px-6">
        <span className="font-semibold tracking-wide">Interactive Lab // 2D ASCII Wave Simulation</span>
        <span className="hidden tracking-normal md:inline text-ink/50">
          Fluid height-field wave equations rendered on a monospace character matrix
        </span>
        <span className="font-semibold text-acc">Move pointer to disturb ▚</span>
      </div>

      <Reveal>
        <div className="blueprint relative h-[42vh] min-h-[300px] md:h-[48vh]">
          <AsciiWave className="absolute inset-0" />
          <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-xs tracking-wider text-ink/50 bg-paper/80 px-3 py-1 border border-line backdrop-blur-xs">
            Interactive Physics Canvas <span className="text-acc">·</span> Click or drag to create waves
          </div>
        </div>
      </Reveal>
    </section>
  );
}
