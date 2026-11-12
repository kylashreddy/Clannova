"use client";

import type { ReactNode } from "react";
import { prefillEnquiry, type Prefill } from "@/lib/prefill";
import { Button } from "./Button";

export function EnquireButton({
  prefill,
  children,
  variant = "secondary",
  className,
}: {
  prefill: Prefill;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  return (
    <Button type="button" variant={variant} arrow className={className} onClick={() => prefillEnquiry(prefill)}>
      {children}
    </Button>
  );
}
