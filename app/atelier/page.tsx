import type { Metadata } from "next";
import { ProductVisual } from "@/components/ProductVisual";

export const metadata: Metadata = {
  title: "Atelier"
};

export default function AtelierPage() {
  return (
    <section className="atelier-grid pb-28 pt-32">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="technical-label mb-4 text-[12px] text-brass">Atelier</p>
          <h1 className="font-display text-6xl font-light leading-none text-bone md:text-7xl">
            The bench is arranged around the movement.
          </h1>
        </div>
        <p className="max-w-2xl text-base font-light leading-7 text-muted">
          Hesper &amp; Vance began as a two-person finishing room in Geneva. The workshop now builds complete calibres in
          numbered sequences. Every plate is inspected under the same north-facing light before assembly.
        </p>
      </div>
      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {["Train layout", "Bridge finishing", "Final regulation"].map((title, index) => (
          <article key={title}>
            <ProductVisual name={title} material={index === 1 ? "Rose Gold" : "Platinum"} index={index + 150} />
            <h2 className="mt-5 font-display text-3xl font-light text-bone">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              Measurements are written before polishing begins. The record follows the part until casing.
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
