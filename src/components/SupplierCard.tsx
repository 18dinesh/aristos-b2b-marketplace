import Image from "next/image";
import Link from "next/link";
import { Building2, MessageCircle } from "lucide-react";
import type { Supplier } from "@/lib/types";
import { Badge } from "./Badge";

export function SupplierCard({ supplier }: { supplier: Supplier }) {
  return (
    <article className="card overflow-hidden">
      <div className="relative h-28 bg-slate-100">
        <Image src={supplier.banner} alt={`${supplier.name} banner`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className="p-4">
        <div className="-mt-10 mb-3 flex items-end gap-3">
          <div className="grid h-14 w-14 place-items-center rounded border border-white bg-slate-950 text-lg font-black text-white shadow-sm">
            {supplier.logo}
          </div>
          <div className="flex flex-wrap gap-1 pb-1">
            {supplier.verified ? <Badge tone="green" icon="verified">Verified</Badge> : <Badge tone="amber">Pending</Badge>}
            {supplier.secureTrade ? <Badge tone="blue" icon="protection">Secure trade</Badge> : null}
          </div>
        </div>
        <Link href={`/suppliers/${supplier.slug}`} className="text-lg font-black text-slate-950 hover:text-teal-700">{supplier.name}</Link>
        <div className="mt-1 flex items-center gap-2 text-sm text-slate-600">
          <Building2 className="h-4 w-4" />
          {supplier.type} · {supplier.country}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded bg-slate-50 p-2"><b className="block text-slate-950">{supplier.years}</b> years</div>
          <div className="rounded bg-slate-50 p-2"><b className="block text-slate-950">{supplier.responseRate}%</b> response</div>
          <div className="rounded bg-slate-50 p-2"><b className="block text-slate-950">{supplier.onTimeDelivery}%</b> on-time</div>
        </div>
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600">{supplier.intro}</p>
        <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded bg-slate-950 px-4 py-2.5 text-sm font-bold text-white">
          <MessageCircle className="h-4 w-4" />
          Contact supplier
        </button>
      </div>
    </article>
  );
}
