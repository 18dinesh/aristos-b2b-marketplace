import Link from "next/link";
import { DashboardShell } from "@/components/DashboardShell";
import { StatCard } from "@/components/Stats";
import { customerOnboardingRequests, orders, rfqs } from "@/lib/data";
import { Badge } from "@/components/Badge";
import { formatInr } from "@/lib/currency";

const nav = [
  { label: "Overview", href: "/buyer/dashboard", icon: "BarChart3" },
  { label: "Orders", href: "/orders/order-1", icon: "ShoppingBag" },
  { label: "RFQs", href: "/rfq", icon: "FileText" },
  { label: "Messages", href: "/messages", icon: "MessageSquare" },
  { label: "Favorites", href: "/favorites", icon: "Boxes" },
  { label: "Disputes", href: "/protection", icon: "ShieldCheck" },
  { label: "Profile settings", href: "/auth/register", icon: "Settings" }
] as const;

export default function BuyerDashboard() {
  const approvedCustomer = customerOnboardingRequests.find((request) => request.status === "APPROVED");

  return (
    <DashboardShell title="Buyer Dashboard" role="Buyer workspace" nav={[...nav]}>
      <div className="mb-5 rounded border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">
        Full buyer access should be enabled only after customer onboarding approval. Demo approved customer: <b>{approvedCustomer?.companyName}</b>.
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Recent orders" value={orders.length.toString()} note="Includes draft and active orders" />
        <StatCard label="RFQs" value={rfqs.length.toString()} note="Quotes received and pending" />
        <StatCard label="Messages" value="18" note="4 unread negotiations" />
        <StatCard label="Favorites" value="12" note="Products and suppliers" />
      </div>
      <section className="card mt-6 overflow-hidden">
        <div className="border-b border-slate-200 p-4"><h2 className="text-xl font-black">Recent Orders</h2></div>
        <table className="dashboard-table">
          <thead><tr><th>Order</th><th>Supplier</th><th>Status</th><th>Total</th><th></th></tr></thead>
          <tbody>{orders.map((order) => <tr key={order.id}><td>{order.number}</td><td>{order.supplierId}</td><td>{order.status}</td><td>{formatInr(order.total, order.currency)}</td><td><Link className="font-bold text-teal-700" href={`/orders/${order.id}`}>Open</Link></td></tr>)}</tbody>
        </table>
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="card p-5"><h2 className="text-xl font-black">Customer Access</h2><p className="mt-2 text-sm text-slate-600">Customer onboarding controls RFQ posting, inquiry messaging, quotations, order creation, and address book access.</p><Badge tone="green">APPROVED DEMO</Badge></div>
        <div className="card p-5"><h2 className="text-xl font-black">Quotes Received</h2><p className="mt-2 text-sm text-slate-600">Supplier quotations linked to RFQs with accept/reject actions.</p></div>
      </section>
    </DashboardShell>
  );
}
