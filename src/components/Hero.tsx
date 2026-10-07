import { ArrowDown, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import AsciiField from "./AsciiField";
import { scrollToId } from "../lib/scroll";

export default function Hero({ ready }: { ready: boolean }) {
  return (
    <section id="hero" className="relative border-b border-line pt-[42px]">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line px-4 py-3 text-sm md:px-6">
        <span className="font-semibold text-ink">AI &amp; Software Engineer</span>
        <span className="flex items-center gap-2 text-right font-medium text-acc">
          <span className="inline-block h-2 w-2 rounded-full bg-acc" aria-hidden />
          Open to full-time roles
        </span>
      </div>

      <div className="relative grid lg:grid-cols-2">
        <div className="relative flex flex-col justify-center border-b border-line px-4 py-10 md:px-6 md:py-14 lg:border-b-0 lg:border-r lg:py-16">
          <h1 className="font-display text-[clamp(3.2rem,9vw,7.5rem)] font-bold leading-[0.9] tracking-tight text-ink">
            <Reveal as="span" clip className="block" delay={ready ? 80 : 280}>
              <span className="block">Kiarash</span>
            </Reveal>
            <Reveal as="span" clip className="block" delay={ready ? 150 : 360}>
              <span className="block">Akbari</span>
            </Reveal>
          </h1>

          <Reveal delay={220}>
            <p className="mt-5 text-base font-semibold text-ink/75 md:text-lg">
              Backend systems <span className="mx-1 text-acc">·</span> Applied AI
            </p>
          </Reveal>

          <Reveal delay={300}>
            <p className="copy mt-5 max-w-xl text-ink/80">
              I build reliable software for real-world problems—from smart-home products to AI tools
              that answer building-code questions and identify unusual network traffic. My work spans
              backend development, data systems, and applied machine learning.
            </p>
          </Reveal>

          <Reveal delay={380}>
            <p className="mt-5 text-sm font-medium text-ink/65">
              Based in Mashhad, Iran <span className="mx-1.5 text-acc">·</span> Available remotely
            </p>
          </Reveal>

          <Reveal delay={460}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToId("#work");
                }}
                data-cursor="PROJECTS"
                className="group inline-flex items-center gap-2.5 border border-ink bg-ink px-5 py-3.5 text-sm font-semibold text-paper transition-colors hover:border-acc hover:bg-acc hover:text-ink"
              >
                View selected work
                <ArrowDown size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />
              </a>
              <a
                href="#signal"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToId("#signal");
                }}
                data-cursor="CONTACT"
                className="group inline-flex items-center gap-2.5 border border-line px-5 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-ink/[0.05]"
              >
                Contact me
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="relative min-h-[42vh] bg-ink text-paper md:min-h-[52vh] lg:min-h-[calc(100vh-90px)]">
          <AsciiField className="absolute inset-0" />
          <div className="scanlines pointer-events-none absolute inset-0" />
          <div className="scan-band pointer-events-none" />

          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 md:p-6">
            <span className="text-sm font-medium text-paper/80">Interactive 3D ASCII Planet</span>
            <span className="text-sm text-paper/75">
              <span className="hidden sm:inline">Move to shape the particles · Click for a ripple</span>
              <span className="sm:hidden">Tap for a ripple</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
