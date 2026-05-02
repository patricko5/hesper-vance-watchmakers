import { appendFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

type RecordType = "reservation" | "waitlist" | "conciergeBooking" | "ownerRegistration";

type PrismaLike = {
  reservation?: { create: (args: { data: Record<string, unknown> }) => Promise<unknown> };
  waitlist?: { create: (args: { data: Record<string, unknown> }) => Promise<unknown> };
  conciergeBooking?: { create: (args: { data: Record<string, unknown> }) => Promise<unknown> };
  ownerRegistration?: { create: (args: { data: Record<string, unknown> }) => Promise<unknown> };
};

type PrismaConstructor = new () => PrismaLike;

declare global {
  var hvPrisma: PrismaLike | undefined;
}

async function getPrisma() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  try {
    if (!globalThis.hvPrisma) {
      const prismaModule = (await import("@prisma/client")) as unknown as { PrismaClient: PrismaConstructor };
      globalThis.hvPrisma = new prismaModule.PrismaClient();
    }
    return globalThis.hvPrisma;
  } catch {
    return null;
  }
}

async function appendLocal(type: RecordType, data: Record<string, unknown>) {
  const dir = join(process.cwd(), ".local-data");
  await mkdir(dir, { recursive: true });
  await appendFile(join(dir, `${type}.jsonl`), `${JSON.stringify({ createdAt: new Date().toISOString(), ...data })}\n`);
}

export async function persistSubmission(type: RecordType, data: Record<string, unknown>) {
  const prisma = await getPrisma();

  if (prisma) {
    const model = prisma[type];
    if (model) {
      try {
        await model.create({ data });
        return;
      } catch {
        await appendLocal(type, { ...data, persistenceFallback: "prisma-write-failed" });
        return;
      }
    }
  }

  await appendLocal(type, data);
}

export async function sendTransactionalEmail({
  to,
  subject,
  text
}: {
  to: string;
  subject: string;
  text: string;
}) {
  const token = process.env.POSTMARK_SERVER_TOKEN;
  const from = process.env.POSTMARK_FROM_EMAIL;

  if (!token || !from) {
    return;
  }

  await fetch("https://api.postmarkapp.com/email", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Postmark-Server-Token": token
    },
    body: JSON.stringify({
      From: from,
      To: to,
      Subject: subject,
      TextBody: text,
      MessageStream: "outbound"
    })
  });
}
