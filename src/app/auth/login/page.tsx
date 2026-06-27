import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-4">
      <section className="card w-full max-w-md p-6">
        <Link href="/" className="mb-6 flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded bg-slate-950 text-sm font-black text-white">A</span>
          <span className="font-black text-slate-950">Aristos B2B Marketplace</span>
        </Link>
        <h1 className="text-3xl font-black text-slate-950">Login</h1>
        <p className="mt-2 text-sm text-slate-600">Role-based redirects send buyers, suppliers, and admins to their workspace.</p>
        <form className="mt-6 grid gap-3">
          <input className="field" type="email" placeholder="Email address" />
          <input className="field" type="password" placeholder="Password" />
          <button className="primary-button">Login</button>
        </form>
        <div className="mt-4 flex justify-between text-sm font-semibold">
          <Link href="/auth/forgot-password" className="text-teal-700">Forgot password?</Link>
          <Link href="/auth/register" className="text-slate-700">Create account</Link>
        </div>
      </section>
    </main>
  );
}
