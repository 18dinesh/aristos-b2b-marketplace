import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-4">
      <section className="card w-full max-w-md p-6">
        <h1 className="text-3xl font-black text-slate-950">Reset Password</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">Placeholder flow for email or phone-based password recovery.</p>
        <form className="mt-6 grid gap-3">
          <input className="field" placeholder="Email or phone" />
          <button className="primary-button">Send reset link</button>
        </form>
        <Link href="/auth/login" className="mt-4 block text-sm font-semibold text-teal-700">Back to login</Link>
      </section>
    </main>
  );
}
