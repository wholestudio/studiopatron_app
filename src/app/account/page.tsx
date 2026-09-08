import type { Metadata } from "next";

import { PageHeader } from "@/shared/components/layout/page-header";
import { EmptyState } from "@/shared/components/ui/empty-state";
import { routes } from "@/shared/constants/routes";
import { createPageMetadata } from "@/infra/seo";

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
