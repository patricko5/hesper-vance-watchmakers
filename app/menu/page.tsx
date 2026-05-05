import type { Metadata } from "next";
import { MenuCategorySection } from "@/components/MenuCategorySection";
import { foodCategories, sides } from "@/lib/tequila-data";

export const metadata: Metadata = {
  title: "Menu",
  description: "Browse Tequila Lounge brunch, antojitos, carne, mariscos, tacos, kids, sopas, and postres."
};

export default function MenuPage() {
  return (
    <>
      <section className="bg-softblue pt-32">
        <div className="site-shell pb-12">
          <p className="font-bold uppercase text-teal">Lunch and Dinner</p>
          <h1 className="mt-3 max-w-3xl font-display text-6xl font-bold leading-tight text-ink">Menu made to scan.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray">
            Curated hero dishes from each category. Each card keeps it simple: dish, price, and one clear line.
          </p>
        </div>
      </section>

      <nav className="sticky top-20 z-30 border-y border-black/10 bg-offwhite/95 backdrop-blur-md">
        <div className="site-shell flex gap-6 overflow-x-auto">
          {foodCategories.map((category) => (
            <a key={category.id} href={`#${category.id}`} className="nav-link shrink-0">
              {category.name}
            </a>
          ))}
        </div>
      </nav>

      <div className="site-shell pb-16">
        {foodCategories.map((category) => (
          <MenuCategorySection key={category.id} category={category} />
        ))}

        <section className="rounded-md bg-ink/80 p-6 shadow-sm">
          <h3 className="font-display text-3xl font-bold text-teal">Sides</h3>
          <ul className="mt-4 grid gap-3 text-white/90 sm:grid-cols-2 lg:grid-cols-4">
            {sides.map((side) => (
              <li key={side} className="border-l-2 border-teal/40 pl-4">
                {side}
              </li>
            ))}
          </ul>
        </section>

        <p className="py-8 text-sm text-gray">Prices subject to change. Some items available weekends 12-3pm only.</p>
      </div>
    </>
  );
}
