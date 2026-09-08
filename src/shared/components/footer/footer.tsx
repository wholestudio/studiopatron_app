import Link from "next/link";

import { Container } from "@/shared/components/ui/container";
import { footerNavigation } from "@/infra/config/navigation";
import { siteConfig } from "@/infra/config/site";
import { routes } from "@/shared/constants/routes";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-ink/10 bg-ink text-paper">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="max-w-xs">
          <p className="font-display text-2xl">{siteConfig.name}</p>
          <p className="mt-3 text-sm leading-6 text-paper/70">
            Interior design, interior services, and curated commerce.
          </p>
        </div>
        <FooterGroup title="Explore" items={footerNavigation.explore} />
        <FooterGroup title="Start a project" items={footerNavigation.services} />
        <FooterGroup title="Account" items={footerNavigation.account} />
      </Container>
      <Container className="flex flex-col gap-3 border-t border-paper/10 py-6 text-sm text-paper/60 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <Link href={routes.contact} className="hover:text-paper">
          Contact
        </Link>
      </Container>
    </footer>
  );
}

function FooterGroup({
  title,
  items,
}: {
  title: string;
  items: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="text-sm font-medium text-paper">{title}</p>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={`${title}-${item.href}`}>
            <Link href={item.href} className="text-sm text-paper/70 hover:text-paper">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
