import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";
import { cn } from "../utils/cn";

/**
 * OPTIC switch — DAY/NIGHT. Explicit branched control rather than a
 * bare icon: it always labels the *current* optic, marks the active
 * segment with the accent surface, and advertises the [D] shortcut.
 * `onInk` inverts the chip for placement on inverted (bg-ink) surfaces
 * so the active segment never collapses into its background.
 */
export default function ThemeToggle({
  className,
  onInk,
}: {
  className?: string;
  onInk?: boolean;
}) {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";

  const active = onInk ? "bg-paper text-ink" : "bg-ink text-paper";
  const idle = onInk
    ? "text-paper/45 group-hover:text-paper"
    : "text-ink/45 group-hover:text-ink";

  return (
    <button
      onClick={toggle}
      data-cursor="OPTIC"
      role="switch"
      aria-checked={dark}
      aria-label={`Switch to ${dark ? "day" : "night"} optic`}
      title={`Switch to ${dark ? "day" : "night"} optic — shortcut [D]`}
      className={cn(
        "group flex items-stretch text-[10px] tracking-[0.22em] transition-colors",
        className
      )}
    >
      <span
        className={cn(
          "flex items-center gap-1.5 px-3 py-1 transition-colors",
          !dark ? active : idle
        )}
      >
        <Sun size={11} strokeWidth={2.2} />
        <span className="hidden lg:inline">DAY</span>
      </span>
      <span className="w-px bg-current/20" aria-hidden />
      <span
        className={cn(
          "flex items-center gap-1.5 px-3 py-1 transition-colors",
          dark ? active : idle
        )}
      >
        <Moon size={11} strokeWidth={2.2} />
        <span className="hidden lg:inline">NIGHT</span>
      </span>
      <span className="hidden items-center border-l border-current/20 pl-2 pr-1 text-acc xl:flex">
        [D]
      </span>
    </button>
  );
}
