import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { routes } from "@/constants/routes";
import { createPageMetadata } from "@/lib/seo";

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
