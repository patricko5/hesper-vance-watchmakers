
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Tequila Lounge",
  description: "Get in touch with Tequila Lounge, located in Gastown, Vancouver. Find our address, working hours, and directions.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pb-24 pt-32">
      <div className="site-shell mx-auto max-w-4xl">
        <div className="glass-card p-8 md:p-16">
          <div className="mb-16 flex flex-col items-center text-center">

            <h1 className="font-display text-4xl font-bold text-white md:text-5xl">Visit Us</h1>
          </div>

          <div className="mb-16 grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-4 font-display text-2xl font-bold text-teal">Directions</h2>
              <address className="not-italic leading-8 text-white/80 md:text-lg">
                136 W Cordova St
                <br />
                Vancouver, BC V6B 2N2
                <br />
                <a href="tel:+16046855555" className="transition-colors hover:text-white">+1 604 685 5555</a>
                <br />
                <a href="mailto:hello@tequilalounge.ca" className="transition-colors hover:text-white">hello@tequilalounge.ca</a>
              </address>
            </div>
            
            <div>
              <h2 className="mb-4 font-display text-2xl font-bold text-teal">Working Hours</h2>
              <p className="leading-8 text-white/80 md:text-lg">
                <span className="block"><strong className="text-white">Monday:</strong> 3 PM – 10 PM</span>
                <span className="block"><strong className="text-white">Tuesday:</strong> Closed</span>
                <span className="block"><strong className="text-white">Wednesday:</strong> 3 PM – 10 PM</span>
                <span className="block"><strong className="text-white">Thursday:</strong> 3 PM – 10 PM</span>
                <span className="block"><strong className="text-white">Friday:</strong> 3 PM – 2 AM</span>
                <span className="block"><strong className="text-white">Saturday:</strong> 12 PM – 2 AM</span>
                <span className="block"><strong className="text-white">Sunday:</strong> 12 PM – 10 PM</span>
              </p>
            </div>
          </div>

          <div className="w-full overflow-hidden rounded-xl border border-[rgba(250,250,249,0.06)] shadow-2xl">
            <iframe
              title="Map to Tequila Lounge"
              className="h-[400px] w-full border-0 md:h-[500px]"
              loading="lazy"
              src="https://www.google.com/maps?q=136%20W%20Cordova%20St%2C%20Vancouver%2C%20BC%20V6B%202N2&output=embed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
