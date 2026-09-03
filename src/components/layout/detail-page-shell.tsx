import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { Gallery } from "@/components/gallery";
import { PageHeader } from "@/components/layout/page-header";
import { JsonLdScript, breadcrumbJsonLd } from "@/lib/seo";
import type { BreadcrumbItem } from "@/types/seo";

type DetailPageShellProps = {
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  emptyTitle: string;
  emptyDescription: string;
  jsonLd?: Record<string, unknown>;
};

export function DetailPageShell({
  title,
  description,
  breadcrumbs,
  emptyTitle,
  emptyDescription,
  jsonLd,
}: DetailPageShellProps) {
  return (
    <Container className="py-12 sm:py-16">
      <JsonLdScript data={breadcrumbJsonLd(breadcrumbs)} />
      {jsonLd ? <JsonLdScript data={jsonLd} /> : null}
      <Breadcrumb items={breadcrumbs} />
      <PageHeader title={title} description={description} className="mt-6" />
      <div className="mt-10 space-y-8">
        <Gallery />
        <EmptyState title={emptyTitle} description={emptyDescription} />
      </div>
    </Container>
  );
}
