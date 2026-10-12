import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { CHAMBERS, type ChamberId } from "@/types/navigation";
import { RESUME_URL } from "@/data";
import { useTheme } from "@/theme/ThemeProvider";
import { cn } from "@/utils/cn";

function useTehranClock(): string {
  const format = () =>
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Tehran",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date());

  const [clock, setClock] = useState(format);
  useEffect(() => {
    const id = window.setInterval(() => setClock(format()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return clock;
}

type ChromeProps = {
  activeChamber: ChamberId;
  onSelectChamber: (id: ChamberId) => void;
  synapticPulseCount: number;
};

export default function Chrome({
  activeChamber,
  onSelectChamber,
  synapticPulseCount,
}: ChromeProps) {
  const { theme, toggle, rainbow, toggleRainbow } = useTheme();
  const clock = useTehranClock();
  const activeIdx = CHAMBERS.findIndex((c) => c.id === activeChamber);
  const currentMeta = CHAMBERS[activeIdx] ?? CHAMBERS[0];

  const stepChamber = (delta: number) => {
    const nextIdx = (activeIdx + delta + CHAMBERS.length) % CHAMBERS.length;
    onSelectChamber(CHAMBERS[nextIdx].id);
  };

  return (
    <>
      {/* Top Spatial Exhibition Frame */}
      <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-md">
        {/* Micro-telemetry strip */}
        <div className="flex h-7 items-center justify-between border-b border-line px-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft md:px-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-acc" aria-hidden />
              CORTEX // ATLAS v7.0
            </span>
            <span className="hidden sm:inline text-line-strong">/</span>
            <span className="hidden sm:inline">
              CHAMBER {currentMeta.code}: {currentMeta.subtitle}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline">
              SYNAPTIC EVENTS: <strong className="font-normal text-ink">{synapticPulseCount}</strong>
            </span>
            <span>TEH {clock}</span>
          </div>
        </div>

        {/* Main Architectural Bar */}
        <div className="flex min-h-14 items-stretch justify-between">
          {/* Identity Brand / Home trigger */}
          <button
            type="button"
            onClick={() => onSelectChamber("cortex")}
            className="group flex items-center gap-3.5 border-r border-line px-4 py-2.5 text-left transition-colors hover:bg-ink hover:text-paper md:px-6"
          >
            <span className="grid h-7 w-7 place-items-center border border-current font-mono text-[11px] font-bold tracking-tight">
              KA
            </span>
            <div>
              <span className="block text-xs font-bold uppercase tracking-[0.14em]">
                Kiarash Akbari
              </span>
              <span className="block font-editorial text-[11px] italic opacity-75">
                AI &amp; Systems Architecture
              </span>
            </div>
          </button>

          {/* Desktop Multi-Chamber Tab Bar */}
          <nav
            aria-label="Exhibition Chambers"
            className="hidden flex-1 items-stretch lg:flex"
          >
            <div role="tablist" aria-label="Spatial Chambers" className="grid flex-1 grid-cols-5">
              {CHAMBERS.map((chamber) => {
                const isActive = chamber.id === activeChamber;
                return (
                  <button
                    key={chamber.id}
                    type="button"
                    role="tab"
                    id={`tab-${chamber.id}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${chamber.id}`}
                    onClick={() => onSelectChamber(chamber.id)}
                    className={cn(
                      "group relative flex flex-col justify-between border-r border-line px-4 py-2.5 text-left transition-colors",
                      isActive
                        ? "bg-ink text-paper"
                        : "hover:bg-paper-2 text-ink"
                    )}
                  >
                    <div className="flex w-full items-center justify-between font-mono text-[10px] tracking-[0.16em]">
                      <span className={cn(isActive ? "text-acc" : "text-ink-soft")}>
                        {chamber.code} //
                      </span>
                      <kbd
                        className={cn(
                          "border px-1 py-0.2 text-[9px]",
                          isActive
                            ? "border-paper/30 text-paper/80"
                            : "border-line text-ink-soft"
                        )}
                      >
                        {chamber.shortcut}
                      </kbd>
                    </div>
                    <div className="mt-1 flex items-baseline justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-[0.1em]">
                        {chamber.label}
                      </span>
                      <span
                        className={cn(
                          "truncate font-editorial text-[11px] italic",
                          isActive ? "text-paper/75" : "text-ink-soft"
                        )}
                      >
                        {chamber.subtitle.split(" ")[0]}
                      </span>
                    </div>
                    {isActive && (
                      <span
                        className="absolute inset-x-0 bottom-0 h-[2px] bg-acc"
                        aria-hidden
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Right Controls: Resume Monograph + Spectrum + Optic Switch */}
          <div className="flex items-stretch">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 border-r border-line px-4 font-mono text-[10.5px] uppercase tracking-[0.16em] transition-colors hover:bg-ink hover:text-paper sm:inline-flex"
            >
              <span>Monograph.PDF</span>
              <ArrowUpRight size={12} aria-hidden />
            </a>

            <button
              type="button"
              onClick={toggleRainbow}
              aria-pressed={rainbow}
              aria-label="Toggle chromatic excitation in neural canvases"
              title="Chromatic Excitation"
              className={cn(
                "grid w-11 place-items-center border-r border-line transition-colors",
                rainbow
                  ? "bg-acc text-[#09090a]"
                  : "text-ink-soft hover:bg-paper-2 hover:text-ink"
              )}
            >
              <Sparkles size={14} aria-hidden />
            </button>

            <button
              type="button"
              onClick={toggle}
              aria-label={`Switch to ${theme === "dark" ? "Chalk (light)" : "Obsidian (dark)"} optic`}
              className="flex items-center gap-2.5 px-4 font-mono text-[10.5px] uppercase tracking-[0.16em] transition-colors hover:bg-ink hover:text-paper md:px-5"
            >
              <span
                className={cn(
                  "h-2.5 w-2.5 rounded-full border",
                  theme === "dark"
                    ? "border-ink bg-ink"
                    : "border-ink bg-transparent"
                )}
                aria-hidden
              />
              <span>{theme === "dark" ? "Obsidian" : "Chalk"}</span>
              <kbd className="hidden border border-current/30 px-1 text-[9px] opacity-65 md:inline">
                D
              </kbd>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Chamber Switcher Bar (< lg) */}
      <nav
        aria-label="Mobile Chamber Switcher"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-paper/95 backdrop-blur-md lg:hidden"
      >
        <div role="tablist" className="grid grid-cols-5 divide-x divide-line">
          {CHAMBERS.map((chamber) => {
            const isActive = chamber.id === activeChamber;
            return (
              <button
                key={chamber.id}
                type="button"
                role="tab"
                id={`mobile-tab-${chamber.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${chamber.id}`}
                onClick={() => onSelectChamber(chamber.id)}
                className={cn(
                  "flex flex-col items-center justify-center py-2.5 text-center transition-colors",
                  isActive ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[9.5px] tracking-[0.14em]",
                    isActive ? "text-acc" : "opacity-70"
                  )}
                >
                  {chamber.code}
                </span>
                <span className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.06em]">
                  {chamber.label.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop Spatial Footer HUD (>= lg) */}
      <footer className="hidden border-t border-line bg-paper px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft lg:flex lg:items-center lg:justify-between">
        <div className="flex items-center gap-6">
          <span>
            ACTIVE NODE: <strong className="text-ink">{currentMeta.code} // {currentMeta.label}</strong>
          </span>
          <span>KEYS: [1–5] CHAMBERS · [ [ / ] ] STEP · [D] OPTIC</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => stepChamber(-1)}
            className="inline-flex items-center gap-1.5 border border-line px-2.5 py-1 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          >
            <ArrowLeft size={11} aria-hidden />
            <span>Prev Lobe</span>
          </button>
          <button
            type="button"
            onClick={() => stepChamber(1)}
            className="inline-flex items-center gap-1.5 border border-line px-2.5 py-1 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          >
            <span>Next Lobe</span>
            <ArrowRight size={11} aria-hidden />
          </button>
        </div>
      </footer>
    </>
  );
}
