import { CheckCircle2, ShieldCheck, Sparkles, Truck } from "lucide-react";

const icons = {
  verified: CheckCircle2,
  protection: ShieldCheck,
  fast: Sparkles,
  ready: Truck
};

export function Badge({
  children,
  tone = "neutral",
  icon
}: {
  children: React.ReactNode;
  tone?: "neutral" | "green" | "amber" | "blue";
  icon?: keyof typeof icons;
}) {
  const Icon = icon ? icons[icon] : null;
  const toneClass = {
    neutral: "border-slate-200 bg-white text-slate-700",
    green: "border-emerald-200 bg-emerald-50 text-emerald-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    blue: "border-sky-200 bg-sky-50 text-sky-700"
  }[tone];

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${toneClass}`}>
      {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
      {children}
    </span>
  );
}
