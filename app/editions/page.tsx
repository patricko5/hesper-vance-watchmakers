import type { Metadata } from "next";
import { EditionsClient } from "@/components/EditionsClient";
import { editions } from "@/lib/data";

export const metadata: Metadata = {
  title: "Limited Editions"
};

export default function EditionsPage() {
  return (
    <section className="atelier-grid pb-28 pt-32">
      <p className="technical-label mb-4 text-[12px] text-ruby">Limited editions</p>
      <h1 className="max-w-4xl font-display text-6xl font-light leading-none text-bone md:text-7xl">
        Small sequences. Documented positions. No open inventory.
      </h1>
      <p className="mb-12 mt-7 max-w-2xl text-base font-light leading-7 text-muted">
        Each edition is reserved through the atelier. When a sequence closes, the same form becomes a waitlist request
        and the response includes a position note.
      </p>
      <EditionsClient editions={editions} />
    </section>
  );
}
