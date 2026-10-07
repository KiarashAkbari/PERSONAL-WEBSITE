import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { GhMark } from "./icons";
import ThemeToggle from "./ThemeToggle";
import { cn } from "../utils/cn";
import { NAV_LINKS, GH } from "../data";
import { scrollToId, scrollTop, startScroll, stopScroll } from "../lib/scroll";

export default function Nav({ ready }: { ready: boolean }) {
  const [prog, setProg] = useState(0);
  const [time, setTime] = useState("00:00:00");
  const [open, setOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      setProg(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight));
    };
    window.addEventListener("scroll", on, { passive: true });
    on();
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const f = () => {
      const d = new Date();
      const p = (n: number) => String(n).padStart(2, "0");
      setTime(`${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`);
    };
    f();
    const iv = window.setInterval(f, 1000);
    return () => window.clearInterval(iv);
  }, []);

  /* menu: escape closes, focus-trap, page scroll locks behind overlay */
  useEffect(() => {
    if (!open) return;
    stopScroll();
    // move focus into menu
    window.setTimeout(() => closeRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key === "Tab") {
        const overlay = document.getElementById("nav-overlay");
        if (!overlay) return;
        const focusable = Array.from(
          overlay.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])')
        ).filter((el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true");
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (ready) startScroll();
      // return focus to trigger
      menuToggleRef.current?.focus();
    };
  }, [open, ready]);

  const go = (id: string) => {
    setOpen(false);
    /* let the overlay begin closing before the jump */
    window.setTimeout(() => scrollToId(id), 60);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] border-b border-line bg-paper/90 backdrop-blur-sm transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]",
          ready ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="flex items-stretch justify-between">
          {/* logo */}
          <button
              onClick={scrollTop}
              data-cursor="TOP"
              aria-label="Back to top"
              className="flex items-center gap-2.5 border-r border-line px-4 py-3 text-xs md:text-sm font-bold tracking-tight text-ink md:px-5"
            >
              <span className="inline-block h-2.5 w-2.5 bg-acc" aria-hidden />
              Kiarash Akbari
            </button>

          {/* links */}
          <nav className="hidden items-stretch md:flex">
            {NAV_LINKS.map(([i, label, id]) => (
              <button
                key={id}
                onClick={() => go(id)}
                data-cursor="GO"
                className="group flex items-center gap-2 border-l border-line px-3 text-xs font-semibold tracking-wide transition-colors hover:bg-ink hover:text-paper xl:px-4"
              >
                <span className="text-acc font-mono text-[11px]">{i}</span>
                {label}
              </button>
            ))}
          </nav>

          {/* right cluster */}
          <div className="flex items-stretch">
            <span className="hidden items-center gap-2 border-l border-line px-4 text-xs font-mono text-ink/65 lg:flex">
              <span className="inline-block h-1.5 w-1.5 animate-blink bg-acc" aria-hidden />
              {time} (UTC+03:30)
            </span>
            <div className="hidden items-center border-l border-line pl-1 sm:flex">
              <ThemeToggle />
            </div>
            <a
              href={GH}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="GH"
              aria-label="Kiarash Akbari on GitHub"
              className="hidden items-center gap-2 border-l border-line px-4 text-xs font-medium transition-colors hover:bg-ink hover:text-paper sm:flex"
            >
              <GhMark size={14} />
              <span className="hidden xl:inline">GitHub</span>
            </a>
            <button
              ref={menuToggleRef}
              onClick={() => setOpen(true)}
              data-cursor="MENU"
              aria-label="Open navigation menu"
              aria-expanded={open}
              aria-controls="nav-overlay"
              className="flex items-center gap-1.5 border-l border-line px-4 text-xs font-bold tracking-wider md:hidden"
            >
              Menu <Plus size={13} aria-hidden />
            </button>
          </div>
        </div>
        {/* progress */}
        <div
          className="absolute bottom-[-1px] left-0 h-[2px] bg-acc transition-[width] duration-150"
          style={{ width: `${prog * 100}%` }}
        />
      </header>

      {/* mobile overlay menu — inert keeps it out of the tab order while closed.
         term = fixed firmware palette — a dark terminal in both optics */}
      <div
        id="nav-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "term fixed inset-0 z-[96] flex flex-col bg-ink text-paper transition-all duration-500 ease-[cubic-bezier(.76,0,.24,1)]",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        {...(!open ? ({ inert: true } as unknown as Record<string, unknown>) : {})}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-line-inv px-4 py-3.5 text-xs tracking-wider">
          <span className="font-bold">Navigation</span>
          <button
            ref={closeRef}
            onClick={() => setOpen(false)}
            data-cursor="CLOSE"
            aria-label="Close navigation menu"
            className="font-bold text-acc px-2 py-1"
          >
            ✕ Close
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
          {NAV_LINKS.map(([i, label, id], k) => (
            <button
              key={id}
              onClick={() => go(id)}
              className="group flex items-baseline gap-4 border-b border-line-inv py-4 text-left"
              style={{ transitionDelay: `${k * 40}ms` }}
            >
              <span className="font-mono text-sm text-acc">{i}</span>
              <span className="font-display text-4xl font-bold leading-none transition-transform duration-300 group-hover:translate-x-2">
                {label}
              </span>
            </button>
          ))}
        </nav>
        <div className="flex items-center justify-between px-6 pb-8 text-xs text-paper/60">
          <span>
            github.com/KiarashAkbari
          </span>
          <ThemeToggle onInk className="border border-line-inv" />
        </div>
      </div>
    </>
  );
}
