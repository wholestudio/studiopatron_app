import type { Metadata } from "next";

import { DetailPageShell } from "@/components/layout/detail-page-shell";
import { routes } from "@/constants/routes";
import { createPageMetadata, productJsonLd } from "@/lib/seo";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  return createPageMetadata({
    title: "Product",
    path: routes.product(slug),
    type: "product",
  });
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;

  return (
    <DetailPageShell
      title="Product"
      description="Product details, media, and purchase actions will load from the catalog API for this record."
      breadcrumbs={[
        { name: "Home", path: routes.home },
        { name: "Products", path: routes.products },
        { name: "Product", path: routes.product(slug) },
      ]}
      emptyTitle="Product unavailable"
      emptyDescription="This page is prepared for catalog data. No product record is loaded yet."
      jsonLd={productJsonLd({ name: "Product" })}
    />
  );
}
