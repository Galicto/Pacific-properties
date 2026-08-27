import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";

export function Intro() {
  return (
    <section id="intro" className="py-24 lg:py-32">
      <Container>
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-brass">
              The practice
            </p>
            <h2 className="mt-5 font-serif text-[clamp(1.9rem,5vw,3.5rem)] leading-[1.1] tracking-tight">
              Goa, chosen with intention.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.12}>
            <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
              Pacific Properties Goa is a trusted local guide for sale,
              investment, second homes and high-value property decisions. We
              work quietly, with a small number of clients, across the
              addresses that still feel like Goa.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-12 md:gap-6">
          <Reveal className="md:col-span-7">
            <SmartImage
              src="/properties/aldona-twin-villas/06.webp"
              alt="Living room of a North Goa villa, opening to garden light."
              className="aspect-[4/3] w-full"
              sizes="(min-width: 768px) 58vw, 100vw"
              quality={70}
            />
          </Reveal>
          <Reveal className="md:col-span-5 md:mt-16" delay={0.15}>
            <SmartImage
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop"
              alt="Luxurious high-end modern apartment building"
              className="aspect-[3/4] w-full"
              sizes="(min-width: 768px) 40vw, 100vw"
              quality={70}
              objectPosition="center 20%"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
