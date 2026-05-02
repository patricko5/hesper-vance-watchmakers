import { z } from "zod";

export const emailSchema = z.string().trim().email("Enter a valid email address.");
export const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+\d[\d\s().-]{7,}$/, "Include a country code, for example +41 22 000 0000.");

const requiredText = z.string().trim().min(2, "This field is required.");

export const reservationSchema = z
  .object({
    fullName: requiredText,
    email: emailSchema,
    phone: phoneSchema,
    country: requiredText,
    existingClient: z.enum(["yes", "no"]),
    existingModelReference: z.string().trim().optional(),
    dealerRelationship: z.string().trim().optional(),
    preferredContact: z.enum(["email", "phone"]),
    notes: z.string().trim().max(500, "Use 500 characters or fewer.").optional(),
    editionSlug: requiredText,
    waitlist: z.boolean().default(false)
  })
  .superRefine((value, ctx) => {
    if (value.existingClient === "yes" && !value.existingModelReference?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["existingModelReference"],
        message: "Enter the existing model reference."
      });
    }
  });

export const conciergeSchema = z.object({
  fullName: requiredText,
  email: emailSchema,
  phone: phoneSchema,
  preferredLocation: requiredText,
  preferredDate: requiredText,
  preferredWindow: requiredText,
  modelsOfInterest: z.array(requiredText).min(1, "Select at least one model."),
  guests: z.coerce.number().min(1).max(4),
  specialRequests: z.string().trim().max(500).optional()
});

export const serialVerifySchema = z.object({
  serial: z
    .string()
    .trim()
    .regex(/^[A-Z0-9]{4}-[A-Z0-9]{2}-[A-Z0-9]{4}$/, "Use the format XXXX-XX-XXXX.")
});

export const ownerRegistrationSchema = z.object({
  serial: serialVerifySchema.shape.serial,
  fullName: requiredText,
  email: emailSchema,
  phone: phoneSchema,
  country: requiredText,
  purchaseDate: requiredText,
  dealerLocation: requiredText,
  receiptName: z.string().trim().min(1, "Upload a receipt.")
});
