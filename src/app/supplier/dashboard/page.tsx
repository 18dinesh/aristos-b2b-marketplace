import { Badge } from "@/components/Badge";
import { DashboardShell } from "@/components/DashboardShell";
import { StatCard } from "@/components/Stats";
import { productApprovalRequests, products, rfqs, vendorOnboardingRequests } from "@/lib/data";

const nav = [
  { label: "Overview", href: "/supplier/dashboard", icon: "BarChart3" },
  { label: "Products", href: "/supplier/dashboard", icon: "Boxes" },
  { label: "RFQ leads", href: "/rfq", icon: "FileText" },
  { label: "Orders received", href: "/orders/order-1", icon: "ShoppingBag" },
  { label: "Messages", href: "/messages", icon: "MessageSquare" },
  { label: "Verification", href: "/vendor/onboarding/status", icon: "ShieldCheck" },
  { label: "Shipping settings", href: "/shipping", icon: "Truck" },
  { label: "Storefront settings", href: "/supplier/dashboard", icon: "Settings" }
] as const;

export default function SupplierDashboard() {
  const approvedRequest = vendorOnboardingRequests.find((request) => request.status === "APPROVED");
  const hiddenProducts = productApprovalRequests.filter((request) => request.visibility === "HIDDEN");
  const publicProducts = productApprovalRequests.filter((request) => request.visibility === "PUBLIC");

  return (
    <DashboardShell title="Supplier Dashboard" role="Supplier workspace" nav={[...nav]}>
      <div className="mb-5 rounded border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">
        Supplier panel access is shown only for approved vendors. Demo approved vendor: <b>{approvedRequest?.companyName}</b>. Product display still requires super admin approval.
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Public products" value={publicProducts.length.toString()} note="Visible after super admin approval" />
        <StatCard label="Hidden drafts" value={hiddenProducts.length.toString()} note="Waiting for super admin approval" />
        <StatCard label="RFQ service leads" value={rfqs.length.toString()} note="Inquiry and request model leads" />
        <StatCard label="Orders received" value="9" note="Production and shipping queue" />
      </div>
      <section className="card mt-6 p-5">
        <div className="flex flex-wrap justify-between gap-3">
          <div>
            <h2 className="text-xl font-black">Product Management Approval Flow</h2>
            <p className="mt-1 text-sm text-slate-600">Vendors can create and edit product proposals. Products stay hidden until super admin approves display.</p>
          </div>
          <button className="primary-button">Submit product to super admin</button>
        </div>
        <table className="dashboard-table mt-4">
          <thead><tr><th>Product</th><th>Supplier</th><th>Model</th><th>Approval</th><th>Display</th></tr></thead>
          <tbody>
            {productApprovalRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.productTitle}</td>
                <td>{request.supplierName}</td>
                <td>{request.model.replace("_", " ")}</td>
                <td><Badge tone={request.status === "APPROVED" ? "green" : "amber"}>{request.status}</Badge></td>
                <td><Badge tone={request.visibility === "PUBLIC" ? "green" : "amber"}>{request.visibility}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="card p-5"><h2 className="font-black">Storefront Assets</h2><p className="mt-2 text-sm text-slate-600">Company profile banner, logo, factory photos, certifications, and category mapping.</p></div>
        <div className="card p-5"><h2 className="font-black">Quotations Sent</h2><p className="mt-2 text-sm text-slate-600">Track inquiry price, MOQ, lead time, shipping terms, and buyer response.</p></div>
        <div className="card p-5"><h2 className="font-black">Super Admin Approval Queue</h2><p className="mt-2 text-sm text-slate-600">New product proposals and storefront edits require super admin approval before publication.</p></div>
      </section>
      <section className="card mt-6 p-5">
        <h2 className="text-xl font-black text-slate-950">Published Catalog Preview</h2>
        <p className="mt-1 text-sm text-slate-600">Only approved products should appear in public search and supplier storefronts.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {products.slice(0, 3).map((product) => (
            <div key={product.id} className="rounded border border-slate-200 p-3">
              <b className="text-sm text-slate-950">{product.title}</b>
              <p className="mt-1 text-xs text-slate-600">Demo catalog item. In production, visibility should be filtered by product approval status.</p>
            </div>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
