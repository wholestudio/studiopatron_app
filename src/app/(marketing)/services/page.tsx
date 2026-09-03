import type { Metadata } from "next";

import { CatalogPage } from "@/components/layout/catalog-page";
import { routes } from "@/constants/routes";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  path: routes.services,
});

export default function ServicesPage() {
  return (
    <CatalogPage
      title="Services"
      description="Interior services will appear here from the CMS."
      breadcrumbs={[
        { name: "Home", path: routes.home },
        { name: "Services", path: routes.services },
      ]}
      emptyTitle="Services"
      emptyDescription="No services have been published yet."
    />
  );
}
