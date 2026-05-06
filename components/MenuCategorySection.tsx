import type { MenuCategory } from "@/lib/tequila-data";
import { MenuCard } from "@/components/MenuCard";

export function MenuCategorySection({ category }: { category: MenuCategory }) {
  return (
    <section id={category.id} className="scroll-mt-40 overflow-hidden">
      <div className="mb-12 text-center">
        <h2 className="font-display text-4xl font-bold text-white md:text-5xl">{category.name}</h2>
        <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-teal" />
        {category.subtitle ? (
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/60">{category.subtitle}</p>
        ) : null}
        {category.note ? (
          <p className="mx-auto mt-2 max-w-2xl text-sm font-medium text-white/60">{category.note}</p>
        ) : null}
      </div>
      <div className="menu-grid">
        {category.items.map((item) => (
          <MenuCard key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}
