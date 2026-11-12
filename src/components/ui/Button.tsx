import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-[#f4f7fc] text-[#070a12] hover:bg-white shadow-[0_8px_30px_-12px_rgb(255_255_255/0.45)]",
  secondary: "border border-line-strong bg-surface text-ice backdrop-blur hover:border-white/25 hover:bg-white/[0.06]",
  ghost: "text-ice hover:text-cyan",
};

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-medium tracking-[-0.01em] transition-all duration-300 ease-out-expo disabled:pointer-events-none disabled:opacity-60";

type Common = { variant?: Variant; arrow?: boolean; children: ReactNode; className?: string };

function Inner({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );
}

export function ButtonLink({ variant = "primary", arrow, children, className, ...rest }: Common & Omit<ComponentProps<typeof Link>, "children">) {
  return (
    <Link className={cn(base, styles[variant], className)} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </Link>
  );
}

export function Button({ variant = "primary", arrow, children, className, ...rest }: Common & Omit<ComponentProps<"button">, "children">) {
  return (
    <button className={cn(base, styles[variant], className)} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}
