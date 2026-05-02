"use client";

import { useEffect, useState } from "react";

type CountdownProps = {
  target: string;
  className?: string;
};

function parts(target: string, now: number) {
  const distance = Math.max(0, new Date(target).getTime() - now);
  const days = Math.floor(distance / 86_400_000);
  const hours = Math.floor((distance % 86_400_000) / 3_600_000);
  const minutes = Math.floor((distance % 3_600_000) / 60_000);
  const seconds = Math.floor((distance % 60_000) / 1000);
  return [days, hours, minutes, seconds].map((part) => String(part).padStart(2, "0"));
}

export function Countdown({ target, className }: CountdownProps) {
  const [now, setNow] = useState(() => Date.now());
  const values = parts(target, now);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <time dateTime={target} className={className} aria-live="polite">
      {values.join(" : ")}
    </time>
  );
}
