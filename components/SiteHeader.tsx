import Link from "next/link";

const links = [
  { href: "/movement", label: "Movement" },
  { href: "/collection", label: "Collection" },
  { href: "/editions", label: "Editions" },
  { href: "/concierge", label: "Concierge" },
  { href: "/owners", label: "Owners" }
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-graphite/78 backdrop-blur-xl">
      <nav className="atelier-grid flex h-16 items-center justify-between gap-6">
        <Link href="/" className="font-display text-[22px] font-light tracking-normal text-bone">
          Hesper &amp; Vance
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-underline technical-label text-[11px] text-muted hover:text-bone"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Link href="/editions" className="button-secondary hidden md:inline-flex">
          Reserve
        </Link>
      </nav>
    </header>
  );
}
