import type { Metadata } from "next";

import { CatalogPage } from "@/components/layout/catalog-page";
import { routes } from "@/constants/routes";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Projects",
  path: routes.projects,
});

export default function ProjectsPage() {
  return (
    <CatalogPage
      title="Projects"
      description="Published interior projects will appear here from the CMS."
      breadcrumbs={[
        { name: "Home", path: routes.home },
        { name: "Projects", path: routes.projects },
      ]}
      emptyTitle="Projects"
      emptyDescription="No projects have been published yet."
    />
  );
}
