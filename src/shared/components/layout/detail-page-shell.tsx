import type { ReactNode } from "react";

import { Gallery } from "@/shared/components/gallery";
import { PageHeader } from "@/shared/components/layout/page-header";
import { Breadcrumb } from "@/shared/components/ui/breadcrumb";
import { Container } from "@/shared/components/ui/container";
import { EmptyState } from "@/shared/components/ui/empty-state";
import { JsonLdScript, breadcrumbJsonLd } from "@/infra/seo";
import type { BreadcrumbItem } from "@/shared/types/seo";

type DetailPageShellProps = {
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  emptyTitle: string;
  emptyDescription: string;
  jsonLd?: Record<string, unknown>;
  children?: ReactNode;
};

export function DetailPageShell({
  title,
  description,
  breadcrumbs,
  emptyTitle,
  emptyDescription,
  jsonLd,
  children,
}: DetailPageShellProps) {
  return (
    <Container className="py-12 sm:py-16">
      <JsonLdScript data={breadcrumbJsonLd(breadcrumbs)} />
      {jsonLd ? <JsonLdScript data={jsonLd} /> : null}
      <Breadcrumb items={breadcrumbs} />
      <PageHeader title={title} description={description} className="mt-6" />
      <div className="mt-10 space-y-8">
        {children ?? (
          <>
            <Gallery />
            <EmptyState title={emptyTitle} description={emptyDescription} />
          </>
        )}
      </div>
    </Container>
  );
}
