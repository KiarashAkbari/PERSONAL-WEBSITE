export default function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <div className="flex w-max shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((it) => (
        <span key={`${hidden ? "b" : "a"}-${it}`} className="flex items-center whitespace-nowrap">
          <span className="px-6 text-sm font-bold uppercase tracking-[0.1em] md:text-base">{it}</span>
          <span className="text-acc font-bold" aria-hidden>
            ✕
          </span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="overflow-hidden border-y border-line bg-ink py-3.5 text-paper" aria-label="Core technologies">
      <div className="flex w-max animate-ticker">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
