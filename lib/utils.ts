export function formatChf(value: number) {
  return `CHF ${new Intl.NumberFormat("en-US").format(value)}`;
}

export function formatUsdFromChf(value: number) {
  const quarterlyRate = 1.1;
  return `USD ${new Intl.NumberFormat("en-US").format(Math.round(value * quarterlyRate))}`;
}

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function reservationReference(prefix: "HV" | "HVB" | "HVO" = "HV") {
  const year = new Date().getFullYear();
  const n = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${year}-${n}`;
}

export function addYears(date: string, years: number) {
  const next = new Date(date);
  next.setFullYear(next.getFullYear() + years);
  return next.toISOString().slice(0, 10);
}
