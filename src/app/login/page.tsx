import type { Metadata } from "next";
import Link from "next/link";

import { LoginForm } from "@/app/login/login-form";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { routes } from "@/constants/routes";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Sign in",
  path: routes.login,
  robots: { index: false, follow: false },
});

export default function LoginPage() {
  return (
    <Container className="py-12 sm:py-16">
      <PageHeader
        title="Sign in"
        description="Customer authentication will be completed when the backend auth flow is connected."
      />
      <LoginForm />
      <p className="mt-6 text-sm text-ink-muted">
        Need an account?{" "}
        <Link href={routes.register} className="text-ink underline-offset-4 hover:underline">
          Create one
        </Link>
      </p>
    </Container>
  );
}
