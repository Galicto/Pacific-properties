import { siteConfig } from "@/lib/config";
import { defaultWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

/**
 * Shared “Reach Us” contact block — principal, phones, email, address, RERA,
 * and primary actions. Used in the mobile menu, footer, and contact surfaces.
 */
export function ContactReachUs({
  tone = "light",
  showActions = true,
  className,
}: {
  tone?: Tone;
  showActions?: boolean;
  className?: string;
}) {
  const dark = tone === "dark";
  const label = dark ? "text-brass-soft" : "text-brass";
  const body = dark ? "text-ivory/70" : "text-ink-muted";
  const strong = dark ? "text-ivory" : "text-tide";
  const divider = dark ? "border-ivory/12" : "border-ink/10";
  const actionBorder = dark
    ? "border-ivory/25 text-ivory/85 hover:border-ivory hover:text-ivory"
    : "border-tide/20 text-tide hover:border-tide hover:bg-tide/[0.04]";

  return (
    <div className={cn("text-sm", className)}>
      <p
        className={cn(
          "text-[11px] font-medium uppercase tracking-[0.22em]",
          label,
        )}
      >
        Reach Us
      </p>

      <p className={cn("mt-5 font-medium", strong)}>
        {siteConfig.principal.name}
      </p>
      <p
        className={cn(
          "mt-1 text-[11px] uppercase tracking-[0.16em]",
          dark ? "text-brass-soft" : "text-brass",
        )}
      >
        {siteConfig.principal.role}
      </p>

      <ul className={cn("mt-5 space-y-1", body)}>
        {siteConfig.phones.map((phone) => (
          <li key={phone.id}>
            <a
              href={phone.href}
              className={cn(
                "inline-flex min-h-11 items-center transition-colors",
                dark ? "hover:text-ivory" : "hover:text-tide",
              )}
              aria-label={`${phone.label}: ${phone.display}`}
            >
              {phone.display}
            </a>
          </li>
        ))}
      </ul>

      <a
        href={`mailto:${siteConfig.email}`}
        className={cn(
          "mt-1 flex min-h-11 items-center break-all transition-colors",
          body,
          dark ? "hover:text-ivory" : "hover:text-tide",
        )}
        aria-label={`Email ${siteConfig.email}`}
      >
        {siteConfig.email}
      </a>

      <p className={cn("mt-3 max-w-xs leading-relaxed", body)}>
        {siteConfig.address.line1}
        <br />
        {siteConfig.address.line2}
        <br />
        {siteConfig.address.line3}
      </p>

      <p
        className={cn(
          "mt-4 text-[11px] uppercase tracking-[0.16em]",
          dark ? "text-ivory/50" : "text-ink-muted",
        )}
      >
        Goa RERA {siteConfig.credentials.reraRegistrationNumber}
      </p>

      {showActions ? (
        <div
          className={cn(
            "mt-6 flex flex-wrap gap-2 border-t pt-5",
            divider,
          )}
        >
          {siteConfig.phones.map((phone) => (
            <a
              key={phone.id}
              href={phone.href}
              className={cn(
                "inline-flex min-h-11 items-center rounded-full border px-4 text-[11px] uppercase tracking-[0.14em] transition-colors",
                actionBorder,
              )}
              aria-label={`${phone.label} ${phone.display}`}
            >
              {phone.label}
            </a>
          ))}
          <a
            href={defaultWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex min-h-11 items-center rounded-full border px-4 text-[11px] uppercase tracking-[0.14em] transition-colors",
              actionBorder,
            )}
            aria-label="WhatsApp Pacific Properties on +91 7517723720"
          >
            WhatsApp
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className={cn(
              "inline-flex min-h-11 items-center rounded-full border px-4 text-[11px] uppercase tracking-[0.14em] transition-colors",
              actionBorder,
            )}
            aria-label={`Email Us at ${siteConfig.email}`}
          >
            Email Us
          </a>
          <a
            href={siteConfig.mapDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex min-h-11 items-center rounded-full border px-4 text-[11px] uppercase tracking-[0.14em] transition-colors",
              actionBorder,
            )}
            aria-label="Get directions to Pacific Properties office in Panjim"
          >
            Get Directions
          </a>
        </div>
      ) : null}
    </div>
  );
}
