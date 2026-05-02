import { NextResponse } from "next/server";
import { serialVerifySchema } from "@/lib/validation";

const serials = new Map([
  [
    "HV01-RG-0001",
    {
      serial: "HV01-RG-0001",
      modelName: "Hesper Calibre 01",
      reference: "H01-RG",
      productionDate: "2026-03-12"
    }
  ],
  [
    "HV03-SS-0012",
    {
      serial: "HV03-SS-0012",
      modelName: "Vance Chronograph",
      reference: "V03-SS",
      productionDate: "2026-01-28"
    }
  ],
  [
    "HV05-RG-0007",
    {
      serial: "HV05-RG-0007",
      modelName: "Hesper Lunar",
      reference: "H05-RG",
      productionDate: "2026-04-04"
    }
  ]
]);

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = serialVerifySchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "Serial number not recognized. Contact concierge for assistance." }, { status: 400 });
  }

  const serial = serials.get(parsed.data.serial);
  if (!serial) {
    return NextResponse.json({ error: "Serial number not recognized. Contact concierge for assistance." }, { status: 404 });
  }

  return NextResponse.json({ serial });
}
