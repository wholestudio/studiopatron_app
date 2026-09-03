import type { Metadata } from "next";
import Link from "next/link";

import { RegisterForm } from "@/app/register/register-form";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { routes } from "@/constants/routes";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Create account",
  path: routes.register,
  robots: { index: false, follow: false },
});

export default function RegisterPage() {
  return (
    <Container className="py-12 sm:py-16">
      <PageHeader
        title="Create account"
        description="Registration will be completed when the backend auth flow is connected."
      />
      <RegisterForm />
      <p className="mt-6 text-sm text-ink-muted">
        Already have an account?{" "}
        <Link href={routes.login} className="text-ink underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
    </Container>
  );
}
