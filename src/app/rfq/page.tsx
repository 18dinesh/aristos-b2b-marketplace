import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/Badge";
import { categories, rfqs } from "@/lib/data";

export default function RFQPage() {
  return (
    <>
      <Header />
      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[1fr_420px]">
        <section className="card p-5">
          <h1 className="text-3xl font-black text-slate-950">Submit Request for Quotation</h1>
          <p className="mt-2 text-sm text-slate-600">Share product, quantity, destination, deadline, and files so qualified suppliers can quote.</p>
          <form className="mt-6 grid gap-3 md:grid-cols-2">
            <input className="field md:col-span-2" placeholder="Product name" />
            <select className="field">{categories.map((category) => <option key={category.slug}>{category.name}</option>)}</select>
            <input className="field" placeholder="Quantity required" />
            <select className="field"><option>pieces</option><option>sets</option><option>cartons</option><option>kg</option></select>
            <input className="field" placeholder="Target price" />
            <input className="field" placeholder="Destination country" />
            <input className="field" type="date" />
            <textarea className="field md:col-span-2" rows={5} placeholder="Required specifications, quality checklist, packaging, and shipping terms" />
            <input className="field md:col-span-2" type="file" />
            <button className="primary-button md:col-span-2">Submit RFQ</button>
          </form>
        </section>
        <aside className="grid gap-4">
          <div className="card p-5">
            <h2 className="text-xl font-black text-slate-950">Open RFQs for Suppliers</h2>
            <div className="mt-4 grid gap-3">
              {rfqs.map((rfq) => (
                <div key={rfq.id} className="rounded border border-slate-200 p-3">
                  <div className="flex justify-between gap-3"><b>{rfq.productName}</b><Badge tone="blue">{rfq.status}</Badge></div>
                  <p className="mt-1 text-sm text-slate-600">{rfq.quantity.toLocaleString()} {rfq.unit} to {rfq.destinationCountry}</p>
                  <p className="text-xs font-semibold text-teal-700">{rfq.quotes} supplier quotes</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-5">
            <h2 className="text-xl font-black text-slate-950">Supplier Quotation Form</h2>
            <div className="mt-3 grid gap-2">
              <input className="field" placeholder="Price" />
              <input className="field" placeholder="MOQ" />
              <input className="field" placeholder="Lead time" />
              <input className="field" placeholder="Shipping terms" />
              <textarea className="field" placeholder="Supplier message" />
            </div>
          </div>
        </aside>
      </main>
      <Footer />
    </>
  );
}
