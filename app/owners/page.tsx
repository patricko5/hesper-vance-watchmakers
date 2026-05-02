import type { Metadata } from "next";
import { OwnerRegistrationForm } from "@/components/forms/OwnerRegistrationForm";
import { ownerBenefits } from "@/lib/data";

export const metadata: Metadata = {
  title: "Owner Registration"
};

export default function OwnersPage() {
  return (
    <section className="atelier-grid grid gap-12 pb-28 pt-32 lg:grid-cols-[1fr_0.45fr]">
      <div>
        <p className="technical-label mb-4 text-[12px] text-brass">Owner registration</p>
        <h1 className="font-display text-6xl font-light leading-none text-bone md:text-7xl">Activate the record.</h1>
        <p className="mt-7 max-w-2xl text-base font-light leading-7 text-muted">
          Serial verification confirms the watch before owner details are attached to the service ledger.
        </p>
        <div className="mt-10">
          <OwnerRegistrationForm />
        </div>
      </div>
      <aside className="lg:sticky lg:top-24">
        <div className="rounded-md border border-white/10 bg-surface p-8">
          <p className="technical-label text-[12px] text-brass">Owner benefits</p>
          <ul className="mt-6 grid gap-4 text-sm leading-7 text-muted">
            {ownerBenefits.map((benefit) => (
              <li key={benefit} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </section>
  );
}
