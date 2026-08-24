import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { defaultWhatsAppUrl } from "@/lib/whatsapp";

export function ConsultationCta() {
  return (
    <section className="bg-forest text-ivory">
      <Container className="py-24 lg:py-32">
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
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/contact" variant="primary" className="w-full px-4 tracking-[0.12em] sm:w-auto sm:px-6 sm:tracking-[0.18em]">
              Start a Private Enquiry
            </ButtonLink>
            <ButtonLink href={defaultWhatsAppUrl} variant="ghost" external className="w-full px-4 tracking-[0.12em] sm:w-auto sm:px-6 sm:tracking-[0.18em]">
              WhatsApp Pacific Properties
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
