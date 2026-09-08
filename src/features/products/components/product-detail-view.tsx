import { Gallery } from "@/components/gallery";
import { EmptyState } from "@/components/ui/empty-state";

import type { ProductDetailPageModel } from "../types";

type ProductDetailViewProps = {
  model: ProductDetailPageModel;
};

export function ProductDetailView({ model }: ProductDetailViewProps) {
  if (model.status === "not_found") {
    return (
      <EmptyState
        title="Product not found"
        description="This product is not available or has not been published."
      />
    );
  }

  if (model.status === "unavailable" || !model.product) {
    return (
      <EmptyState
        title="Product unavailable"
        description="Product details could not be loaded. Check the API configuration or try again later."
      />
    );
  }

  const { product } = model;
  const images = product.images ?? (product.image ? [product.image] : []);

  return (
    <div className="space-y-8">
      <Gallery items={images} label={`${product.title} gallery`} />
      {product.excerpt ? <p className="max-w-2xl text-ink-muted">{product.excerpt}</p> : null}
      {product.priceAmount != null && product.currency ? (
        <p className="text-lg text-ink">
          {product.currency} {product.priceAmount.toFixed(2)}
        </p>
      ) : null}
    </div>
  );
}
