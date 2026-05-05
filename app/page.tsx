import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { foodCategories } from "@/lib/tequila-data";

const previewCategories = foodCategories.slice(1, 5);

export default function HomePage() {
  return (
    <>
      <section
        className="relative flex min-h-screen items-center justify-center bg-ink bg-cover bg-center px-5 pt-20 text-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,26,26,.58), rgba(26,26,26,.58)), url(https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1800&q=80)"
        }}
      >
        <div className="site-shell">
          <h1 className="hero-title mx-auto max-w-5xl font-display text-6xl font-bold leading-none text-white md:text-8xl">
            Tequila Lounge
          </h1>
          <p className="hero-subtitle mx-auto mt-6 max-w-xl text-lg font-medium leading-8 text-white md:text-2xl">
            Latin food and cocktails in Vancouver.
          </p>
          <div className="hero-actions mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/menu" className="button-primary">
              View Menu
            </Link>
            <a href="tel:+16046855555" className="button-secondary">
              Call Us
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-10">
        <div className="site-shell grid gap-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:items-center">
          <p className="max-w-2xl text-lg leading-8 text-gray">
            Weekend lunch, evening dining, and tequila-forward cocktails in the heart of Gastown. The room is bright,
            social, and built for quick bites that turn into a full night out.
          </p>
          <InfoTile icon={<Clock size={22} />} title="Hours" text="Wed-Sun, 12pm-late" />
          <InfoTile icon={<MapPin size={22} />} title="Location" text="136 W Cordova St" />
          <InfoTile icon={<Phone size={22} />} title="Phone" text="+1 604 685 5555" />
        </div>
      </section>

      <section className="section-spacing">
        <div className="site-shell">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="font-bold uppercase text-teal">What We Serve</p>
              <h2 className="mt-3 font-display text-5xl font-bold text-ink">Food with color and rhythm.</h2>
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

      <section id="contact" className="bg-softblue/40 py-20">
        <div className="site-shell">
          <h2 className="font-display text-5xl font-bold text-ink">Find Us</h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_.8fr] lg:items-stretch">
            <iframe
              title="Map to Tequila Lounge"
              className="h-[300px] w-full rounded-md border-0 shadow-lg md:h-[420px]"
              loading="lazy"
              src="https://www.google.com/maps?q=136%20W%20Cordova%20St%2C%20Vancouver%2C%20BC%20V6B%202N2&output=embed"
            />
            <div className="rounded-md border border-white/10 bg-white/[0.03] p-8 shadow-lg backdrop-blur-sm">
              <h3 className="font-display text-3xl font-bold text-ink">Gastown, Vancouver</h3>
              <address className="mt-5 not-italic leading-8 text-gray">
                136 W Cordova St
                <br />
                Vancouver, BC V6B 2N2
                <br />
                +1 604 685 5555
              </address>
              <p className="mt-6 leading-8 text-gray">Weekend lunch 12-3pm. Dinner and bar service Wednesday to Sunday.</p>
              <a href="mailto:hello@tequilalounge.ca" className="button-primary mt-7">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoTile({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex min-h-[88px] items-center gap-4 rounded-md border border-white/10 bg-white/[0.03] p-4 shadow-sm">
      <span className="text-teal">{icon}</span>
      <span>
        <span className="block font-bold text-ink">{title}</span>
        <span className="block text-sm text-gray">{text}</span>
      </span>
    </div>
  );
}
