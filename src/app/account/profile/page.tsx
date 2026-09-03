import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { routes } from "@/constants/routes";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Profile",
  path: routes.accountProfile,
  robots: { index: false, follow: false },
});

export default function AccountProfilePage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Profile" description="Customer profile fields will load from the customer API." />
      <EmptyState title="Profile" description="No profile record is loaded yet." />
    </div>
  );
}
