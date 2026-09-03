import type { ReactNode } from "react";

import { AccountShell } from "@/components/layout/account-shell";
import { Container } from "@/components/ui/container";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <Container className="py-12 sm:py-16">
      <AccountShell>{children}</AccountShell>
    </Container>
  );
}
