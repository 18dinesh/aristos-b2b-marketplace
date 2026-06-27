import Image from "next/image";
import Link from "next/link";
import { FileCheck2, ImagePlus, LockKeyhole, PackagePlus, Send } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { categories, vendorOnboardingRequests } from "@/lib/data";
import { Badge } from "@/components/Badge";

export default function VendorOnboardingPage() {
  return (
    <>
      <Header />
      <main className="bg-slate-50">
        <section className="bg-slate-950 px-4 py-10 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <Badge tone="blue" icon="verified">Approval-first vendor access</Badge>
              <h1 className="mt-4 text-4xl font-black leading-tight md:text-5xl">Vendor Onboarding Request</h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
                Vendors submit their company profile, storefront banner, product categories, and product request/inquiry model. The supplier panel opens only after operations admin approval.
              </p>
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {[
                  ["Submit profile", FileCheck2],
                  ["Upload banner", ImagePlus],
                  ["Await approval", LockKeyhole]
                ].map(([label, Icon]) => (
                  <div key={label as string} className="rounded border border-white/15 bg-white/10 p-4">
                    <Icon className="h-6 w-6 text-amber-300" />
                    <b className="mt-3 block">{label as string}</b>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded border border-white/15 bg-white/10">
              <Image src="/assets/packaging.png" alt="Vendor onboarding storefront banner example" fill className="object-cover" sizes="420px" />
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1fr_360px]">
          <div className="card p-5">
            <h2 className="text-2xl font-black text-slate-950">Company and Catalog Request</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Use this form for manual vendor onboarding. File upload fields are development placeholders and will later connect to storage.</p>
            <form className="mt-6 grid gap-3 md:grid-cols-2">
              <input className="field" placeholder="Company legal name" />
              <input className="field" placeholder="Contact person" />
              <input className="field" type="email" placeholder="Business email" />
              <input className="field" placeholder="Phone number" />
              <select className="field">
                <option>Manufacturer</option>
                <option>Wholesaler</option>
                <option>Distributor</option>
                <option>Exporter</option>
                <option>Trading Company</option>
              </select>
              <input className="field" placeholder="Country / region" />
              <select className="field md:col-span-2">
                <option>Product catalog by inquiry model</option>
                <option>Product catalog by request model</option>
                <option>Both request model and inquiry model</option>
              </select>
              <select className="field md:col-span-2">
                {categories.map((category) => <option key={category.slug}>{category.name}</option>)}
              </select>
              <input className="field md:col-span-2" type="file" aria-label="Upload company profile banner" />
              <input className="field md:col-span-2" type="file" aria-label="Upload company documents" />
              <textarea className="field md:col-span-2" rows={4} placeholder="Company profile, certifications, factory capacity, and export experience" />
              <textarea className="field md:col-span-2" rows={4} placeholder="Products to onboard, inquiry-based custom products, MOQ rules, sample availability, and RFQ categories" />
              <textarea className="field md:col-span-2" rows={3} placeholder="Admin notes or special approval requirements" />
              <button className="primary-button md:col-span-2"><Send className="h-4 w-4" /> Submit onboarding request</button>
            </form>
          </div>

          <aside className="grid h-fit gap-4">
            <div className="card p-5">
              <h2 className="text-xl font-black text-slate-950">Approval Gate</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Pending vendors cannot access supplier dashboard tools. Operations admin must approve the request and publish the storefront.</p>
              <Link href="/vendor/onboarding/status" className="secondary-button mt-4 w-full">Check request status</Link>
            </div>
            <div className="card p-5">
              <h2 className="text-xl font-black text-slate-950">Demo Requests</h2>
              <div className="mt-4 grid gap-3">
                {vendorOnboardingRequests.map((request) => (
                  <div key={request.id} className="rounded border border-slate-200 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <b className="text-sm">{request.companyName}</b>
                      <Badge tone={request.status === "APPROVED" ? "green" : "amber"}>{request.status}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-slate-600">{request.productCatalogMode.replaceAll("_", " ")} · {request.categories.join(", ")}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-5">
              <PackagePlus className="h-7 w-7 text-teal-700" />
              <h2 className="mt-3 text-xl font-black text-slate-950">Product onboarding model</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Products can be created from buyer inquiries, admin requests, supplier submissions, or RFQ-led service categories.</p>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}
