import type { Metadata } from "next";

import { QuoteShell } from "@/shared/components/quote";
import { CatalogPage } from "@/shared/components/layout/catalog-page";
import { routes } from "@/shared/constants/routes";
import { createPageMetadata } from "@/infra/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Request a quote",
  path: routes.quote,
  robots: { index: true, follow: true },
});

export default function QuotePage() {
  return (
    <CatalogPage
      title="Request a quote"
      description="Quote requests will be validated with Zod and submitted to the backend quote API."
      breadcrumbs={[
        { name: "Home", path: routes.home },
        { name: "Quote", path: routes.quote },
      ]}
      emptyTitle="Quote request"
      emptyDescription="The quote form will be connected to /api/v1/customer/quotes."
      showFilters={false}
    >
      <QuoteShell />
    </CatalogPage>
  );
}
