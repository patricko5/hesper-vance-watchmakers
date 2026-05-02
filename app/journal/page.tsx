import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Journal"
};

const articles = [
  {
    title: "Why a fourth wheel turns once per minute",
    tag: "Escapement",
    excerpt: "The seconds hand is a consequence of gearing, not an ornament. The fourth wheel carries that rate cleanly."
  },
  {
    title: "The month cam as memory",
    tag: "Calendar",
    excerpt: "A perpetual calendar stores uneven months in steel. The lever reads the contour once each cycle."
  },
  {
    title: "Bluing screws without hiding the slot",
    tag: "Finishing",
    excerpt: "Heat gives the color. Flatness keeps the slot honest under magnification."
  }
];

export default function JournalPage() {
  return (
    <section className="atelier-grid pb-28 pt-32">
      <p className="technical-label mb-4 text-[12px] text-brass">Journal</p>
      <h1 className="max-w-4xl font-display text-6xl font-light leading-none text-bone md:text-7xl">
        Movement notes for people who read the back first.
      </h1>
      <div className="mt-14 grid gap-6">
        {articles.map((article) => (
          <Link key={article.title} href="/movement" className="rounded-md border border-white/10 bg-surface p-8">
            <p className="technical-label text-[11px] text-brass">{article.tag}</p>
            <h2 className="mt-4 font-display text-4xl font-light text-bone">{article.title}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">{article.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
