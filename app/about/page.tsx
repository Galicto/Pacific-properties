import { CredentialsCompact } from "@/components/brand/TrustLines";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { Wordmark } from "@/components/ui/Wordmark";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Pacific Properties Goa is a boutique brokerage rooted in North Goa — regional insight, careful curation, and client-first advisory.",
};

const principles = [
  {
    title: "Regional insight",
    text: "We work where we live. The difference between a good house and a lasting one is often a lane, a slope, or a neighbour — things a listing cannot tell you.",
  },
  {
    title: "Careful curation",
    text: "We decline more than we take on. The collection is small because the standard is not.",
  },
  {
    title: "Client-first advisory",
    text: "We represent people, not inventory. If a house is wrong, we will say so — even when it would be easier not to.",
  },
];

const timeline = [
  {
    year: "The beginning",
    text: "A practice formed in North Goa, working first with families who already knew the villages — and then with those arriving with care.",
  },
  {
    year: "The work",
    text: "Private sales, second homes, land, and a handful of commercial introductions. Always by conversation.",
  },
  {
    year: "Today",
    text: "A considered collection across Aldona, Pilerne, Saipem, Reis Magos, Ucassaim, Dona Paula and Verna — and the quiet work of representing it well.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative h-[58vh] min-h-[18rem] bg-ink text-ivory sm:h-[70vh] sm:min-h-[28rem]">
        <SmartImage
          src="/properties/aldona-twin-villas/hero.webp"
          alt="Twin villas in Aldona, North Goa."
          className="absolute inset-0 h-full w-full"
          sizes="100vw"
          priority
          quality={65}
          objectPosition="center 40%"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/25" />
        <Container className="relative flex h-full flex-col justify-end pb-16 pt-32">
          <p className="text-[11px] uppercase tracking-[0.28em] text-ivory/70">
            The practice
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-[clamp(2.2rem,8vw,4.4rem)] leading-[1.08]">
            Property expertise, rooted in Goa.
          </h1>
        </Container>
      </section>

      <Container className="py-24 lg:py-32">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-12">
            <p className="font-serif text-3xl leading-snug lg:col-span-6 lg:text-4xl">
              We help people buy, sell and hold property in Goa with a cooler
              head than the season usually allows.
            </p>
            <div className="space-y-5 text-base leading-relaxed text-ink-muted lg:col-span-5 lg:col-start-8">
              <p>
                Pacific Properties Goa is a boutique brokerage. We are not a
                portal, and we are not in a hurry. Our work is regional
                insight, careful curation, and client-first advisory — for
                residences, land, and the occasional commercial introduction
                that deserves the same attention as a home.
              </p>
              <p>
                Most of what we do happens in conversation: a walk through a
                village, a reading of documents, a viewing at the right hour of
                the day.
              </p>
            </div>
          </div>
        </Reveal>

        <CredentialsCompact />

        <div className="mt-24 grid gap-12 border-t border-ink/10 pt-16 lg:grid-cols-3">
          {principles.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <p className="font-serif text-brass">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 font-serif text-2xl">{item.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 grid gap-10 border-t border-ink/10 pt-16 lg:grid-cols-12">
          <h2 className="font-serif text-3xl lg:col-span-4">A short history</h2>
          <ol className="lg:col-span-8">
            {timeline.map((item) => (
              <li
                key={item.year}
                className="grid gap-3 border-t border-ink/10 py-8 sm:grid-cols-12"
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-brass sm:col-span-4">
                  {item.year}
                </p>
                <p className="text-sm leading-relaxed text-ink-muted sm:col-span-8">
                  {item.text}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-24 grid items-stretch gap-10 border-t border-ink/10 pt-16 lg:grid-cols-12">
          <div className="flex flex-col justify-between bg-tide px-8 py-12 text-ivory sm:px-10 lg:col-span-5">
            <Wordmark inverted lockup asLink={false} />
            <div className="mt-12">
              <p className="text-[11px] uppercase tracking-[0.22em] text-brass-soft">
                Pacific Properties Goa
              </p>
              <p className="mt-4 max-w-sm font-serif text-2xl leading-snug sm:text-3xl">
                A boutique brokerage for considered property in Goa.
              </p>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SmartImage
              src="/properties/pilerne-villa-collection/18.webp"
              alt="Staircase and double-height volume in the Pilerne villa collection."
              className="aspect-[4/5] w-full max-w-md rounded-[4px]"
              sizes="(min-width: 1024px) 40vw, 100vw"
              quality={65}
            />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-muted">
              We work from Assagao, by appointment, across the addresses we
              currently represent. Introductions are made with care, and only
              when they fit.
            </p>
          </div>
        </div>

        <div className="mt-24">
          <ButtonLink href="/contact" variant="dark" className="w-full sm:w-auto">
            Start a Private Enquiry
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
