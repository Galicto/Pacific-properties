import { HeroFilm } from "@/components/home/HeroFilm";
import { HeroPoster } from "@/components/home/HeroPoster";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config";

export function Hero() {
  const poster = siteConfig.heroVideos[0];

  return (
    <section className="relative h-[100svh] min-h-[32rem] overflow-hidden bg-ink text-ivory">
      <HeroPoster src={poster.poster} />

      <HeroFilm videos={siteConfig.heroVideos} />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/30" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/45 via-transparent to-transparent" />

      <div className="relative flex h-full flex-col justify-end px-7 pb-[calc(10.5rem+env(safe-area-inset-bottom))] pt-28 sm:px-8 sm:pb-28 lg:px-12 lg:pb-32">
        <h1 className="max-w-3xl font-serif text-[clamp(2rem,8vw,4.5rem)] leading-[1.08] tracking-tight">
          {siteConfig.tagline}
        </h1>
        <p className="mt-6 max-w-md text-[0.98rem] leading-[1.7] text-ivory/75 sm:mt-6 sm:max-w-xl sm:text-lg">
          Curated villas, residences, land and commercial space across Goa.
        </p>
        <div className="mt-10 sm:mt-10">
          <ButtonLink
            href="/collection"
            variant="primary"
            className="min-h-12 w-full px-6 sm:w-auto"
          >
            Explore the Collection
          </ButtonLink>
          <a
            href="/contact"
            className="mt-5 hidden min-h-11 items-center text-[11px] uppercase tracking-[0.2em] text-ivory/80 hover:text-ivory sm:inline-flex"
          >
            Arrange a private consultation
          </a>
        </div>
      </div>
    </section>
  );
}
