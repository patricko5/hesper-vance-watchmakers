"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Countdown } from "@/components/Countdown";
import { ReservationForm } from "@/components/forms/ReservationForm";
import type { Edition } from "@/lib/data";
import { cx } from "@/lib/utils";

type EditionsClientProps = {
  editions: Edition[];
};

function ctaFor(status: Edition["status"]) {
  if (status === "Sold Out") return "Closed";
  if (status === "Waitlist Only") return "Join waitlist";
  if (status === "Coming Soon") return "Register interest";
  return "Reserve";
}

export function EditionsClient({ editions }: EditionsClientProps) {
  const [activeSlug, setActiveSlug] = useState(editions[0]?.slug ?? "");
  const active = editions.find((edition) => edition.slug === activeSlug) ?? editions[0];

  return (
    <>
      <div className="grid gap-6">
        {editions.map((edition) => (
          <article
            key={edition.slug}
            className={cx(
              "grid min-h-[480px] gap-8 rounded-md border bg-surface p-8 md:grid-cols-[1fr_auto] md:items-end md:p-12",
              activeSlug === edition.slug ? "border-brass/50" : "border-white/10"
            )}
          >
            <div className="self-start">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span
                  className={cx(
                    "technical-label rounded-sm border px-3 py-1 text-[11px]",
                    edition.status === "Coming Soon" ? "border-ruby/50 text-ruby" : "border-brass/40 text-brass"
                  )}
                >
                  {edition.status}
                </span>
                <span className="technical-label text-[11px] text-muted">Limited to {edition.limit} pieces</span>
              </div>
              <h2 className="max-w-4xl font-display text-6xl font-light leading-none text-bone">{edition.name}</h2>
              <p className="mt-7 max-w-2xl text-sm leading-7 text-muted">{edition.description}</p>
              {edition.status === "Coming Soon" ? (
                <div className="mt-8">
                  <p className="technical-label mb-3 text-[11px] text-muted">Reservation opening</p>
                  <Countdown target={edition.reservationOpen} className="font-mono text-3xl text-bone" />
                </div>
              ) : null}
            </div>
            <button
              type="button"
              className={cx("button-primary self-end", edition.status === "Sold Out" && "pointer-events-none opacity-40")}
              onClick={() => setActiveSlug(edition.slug)}
              disabled={edition.status === "Sold Out"}
            >
              {ctaFor(edition.status)}
              {edition.status !== "Sold Out" ? <ArrowRight size={16} aria-hidden="true" /> : null}
            </button>
          </article>
        ))}
      </div>

      {active && active.status !== "Sold Out" ? (
        <section id="reservation-form" className="mt-12">
          <ReservationForm edition={active} waitlist={active.status === "Waitlist Only"} />
        </section>
      ) : null}
    </>
  );
}
