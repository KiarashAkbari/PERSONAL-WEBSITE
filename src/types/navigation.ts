export type ChamberId = "cortex" | "specimens" | "synapse" | "memory" | "transmission";

export type ChamberMeta = {
  id: ChamberId;
  code: string;
  label: string;
  subtitle: string;
  shortcut: string;
};

export const CHAMBERS: readonly ChamberMeta[] = [
  {
    id: "cortex",
    code: "01",
    label: "Cortex",
    subtitle: "Neural Atrium & Connectome",
    shortcut: "1",
  },
  {
    id: "specimens",
    code: "02",
    label: "Specimens",
    subtitle: "07 Engineered Systems",
    shortcut: "2",
  },
  {
    id: "synapse",
    code: "03",
    label: "Synapse Lab",
    subtitle: "Wave & Vision Perception",
    shortcut: "3",
  },
  {
    id: "memory",
    code: "04",
    label: "Memory Trace",
    subtitle: "Experience & Skill Weights",
    shortcut: "4",
  },
  {
    id: "transmission",
    code: "05",
    label: "Transmission",
    subtitle: "Direct Uplink & Monograph",
    shortcut: "5",
  },
] as const;

export function isChamberId(value: string): value is ChamberId {
  return CHAMBERS.some((c) => c.id === value);
}
