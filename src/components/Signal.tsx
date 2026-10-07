import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import SectionHead from "./SectionHead";
import { GhMark } from "./icons";
import { CONTACT, GH } from "../data";
import { scrollTop } from "../lib/scroll";

export default function Signal() {
  return (
    <section id="signal" className="relative border-b border-line">
      <SectionHead
        index="04"
        title="Get in Touch"
        note="Open to full-time AI and backend roles, select consulting, and useful collaborations."
      />

      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <div className="max-w-3xl">
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-tight tracking-tight text-ink">
            Have a role or project in mind?
          </h2>
          <p className="copy mt-4 max-w-2xl text-ink/75">
            I’m currently open to full-time software engineering roles and select consulting work.
            Send me a note and I’ll get back to you.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${CONTACT.email}`}
              data-cursor="MAIL"
              className="inline-flex items-center gap-2.5 border border-ink bg-ink px-5 py-3.5 text-sm font-semibold text-paper transition-colors hover:border-acc hover:bg-acc hover:text-ink"
            >
              <Mail size={16} aria-hidden />
              Email me
              <ArrowUpRight size={15} aria-hidden />
            </a>
            <span className="text-sm text-ink/70">{CONTACT.email}</span>
          </div>
        </div>

        <div className="mt-10 grid gap-6 border-y border-line py-6 sm:grid-cols-3 sm:gap-8">
          <div>
            <p className="text-sm font-semibold text-ink">GitHub</p>
            <a
              href={GH}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="GH"
              className="mt-1 inline-flex items-center gap-1.5 text-sm text-ink/70 underline decoration-acc underline-offset-4 hover:text-acc"
            >
              <GhMark size={14} aria-hidden />
              @KiarashAkbari
            </a>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">Phone</p>
            <a
              href={`tel:${CONTACT.phoneHref}`}
              data-cursor="CALL"
              className="mt-1 inline-flex items-center gap-1.5 text-sm text-ink/70 underline decoration-acc underline-offset-4 hover:text-acc"
            >
              <Phone size={14} aria-hidden />
              {CONTACT.phone}
            </a>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">Location</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-ink/70">
              <MapPin size={14} className="text-acc" aria-hidden />
              {CONTACT.location} · Remote worldwide
            </p>
          </div>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-4 pt-6 text-sm text-ink/60">
          <span>© 2026 Kiarash Akbari</span>
          <button
            onClick={scrollTop}
            data-cursor="TOP"
            className="group inline-flex items-center gap-1.5 border border-line px-3 py-2 font-semibold text-ink transition-colors hover:border-acc hover:text-acc"
          >
            Back to top
            <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden />
          </button>
        </footer>
      </div>
    </section>
  );
}
