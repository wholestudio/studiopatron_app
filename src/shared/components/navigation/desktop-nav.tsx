import Link from "next/link";

import { primaryNavigation } from "@/infra/config/navigation";

export function DesktopNav() {
  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-6">
        {primaryNavigation.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-sm text-ink-muted transition-colors hover:text-ink">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
