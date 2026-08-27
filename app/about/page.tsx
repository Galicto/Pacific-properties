import { Logo } from "@/components/brand/Logo";
import { Credentials } from "@/components/home/Credentials";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
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

const leadershipWhatsAppUrl = buildWhatsAppUrl(
  "Hello Pacific Properties, I would like to speak with your leadership team.",
);

const leadership = [
  {
    id: "arshad",
    name: "Mr. Arshad Khawaja",
    role: "Founder and Director, Pacific Properties India",
    email: "arshad@pacificproperties.com",
    emailLabel: "Email Arshad",
    credential: "RERA Registered | RERA No. AGGO06180071",
    text: "Mr. Arshad Khawaja is a seasoned real estate leader, visionary entrepreneur and self-made professional who has shaped property consultancy and development in Goa for over two decades.\n\nHis journey in Goa began in 1984 after moving from Mumbai. In 2005, he formally entered the real estate sector as a consultant and laid the foundation of Pacific Properties. Since then, the firm has grown into a trusted name in luxury advisory, sales and leasing.\n\nHe later expanded the firm into project consultancy for developers, advising on land acquisition, project initiation and market positioning.\n\nMr. Khawaja is a Founder Member of the Goa Association of Realtors, affiliated with NAR India, and currently serves as Chairman of the GAR Goa Events Committee for 2026–2028.",
  },
  {
    id: "akbar",
    name: "Mr. Akbar Khawaja",
    role: "Co-Founder and CEO, Pacific Properties India",
    email: "akbar@pacificproperties.com",
    emailLabel: "Email Akbar",
    credential: null,
    text: "Mr. Akbar Khawaja is a second-generation real estate leader who joined the industry in 2020 with a forward-looking vision. He combines the firm’s foundational expertise with contemporary strategy, digital marketing and data-led advisory.\n\nHe has helped expand Pacific Properties across luxury lifestyle residences, high-yield rental opportunities, strategic land transactions, complex acquisitions and upscale developments across Goa, Maharashtra and Dubai.",
  },
  {
    id: "ayman",
    name: "Mr. Ayman Xec",
    role: "Head of Operations and Marketing, Pacific Properties India",
    email: "ayman@pacificproperties.com",
    emailLabel: "Email Ayman",
    credential: null,
    text: "Mr. Ayman Xec leads the day-to-day operations and strategic brand positioning of Pacific Properties. He oversees digital marketing, premium property showcases, drone-led visual media, CRM workflows, client relations and administrative execution.\n\nHis work keeps the brand precise, responsive and consistent across sales, leasing and development advisory.",
  },
] as const;

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
    text: "Pacific Properties represents considered homes, land and commercial opportunities across North and South Goa—represented with discretion and care.",
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
          <div className="mt-12 grid items-stretch gap-8 sm:grid-cols-3 sm:gap-5 lg:gap-6">
            {leadership.map((person, index) => (
              <Reveal
                key={person.id}
                delay={index * 0.06}
                className="flex h-full flex-col"
              >
                <LeadershipProfile person={person} />
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
              src="/images/goa-office.webp"
              alt="A considered meeting room for private appointments in Panjim."
              className="aspect-[4/5] w-full max-w-md rounded-[4px]"
              sizes="(min-width: 1024px) 40vw, 100vw"
              quality={70}
              objectPosition="center 40%"
            />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-muted">
              We work from Panjim, by appointment, across North and South Goa.
              Introductions are made with care, and only when they fit.
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
}: {
  person: (typeof leadership)[number];
}) {
  return (
    <article className="flex h-full flex-col">
      <div className="flex min-h-[17.5rem] w-full shrink-0 flex-col justify-center bg-tide px-6 py-8 text-ivory sm:min-h-[20.5rem] sm:px-7 sm:py-10">
        <p className="text-[10px] uppercase leading-snug tracking-[0.16em] text-brass-soft sm:text-[11px] sm:tracking-[0.18em]">
          {person.role}
        </p>
        <h3 className="mt-4 font-serif text-[clamp(1.35rem,2.2vw,1.85rem)] leading-[1.18] text-balance">
          {person.name}
        </h3>
        {person.credential ? (
          <p className="mt-4 text-[11px] leading-relaxed tracking-[0.04em] text-ivory/75">
            {person.credential}
          </p>
        ) : (
          <p className="mt-4 min-h-[1.1rem]" aria-hidden>
            {"\u00a0"}
          </p>
        )}
      </div>
      <div className="mt-6 flex flex-1 flex-col">
        <div className="space-y-4 text-sm leading-relaxed text-ink-muted">
          {person.text.split("\n\n").map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-auto flex flex-col gap-2 border-t border-ink/10 pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2">
          <a
            href={`mailto:${person.email}`}
            className="inline-flex min-h-11 items-center text-[11px] uppercase tracking-[0.14em] text-brass transition-opacity duration-300 hover:opacity-80"
          >
            {person.emailLabel}
          </a>
          <a
            href={leadershipWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-[11px] uppercase tracking-[0.14em] text-ink-muted transition-opacity duration-300 hover:opacity-80"
          >
            WhatsApp Pacific Properties
          </a>
        </div>
      </div>
    </article>
  );
}
