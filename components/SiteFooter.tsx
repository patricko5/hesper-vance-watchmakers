import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Phone, Mail } from "lucide-react";

const partners = [
  { name: "City of Vancouver", src: "/partners/cityofvancouver.png" },
  { name: "Eventbrite", src: "/partners/eventbrite.png" },
  { name: "Pioneer", src: "/partners/pioneer.png" },
  { name: "Government of Canada", src: "/partners/canada.png" },
  { name: "TransLink", src: "/partners/translink.png" },
  { name: "Parkopedia", src: "/partners/parkopedia.png" },
  { name: "Partner", src: "/partners/partner1.webp" },
  { name: "Partner", src: "/partners/partner2.webp" }
];

export function SiteFooter() {
  const track = [...partners, ...partners, ...partners];

  return (
    <footer className="w-full border-t border-[rgba(250,250,249,0.06)] bg-[rgba(12,10,9,0.95)]">
      {/* ── Main Footer ── */}
      <div className="w-full px-5 py-16 md:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[auto_1fr_1fr_1fr] md:gap-16">
          {/* Logo */}
          <div className="flex flex-col gap-4">
            <Link href="/" aria-label="Tequila Lounge home">
              <Image
                src="/brand/logo.png"
                alt="Tequila Lounge"
                width={200}
                height={75}
                className="logo-image"
              />
            </Link>
            <p className="max-w-[240px] text-base leading-7 text-white/40">
              Latin food and cocktails in the heart of Gastown.
            </p>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-4">
            <h4 className="flex items-center gap-2 text-base font-bold uppercase tracking-widest text-teal">
              <MapPin size={18} /> Location
            </h4>
            <address className="not-italic text-base leading-8 text-white/60">
              136 W Cordova St<br />
              Vancouver, BC V6B 2N2
            </address>
            <a href="https://maps.google.com/?q=136+W+Cordova+St,+Vancouver,+BC" target="_blank" rel="noopener noreferrer" className="text-base font-semibold text-teal hover:text-brass">
              Get Directions →
            </a>
          </div>

          {/* Hours */}
          <div className="flex flex-col gap-4">
            <h4 className="flex items-center gap-2 text-base font-bold uppercase tracking-widest text-teal">
              <Clock size={18} /> Hours
            </h4>
            <ul className="space-y-2 text-base leading-8 text-white/60">
              <li>Mon, Wed, Thu: 3 PM – 10 PM</li>
              <li>Fri: 3 PM – 2 AM</li>
              <li>Sat: 12 PM – 2 AM</li>
              <li>Sun: 12 PM – 10 PM</li>
              <li>Tue: Closed</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="flex items-center gap-2 text-base font-bold uppercase tracking-widest text-teal">
              <Phone size={18} /> Contact
            </h4>
            <a href="tel:+16046855555" className="flex items-center gap-2 text-base text-white/60 hover:text-white">
              <Phone size={16} /> +1 604 685 5555
            </a>
            <a href="mailto:hello@tequilalounge.ca" className="flex items-center gap-2 text-base text-white/60 hover:text-white">
              <Mail size={16} /> hello@tequilalounge.ca
            </a>
          </div>
        </div>
      </div>

      {/* ── Partners Marquee ── */}
      <div className="border-t border-[rgba(250,250,249,0.06)] py-8">
        <div className="px-5 md:px-8 lg:px-12">
          <p className="partners-heading">Our Partners</p>
        </div>
        <div className="partners-marquee" aria-label="Partners">
          <div className="partners-track">
            {track.map((partner, index) => (
              <div className="partners-item" key={`${partner.name}-${index}`}>
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={120}
                  height={40}
                  className="partners-logo"
                  unoptimized={true}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-[rgba(250,250,249,0.06)] px-5 py-4 md:px-8 lg:px-12">
        <p className="mx-auto max-w-[1400px] text-center text-xs text-white/30">
          © {new Date().getFullYear()} Tequila Lounge. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
