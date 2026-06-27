import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function ShippingPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-black text-slate-950">Shipping and Logistics</h1>
        <div className="mt-5 grid gap-4 md:grid-cols-3">{["Sea freight", "Air freight", "Land freight"].map((method) => <div key={method} className="card p-5"><h2 className="text-xl font-black">{method}</h2><p className="mt-2 text-sm leading-6 text-slate-600">Shipping quote request, tracking number, logistics timeline, estimated delivery, destination country, Incoterms EXW/FOB/CIF/DDP, and documents placeholder.</p></div>)}</div>
      </main>
      <Footer />
    </>
  );
}
