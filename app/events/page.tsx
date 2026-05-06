import type { Metadata } from "next";
import Link from "next/link";
import { events } from "@/lib/tequila-data";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming Tequila Lounge programming and private event booking information."
};

export default function EventsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-32 bg-cover bg-center" style={{ backgroundImage: "url('/party-bg.png')"  }}>
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 site-shell pb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-teal">Programming</p>
          <h1 className="mt-3 max-w-3xl font-display text-6xl font-bold leading-tight text-white">Events at the lounge.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/60">
            Latin nights, tequila tastings, brunch sessions, and private gatherings in Gastown.
          </p>
        </div>
      </section>

      {/* ── Upcoming Events ── */}
      <section className="section-spacing">
        <div className="site-shell">
          <h2 className="font-display text-5xl font-bold text-white">Upcoming Events</h2>
          {events.length ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {events.map((event) => (
                <article key={event.title} className="glass-card p-6">
                  <div className="mb-5 inline-flex min-h-[64px] min-w-[72px] items-center justify-center rounded-md bg-teal px-4 text-center font-bold text-[#0C0A09]">
                    {event.date}
                  </div>
                  <h3 className="font-display text-3xl font-bold text-white">{event.title}</h3>
                  <p className="mt-3 leading-7 text-white/60">{event.description}</p>
                  <p className="mt-5 font-bold text-teal">{event.time}</p>
                </article>
              ))}
            </div>
          ) : (
            <p className="glass-card mt-8 p-8 text-white/60">Stay tuned for upcoming events.</p>
          )}
        </div>
      </section>

      {/* ── Private Events CTA ── */}
      <section className="relative py-20 bg-cover bg-center" style={{ backgroundImage: "url('/party-bg.png')" }}>
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 site-shell grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="font-display text-5xl font-bold text-white">Host Your Event Here</h2>
            <p className="mt-5 max-w-2xl leading-8 text-white/60">
              Book the lounge for birthdays, team dinners, tasting nights, and private celebrations with Latin food,
              cocktails, and a room that already has momentum.
            </p>
          </div>
          <Link href="/#contact" className="button-primary">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
