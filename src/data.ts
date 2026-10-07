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

/* resume contact channels */
export const CONTACT = {
  email: "Kiarash.Akbari.Contact@gmail.com",
  phone: "+98 922 233 0780",
  phoneHref: "+989222330780",
  location: "Mashhad, Iran",
  tz: "UTC+03:30",
};

const IMG = (n: string) =>
  `https://raw.githubusercontent.com/KiarashAkbari/portfolio-website-brutal/main/public/img/${n}.png`;

export const PROJECTS: Project[] = [
  {
    id: "vino",
    index: "01",
    title: "Vino Platform",
    sub: "Smart Home Product Platform & Dynamic Catalog Architecture",
    year: "2026",
    status: "In Production",
    lang: "Full-Stack (React / JS)",
    desc: "Architected and delivered a production smart-home catalog and configuration platform end-to-end as project owner. Built a dynamic, data-driven architecture where product specifications, interdependent options, and multi-page catalog routing resolve from a unified single source of truth rather than hardcoded pages.",
    features: [
      "End-to-end multi-page product catalog architecture built from the ground up",
      "Dynamic data-driven configuration engine powering cascading filters and views",
      "Professional Git workflow with feature branches, code reviews, and CI integration",
      "Direct client collaboration, iterative feature releases, and timeline delivery",
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
    fig: "System Architecture: Data-Driven Product Catalog Engine",
  },
  {
    id: "bim",
    index: "02",
    title: "BIM Intellect",
    sub: "Hybrid Graph + Vector RAG for Building Regulatory Q&A",
    year: "2025",
    status: "Private Client Repo",
    lang: "Python / AI",
    desc: "Engineered backend architecture and RAG verification algorithms for a hybrid AI system answering complex building information modeling (BIM) regulatory compliance queries. Leveraged Neo4j for topological graph modeling and ChromaDB for semantic retrieval, enforcing strict citation grounding before responses are generated.",
    features: [
      "High-performance FastAPI endpoints with automated Neo4j & ChromaDB health checks",
      "Dynamic Cypher query generation for context-aware graph traversals",
      "Citation-grounding algorithms to eliminate hallucinations and orphan claims",
      "Optimized IFC file parsing and automated building graph extraction",
      "Containerized microservice architecture deployed with Docker",
    ],
    stack: ["Python", "FastAPI", "Neo4j / Cypher", "ChromaDB", "RAG", "Docker"],
    flow: [
      "[ User Query ]          Regulatory compliance question",
      "        ▼",
      "[ Hybrid Retrieval ]    ChromaDB vector search ⊕ Neo4j topological graph",
      "        ▼",
      "[ Context Filtering ]   Dynamic Cypher scoping over building hierarchy",
      "        ▼",
      "[ Grounding Engine ]    Verify claims against verified building codes",
      "        ▼",
      "[ Verified Answer ]     FastAPI response with exact clause citations",
    ],
    fig: "Architecture: Hybrid Graph + Vector RAG Pipeline with Citation Grounding",
    private: true,
  },
  {
    id: "nids",
    index: "03",
    title: "NIDS Forensic Tool",
    sub: "Deep Learning Zero-Day Intrusion Detection System",
    year: "2025",
    status: "Deployed v5",
    lang: "Python / ML",
    desc: "Developed an unsupervised deep-learning network intrusion detection system capable of identifying zero-day DoS attacks. By training an autoencoder exclusively on normal network traffic, malicious anomalies are detected through mathematical reconstruction error thresholds without relying on static attack signatures.",
    features: [
      "Real-time network packet capture and TCP/UDP flow aggregation via Scapy",
      "Deep autoencoder compression model engineered with TensorFlow and Keras",
      "Mean Squared Error (MSE) reconstruction loss scoring for real-time anomaly detection",
      "Forensic analysis dashboard with log-scale vector reporting and CSV exports",
      "Interactive Streamlit web console featuring live threat alerts",
    ],
    stack: ["Python 3.11", "TensorFlow", "Keras", "Scapy", "Streamlit", "Pandas"],
    flow: [
      "[ Packet Capture ]   Raw .pcap / network interface stream",
      "        │",
      "        ▼",
      "[ Feature Pipeline ] Scapy flow aggregation & feature extraction",
      "        ▼",
      "[ Normalization ]    MinMax feature scaling (0.0 → 1.0)",
      "        ▼",
      "[ Neural Inference ] Autoencoder latent space compression",
      "        ▼",
      "[ Decision Logic ]   Reconstruction MSE > Threshold ⇒ Anomaly Flagged",
      "        ▼",
      "[ Dashboard ]        Real-time Streamlit forensic alerts & reports",
    ],
    img: IMG("nids"),
    fig: "Autoencoder Core: Anomaly Detection via Reconstruction Error",
    repo: `${GH}/NIDS-Forensic-Tool`,
  },
  {
    id: "transit",
    index: "04",
    title: "Urban Transit Mesh",
    sub: "Resilient Offline-First Transit & Mapping Engine",
    year: "2025",
    status: "Active",
    lang: "Python / GIS",
    desc: "Architected an offline-first geospatial data pipeline designed for intermittent and disrupted network conditions. Compiles raw city and transit data into fully self-contained offline snapshot bundles and distributes them over automated Telegram channels.",
    features: [
      "Automated base-map compiler extracting and optimizing raw transit data",
      "Standalone offline package generator with zero external CDN dependencies",
      "Resilient fallback fetchers with automated retry strategies for low-bandwidth connections",
      "Scheduled Telegram broadcast distribution powered by GitHub Actions CI",
      "Ultra-lightweight portable client viewable on any mobile device",
    ],
    stack: ["Python", "Geospatial Data", "Folium", "Telegram Bot API", "GitHub Actions"],
    img: IMG("transit"),
    fig: "City Mesh: Offline Map Bundle & Snapshot Render",
    repo: `${GH}/urban-transit-mesh`,
  },
  {
    id: "clone1",
    index: "05",
    title: "Clone-1 Web Archiver",
    sub: "Stealth Web Archiving & Dynamic Asset Mirroring Engine",
    year: "2025",
    status: "Stable",
    lang: "Python / Async",
    desc: "Engineered an advanced web archiving and mirroring application equipped with a desktop PyQt6 control console. Powered by Playwright with stealth browser fingerprinting, it extracts deep dynamic web assets and reconstructs completely self-contained offline mirrors.",
    features: [
      "Stealth browser automation: fingerprint rotation and human-like request pacing",
      "Recursive asset harvester extracting dynamic JS, CSS, embedded fonts, and media",
      "Configurable crawling depth, size budgets, and domain boundary controls",
      "Desktop GUI built with PyQt6: live job queues, real-time logging, and crawl profiles",
      "Resumable session management backed by persistent SQLite storage",
    ],
    stack: ["Python", "Playwright", "PyQt6", "SQLite", "AsyncIO"],
    img: IMG("clone1"),
    fig: "Mirror Engine: Recursive Asset Extraction & Assembly",
    repo: `${GH}/CLONE-1`,
  },
  {
    id: "notetaker",
    index: "06",
    title: "Note-Taker",
    sub: "Zero-Dependency Local Workspace & Notes Console",
    year: "2024",
    status: "Shipped",
    lang: "JavaScript",
    desc: "Crafted an ultra-fast, zero-dependency personal task and notes management console inspired by minimalist hardware synthesizer interfaces. Built purely with native web standards, requiring no build toolchain or external dependencies, with instant local persistence.",
    features: [
      "Built purely with native HTML5, CSS3, and modern ES6+ JavaScript",
      "Zero external dependencies or build pipeline required",
      "Instant client-side persistence powered by browser localStorage",
      "Keyboard-first workflow optimized for quick capture and distraction-free editing",
    ],
    stack: ["JavaScript (ES6+)", "HTML5", "CSS3", "localStorage API"],
    img: IMG("notes"),
    fig: "Minimalist Console: Persistent Client State with Zero External Dependencies",
    repo: `${GH}/NOTE-TAKER`,
  },
  {
    id: "portfolio",
    index: "07",
    title: "Interactive Portfolio",
    sub: "Creative Engineering & Editorial Web Dossier",
    year: "2026",
    status: "Current Site",
    lang: "TypeScript / React",
    desc: "A showcase of creative frontend engineering and editorial design: custom 3D ASCII point cloud with real-time repulsion physics, a 2D height-field wave simulation, smooth Lenis scrolling, and dual-optic day/night theming.",
    features: [
      "Custom 3D point-cloud ASCII canvas with spring physics and click shockwaves",
      "Interactive 2D height-field wave simulator with pointer disturbance",
      "Dual-optic color system with smooth theme transitions (Day & Night modes)",
      "Fully responsive layout with accessible keyboard navigation and reduced-motion support",
    ],
    stack: ["React 19", "TypeScript", "Tailwind CSS", "Canvas API", "Vite"],
    repo: `${GH}/PERSONAL-WEBSITE`,
    live: SITE,
  },
];

export const TICKER_ITEMS = [
  "AI Software Engineering",
  "RAG Architectures",
  "Graph & Vector Search",
  "FastAPI & Microservices",
  "Deep Learning & Anomaly Detection",
  "Neo4j & ChromaDB",
  "Resilient Data Pipelines",
  "Docker & CI/CD",
  "TypeScript & React",
  "Production Backends",
];

/* Structured skills categorized for readability and quick scanning */
export const CAPABILITIES = [
  {
    group: "AI & Machine Learning",
    rows: [
      "RAG Pipelines (Retrieval, Graph Scoping & Grounded Citations)",
      "Neural Networks & Deep Learning",
      "Autoencoders & Anomaly Detection",
      "TensorFlow & Keras",
      "Scikit-learn & NumPy",
    ],
  },
  {
    group: "Backend & Systems",
    rows: [
      "FastAPI & RESTful APIs",
      "Neo4j & Cypher Graph Database",
      "ChromaDB Vector Embeddings",
      "Docker Containerization",
      "Git Flow & GitHub Actions CI/CD",
      "PostgreSQL & SQLite",
    ],
  },
  {
    group: "Core Languages",
    rows: [
      "Python (AsyncIO, Data Science)",
      "TypeScript & JavaScript (ES6+)",
      "SQL & Cypher",
      "HTML5 & Modern CSS / Tailwind",
    ],
  },
  {
    group: "Automation & Data Tools",
    rows: [
      "Playwright & Stealth Browser Automation",
      "BeautifulSoup & Data Extraction",
      "Streamlit Dashboards",
      "Folium Geospatial Mapping",
      "Scapy Network Packet Analysis",
    ],
  },
];

/* Professional Experience */
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
    index: "01",
    role: "Full-Stack Developer & Project Lead",
    org: "Vino — Smart Home Platform",
    orgNote: "Client Product · Production Release",
    where: "Remote",
    period: "06.2026 — Present",
    current: true,
    points: [
      "Architected a comprehensive multi-page product catalog end-to-end with dynamic data-driven product logic, cascading options, and automated UI rendering.",
      "Led technical delivery independently: managed client revisions, implemented Git feature-branch workflows, and shipped production milestones on schedule.",
    ],
    tags: ["Product Architecture", "Data-Driven UI", "Git Flow", "Client Delivery"],
  },
  {
    id: "telus",
    index: "02",
    role: "Software Engineering Associate",
    org: "Telus",
    orgNote: "Enterprise Software & Distributed Engineering",
    where: "Remote",
    period: "01.2025 — 12.2025",
    points: [
      "Collaborated with cross-functional distributed engineering teams on enterprise backend systems, adhering to strict version control workflows and production standards.",
      "Contributed to backend service maintenance, code reviews, and reliability improvements across production environments.",
    ],
    tags: ["Enterprise Backend", "Distributed Teams", "Version Control", "Production CI/CD"],
  },
  {
    id: "dotin",
    index: "03",
    role: "AI & Data Science Researcher",
    org: "Dotin Financial Technologies Lab",
    orgNote: "Ferdowsi University of Mashhad · FANAP Banking Software Group",
    where: "Mashhad, Iran",
    period: "2025 — Present",
    current: true,
    points: [
      "Conduct applied AI and data science research focused on financial technologies within the academic lab established by Dotin (FANAP Group), a premier core-banking provider.",
      "Explore machine learning models and predictive analytics applied to high-throughput financial and transactional datasets.",
    ],
    tags: ["Applied ML Research", "Fintech AI", "Data Science", "R&D"],
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

export const TIMELINE = [
  ["2024", "Open-Source Inception", "Published initial open-source software and developer utilities."],
  ["2024", "Note-Taker Shipped", "Shipped zero-dependency, local-first notes console in vanilla JavaScript."],
  ["2025", "Telus Remote", "Software Engineering Associate — enterprise backend in distributed remote teams."],
  ["2025", "NIDS Deep Learning", "Engineered unsupervised autoencoder for zero-day DoS anomaly detection."],
  ["2025", "Dotin AI Research Lab", "Joined fintech AI research lab at Ferdowsi University (FANAP Group)."],
  ["2025", "BIM Intellect & Clone-1", "Engineered hybrid graph/vector RAG and dynamic web archiving engine."],
  ["2026", "Vino Platform", "Architected and delivered production smart-home platform end-to-end."],
  ["Present", "Open to Opportunities", "Available for full-time AI engineering, backend systems, and high-impact teams."],
];

export const NAV_LINKS = [
  ["01", "Overview", "#hero"],
  ["02", "Projects", "#work"],
  ["03", "Experience", "#log"],
  ["04", "About & Skills", "#profile"],
  ["05", "Contact", "#signal"],
] as const;

