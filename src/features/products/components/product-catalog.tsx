import { ProductCard } from "@/shared/components/cards";
import { EmptyState } from "@/shared/components/ui/empty-state";

import type { ProductListPageModel } from "../types";

type ProductCatalogProps = {
  model: ProductListPageModel;
};

export function ProductCatalog({ model }: ProductCatalogProps) {
  if (model.unavailable) {
    return (
      <EmptyState
        title="Catalog unavailable"
        description="Product catalog data could not be loaded. Check the API configuration or try again later."
      />
    );
  }

  if (model.isEmpty) {
    return (
      <EmptyState title="Products" description="No products have been published yet." />
    );
  }

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {model.products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
