import Link from "next/link";

export function SectionHeader({ title, subtitle, href }: { title: string; subtitle?: string; href?: string }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-black text-slate-950 md:text-3xl">{title}</h2>
        {subtitle ? <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">{subtitle}</p> : null}
      </div>
      {href ? <Link href={href} className="hidden text-sm font-bold text-teal-700 hover:text-teal-900 md:block">View all</Link> : null}
    </div>
  );
}
