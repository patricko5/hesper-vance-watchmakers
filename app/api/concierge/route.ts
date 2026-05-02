import { NextResponse } from "next/server";
import { persistSubmission, sendTransactionalEmail } from "@/lib/server/submissions";
import { reservationReference } from "@/lib/utils";
import { conciergeSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = conciergeSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid booking." }, { status: 400 });
  }

  const reference = reservationReference("HVB");

  await persistSubmission("conciergeBooking", {
    reference,
    fullName: parsed.data.fullName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    preferredLocation: parsed.data.preferredLocation,
    preferredDate: parsed.data.preferredDate,
    preferredWindow: parsed.data.preferredWindow,
    modelsOfInterest: parsed.data.modelsOfInterest,
    guests: parsed.data.guests,
    specialRequests: parsed.data.specialRequests ?? null
  });

  await sendTransactionalEmail({
    to: parsed.data.email,
    subject: `Concierge booking ${reference}`,
    text: `Your Hesper & Vance concierge request has been recorded as ${reference}. The desk will make contact within 48 hours.`
  });

  return NextResponse.json({ reference });
}
