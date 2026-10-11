import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT, GH } from "../data";
import { scrollTop } from "../lib/scroll";
import { GhMark } from "./icons";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const CHANNELS = [
  { id: "mail", icon: Mail, title: "Email", value: CONTACT.email, note: "Best way to reach me", href: `mailto:${CONTACT.email}` },
  { id: "gh", icon: GhMark, title: "GitHub", value: "@KiarashAkbari", note: "Public repositories & source", href: GH },
  { id: "tel", icon: Phone, title: "Phone", value: CONTACT.phone, note: `${CONTACT.tz} · Mashhad local time`, href: `tel:${CONTACT.phoneHref}` },
  { id: "loc", icon: MapPin, title: "Location", value: CONTACT.location, note: "Remote worldwide · Relocation friendly", href: null },
] as const;

export default function Signal() {
  return (
    <section id="signal" aria-labelledby="signal-title" className="scroll-mt-20">
      <SectionHead id="signal-title" index="04" title="Contact" note="Open to full-time AI and backend roles, select consulting, and useful collaborations." />

      <div className="px-4 pb-14 md:px-6 md:pb-20">
        <Reveal>
          <h3 className="poster text-[clamp(2.8rem,9vw,8.5rem)] leading-[0.86]">
            Have a role
            <br />
            or project?
            <span className="text-acc"> Write.</span>
          </h3>
        </Reveal>
      </div>

      <div className="ios-group mx-4 md:mx-6">
        {CHANNELS.map((c, i) => {
          const body = (
            <>
              <span className="app-icon app-tile-steel grid h-11 w-11 shrink-0 place-items-center">
                <c.icon size={18} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-bold uppercase tracking-[0.12em] text-ink/60">{c.title}</span>
                <span className="mt-1 block truncate font-mono text-sm font-bold md:text-base">{c.value}</span>
                <span className="mt-1 block text-xs text-ink/60">{c.note}</span>
              </span>
              {c.href && <ArrowUpRight size={18} aria-hidden className="shrink-0 text-acc" />}
            </>
          );
          return (
            <div key={c.id} className="ios-row">
              <Reveal delay={i * 70}>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={`${c.title}: ${c.value}`}
                    className="group flex items-center gap-5 p-5 transition-colors hover:bg-ink hover:text-paper md:p-7"
                  >
                    {body}
                  </a>
                ) : (
                  <div className="flex items-center gap-5 p-5 md:p-7">{body}</div>
                )}
              </Reveal>
            </div>
          );
        })}
      </div>

      <footer className="mt-16 flex flex-col gap-6 border-t border-line px-4 py-8 md:flex-row md:items-end md:justify-between md:px-6">
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold tracking-tight">Kiarash Akbari</p>
          <p className="eyebrow">© 2026 · Built with React, TypeScript &amp; Vite · Single-file build</p>
        </div>
        <button
          type="button"
          onClick={() => scrollTop()}
          className="app-icon app-tile-acc inline-flex items-center gap-2 self-start px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] md:self-auto"
        >
          <ArrowUp size={14} aria-hidden /> Back to top
        </button>
      </footer>
    </section>
  );
}
