"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { ErrorText, FormLabel } from "@/components/forms/FormBits";
import type { Model } from "@/lib/data";
import { conciergeSchema } from "@/lib/validation";

type ConciergeValues = z.infer<typeof conciergeSchema>;

const locations = ["Geneva Atelier", "Zurich", "London", "New York", "Hong Kong", "Tokyo", "Private Travel"];
const windows = ["Morning 09:00-12:00", "Afternoon 13:00-17:00", "Evening 18:00-21:00"];

function toDateInput(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function ConciergeForm({ models }: { models: Model[] }) {
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const { minDate, maxDate } = useMemo(() => {
    const min = new Date();
    min.setDate(min.getDate() + 14);
    const max = new Date();
    max.setMonth(max.getMonth() + 6);
    return { minDate: toDateInput(min), maxDate: toDateInput(max) };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = useForm<ConciergeValues>({
    resolver: zodResolver(conciergeSchema),
    mode: "onChange",
    defaultValues: {
      guests: 1,
      modelsOfInterest: []
    }
  });

  const onSubmit = async (values: ConciergeValues) => {
    setServerError(null);
    const response = await fetch("/api/concierge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    const payload = (await response.json()) as { reference?: string; error?: string };
    if (!response.ok || !payload.reference) {
      setServerError(payload.error ?? "The booking could not be recorded.");
      return;
    }
    setConfirmation(payload.reference);
  };

  if (confirmation) {
    return (
      <div className="rounded-md border border-brass/40 bg-surface p-8">
        <p className="technical-label text-[12px] text-brass">Booking recorded</p>
        <h2 className="mt-4 font-display text-4xl font-light text-bone">{confirmation}</h2>
        <p className="mt-5 text-sm leading-7 text-muted">The concierge desk will make contact within 48 hours.</p>
      </div>
    );
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
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
            Phone
          </FormLabel>
          <input id="phone" type="tel" placeholder="+41 22 000 0000" autoComplete="tel" {...register("phone")} />
          <ErrorText error={errors.phone} />
        </div>
        <div>
          <FormLabel htmlFor="preferredLocation" required>
            Preferred location
          </FormLabel>
          <select id="preferredLocation" {...register("preferredLocation")}>
            <option value="">Select location</option>
            {locations.map((location) => (
              <option key={location}>{location}</option>
            ))}
          </select>
          <ErrorText error={errors.preferredLocation} />
        </div>
        <div>
          <FormLabel htmlFor="preferredDate" required>
            Preferred date
          </FormLabel>
          <input id="preferredDate" type="date" min={minDate} max={maxDate} {...register("preferredDate")} />
          <ErrorText error={errors.preferredDate} />
        </div>
        <div>
          <FormLabel htmlFor="preferredWindow" required>
            Preferred time window
          </FormLabel>
          <select id="preferredWindow" {...register("preferredWindow")}>
            <option value="">Select window</option>
            {windows.map((windowName) => (
              <option key={windowName}>{windowName}</option>
            ))}
          </select>
          <ErrorText error={errors.preferredWindow} />
        </div>
      </div>

      <fieldset>
        <legend className="mb-3 text-sm text-muted">
          Models of interest <span className="text-brass">*</span>
        </legend>
        <div className="grid gap-3 md:grid-cols-2">
          {[...models.map((model) => model.name), "Surprise me"].map((name) => (
            <label key={name} className="flex items-center gap-3 rounded-md border border-white/10 px-4 py-3 text-sm text-bone">
              <input type="checkbox" value={name} className="h-4 w-4 accent-brass" {...register("modelsOfInterest")} />
              {name}
            </label>
          ))}
        </div>
        <ErrorText error={errors.modelsOfInterest} />
      </fieldset>

      <div className="grid gap-5 md:grid-cols-[160px_1fr]">
        <div>
          <FormLabel htmlFor="guests" required>
            Guests
          </FormLabel>
          <input id="guests" type="number" min="1" max="4" {...register("guests")} />
          <ErrorText error={errors.guests} />
        </div>
        <div>
          <FormLabel htmlFor="specialRequests">Special requests</FormLabel>
          <textarea id="specialRequests" {...register("specialRequests")} />
        </div>
      </div>

      {serverError ? <p className="text-sm text-ruby">{serverError}</p> : null}
      <button type="submit" className="button-primary disabled:cursor-not-allowed disabled:opacity-40" disabled={!isValid || isSubmitting}>
        {isSubmitting ? "Recording" : "Request viewing"}
      </button>
    </form>
  );
}
