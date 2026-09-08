import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DetailPageShell } from "@/shared/components/layout/detail-page-shell";
import { pages } from "@/infra/config/page-registry";
import { routes } from "@/shared/constants/routes";
import { getProductDetailPage, ProductDetailView } from "@/features/products";
import { createPageMetadata, productJsonLd } from "@/infra/seo";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const model = await getProductDetailPage(slug);
  const title = model.product?.title ?? "Product";

  return createPageMetadata({
    title,
    description: model.product?.excerpt,
    path: routes.product(slug),
    type: "product",
  });
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const model = await getProductDetailPage(slug);

  if (model.status === "not_found") {
    notFound();
  }

  const title = model.product?.title ?? "Product";
  const description =
    model.product?.excerpt ??
    "Product details, media, and purchase actions load from the catalog API.";

  return (
    <DetailPageShell
      title={title}
      description={description}
      breadcrumbs={[
        { name: "Home", path: pages.home.path },
        { name: "Products", path: pages.products.path },
        { name: title, path: routes.product(slug) },
      ]}
      emptyTitle="Product unavailable"
      emptyDescription="This page is prepared for catalog data. No product record is loaded yet."
      jsonLd={productJsonLd({
        name: title,
        description: model.product?.excerpt,
        sku: model.product?.sku,
      })}
    >
      <ProductDetailView model={model} />
    </DetailPageShell>
  );
}
