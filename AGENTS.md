# AGENTS.md — PERSONAL-WEBSITE (KIA.SYS v5.2)

> Baseline for coding agents working in this repo. Generated via `/init`. Read this file before any edit. Append-only for Design Language section — do not overwrite existing content.

## 1. Project Overview

- **What:** Personal dossier / portfolio for **Kiarash Akbari — AI Software Engineer** (backend & AI-integrated systems). Brutalist "personnel dossier" aesthetic: blueprint grids, scanlines, ASCII physics, dot-matrix decodes.
- **Domain:** `kiarash-akbari.com` (CNAME). Data canon lives in `src/data.ts` + `resume.pdf`.
- **Route model:** Single-page app with hash anchors: `#hero` → `#work` → `#log` → `#profile` → `#signal`. No router.
- **Content rule:** Copy is verified against `resume.pdf` and live GitHub builds. Do not invent skills, dates, or org names.

## 2. Stack & Tooling

- **Build:** Vite 7 + `@vitejs/plugin-react` 5.1 + `@tailwindcss/vite` 4.1 + `vite-plugin-singlefile` 2.3 (inlines build to single HTML).
- **Runtime:** React 19.2 + React-DOM 19.2, TypeScript 5.9 (`strict`), Tailwind 4.1, `lenis` 1.3 (smooth scroll), `lucide-react` 1.44, `clsx` 2.1 + `tailwind-merge` 3.4 (`src/utils/cn.ts`).
- **Path alias:** `@/*` → `src/*` (see `tsconfig.json` + `vite.config.ts` `resolve.alias`).
- **Scripts:** `dev` / `build` / `preview` only (no lint/test/CI yet). `type-check` will be added.
- **Constraints:** Do not add dependencies or build tools without asking. Keep `viteSingleFile()` behavior unless user requests split chunks.

## 3. Repository Layout

```
index.html          # head meta, anti-FOUC theme bootstrap, dark-extension guard
CNAME               # kiarash-akbari.com
public/             # static assets (robots.txt, sitemap.xml, favicon)
src/
  App.tsx           # page composition + FrameTicks + scroll lifecycle
  main.tsx          # React root
  index.css         # theme tokens + utilities + keyframes + textures
  data.ts           # GH/SITE/CONTACT/PROJECTS/CAPABILITIES/EXPERIENCE/EDUCATION/TIMELINE/NAV_LINKS
  theme/ThemeProvider.tsx  # light/dark + rainbow, localStorage kia-theme, [D] toggle
  lib/scroll.ts     # lenis wrapper: init/stop/start/scrollToId/scrollTop
  utils/cn.ts       # twMerge(clsx(...))
  components/
    Preloader.tsx   # boot sequence (term palette, scramble decode)
    Nav.tsx         # fixed header + progress + mobile overlay (term)
    Hero.tsx        # title + specs + AsciiField HUD
    Work.tsx        # accordion project records
    WaveBand.tsx + AsciiWave.tsx  # ripple-field interlude
    Experience.tsx  # service record log
    Profile.tsx     # statement + dossier + capability matrix + education
    Signal.tsx      # contact channels + footer
    Marquee.tsx     # ticker
    SectionHead.tsx + Reveal.tsx  # shared section chrome
    AsciiField.tsx / AsciiImage.tsx / AsciiWave.tsx  # canvas islands
    Cursor.tsx / ThemeToggle.tsx / icons.tsx / MorphText.tsx
vite.config.ts
tsconfig.json
```

## 4. Conventions

- **Imports:** Prefer `@/` alias (`@/components/...`). Keep `lucide-react` for icons; custom GH mark in `icons.tsx`.
- **Styling:** Tailwind via `@import "tailwindcss"` + semantic CSS vars. No new color literals — reuse vars. `cn()` for merges.
- **Types:** Keep `Project`, `Experience` types in `data.ts`. No `any`. Respect `strict` flags.
- **Accessibility:** Prefer semantic HTML (`section`, `h2/h3`, `address`, `dl`). Maintain keyboard paths for all interactive surfaces.
- **Motion:** Respect `prefers-reduced-motion` for canvas + scroll; keep `Reveal` IO pattern (threshold 0.1, rootMargin -6%).
- **No large rewrites:** Small, separate diffs. Do not delete files. Do not reshape layout/content/colors/fonts unless asked.
- **Verification:** After changes run `npm run build` and `npx tsc --noEmit`. Do not commit or push; report diff summary.

## 5. Build & Development

```bash
npm run dev      # vite dev
npm run build    # vite build (singlefile)
npm run preview  # preview dist
npx tsc --noEmit # type-check
```

Canonical is `https://kiarash-akbari.com` (CNAME). `src/data.ts` `SITE` must align with it. SEO head is in `index.html`; runtime `theme-color` sync is in `ThemeProvider.tsx`.

## 6. Design Language

### Palette — Dual Optic (semantic tokens in `src/index.css:16-44`)
- **Day:** `--paper #f4f2ec` (`244 242 236`), `--paper-dim #eae7df`, `--ink #2a2723` (`42 39 35`), `--ink-soft #3d3933`, `--acc #dd5223` (`221 82 35`, vermilion), `--line rgb(42 39 35 / .14)`, `--line-inv rgb(244 242 236 / .18)`, `--noise-opacity .045 multiply`.
- **Night (`html.dark`):** `--paper #22201c` (`34 32 28`), `--paper-dim #2b2924`, `--ink #e7e3d9` (`231 227 217`), `--ink-soft #cac5b8`, `--acc #ff8a4d` (`255 138 77`, tangerine), `--line rgb(231 227 217 / .18)`, `--line-inv rgb(34 32 28 / .16)`, `--noise screen .05`.
- **Firmware (` .term`):** `--paper #f1efe8`, `--ink #211f1b` (`33 31 27`), `--ink-soft #b9b4a6`, `--acc #ff8a4d` — stays dark in both optics (boot + nav overlay).
- **Usage:** `bg-paper / text-ink / border-line / bg-acc / text-paper/60` etc via `@theme inline` mapping (`--color-paper`, `--color-ink`, etc). Never hardcode hex in components; reference `var(--paper)` / `var(--acc)` or Tailwind `bg-paper` tokens. Palette for canvas read via `readPalette()`.

### Typography
- **Stacks:** All prose/labels = system Helvetica `--font-display` / `--font-mono` = `"Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif` (zero webfont). ASCII plotters only = `--font-ascii` = `ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace` (grid alignment).
- **Weights:** Only `400` + `700`. Clamp in CSS: `.font-black/.font-extrabold/.font-semibold → 700`, `.font-medium/.font-light/.font-thin → 400`. Labels with `tracking-[0.` auto-`700`; `.copy`/`copy-sm` stay `400`.
- **Scales:** Readability floor re-maps `text-[8px]–[13px]` up to `10.5–13.5px`; muted `text-ink/35–70` → `color-mix 55–80%`. Prose `.copy 14→15px / 1.85`, `.copy-sm 13→13.5 / 1.8` `text-wrap: pretty`. Labels `9–11px tracking .14–.30em`.
- **Display helpers:** `.cond -.03em` / `.xcond -.045em` / `.wide .04em` emulated condensed; `stroke-ink/paper/acc 1.5px (1px ≤768px)` outline type.

### Spacing, Radius, Shadows
- **Spacing:** Gutters `px-4 md:px-6`, section heads `py-5`, header `px-4–5 py-3`, card `p-4–6`, `gap-px bg-line` hairline seams, `gap-2–3` micro.
- **Grid/Blueprint:** `56px` dot grid (`blueprint` / `blueprint-inv`), `noise-layer z-90 .045 opacity`, `plus` 9px crosshair corners.
- **Dividers:** `border-line` / `border-line-inv` 1px hairlines; `divide-y divide-line` for row rules.
- **Radius/Shadows:** `0` — brutalist square corners, no shadow or elevation. Exception: fixed `Nav` `backdrop-blur-sm` + `bg-paper/90`.

### Animations & Motion
- **Tokens (`@theme inline`):** `marquee 24s linear`, `marquee-slow 44s`, `blink 1.1s steps(1)`, `spin-slow 14s`.
- **Keyframes:** `flicker 5s`, `scanline 7s`, `dash-flow`. Reveal: `.rv translateY(26px) → 0 opacity 0→1 0.9s cb(.22,1,.36,1)`, `.rv-clip inset(0 0 100% 0 → 0%) 1s`, delay via `--rvd`. Theme cross-fade: `html.theme-x` `0.5s cb(.4,0,.2,1)` on bg/border/color/fill/stroke. `rainbow` animates `--acc` `6s`.
- **Scroll:** Lenis `lerp .092`, `easeOutQuart` 1.6s. Canvas islands cap at ~30fps (AsciiField) / 25fps (AsciiWave), pause via `IntersectionObserver` when off-screen; `prefers-reduced-motion: reduce` collapses all durations to `0.01ms` and forces reveals `opacity 1 / none`.

### Component Patterns
- **Helpers:** `cn()` (`twMerge(clsx)`) for conditional Tailwind; `readPalette()` for canvas; `scrollToId`/`scrollTop` via Lenis with native fallback.
- **SectionHead** + **Reveal:** Every section opens with `SectionHead [index] TITLE note` wrapped in `Reveal`. Notes `10px / 1.7 / .07em / 60%`.
- **Cards/Rows:** `Chip` (`border-line` / `hot border-acc text-acc 9px .14em`), hover `bg-ink text-paper` or `bg-ink/[0.035]`, accordion `grid-rows-[0fr→1fr] 700ms cb(.22,1,.36,1)`.
- **Imagery:** `AsciiImage` decodes raster → `RAMP " .·:;=+*#%@` blocks, glitch `GLITCH "█▓▒░<>#*+="` burst `1100ms`, hover flips `opacity 0→100` to `pixelated` raw `<img>`; `AsciiField` core/ring/dust point cloud + repulsion + shockwave; `AsciiWave` height-field `0.982` damping.
- **Chrome:** Corner `plus` + `scanlines` / `scan-band` + `blueprint` textures; `Marquee` duplicated row `flex w-max` + `inverted bg-ink text-paper`; `ThemeToggle` `DAY | NIGHT [D]` segmented switch; `Cursor` `mix-blend-difference` box + `bg-acc` dot + coordinate label (fine-pointer only).
