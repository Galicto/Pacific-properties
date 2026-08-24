import dynamic from "next/dynamic";
import { ConsultationCta } from "@/components/home/ConsultationCta";
import { FeaturedLocations } from "@/components/home/FeaturedLocations";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { WhyPacific } from "@/components/home/WhyPacific";

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
      className="mx-auto min-h-[22rem] max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12"
      aria-hidden="true"
    >
      <div className="h-6 w-40 bg-mist/80" />
      <div className="mt-6 aspect-[16/9] w-full bg-ivory-deep" />
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <FeaturedResidences />
      <WhyPacific />
      <FeaturedLocations />
      <ShowcaseMarquee />
      <ConsultationCta />
    </>
  );
}
