import Link from "next/link";

export function Footer() {
  const columns = [
    ["Marketplace", "Search products", "Top suppliers", "Ready to ship", "Custom manufacturing"],
    ["Buying", "Post an RFQ", "Order protection", "Inspection services", "Shipping workflow"],
    ["Selling", "Supplier dashboard", "Verification", "Product management", "RFQ leads"],
    ["Company", "About Aristos", "Platform terms", "Help center", "Contact"]
  ];

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.4fr_2fr]">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded bg-white text-sm font-black text-slate-950">A</span>
            <span className="text-xl font-black">Aristos B2B Marketplace</span>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-300">
            Original wholesale marketplace architecture for manufacturers, importers, exporters, distributors, and business procurement teams.
          </p>
          <form className="mt-5 flex max-w-md rounded border border-slate-700 bg-slate-900">
            <input placeholder="Business email" className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none" />
            <button className="bg-teal-500 px-4 text-sm font-bold text-slate-950">Subscribe</button>
          </form>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map(([title, ...links]) => (
            <div key={title}>
              <h3 className="text-sm font-bold">{title}</h3>
              <div className="mt-3 grid gap-2 text-sm text-slate-300">
                {links.map((link) => (
                  <Link href="#" key={link} className="hover:text-white">{link}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-slate-800 px-4 py-4 text-center text-xs text-slate-400">
        Protection eligibility subject to platform terms. Payment, logistics, and dispute services require business configuration.
      </div>
    </footer>
  );
}
