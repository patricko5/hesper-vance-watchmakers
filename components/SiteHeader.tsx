"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/bar-menu", label: "Bar Menu" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact Us" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll(); // check on mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClass = scrolled
    ? "site-header site-header-scrolled"
    : "site-header";

  return (
    <header className={headerClass}>
      <nav className="site-shell flex h-20 items-center justify-between gap-6">
        <Link href="/" className="logo-lockup" onClick={() => setOpen(false)} aria-label="Tequila Lounge home">
          <Image
            src="/brand/logo.png"
            alt="Tequila Lounge"
            width={185}
            height={67}
            priority
            className="logo-image"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href} className={active ? "nav-link nav-link-active" : "nav-link"}>
                {link.label}
              </Link>
            );
          })}
        </div>

        <a href="tel:+16046855555" className="button-primary desktop-call-button">
          Call Us
        </a>

        <div className="mobile-header-actions">
          <a href="tel:+16046855555" className="button-primary mobile-call-button" onClick={() => setOpen(false)}>
            Call Us
          </a>
          <button
            type="button"
            className="icon-button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div className={open ? "mobile-drawer mobile-drawer-open" : "mobile-drawer"}>
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="mobile-nav-link" onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
        <a href="tel:+16046855555" className="button-primary mt-4 w-full" onClick={() => setOpen(false)}>
          Call Us
        </a>
      </div>
    </header>
  );
}
