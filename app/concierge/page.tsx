import type { Metadata } from "next";
import { ConciergeForm } from "@/components/forms/ConciergeForm";
import { ProductVisual } from "@/components/ProductVisual";
import { models } from "@/lib/data";

export const metadata: Metadata = {
  title: "Concierge Booking"
};

export default function ConciergePage() {
  return (
    <section className="atelier-grid grid gap-12 pb-28 pt-32 lg:grid-cols-2 lg:items-start">
      <div>
        <p className="technical-label mb-4 text-[12px] text-brass">Concierge booking</p>
        <h1 className="font-display text-6xl font-light leading-none text-bone md:text-7xl">Private viewing.</h1>
        <p className="mt-7 max-w-xl text-base font-light leading-7 text-muted">
          Select a location and window. The booking request is reviewed by the atelier before travel pieces are assigned.
        </p>
        <div className="mt-10 rounded-md border border-white/10 bg-surface p-6 md:p-8">
          <ConciergeForm models={models} />
        </div>
      </div>
      <div className="lg:sticky lg:top-24">
        <ProductVisual name="Geneva atelier bench" material="White Gold" complication="perpetual calendar" index={120} />
        <p className="technical-label mt-4 text-[11px] text-muted">Geneva atelier / movement bench</p>
      </div>
    </section>
  );
}
