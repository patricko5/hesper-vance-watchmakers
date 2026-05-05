import Image from "next/image";

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
    <footer className="site-footer">
      <div className="site-shell">
        <p className="partners-heading">Our Partners</p>
      </div>
      <div className="partners-marquee" aria-label="Partners">
        <div className="partners-track">
          {track.map((partner, index) => (
            <div className="partners-item" key={`${partner.name}-${index}`}>
              <Image
                src={partner.src}
                alt={partner.name}
                width={200}
                height={80}
                className="partners-logo"
              />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
