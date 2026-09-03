import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export function Section({ id, title, description, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("py-16 sm:py-20", className)}>
      <div className="mb-8 max-w-2xl">
        <h2 className="font-display text-3xl tracking-tight text-ink">{title}</h2>
        {description ? <p className="mt-3 text-base leading-7 text-ink-muted">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
