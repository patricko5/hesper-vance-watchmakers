import type { Metadata } from "next";
import { MenuCard } from "@/components/MenuCard";
import { cocktails, drinks, tequilaSelection } from "@/lib/tequila-data";

export const metadata: Metadata = {
  title: "Bar Menu",
  description: "Cocktails, tequila, beer, wine, and non-alcoholic drinks at Tequila Lounge."
};

export default function BarMenuPage() {
  return (
    <>
      <section
        className="bg-ink bg-cover bg-center pt-32 text-white"
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,26,26,.72), rgba(26,26,26,.72)), url(https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1800&q=80)"
        }}
      >
        <div className="site-shell pb-16">
          <p className="font-bold uppercase text-softblue">Tequila First</p>
          <h1 className="mt-3 font-display text-6xl font-bold">The Bar</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/90">
            Bright cocktails, agave spirits, and compact drink lists for the table.
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="site-shell">
          <h2 className="font-display text-5xl font-bold text-ink">Cocktails</h2>
          <div className="menu-grid mt-8">
            {cocktails.map((item) => (
              <MenuCard key={item.name} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#22343a] py-20 text-white">
        <div className="site-shell">
          <h2 className="font-display text-5xl font-bold">Tequila Spotlight</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              ["Fortaleza Blanco", "Mineral, citrus, cooked agave."],
              ["El Tesoro Extra Anejo", "Oak spice, caramel, dried fruit."],
              ["Clase Azul Plata", "Clean agave, pepper, silk finish."]
            ].map(([name, note]) => (
              <article key={name} className="rounded-md border border-white/15 bg-white/10 p-6">
                <div
                  className="mb-5 h-56 rounded bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url(https://images.unsplash.com/photo-1596138065586-644a5859bfa7?auto=format&fit=crop&w=900&q=80)"
                  }}
                />
                <h3 className="font-display text-3xl font-bold">{name}</h3>
                <p className="mt-2 text-white/76">{note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="site-shell grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <h2 className="font-display text-5xl font-bold text-ink">Tequila Selection</h2>
            <table className="mt-7 w-full overflow-hidden rounded-md bg-white shadow-sm">
              <thead className="bg-softblue text-left text-teal">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Price</th>
                </tr>
              </thead>
              <tbody>
                {tequilaSelection.map(([name, price]) => (
                  <tr key={name} className="border-t border-black/10">
                    <td className="p-4 text-gray">{name}</td>
                    <td className="p-4 font-bold text-teal">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid gap-6">
            <DrinkList title="Beer" items={drinks.beer} />
            <DrinkList title="Wine" items={drinks.wine} />
            <DrinkList title="Non-Alcoholic" items={drinks.zero} />
          </div>
        </div>
      </section>
    </>
  );
}

function DrinkList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-md bg-white p-6 shadow-sm">
      <h3 className="font-display text-3xl font-bold text-teal">{title}</h3>
      <ul className="mt-4 space-y-3 text-gray">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
