"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

const pairs = [
  { need: "More enquiries and customers", build: "A conversion-focused website with SEO foundations" },
  { need: "Faster replies, even after hours", build: "An AI assistant on your website and WhatsApp" },
  { need: "Less copy-paste and paperwork", build: "Automated workflows between your tools" },
  { need: "A clear view of the business", build: "A live dashboard for sales, stock and staff" },
];

/** Hover or focus a business need to see the system that answers it. */
export function Bridge() {
  const [active, setActive] = useState(0);
  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-navy/50 p-6 sm:p-8">
      <div className="mb-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-steel">
        <span>Business need</span>
        <span aria-hidden className="w-8" />
        <span className="text-right">What we build</span>
      </div>
      <ul className="space-y-2">
        {pairs.map((p, i) => {
          const on = active === i;
          return (
            <li key={p.need}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={on}
                className={cn(
                  "grid w-full grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-500 sm:gap-4",
                  on ? "border-cyan/40 bg-cyan/[0.06]" : "border-transparent hover:bg-white/[0.02]",
                )}
              >
                <span className={cn("text-sm sm:text-base transition-colors", on ? "text-ice" : "text-steel")}>{p.need}</span>
                <span aria-hidden className="relative flex h-px w-8 items-center sm:w-12">
                  <span className={cn("absolute inset-0 origin-left bg-gradient-brand transition-transform duration-500", on ? "scale-x-100" : "scale-x-0")} />
                  <ArrowRight className={cn("absolute -right-2 size-4 transition-all duration-500", on ? "text-violet opacity-100" : "opacity-0")} />
                </span>
                <span className={cn("text-right text-sm sm:text-base transition-colors", on ? "text-ice" : "text-steel/60")}>{p.build}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 border-t border-line pt-5 font-mono text-xs text-steel">
        <span className="text-cyan">→</span> Requirements first. Technology second.
      </p>
    </div>
  );
}
