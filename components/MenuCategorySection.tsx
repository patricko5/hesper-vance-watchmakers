import type { MenuCategory } from "@/lib/tequila-data";
import { MenuCard } from "@/components/MenuCard";

export function MenuCategorySection({ category }: { category: MenuCategory }) {
  return (
    <section id={category.id} className="scroll-mt-36 border-t border-teal/20 py-12">
      <div className="mb-6">
        <h3 className="font-display text-4xl text-teal">{category.name}</h3>
        {category.subtitle ? (
          <p className="mt-1 text-sm text-gray">{category.subtitle}</p>
        ) : null}
        {category.note ? (
          <p className="mt-1 text-sm font-medium text-gray">{category.note}</p>
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
