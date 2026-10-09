import { ArrowDown, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import AsciiField from "./AsciiField";
import ScanMesh from "./ScanMesh";
import { scrollToId } from "../lib/scroll";

export default function Hero({ ready }: { ready: boolean }) {
  return (
    <section id="hero" className="punk-cover relative border-b border-line pt-[42px]">
      <div className="cover-strip flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-y border-line px-4 py-3 md:px-6">
        <span className="cover-strip-label">
          <span className="text-acc">KA—01</span> / Software &amp; Applied AI
        </span>
        <span className="cover-strip-status">
          <span className="inline-block h-2 w-2 rounded-full bg-acc" aria-hidden />
          Open to full-time roles
        </span>
      </div>

      <div className="grid lg:grid-cols-12">
        <div className="hero-copy relative flex flex-col justify-center border-b border-line px-4 py-10 md:px-6 md:py-14 lg:col-span-7 lg:border-b-0 lg:border-r lg:px-8 lg:py-16">
          <Reveal delay={ready ? 80 : 260}>
            <p className="hero-kicker mb-5">AI Software Engineer <span>/</span> Mashhad, Iran</p>
          </Reveal>

          <h1 className="hero-title font-display font-bold leading-none tracking-tight text-ink">
            <Reveal as="span" clip className="block" delay={ready ? 100 : 300}>
              <span className="hero-title-line block">Kiarash</span>
            </Reveal>
            <Reveal as="span" clip className="block" delay={ready ? 180 : 380}>
              <span className="hero-title-line hero-title-outline block">
                Akbari<span className="hero-title-mark" aria-hidden> /</span>
              </span>
            </Reveal>
          </h1>

          <Reveal delay={ready ? 240 : 440}>
            <p className="hero-discipline mt-6 text-base font-semibold md:text-lg">
              Backend Systems <span>·</span> Applied AI
            </p>
          </Reveal>

          <Reveal delay={ready ? 300 : 500}>
            <p className="copy hero-summary mt-5 max-w-xl text-ink/80">
              I build reliable software for practical problems—from smart-home products to AI tools
              that answer building-code questions and identify unusual network traffic.
            </p>
          </Reveal>

          <Reveal delay={ready ? 360 : 560}>
            <p className="hero-location mt-5 text-sm font-medium text-ink/65">
              Based in Mashhad, Iran <span>·</span> Available remotely
            </p>
          </Reveal>

          <Reveal delay={ready ? 420 : 620}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToId("#work");
                }}
                data-cursor="PROJECTS"
                className="hero-cta hero-cta-primary group inline-flex items-center gap-2.5 px-5 py-3.5 text-sm font-semibold transition-colors"
              >
                View Selected Work
                <ArrowDown size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />
              </a>
              <a
                href="#signal"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToId("#signal");
                }}
                data-cursor="CONTACT"
                className="hero-cta hero-cta-secondary group inline-flex items-center gap-2.5 px-5 py-3.5 text-sm font-semibold transition-colors"
              >
                Contact Me
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </a>
            </div>
          </Reveal>

          <div className="hero-footnote mt-10 flex items-center justify-between gap-4 border-t border-line pt-3 text-[11px] font-mono uppercase tracking-[0.16em] text-ink/55">
            <span>Portfolio / 2026</span>
            <span>Software / Applied AI</span>
          </div>
        </div>

        <div className="hero-artwork grid lg:col-span-5">
          <div className="hero-core relative min-h-[320px] md:min-h-[390px] lg:min-h-[400px]">
            <AsciiField className="absolute inset-0" />
            <div className="scanlines pointer-events-none absolute inset-0" />
            <div className="hero-art-meta pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4 md:p-5">
              <span>FIELD 01 <i>/</i> ASCII</span>
              <span>3D <i>·</i> INTERACTIVE</span>
            </div>
            <div className="hero-art-hint pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 md:p-5">
              <span className="hidden sm:inline">Move to shape the particles<br />Click for a ripple</span>
              <span className="sm:hidden">Tap for a ripple</span>
              <span className="text-right">NEURAL<br />STUDY / 01</span>
            </div>
          </div>

          <figure className="term hero-mesh-panel m-0">
            <div className="hero-mesh-viewport relative">
              <ScanMesh />
              <span className="hero-mesh-stamp hero-mesh-stamp-top">TRACKING FIELD <b>01</b></span>
              <span className="hero-mesh-stamp hero-mesh-stamp-bottom">NODES / VECTORS</span>
            </div>
            <figcaption className="hero-mesh-caption flex items-center justify-between gap-3 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em]">
              <span>Computer Vision / Mesh Study</span>
              <span>2026</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
