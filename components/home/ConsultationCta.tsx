import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function ConsultationCta() {
  return (
    <section className="bg-forest text-ivory">
      <Container className="py-24 pb-[calc(8rem+env(safe-area-inset-bottom))] md:pb-24 lg:py-32 lg:pb-32">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-brass-soft">
            Private consultation
          </p>
          <h2 className="mt-5 max-w-3xl font-serif text-[clamp(1.9rem,5vw,3.4rem)] leading-[1.1]">
            Your next address begins with a conversation.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/70">
            Tell us what you are looking for. We will return with opportunities
            worth your time.
          </p>
          <div className="mt-10">
            <ButtonLink href="/contact" variant="primary" className="w-full sm:w-auto">
              Start a Private Enquiry
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
