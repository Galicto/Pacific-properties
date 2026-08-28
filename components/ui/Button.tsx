import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-brass text-white hover:bg-brass/90 border border-brass/20 shadow-sm",
  dark: "bg-ink text-ivory hover:bg-ink-soft shadow-sm",
  ghost:
    "bg-transparent text-ivory border border-ivory/30 hover:border-ivory hover:bg-ivory/5",
  ghostInk:
    "bg-transparent text-ink border border-ink/15 hover:border-brass hover:text-brass",
  brass:
    "bg-transparent text-brass border border-brass/50 hover:bg-brass hover:text-white",
  link: "bg-transparent text-brass underline-offset-4 hover:underline px-0",
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex min-w-0 max-w-full flex-wrap items-center justify-center gap-2 text-pretty">
      {children}
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  className,
  variant = "dark",
  external,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  external?: boolean;
}) {
  const classes = cn(
    "inline-flex min-h-11 min-w-0 items-center justify-center rounded-lg px-6 py-3 text-center text-[11px] font-medium uppercase tracking-[0.12em] transition-colors duration-300 ease-[var(--ease-cinematic)] sm:tracking-[0.18em]",
    variants[variant],
    className,
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        <Label>{children}</Label>
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      <Label>{children}</Label>
    </Link>
  );
}

export function Button({
  children,
  className,
  variant = "dark",
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
}) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-11 min-w-0 items-center justify-center rounded-lg px-6 py-3 text-center text-[11px] font-medium uppercase tracking-[0.12em] transition-colors duration-300 ease-[var(--ease-cinematic)] disabled:opacity-50 sm:tracking-[0.18em]",
        variants[variant],
        className,
      )}
      {...props}
    >
      <Label>{children}</Label>
    </button>
  );
}
