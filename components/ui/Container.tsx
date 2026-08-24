import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
}) {
  return (
    <Tag className={cn("mx-auto w-full min-w-0 max-w-[1400px] px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </Tag>
  );
}
