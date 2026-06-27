import Image from "next/image";
import Link from "next/link";
import { Heart, MessageSquare, PackagePlus, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/Badge";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { getProduct, getSupplier, products } from "@/lib/data";
import { formatProductRange } from "@/lib/currency";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug) ?? products[0];
  const supplier = getSupplier(product.supplierId)!;
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-4 text-sm text-slate-500">Home / {product.category} / {product.title}</div>
        <section className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          <div className="grid gap-3 md:grid-cols-[96px_1fr]">
            <div className="order-2 grid grid-cols-4 gap-2 md:order-1 md:grid-cols-1">
              {product.gallery.map((image) => (
                <div key={image} className="relative aspect-square overflow-hidden rounded border border-slate-200 bg-white">
                  <Image src={image} alt={product.title} fill className="object-cover" sizes="96px" />
                </div>
              ))}
            </div>
            <div className="relative order-1 aspect-[4/3] overflow-hidden rounded border border-slate-200 bg-white md:order-2">
              <Image src={product.image} alt={product.title} fill priority className="object-cover" sizes="50vw" />
            </div>
          </div>
          <div className="card p-5">
            <div className="flex flex-wrap gap-2">
              {supplier.verified ? <Badge tone="green" icon="verified">Verified Supplier</Badge> : null}
              {product.tradeProtected ? <Badge tone="blue" icon="protection">Secure Trade Protection</Badge> : null}
              {product.readyToShip ? <Badge tone="amber" icon="ready">Ready to Ship</Badge> : null}
              <Badge icon="fast">{supplier.responseRate}% Fast Response</Badge>
            </div>
            <h1 className="mt-4 text-3xl font-black leading-tight text-slate-950">{product.title}</h1>
            <Link href={`/suppliers/${supplier.slug}`} className="mt-2 block text-sm font-bold text-teal-700">{supplier.name}</Link>
            <div className="mt-5 rounded bg-slate-50 p-4">
              <div className="text-3xl font-black text-slate-950">{formatProductRange(product)}</div>
              <div className="mt-1 text-sm text-slate-600">Minimum order: {product.moq.toLocaleString()} {product.unit} · Lead time {product.leadTime} days</div>
            </div>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <button className="primary-button"><MessageSquare className="h-4 w-4" /> Inquiry</button>
              <button className="secondary-button"><PackagePlus className="h-4 w-4" /> Start order</button>
              <button className="secondary-button"><ShoppingCart className="h-4 w-4" /> Add to cart</button>
              <button className="secondary-button"><Heart className="h-4 w-4" /> Favorite</button>
            </div>
            <button className="mt-2 w-full rounded border border-amber-300 bg-amber-50 px-4 py-3 font-black text-amber-900">Request sample</button>
            <div className="mt-5 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
              <div><b>Customization:</b> {product.customizable ? "Available" : "Limited"}</div>
              <div><b>Stock/capacity:</b> {product.stock.toLocaleString()} in stock</div>
              <div><b>Shipping:</b> {product.shipping.join(", ")}</div>
              <div><b>Country:</b> {product.country}</div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="grid gap-6">
            <div className="card p-5">
              <h2 className="text-xl font-black text-slate-950">Product Overview</h2>
              <p className="mt-3 leading-7 text-slate-600">{product.description}</p>
            </div>
            <div className="card p-5">
              <h2 className="text-xl font-black text-slate-950">Specifications</h2>
              <table className="dashboard-table mt-3">
                <tbody>{Object.entries(product.specs).map(([key, value]) => <tr key={key}><th>{key}</th><td>{value}</td></tr>)}</tbody>
              </table>
            </div>
            <div className="card p-5">
              <h2 className="text-xl font-black text-slate-950">Packaging and Delivery</h2>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                {["Export carton marks", "Inspection report placeholder", "Sea, air, land freight quote"].map((item) => <div key={item} className="rounded bg-slate-50 p-3 text-sm font-semibold text-slate-700">{item}</div>)}
              </div>
            </div>
            <div className="card p-5">
              <h2 className="text-xl font-black text-slate-950">Reviews and Transaction History</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">Ratings and transaction history placeholders are shown after completed orders and admin moderation.</p>
            </div>
          </div>
          <aside className="h-fit rounded border border-slate-200 bg-white p-5">
            <h2 className="text-xl font-black text-slate-950">Company Profile</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{supplier.intro}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs">
              <div className="rounded bg-slate-50 p-3"><b className="block text-lg text-slate-950">{supplier.years}</b> years</div>
              <div className="rounded bg-slate-50 p-3"><b className="block text-lg text-slate-950">{supplier.responseRate}%</b> response</div>
            </div>
            <Link href={`/suppliers/${supplier.slug}`} className="primary-button mt-4 w-full">Visit storefront</Link>
          </aside>
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-black text-slate-950">Recommended Similar Products</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div>
        </section>
      </main>
      <Footer />
    </>
  );
}
