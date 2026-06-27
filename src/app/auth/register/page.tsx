import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-4 py-8">
      <section className="card w-full max-w-2xl p-6">
        <Link href="/" className="mb-6 flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded bg-slate-950 text-sm font-black text-white">A</span>
          <span className="font-black text-slate-950">Aristos B2B Marketplace</span>
        </Link>
        <h1 className="text-3xl font-black text-slate-950">Create Business Account</h1>
        <form className="mt-6 grid gap-3 md:grid-cols-2">
          <input className="field" placeholder="Full name" />
          <input className="field" type="email" placeholder="Business email" />
          <input className="field" placeholder="Phone" />
          <select className="field"><option>Customer onboarding request</option><option>Vendor onboarding request</option></select>
          <input className="field md:col-span-2" placeholder="Company name" />
          <select className="field"><option>Manufacturer</option><option>Wholesaler</option><option>Distributor</option><option>Exporter</option><option>Importer</option></select>
          <input className="field" placeholder="Country / region" />
          <input className="field" type="password" placeholder="Password" />
          <input className="field" type="password" placeholder="Confirm password" />
          <button className="primary-button md:col-span-2">Register</button>
        </form>
        <p className="mt-4 text-sm text-slate-600">Customers and vendors both use approval-first onboarding. Admin/super admin approval controls customer access, vendor panel access, and product display.</p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm font-bold">
          <Link href="/customer/onboarding" className="text-teal-700">Submit customer onboarding</Link>
          <Link href="/vendor/onboarding" className="text-teal-700">Submit vendor onboarding</Link>
        </div>
      </section>
    </main>
  );
}
