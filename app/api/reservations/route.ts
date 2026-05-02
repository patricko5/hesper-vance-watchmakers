import { NextResponse } from "next/server";
import { editions } from "@/lib/data";
import { persistSubmission, sendTransactionalEmail } from "@/lib/server/submissions";
import { reservationReference } from "@/lib/utils";
import { reservationSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = reservationSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid reservation." }, { status: 400 });
  }

  const edition = editions.find((item) => item.slug === parsed.data.editionSlug);
  if (!edition) {
    return NextResponse.json({ error: "Edition not found." }, { status: 404 });
  }

  const reference = reservationReference("HV");
  const type = parsed.data.waitlist || edition.status === "Waitlist Only" ? "waitlist" : "reservation";

  await persistSubmission(type, {
    reference,
    editionSlug: parsed.data.editionSlug,
    fullName: parsed.data.fullName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    country: parsed.data.country,
    existingClient: parsed.data.existingClient === "yes",
    existingModelReference: parsed.data.existingModelReference ?? null,
    dealerRelationship: parsed.data.dealerRelationship ?? null,
    preferredContact: parsed.data.preferredContact,
    notes: parsed.data.notes ?? null
  });

  await sendTransactionalEmail({
    to: parsed.data.email,
    subject: `${edition.name} request ${reference}`,
    text: `Your Hesper & Vance ${type} request has been recorded as ${reference}.`
  });

  return NextResponse.json({
    reference,
    waitlist: type === "waitlist",
    positionMessage: type === "waitlist" ? "Position will be confirmed after concierge review." : undefined
  });
}
