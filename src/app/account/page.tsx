import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { routes } from "@/constants/routes";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Account",
  path: routes.account,
  robots: { index: false, follow: false },
});

export default function AccountPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Account"
        description="Customer session data will appear here after authentication is connected."
      />
      <EmptyState
        title="Account overview"
        description="Profile, addresses, and orders will load from /api/v1/customer/*."
      />
    </div>
  );
}
