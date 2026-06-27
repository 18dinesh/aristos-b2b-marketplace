import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/Badge";
import { getSupplier, orders } from "@/lib/data";

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = orders.find((item) => item.id === id) ?? orders[0];
  const supplier = getSupplier(order.supplierId);
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="card p-5">
          <div className="flex flex-wrap justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-950">Order {order.number}</h1>
              <p className="mt-1 text-slate-600">{order.buyer} buying from {supplier?.name}</p>
            </div>
            <Badge tone={order.secureTrade ? "blue" : "neutral"} icon="protection">{order.secureTrade ? "Secure Trade eligible" : "Standard order"}</Badge>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            <div className="rounded bg-slate-50 p-4"><b>Status</b><p>{order.status}</p></div>
            <div className="rounded bg-slate-50 p-4"><b>Payment</b><p>{order.paymentStatus}</p></div>
            <div className="rounded bg-slate-50 p-4"><b>Total</b><p>{order.currency} {order.total.toLocaleString()}</p></div>
            <div className="rounded bg-slate-50 p-4"><b>Lead time</b><p>{order.leadTime} days</p></div>
          </div>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="card p-5">
            <h2 className="text-xl font-black text-slate-950">Order Timeline</h2>
            <div className="mt-4 grid gap-3">{order.timeline.map((item) => <div key={item} className="rounded border border-slate-200 p-3 text-sm font-semibold">{item}</div>)}</div>
          </section>
          <section className="card p-5">
            <h2 className="text-xl font-black text-slate-950">Contract and Documents</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Includes buyer info, supplier info, products, quantity, unit price, shipping cost placeholder, production lead time, delivery address, contract notes, and attachments placeholder.</p>
            <button className="secondary-button mt-4">Open dispute</button>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
