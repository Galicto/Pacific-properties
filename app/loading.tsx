import { Wordmark } from "@/components/ui/Wordmark";

export default function Loading() {
  return (
    <div
      className="flex min-h-[70vh] items-center justify-center bg-ivory"
      aria-busy="true"
      aria-live="polite"
    >
      <Wordmark mark asLink={false} priority />
      <span className="sr-only">Loading Pacific Properties</span>
    </div>
  );
}
