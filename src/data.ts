export type Project = {
  id: string;
  index: string;
  title: string;
  sub: string;
  year: string;
  status: string;
  lang: string;
  stars?: number;
  desc: string;
  features: string[];
  stack: string[];
  flow?: string[];
  img?: string;
  fig?: string;
  schematic?: string[];
  repo?: string;
  live?: string;
  private?: boolean;
};

import { SITE_URL_WITH_SLASH } from "./constants/site";

export const GH = "https://github.com/KiarashAkbari";
/** canonical site URL — single source of truth lives in src/constants/site.ts */
export const SITE = SITE_URL_WITH_SLASH;

/* resume.pdf — verified contact channels */
export const CONTACT = {
  email: "Kiarash.Akbari.Contact@gmail.com",
  phone: "+98 922 233 0780",
  phoneHref: "+989222330780",
  location: "MASHHAD, IRAN",
  tz: "UTC+03:30",
};

const IMG = (n: string) =>
  `https://raw.githubusercontent.com/KiarashAkbari/portfolio-website-brutal/main/public/img/${n}.png`;

export const PROJECTS: Project[] = [
  {
    id: "vino",
    index: "01",
    title: "VINO_PLATFORM",
    sub: "SMART-HOME PRODUCT PLATFORM — PRODUCTION CLIENT BUILD",
    year: "2026",
    status: "IN_PRODUCTION",
    lang: "FULL-STACK",
    desc: "Production smart-home product platform, architected and delivered end-to-end as project owner. A multi-page catalog driven entirely by data — product logic, dynamic dropdowns and rendering all resolve from a single source of truth, not hardcoded pages.",
    features: [
      "Multi-page product catalog architected from zero",
      "Data-driven product logic — dynamic dropdowns + rendering",
      "Independent delivery: Git feature-branch / PR workflow",
      "Client revisions + invoicing under real timelines",
    ],
    stack: ["JAVASCRIPT", "REACT", "DATA-DRIVEN UI", "GIT FLOW", "CI"],
    schematic: [
      "┌───────────── VINO.CATALOG ─────────────┐",
      "│                                        │",
      "│  DATA.SRC ──► PRODUCT_LOGIC            │",
      "│      │            │                    │",
      "│      │            ├─► DROPDOWNS.DYN    │",
      "│      │            ├─► RENDER.ENGINE    │",
      "│      │            └─► MULTI-PAGE.ROUTER│",
      "│      ▼                                 │",
      "│  DELIVERY: BRANCH─►PR─►SHIP ─► INVOICE │",
      "│                                        │",
      "└──────── STATUS: LIVE_IN_PRODUCTION ────┘",
    ],
    fig: "CATALOG::CORE — DATA-DRIVEN PRODUCT LOGIC",
  },
  {
    id: "bim",
    index: "02",
    title: "BIM_INTELLECT_V2",
    sub: "HYBRID GRAPH+VECTOR RAG — BIM REGULATORY Q&A",
    year: "2025",
    status: "PRIVATE_REPO",
    lang: "PYTHON",
    desc: "Backend and RAG-correctness engineering on a hybrid graph/vector AI system answering BIM regulatory questions. Neo4j holds the building graph, ChromaDB holds the semantics — the pipeline grounds every citation before an answer is allowed to exist.",
    features: [
      "FastAPI endpoints + Neo4j / ChromaDB health checks",
      "Dynamic Cypher filtering over the building graph",
      "Fixed RAG citation-grounding bugs — no orphan claims",
      "Optimized IFC parsing / graph-extraction pipeline",
      "Dockerized services — private team repository",
    ],
    stack: ["PYTHON", "FASTAPI", "NEO4J / CYPHER", "CHROMADB", "RAG", "DOCKER"],
    flow: [
      "[ QUERY ]        regulatory question",
      "      ▼",
      "[ RETRIEVAL ]    ChromaDB vectors ⊕ Neo4j graph",
      "      ▼",
      "[ FILTER ]       dynamic Cypher scoping",
      "      ▼",
      "[ GROUNDING ]    citations verified ≠ hallucinated",
      "      ▼",
      "[ ANSWER ]       FastAPI → grounded response",
    ],
    fig: "GRAPH⊕VECTOR::RAG — CITATIONS GROUNDED",
    private: true,
  },
  {
    id: "nids",
    index: "03",
    title: "NIDS_FORENSIC_TOOL",
    sub: "ZERO-DAY DOS DETECTION VIA RECONSTRUCTION ERROR",
    year: "2025",
    status: "DEPLOYED_V5",
    lang: "PYTHON",
    desc: "A deep-learning Network Intrusion Detection System. Instead of signatures, an autoencoder trains exclusively on benign traffic — any flow that fails to reconstruct cleanly is mathematically hostile. Signature-free defense against zero-day DoS vectors.",
    features: [
      "Real-time TCP/UDP flow aggregation via Scapy",
      "Autoencoder compression core (TensorFlow / Keras)",
      "MSE reconstruction-error decision logic",
      "Log-scale attack vector forensics + CSV reports",
      "Streamlit cloud dashboard with live alerts",
    ],
    stack: ["PYTHON 3.11", "TENSORFLOW", "KERAS", "SCAPY", "STREAMLIT", "PANDAS"],
    flow: [
      "[ SOURCE_DATA ]  .pcap / .csv",
      "      │",
      "      ▼",
      "[ INGESTION ]    Scapy flow-agg + features",
      "      ▼",
      "[ PREPROCESS ]   MinMax norm 0.0 → 1.0",
      "      ▼",
      "[ INFERENCE ]    Autoencoder compression",
      "      ▼",
      "[ DECISION ]     MSE > threshold ⇒ ATTACK",
      "      ▼",
      "[ UI ]           Streamlit dash + alerts",
    ],
    img: IMG("nids"),
    fig: "AUTOENCODER::CORE — ANOMALY FLAGGED AT 3.2σ",
    repo: `${GH}/NIDS-Forensic-Tool`,
  },
  {
    id: "transit",
    index: "04",
    title: "URBAN_TRANSIT_MESH",
    sub: "OFFLINE-FIRST CITY MAP PIPELINE — WARTIME BUILD",
    year: "2025",
    status: "ACTIVE",
    lang: "PYTHON",
    desc: "Built under wartime connectivity constraints. Scrapes, compiles and packages city + transit map data into self-contained offline snapshots, then broadcasts them over Telegram — maps that keep working when the network doesn't.",
    features: [
      "Base-map compiler from raw scraped sources",
      "Offline snapshot generator — zero CDN dependency",
      "Probe + fallback fetchers for degraded networks",
      "Scheduled Telegram broadcast distribution (CI)",
      "Portable builds for disconnected clients",
    ],
    stack: ["PYTHON", "HTTP SCRAPING", "FOLIUM", "TELEGRAM BOT API", "GITHUB ACTIONS"],
    img: IMG("transit"),
    fig: "CITY::MESH — OFFLINE SNAPSHOT / NIGHT RENDER",
    repo: `${GH}/urban-transit-mesh`,
  },
  {
    id: "clone1",
    index: "05",
    title: "CLONE-1",
    sub: "HIGH-PERFORMANCE WEB ARCHIVING + MIRRORING",
    year: "2025",
    status: "STABLE",
    lang: "PYTHON",
    desc: "A web archiving and mirroring engine with a PyQt6 control room. Playwright-driven stealth crawler extracts deep assets — scripts, styles, media — and reassembles them into fully self-contained local mirrors.",
    features: [
      "Stealth mode: fingerprint rotation + human pacing",
      "Deep asset extraction: JS / CSS / media / fonts",
      "Recursive mirroring with depth + size budgets",
      "PyQt6 GUI: job queue, live logs, profiles",
      "Resumable sessions, SQLite-backed state",
    ],
    stack: ["PYTHON", "PLAYWRIGHT", "PYQT6", "SQLITE", "ASYNC IO"],
    img: IMG("clone1"),
    fig: "MIRROR::CASCADE — RECURSIVE ASSET EXTRACTION",
    repo: `${GH}/CLONE-1`,
  },
  {
    id: "notetaker",
    index: "06",
    title: "NOTE-TAKER",
    sub: "VANILLA JS OPS CONSOLE — ZERO DEPENDENCIES",
    year: "2024",
    status: "SHIPPED",
    lang: "JAVASCRIPT",
    desc: "A personal ops console for notes, tasks and progress tracking in a TE-inspired dark phosphor UI. No framework, no build step, no backend — every byte of state lives in localStorage.",
    features: [
      "Pure HTML / CSS / ES6+ — zero dependencies",
      "localStorage-backed persistence layer",
      "Task progress + organization workflows",
      "Keyboard-first, TE-inspired dark interface",
    ],
    stack: ["HTML", "CSS", "JAVASCRIPT", "LOCALSTORAGE"],
    img: IMG("notes"),
    fig: "PHOSPHOR::UI — PERSISTENT STATE, NO BACKEND",
    repo: `${GH}/NOTE-TAKER`,
  },
  {
    id: "portfolio",
    index: "07",
    title: "KIA.SYS — THIS SITE",
    sub: "BRUTALIST DOSSIER W/ ASCII PHYSICS RENDERERS",
    year: "2026",
    status: "YOU_ARE_HERE",
    lang: "TYPESCRIPT",
    desc: "This document. An experiment in brutalist engineering aesthetics: a live ASCII point-cloud core with 2D repulsion physics, a ripple-field wave simulator, dot-matrix decoded imagery, dual-optic theming and blueprint chrome — experimental but still readable.",
    features: [
      "Custom canvas 3D → ASCII renderer w/ mouse physics",
      "2D ripple-field wave simulation (homage: aino.agency)",
      "Dot-matrix image decoding effects",
      "Dual-optic theme engine — DAY / NIGHT",
      "Blueprint UI system + engineering chrome",
    ],
    stack: ["REACT", "TYPESCRIPT", "TAILWIND", "CANVAS"],
    repo: `${GH}/portfolio-website-brutal`,
    live: SITE,
  },
];

export const TICKER_ITEMS = [
  "AI SOFTWARE ENGINEERING",
  "RAG PIPELINES",
  "ANOMALY DETECTION",
  "AUTOENCODERS",
  "FASTAPI / REST",
  "NEO4J + CHROMADB",
  "STEALTH SCRAPING",
  "OFFLINE PIPELINES",
  "DOCKER / CI-CD",
  "PYTHON / TYPESCRIPT",
  "SIGNAL > NOISE",
];

/* CAPABILITY_MATRIX.CSV — titles only. No bars, no self-scored numbers.
   Grouped exactly as resume.pdf core skills. */
export const CAPABILITIES = [
  {
    group: "LANGUAGES://",
    rows: ["PYTHON", "JAVASCRIPT", "HTML", "CSS"],
  },
  {
    group: "BACKEND_SYSTEMS://",
    rows: ["FASTAPI", "NEO4J / CYPHER", "CHROMADB", "REST APIS", "DOCKER", "GIT / GITHUB ACTIONS (CI-CD)"],
  },
  {
    group: "AI_ML://",
    rows: ["RAG PIPELINES — RETRIEVAL / ORCHESTRATION / GROUNDED CITATIONS", "NEURAL NETWORKS", "AUTOENCODERS", "SCIKIT-LEARN", "TENSORFLOW / KERAS", "NUMPY"],
  },
  {
    group: "AUTOMATION_DATA://",
    rows: ["PLAYWRIGHT", "BEAUTIFULSOUP", "FOLIUM", "STREAMLIT"],
  },
];

/* resume.pdf — professional experience */
export type Experience = {
  id: string;
  index: string;
  role: string;
  org: string;
  orgNote: string;
  where: string;
  period: string;
  current?: boolean;
  points: string[];
  tags: string[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: "vino",
    index: "E1",
    role: "FULL-STACK DEVELOPER & PROJECT OWNER",
    org: "VINO — SMART HOME PRODUCT PLATFORM",
    orgNote: "CLIENT PRODUCT / PRODUCTION",
    where: "REMOTE",
    period: "06.2026 — PRESENT",
    current: true,
    points: [
      "Architected a multi-page product catalog end-to-end with data-driven product logic (dynamic dropdowns, data-driven rendering).",
      "Owned delivery independently: Git feature-branch/PR workflow, client revisions, and invoicing under real timelines.",
    ],
    tags: ["PRODUCT ARCHITECTURE", "DATA-DRIVEN UI", "GIT FLOW", "CLIENT DELIVERY"],
  },
  {
    id: "telus",
    index: "E2",
    role: "SOFTWARE ENGINEERING ASSOCIATE",
    org: "TELUS — CANADA",
    orgNote: "ENTERPRISE SOFTWARE / DISTRIBUTED TEAMS",
    where: "REMOTE",
    period: "01.2025 — 12.2025",
    points: [
      "Collaborated with distributed engineering teams on enterprise software tasks, applying Git-based version control and backend best practices in production.",
    ],
    tags: ["ENTERPRISE BACKEND", "DISTRIBUTED TEAMS", "VERSION CONTROL"],
  },
  {
    id: "dotin",
    index: "E3",
    role: "AI & DATA SCIENCE RESEARCHER",
    org: "DOTIN FINANCIAL TECHNOLOGIES LAB — FERDOWSI UNIVERSITY OF MASHHAD",
    orgNote: "FINTECH RESEARCH / FANAP GROUP — CORE-BANKING PROVIDER",
    where: "MASHHAD",
    period: "2025 — PRESENT",
    current: true,
    points: [
      "Engage with data-driven, AI-oriented fintech research at the lab established through Dotin (FANAP Group), a core-banking software provider for major Iranian banks and insurers.",
    ],
    tags: ["APPLIED ML RESEARCH", "FINTECH DATA", "AI R&D"],
  },
];

/* resume.pdf — education & certifications */
export const EDUCATION = {
  degree: "B.SC. COMPUTER ENGINEERING",
  school: "EQBAL UNIVERSITY",
  certs: [
    ["PYTHON & MACHINE LEARNING", "JADI MIRMIRANI"],
    ["100 DAYS OF CODE", "ANGELA YU"],
    ["MODERN JAVASCRIPT", "BRAD TRAVERSY"],
    ["CYBERSECURITY", "CYBRARY"],
  ] as const,
};

export const TIMELINE = [
  ["2024.01", "GIT_INIT", "First public commit — the lab goes online."],
  ["2024", "NOTE_TAKER", "Shipped zero-dependency ops console. Vanilla by choice."],
  ["2025", "TELUS_REMOTE", "Software Engineering Associate — enterprise backend, distributed teams."],
  ["2025", "NIDS_V5", "Autoencoder NIDS deployed — zero-day DoS via MSE anomaly."],
  ["2025", "DOTIN_LAB", "AI & data science researcher — fintech lab, Ferdowsi University."],
  ["2025", "BIM_V2 + CLONE-1", "Hybrid RAG for BIM Q&A; stealth archiving engine."],
  ["2026", "VINO", "Production smart-home platform — architect + project owner."],
  ["2026.NOW", "KIA.SYS", "This dossier. Open to AI / engineering roles."],
];

export const NAV_LINKS = [
  ["01", "INDEX", "#hero"],
  ["02", "WORK", "#work"],
  ["03", "LOG", "#log"],
  ["04", "PROFILE", "#profile"],
  ["05", "SIGNAL", "#signal"],
] as const;
