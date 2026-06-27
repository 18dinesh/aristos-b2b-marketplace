import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function ReviewsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-black text-slate-950">Reviews and Ratings</h1>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {["Supplier rating", "Product rating", "On-time delivery", "Communication", "Quality", "Admin moderation"].map((item) => <div key={item} className="card p-5"><b>{item}</b><p className="mt-2 text-sm text-slate-600">Post-order rating workflow placeholder with moderation controls.</p></div>)}
        </div>
      </main>
      <Footer />
    </>
  );
}
