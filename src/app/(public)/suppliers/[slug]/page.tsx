import Image from "next/image";
import { Factory, FileCheck2, MessageSquare, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/Badge";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { getSupplier, products, suppliers } from "@/lib/data";

export function generateStaticParams() {
  return suppliers.map((supplier) => ({ slug: supplier.slug }));
}

export default async function SupplierPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supplier = getSupplier(slug) ?? suppliers[0];
  const catalog = products.filter((product) => product.supplierId === supplier.id);

  return (
    <>
      <Header />
      <main className="bg-slate-50">
        <section className="relative min-h-[360px] overflow-hidden bg-slate-950 text-white">
          <Image src={supplier.banner} alt={supplier.name} fill className="object-cover opacity-50" sizes="100vw" />
          <div className="absolute inset-0 bg-slate-950/55" />
          <div className="relative mx-auto flex min-h-[360px] max-w-7xl flex-col justify-end px-4 py-8">
            <div className="flex flex-wrap items-end gap-4">
              <div className="grid h-20 w-20 place-items-center rounded border border-white/40 bg-white text-2xl font-black text-slate-950">{supplier.logo}</div>
              <div>
                <div className="mb-2 flex flex-wrap gap-2">
                  {supplier.verified ? <Badge tone="green" icon="verified">Verified</Badge> : null}
                  {supplier.secureTrade ? <Badge tone="blue" icon="protection">Secure Trade</Badge> : null}
                </div>
                <h1 className="text-4xl font-black">{supplier.name}</h1>
                <p className="mt-2 text-slate-100">{supplier.type} · {supplier.country}, {supplier.region} · {supplier.years} years in business</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[1fr_340px]">
          <div className="grid gap-6">
            <div className="card p-5">
              <h2 className="text-2xl font-black text-slate-950">Company Introduction</h2>
              <p className="mt-3 leading-7 text-slate-600">{supplier.intro}</p>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <div className="rounded bg-slate-50 p-4"><Factory className="h-5 w-5 text-teal-700" /><b className="mt-2 block">Capacity</b><span className="text-sm text-slate-600">{supplier.capacity}</span></div>
                <div className="rounded bg-slate-50 p-4"><FileCheck2 className="h-5 w-5 text-teal-700" /><b className="mt-2 block">Certifications</b><span className="text-sm text-slate-600">{supplier.certifications.join(", ")}</span></div>
                <div className="rounded bg-slate-50 p-4"><ShieldCheck className="h-5 w-5 text-teal-700" /><b className="mt-2 block">Trust</b><span className="text-sm text-slate-600">Verification and protection settings visible to buyers.</span></div>
              </div>
            </div>
            <div className="card p-5">
              <h2 className="text-2xl font-black text-slate-950">Supplier Product Catalog</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {catalog.map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
            </div>
          </div>
          <aside className="h-fit rounded border border-slate-200 bg-white p-5">
            <button className="primary-button w-full"><MessageSquare className="h-4 w-4" /> Contact supplier</button>
            <div className="mt-4 grid gap-2 text-sm">
              <div className="flex justify-between rounded bg-slate-50 p-3"><span>Response rate</span><b>{supplier.responseRate}%</b></div>
              <div className="flex justify-between rounded bg-slate-50 p-3"><span>On-time delivery</span><b>{supplier.onTimeDelivery}%</b></div>
              <div className="flex justify-between rounded bg-slate-50 p-3"><span>Main products</span><b>{supplier.mainProducts.length}</b></div>
            </div>
            <h3 className="mt-5 font-black text-slate-950">Main Products</h3>
            <div className="mt-2 flex flex-wrap gap-2">{supplier.mainProducts.map((item) => <Badge key={item}>{item}</Badge>)}</div>
            <h3 className="mt-5 font-black text-slate-950">Factory Photos</h3>
            <div className="relative mt-2 aspect-video overflow-hidden rounded bg-slate-100">
              <Image src={supplier.banner} alt="Factory preview" fill className="object-cover" sizes="320px" />
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}
