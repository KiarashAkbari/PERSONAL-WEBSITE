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
        "flex flex-wrap items-end justify-between gap-x-8 gap-y-2 border-b px-4 py-5 md:px-6",
        dark ? "border-line-inv" : "border-line",
        className
      )}
    >
      <h2 className="xcond font-display text-[clamp(2.2rem,6.5vw,4.6rem)] font-bold leading-[0.9]">
        <span className="mr-3 align-top font-mono text-[11px] font-normal tracking-[0.3em] text-acc">
          [{index}]
        </span>
        {title}
      </h2>
      {note && (
        /* notes run 80–140 chars — tight tracking + slightly larger size,
           wide tracking makes them illegible ribbons in Helvetica */
        <p className="max-w-md pb-1 text-[10px] leading-[1.7] tracking-[0.07em] opacity-60">
          {note}
        </p>
      )}
    </Reveal>
  );
}
