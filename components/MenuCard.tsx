import type { MenuItem } from "@/lib/tequila-data";

export function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="food-card">
      <div className="food-card-image" style={{ backgroundImage: `url(${item.image})` }} />
      <div className="flex min-h-[150px] flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <h4 className="font-display text-2xl text-ink">{item.name}</h4>
          <p className="shrink-0 font-semibold text-teal">{item.price}</p>
        </div>
        <p className="mt-2 line-clamp-1 text-sm leading-6 text-gray">{item.descriptor}</p>
        {item.tags ? (
          <div className="mt-auto flex flex-wrap gap-2 pt-4">
            {item.tags.map((tag) => (
              <span key={tag} className="tag-label">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
