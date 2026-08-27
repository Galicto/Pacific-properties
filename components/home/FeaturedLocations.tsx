import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { areas } from "@/data/areas";
import Link from "next/link";

export function FeaturedLocations() {
  return (
    <section className="cv-auto border-t border-ink/8 py-24 lg:py-32">
      <Container>
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-brass">
            Areas of Operation
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-[clamp(1.85rem,4.6vw,3.1rem)] leading-[1.1]">
            Across North and South Goa.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted">
            From coastal neighbourhoods and heritage villages to emerging
            investment corridors, Pacific Properties represents considered
            opportunities across North and South Goa.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {areas.map((area, index) => (
            <Reveal key={area.slug} delay={index * 0.05} className="flex h-full flex-col">
              <Link
                href={`/collection?area=${area.slug}`}
                className="group relative block h-full min-h-[22rem] overflow-hidden sm:min-h-0 sm:aspect-[4/5]"
              >
                <SmartImage
                  src={area.image}
                  alt={area.imageAlt}
                  className="absolute inset-0 h-full w-full"
                  imageClassName="media-zoom"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  quality={65}
                  objectPosition="center 40%"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/10" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-ivory sm:p-6">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-ivory/60 sm:tracking-[0.22em]">
                    {area.region}
                  </p>
                  <h3 className="mt-2 font-serif text-[clamp(1.7rem,6vw,1.9rem)]">
                    {area.name}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory/80 line-clamp-3">
                    {area.descriptor}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
