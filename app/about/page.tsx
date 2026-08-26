import { Logo } from "@/components/brand/Logo";
import { Credentials } from "@/components/home/Credentials";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Pacific Properties India is a premier real estate advisory and development firm rooted in Goa. Since 2005, we have helped clients navigate Goa’s property landscape with clarity and discretion.",
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

const leadership = [
  {
    name: "Mr. Arshad Khawaja",
    role: "Founder",
    monogram: "Arshad",
    text: "Founded in 2005 by Mr. Arshad Khawaja, Pacific Properties India was built on a clear belief: property decisions deserve transparency, market knowledge and personal accountability. His insight into Goa’s real estate landscape has guided local families, second-home buyers and investors for over two decades.",
  },
  {
    name: "Mr. Akbar Khawaja",
    role: "Co-Founder & CEO",
    monogram: "Akbar",
    text: "Mr. Akbar Khawaja brings a contemporary approach to sales strategy, market expansion and strategic business development, strengthening the firm’s ability to serve a modern and nationally connected client base.",
  },
  {
    name: "Mr. Ayman Xec",
    role: "Head of Operations & Marketing",
    monogram: "Ayman",
    text: "Mr. Ayman Xec leads operations, digital presence and client relations, ensuring every interaction is responsive, considered and aligned with the Pacific Properties standard.",
  },
];

const timeline = [
  {
    year: "2005",
    text: "A practice formed in Goa, working first with families who already knew the villages — and then with those arriving with care.",
  },
  {
    year: "The work",
    text: "Private sales, second homes, land, and a handful of commercial introductions. Always by conversation.",
  },
  {
    year: "Today",
    text: "A considered collection across Salvador, Aldona, Pilerne, Saipem, Reis Magos, Ucassaim, Dona Paula and Verna, with new launches represented as they are ready — and the quiet work of representing it well.",
  },
];

const audiences = [
  {
    title: "Local Families & First-Time Buyers",
    text: "Clear, patient guidance for families buying in Goa — whether the search is a first home or a house already known by name.",
  },
  {
    title: "Second-Home Seekers",
    text: "A considered introduction to Goa for those looking for a second home, with the same care we give a primary residence.",
  },
  {
    title: "High-Net-Worth Individuals & Investors",
    text: "Discreet representation for clients who want long-term perspective, market knowledge and personal accountability.",
  },
  {
    title: "Film & Entertainment Professionals",
    text: "Private, responsive support for professionals who need a considered property process in Goa, handled with discretion.",
  },
];

const services = [
  {
    title: "Sales & Acquisitions",
    text: "Representation for buying and selling residences, land and commercial space — handled through conversation and due care.",
  },
  {
    title: "Residential & Commercial Leasing",
    text: "Introductions and tenancy support for homes and commercial space, matched to use, location and term.",
  },
  {
    title: "Investment & Land Development",
    text: "Advice on land and development opportunities in Goa, grounded in local knowledge rather than speculation.",
  },
  {
    title: "Turnkey Construction",
    text: "Coordination of construction with trusted partners, from brief through completion, with clear reporting along the way.",
  },
  {
    title: "Interior Services",
    text: "Interior direction and fit-out support so a house in Goa can be lived in with the same standard as the search.",
  },
  {
    title: "Advisory & Due Diligence",
    text: "Document review, market context and practical checks before a decision is made — the unglamorous work that keeps a purchase sound.",
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
            <h2 className="font-serif text-3xl leading-snug lg:col-span-6 lg:text-4xl">
              About Pacific Properties India
            </h2>
            <div className="space-y-5 text-base leading-relaxed text-ink-muted lg:col-span-5 lg:col-start-8">
              <p>
                Pacific Properties India is a premier real estate advisory and
                development firm rooted in the heart of Goa. Since 2005, we
                have helped clients navigate Goa’s evolving property landscape
                with clarity, discretion and long-term perspective.
              </p>
              <p>
                Most of what we do happens in conversation: a walk through a
                village, a reading of documents, a viewing at the right hour of
                the day.
              </p>
            </div>
          </div>
        </Reveal>

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

        <div className="mt-24 border-t border-ink/10 pt-16">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.22em] text-brass">
              Our Legacy & Leadership
            </p>
            <h2 className="mt-3 font-serif text-3xl">
              Experience shaped by trust.
            </h2>
          </Reveal>
          <div className="mt-12 divide-y divide-ink/10 border-t border-ink/10">
            {leadership.map((person, index) => (
              <Reveal key={person.name} delay={index * 0.06}>
                <LeadershipProfile
                  person={person}
                  reverse={index % 2 === 1}
                />
              </Reveal>
            ))}
          </div>
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

        <div className="mt-24 border-t border-ink/10 pt-16">
          <h2 className="font-serif text-3xl">Who We Serve</h2>
          <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <p className="font-serif text-brass">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-serif text-2xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                  {item.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-24 border-t border-ink/10 pt-16">
          <h2 className="font-serif text-3xl">
            End-to-End Real Estate Solutions
          </h2>
          <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <p className="font-serif text-brass">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-serif text-2xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                  {item.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>

      <Credentials />

      <Container className="py-24 lg:py-32">
        <div className="grid items-stretch gap-10 lg:grid-cols-12">
          <div className="relative z-[21] flex flex-col justify-between bg-tide px-8 py-12 text-ivory sm:px-10 lg:col-span-5">
            <Logo size="lg" asLink={false} />
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

        <div className="mt-24 border-t border-ink/10 pt-16">
          <h2 className="max-w-2xl font-serif text-3xl leading-snug sm:text-4xl">
            Start your Goa property journey with confidence.
          </h2>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <ButtonLink
              href="/collection"
              variant="ghostInk"
              className="w-full sm:w-auto"
            >
              Explore Properties
            </ButtonLink>
            <ButtonLink href="/contact" variant="dark" className="w-full sm:w-auto">
              Speak to Our Team
            </ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}

function LeadershipProfile({
  person,
  reverse = false,
}: {
  person: (typeof leadership)[number];
  reverse?: boolean;
}) {
  return (
    <article className="grid items-center gap-8 py-12 lg:grid-cols-12 lg:gap-10">
      <div
        className={cn(
          "lg:col-span-4",
          reverse && "lg:col-start-9 lg:row-start-1",
        )}
      >
        <div
          className="flex aspect-[5/4] w-full max-w-md items-end bg-tide px-8 py-10 text-ivory sm:aspect-[4/5]"
          aria-hidden="true"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-brass-soft">
              {person.role}
            </p>
            <p className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.08]">
              {person.monogram}
            </p>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "lg:col-span-7",
          reverse ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-6",
        )}
      >
        <p className="text-[11px] uppercase tracking-[0.18em] text-brass">
          {person.role}
        </p>
        <h3 className="mt-3 font-serif text-2xl sm:text-3xl">{person.name}</h3>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-muted">
          {person.text}
        </p>
      </div>
    </article>
  );
}
