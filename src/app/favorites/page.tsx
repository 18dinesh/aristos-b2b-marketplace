import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { SupplierCard } from "@/components/SupplierCard";
import { products, suppliers } from "@/lib/data";

export default function FavoritesPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-black text-slate-950">Favorites and Following</h1>
        <p className="mt-2 text-slate-600">Favorite products, favorite suppliers, followed suppliers, new product updates placeholder, and saved searches.</p>
        <h2 className="mb-4 mt-8 text-2xl font-black">Favorite Products</h2>
        <div className="grid gap-4 md:grid-cols-4">{products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}</div>
        <h2 className="mb-4 mt-8 text-2xl font-black">Followed Suppliers</h2>
        <div className="grid gap-4 md:grid-cols-4">{suppliers.slice(0, 4).map((supplier) => <SupplierCard key={supplier.id} supplier={supplier} />)}</div>
      </main>
      <Footer />
    </>
  );
}
