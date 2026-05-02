"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { ProductVisual } from "@/components/ProductVisual";
import type { Model } from "@/lib/data";
import { formatChf, formatUsdFromChf } from "@/lib/utils";

type ModelDetailClientProps = {
  model: Model;
  galleryAngles: string[];
};

export function ModelDetailClient({ model, galleryAngles }: ModelDetailClientProps) {
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [dial, setDial] = useState(model.dialColors[0]);
  const [strap, setStrap] = useState(model.straps[0]);

  const shift = (direction: number) => {
    setActiveImage((current) => {
      const safe = current ?? 0;
      return (safe + direction + galleryAngles.length) % galleryAngles.length;
    });
  };

  return (
    <>
      <section className="atelier-grid grid gap-12 pb-24 pt-32 lg:grid-cols-[minmax(0,0.6fr)_minmax(360px,0.4fr)]">
        <div>
          <div className="grid gap-4 md:grid-cols-2">
            {galleryAngles.map((angle, index) => (
              <button
                key={angle}
                type="button"
                className="text-left"
                onClick={() => setActiveImage(index)}
                aria-label={`Open ${angle} image`}
              >
                <ProductVisual
                  name={`${model.name} ${angle}`}
                  material={model.caseMaterial}
                  complication={model.complication}
                  index={index + 40}
                />
                <span className="technical-label mt-3 block text-[11px] text-muted">{angle}</span>
              </button>
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="technical-label text-[12px] text-brass">{model.reference}</p>
          <h1 className="mt-4 font-display text-6xl font-light leading-none text-bone">{model.name}</h1>
          <p className="mt-6 text-lg text-brass">
            {formatChf(model.priceChf)} <span className="text-muted">/ {formatUsdFromChf(model.priceChf)}</span>
          </p>
          <p className="mt-6 text-sm leading-7 text-muted">{model.description}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-muted">
              Dial color
              <select className="mt-2" value={dial} onChange={(event) => setDial(event.target.value)}>
                {model.dialColors.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="text-sm text-muted">
              Strap
              <select className="mt-2" value={strap} onChange={(event) => setStrap(event.target.value)}>
                {model.straps.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>

          <dl className="mt-9 divide-y divide-white/10 border-y border-white/10">
            {Object.entries(model.specs).map(([key, value]) => (
              <div key={key} className="grid grid-cols-[0.9fr_1.1fr] gap-4 py-3 text-sm">
                <dt className="text-muted">{key}</dt>
                <dd className="text-bone">{key === "Dial color" ? dial : key === "Strap" ? strap : value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={`/editions?model=${model.slug}`} className="button-primary">
              Reserve
            </Link>
            <Link href="/concierge" className="button-secondary">
              Book Concierge Viewing
            </Link>
          </div>
        </aside>
      </section>

      <section className="atelier-grid border-t border-white/10 py-20">
        <div className="grid gap-10 md:grid-cols-[0.45fr_0.55fr] md:items-center">
          <div>
            <p className="technical-label mb-3 text-[12px] text-brass">Inside the Movement</p>
            <h2 className="font-display text-5xl font-light text-bone">Follow the train under the bridge.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-muted">
              The explorer opens with this reference selected. The caseback view keeps the gear ratios running at their
              mechanical relationship.
            </p>
            <Link href={`/movement?model=${model.slug}`} className="button-secondary mt-7">
              Launch explorer
            </Link>
          </div>
          <ProductVisual
            name={`${model.name} movement thumbnail`}
            material={model.caseMaterial}
            complication={model.complication}
            index={70}
          />
        </div>
      </section>

      {activeImage !== null ? (
        <div
          className="fixed inset-0 z-[70] grid place-items-center bg-black/92 p-5"
          role="dialog"
          aria-modal="true"
          aria-label={`${galleryAngles[activeImage]} lightbox`}
        >
          <button
            type="button"
            className="absolute right-5 top-5 rounded-full border border-white/10 p-3 text-bone"
            onClick={() => setActiveImage(null)}
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>
          <button
            type="button"
            className="absolute left-5 top-1/2 rounded-full border border-white/10 p-3 text-bone"
            onClick={() => shift(-1)}
            aria-label="Previous image"
          >
            <ChevronLeft size={22} />
          </button>
          <div className="w-[min(90vw,900px)]">
            <ProductVisual
              name={`${model.name} ${galleryAngles[activeImage]}`}
              material={model.caseMaterial}
              complication={model.complication}
              index={activeImage + 80}
            />
            <p className="technical-label mt-4 text-center text-[12px] text-muted">{galleryAngles[activeImage]}</p>
          </div>
          <button
            type="button"
            className="absolute right-5 top-1/2 rounded-full border border-white/10 p-3 text-bone"
            onClick={() => shift(1)}
            aria-label="Next image"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      ) : null}
    </>
  );
}
