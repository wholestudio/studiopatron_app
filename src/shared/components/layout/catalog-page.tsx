import { Breadcrumb } from "@/shared/components/ui/breadcrumb";
import { Container } from "@/shared/components/ui/container";
import { EmptyState } from "@/shared/components/ui/empty-state";
import { FilterBar } from "@/shared/components/ui/filter-bar";
import { PageHeader } from "@/shared/components/layout/page-header";
import { JsonLdScript, breadcrumbJsonLd } from "@/infra/seo";
import type { BreadcrumbItem } from "@/shared/types/seo";
import type { ReactNode } from "react";

type CatalogPageProps = {
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  emptyTitle: string;
  emptyDescription: string;
  showFilters?: boolean;
  children?: ReactNode;
};

export function CatalogPage({
  title,
  description,
  breadcrumbs,
  emptyTitle,
  emptyDescription,
  showFilters = true,
  children,
}: CatalogPageProps) {
  return (
    <Container className="py-12 sm:py-16">
      <JsonLdScript data={breadcrumbJsonLd(breadcrumbs)} />
      <Breadcrumb items={breadcrumbs} />
      <PageHeader title={title} description={description} className="mt-6" />
      <div className="mt-10 space-y-6">
        {showFilters ? <FilterBar /> : null}
        {children ?? <EmptyState title={emptyTitle} description={emptyDescription} />}
      </div>
    </Container>
  );
}
