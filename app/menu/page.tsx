import type { Metadata } from "next";
import { MenuCategorySection } from "@/components/MenuCategorySection";
import { foodCategories, sides } from "@/lib/tequila-data";
import { ScrollSpyNav } from "@/components/ScrollSpyNav";

export const metadata: Metadata = {
  title: "Menu",
  description: "Browse Tequila Lounge brunch, antojitos, carne, mariscos, tacos, kids, sopas, and postres."
};

export default function MenuPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden pt-32"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&w=1800&q=80)"
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(12,10,9,0.70)] to-[rgba(12,10,9,0.92)]" />
        <div className="relative z-10 site-shell pb-12">
          <p className="text-sm font-bold uppercase tracking-widest text-teal">Lunch and Dinner</p>
          <h1 className="mt-3 max-w-3xl font-display text-6xl font-bold leading-tight text-white">Menu</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/60">
            Bold Latin flavors, handmade tortillas, and dishes built to share. From brunch to late-night bites in the heart of Gastown.
          </p>
        </div>
      </section>

      {/* ── Sticky Nav ── */}
      <ScrollSpyNav items={foodCategories.map(c => ({ id: c.id, label: c.name }))} />

      {/* ── Categories ── */}
      <div className="site-shell py-20">
        <div className="grid gap-24">
          {foodCategories.map((category) => (
            <MenuCategorySection key={category.id} category={category} />
          ))}

          {/* ── Sides ── */}
          <section className="glass-card p-6">
            <h3 className="font-display text-3xl font-bold text-white text-center">Sides</h3>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-teal" />
            <ul className="mt-8 grid gap-3 text-white/80 sm:grid-cols-2 lg:grid-cols-4">
              {sides.map((side) => (
                <li key={side} className="border-l-2 border-teal/40 pl-4">
                  {side}
                </li>
              ))}
            </ul>
          </section>

          <p className="text-center text-sm text-white/40">Prices subject to change. Some items available weekends 12–3 pm only.</p>
        </div>
      </div>
    </>
  );
}
