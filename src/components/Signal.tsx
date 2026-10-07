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
    title: "Email",
    value: CONTACT.email,
    note: "Primary channel · Direct inbox (< 24h)",
    href: `mailto:${CONTACT.email}`,
    cursor: "MAIL",
  },
  {
    id: "GH",
    icon: GhMark,
    title: "GitHub",
    value: "@KiarashAkbari",
    note: "All public repositories & source code",
    href: GH,
    cursor: "GH",
  },
  {
    id: "TEL",
    icon: Phone,
    title: "Phone",
    value: CONTACT.phone,
    note: `${CONTACT.tz} · Mashhad Local Time`,
    href: `tel:${CONTACT.phoneHref}`,
    cursor: "CALL",
  },
  {
    id: "LOC",
    icon: MapPin,
    title: "Location",
    value: CONTACT.location,
    note: "Remote worldwide · Relocation friendly",
    href: SITE,
    cursor: "SITE",
  },
];

export default function Signal() {
  return (
    <section id="signal" className="relative border-b border-line">
      <SectionHead
        index="05"
        title="Get in Touch"
        note="Direct contact channels for full-time AI engineering positions, backend development, and collaborations."
      />

      <div className="px-4 py-12 md:px-6 md:py-16">
        <h2 className="font-display text-[clamp(2.4rem,6vw,5.5rem)] font-bold leading-tight tracking-tight">
          <Reveal clip as="span" className="block">
            <span className="block">Let's Build Something</span>
          </Reveal>
          <Reveal clip as="span" className="block" delay={120}>
            <span className="block text-acc">
              Remarkable Together.
            </span>
          </Reveal>
        </h2>
        <Reveal delay={220}>
          <p className="copy mt-5 max-w-xl text-base leading-relaxed text-ink/80">
            I am currently open to full-time AI software engineering roles, backend systems positions,
            and select consulting projects. Whether you have a challenging engineering problem or an ambitious
            product to launch, feel free to reach out.
          </p>
        </Reveal>
      </div>

      {/* channel cards */}
      <address className="grid gap-px border-t border-line bg-line not-italic sm:grid-cols-2 lg:grid-cols-4">
        {CHANNELS.map((c, i) => (
          <Reveal key={c.id} delay={i * 80} className="bg-paper">
            <a
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={`${c.title}: ${c.value} — ${c.note}`}
              data-cursor={c.cursor}
              className="group flex h-full flex-col justify-between gap-8 px-4 py-6 transition-colors duration-300 hover:bg-ink hover:text-paper md:px-6 lg:py-8"
            >
              <div className="flex items-center justify-between text-xs font-semibold tracking-wider text-ink/60 group-hover:text-paper/70">
                <span className="flex items-center gap-2">
                  <c.icon size={15} className="text-acc" aria-hidden />
                  {c.title}
                </span>
                <ArrowUpRight
                  size={15}
                  aria-hidden
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-acc"
                />
              </div>
              <div>
                <div className="truncate font-mono text-sm md:text-base font-bold text-ink group-hover:text-paper">
                  {c.value}
                </div>
                <div className="mt-1.5 text-xs text-ink/50 group-hover:text-paper/60">
                  {c.note}
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </address>

      {/* bottom bar */}
      <footer className="border-t border-line">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-5 md:px-6 text-xs text-ink/70">
          <span className="font-medium">
            © 2026 Kiarash Akbari · AI &amp; Software Engineering
          </span>
          <span
            className="hidden select-none overflow-hidden text-xs text-ink/30 md:block"
            aria-hidden
          >
            {ASCII_WAVE.slice(0, 36)}
          </span>
          <div className="flex items-center gap-4">
            <span className="text-xs text-ink/50">
              React · TypeScript · Tailwind
            </span>
            <button
              onClick={scrollTop}
              data-cursor="TOP"
              className="group flex items-center gap-1.5 border border-line px-3 py-1.5 text-xs font-semibold transition-colors hover:border-acc hover:text-acc"
            >
              Top
              <ArrowUp size={13} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line px-4 py-2.5 text-xs text-ink/50 md:px-6">
          <span>
            Theme toggle: Press <span className="font-bold text-ink">[D]</span> to switch Day / Night mode
          </span>
          <span>
            Easter egg: type <span className="font-bold text-acc">rainbow</span> anywhere
          </span>
        </div>
      </footer>
    </section>
  );
}
