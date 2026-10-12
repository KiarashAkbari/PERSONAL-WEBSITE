import { useCallback, useEffect, useState } from "react";
import { ThemeProvider } from "@/theme/ThemeProvider";
import Chrome from "@/components/Chrome";
import CortexChamber from "@/chambers/CortexChamber";
import SpecimensChamber from "@/chambers/SpecimensChamber";
import SynapseChamber from "@/chambers/SynapseChamber";
import MemoryChamber from "@/chambers/MemoryChamber";
import TransmissionChamber from "@/chambers/TransmissionChamber";
import { CHAMBERS, isChamberId, type ChamberId } from "@/types/navigation";
import { PROJECTS } from "@/data";
import { initScroll, destroyScroll, scrollTop } from "@/lib/scroll";

function resolveHashChamber(hash: string): ChamberId {
  const clean = hash.replace(/^#/, "").trim().toLowerCase();
  if (isChamberId(clean)) return clean;
  /* Legacy anchor compatibility */
  if (clean === "work") return "specimens";
  if (clean === "lab") return "synapse";
  if (clean === "log" || clean === "profile") return "memory";
  if (clean === "signal") return "transmission";
  return "cortex";
}

export default function App() {
  const [activeChamber, setActiveChamber] = useState<ChamberId>(() =>
    typeof window !== "undefined" ? resolveHashChamber(window.location.hash) : "cortex"
  );
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    PROJECTS[1]?.id ?? PROJECTS[0].id
  );
  const [selectedExpId, setSelectedExpId] = useState<string | undefined>(undefined);
  const [synapticPulseCount, setSynapticPulseCount] = useState<number>(14);

  useEffect(() => {
    initScroll();
    return () => destroyScroll();
  }, []);

  const recordPulse = useCallback(() => {
    setSynapticPulseCount((c) => c + 1);
  }, []);

  const selectChamber = useCallback(
    (chamber: ChamberId) => {
      setActiveChamber(chamber);
      setSynapticPulseCount((c) => c + 1);
      if (typeof window !== "undefined") {
        const nextHash = `#${chamber}`;
        if (window.location.hash !== nextHash) {
          window.history.replaceState(null, "", nextHash);
        }
        scrollTop();
      }
    },
    []
  );

  const openProjectSpecimen = useCallback(
    (projectId: string) => {
      setSelectedProjectId(projectId);
      selectChamber("specimens");
    },
    [selectChamber]
  );

  const openMemoryRecord = useCallback(
    (expId?: string) => {
      if (expId) setSelectedExpId(expId);
      selectChamber("memory");
    },
    [selectChamber]
  );

  /* Sync with browser back/forward or hash changes */
  useEffect(() => {
    const onHashChange = () => {
      setActiveChamber(resolveHashChamber(window.location.hash));
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  /* Global keyboard shortcuts: [1-5] switch chambers, [ and ] cycle chambers */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const idx = Number(e.key) - 1;
      if (idx >= 0 && idx < CHAMBERS.length) {
        e.preventDefault();
        selectChamber(CHAMBERS[idx].id);
        return;
      }

      if (e.key === "[" || e.key === "]") {
        e.preventDefault();
        const curIdx = CHAMBERS.findIndex((c) => c.id === activeChamber);
        const delta = e.key === "]" ? 1 : -1;
        const next = CHAMBERS[(curIdx + delta + CHAMBERS.length) % CHAMBERS.length];
        if (next) selectChamber(next.id);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeChamber, selectChamber]);

  return (
    <ThemeProvider>
      <div id="hero" className="relative flex min-h-screen flex-col bg-paper font-sans text-ink">
        <div className="atelier-grain" aria-hidden />

        <Chrome
          activeChamber={activeChamber}
          onSelectChamber={selectChamber}
          synapticPulseCount={synapticPulseCount}
        />

        <main className="flex-1 pb-16 lg:pb-0">
          {activeChamber === "cortex" && (
            <CortexChamber
              onNavigate={selectChamber}
              onSelectProject={openProjectSpecimen}
              onSelectExperience={openMemoryRecord}
              onPulse={recordPulse}
            />
          )}

          {activeChamber === "specimens" && (
            <SpecimensChamber
              selectedProjectId={selectedProjectId}
              onSelectProject={setSelectedProjectId}
              onPulse={recordPulse}
            />
          )}

          {activeChamber === "synapse" && (
            <SynapseChamber onPulse={recordPulse} />
          )}

          {activeChamber === "memory" && (
            <MemoryChamber
              initialExpId={selectedExpId}
              onSelectProject={openProjectSpecimen}
              onPulse={recordPulse}
            />
          )}

          {activeChamber === "transmission" && (
            <TransmissionChamber onPulse={recordPulse} />
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}
