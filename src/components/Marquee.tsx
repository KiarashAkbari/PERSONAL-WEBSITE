import { cn } from "../utils/cn";

type Props = {
  items: string[];
  inverted?: boolean;
  slow?: boolean;
  className?: string;
  label?: string;
};

export default function Marquee({ items, inverted, slow, className, label }: Props) {
  const row = (hidden: boolean) => (
    <div className="flex w-max shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((it, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <span className="px-6 font-medium text-xs md:text-sm tracking-wide">{it}</span>
          <span className="text-acc font-bold">·</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      aria-label={label ?? "Ticker"}
      className={cn(
        "relative flex items-center overflow-hidden border-y py-3",
        inverted ? "border-line-inv bg-ink text-paper" : "border-line bg-paper text-ink",
        className
      )}
    >
      {label && (
        <span className="absolute left-0 top-0 z-10 border-r border-current/20 bg-inherit px-2 py-0.5 text-[9px] tracking-[0.18em] text-current/60">
          {label}
        </span>
      )}
      <div
        className={cn(
          "marquee-track flex w-max",
          slow ? "animate-marquee-slow" : "animate-marquee"
        )}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
