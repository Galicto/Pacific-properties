import { Container } from "@/components/ui/Container";
import {
  IconCrest,
  IconMemberMark,
  IconRegistered,
} from "@/components/ui/Icons";
import { siteConfig } from "@/lib/config";
import { credentialItems } from "@/lib/credentials";

const icons = {
  gar: IconCrest,
  nar: IconMemberMark,
  rera: IconRegistered,
} as const;

export function Credentials() {
  const { heading, supporting } = siteConfig.credentials;

  return (
    <section
      className="cv-auto border-y border-brass/25 bg-ivory-deep"
      aria-labelledby="credentials-heading"
    >
      <Container className="py-20 lg:py-24">
        <div className="max-w-2xl">
          <h2
            id="credentials-heading"
            className="font-serif text-[clamp(1.85rem,4.6vw,3.1rem)] leading-[1.12] tracking-tight text-ink"
          >
            {heading}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted">
            {supporting}
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-x-0 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {credentialItems.map((item, index) => {
            const Icon = icons[item.id];
            return (
              <li
                key={item.id}
                className={cnCredentialCell(index)}
              >
                <Icon className="h-7 w-7 text-brass" />
                <h3 className="mt-5 font-serif text-[1.65rem] leading-tight tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
                  {item.body}
                </p>
                {"detail" in item && item.detail ? (
                  <p className="mt-3 text-[12px] tracking-[0.04em] text-ink">
                    {item.detail}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

function cnCredentialCell(index: number) {
  const last = index === 2;
  return [
    "border-t border-brass/40 pt-7",
    "lg:border-t-0 lg:border-l lg:border-brass/35 lg:pl-10 lg:pt-0",
    index === 0 ? "lg:border-l-0 lg:pl-0" : "",
    last ? "sm:col-span-2 lg:col-span-1" : "",
  ]
    .filter(Boolean)
    .join(" ");
}
