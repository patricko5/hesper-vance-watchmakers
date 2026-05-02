import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Countdown } from "@/components/Countdown";
import { ReservationForm } from "@/components/forms/ReservationForm";
import { editions, getEdition } from "@/lib/data";

type PageProps = {
  params: {
    "edition-slug": string;
  };
};

export function generateStaticParams() {
  return editions.map((edition) => ({ "edition-slug": edition.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const edition = getEdition(params["edition-slug"]);
  return {
    title: edition?.name ?? "Edition"
  };
}

export default function EditionDetailPage({ params }: PageProps) {
  const edition = getEdition(params["edition-slug"]);
  if (!edition) {
    notFound();
  }

  return (
    <section className="atelier-grid grid gap-12 pb-28 pt-32 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="technical-label mb-4 text-[12px] text-ruby">{edition.status}</p>
        <h1 className="font-display text-6xl font-light leading-none text-bone md:text-7xl">{edition.name}</h1>
        <p className="mt-7 max-w-2xl text-base font-light leading-7 text-muted">{edition.description}</p>
        <p className="technical-label mt-8 text-[12px] text-muted">Limited to {edition.limit} pieces</p>
        {edition.status === "Coming Soon" ? (
          <div className="mt-8">
            <p className="technical-label mb-3 text-[11px] text-muted">Reservation opening</p>
            <Countdown target={edition.reservationOpen} className="font-mono text-3xl text-bone" />
          </div>
        ) : null}
      </div>
      {edition.status === "Sold Out" ? (
        <div className="rounded-md border border-white/10 bg-surface p-8">
          <p className="technical-label text-[12px] text-muted">Closed edition</p>
          <h2 className="mt-4 font-display text-4xl font-light text-bone">No new requests are being taken.</h2>
        </div>
      ) : (
        <ReservationForm edition={edition} waitlist={edition.status === "Waitlist Only"} />
      )}
    </section>
  );
}
