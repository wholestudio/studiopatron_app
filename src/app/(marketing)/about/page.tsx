import type { Metadata } from "next";

import { CatalogPage } from "@/components/layout/catalog-page";
import { routes } from "@/constants/routes";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  path: routes.about,
});

export default function AboutPage() {
  return (
    <CatalogPage
      title="About"
      description="Studio Patron studio, people, and practice content will load from the CMS."
      breadcrumbs={[
        { name: "Home", path: routes.home },
        { name: "About", path: routes.about },
      ]}
      emptyTitle="About content"
      emptyDescription="This page is ready to receive CMS content. No studio copy has been published yet."
      showFilters={false}
    />
  );
}
