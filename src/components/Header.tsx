import Link from "next/link";
import { Bell, Globe2, Heart, Menu, Search, ShoppingCart, UserRound } from "lucide-react";
import { categories } from "@/lib/data";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <Link href="/" className="flex min-w-max items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded bg-slate-950 text-sm font-black text-white">A</span>
          <span className="text-lg font-black tracking-normal text-slate-950">Aristos</span>
        </Link>
        <form action="/search" className="hidden flex-1 items-center rounded border border-slate-300 bg-white md:flex">
          <select name="type" className="h-11 rounded-l border-r border-slate-200 bg-slate-50 px-3 text-sm text-slate-700">
            <option>Products</option>
            <option>Suppliers</option>
          </select>
          <input name="q" placeholder="Search products, suppliers, RFQ-ready categories" className="h-11 min-w-0 flex-1 px-3 text-sm outline-none" />
          <button className="grid h-11 w-12 place-items-center bg-teal-700 text-white" aria-label="Search">
            <Search className="h-5 w-5" />
          </button>
        </form>
        <nav className="ml-auto hidden items-center gap-1 text-sm font-semibold text-slate-700 lg:flex">
          <Link className="px-3 py-2 hover:text-teal-700" href="/rfq">RFQ</Link>
          <Link className="px-3 py-2 hover:text-teal-700" href="/customer/onboarding">Customer onboarding</Link>
          <Link className="px-3 py-2 hover:text-teal-700" href="/vendor/onboarding">Vendor onboarding</Link>
        </nav>
        <div className="flex items-center gap-1 text-slate-700">
          <Link href="/favorites" className="icon-button" aria-label="Favorites"><Heart className="h-5 w-5" /></Link>
          <Link href="/cart" className="icon-button" aria-label="Cart"><ShoppingCart className="h-5 w-5" /></Link>
          <Link href="/messages" className="icon-button" aria-label="Messages"><Bell className="h-5 w-5" /></Link>
          <button className="icon-button" aria-label="Language and currency"><Globe2 className="h-5 w-5" /></button>
          <Link href="/auth/login" className="icon-button" aria-label="Account"><UserRound className="h-5 w-5" /></Link>
          <button className="icon-button md:hidden" aria-label="Menu"><Menu className="h-5 w-5" /></button>
        </div>
      </div>
      <div className="hidden border-t border-slate-100 bg-slate-50 md:block">
        <div className="mx-auto flex max-w-7xl gap-4 overflow-x-auto px-4 py-2 text-sm text-slate-600">
          {categories.slice(0, 9).map((category) => (
            <Link key={category.slug} href={`/search?category=${category.slug}`} className="min-w-max hover:text-teal-700">
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
