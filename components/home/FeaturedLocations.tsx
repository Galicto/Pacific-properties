import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { areas } from "@/data/areas";
import Link from "next/link";

export function FeaturedLocations() {
  return (
    <section className="cv-auto border-t border-ink/8 py-20 lg:py-32">
      <Container>
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-brass">
            Explore Goa by Address
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-[clamp(1.85rem,4.6vw,3.1rem)] leading-[1.1]">
            Villages we know by name, not by pin on a map.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, index) => (
            <Reveal key={area.slug} delay={index * 0.05}>
              <Link
                href={`/collection?area=${area.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden"
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
                <div className="absolute inset-x-0 bottom-0 p-5 text-ivory sm:p-6">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-ivory/60">
                    {area.region}
                  </p>
                  <h3 className="mt-2 font-serif text-[clamp(1.6rem,4vw,1.9rem)]">
                    {area.name}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory/80">
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
