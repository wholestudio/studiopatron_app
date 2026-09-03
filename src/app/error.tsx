"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { routes } from "@/constants/routes";

type AppErrorProps = {
  error: globalThis.Error & { digest?: string };
  reset: () => void;
};

export default function AppError({ error, reset }: AppErrorProps) {
  void error;

  return (
    <div className="mx-auto flex max-w-xl flex-col items-start gap-4 px-4 py-24">
      <h1 className="font-display text-4xl text-ink">Something went wrong</h1>
      <p className="text-ink-muted">An unexpected error occurred. You can try again or return home.</p>
      <div className="flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Link href={routes.home} className="inline-flex h-11 items-center text-sm text-ink-muted hover:text-ink">
          Home
        </Link>
      </div>
    </div>
  );
}
