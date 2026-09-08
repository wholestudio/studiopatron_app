import Link from "next/link";

import { accountNavigation } from "@/infra/config/navigation";

export function AccountNav() {
  return (
    <nav aria-label="Account">
      <ul className="flex flex-col gap-1">
        {accountNavigation.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="block rounded-md px-3 py-2 text-sm hover:bg-linen">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
