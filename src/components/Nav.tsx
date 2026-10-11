import { useEffect, useState, type MouseEvent } from "react";
import { Briefcase, FolderOpen, Mail, User, Sun, Moon, Sparkles } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";
import { scrollToId, scrollTop } from "../lib/scroll";
import { NAV_LINKS } from "../data";
import { cn } from "../utils/cn";

const ICONS = [FolderOpen, Briefcase, User, Mail];
const SECTION_IDS = ["work", "log", "profile", "signal"];

function useTehranClock() {
  const fmt = () =>
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Tehran",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const t = window.setInterval(() => setTime(fmt()), 30_000);
    return () => window.clearInterval(t);
  }, []);
  return time;
}

function useActiveSection() {
  const [active, setActive] = useState<string>("work");
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

function Signal() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" aria-hidden className="fill-current">
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={i * 4} y={9 - i * 2.4} width="2.4" height={2 + i * 2.4} />
      ))}
    </svg>
  );
}

function Battery() {
  return (
    <svg width="22" height="10" viewBox="0 0 22 10" aria-hidden className="fill-current">
      <rect x="0.5" y="0.5" width="18" height="9" rx="2" fill="none" stroke="currentColor" opacity="0.6" />
      <rect x="2.5" y="2.5" width="14" height="5" rx="1" />
      <rect x="19.5" y="3" width="2" height="4" rx="1" opacity="0.6" />
    </svg>
  );
}

export function ThemeSwitch() {
  const { theme, toggle, rainbow, toggleRainbow } = useTheme();
  const dark = theme === "dark";
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={dark}
        aria-label="Night optic"
        onClick={toggle}
        className="group flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.14em]"
      >
        <Sun size={13} aria-hidden className={cn(dark ? "opacity-40" : "text-acc")} />
        <span
          className={cn(
            "relative inline-block h-6 w-11 rounded-full transition-colors duration-300",
            dark ? "bg-acc" : "bg-ink/20"
          )}
        >
          <span
            className={cn(
              "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-paper shadow-[0_2px_4px_rgb(0_0_0/.35)] transition-transform duration-300 ease-out",
              dark ? "translate-x-5" : "translate-x-0"
            )}
          />
        </span>
        <Moon size={13} aria-hidden className={cn(dark ? "text-acc" : "opacity-40")} />
      </button>
      <button
        type="button"
        aria-pressed={rainbow}
        aria-label="Spectrum mode for the ASCII field"
        onClick={toggleRainbow}
        className={cn(
          "grid h-7 w-7 place-items-center border border-line transition-colors",
          rainbow ? "border-acc text-acc" : "hover:border-ink"
        )}
      >
        <Sparkles size={13} aria-hidden />
      </button>
    </div>
  );
}

export default function Nav() {
  const clock = useTehranClock();
  const active = useActiveSection();

  const go = (href: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (href === "#hero") scrollTop();
    else scrollToId(href);
  };

  return (
    <>
      {/* top chrome: iOS-style status bar + wordmark bar */}
      <header className="glass fixed inset-x-0 top-0 z-50 border-b border-line">
        <div className="status-bar flex h-7 items-center justify-between border-b border-line px-4 md:px-6">
          <span>TEH {clock}</span>
          <span className="flex items-center gap-2.5">
            <Signal />
            <span className="hidden sm:inline">KIA.SYS 6.0</span>
            <Battery />
          </span>
        </div>
        <nav aria-label="Primary" className="flex h-14 items-center justify-between gap-6 px-4 md:px-6">
          <a href="#hero" onClick={go("#hero")} className="flex items-center gap-3">
            <span className="app-icon app-tile-acc grid h-9 w-9 place-items-center text-[11px] font-bold tracking-tight">
              KA
            </span>
            <span className="text-[13px] font-bold uppercase tracking-[0.06em]">Kiarash Akbari</span>
          </a>

          <ul className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map(([num, label, href]) => {
              const id = href.slice(1);
              const on = active === id;
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={go(href)}
                    aria-current={on ? "true" : undefined}
                    className={cn(
                      "group flex items-baseline gap-2 text-sm font-semibold transition-colors",
                      on ? "text-acc" : "text-ink/70 hover:text-ink"
                    )}
                  >
                    <span className="font-mono text-[10px] opacity-70">{num}</span>
                    <span className="relative">
                      {label}
                      <span
                        className={cn(
                          "absolute -bottom-1 left-0 h-[2px] bg-acc transition-all duration-300",
                          on ? "w-full" : "w-0 group-hover:w-full"
                        )}
                      />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <ThemeSwitch />
        </nav>
      </header>

      {/* mobile dock — the iPhone springboard reflex */}
      <nav aria-label="Sections" className="dock fixed inset-x-0 bottom-0 z-50 pb-[env(safe-area-inset-bottom)] md:hidden">
        <ul className="grid grid-cols-4 px-3 pt-2.5 pb-2">
          {NAV_LINKS.map(([num, label, href], i) => {
            const Icon = ICONS[i] ?? FolderOpen;
            const id = href.slice(1);
            const on = active === id;
            return (
              <li key={href} className="flex justify-center">
                <a href={href} onClick={go(href)} className="flex flex-col items-center gap-1.5 text-[10px] font-semibold">
                  <span
                    className={cn(
                      "app-icon grid h-11 w-11 place-items-center",
                      on ? "app-tile-acc" : "app-tile-steel"
                    )}
                    data-n={num}
                  >
                    <Icon size={20} aria-hidden />
                  </span>
                  <span className={on ? "text-acc" : "text-ink/70"}>{label.split(" ")[0]}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
