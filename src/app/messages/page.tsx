import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { conversations } from "@/lib/data";

export default function MessagesPage() {
  return (
    <>
      <Header />
      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[340px_1fr]">
        <aside className="card p-4">
          <h1 className="text-2xl font-black text-slate-950">Message Center</h1>
          <input className="field mt-4" placeholder="Search conversations" />
          <div className="mt-4 grid gap-2">
            {conversations.map((conversation) => (
              <button key={conversation.id} className="rounded border border-slate-200 p-3 text-left hover:border-teal-500">
                <div className="flex justify-between gap-2"><b>{conversation.subject}</b><span className="text-xs text-slate-500">{conversation.time}</span></div>
                <p className="mt-1 line-clamp-2 text-sm text-slate-600">{conversation.lastMessage}</p>
              </button>
            ))}
          </div>
        </aside>
        <section className="card flex min-h-[620px] flex-col p-4">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-xl font-black text-slate-950">Inquiry and negotiation thread</h2>
            <p className="text-sm text-slate-600">Messages, RFQ quotes, order updates, unread states, timestamps, and attachment placeholders remain inside the platform.</p>
          </div>
          <div className="flex-1 space-y-3 py-4">
            {["Can you confirm MOQ and carton dimensions?", "MOQ is 1,000 units. We can share a product sample invoice.", "Please include FOB terms and inspection timing."].map((message, index) => (
              <div key={message} className={`max-w-xl rounded p-3 text-sm ${index % 2 ? "ml-auto bg-teal-700 text-white" : "bg-slate-100 text-slate-700"}`}>{message}</div>
            ))}
          </div>
          <div className="flex gap-2 border-t border-slate-200 pt-3">
            <input className="field" placeholder="Write a message" />
            <button className="primary-button">Send</button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
