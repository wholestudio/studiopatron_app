import Link from "next/link";

import { siteConfig } from "@/infra/config/site";
import { routes } from "@/shared/constants/routes";

export function Logo() {
  return (
    <Link href={routes.home} className="group flex items-center gap-3 text-ink">
      <span aria-hidden="true" className="relative block h-8 w-8">
        <span className="absolute inset-0 border border-ink" />
        <span className="absolute inset-1.5 border border-bronze" />
      </span>
      <span className="font-display text-xl tracking-wide">{siteConfig.name}</span>
    </Link>
  );
}
