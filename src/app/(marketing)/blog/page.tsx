import type { Metadata } from "next";

import { CatalogPage } from "@/components/layout/catalog-page";
import { routes } from "@/constants/routes";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Journal",
  path: routes.blog,
});

export default function BlogPage() {
  return (
    <CatalogPage
      title="Journal"
      description="Published articles will appear here from the CMS."
      breadcrumbs={[
        { name: "Home", path: routes.home },
        { name: "Journal", path: routes.blog },
      ]}
      emptyTitle="Journal"
      emptyDescription="No articles have been published yet."
    />
  );
}
