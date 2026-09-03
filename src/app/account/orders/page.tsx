import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { routes } from "@/constants/routes";
import { createPageMetadata } from "@/lib/seo";

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
