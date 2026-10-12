import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  FileText,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { CONTACT, GH, RESUME_URL } from "@/data";
import { cn } from "@/utils/cn";

const INQUIRY_VECTORS = [
  {
    id: "role",
    code: "VEC.01",
    label: "Full-Time AI / Backend Role",
    subject: "Engineering Role Inquiry — Kiarash Akbari",
    prompt:
      "We are hiring for an AI / Backend Software Engineering role and would like to discuss your work on RAG pipelines and backend systems.",
  },
  {
    id: "consulting",
    code: "VEC.02",
    label: "Architecture & RAG Consulting",
    subject: "Project & Architecture Inquiry — Kiarash Akbari",
    prompt:
      "We are building a product or AI-integrated backend system and would like to explore a consulting or contract engagement.",
  },
  {
    id: "research",
    code: "VEC.03",
    label: "Applied ML Collaboration",
    subject: "Research & Technical Collaboration — Kiarash Akbari",
    prompt:
      "Reaching out regarding an applied machine learning, anomaly detection, or open-source collaboration.",
  },
] as const;

export default function TransmissionChamber({ onPulse }: { onPulse: () => void }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPacket, setCopiedPacket] = useState(false);
  const [vectorId, setVectorId] = useState<string>(INQUIRY_VECTORS[0].id);
  const [senderOrg, setSenderOrg] = useState<string>("");
  const [customNote, setCustomNote] = useState<string>("");
  const emailTimerRef = useRef<number>(0);
  const packetTimerRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      window.clearTimeout(emailTimerRef.current);
      window.clearTimeout(packetTimerRef.current);
    };
  }, []);

  const activeVector =
    INQUIRY_VECTORS.find((v) => v.id === vectorId) ?? INQUIRY_VECTORS[0];

  const copyEmailAddress = async () => {
    onPulse();
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopiedEmail(true);
      window.clearTimeout(emailTimerRef.current);
      emailTimerRef.current = window.setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      /* fallback no-op if clipboard API is restricted */
    }
  };

  const composedBody = useMemo(() => {
    const lines = [
      "Hi Kiarash,",
      "",
      customNote.trim() ? customNote.trim() : activeVector.prompt,
      "",
      senderOrg.trim() ? `— ${senderOrg.trim()}` : "— Sent via CORTEX // Portfolio Uplink",
    ];
    return lines.join("\n");
  }, [activeVector.prompt, customNote, senderOrg]);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(
      senderOrg.trim()
        ? `${activeVector.subject} (${senderOrg.trim()})`
        : activeVector.subject
    );
    const body = encodeURIComponent(composedBody);
    return `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  }, [activeVector.subject, composedBody, senderOrg]);

  const copyDispatchPacket = async () => {
    onPulse();
    try {
      await navigator.clipboard.writeText(
        `TO: ${CONTACT.email}\nSUBJECT: ${activeVector.subject}\n\n${composedBody}`
      );
      setCopiedPacket(true);
      window.clearTimeout(packetTimerRef.current);
      packetTimerRef.current = window.setTimeout(() => setCopiedPacket(false), 2200);
    } catch {
      /* fallback no-op */
    }
  };

  return (
    <section
      id="panel-transmission"
      role="tabpanel"
      aria-labelledby="tab-transmission"
      className="chamber-stage border-b border-line"
    >
      {/* Chamber Masthead */}
      <div className="grid grid-cols-1 border-b border-line lg:grid-cols-12">
        <div className="border-b border-line p-5 sm:p-8 lg:col-span-7 lg:border-b-0 lg:border-r">
          <span className="meta-label">
            CHAMBER 05 // DIRECT COMMUNICATION &amp; MONOGRAPH DISPATCH
          </span>
          <h1 className="display-monograph mt-2 text-[clamp(2.4rem,5.5vw,4.8rem)] uppercase">
            Initiate{" "}
            <span className="font-editorial font-normal italic lowercase text-ink-soft">
              a transmission.
            </span>
          </h1>
        </div>
        <div className="flex flex-col justify-center p-5 sm:p-8 lg:col-span-5">
          <p className="text-sm leading-relaxed text-ink/85">
            Available for full-time remote AI and backend engineering roles, select systems
            consulting, and applied machine learning collaborations.
          </p>
        </div>
      </div>

      {/* Main Split Grid: Verified Channels (Left) vs Interactive Dispatch Composer (Right) */}
      <div className="grid grid-cols-1 divide-y divide-line lg:grid-cols-12 lg:divide-x lg:divide-y-0">
        {/* Left 6 Columns: Direct Uplink Channels */}
        <div className="flex flex-col justify-between p-5 sm:p-8 lg:col-span-6">
          <div>
            <span className="meta-label text-ink">
              01 // VERIFIED CHANNELS &amp; MONOGRAPH
            </span>

            {/* Primary Email Card with Copy + Mailto */}
            <div className="mt-4 border border-ink bg-paper-2/40 p-5">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                <span className="inline-flex items-center gap-2 text-acc">
                  <Mail size={12} aria-hidden />
                  PRIMARY CHANNEL // ELECTRONIC MAIL
                </span>
                <span>DIRECT RESPONSE</span>
              </div>
              <p className="mt-2.5 break-all font-mono text-base font-bold text-ink sm:text-lg">
                {CONTACT.email}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                <a
                  href={`mailto:${CONTACT.email}`}
                  onClick={onPulse}
                  className="inline-flex items-center gap-2 bg-ink px-4 py-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.15em] text-paper transition-colors hover:bg-acc hover:text-[#09090a]"
                >
                  <span>Write Email</span>
                  <ArrowUpRight size={12} aria-hidden />
                </a>
                <button
                  type="button"
                  onClick={copyEmailAddress}
                  className="inline-flex items-center gap-2 border border-line bg-paper px-3.5 py-2 font-mono text-[10.5px] uppercase tracking-[0.15em] text-ink transition-colors hover:border-ink"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={12} aria-hidden className="text-acc" />
                      <span>Copied Address</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} aria-hidden />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Secondary Channel Rows */}
            <div className="mt-4 divide-y divide-line border border-line">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onPulse}
                className="group flex items-center justify-between gap-4 p-4 transition-colors hover:bg-ink hover:text-paper sm:p-5"
              >
                <div className="flex items-center gap-3.5">
                  <FileText size={16} aria-hidden className="text-acc" />
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] opacity-70">
                      CURRICULUM VITAE // MONOGRAPH
                    </span>
                    <span className="mt-0.5 block text-sm font-bold">
                      Kiarash_Akbari_Resume_TE.pdf
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em]">
                  <span>Open PDF</span>
                  <ArrowUpRight size={13} aria-hidden />
                </span>
              </a>

              <a
                href={GH}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onPulse}
                className="group flex items-center justify-between gap-4 p-4 transition-colors hover:bg-ink hover:text-paper sm:p-5"
              >
                <div className="flex items-center gap-3.5">
                  <span className="grid h-4 w-4 place-items-center font-mono text-xs font-bold text-acc">
                    GH
                  </span>
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] opacity-70">
                      PUBLIC CODE REPOSITORIES
                    </span>
                    <span className="mt-0.5 block font-mono text-sm font-bold">
                      github.com/KiarashAkbari
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={14} aria-hidden />
              </a>

              <a
                href={`tel:${CONTACT.phoneHref}`}
                onClick={onPulse}
                className="group flex items-center justify-between gap-4 p-4 transition-colors hover:bg-ink hover:text-paper sm:p-5"
              >
                <div className="flex items-center gap-3.5">
                  <Phone size={15} aria-hidden className="text-acc" />
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] opacity-70">
                      VOICE &amp; DIRECT LINE ({CONTACT.tz})
                    </span>
                    <span className="mt-0.5 block font-mono text-sm font-bold">
                      {CONTACT.phone}
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={14} aria-hidden />
              </a>

              <div className="flex items-center justify-between gap-4 p-4 sm:p-5">
                <div className="flex items-center gap-3.5">
                  <MapPin size={15} aria-hidden className="text-acc" />
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                      OPERATING NODE
                    </span>
                    <span className="mt-0.5 block text-sm font-bold text-ink">
                      {CONTACT.location} · Remote Worldwide
                    </span>
                  </div>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                  {CONTACT.tz}
                </span>
              </div>
            </div>
          </div>

          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
            CORTEX // 07 — KIARASH AKBARI · SINGLE-FILE BUILD ON GITHUB PAGES
          </p>
        </div>

        {/* Right 6 Columns: Interactive Signal Packet Composer */}
        <div className="flex flex-col justify-between p-5 sm:p-8 lg:col-span-6">
          <div>
            <span className="meta-label text-ink">
              02 // INTERACTIVE SIGNAL DISPATCH COMPOSER
            </span>
            <p className="mt-2 text-xs leading-relaxed text-ink-soft">
              Select an inquiry vector below to configure a structured transmission packet, then
              launch your mail client or copy the formatted payload.
            </p>

            {/* Vector Selector */}
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {INQUIRY_VECTORS.map((vec) => {
                const isSelected = vec.id === vectorId;
                return (
                  <button
                    key={vec.id}
                    type="button"
                    onClick={() => {
                      setVectorId(vec.id);
                      onPulse();
                    }}
                    className={cn(
                      "flex flex-col justify-between border p-3.5 text-left transition-colors",
                      isSelected
                        ? "border-ink bg-ink text-paper"
                        : "border-line bg-paper text-ink hover:bg-paper-2"
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono text-[9.5px] uppercase tracking-[0.15em]",
                        isSelected ? "text-acc" : "text-ink-soft"
                      )}
                    >
                      {vec.code}
                    </span>
                    <span className="mt-1.5 text-xs font-bold leading-snug">
                      {vec.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Optional Sender & Message Inputs */}
            <div className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="sender-org"
                  className="block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft"
                >
                  YOUR NAME / ORGANIZATION (OPTIONAL)
                </label>
                <input
                  id="sender-org"
                  type="text"
                  value={senderOrg}
                  onChange={(e) => setSenderOrg(e.target.value)}
                  placeholder="e.g. Jane Doe — Principal Recruiter, Acme AI"
                  className="mt-1.5 w-full border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/50 focus:border-ink focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="custom-note"
                  className="block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft"
                >
                  TRANSMISSION PAYLOAD (EDIT OR KEEP VECTOR DEFAULT)
                </label>
                <textarea
                  id="custom-note"
                  rows={3}
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder={activeVector.prompt}
                  className="mt-1.5 w-full resize-y border border-line bg-paper px-3.5 py-2.5 text-sm leading-relaxed text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none"
                />
              </div>
            </div>

            {/* Live Packet Preview */}
            <div className="term mt-5 border border-line p-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-paper/15 pb-2 text-[10px] uppercase tracking-[0.15em] text-paper/60">
                <span>PACKET_PREVIEW // SMTP</span>
                <span className="text-acc">READY</span>
              </div>
              <div className="mt-2.5 space-y-1 text-[11px] text-paper/85">
                <div>
                  <span className="text-paper/50">TO:</span> {CONTACT.email}
                </div>
                <div>
                  <span className="text-paper/50">SUBJECT:</span>{" "}
                  {senderOrg.trim()
                    ? `${activeVector.subject} (${senderOrg.trim()})`
                    : activeVector.subject}
                </div>
                <pre className="mt-2 whitespace-pre-wrap border-t border-paper/15 pt-2 font-mono text-[11px] leading-relaxed text-paper/80">
                  {composedBody}
                </pre>
              </div>
            </div>
          </div>

          {/* Dispatch Buttons */}
          <div className="mt-5 flex flex-wrap items-center gap-3 pt-2">
            <a
              href={mailtoHref}
              onClick={onPulse}
              className="inline-flex items-center gap-2.5 bg-ink px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-acc hover:text-[#09090a]"
            >
              <Send size={13} aria-hidden />
              <span>Transmit via Email Client</span>
            </a>

            <button
              type="button"
              onClick={copyDispatchPacket}
              className="inline-flex items-center gap-2 border border-line px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink"
            >
              {copiedPacket ? (
                <>
                  <Check size={13} aria-hidden className="text-acc" />
                  <span>Packet Copied</span>
                </>
              ) : (
                <>
                  <Copy size={13} aria-hidden />
                  <span>Copy Payload</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
