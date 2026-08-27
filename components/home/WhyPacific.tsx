import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";

const points = [
  {
    n: "01",
    title: "Local Intelligence",
    text: "We work the neighbourhoods we represent. Lane by lane, plot by plot — the knowledge is not borrowed from a portal.",
  },
  {
    n: "02",
    title: "Curated Opportunities",
    text: "Not everything that can be listed should be. We bring forward residences and land that will still make sense in ten years.",
  },
  {
    n: "03",
    title: "Discreet Representation",
    text: "Some of the best houses in Goa are never advertised. Introductions are made with care, and only when they fit.",
  },
  {
    n: "04",
    title: "End-to-End Guidance",
    text: "From first conversation to keys — due diligence, negotiation, and the unglamorous work that keeps a purchase sound.",
  },
];

export function WhyPacific() {
  return (
    <section className="cv-auto border-t border-ink/8 py-24 lg:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-brass">
              Why Pacific Properties
            </p>
            <h2 className="mt-4 font-serif text-[clamp(1.85rem,4.6vw,3.1rem)] leading-[1.1]">
              Representation with the grain of Goa.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-muted">
              We are a small practice. That is a choice. It allows us to know
              the land, the documents, and the people on both sides of a
              considered sale.
            </p>
            <div className="mt-10">
              <SmartImage
                src="/properties/aldona-twin-villas/09.webp"
                alt="Private pool and deck at the Aldona twin villas."
                className="aspect-[4/5] w-full max-w-md"
                sizes="(min-width: 1024px) 35vw, 100vw"
                quality={65}
              />
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <ul>
              {points.map((point, index) => (
                <li key={point.n} className="group border-t border-ink/10 last:border-b">
                  <Reveal delay={index * 0.06} className="py-9 sm:py-8">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                      <span className="font-serif text-2xl text-brass/80 transition-colors duration-500 group-hover:text-brass sm:text-3xl">
                        {point.n}
                      </span>
                      <h3 className="font-serif text-[1.65rem] leading-tight tracking-tight sm:flex-1 sm:text-3xl">
                        {point.title}
                      </h3>
                    </div>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted sm:ml-[4.5rem]">
                      {point.text}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
