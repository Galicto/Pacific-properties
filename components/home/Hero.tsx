import { HeroFilm } from "@/components/home/HeroFilm";
import { HeroPoster } from "@/components/home/HeroPoster";
import { ButtonLink } from "@/components/ui/Button";
import { heroFilm } from "@/lib/hero-media";

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[32rem] overflow-hidden bg-ink text-ivory">
      <HeroPoster
        src={heroFilm.poster}
        alt={heroFilm.alt}
        objectPosition={heroFilm.objectPosition}
      />

      <HeroFilm video={heroFilm} />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-ink/60 via-ink/15 to-ink/20" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-ink/30 via-transparent to-transparent" />

      <div className="relative z-[2] flex h-full flex-col justify-end px-7 pb-[calc(10.5rem+env(safe-area-inset-bottom))] pt-28 sm:px-8 sm:pb-28 lg:px-12 lg:pb-32">
        <p className="text-[10px] uppercase tracking-[0.28em] text-brass-soft sm:text-[11px] sm:tracking-[0.3em]">
          Pacific Properties India
        </p>
        <h1 className="mt-4 font-serif text-[clamp(1.75rem,6.5vw,3.75rem)] leading-[1.1] tracking-tight sm:mt-5 sm:max-w-2xl md:max-w-3xl">
          <span className="sm:hidden">
            Luxury Properties &
            <br />
            Investment
            <br />
            Opportunities
            <br />
            in Goa
          </span>
          <span className="hidden sm:inline">
            Luxury Properties & Investment
            <br />
            Opportunities in Goa
          </span>
        </h1>
        <p className="mt-5 max-w-xl text-[0.92rem] leading-[1.65] tracking-[0.02em] text-ivory/85 sm:mt-6 sm:text-lg">
          Villas • Apartments • Land • Commercial
        </p>
        <p className="mt-2.5 text-[0.8rem] leading-[1.5] tracking-[0.04em] text-ivory/60 sm:mt-3 sm:text-[0.9rem]">
          For Sale & Rent across Goa
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
          <ButtonLink
            href="/collection"
            variant="primary"
            className="pointer-events-auto min-h-12 w-full px-6 sm:w-auto"
          >
            Explore the Collection
          </ButtonLink>
          <a
            href="/contact"
            className="pointer-events-auto inline-flex min-h-12 items-center justify-center px-1 text-center text-[11px] uppercase tracking-[0.2em] text-ivory/80 hover:text-ivory sm:px-2"
          >
            Arrange a private consultation
          </a>
        </div>
      </div>
    </section>
  );
}
