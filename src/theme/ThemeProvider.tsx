import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

type ThemeCtx = {
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
  rainbow: boolean;
  toggleRainbow: () => void;
};

const Ctx = createContext<ThemeCtx | null>(null);

const STORAGE_KEY = "kia-theme";
const ACCENT = { light: "#f4f2ec", dark: "#22201c" } as const;

function readInitial(): Theme {
  if (typeof document !== "undefined" && document.documentElement.classList.contains("dark"))
    return "dark";
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s === "dark" || s === "light") return s;
  } catch {}
  return "light";
}

function applyDom(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  /* "only light" forbids UA forced-darkening of the day optic;
     "dark" marks the night optic as natively dark (see index.html
     color-scheme meta + darkreader-lock) */
  root.style.colorScheme = theme === "light" ? "only light" : "dark";
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", ACCENT[theme]);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readInitial);
  const [rainbow, setRainbow] = useState(false);

  /* cross-fade window: enable color transitions only during a switch */
  const flashTransitions = useCallback(() => {
    const root = document.documentElement;
    root.classList.add("theme-x");
    window.setTimeout(() => root.classList.remove("theme-x"), 560);
  }, []);

  const setTheme = useCallback(
    (t: Theme, opts?: { silent?: boolean }) => {
      setThemeState((prev) => {
        if (prev === t) return prev;
        if (!opts?.silent) flashTransitions();
        return t;
      });
      try {
        localStorage.setItem(STORAGE_KEY, t);
      } catch {}
    },
    [flashTransitions]
  );

  const toggle = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      flashTransitions();
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {}
      return next;
    });
  }, [flashTransitions]);

  const toggleRainbow = useCallback(() => {
    setRainbow((r) => {
      document.documentElement.classList.toggle("rainbow", !r);
      return !r;
    });
  }, []);

  useEffect(() => applyDom(theme), [theme]);

  /* follow OS preference only while the user hasn't chosen explicitly */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return; // explicit choice wins
      } catch {}
      applyDom(e.matches ? "dark" : "light");
      setThemeState(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* keyboard: [D] flips optic · typing "rainbow" arms the easter egg */
  useEffect(() => {
    let buf = "";
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable))
        return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key.toLowerCase() === "d") toggle();

      buf = (buf + e.key.toLowerCase()).slice(-7);
      if (buf.endsWith("rainbow")) {
        toggleRainbow();
        buf = "";
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle, toggleRainbow]);

  const value = useMemo(
    () => ({ theme, toggle, setTheme, rainbow, toggleRainbow }),
    [theme, toggle, setTheme, rainbow, toggleRainbow]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTheme(): ThemeCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}

/** resolved palette for canvas renderers — re-read per optic switch */
export function readPalette() {
  const cs = getComputedStyle(document.documentElement);
  return {
    paper: cs.getPropertyValue("--paper").trim() || "#f4f2ec",
    ink: cs.getPropertyValue("--ink").trim() || "#2a2723",
    acc: cs.getPropertyValue("--acc").trim() || "#dd5223",
  };
}
