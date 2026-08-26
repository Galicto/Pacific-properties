import {
  IconCheckLine,
  IconCrest,
  IconMemberMark,
  IconRegistered,
  IconTrademark,
} from "@/components/ui/Icons";
import { siteConfig } from "@/lib/config";
import {
  credentialsContactLine,
  credentialsFooterLine,
  reraDetail,
  reraShortLabel,
} from "@/lib/credentials";
import { cn } from "@/lib/utils";

export function CredentialsCompact() {
  const items = [
    {
      icon: IconTrademark,
      title: siteConfig.credentials.trademark.title,
      body: siteConfig.credentials.trademark.body,
    },
    {
      icon: IconMemberMark,
      title: siteConfig.credentials.narIndia.title,
      body: siteConfig.credentials.narIndia.body,
    },
    {
      icon: IconCrest,
      title: siteConfig.credentials.primaryMember.title,
      body: siteConfig.credentials.primaryMember.body,
    },
    {
      icon: IconRegistered,
      title: siteConfig.credentials.rera.title,
      body: reraDetail() ?? siteConfig.credentials.rera.body,
    },
  ];

  return (
    <ul className="mt-16 grid grid-cols-1 gap-8 border-t border-brass/30 pt-10 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <li key={item.title}>
          <item.icon className="h-5 w-5 text-brass" />
          <p className="mt-3 font-serif text-xl text-ink">{item.title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
            {item.body}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function CredentialsContactLine({
  className,
}: {
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mt-8 max-w-md text-[12px] leading-relaxed tracking-[0.04em] text-ivory/60",
        className,
      )}
    >
      {credentialsContactLine()}
    </p>
  );
}

export function FooterCredentials() {
  return (
    <p className="max-w-3xl text-[11px] leading-relaxed tracking-[0.04em] text-ivory/55">
      {credentialsFooterLine()}
    </p>
  );
}

const propertyLines = [
  { icon: IconCrest, label: "Represented by Pacific Properties" },
  { icon: IconCheckLine, label: "Primary Member, GAR" },
  { icon: IconCheckLine, label: "Member, NAR-India" },
  { icon: IconCheckLine, label: reraShortLabel() },
] as const;

export function PropertyTrustStrip({ className }: { className?: string }) {
  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-3 border-t border-brass/30 pt-6 sm:grid-cols-2",
        className,
      )}
    >
      {propertyLines.map((line) => (
        <li key={line.label} className="flex items-start gap-2.5 text-sm text-ink">
          <line.icon className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
          <span>{line.label}</span>
        </li>
      ))}
    </ul>
  );
}

export function PropertyEnquiryTrust() {
  return (
    <div className="mt-6 border-t border-ink/10 pt-5">
      <p className="flex items-center gap-2 text-sm text-ink">
        <IconCrest className="h-4 w-4 shrink-0 text-brass" />
        Represented by Pacific Properties
      </p>
      <p className="mt-2 pl-6 text-[12px] leading-relaxed text-ink-muted">
        Primary Member, GAR · Member, NAR-India · {reraShortLabel()}
      </p>
    </div>
  );
}
