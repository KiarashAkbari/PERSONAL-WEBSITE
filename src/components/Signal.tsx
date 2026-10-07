import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { GhMark } from "./icons";
import { CONTACT, GH } from "../data";
import { scrollTop } from "../lib/scroll";

const ASCII_WAVE = "▁▂▃▄▅▆▇█▇▆▅▄▃▂▁".repeat(6);

const CHANNELS = [
  {
    id: "MAIL",
    icon: Mail,
    title: "Email",
    value: CONTACT.email,
    note: "Best way to reach me",
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
    href: null,
    cursor: "SITE",
  },
];

export default function Signal() {
  return (
    <section id="signal" className="relative border-b border-line">
      <SectionHead
        index="04"
        title="Get in Touch"
        note="Open to full-time AI and backend roles, select consulting, and useful collaborations."
      />

      <div className="px-4 py-12 md:px-6 md:py-16">
        <h2 className="font-display text-[clamp(2.4rem,6vw,5.5rem)] font-bold leading-tight tracking-tight">
          <Reveal clip as="span" className="block">
            <span className="block">Have a Role or Project</span>
          </Reveal>
          <Reveal clip as="span" className="block" delay={120}>
            <span className="block text-acc">
              in Mind?
            </span>
          </Reveal>
        </h2>
        <Reveal delay={220}>
          <p className="copy mt-5 max-w-xl text-base leading-relaxed text-ink/80">
            I am open to full-time software engineering roles and select consulting work. Send me
            a note and I will get back to you.
          </p>
        </Reveal>
      </div>

      {/* channel cards */}
      <address className="grid gap-px border-t border-line bg-line not-italic sm:grid-cols-2 lg:grid-cols-4">
        {CHANNELS.map((c, i) => {
          const content = (
            <>
              <div className="flex items-center justify-between text-xs font-semibold tracking-wider text-ink/60 group-hover:text-paper/70">
                <span className="flex items-center gap-2">
                  <c.icon size={15} className="text-acc" aria-hidden />
                  {c.title}
                </span>
                {c.href && (
                  <ArrowUpRight
                    size={15}
                    aria-hidden
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-acc"
                  />
                )}
              </div>
              <div>
                <div className="truncate font-mono text-sm md:text-base font-bold text-ink group-hover:text-paper">
                  {c.value}
                </div>
                <div className="mt-1.5 text-xs text-ink/50 group-hover:text-paper/60">
                  {c.note}
                </div>
              </div>
            </>
          );
          const cardClass = "group flex h-full flex-col justify-between gap-8 px-4 py-6 md:px-6 lg:py-8";

          return (
            <Reveal key={c.id} delay={i * 80} className="bg-paper">
              {c.href ? (
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={`${c.title}: ${c.value} — ${c.note}`}
                  data-cursor={c.cursor}
                  className={`${cardClass} transition-colors duration-300 hover:bg-ink hover:text-paper`}
                >
                  {content}
                </a>
              ) : (
                <div className={cardClass}>{content}</div>
              )}
            </Reveal>
          );
        })}
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
              Back to Top
              <ArrowUp size={13} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </footer>
    </section>
  );
}
