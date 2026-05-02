"use client";

import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductVisual } from "@/components/ProductVisual";
import type { Model } from "@/lib/data";
import { formatChf } from "@/lib/utils";

type CollectionGridProps = {
  models: Model[];
};

const materials = ["All", "Stainless Steel", "Rose Gold", "White Gold", "Platinum"];
const complications = ["All", "Time Only", "Chronograph", "Perpetual Calendar", "Moon Phase", "Tourbillon"];
const sortOptions = ["Newest", "Price ascending", "Price descending", "Reference number"];

export function CollectionGrid({ models }: CollectionGridProps) {
  const [material, setMaterial] = useState("All");
  const [complication, setComplication] = useState("All");
  const [maxPrice, setMaxPrice] = useState(200000);
  const [sort, setSort] = useState("Newest");

  const filtered = useMemo(() => {
    const matches = models.filter((model) => {
      const materialMatches = material === "All" || model.caseMaterial === material;
      const complicationMatches =
        complication === "All" || model.complication.toLowerCase() === complication.toLowerCase();
      return materialMatches && complicationMatches && model.priceChf <= maxPrice;
    });

    return matches.sort((a, b) => {
      if (sort === "Price ascending") return a.priceChf - b.priceChf;
      if (sort === "Price descending") return b.priceChf - a.priceChf;
      if (sort === "Reference number") return a.reference.localeCompare(b.reference);
      return b.releaseOrder - a.releaseOrder;
    });
  }, [complication, material, maxPrice, models, sort]);

  return (
    <div>
      <div className="mb-10 rounded-md border border-white/10 bg-surface/72 p-5">
        <div className="mb-5 flex items-center gap-3">
          <SlidersHorizontal size={18} className="text-brass" aria-hidden="true" />
          <p className="technical-label text-[12px] text-muted">Filters</p>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <label className="text-sm text-muted">
            Case material
            <select className="mt-2" value={material} onChange={(event) => setMaterial(event.target.value)}>
              {materials.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="text-sm text-muted">
            Complication
            <select className="mt-2" value={complication} onChange={(event) => setComplication(event.target.value)}>
              {complications.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="text-sm text-muted">
            Price range
            <input
              className="mt-2 accent-brass"
              type="range"
              min="30000"
              max="200000"
              step="1000"
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
            />
            <span className="technical-label mt-2 block text-[11px] text-brass">To {formatChf(maxPrice)}</span>
          </label>
          <label className="text-sm text-muted">
            Sort
            <select className="mt-2" value={sort} onChange={(event) => setSort(event.target.value)}>
              {sortOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((model, index) => (
          <Link key={model.slug} href={`/collection/${model.slug}`} className="rounded-md border border-white/10 bg-surface/72 p-4">
            <ProductVisual name={model.name} material={model.caseMaterial} complication={model.complication} index={index + 20} />
            <div className="pt-5">
              <h2 className="font-display text-[32px] font-light text-bone">{model.name}</h2>
              <p className="technical-label mt-2 text-[14px] text-muted">{model.reference}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {[model.caseMaterial, model.movementType, model.complication].map((tag) => (
                  <span key={tag} className="rounded-sm border border-white/10 px-3 py-1 text-xs text-muted">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-brass">{formatChf(model.priceChf)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
