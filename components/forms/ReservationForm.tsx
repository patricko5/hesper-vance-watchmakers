"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { ErrorText, FormLabel } from "@/components/forms/FormBits";
import type { Edition } from "@/lib/data";
import { getCountryOptions } from "@/lib/countries";
import { reservationSchema } from "@/lib/validation";

type ReservationValues = z.infer<typeof reservationSchema>;

type ReservationFormProps = {
  edition: Edition;
  waitlist?: boolean;
};

export function ReservationForm({ edition, waitlist = false }: ReservationFormProps) {
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const countries = useMemo(() => getCountryOptions(), []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid }
  } = useForm<ReservationValues>({
    resolver: zodResolver(reservationSchema),
    mode: "onChange",
    defaultValues: {
      editionSlug: edition.slug,
      existingClient: "no",
      preferredContact: "email",
      waitlist
    }
  });

  const existingClient = watch("existingClient");

  const onSubmit = async (values: ReservationValues) => {
    setServerError(null);
    const response = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, editionSlug: edition.slug, waitlist })
    });
    const payload = (await response.json()) as { reference?: string; error?: string };

    if (!response.ok || !payload.reference) {
      setServerError(payload.error ?? "The reservation could not be recorded.");
      return;
    }

    setConfirmation(payload.reference);
  };

  if (confirmation) {
    return (
      <div className="rounded-md border border-brass/40 bg-surface p-8">
        <p className="technical-label text-[12px] text-brass">{waitlist ? "Waitlist recorded" : "Reservation recorded"}</p>
        <h2 className="mt-4 font-display text-4xl font-light text-bone">{confirmation}</h2>
        <p className="mt-5 text-sm leading-7 text-muted">
          The atelier has received the request. A concierge will verify the details before the position is confirmed.
        </p>
      </div>
    );
  }

  return (
    <form className="grid gap-5 rounded-md border border-white/10 bg-surface p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register("editionSlug")} />
      <div>
        <p className="technical-label text-[12px] text-brass">{waitlist ? "Waitlist request" : "Reservation request"}</p>
        <h2 className="mt-3 font-display text-4xl font-light text-bone">{edition.name}</h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <FormLabel htmlFor="fullName" required>
            Full name
          </FormLabel>
          <input id="fullName" autoComplete="name" {...register("fullName")} />
          <ErrorText error={errors.fullName} />
        </div>
        <div>
          <FormLabel htmlFor="email" required>
            Email
          </FormLabel>
          <input id="email" type="email" autoComplete="email" {...register("email")} />
          <ErrorText error={errors.email} />
        </div>
        <div>
          <FormLabel htmlFor="phone" required>
            Phone with country code
          </FormLabel>
          <input id="phone" type="tel" placeholder="+41 22 000 0000" autoComplete="tel" {...register("phone")} />
          <ErrorText error={errors.phone} />
        </div>
        <div>
          <FormLabel htmlFor="country" required>
            Country of residence
          </FormLabel>
          <select id="country" {...register("country")}>
            <option value="">Select country</option>
            {countries.map((country) => (
              <option key={country}>{country}</option>
            ))}
          </select>
          <ErrorText error={errors.country} />
        </div>
      </div>

      <fieldset className="grid gap-3">
        <legend className="text-sm text-muted">
          Existing client <span className="text-brass">*</span>
        </legend>
        <div className="flex gap-5 text-sm text-bone">
          <label className="flex items-center gap-2">
            <input type="radio" value="yes" className="h-4 w-4 accent-brass" {...register("existingClient")} />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" value="no" className="h-4 w-4 accent-brass" {...register("existingClient")} />
            No
          </label>
        </div>
      </fieldset>

      {existingClient === "yes" ? (
        <div>
          <FormLabel htmlFor="existingModelReference" required>
            Existing model reference number
          </FormLabel>
          <input id="existingModelReference" placeholder="H01-RG" {...register("existingModelReference")} />
          <ErrorText error={errors.existingModelReference} />
        </div>
      ) : null}

      <div>
        <FormLabel htmlFor="dealerRelationship">Authorized dealer relationship</FormLabel>
        <input id="dealerRelationship" {...register("dealerRelationship")} />
      </div>

      <fieldset className="grid gap-3">
        <legend className="text-sm text-muted">
          Preferred contact method <span className="text-brass">*</span>
        </legend>
        <div className="flex gap-5 text-sm text-bone">
          <label className="flex items-center gap-2">
            <input type="radio" value="email" className="h-4 w-4 accent-brass" {...register("preferredContact")} />
            Email
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" value="phone" className="h-4 w-4 accent-brass" {...register("preferredContact")} />
            Phone
          </label>
        </div>
      </fieldset>

      <div>
        <FormLabel htmlFor="notes">Notes</FormLabel>
        <textarea id="notes" maxLength={500} {...register("notes")} />
        <ErrorText error={errors.notes} />
      </div>

      {serverError ? <p className="text-sm text-ruby">{serverError}</p> : null}
      <button type="submit" className="button-primary disabled:cursor-not-allowed disabled:opacity-40" disabled={!isValid || isSubmitting}>
        {isSubmitting ? "Recording" : waitlist ? "Join waitlist" : "Submit reservation"}
      </button>
    </form>
  );
}
