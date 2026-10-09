import { cn } from "../utils/cn";
import Reveal from "./Reveal";

type Props = {
  index: string;
  title: string;
  note?: string;
  dark?: boolean;
  className?: string;
};

export default function SectionHead({ index, title, note, dark, className }: Props) {
  return (
    <Reveal
      className={cn(
        "punk-section-head flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b px-4 py-6 md:px-6",
        dark ? "border-line-inv" : "border-line",
        className
      )}
    >
      <h2 className="punk-section-title font-display text-[clamp(2rem,5vw,3.8rem)] font-bold leading-tight tracking-tight">
        <span className="punk-section-number mr-3 align-middle font-mono text-xs font-semibold tracking-widest text-acc">
          {index} /
        </span>
        {title}
      </h2>
      {note && (
        <p className="punk-section-note max-w-md pb-1 text-xs md:text-sm leading-relaxed opacity-70">
          {note}
        </p>
      )}
    </Reveal>
  );
}
