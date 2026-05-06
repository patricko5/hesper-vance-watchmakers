import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { foodCategories } from "@/lib/tequila-data";

const previewCategories = foodCategories.slice(1, 5);

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex min-h-screen items-end justify-center overflow-hidden px-5 pb-20 pt-20 text-center">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          poster="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1800&q=80"
        >
          <source src="/tequila-video.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(12,10,9,0.10)] to-[rgba(12,10,9,0.50)]" />
        <div className="relative z-10 site-shell  ">
          {/* <h1 className="hero-title mx-auto max-w-5xl font-display text-6xl font-bold leading-none text-white md:text-8xl">
            Tequila Lounge
          </h1> */}
          <div className="hero-actions mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/menu" className="button-primary">
              View Menu
            </Link>
            <a href="tel:+16046855555" className="button-secondary">
              Call Us
            </a>
          </div>
          <p className="hero-subtitle mx-auto mt-6 max-w-xl text-lg font-medium leading-8 text-white/80 md:text-2xl">
            Latin food and cocktails in Vancouver.
          </p>
        </div>
      </section>

      {/* ── Info Bar ── */}
      <section className="border-t border-[rgba(202,138,4,0.12)] py-10">
        <div className="site-shell grid gap-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:items-center">
          <p className="max-w-2xl text-lg leading-8 text-white/60">
            Weekend lunch, evening dining, and tequila-forward cocktails in the heart of Gastown. The room is bright,
            social, and built for quick bites that turn into a full night out.
          </p>
          <InfoTile icon={<Clock size={22} />} title="Hours" text="Open Wed-Mon (Closed Tue)" />
          <InfoTile icon={<MapPin size={22} />} title="Location" text="136 W Cordova St" />
          <InfoTile icon={<Phone size={22} />} title="Phone" text="+1 604 685 5555" />
        </div>
      </section>

      {/* ── Menu Preview ── */}
      <section className="section-spacing">
        <div className="site-shell">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-teal">What We Serve</p>
              <h2 className="mt-3 font-display text-5xl font-bold text-white">Food with color and rhythm.</h2>
            </div>
            <Link href="/menu" className="button-primary">
              See Full Menu
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {previewCategories.map((category) => (
              <Link
                href={`/menu#${category.id}`}
                key={category.id}
                className="image-tile"
                style={{ backgroundImage: `url(${category.items[0].image})` }}
              >
                <span className="absolute bottom-6 left-6 z-10 font-display text-4xl font-bold text-white">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}

function InfoTile({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="glass-card flex min-h-[88px] items-center gap-4 p-4">
      <span className="text-teal">{icon}</span>
      <span>
        <span className="block font-bold text-white">{title}</span>
        <span className="block text-sm text-white/60">{text}</span>
      </span>
    </div>
  );
}
