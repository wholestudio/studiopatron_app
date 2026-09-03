import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { FilterBar } from "@/components/ui/filter-bar";
import { PageHeader } from "@/components/layout/page-header";
import { JsonLdScript, breadcrumbJsonLd } from "@/lib/seo";
import type { BreadcrumbItem } from "@/types/seo";
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
