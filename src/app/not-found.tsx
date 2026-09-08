import Link from "next/link";

import { routes } from "@/shared/constants/routes";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-start gap-4 px-4 py-24">
      <p className="text-sm uppercase tracking-[0.2em] text-bronze">404</p>
      <h1 className="font-display text-4xl text-ink">Page not found</h1>
      <p className="text-ink-muted">The page you requested is not available.</p>
      <Link href={routes.home} className="text-sm font-medium text-bronze hover:text-bronze-hover">
        Return home
      </Link>
    </div>
  );
}
