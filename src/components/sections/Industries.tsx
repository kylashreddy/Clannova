"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Briefcase,
  Building2,
  Check,
  GraduationCap,
  Plus,
  Rocket,
  ShoppingBag,
  Stethoscope,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";
import { industries, type Industry, type IndustryId } from "@/lib/content";
import { cn } from "@/lib/cn";
import { SectionHeading } from "../ui/SectionHeading";
import { EnquireButton } from "../ui/EnquireButton";

const icons: Record<IndustryId, LucideIcon> = {
  restaurants: UtensilsCrossed,
  healthcare: Stethoscope,
  retail: ShoppingBag,
  education: GraduationCap,
  realestate: Building2,
  startups: Rocket,
  professional: Briefcase,
};

/** A small, clickable phone mock showing what the customer-facing side could look like.
 *  It remounts per industry (keyed panel), which resets its selection. */
function PhonePreview({ industry }: { industry: Industry }) {
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const { preview } = industry;
  return (
    <div className="relative mx-auto w-full max-w-[290px]">
      <div className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgb(57_213_255/0.16),transparent_65%)]" aria-hidden />
      <div className="rounded-[2.4rem] border border-line-strong bg-[#050913] p-2.5 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)]">
        <div className="relative overflow-hidden rounded-[1.9rem] bg-navy">
          <div className="mx-auto mt-2 h-5 w-24 rounded-full bg-[#050913]" aria-hidden />
          <div className="px-5 pb-6 pt-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">Concept preview</p>
            <p className="mt-2 font-display text-lg font-semibold leading-tight text-ice">{preview.title}</p>
            <p className="text-xs text-steel">{preview.subtitle}</p>
            <ul className="mt-5 space-y-2" role="listbox" aria-label={`${preview.title} options`}>
              {preview.items.map((it, i) => {
                const on = picked === i;
                return (
                  <li key={it.label} role="option" aria-selected={on}>
                    <button
                      type="button"
                      onClick={() => {
                        setPicked(i);
                        setDone(false);
                      }}
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl border px-3.5 py-3 text-left text-sm transition-all duration-300",
                        on ? "border-cyan/60 bg-cyan/10 text-ice" : "border-line bg-space/50 text-ice/90 hover:border-line-strong",
                      )}
                    >
                      <span>{it.label}</span>
                      <span className="flex items-center gap-2 font-mono text-[10px] text-steel">
                        {it.meta}
                        <span className={cn("grid size-5 place-items-center rounded-full", on ? "bg-cyan text-space" : "border border-line-strong")}>
                          {on ? <Check className="size-3" /> : <Plus className="size-3" />}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <button
              type="button"
              disabled={picked === null}
              onClick={() => setDone(true)}
              className="mt-5 w-full rounded-xl bg-cyan py-3 text-sm font-semibold text-space transition-opacity disabled:opacity-40"
            >
              {preview.action}
            </button>
            <p aria-live="polite" className="mt-3 h-4 text-center font-mono text-[10px] text-steel">
              {done ? "✓ Demo only: in your system this would notify you instantly." : picked === null ? "Tap an option to try it" : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Industries() {
  const [active, setActive] = useState<IndustryId>("restaurants");
  const reduce = useReducedMotion();
  const uid = useId();
  const current = industries.find((i) => i.id === active)!;

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = industries[(i + dir + industries.length) % industries.length];
    setActive(next.id);
    document.getElementById(`${uid}-tab-${next.id}`)?.focus();
  };

  return (
    <section id="industries" aria-labelledby="industries-title" className="section-y relative overflow-hidden border-t border-line bg-navy/30">
      <div aria-hidden className="grid-backdrop absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div className="container-x">
        <SectionHeading
          id="industries-title"
          eyebrow="Industry solutions"
          title="Your industry. Your challenges. Our solutions."
          intro="Every sector has its own bottlenecks. Pick yours to see the problems we usually solve and the systems we would put in place."
        />

        <div
          role="tablist"
          aria-label="Industries"
          className="-mx-4 mt-12 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {industries.map((ind, i) => {
            const Icon = icons[ind.id];
            const on = ind.id === active;
            return (
              <button
                key={ind.id}
                id={`${uid}-tab-${ind.id}`}
                role="tab"
                type="button"
                aria-selected={on}
                aria-controls={`${uid}-panel`}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(ind.id)}
                onKeyDown={(e) => onKey(e, i)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-all duration-300",
                  on ? "border-cyan/60 bg-cyan/10 text-ice" : "border-line text-steel hover:border-line-strong hover:text-ice",
                )}
              >
                <Icon aria-hidden className={cn("size-4", on ? "text-cyan" : "")} />
                {ind.name}
              </button>
            );
          })}
        </div>

        <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${active}`} className="mt-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]"
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel">The challenge</p>
                <p className="mt-3 max-w-2xl font-display text-2xl leading-snug tracking-tight text-ice sm:text-3xl text-pretty">
                  {current.challenge}
                </p>

                <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-steel">The solution stack</p>
                <ol className="mt-4 flex flex-wrap items-center gap-2">
                  {current.stack.map((s, i) => (
                    <li key={s} className="flex items-center gap-2">
                      {i > 0 && (
                        <span aria-hidden className="font-mono text-cyan">
                          +
                        </span>
                      )}
                      <span className="rounded-xl border border-line-strong bg-space/60 px-4 py-2.5 font-display text-sm font-medium text-ice sm:text-base">
                        {s}
                      </span>
                    </li>
                  ))}
                </ol>

                <ul className="mt-10 grid gap-4 sm:grid-cols-3">
                  {current.outcomes.map((o) => (
                    <li key={o} className="border-l border-cyan/50 pl-4 text-sm leading-relaxed text-steel">
                      {o}
                    </li>
                  ))}
                </ul>

                <Link href={`/industries/${current.slug}`} className="mt-8 block text-sm text-cyan underline-offset-4 hover:underline">
                  See solutions for {current.name} →
                </Link>
                <EnquireButton
                  className="mt-6"
                  prefill={{
                    industry: current.formValue,
                    description: `We're a ${current.name.toLowerCase()} business interested in: ${current.stack.join(" + ")}.`,
                  }}
                >
                  Discuss a solution for {current.name}
                </EnquireButton>
              </div>

              <PhonePreview industry={current} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
