import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { GhMark } from "./icons";
import { CONTACT, GH, SITE } from "../data";
import { scrollTop } from "../lib/scroll";

const ASCII_WAVE = "▁▂▃▄▅▆▇█▇▆▅▄▃▂▁".repeat(6);

const CHANNELS = [
  {
    id: "MAIL",
    icon: Mail,
    title: "EMAIL",
    value: CONTACT.email,
    note: "FASTEST CHANNEL — RESPONSE < 24H",
    href: `mailto:${CONTACT.email}`,
    cursor: "MAIL",
  },
  {
    id: "GH",
    icon: GhMark,
    title: "GITHUB",
    value: "@KiarashAkbari",
    note: "GROUND TRUTH — ALL PUBLIC BUILDS",
    href: GH,
    cursor: "GH",
  },
  {
    id: "TEL",
    icon: Phone,
    title: "PHONE",
    value: CONTACT.phone,
    note: `${CONTACT.tz} — MASHHAD LOCAL`,
    href: `tel:${CONTACT.phoneHref}`,
    cursor: "CALL",
  },
  {
    id: "LOC",
    icon: MapPin,
    title: "LOCATION",
    value: CONTACT.location,
    note: "REMOTE-FIRST — ANY TIMEZONE",
    href: SITE,
    cursor: "SITE",
  },
];

export default function Signal() {
  return (
    <section id="signal" className="relative border-b border-line">
      <SectionHead
        index="05"
        title="SIGNAL"
        note="OPEN CHANNELS — SOURCED FROM RESUME.PDF. BRING A HARD PROBLEM."
      />

      <div className="px-4 py-12 md:px-6 md:py-16">
        <Reveal clip>
          <h3 className="xcond font-display text-[clamp(2.8rem,8vw,7rem)] font-bold leading-[0.88]">
            GOT A PROBLEM
          </h3>
        </Reveal>
        <Reveal clip delay={120}>
          <h3 className="xcond font-display text-[clamp(2.8rem,8vw,7rem)] font-bold leading-[0.88]">
            <span className="stroke-ink">THAT NEEDS</span>{" "}
            <span className="text-acc">EYES?</span>
          </h3>
        </Reveal>
        <Reveal delay={220}>
          <p className="copy mt-6 max-w-md text-ink/75">
            Open to remote AI software engineering roles and collaborations.
            The fastest way to reach me is through the channels below — bring
            a hard problem and I'll bring the model.
          </p>
        </Reveal>
      </div>

      {/* channel cards — gap-px over bg-line draws perfect hairline seams in every grid shape */}
      <div className="grid gap-px border-t border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {CHANNELS.map((c, i) => (
          <Reveal key={c.id} delay={i * 80} className="bg-paper">
            <a
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noreferrer" : undefined}
              data-cursor={c.cursor}
              className="group flex h-full flex-col justify-between gap-8 px-4 py-6 transition-colors duration-300 hover:bg-ink hover:text-paper md:px-6 lg:py-8"
            >
              <div className="flex items-center justify-between text-[10px] tracking-[0.3em] text-ink/50 group-hover:text-paper/50">
                <span className="flex items-center gap-2">
                  <c.icon size={13} className="text-acc" />
                  {c.title}
                </span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-acc"
                />
              </div>
              <div>
                <div className="truncate font-mono text-[12px] font-bold tracking-[0.04em] md:text-[13px]">
                  {c.value}
                </div>
                <div className="mt-1.5 text-[8.5px] tracking-[0.1em] text-ink/45 group-hover:text-paper/45">
                  {c.note}
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      {/* bottom bar */}
      <footer className="border-t border-line">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-5 md:px-6">
          <span className="text-[9px] tracking-[0.14em] text-ink/60 md:text-[10px]">
            © 2026 KIARASH AKBARI
          </span>
          <span
            className="hidden select-none overflow-hidden text-[9px] tracking-[0.08em] text-ink/30 md:block"
            aria-hidden
          >
            {ASCII_WAVE.slice(0, 48)}
          </span>
          <span className="text-[9px] tracking-[0.12em] text-ink/45">
            ENG: REACT+TS+ASCII // DOC:KIA.SYS_V5.2
          </span>
          <button
            onClick={scrollTop}
            data-cursor="TOP"
            className="group flex items-center gap-2 border border-line px-3 py-1.5 text-[9px] tracking-[0.25em] transition-colors hover:border-acc hover:text-acc"
          >
            RTB
            <ArrowUp size={11} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line px-4 py-2.5 text-[8.5px] tracking-[0.1em] text-ink/35 md:px-6">
          <span>
            DUAL-OPTIC READY — PRESS <span className="font-bold text-ink/60">[D]</span> TO
            SWITCH DAY/NIGHT
          </span>
          <span>
            PSST — TYPE <span className="font-bold text-acc">RAINBOW</span> ANYWHERE
          </span>
        </div>
      </footer>
    </section>
  );
}
