import Link from "next/link";

import { Card, CardBody } from "@/components/ui/card";
import { routes } from "@/constants/routes";
import type { DesignIdea } from "@/types/content";

export function DesignIdeaCard({ idea }: { idea: DesignIdea }) {
  return (
    <Card>
      <div className="aspect-[4/3] bg-linen" aria-hidden="true" />
      <CardBody>
        <h3 className="font-display text-xl text-ink">
          <Link href={routes.designIdea(idea.slug)} className="hover:text-bronze">
            {idea.title}
          </Link>
        </h3>
        {idea.excerpt ? <p className="text-sm text-ink-muted">{idea.excerpt}</p> : null}
      </CardBody>
    </Card>
  );
}
