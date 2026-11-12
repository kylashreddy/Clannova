"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bot, Boxes, Code2, TrendingUp, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";
import { services, type Service, type ServiceId } from "@/lib/content";
import { cn } from "@/lib/cn";
import { SectionHeading } from "../ui/SectionHeading";
import { EnquireButton } from "../ui/EnquireButton";
import { ServiceVisual } from "../visuals/ServiceVisuals";

const icons: Record<ServiceId, LucideIcon> = { web: Code2, ai: Bot, software: Boxes, growth: TrendingUp };

const formService: Record<ServiceId, "Website" | "AI assistant / agent" | "CRM / business software" | "SEO & digital presence"> = {
  web: "Website",
  ai: "AI assistant / agent",
  software: "CRM / business software",
  growth: "SEO & digital presence",
};

const accentText: Record<Service["accent"], string> = {
  cyan: "text-cyan",
  violet: "text-violet",
  mix: "text-gradient",
  ice: "text-ice",
};

export function Services() {
  const [active, setActive] = useState<ServiceId>("web");
  const reduce = useReducedMotion();
  const uid = useId();
  const current = services.find((s) => s.id === active)!;

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = services[(i + dir + services.length) % services.length];
    setActive(next.id);
    document.getElementById(`${uid}-tab-${next.id}`)?.focus();
  };

  return (
    <section id="services" aria-labelledby="services-title" className="section-y relative border-t border-line">
      <div className="container-x">
        <SectionHeading
          id="services-title"
          eyebrow="Services"
          title="Everything your business needs to move forward."
          intro="Four focused divisions, one team. Start with what matters most today and add the rest as you grow."
          align="center"
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div role="tablist" aria-label="Service divisions" aria-orientation="vertical" className="flex flex-col">
            {services.map((s, i) => {
              const Icon = icons[s.id];
              const on = s.id === active;
              return (
                <button
                  key={s.id}
                  id={`${uid}-tab-${s.id}`}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  aria-controls={`${uid}-panel`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(s.id)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={cn(
                    "group relative border-t border-line py-6 text-left transition-colors duration-300 last:border-b",
                    on ? "text-ice" : "text-steel hover:text-ice",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -top-px left-0 h-px bg-gradient-brand transition-all duration-700 ease-out-expo",
                      on ? "w-full" : "w-0",
                    )}
                  />
                  <span className="flex items-start gap-5">
                    <span className="mt-1 font-mono text-xs text-steel">{s.index}</span>
                    <span className="flex-1">
                      <span className="flex items-center justify-between gap-4">
                        <span className="font-display text-xl font-medium tracking-tight sm:text-2xl">{s.title}</span>
                        <Icon aria-hidden className={cn("size-5 shrink-0 transition-colors", on ? "text-cyan" : "text-steel/50")} />
                      </span>
                      <span
                        className={cn(
                          "grid transition-all duration-500 ease-out-expo",
                          on ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <span className="overflow-hidden text-sm leading-relaxed text-steel">{s.short}</span>
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${active}`} className="relative min-h-[560px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-[28px] border border-line bg-surface p-5 sm:p-8"
              >
                <div className="grid gap-8 xl:grid-cols-[1fr_1fr]">
                  <div className="order-2 xl:order-1">
                    <p className={cn("font-mono text-xs uppercase tracking-[0.2em]", accentText[current.accent])}>
                      Division {current.index}
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">{current.title}</h3>
                    <p className="mt-4 leading-relaxed text-steel">{current.summary}</p>
                    <Link href={`/services/${current.slug}`} className="mt-4 inline-block text-sm text-cyan underline-offset-4 hover:underline">
                      Learn more about {current.title} →
                    </Link>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {current.capabilities.map((c) => (
                        <li key={c} className="rounded-full border border-line-strong px-3 py-1.5 text-xs text-ice">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="order-1 h-[300px] xl:order-2 xl:h-auto">
                    <ServiceVisual id={current.id} />
                  </div>
                </div>
                <div className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel">{current.useCase.label}</p>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-ice">{current.useCase.text}</p>
                  </div>
                  <EnquireButton prefill={{ service: formService[current.id] }} className="w-full sm:w-auto">
                    Enquire about this
                  </EnquireButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
