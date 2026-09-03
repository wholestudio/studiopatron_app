import Link from "next/link";

import { Logo } from "@/components/header/logo";
import { DesktopNav } from "@/components/navigation/desktop-nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { Container } from "@/components/ui/container";
import { SearchInput } from "@/components/ui/search-input";
import { routes } from "@/constants/routes";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <Logo />
        <DesktopNav />
        <div className="hidden items-center gap-4 lg:flex">
          <SearchInput />
          <Link href={routes.quote} className="text-sm font-medium text-ink hover:text-bronze">
            Request a quote
          </Link>
          <Link href={routes.cart} className="text-sm text-ink-muted hover:text-ink">
            Cart
          </Link>
          <Link href={routes.login} className="text-sm text-ink-muted hover:text-ink">
            Sign in
          </Link>
        </div>
        <MobileNav />
      </Container>
    </header>
  );
}
