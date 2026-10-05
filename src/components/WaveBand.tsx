import AsciiWave from "./AsciiWave";
import Reveal from "./Reveal";

/**
 * FIG.02 — the interlude. A full-bleed 2D wave simulation rendered
 * through the same monospace grid as everything else on the page:
 * text as a physical medium, per the aino.agency playbook.
 */
export default function WaveBand() {
  return (
    <section aria-label="Interactive ASCII ripple field" className="relative border-b border-line">
      <div className="flex items-center justify-between border-b border-line px-4 py-2 text-[9px] tracking-[0.14em] text-ink/60 md:px-6 md:text-[10px]">
        <span>FIG.02 — RIPPLE_FIELD.ASCII</span>
        <span className="hidden tracking-[0.1em] md:inline">
          2D_WAVE_EQUATION <span className="text-acc">//</span> HOMAGE: AINO.AGENCY
        </span>
        <span className="text-acc">DISTURB_WITH_POINTER ▚</span>
      </div>

      {/* plain fade reveal, not `clip`: a clip-path over a live canvas whose
          own IntersectionObserver gates the render loop can strand it shut.
          Matches every other section on the page. */}
      <Reveal>
        <div className="blueprint relative h-[46vh] min-h-[320px] md:h-[54vh]">
          <AsciiWave className="absolute inset-0" />
          <div className="plus absolute left-3 top-3 text-ink/30" />
          <div className="plus absolute right-3 top-3 text-ink/30" />
          <div className="plus absolute bottom-3 left-3 text-ink/30" />
          <div className="plus absolute bottom-3 right-3 text-ink/30" />
          <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.2em] text-ink/40">
            TEXT <span className="text-acc">AS</span> MEDIUM
          </div>
        </div>
      </Reveal>
    </section>
  );
}
