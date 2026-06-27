import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSupplier, products } from "@/lib/data";

export default function CartPage() {
  const items = products.slice(0, 4);
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <h1 className="text-3xl font-black text-slate-950">B2B Cart and Inquiry Cart</h1>
        <div className="mt-5 grid gap-4">
          {items.map((product) => {
            const supplier = getSupplier(product.supplierId);
            return (
              <div key={product.id} className="card grid gap-4 p-4 md:grid-cols-[1fr_160px_180px] md:items-center">
                <div>
                  <b className="text-slate-950">{product.title}</b>
                  <p className="mt-1 text-sm text-slate-600">{supplier?.name} · MOQ validation: minimum {product.moq} {product.unit}</p>
                </div>
                <input className="field" defaultValue={product.moq} />
                <div className="flex gap-2">
                  <button className="secondary-button flex-1">Save</button>
                  <button className="secondary-button flex-1">Remove</button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <button className="primary-button">Request quote from cart</button>
          <button className="secondary-button">Start order</button>
        </div>
      </main>
      <Footer />
    </>
  );
}
