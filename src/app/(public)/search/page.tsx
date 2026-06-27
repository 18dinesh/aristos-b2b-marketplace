import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { SupplierCard } from "@/components/SupplierCard";
import { categories, searchProducts, suppliers } from "@/lib/data";

export default async function SearchPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const paramsObject = await searchParams;
  const params = new URLSearchParams();
  Object.entries(paramsObject).forEach(([key, value]) => {
    if (typeof value === "string") params.set(key, value);
  });
  const results = searchProducts(params);
  const type = params.get("type") ?? "Products";

  return (
    <>
      <Header />
      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded border border-slate-200 bg-white p-4">
          <h1 className="text-xl font-black text-slate-950">Advanced Search</h1>
          <form className="mt-4 grid gap-3">
            <input name="q" defaultValue={params.get("q") ?? ""} className="field" placeholder="Keyword" />
            <select name="category" defaultValue={params.get("category") ?? ""} className="field">
              <option value="">All categories</option>
              {categories.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}
            </select>
            <input name="country" defaultValue={params.get("country") ?? ""} className="field" placeholder="Country / region" />
            <div className="grid grid-cols-2 gap-2">
              <input name="minPrice" className="field" placeholder="Min price INR" />
              <input name="maxPrice" className="field" placeholder="Max price INR" />
            </div>
            <input name="moq" className="field" placeholder="Max MOQ" />
            {[
              ["verified", "Verified supplier"],
              ["readyToShip", "Ready to ship"],
              ["customizable", "Customizable"],
              ["tradeProtected", "Trade protection"]
            ].map(([name, label]) => (
              <label key={name} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <input type="checkbox" name={name} value="true" defaultChecked={params.get(name) === "true"} />
                {label}
              </label>
            ))}
            <select name="sort" defaultValue={params.get("sort") ?? "relevance"} className="field">
              <option value="relevance">Sort by relevance</option>
              <option value="newest">Newest</option>
              <option value="price">Price</option>
              <option value="popularity">Popularity</option>
            </select>
            <button className="primary-button">Apply filters</button>
          </form>
        </aside>
        <section>
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-teal-700">{type}</p>
              <h2 className="text-3xl font-black text-slate-950">{type === "Suppliers" ? suppliers.length : results.length} marketplace results</h2>
            </div>
            <div className="text-sm text-slate-500">Product and supplier keyword search supported</div>
          </div>
          {type === "Suppliers" ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {suppliers.map((supplier) => <SupplierCard key={supplier.id} supplier={supplier} />)}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
