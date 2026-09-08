import type { Metadata } from "next";

import { PageHeader } from "@/shared/components/layout/page-header";
import { EmptyState } from "@/shared/components/ui/empty-state";
import { routes } from "@/shared/constants/routes";
import { createPageMetadata } from "@/infra/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Order history",
  path: routes.accountOrders,
  robots: { index: false, follow: false },
});

export default function AccountOrdersPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Orders" description="Authenticated order history will load from the customer API." />
      <EmptyState title="Orders" description="No order history is loaded yet." />
    </div>
  );
}
