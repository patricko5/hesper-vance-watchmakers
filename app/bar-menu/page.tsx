import type { Metadata } from "next";
import { barMenuCategories } from "@/lib/bar-menu-data";
import { ScrollSpyNav } from "@/components/ScrollSpyNav";

export const metadata: Metadata = {
  title: "Bar Menu | Tequila Lounge",
  description: "Explore our curated selection of cocktails, draft beers, bottles, shots, and digestive drinks."
};

export default function BarMenuPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative bg-cover bg-center pb-20 pt-32 text-white md:pt-48"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1800&q=80)"
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 site-shell text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-teal">Libations</p>
          <h1 className="mt-4 font-display text-5xl font-bold md:text-7xl">Bar Menu</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80">
            Bright cocktails, agave spirits, and an extensive selection of draft beers and coolers.
          </p>
        </div>
      </section>

      {/* ── Sticky Nav ── */}
      <ScrollSpyNav items={barMenuCategories.map(c => ({ id: c.id, label: c.title }))} />

      {/* ── Menu Sections ── */}
      <div className="site-shell py-20">
        <div className="grid gap-24">
          {barMenuCategories.map((category) => (
            <section key={category.id} id={category.id} className="scroll-mt-40 overflow-hidden">
              <div className="mb-12 text-center">
                <h2 className="font-display text-4xl font-bold text-white md:text-5xl">{category.title}</h2>
                <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-teal" />
              </div>

              {category.id === "cocktails" ? (
                // Cocktails grid (larger cards for descriptions)
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {category.items.map((item) => (
                    <div key={item.name} className="glass-card flex h-full flex-col p-8 transition-transform hover:-translate-y-1">
                      <div className="mb-4 flex items-start justify-between gap-4">
                        <h3 className="font-display text-2xl font-bold text-white leading-tight">{item.name}</h3>
                        {item.price && <span className="font-bold text-teal text-xl">${item.price}</span>}
                      </div>
                      {item.description && <p className="text-sm leading-relaxed text-white/60 flex-grow">{item.description}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                // Other categories (denser lists inside a unified card)
                <div className="glass-card mx-auto max-w-4xl p-6 md:p-12">
                  <div className="grid gap-x-16 gap-y-8 md:grid-cols-2">
                    {category.items.map((item) => (
                      <div key={item.name} className="flex items-start justify-between gap-4 border-b border-[rgba(250,250,249,0.06)] pb-4">
                        <div>
                          <h3 className="font-bold text-white text-lg">{item.name}</h3>
                          {item.description && <p className="mt-1 text-sm text-white/50">{item.description}</p>}
                        </div>

                        <div className="flex flex-col items-end gap-1 text-right">
                          {item.price && <span className="font-bold text-teal text-lg">${item.price}</span>}
                          {item.options && (
                            <div className="flex flex-col gap-2 text-sm">
                              {item.options.map((opt) => (
                                <span key={opt.label} className="text-white/60">
                                  {opt.label} <span className="font-bold text-teal ml-2">${opt.price}</span>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
