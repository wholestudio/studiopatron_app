import type { Metadata } from "next";

import { DetailPageShell } from "@/shared/components/layout/detail-page-shell";
import { routes } from "@/shared/constants/routes";
import { createPageMetadata } from "@/infra/seo";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  return createPageMetadata({
    title: "Project",
    path: routes.project(slug),
  });
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;

  return (
    <DetailPageShell
      title="Project"
      description="Project details, media, and related content will load from the CMS for this record."
      breadcrumbs={[
        { name: "Home", path: routes.home },
        { name: "Projects", path: routes.projects },
        { name: "Project", path: routes.project(slug) },
      ]}
      emptyTitle="Project unavailable"
      emptyDescription="This project page is prepared for CMS data. No project record is loaded yet."
    />
  );
}
