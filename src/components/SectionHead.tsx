import Reveal from "./Reveal";

export default function SectionHead({
  index,
  title,
  note,
  id,
}: {
  index: string;
  title: string;
  note?: string;
  id?: string;
}) {
  return (
    <Reveal>
      <div className="flex flex-col gap-5 border-t border-line px-4 pb-10 pt-6 md:flex-row md:items-end md:justify-between md:px-6">
        <div className="flex items-baseline gap-4">
          <span className="tape">{index}</span>
          <h2 id={id} className="h-section">
            {title}
          </h2>
        </div>
        {note && <p className="eyebrow max-w-xs leading-relaxed md:text-right">{note}</p>}
      </div>
    </Reveal>
  );
}
