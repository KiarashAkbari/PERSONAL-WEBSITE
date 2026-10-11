import AsciiWave from "./AsciiWave";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

export default function WaveLab() {
  return (
    <section id="lab" aria-labelledby="lab-title" className="scroll-mt-20">
      <SectionHead id="lab-title" index="LAB" title="Wave Lab" note="Move, drag, or tap. A height-field simulation on a character grid." />
      <Reveal className="px-4 pb-16 md:px-6 md:pb-24">
        <div className="iron-bezel">
          <div className="iron-screen term relative h-[300px] md:h-[460px]">
            <AsciiWave className="absolute inset-0" scale={1.6} />
            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/80">
              <span>RIPPLE_FIELD.ASCII</span>
              <span>2D · Physics</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
