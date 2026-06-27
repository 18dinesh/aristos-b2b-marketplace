import Link from "next/link";
import { BarChart3, Boxes, Factory, FileText, MessageSquare, Settings, ShieldCheck, ShoppingBag, Truck, Users } from "lucide-react";

const iconMap = { BarChart3, Boxes, Factory, FileText, MessageSquare, Settings, ShieldCheck, ShoppingBag, Truck, Users };

export function DashboardShell({
  title,
  role,
  nav,
  children
}: {
  title: string;
  role: string;
  nav: { label: string; href: string; icon: keyof typeof iconMap }[];
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded border border-slate-200 bg-white p-3">
          <Link href="/" className="mb-4 flex items-center gap-2 px-2 py-2">
            <span className="grid h-9 w-9 place-items-center rounded bg-slate-950 text-sm font-black text-white">A</span>
            <span>
              <b className="block text-slate-950">Aristos</b>
              <span className="text-xs text-slate-500">{role}</span>
            </span>
          </Link>
          <nav className="grid gap-1">
            {nav.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <Link key={item.label} href={item.href} className="flex items-center gap-2 rounded px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-teal-700">
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase text-teal-700">{role}</p>
              <h1 className="text-3xl font-black text-slate-950">{title}</h1>
            </div>
            <div className="flex gap-2">
              <select className="field max-w-32">
                <option>INR</option>
                <option>USD</option>
                <option>EUR</option>
              </select>
              <select className="field max-w-32">
                <option>English</option>
                <option>Hindi</option>
                <option>Spanish</option>
              </select>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
