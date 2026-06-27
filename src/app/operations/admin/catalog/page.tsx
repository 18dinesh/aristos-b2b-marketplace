import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/Badge";
import { DashboardShell } from "@/components/DashboardShell";
import { categories, productApprovalRequests, products, suppliers } from "@/lib/data";
import { formatProductRange, platformCurrency } from "@/lib/currency";

const nav = [
  { label: "Operations overview", href: "/operations/admin", icon: "BarChart3" },
  { label: "Catalog editor", href: "/operations/admin/catalog", icon: "Boxes" },
  { label: "Vendor onboarding", href: "/operations/admin", icon: "Factory" },
  { label: "Customer onboarding", href: "/operations/admin", icon: "Users" },
  { label: "Product approvals", href: "/operations/admin", icon: "ShieldCheck" },
  { label: "Settings", href: "/operations/admin/catalog", icon: "Settings" }
] as const;

const hairSupplier = suppliers.find((supplier) => supplier.slug === "indian-human-hair-shop") ?? suppliers[0];
const editableProduct = products.find((product) => product.slug === "raw-indian-hair-extension-bundles") ?? products[0];

function approvalTone(status: string) {
  if (status === "APPROVED") return "green" as const;
  if (status.includes("PENDING")) return "amber" as const;
  return "neutral" as const;
}

export default function AdminCatalogEditorPage() {
  return (
    <DashboardShell title="Catalog and Vendor Editor" role="Super Admin controls" nav={[...nav]}>
      <div className="rounded border border-teal-200 bg-teal-50 p-4 text-sm leading-6 text-teal-950">
        Admin and super admin can maintain supplier brand details, product images, price rules, currency, and product display approval from this separate operations URL. In the current demo, these controls are wired as editable forms; the next production step is saving them to PostgreSQL through admin APIs.
      </div>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_380px]">
        <form className="card p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-slate-950">Product Details Editor</h2>
              <p className="mt-1 text-sm text-slate-600">Use this format to add or edit product title, images, details, MOQ, pricing, RFQ model, and public display status.</p>
            </div>
            <Badge tone="amber">Requires super admin approval</Badge>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="grid gap-1 text-sm font-bold text-slate-700">
              Product title
              <input className="field" defaultValue={editableProduct.title} />
            </label>
            <label className="grid gap-1 text-sm font-bold text-slate-700">
              Supplier
              <select className="field" defaultValue={editableProduct.supplierId}>
                {suppliers.map((supplier) => <option key={supplier.id} value={supplier.id}>{supplier.name}</option>)}
              </select>
            </label>
            <label className="grid gap-1 text-sm font-bold text-slate-700">
              Category
              <select className="field" defaultValue={editableProduct.category}>
                {categories.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}
              </select>
            </label>
            <label className="grid gap-1 text-sm font-bold text-slate-700">
              Subcategory
              <input className="field" defaultValue={editableProduct.subcategory} />
            </label>
            <label className="grid gap-1 text-sm font-bold text-slate-700 md:col-span-2">
              Main product image URL
              <input className="field" defaultValue={editableProduct.image} />
            </label>
            <label className="grid gap-1 text-sm font-bold text-slate-700 md:col-span-2">
              Gallery image URLs
              <input className="field" defaultValue={editableProduct.gallery.join(", ")} />
            </label>
            <label className="grid gap-1 text-sm font-bold text-slate-700">
              Minimum price
              <input className="field" type="number" defaultValue={editableProduct.minPrice} />
            </label>
            <label className="grid gap-1 text-sm font-bold text-slate-700">
              Maximum price
              <input className="field" type="number" defaultValue={editableProduct.maxPrice} />
            </label>
            <label className="grid gap-1 text-sm font-bold text-slate-700">
              Currency
              <select className="field" defaultValue="INR">
                {platformCurrency.supported.map((currency) => <option key={currency}>{currency}</option>)}
              </select>
            </label>
            <label className="grid gap-1 text-sm font-bold text-slate-700">
              MOQ
              <input className="field" type="number" defaultValue={editableProduct.moq} />
            </label>
            <label className="grid gap-1 text-sm font-bold text-slate-700">
              Unit
              <input className="field" defaultValue={editableProduct.unit} />
            </label>
            <label className="grid gap-1 text-sm font-bold text-slate-700">
              Lead time days
              <input className="field" type="number" defaultValue={editableProduct.leadTime} />
            </label>
            <label className="grid gap-1 text-sm font-bold text-slate-700">
              Catalog model
              <select className="field" defaultValue="INQUIRY_MODEL">
                <option value="INQUIRY_MODEL">Inquiry model</option>
                <option value="REQUEST_MODEL">Request model</option>
                <option value="BOTH">Both</option>
              </select>
            </label>
            <label className="grid gap-1 text-sm font-bold text-slate-700">
              Display status
              <select className="field" defaultValue="PUBLIC">
                <option value="HIDDEN">Hidden until approval</option>
                <option value="PUBLIC">Public after approval</option>
              </select>
            </label>
            <label className="grid gap-1 text-sm font-bold text-slate-700 md:col-span-2">
              Product description
              <textarea className="field min-h-32" defaultValue={editableProduct.description} />
            </label>
            <label className="grid gap-1 text-sm font-bold text-slate-700 md:col-span-2">
              Specifications table
              <textarea className="field min-h-28" defaultValue={Object.entries(editableProduct.specs).map(([key, value]) => `${key}: ${value}`).join("\n")} />
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button className="primary-button" type="button">Save draft</button>
            <button className="secondary-button" type="button">Send for super admin approval</button>
            <button className="secondary-button" type="button">Preview public product</button>
          </div>
        </form>

        <aside className="grid gap-4">
          <div className="card overflow-hidden">
            <div className="relative aspect-[4/3] bg-slate-100">
              <Image src={editableProduct.image} alt={editableProduct.title} fill className="object-cover" sizes="380px" />
            </div>
            <div className="p-4">
              <h3 className="font-black text-slate-950">Live preview</h3>
              <p className="mt-1 text-sm text-slate-600">{editableProduct.title}</p>
              <p className="mt-2 text-lg font-black text-slate-950">{formatProductRange(editableProduct)}</p>
            </div>
          </div>
          <div className="card p-4">
            <h3 className="font-black text-slate-950">Currency rule</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Default public display is {platformCurrency.code}. Admin can still store supplier quote currencies and convert display pricing for Indian buyers.</p>
          </div>
        </aside>
      </section>

      <section className="card mt-6 p-5">
        <h2 className="text-xl font-black text-slate-950">Vendor Brand Details Editor</h2>
        <p className="mt-1 text-sm text-slate-600">Company profile, banner, logo, certifications, capacity, and storefront intro can be maintained here.</p>
        <form className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="grid gap-1 text-sm font-bold text-slate-700">
            Company name
            <input className="field" defaultValue={hairSupplier.name} />
          </label>
          <label className="grid gap-1 text-sm font-bold text-slate-700">
            Business type
            <input className="field" defaultValue={hairSupplier.type} />
          </label>
          <label className="grid gap-1 text-sm font-bold text-slate-700">
            Country
            <input className="field" defaultValue={hairSupplier.country} />
          </label>
          <label className="grid gap-1 text-sm font-bold text-slate-700">
            Region
            <input className="field" defaultValue={hairSupplier.region} />
          </label>
          <label className="grid gap-1 text-sm font-bold text-slate-700">
            Logo initials / logo URL
            <input className="field" defaultValue={hairSupplier.logo} />
          </label>
          <label className="grid gap-1 text-sm font-bold text-slate-700">
            Company banner URL
            <input className="field" defaultValue={hairSupplier.banner} />
          </label>
          <label className="grid gap-1 text-sm font-bold text-slate-700">
            Main products
            <input className="field" defaultValue={hairSupplier.mainProducts.join(", ")} />
          </label>
          <label className="grid gap-1 text-sm font-bold text-slate-700">
            Certifications
            <input className="field" defaultValue={hairSupplier.certifications.join(", ")} />
          </label>
          <label className="grid gap-1 text-sm font-bold text-slate-700">
            Production capacity
            <input className="field" defaultValue={hairSupplier.capacity} />
          </label>
          <label className="grid gap-1 text-sm font-bold text-slate-700">
            Verification status
            <select className="field" defaultValue={hairSupplier.verified ? "VERIFIED" : "PENDING"}>
              <option value="PENDING">Pending</option>
              <option value="VERIFIED">Verified</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </label>
          <label className="grid gap-1 text-sm font-bold text-slate-700 md:col-span-2">
            Company introduction
            <textarea className="field min-h-28" defaultValue={hairSupplier.intro} />
          </label>
          <div className="md:col-span-2 flex flex-wrap gap-2">
            <button className="primary-button" type="button">Save vendor profile</button>
            <Link className="secondary-button" href={`/suppliers/${hairSupplier.slug}`}>Open storefront</Link>
          </div>
        </form>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="card overflow-hidden">
          <div className="border-b border-slate-200 p-4">
            <h2 className="text-xl font-black text-slate-950">Product Editing Queue</h2>
            <p className="mt-1 text-sm text-slate-600">Admin can open any record, update details, and control display approval.</p>
          </div>
          <table className="dashboard-table">
            <thead><tr><th>Product</th><th>Supplier</th><th>INR display</th><th>Action</th></tr></thead>
            <tbody>
              {products.slice(-8).map((product) => {
                const supplier = suppliers.find((item) => item.id === product.supplierId);
                return (
                  <tr key={product.id}>
                    <td><b>{product.title}</b><div className="text-xs text-slate-500">{product.subcategory}</div></td>
                    <td>{supplier?.name}</td>
                    <td>{formatProductRange(product)}</td>
                    <td>Edit - Approve - Hide</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="card overflow-hidden">
          <div className="border-b border-slate-200 p-4">
            <h2 className="text-xl font-black text-slate-950">Approval Visibility</h2>
            <p className="mt-1 text-sm text-slate-600">Super admin approval decides what appears in public catalog and supplier storefront.</p>
          </div>
          <table className="dashboard-table">
            <thead><tr><th>Product</th><th>Vendor</th><th>Status</th><th>Display</th></tr></thead>
            <tbody>
              {productApprovalRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.productTitle}</td>
                  <td>{request.supplierName}</td>
                  <td><Badge tone={approvalTone(request.status)}>{request.status}</Badge></td>
                  <td><Badge tone={request.visibility === "PUBLIC" ? "green" : "amber"}>{request.visibility}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardShell>
  );
}
