import Link from "next/link";
import { Building2, ClipboardList, FileCheck2 } from "lucide-react";
import { Badge } from "@/components/Badge";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { categories, customerOnboardingRequests } from "@/lib/data";

export default function CustomerOnboardingPage() {
  return (
    <>
      <Header />
      <main className="bg-slate-50">
        <section className="bg-slate-950 px-4 py-10 text-white">
          <div className="mx-auto max-w-7xl">
            <Badge tone="blue" icon="verified">Customer onboarding</Badge>
            <h1 className="mt-4 text-4xl font-black leading-tight md:text-5xl">Normal Customer / Buyer Access Request</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
              Customers can request buyer access for RFQs, supplier inquiries, samples, quotations, orders, and protected communication. Admin or super admin approval unlocks the complete buyer workspace.
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {[
                ["Submit business profile", Building2],
                ["Choose sourcing categories", ClipboardList],
                ["Admin approves access", FileCheck2]
              ].map(([label, Icon]) => (
                <div key={label as string} className="rounded border border-white/15 bg-white/10 p-4">
                  <Icon className="h-6 w-6 text-amber-300" />
                  <b className="mt-3 block">{label as string}</b>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1fr_360px]">
          <div className="card p-5">
            <h2 className="text-2xl font-black text-slate-950">Customer Onboarding Form</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Use this for normal customer onboarding before granting full buyer dashboard and RFQ access.</p>
            <form className="mt-6 grid gap-3 md:grid-cols-2">
              <input className="field" placeholder="Company / customer business name" />
              <input className="field" placeholder="Contact person" />
              <input className="field" type="email" placeholder="Business email" />
              <input className="field" placeholder="Phone number" />
              <select className="field">
                <option>Retail chain</option>
                <option>Importer</option>
                <option>Distributor</option>
                <option>Hospitality procurement</option>
                <option>Corporate buyer</option>
              </select>
              <input className="field" placeholder="Country / region" />
              <select className="field md:col-span-2">
                {categories.map((category) => <option key={category.slug}>{category.name}</option>)}
              </select>
              <input className="field md:col-span-2" placeholder="Expected monthly sourcing volume" />
              <textarea className="field md:col-span-2" rows={4} placeholder="What products or services will this customer source?" />
              <input className="field md:col-span-2" type="file" aria-label="Upload customer business documents" />
              <button className="primary-button md:col-span-2">Submit customer access request</button>
            </form>
          </div>

          <aside className="grid h-fit gap-4">
            <div className="card p-5">
              <h2 className="text-xl font-black text-slate-950">Approval Rule</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Customers can register, but full RFQ, quote, order, and messaging access should be enabled only after admin or super admin approval.</p>
              <Link href="/buyer/dashboard" className="secondary-button mt-4 w-full">View buyer dashboard</Link>
            </div>
            <div className="card p-5">
              <h2 className="text-xl font-black text-slate-950">Demo Customer Requests</h2>
              <div className="mt-4 grid gap-3">
                {customerOnboardingRequests.map((request) => (
                  <div key={request.id} className="rounded border border-slate-200 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <b className="text-sm">{request.companyName}</b>
                      <Badge tone={request.status === "APPROVED" ? "green" : "amber"}>{request.status}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-slate-600">{request.buyerType} - {request.expectedMonthlyVolume}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}
