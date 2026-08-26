import { Logo } from "@/components/brand/Logo";

export default function Loading() {
  return (
    <div
      className="relative z-[21] flex min-h-[70vh] items-center justify-center bg-ink"
      aria-busy="true"
      aria-live="polite"
    >
      <Logo size="lg" asLink={false} priority />
      <span className="sr-only">Loading Pacific Properties</span>
    </div>
  );
}
