"use client";

import type { ReactNode } from "react";

import { QueryProvider } from "@/infra/query/provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
