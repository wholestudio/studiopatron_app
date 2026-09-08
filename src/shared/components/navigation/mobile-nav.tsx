"use client";

import Link from "next/link";
import { useRef } from "react";

import { conversionNavigation, primaryNavigation } from "@/infra/config/navigation";
import { routes } from "@/shared/constants/routes";

export function MobileNav() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function close() {
    dialogRef.current?.close();
  }

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="rounded-md border border-ink/15 px-3 py-2 text-sm text-ink"
        aria-haspopup="dialog"
        aria-controls="mobile-navigation"
        onClick={() => dialogRef.current?.showModal()}
      >
        Menu
      </button>
      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        className="h-[min(100%,40rem)] w-[min(24rem,calc(100%-1.5rem))] rounded-lg border border-ink/10 bg-paper p-6 text-ink backdrop:bg-ink/40"
        aria-label="Mobile navigation"
      >
        <div className="mb-6 flex items-center justify-between">
          <p className="font-display text-xl">Menu</p>
          <button type="button" className="text-sm text-ink-muted hover:text-ink" onClick={close}>
            Close
          </button>
        </div>
        <nav>
          <ul className="flex flex-col gap-3">
            {primaryNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block py-1 text-lg text-ink" onClick={close}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-col gap-3 border-t border-ink/10 pt-6">
            {conversionNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block py-1 text-base text-ink" onClick={close}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={routes.cart} className="block py-1 text-base text-ink" onClick={close}>
                Cart
              </Link>
            </li>
            <li>
              <Link href={routes.login} className="block py-1 text-base text-ink" onClick={close}>
                Sign in
              </Link>
            </li>
          </ul>
        </nav>
      </dialog>
    </div>
  );
}
