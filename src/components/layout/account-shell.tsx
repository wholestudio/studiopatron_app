import Link from "next/link";
import type { ReactNode } from "react";

import { accountNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function AccountShell({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
      <nav aria-label="Account" className="lg:sticky lg:top-24 lg:self-start">
        <ul className="flex gap-3 overflow-x-auto lg:flex-col lg:gap-1">
          {accountNavigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "block whitespace-nowrap rounded-md px-3 py-2 text-sm text-ink-muted hover:bg-linen hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>{children}</div>
    </div>
  );
}
