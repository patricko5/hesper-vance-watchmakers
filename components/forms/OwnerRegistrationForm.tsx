"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { ErrorText, FormLabel } from "@/components/forms/FormBits";
import { getCountryOptions } from "@/lib/countries";
import { ownerRegistrationSchema } from "@/lib/validation";
import { addYears } from "@/lib/utils";

type OwnerValues = z.infer<typeof ownerRegistrationSchema>;

type VerifiedSerial = {
  serial: string;
  modelName: string;
  reference: string;
  productionDate: string;
};

function formatSerial(value: string) {
  const raw = value.replace(/[^a-z0-9]/gi, "").toUpperCase().slice(0, 10);
  const first = raw.slice(0, 4);
  const second = raw.slice(4, 6);
  const third = raw.slice(6, 10);
  return [first, second, third].filter(Boolean).join("-");
}

export function OwnerRegistrationForm() {
  const [serialInput, setSerialInput] = useState("");
  const [serialError, setSerialError] = useState<string | null>(null);
  const [verified, setVerified] = useState<VerifiedSerial | null>(null);
  const [receiptError, setReceiptError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{ ownerId: string; warrantyDate: string } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const countries = useMemo(() => getCountryOptions(), []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid }
  } = useForm<OwnerValues>({
    resolver: zodResolver(ownerRegistrationSchema),
    mode: "onChange"
  });

  const verifySerial = async () => {
    setSerialError(null);
    const formatted = formatSerial(serialInput);
    setSerialInput(formatted);
    const response = await fetch("/api/serials/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serial: formatted })
    });
    const payload = (await response.json()) as { serial?: VerifiedSerial; error?: string };
    if (!response.ok || !payload.serial) {
      setSerialError(payload.error ?? "Serial number not recognized. Contact concierge for assistance.");
      return;
    }
    setVerified(payload.serial);
    setValue("serial", formatted, { shouldValidate: true });
  };

  const onSubmit = async (values: OwnerValues) => {
    setServerError(null);
    const response = await fetch("/api/owners/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    const payload = (await response.json()) as { ownerId?: string; error?: string };
    if (!response.ok || !payload.ownerId) {
      setServerError(payload.error ?? "The registration could not be recorded.");
      return;
    }
    setConfirmation({
      ownerId: payload.ownerId,
      warrantyDate: addYears(values.purchaseDate, 5)
    });
  };

  if (confirmation) {
    return (
      <div className="rounded-md border border-brass/40 bg-surface p-8">
        <p className="technical-label text-[12px] text-brass">Owner registered</p>
        <h2 className="mt-4 font-display text-4xl font-light text-bone">{confirmation.ownerId}</h2>
        <p className="mt-5 text-sm leading-7 text-muted">
          Warranty active until {confirmation.warrantyDate}. The digital certificate is ready for download.
        </p>
        <a href="/api/owners/register?certificate=sample" className="button-secondary mt-7">
          Download certificate
        </a>
      </div>
    );
  }

  return (
    <div className="grid gap-8">
      <section className="rounded-md border border-white/10 bg-surface p-6 md:p-8">
        <p className="technical-label text-[12px] text-brass">Step 1 / Serial verification</p>
        <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto]">
          <div>
            <FormLabel htmlFor="serial" required>
              Serial number
            </FormLabel>
            <input
              id="serial"
              value={serialInput}
              onChange={(event) => setSerialInput(formatSerial(event.target.value))}
              placeholder="XXXX-XX-XXXX"
              maxLength={12}
            />
          </div>
          <button type="button" className="button-primary self-end" onClick={verifySerial}>
            Verify
          </button>
        </div>
        {serialError ? (
          <p className="mt-3 text-sm text-ruby" role="alert">
            {serialError}
          </p>
        ) : null}
      </section>

      {verified ? (
        <form className="grid gap-5 rounded-md border border-white/10 bg-surface p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register("serial")} />
          <div>
            <p className="technical-label text-[12px] text-brass">Step 2 / Registration</p>
            <dl className="mt-5 grid gap-3 rounded-md border border-white/10 p-4 text-sm md:grid-cols-3">
              <div>
                <dt className="text-muted">Model</dt>
                <dd className="mt-1 text-bone">{verified.modelName}</dd>
              </div>
              <div>
                <dt className="text-muted">Reference</dt>
                <dd className="mt-1 text-bone">{verified.reference}</dd>
              </div>
              <div>
                <dt className="text-muted">Production date</dt>
                <dd className="mt-1 text-bone">{verified.productionDate}</dd>
              </div>
            </dl>
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
                Phone
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
            <div>
              <FormLabel htmlFor="purchaseDate" required>
                Purchase date
              </FormLabel>
              <input id="purchaseDate" type="date" {...register("purchaseDate")} />
              <ErrorText error={errors.purchaseDate} />
            </div>
            <div>
              <FormLabel htmlFor="dealerLocation" required>
                Authorized dealer or boutique
              </FormLabel>
              <input id="dealerLocation" {...register("dealerLocation")} />
              <ErrorText error={errors.dealerLocation} />
            </div>
          </div>

          <div>
            <FormLabel htmlFor="receipt" required>
              Receipt upload
            </FormLabel>
            <input
              id="receipt"
              type="file"
              accept="application/pdf,image/*"
              onChange={(event) => {
                const file = event.target.files?.[0];
                setReceiptError(null);
                if (!file) {
                  setValue("receiptName", "", { shouldValidate: true });
                  return;
                }
                if (file.size > 10 * 1024 * 1024) {
                  setReceiptError("Receipt must be 10MB or smaller.");
                  setValue("receiptName", "", { shouldValidate: true });
                  return;
                }
                setValue("receiptName", file.name, { shouldValidate: true });
              }}
            />
            {receiptError ? <p className="mt-2 text-sm text-ruby">{receiptError}</p> : null}
            <ErrorText error={errors.receiptName} />
          </div>

          {serverError ? <p className="text-sm text-ruby">{serverError}</p> : null}
          <button type="submit" className="button-primary disabled:cursor-not-allowed disabled:opacity-40" disabled={!isValid || isSubmitting}>
            {isSubmitting ? "Registering" : "Register ownership"}
          </button>
        </form>
      ) : null}
    </div>
  );
}
