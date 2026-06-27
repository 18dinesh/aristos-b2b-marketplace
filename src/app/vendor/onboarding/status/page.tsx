import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Badge } from "@/components/Badge";
import { vendorOnboardingRequests } from "@/lib/data";

export default function VendorOnboardingStatusPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6">
          <p className="text-sm font-bold uppercase text-teal-700">Vendor approval status</p>
          <h1 className="text-3xl font-black text-slate-950">Supplier Panel Access Is Approval Based</h1>
          <p className="mt-2 max-w-3xl text-slate-600">A vendor can view or manage the supplier panel only after operations admin approves the onboarding request.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {vendorOnboardingRequests.map((request) => (
            <article key={request.id} className="card p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-slate-950">{request.companyName}</h2>
                  <p className="mt-1 text-sm text-slate-600">{request.contactName} · {request.country}</p>
                </div>
                <Badge tone={request.status === "APPROVED" ? "green" : request.status === "PENDING" ? "amber" : "neutral"}>{request.status}</Badge>
              </div>
              <div className="mt-4 rounded bg-slate-50 p-3 text-sm leading-6 text-slate-700">{request.adminNote}</div>
              <div className="mt-4 text-sm text-slate-600">
                <b className="text-slate-950">Products:</b> {request.requestedProducts.join(", ")}
              </div>
              {request.status === "APPROVED" ? (
                <Link href="/supplier/dashboard" className="primary-button mt-4 w-full">Open supplier panel</Link>
              ) : (
                <button className="secondary-button mt-4 w-full" disabled>Panel locked until approval</button>
              )}
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
