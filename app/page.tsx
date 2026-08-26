import dynamic from "next/dynamic";
import { ConsultationCta } from "@/components/home/ConsultationCta";
import { Credentials } from "@/components/home/Credentials";
import { FeaturedLocations } from "@/components/home/FeaturedLocations";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { WhyPacific } from "@/components/home/WhyPacific";
import { Logo } from "@/components/brand/Logo";

const FeaturedResidences = dynamic(
  () =>
    import("@/components/home/FeaturedResidences").then(
      (mod) => mod.FeaturedResidences,
    ),
  { loading: () => <SectionPlaceholder /> },
);

const ShowcaseMarquee = dynamic(
  () =>
    import("@/components/home/ShowcaseMarquee").then(
      (mod) => mod.ShowcaseMarquee,
    ),
  { loading: () => <SectionPlaceholder /> },
);

function SectionPlaceholder() {
  return (
    <div
      className="mx-auto min-h-[36rem] max-w-[1400px] px-7 py-24 sm:px-8 lg:min-h-[42rem] lg:px-12 lg:py-32"
      aria-hidden="true"
    >
      <Logo compact size="md" asLink={false} />
      <div className="mt-8 h-6 w-40 bg-mist/80" />
      <div className="mt-12 aspect-[4/3] w-full bg-ivory-deep lg:aspect-[5/4] lg:w-7/12" />
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Credentials />
      <FeaturedResidences />
      <WhyPacific />
      <FeaturedLocations />
      <ShowcaseMarquee />
      <ConsultationCta />
    </>
  );
}
