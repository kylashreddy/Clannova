import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-cyan text-space hover:bg-[#6fe0ff] shadow-[0_0_0_1px_rgb(57_213_255/0.4),0_10px_30px_-10px_rgb(57_213_255/0.6)]",
  secondary: "border border-line-strong text-ice hover:border-cyan/60 hover:bg-cyan/5",
  ghost: "text-ice hover:text-cyan",
};

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3.5 text-sm font-semibold tracking-tight transition-all duration-300 ease-out-expo disabled:pointer-events-none disabled:opacity-60";

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
