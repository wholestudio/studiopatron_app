"use client";

import { useRef, type ReactNode } from "react";

import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils";

type DialogProps = {
  title: string;
  triggerLabel: string;
  children: ReactNode;
  className?: string;
};

export function Dialog({ title, triggerLabel, children, className }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <Button
        variant="secondary"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
      >
        {triggerLabel}
      </Button>
      <dialog
        ref={dialogRef}
        className={cn(
          "w-[min(32rem,calc(100%-2rem))] rounded-lg border border-ink/10 bg-paper p-6 text-ink shadow-lg backdrop:bg-ink/40",
          className,
        )}
        aria-labelledby="dialog-title"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id="dialog-title" className="font-display text-2xl">
            {title}
          </h2>
          <Button variant="ghost" size="sm" onClick={() => dialogRef.current?.close()}>
            Close
          </Button>
        </div>
        {children}
      </dialog>
    </>
  );
}
