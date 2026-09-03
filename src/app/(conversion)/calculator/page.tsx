import type { Metadata } from "next";

import { CalculatorShell } from "@/components/calculator";
import { CatalogPage } from "@/components/layout/catalog-page";
import { routes } from "@/constants/routes";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Price calculator",
  path: routes.calculator,
});

export default function CalculatorPage() {
  return (
    <CatalogPage
      title="Price calculator"
      description="Calculator inputs will be validated with Zod and priced by the backend when that service is connected."
      breadcrumbs={[
        { name: "Home", path: routes.home },
        { name: "Calculator", path: routes.calculator },
      ]}
      emptyTitle="Calculator"
      emptyDescription="The calculator workflow is prepared and waiting for pricing rules from the API."
      showFilters={false}
    >
      <CalculatorShell />
    </CatalogPage>
  );
}
