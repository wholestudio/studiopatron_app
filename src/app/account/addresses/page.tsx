import type { Metadata } from "next";

import { PageHeader } from "@/shared/components/layout/page-header";
import { EmptyState } from "@/shared/components/ui/empty-state";
import { routes } from "@/shared/constants/routes";
import { createPageMetadata } from "@/infra/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Addresses",
  path: routes.accountAddresses,
  robots: { index: false, follow: false },
});

export default function AccountAddressesPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Addresses" description="Saved addresses will load from the customer API." />
      <EmptyState title="Addresses" description="No addresses are loaded yet." />
    </div>
  );
}
