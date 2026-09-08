import type { Metadata } from "next";

import { CatalogPage } from "@/components/layout/catalog-page";
import { pages } from "@/config/page-registry";
import { getProductListPage, ProductCatalog } from "@/features/products";
import { createPageMetadata } from "@/lib/seo";

const productsPage = pages.products;

export const metadata: Metadata = createPageMetadata({
  title: "Products",
  path: productsPage.path,
});

export default async function ProductsPage() {
  const model = await getProductListPage();

  return (
    <CatalogPage
      title="Products"
      description="Browse published catalog products from the Studio Patron public API."
      breadcrumbs={[
        { name: "Home", path: pages.home.path },
        { name: "Products", path: productsPage.path },
      ]}
      emptyTitle="Products"
      emptyDescription="No products have been published yet."
    >
      <ProductCatalog model={model} />
    </CatalogPage>
  );
}
