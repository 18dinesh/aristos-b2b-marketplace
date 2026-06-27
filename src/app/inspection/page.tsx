import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function InspectionPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-black text-slate-950">Inspection and Quality Check</h1>
        <section className="card mt-5 p-5">
          <form className="grid gap-3 md:grid-cols-2">
            <input className="field" placeholder="Order number" />
            <select className="field"><option>Pre-shipment inspection</option><option>Factory audit</option><option>Production quality check</option></select>
            <textarea className="field md:col-span-2" rows={5} placeholder="Product quality checklist" />
            <input className="field md:col-span-2" type="file" />
            <button className="primary-button md:col-span-2">Request inspection</button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
