import AsciiWave from "./AsciiWave";
import Reveal from "./Reveal";

export default function WaveBand() {
  return (
    <section aria-labelledby="wave-title" className="relative border-b border-line">
      <div className="wave-band-head flex flex-wrap items-end justify-between gap-3 border-b border-line px-4 py-4 md:px-6">
        <h2 id="wave-title" className="wave-band-title font-display text-xl font-bold text-ink md:text-2xl">
          Interactive Wave Lab
        </h2>
        <p className="text-sm text-ink/70">Move, drag, or tap to make ripples.</p>
      </div>

      <Reveal>
        <div className="wave-band-field blueprint relative h-[280px] md:h-[340px]">
          <AsciiWave className="absolute inset-0" />
        </div>
      </Reveal>
    </section>
  );
}
