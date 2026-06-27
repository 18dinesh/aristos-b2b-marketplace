import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ClipboardList, Factory, FileCheck2, Globe2, PackageCheck, Search, ShieldCheck, Smartphone, Truck } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeader } from "@/components/SectionHeader";
import { SupplierCard } from "@/components/SupplierCard";
import { Badge } from "@/components/Badge";
import { categories, products, productShowcase, suppliers } from "@/lib/data";

export default function Home() {
  const featured = products.slice(0, 8);
  const ready = products.filter((product) => product.readyToShip).slice(0, 4);

  return (
    <>
      <Header />
      <main className="bg-slate-50">
        <section className="relative min-h-[620px] overflow-hidden bg-slate-950 text-white">
          <Image src="/assets/hero-marketplace.png" alt="Global wholesale trading operations" fill priority className="object-cover opacity-55" sizes="100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.94),rgba(15,23,42,0.66),rgba(15,23,42,0.18))]" />
          <div className="relative mx-auto flex min-h-[620px] max-w-7xl flex-col justify-center px-4 py-12">
            <div className="max-w-3xl">
              <Badge tone="blue" icon="protection">B2B service request marketplace</Badge>
              <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">Aristos B2B Marketplace</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-100">
                Source through RFQs, inquiry-led product requests, approved vendor onboarding, negotiated quotations, inspection, order protection, and shipping workflows.
              </p>
              <form action="/search" className="mt-8 overflow-hidden rounded border border-white/20 bg-white shadow-2xl md:flex">
                <select name="type" className="h-14 border-b border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 md:border-b-0 md:border-r">
                  <option>Products</option>
                  <option>Suppliers</option>
                </select>
                <input name="q" placeholder="Search product category, supplier, or service request" className="h-14 min-w-0 flex-1 px-4 text-slate-950 outline-none" />
                <button className="flex h-14 items-center justify-center gap-2 bg-teal-600 px-6 font-black text-white">
                  <Search className="h-5 w-5" />
                  Search
                </button>
              </form>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/rfq" className="primary-button">Post sourcing request <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/customer/onboarding" className="secondary-button border-white bg-white/95 text-slate-950">Customer onboarding</Link>
                <Link href="/vendor/onboarding" className="secondary-button border-white bg-white/95 text-slate-950">Vendor onboarding</Link>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-200">
                {["Packaging machines", "Workwear", "Printed boxes", "EV parts"].map((term) => (
                  <Link key={term} href={`/search?q=${encodeURIComponent(term)}`} className="rounded-full border border-white/25 px-3 py-1 hover:bg-white/10">{term}</Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10">
          <div className="grid gap-3 md:grid-cols-4">
            {[
              ["Post service requests", "Invite qualified suppliers to quote with terms.", ClipboardList],
              ["Approval-gated vendors", "Supplier panel opens only after onboarding approval.", FileCheck2],
              ["Logistics Ready", "Sea, air, land freight workflow placeholders.", Truck],
              ["Supplier Verification", "Review business documents, banners, and storefront quality.", Factory]
            ].map(([title, text, Icon]) => (
              <div key={title as string} className="card flex gap-3 p-4">
                <Icon className="h-6 w-6 shrink-0 text-teal-700" />
                <div>
                  <h3 className="font-black text-slate-950">{title as string}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{text as string}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-6">
          <SectionHeader title="Source by Category" subtitle="Each category can work as a service request, inquiry-led product catalog, or admin-approved supplier listing group." href="/search" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
            {categories.map((category) => (
              <Link key={category.slug} href={`/search?category=${category.slug}`} className="card overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image src={category.image} alt={category.name} fill className="object-cover" sizes="180px" />
                </div>
                <div className="p-3 text-sm font-black text-slate-950">{category.name}</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10">
          <SectionHeader title="Demo Products by Category" subtitle="Category-related demo imagery is ready for review now, and operations admin can replace images or publish vendor products later." href="/search" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {productShowcase.map(({ category, image, products: sampleProducts, sourcingMode }) => (
              <article key={category.slug} className="card overflow-hidden">
                <div className="relative aspect-[4/3] bg-slate-100">
                  <Image src={image} alt={`${category.name} demo products`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                </div>
                <div className="p-4">
                  <Badge tone="blue">{sourcingMode}</Badge>
                  <h3 className="mt-3 text-lg font-black text-slate-950">{category.name}</h3>
                  <div className="mt-3 grid gap-2">
                    {sampleProducts.map((product) => (
                      <Link key={product.id} href={`/products/${product.slug}`} className="rounded border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-teal-600 hover:text-teal-700">
                        {product.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10">
          <SectionHeader title="Featured Wholesale Products" subtitle="Product cards show MOQ, price range, lead-time features, supplier badges, cart, inquiry, and favorites actions." href="/search" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>

        <section className="bg-white py-10">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeader title="Ready-to-Ship Supply" subtitle="Fast procurement for stocked or preconfigured bulk products." href="/search?readyToShip=true" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {ready.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 lg:grid-cols-2">
          <div className="rounded border border-slate-200 bg-slate-950 p-7 text-white">
            <Factory className="h-9 w-9 text-amber-300" />
            <h2 className="mt-4 text-3xl font-black">Request and Inquiry Model</h2>
              <p className="mt-3 max-w-xl leading-7 text-slate-200">Customers submit specifications, target pricing, sample requirements, destination country, inspection needs, and contract notes. Vendors respond only after onboarding approval, and products display only after super admin approval.</p>
            <Link href="/rfq" className="primary-button mt-6 bg-amber-300 text-slate-950">Start an RFQ <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="rounded border border-slate-200 bg-white p-7">
            <Globe2 className="h-9 w-9 text-teal-700" />
            <h2 className="mt-4 text-3xl font-black text-slate-950">Country and Region Suppliers</h2>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              {["India", "Vietnam", "Turkey", "Poland", "Mexico", "UAE", "Bangladesh", "Kenya"].map((country) => (
                <Link key={country} href={`/search?country=${country}`} className="rounded border border-slate-200 px-3 py-2 font-semibold hover:border-teal-600 hover:text-teal-700">{country}</Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10">
          <SectionHeader title="Top Suppliers" subtitle="Storefront previews include verification, business type, production capacity, response metrics, and trust badges." href="/search?type=Suppliers" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {suppliers.slice(0, 4).map((supplier) => <SupplierCard key={supplier.id} supplier={supplier} />)}
          </div>
        </section>

        <section className="bg-teal-700 py-10 text-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-3xl font-black">Keep service requests and negotiations inside Aristos</h2>
              <p className="mt-2 max-w-2xl text-teal-50">RFQs, supplier quotes, onboarding approval, product proposals, contract notes, inspection reports, and dispute evidence remain connected to each transaction.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/customer/onboarding" className="secondary-button border-white bg-white text-teal-800">Onboard customer</Link>
              <Link href="/vendor/onboarding" className="secondary-button border-white bg-teal-800 text-white">Onboard vendor</Link>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 md:grid-cols-3">
          {[
            ["Buyer app workspace", "Track RFQs, orders, quotes, favorites, disputes, address book, and notifications.", Smartphone],
            ["Supplier operating desk", "Approved vendors manage RFQ leads, quotations, order updates, storefront assets, and product proposals.", PackageCheck],
            ["Separate operations admin", "Maintain vendors, customers, onboarding approvals, product requests, banners, categories, and reports.", ShieldCheck]
          ].map(([title, text, Icon]) => (
            <div key={title as string} className="card p-5">
              <Icon className="h-7 w-7 text-teal-700" />
              <h3 className="mt-4 text-xl font-black text-slate-950">{title as string}</h3>
              <p className="mt-2 leading-7 text-slate-600">{text as string}</p>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
