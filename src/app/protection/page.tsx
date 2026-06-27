import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function ProtectionPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <section className="rounded border border-teal-200 bg-teal-50 p-6">
          <h1 className="text-3xl font-black text-slate-950">Secure Trade Protection</h1>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">Protection eligibility subject to platform terms. This module tracks protected payment status, quality agreements, shipment deadlines, evidence uploads, refund requests, dispute status, and admin mediation.</p>
          <div className="mt-6 grid gap-3 md:grid-cols-4">{["Protected payment status", "Product quality agreement", "Shipment deadline", "Admin mediation panel"].map((item) => <div key={item} className="rounded bg-white p-4 font-bold text-slate-800">{item}</div>)}</div>
        </section>
      </main>
      <Footer />
    </>
  );
}
