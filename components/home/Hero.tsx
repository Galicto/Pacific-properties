import dynamic from "next/dynamic";
import { HeroPoster } from "@/components/home/HeroPoster";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config";

const HeroFilm = dynamic(
  () =>
    import("@/components/home/HeroFilm").then((mod) => mod.HeroFilm),
  { loading: () => null },
);

export function Hero() {
  const poster = siteConfig.heroVideos[0];

  return (
    <section className="relative h-[100svh] min-h-[32rem] overflow-hidden bg-ink text-ivory">
      <HeroPoster src={poster.poster} />

      <HeroFilm videos={siteConfig.heroVideos} />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/30" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/45 via-transparent to-transparent" />

      <div className="relative flex h-full flex-col justify-end px-5 pb-[calc(8.75rem+env(safe-area-inset-bottom))] pt-28 sm:px-8 sm:pb-28 lg:px-12 lg:pb-32">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-ivory/70 sm:tracking-[0.32em]">
          Pacific Properties Goa
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-[clamp(1.65rem,7.2vw,4.5rem)] leading-[1.08] tracking-tight sm:mt-5">
          {siteConfig.tagline}
        </h1>
        <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-ivory/75 sm:mt-6 sm:text-lg">
          Curated villas, residences and investment opportunities across Goa’s
          most compelling addresses.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:flex-wrap">
          <ButtonLink href="/collection" variant="primary" className="min-h-12 w-full px-4 tracking-[0.12em] sm:w-auto sm:px-6 sm:tracking-[0.18em]">
            Explore the Collection
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost" className="min-h-12 w-full px-4 tracking-[0.12em] sm:w-auto sm:px-6 sm:tracking-[0.18em]">
            Arrange a Private Consultation
          </ButtonLink>
        </div>
      </div>

      <div className="absolute bottom-[calc(4.75rem+env(safe-area-inset-bottom))] left-5 z-10 flex items-center gap-6 sm:bottom-8 sm:left-8 lg:left-12">
        <a
          href="#intro"
          className="group flex min-h-11 items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-ivory/80 sm:tracking-[0.22em]"
        >
          <span className="relative h-8 w-px overflow-hidden bg-ivory/20">
            <span className="absolute inset-x-0 top-0 h-3 bg-ivory/80 motion-safe:animate-[scroll-line_2.8s_var(--ease-cinematic)_infinite]" />
          </span>
          Scroll to discover
        </a>
      </div>
    </section>
  );
}
