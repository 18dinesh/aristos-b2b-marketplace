import { Badge } from "@/components/Badge";
import { DashboardShell } from "@/components/DashboardShell";
import { StatCard } from "@/components/Stats";
import {
  accessRules,
  customerOnboardingRequests,
  productApprovalRequests,
  rfqs,
  suppliers,
  vendorOnboardingRequests
} from "@/lib/data";

const nav = [
  { label: "Operations overview", href: "/operations/admin", icon: "BarChart3" },
  { label: "Vendor onboarding", href: "/operations/admin", icon: "Factory" },
  { label: "Customer onboarding", href: "/operations/admin", icon: "Users" },
  { label: "Product approvals", href: "/operations/admin", icon: "Boxes" },
  { label: "Service requests", href: "/rfq", icon: "FileText" },
  { label: "Disputes", href: "/protection", icon: "ShieldCheck" },
  { label: "Settings", href: "/operations/admin", icon: "Settings" }
] as const;

function approvalTone(status: string) {
  if (status === "APPROVED") return "green" as const;
  if (status === "PENDING" || status === "PENDING_SUPER_ADMIN") return "amber" as const;
  return "neutral" as const;
}

export default function OperationsAdminDashboard() {
  const pendingVendors = vendorOnboardingRequests.filter((request) => request.status === "PENDING");
  const pendingCustomers = customerOnboardingRequests.filter((request) => request.status === "PENDING");
  const pendingProducts = productApprovalRequests.filter((request) => request.status === "PENDING_SUPER_ADMIN");

  return (
    <DashboardShell title="Operations Admin Panel" role="Admin and Super Admin" nav={[...nav]}>
      <div className="rounded border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
        Clear access rule: vendors and customers can submit onboarding requests, but full dashboard access and public product visibility happen only after admin or super admin approval. Product display requires super admin approval.
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-4">
        <StatCard label="Pending vendors" value={pendingVendors.length.toString()} note="Approve before vendor panel access" />
        <StatCard label="Pending customers" value={pendingCustomers.length.toString()} note="Approve before full buyer access" />
        <StatCard label="Product approvals" value={pendingProducts.length.toString()} note="Super admin controls display" />
        <StatCard label="Service RFQs" value={rfqs.length.toString()} note="Buyer request pipeline" />
      </div>

      <section className="card mt-6 p-5">
        <h2 className="text-xl font-black text-slate-950">Access Matrix</h2>
        <p className="mt-1 text-sm text-slate-600">Use this as the operating rule for frontend, backend, and database permissions.</p>
        <div className="mt-4 grid gap-3 lg:grid-cols-4">
          {accessRules.map((rule) => (
            <div key={rule.role} className="rounded border border-slate-200 bg-white p-4">
              <Badge tone={rule.role === "SUPER_ADMIN" ? "blue" : "neutral"}>{rule.role}</Badge>
              <h3 className="mt-3 font-black text-slate-950">Allowed access</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">{rule.canAccess}</p>
              <h3 className="mt-3 font-black text-slate-950">Approval rule</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">{rule.approvalRequired}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="card overflow-hidden">
          <div className="border-b border-slate-200 p-4">
            <h2 className="text-xl font-black">Vendor Onboarding Queue</h2>
            <p className="mt-1 text-sm text-slate-600">Admin/super admin approves company profile, banner, categories, and supplier account access.</p>
          </div>
          <table className="dashboard-table">
            <thead><tr><th>Vendor</th><th>Categories</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {vendorOnboardingRequests.map((request) => (
                <tr key={request.id}>
                  <td><b>{request.companyName}</b><div className="text-xs text-slate-500">{request.contactName} - {request.country}</div></td>
                  <td>{request.categories.join(", ")}</td>
                  <td><Badge tone={approvalTone(request.status)}>{request.status}</Badge></td>
                  <td>Review - Approve - Reject</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card overflow-hidden">
          <div className="border-b border-slate-200 p-4">
            <h2 className="text-xl font-black">Customer Onboarding Queue</h2>
            <p className="mt-1 text-sm text-slate-600">Admin/super admin approves buyer profile before full RFQ, inquiry, quote, and order access.</p>
          </div>
          <table className="dashboard-table">
            <thead><tr><th>Customer</th><th>Sourcing</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {customerOnboardingRequests.map((request) => (
                <tr key={request.id}>
                  <td><b>{request.companyName}</b><div className="text-xs text-slate-500">{request.contactName} - {request.buyerType}</div></td>
                  <td>{request.sourcingCategories.join(", ")}</td>
                  <td><Badge tone={approvalTone(request.status)}>{request.status}</Badge></td>
                  <td>Review - Approve - Reject</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card mt-6 overflow-hidden">
        <div className="border-b border-slate-200 p-4">
          <h2 className="text-xl font-black">Super Admin Product Display Approval</h2>
          <p className="mt-1 text-sm text-slate-600">Vendors can manage drafts, but products stay hidden until super admin approval.</p>
        </div>
        <table className="dashboard-table">
          <thead><tr><th>Product</th><th>Vendor</th><th>Model</th><th>Status</th><th>Display</th><th>Super admin note</th></tr></thead>
          <tbody>
            {productApprovalRequests.map((request) => (
              <tr key={request.id}>
                <td><b>{request.productTitle}</b><div className="text-xs text-slate-500">{request.category}</div></td>
                <td>{request.supplierName}</td>
                <td>{request.model.replace("_", " ")}</td>
                <td><Badge tone={approvalTone(request.status)}>{request.status}</Badge></td>
                <td><Badge tone={request.visibility === "PUBLIC" ? "green" : "amber"}>{request.visibility}</Badge></td>
                <td>{request.superAdminNote}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="card p-5">
          <h2 className="text-xl font-black">Supplier Records</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{suppliers.length} supplier records are available for profile, certification, and storefront maintenance.</p>
        </div>
        <div className="card p-5">
          <h2 className="text-xl font-black">Customer Details</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Customer onboarding feeds buyer profile, address book, RFQ access, and procurement preferences.</p>
        </div>
        <div className="card p-5">
          <h2 className="text-xl font-black">Backend Rule</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">APIs should check role, onboarding status, and product approval status before returning protected dashboard or public catalog data.</p>
        </div>
      </section>
    </DashboardShell>
  );
}
