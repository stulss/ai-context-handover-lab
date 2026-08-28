export function SectionHeader({ title, lead }: { title: string; lead?: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {lead ? <p className="mt-2 max-w-2xl text-sm text-white/60">{lead}</p> : null}
    </div>
  );
}
