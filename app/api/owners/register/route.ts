import { NextResponse } from "next/server";
import { persistSubmission, sendTransactionalEmail } from "@/lib/server/submissions";
import { reservationReference } from "@/lib/utils";
import { ownerRegistrationSchema } from "@/lib/validation";

export async function GET() {
  const pdf = `%PDF-1.3
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 92 >>
stream
BT /F1 24 Tf 72 700 Td (Hesper & Vance Certificate of Authenticity) Tj 0 -40 Td (Digital record issued.) Tj ET
endstream
endobj
trailer
<< /Root 1 0 R >>
%%EOF`;

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=hesper-vance-certificate.pdf"
    }
  });
}

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = ownerRegistrationSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid owner registration." }, { status: 400 });
  }

  const ownerId = reservationReference("HVO");

  await persistSubmission("ownerRegistration", {
    ownerId,
    serial: parsed.data.serial,
    fullName: parsed.data.fullName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    country: parsed.data.country,
    purchaseDate: parsed.data.purchaseDate,
    dealerLocation: parsed.data.dealerLocation,
    receiptName: parsed.data.receiptName
  });

  await sendTransactionalEmail({
    to: parsed.data.email,
    subject: `Owner registration ${ownerId}`,
    text: `Your Hesper & Vance owner record has been created as ${ownerId}.`
  });

  return NextResponse.json({ ownerId });
}
