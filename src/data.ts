export type Project = {
  id: string;
  index: string;
  title: string;
  sub: string;
  year: string;
  status: string;
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

/* resume contact channels */
export const CONTACT = {
  email: "Kiarash.Akbari.Contact@gmail.com",
  phone: "+98 922 233 0780",
  phoneHref: "+989222330780",
  location: "Mashhad, Iran",
};

const IMG = (n: string) =>
  `https://raw.githubusercontent.com/KiarashAkbari/portfolio-website-brutal/main/public/img/${n}.png`;

export const PROJECTS: Project[] = [
  {
    id: "vino",
    index: "01",
    title: "Vino Platform",
    sub: "Smart-home catalog and product configurator",
    year: "2026",
    status: "In Production",
    desc: "Led delivery of a production catalog for smart-home products. A shared product model drives product pages, filters, and configuration options, replacing separate hard-coded pages.",
    features: [
      "One product data source powers product pages and configuration options",
      "Built a multi-page React catalog with filters that update as selections change",
      "Worked directly with the client from requirements through production releases",
    ],
    stack: ["React", "JavaScript", "Data-Driven UI", "Git Flow", "CI/CD"],
    schematic: [
      "┌────────────── VINO.CATALOG ENGINE ──────────────┐",
      "│                                                 │",
      "│  DATA SOURCE ──► CONFIGURATION LOGIC            │",
      "│       │                  │                      │",
      "│       │                  ├─► DYNAMIC DROPDOWNS  │",
      "│       │                  ├─► RENDER ENGINE      │",
      "│       │                  └─► MULTI-PAGE ROUTING │",
      "│       ▼                                         │",
      "│  DELIVERY: FEATURE BRANCH ──► PR ──► SHIP       │",
      "│                                                 │",
      "└────────── STATUS: LIVE IN PRODUCTION ───────────┘",
    ],
    fig: "How the smart-home catalog works",
  },
  {
    id: "bim",
    index: "02",
    title: "BIM Intellect",
    sub: "AI assistant for building-code questions",
    year: "2025",
    status: "Private Client Project",
    desc: "Built the backend for an AI assistant that answers building-code questions. It searches regulations alongside building data, then checks each response against source clauses so answers include citations.",
    features: [
      "Combines meaning-based search with a graph of building relationships",
      "Checks answers against source clauses and returns citations",
      "FastAPI service with IFC parsing, database health checks, and Docker deployment",
    ],
    stack: ["Python", "FastAPI", "Neo4j / Cypher", "ChromaDB", "RAG", "Docker"],
    flow: [
      "[ Question ]   Ask about a building or regulation",
      "      ▼",
      "[ Search ]     Find relevant clauses and building data",
      "      ▼",
      "[ Check ]      Compare the answer with source regulations",
      "      ▼",
      "[ Answer ]     Return a response with clause citations",
    ],
    fig: "From question to cited building-code answer",
    private: true,
  },
  {
    id: "nids",
    index: "03",
    title: "NIDS Forensic Tool",
    sub: "Network anomaly detection and investigation",
    year: "2025",
    status: "Deployed v5",
    desc: "Built a network monitoring tool that learns the patterns of normal traffic and flags unusual activity, including attacks it was not trained on. A live dashboard helps analysts review alerts and the traffic behind them.",
    features: [
      "Captures packets and groups TCP/UDP traffic with Scapy",
      "An autoencoder scores unusual traffic without relying on fixed attack signatures",
      "Streamlit dashboard for live alerts and downloadable reports",
    ],
    stack: ["Python 3.11", "TensorFlow", "Keras", "Scapy", "Streamlit", "Pandas"],
    flow: [
      "[ Traffic ]    Read packets from a capture or network interface",
      "      ▼",
      "[ Group ]      Organize packets into TCP/UDP flows",
      "      ▼",
      "[ Score ]      Compare each flow with patterns in normal traffic",
      "      ▼",
      "[ Review ]     Show unusual flows in the analyst dashboard",
    ],
    img: IMG("nids"),
    fig: "From network traffic to anomaly alert",
    repo: `${GH}/NIDS-Forensic-Tool`,
  },
  {
    id: "transit",
    index: "04",
    title: "Urban Transit Mesh",
    sub: "Offline-ready city and transit maps",
    year: "2025",
    status: "Active",
    desc: "Built a mapping pipeline for unreliable or disrupted internet. It packages city and transit data into self-contained offline maps and distributes scheduled updates through Telegram.",
    features: [
      "Compiles and optimizes city and transit data",
      "Creates map bundles that work without an internet connection",
      "Retries unreliable sources and sends scheduled Telegram updates",
    ],
    stack: ["Python", "Geospatial Data", "Folium", "Telegram Bot API", "GitHub Actions"],
    img: IMG("transit"),
    fig: "Offline map preview",
    repo: `${GH}/urban-transit-mesh`,
  },
  {
    id: "clone1",
    index: "05",
    title: "Clone-1 Web Archiver",
    sub: "Save dynamic websites as offline archives",
    year: "2025",
    status: "Stable",
    desc: "Built a desktop web-archiving tool that captures dynamic pages and their assets with Playwright, then assembles offline copies. A PyQt6 console manages crawl jobs, while SQLite stores sessions so work can resume.",
    features: [
      "Captures pages, scripts, styles, fonts, and media",
      "Configurable crawl depth, size limits, and domain boundaries",
      "Desktop job queue, live logs, and resumable sessions",
    ],
    stack: ["Python", "Playwright", "PyQt6", "SQLite", "AsyncIO"],
    img: IMG("clone1"),
    fig: "A saved website and its assets",
    repo: `${GH}/CLONE-1`,
  },
  {
    id: "notetaker",
    index: "06",
    title: "Note-Taker",
    sub: "Local notes and tasks, no setup required",
    year: "2024",
    status: "Shipped",
    desc: "Built a notes and task manager with plain HTML, CSS, and JavaScript. Data stays in the browser, so it runs without a build step or external packages.",
    features: [
      "Works in a browser with no install or build step",
      "Stores notes locally between visits",
      "Keyboard-first editing for quick capture",
    ],
    stack: ["JavaScript (ES6+)", "HTML5", "CSS3", "localStorage API"],
    img: IMG("notes"),
    fig: "Notes saved in the browser",
    repo: `${GH}/NOTE-TAKER`,
  },
  {
    id: "portfolio",
    index: "07",
    title: "Interactive Portfolio",
    sub: "Interactive ASCII visuals and a responsive interface",
    year: "2026",
    status: "Current Site",
    desc: "This portfolio pairs two interactive ASCII studies—a pointer-reactive 3D field and a 2D wave—with a responsive project archive and Day/Night themes.",
    features: [
      "3D field that tilts and responds to pointer movement and clicks",
      "2D wave simulation that responds to taps and dragging",
      "Responsive layout with keyboard navigation and reduced-motion support",
    ],
    stack: ["React 19", "TypeScript", "Tailwind CSS", "Canvas API", "Vite"],
    repo: `${GH}/PERSONAL-WEBSITE`,
    live: SITE,
  },
];

/* Structured skills categorized for readability and quick scanning */
export const CAPABILITIES = [
  {
    group: "Applied AI",
    summary: "AI search with citations · Graph and vector databases · Deep learning · Anomaly detection",
  },
  {
    group: "Backend & Data",
    summary: "Python · FastAPI · Neo4j · ChromaDB · PostgreSQL · SQLite · Docker",
  },
  {
    group: "Languages & Interfaces",
    summary: "TypeScript · JavaScript · React · HTML · CSS · Tailwind",
  },
  {
    group: "Automation & Mapping",
    summary: "Playwright · BeautifulSoup · Scapy · Folium · Streamlit",
  },
];

/* Professional Experience */
export type Experience = {
  id: string;
  role: string;
  org: string;
  orgNote: string;
  where: string;
  period: string;
  current?: boolean;
  points: string[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: "vino",
    role: "Full-Stack Developer & Project Lead",
    org: "Vino — Smart Home Platform",
    orgNote: "Client product · In production",
    where: "Remote",
    period: "06.2026 — Present",
    current: true,
    points: [
      "Built a product catalog with shared data driving product pages, filters, and configuration options.",
      "Led client feedback, feature-branch development, code reviews, and production releases.",
    ],
  },
  {
    id: "telus",
    role: "Software Engineering Associate",
    org: "Telus",
    orgNote: "Enterprise software · Distributed team",
    where: "Remote",
    period: "01.2025 — 12.2025",
    points: [
      "Worked with distributed teams on enterprise backend services and production code reviews.",
      "Supported service maintenance and reliability improvements.",
    ],
  },
  {
    id: "dotin",
    role: "AI & Data Science Researcher",
    org: "Dotin Financial Technologies Lab",
    orgNote: "Ferdowsi University of Mashhad · FANAP Group",
    where: "Mashhad, Iran",
    period: "2025 — Present",
    current: true,
    points: [
      "Research applied machine learning for financial technology with Dotin's lab at Ferdowsi University.",
      "Explore predictive models for financial and transaction data.",
    ],
  },
];

/* Education & certifications */
export const EDUCATION = {
  degree: "B.Sc. in Computer Engineering",
  school: "Eqbal University",
  certs: [
    ["Python & Machine Learning", "Jadi Mirmirani"],
    ["100 Days of Code (Python)", "Angela Yu"],
    ["Modern JavaScript From Scratch", "Brad Traversy"],
    ["Cybersecurity & Network Defense", "Cybrary"],
  ] as const,
};

export const NAV_LINKS = [
  ["01", "Projects", "#work"],
  ["02", "Experience", "#log"],
  ["03", "About & Skills", "#profile"],
  ["04", "Contact", "#signal"],
] as const;

