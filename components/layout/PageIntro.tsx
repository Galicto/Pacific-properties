import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function PageIntro({
  eyebrow,
  title,
  children,
  image,
  imageAlt,
  className,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  image?: string;
  imageAlt?: string;
  className?: string;
}) {
  if (image) {
    return (
      <section className={cn("relative overflow-hidden bg-ink text-ivory", className)}>
        <SmartImage
          src={image}
          alt={imageAlt ?? ""}
          className="absolute inset-0 h-full w-full"
          sizes="100vw"
          priority
          quality={65}
          objectPosition="center 40%"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/30" />
        <Container className="relative z-[1] flex min-h-[58vh] flex-col justify-end pb-16 pt-32 sm:min-h-[46vh] sm:pb-16">
          <p className="text-[11px] uppercase tracking-[0.28em] text-ivory/70">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-[clamp(2.2rem,8vw,4.4rem)] leading-[1.08] tracking-tight">
            {title}
          </h1>
          {children ? (
            <div className="mt-5 max-w-xl text-base leading-relaxed text-ivory/75">
              {children}
            </div>
          ) : null}
        </Container>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "border-b border-ink/8 bg-ivory-deep/40 pb-16 pt-32 sm:pb-20",
        className,
      )}
    >
      <Container>
        <p className="text-[11px] uppercase tracking-[0.28em] text-brass">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-[clamp(2.2rem,8vw,4.4rem)] leading-[1.08] tracking-tight">
          {title}
        </h1>
        {children ? (
          <div className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted">
            {children}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
