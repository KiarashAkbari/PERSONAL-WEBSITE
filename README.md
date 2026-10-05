# Personal Website

Personal portfolio website of **Kiarash Akbari** — AI software engineering, machine learning, and network security projects.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-222?logo=github)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

## Tech stack

- Vite + TypeScript
- Static build, deployed to GitHub Pages via GitHub Actions
- Served from the default Pages URL: <https://kiarashakbari.github.io/PERSONAL-WEBSITE/>

> No custom domain is configured — there is no `CNAME` file, so do not add one. A `CNAME` may only contain a bare custom domain, so adding a placeholder here would break the deploy.

## Featured projects

- [NIDS-Forensic-Tool](https://github.com/KiarashAkbari/NIDS-Forensic-Tool) — deep learning network intrusion detection (autoencoder, zero-day DoS)
- [CLONE-1](https://github.com/KiarashAkbari/CLONE-1) — web archiving and mirroring tool (Python, Playwright, PyQt6)
- [NOTE-TAKER](https://github.com/KiarashAkbari/NOTE-TAKER) — offline-first notes and task app in vanilla JavaScript

## Run locally

```bash
git clone https://github.com/KiarashAkbari/PERSONAL-WEBSITE.git
cd PERSONAL-WEBSITE
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Deployment

Pushes to `main` trigger the GitHub Actions workflow in `.github/workflows`, which builds the site and publishes it to GitHub Pages.

## License

Released under the [MIT License](LICENSE).
