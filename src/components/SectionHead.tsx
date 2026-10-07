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
        "flex flex-col gap-3 border-b px-4 py-6 sm:flex-row sm:items-end sm:justify-between md:px-6 md:py-7",
        dark ? "border-line-inv" : "border-line",
        className
      )}
    >
      <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-bold leading-tight tracking-tight">
        <span className="mr-3 align-middle font-mono text-xs font-semibold tracking-wider text-acc" aria-hidden>
          {index}
        </span>
        {title}
      </h2>
      {note && (
        <p className={cn("max-w-lg text-sm leading-relaxed md:text-base", dark ? "text-paper/75" : "text-ink/70")}>
          {note}
        </p>
      )}
    </Reveal>
  );
}
