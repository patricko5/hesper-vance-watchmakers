import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Countdown } from "@/components/Countdown";
import { ProductVisual } from "@/components/ProductVisual";
import { HeroWatch } from "@/components/movement/HeroWatch";
import { editions, models } from "@/lib/data";
import { formatChf } from "@/lib/utils";

export default function HomePage() {
  const currentModels = models.slice(0, 3);
  const nextEdition = editions[0];

  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-black">
        <HeroWatch />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,rgba(0,0,0,0.18)_36%,rgba(0,0,0,0.78)_100%)]" />
        <div className="atelier-grid relative z-10 flex min-h-screen flex-col items-center justify-center pb-24 pt-32 text-center">
          <p className="technical-label mb-5 text-[12px] text-brass">Independent watchmaking, Geneva</p>
          <h1 className="max-w-4xl font-display text-6xl font-light leading-[0.92] text-bone md:text-8xl">
            Hesper &amp; Vance
          </h1>
          <p className="mt-8 max-w-xl text-base font-light leading-7 text-muted md:text-lg">
            Mechanical watches assembled in small sequences. The movement is the record of the hand.
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-graphite to-transparent" />
      </section>

      <section className="section-spacing atelier-grid grid gap-12 md:grid-cols-2 md:items-center">
        <ProductVisual name="HV movement detail" material="Rose Gold" complication="time only" index={11} />
        <div>
          <p className="technical-label mb-4 text-[12px] text-brass">The Movement</p>
          <h2 className="font-display text-5xl font-light leading-tight text-bone md:text-6xl">Open the caseback.</h2>
          <p className="mt-6 max-w-xl text-base font-light leading-7 text-muted">
            The bridges are shaped to expose the train, not to decorate it. Each screw head is heat blued. The rubies mark
            load and rhythm. Turn the watch over and follow the power from the barrel to the escapement.
          </p>
          <Link href="/movement" className="button-primary mt-8">
            Open the caseback
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="atelier-grid pb-28">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="technical-label mb-3 text-[12px] text-brass">Current models</p>
            <h2 className="font-display text-5xl font-light text-bone">Three notes from the bench.</h2>
          </div>
          <Link href="/collection" className="button-secondary">
            View collection
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {currentModels.map((model, index) => (
            <Link
              key={model.slug}
              href={`/collection/${model.slug}`}
              className="group rounded-md border border-white/10 bg-surface/72 p-4 shadow-black/30"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="transition-transform duration-300 ease-horology group-hover:[transform:rotateX(3deg)_rotateY(-3deg)]">
                <ProductVisual
                  name={model.name}
                  material={model.caseMaterial}
                  complication={model.complication}
                  index={index}
                />
                <div className="px-1 pb-2 pt-5">
                  <h3 className="font-display text-3xl font-light text-bone">{model.name}</h3>
                  <p className="technical-label mt-2 text-[12px] text-muted">{model.reference}</p>
                  <p className="mt-4 text-sm text-brass">{formatChf(model.priceChf)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="atelier-grid pb-28">
        <div className="grid gap-10 rounded-md border border-white/10 bg-surface p-8 md:grid-cols-[1fr_auto] md:items-center md:p-12">
          <div>
            <p className="technical-label mb-3 text-[12px] text-ruby">Limited edition</p>
            <h2 className="font-display text-5xl font-light text-bone">{nextEdition.name}</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted">{nextEdition.description}</p>
          </div>
          <div className="md:text-right">
            <p className="technical-label mb-3 text-[11px] text-muted">Reservations open in</p>
            <Countdown target={nextEdition.reservationOpen} className="font-mono text-3xl text-bone md:text-4xl" />
            <div className="mt-7">
              <Link href="/editions" className="button-primary">
                Study edition
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#090a0b] py-12">
        <div className="atelier-grid grid gap-10 md:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-light">Hesper &amp; Vance</h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-muted">
              Notes from the atelier, delivery windows, and service advisories. No public sales list.
            </p>
          </div>
          <address className="not-italic text-sm leading-7 text-muted">
            Rue du Rhône 41
            <br />
            1204 Geneva
            <br />
            Switzerland
          </address>
          <form className="flex flex-col gap-3" aria-label="Newsletter signup">
            <label htmlFor="newsletter" className="technical-label text-[11px] text-muted">
              Atelier notes
            </label>
            <div className="flex gap-3">
              <input id="newsletter" type="email" placeholder="collector@example.com" aria-label="Email address" />
              <button type="submit" className="button-secondary shrink-0">
                Join
              </button>
            </div>
          </form>
        </div>
      </footer>
    </>
  );
}
