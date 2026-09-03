import Link from "next/link";

import { Container } from "@/components/ui/container";

type CtaSectionProps = {
  title: string;
  description?: string;
  href: string;
  label: string;
};

export function CtaSection({ title, description, href, label }: CtaSectionProps) {
  return (
    <section className="bg-ink py-16 text-paper">
      <Container className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl">{title}</h2>
          {description ? <p className="mt-3 text-sm leading-6 text-paper/70">{description}</p> : null}
        </div>
        <Link
          href={href}
          className="inline-flex h-11 items-center rounded-md bg-bronze px-5 text-sm font-medium text-paper hover:bg-bronze-hover"
        >
          {label}
        </Link>
      </Container>
    </section>
  );
}
