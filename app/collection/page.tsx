import type { Metadata } from "next";
import { CollectionGrid } from "@/components/CollectionGrid";
import { models } from "@/lib/data";

export const metadata: Metadata = {
  title: "Collection"
};

export default function CollectionPage() {
  return (
    <section className="atelier-grid pb-28 pt-32">
      <p className="technical-label mb-4 text-[12px] text-brass">Model catalog</p>
      <h1 className="max-w-4xl font-display text-6xl font-light leading-none text-bone md:text-7xl">
        Six calibres, each built around a visible mechanical question.
      </h1>
      <p className="mt-7 max-w-2xl text-base font-light leading-7 text-muted">
        The catalog is arranged by construction, not by occasion. Materials and complications can be filtered without
        disturbing the sequence.
      </p>
      <div className="mt-12">
        <CollectionGrid models={models} />
      </div>
    </section>
  );
}
