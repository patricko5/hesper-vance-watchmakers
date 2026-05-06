import type { MenuItem } from "@/lib/tequila-data";

export function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="food-card">
      <div className="food-card-image" style={{ backgroundImage: `url(${item.image})` }} />
      <div className="flex min-h-[150px] flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <h4 className="font-display text-2xl text-white">{item.name}</h4>
          <p className="shrink-0 font-semibold text-teal">{item.price}</p>
        </div>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/60">{item.descriptor}</p>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
          {item.addOn && <span className="addon-label">{item.addOn}</span>}
          {item.tags?.map((tag) => (
            <span key={tag} className="tag-label">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
