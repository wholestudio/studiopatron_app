import Link from "next/link";

import { Container } from "@/shared/components/ui/container";
import { siteConfig } from "@/infra/config/site";
import { routes } from "@/shared/constants/routes";
import type { MediaImage } from "@/shared/types/media";

type HeroProps = {
  title?: string;
  description?: string;
  image?: MediaImage;
};

export function Hero({ title, description }: HeroProps) {
  return (
    <section className="border-b border-ink/10 bg-linen/40">
      <Container className="grid min-h-[28rem] items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-bronze">{siteConfig.name}</p>
          <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight text-ink sm:text-6xl">
            {title ?? "Interior design, services, and commerce."}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-ink-muted">
            {description ??
              "Hero copy, featured media, and calls to action will load from the CMS when content is published."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={routes.projects}
              className="inline-flex h-11 items-center rounded-md bg-bronze px-4 text-sm font-medium text-paper hover:bg-bronze-hover"
            >
              View projects
            </Link>
            <Link
              href={routes.quote}
              className="inline-flex h-11 items-center rounded-md border border-ink/15 px-4 text-sm font-medium text-ink hover:border-ink/30"
            >
              Request a quote
            </Link>
          </div>
        </div>
        <div
          className="min-h-64 rounded-lg border border-dashed border-ink/15 bg-paper-elevated"
          aria-hidden="true"
        />
      </Container>
    </section>
  );
}
