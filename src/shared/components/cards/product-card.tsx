import Link from "next/link";

import { Card, CardBody } from "@/shared/components/ui/card";
import { routes } from "@/shared/constants/routes";
import type { Product } from "@/shared/types/commerce";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card>
      <div className="aspect-[4/3] bg-linen" aria-hidden="true" />
      <CardBody>
        <h3 className="font-display text-xl text-ink">
          <Link href={routes.product(product.slug)} className="hover:text-bronze">
            {product.title}
          </Link>
        </h3>
        {product.excerpt ? <p className="text-sm text-ink-muted">{product.excerpt}</p> : null}
      </CardBody>
    </Card>
  );
}
