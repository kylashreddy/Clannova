"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, RotateCcw, Sparkles } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { engagementModels, industryOptions, serviceOptions, services } from "@/lib/content";
import {
  businessTypes,
  goals as goalList,
  problems as problemList,
  recommend,
  type BusinessType,
  type GoalId,
  type ProblemId,
} from "@/lib/finder";
import { cn } from "@/lib/cn";
import { prefillEnquiry } from "@/lib/prefill";
import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";

const steps = ["What type of business do you operate?", "What problem are you facing?", "What would you like to improve?"];

const businessToIndustry: Record<BusinessType, (typeof industryOptions)[number]> = {
  restaurant: "Restaurants & Food",
  clinic: "Healthcare",
  retail: "Retail",
  education: "Education",
  realestate: "Real Estate",
  startup: "Startup",
  professional: "Professional Services",
  other: "Other",
};

const solutionToService: Record<string, (typeof serviceOptions)[number]> = {
  website: "Website",
  ecommerce: "E-commerce",
  booking: "Web application",
  ordering: "Web application",
  webapp: "Web application",
  whatsapp: "WhatsApp automation",
  aiSupport: "AI assistant / agent",
  workflow: "Workflow automation",
  crm: "CRM / business software",
  dashboard: "CRM / business software",
  inventory: "Inventory / billing system",
  billing: "Inventory / billing system",
  seo: "SEO & digital presence",
  gbp: "SEO & digital presence",
  maintenance: "Website maintenance",
};

function Choice({
  selected,
  onClick,
  children,
  hint,
  multi,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  hint?: string;
  multi?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "group flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-300",
        selected ? "border-cyan/60 bg-cyan/[0.08]" : "border-line bg-space/40 hover:border-line-strong hover:bg-white/[0.02]",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "mt-0.5 grid size-5 shrink-0 place-items-center border transition-colors",
          multi ? "rounded-md" : "rounded-full",
          selected ? "border-cyan bg-cyan text-space" : "border-line-strong",
        )}
      >
        {selected && <Check className="size-3.5" strokeWidth={3} />}
      </span>
      <span>
        <span className="block text-sm font-medium text-ice sm:text-base">{children}</span>
        {hint && <span className="mt-0.5 block text-xs text-steel">{hint}</span>}
      </span>
    </button>
  );
}

export function SolutionFinder() {
  const [step, setStep] = useState(0);
  const [business, setBusiness] = useState<BusinessType | null>(null);
  const [problems, setProblems] = useState<ProblemId[]>([]);
  const [goals, setGoals] = useState<GoalId[]>([]);
  const reduce = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);

  const result = useMemo(
    () => (step === 3 && business ? recommend({ business, problems, goals }) : null),
    [step, business, problems, goals],
  );

  const canNext = (step === 0 && business) || (step === 1 && problems.length > 0) || (step === 2 && goals.length > 0);

  const go = (n: number) => setStep(n);

  // Once the outgoing step has animated away, move focus to the new question so
  // keyboard and screen-reader users follow along.
  const focusQuestion = () => headingRef.current?.focus({ preventScroll: true });

  const toggle = <T,>(v: T, set: React.Dispatch<React.SetStateAction<T[]>>) =>
    set((list) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]));

  const reset = () => {
    setBusiness(null);
    setProblems([]);
    setGoals([]);
    go(0);
  };

  const discuss = () => {
    if (!business || !result) return;
    const b = businessTypes.find((x) => x.id === business)!.label;
    const p = problems.map((id) => problemList.find((x) => x.id === id)!.label.toLowerCase());
    const g = goals.map((id) => goalList.find((x) => x.id === id)!.label.toLowerCase());
    prefillEnquiry({
      industry: businessToIndustry[business],
      service: solutionToService[result.items[0]?.id] ?? "Not sure yet",
      description: `Business: ${b}.\nChallenges: ${p.join("; ")}.\nGoals: ${g.join("; ")}.\nSuggested by the solution finder: ${result.items.map((i) => i.name).join(", ")}.`,
    });
  };

  const engagement = result ? engagementModels.find((m) => m.id === result.engagement)! : null;

  return (
    <section id="finder" aria-labelledby="finder-title" className="section-y relative border-t border-line">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              id="finder-title"
              eyebrow="Find your business solution"
              title={
                <>
                  Not sure what you need? <span className="text-gradient">Start here.</span>
                </>
              }
              intro="Answer three quick questions in plain language. We'll suggest the services that fit your business, with no technical knowledge required."
            />
            <ol aria-label="Progress" className="mt-10 hidden space-y-3 lg:block">
              {[...steps, "Your recommendations"].map((s, i) => (
                <li key={s} className={cn("flex items-center gap-4 text-sm transition-colors", i === step ? "text-ice" : i < step ? "text-steel" : "text-steel/50")}>
                  <span
                    className={cn(
                      "grid size-7 place-items-center rounded-full border font-mono text-[11px]",
                      i < step ? "border-cyan bg-cyan text-space" : i === step ? "border-cyan text-cyan" : "border-line",
                    )}
                  >
                    {i < step ? <Check className="size-3.5" /> : i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-3xl border border-line bg-navy/50 p-5 sm:p-8">
            <div className="mb-8 flex items-center gap-3" aria-hidden>
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-slate">
                  <span className={cn("block h-full bg-gradient-brand transition-all duration-700 ease-out-expo", i <= step ? "w-full" : "w-0")} />
                </span>
              ))}
            </div>

            <AnimatePresence mode="wait" initial={false} onExitComplete={focusQuestion}>
              <motion.div
                key={step}
                initial={reduce ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
                  {step < 3 ? `Step ${step + 1} of 3` : "Your recommendations"}
                </p>
                <h3 ref={headingRef} tabIndex={-1} className="mt-3 font-display text-2xl font-semibold tracking-tight outline-none sm:text-3xl">
                  {step < 3 ? steps[step] : "Here's where we'd start."}
                </h3>
                {step > 0 && step < 3 && <p className="mt-2 text-sm text-steel">Choose all that apply.</p>}

                {step === 0 && (
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {businessTypes.map((b) => (
                      <Choice key={b.id} selected={business === b.id} hint={b.hint} onClick={() => setBusiness(b.id)}>
                        {b.label}
                      </Choice>
                    ))}
                  </div>
                )}
                {step === 1 && (
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {problemList.map((p) => (
                      <Choice key={p.id} multi selected={problems.includes(p.id)} onClick={() => toggle(p.id, setProblems)}>
                        {p.label}
                      </Choice>
                    ))}
                  </div>
                )}
                {step === 2 && (
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {goalList.map((g) => (
                      <Choice key={g.id} multi selected={goals.includes(g.id)} onClick={() => toggle(g.id, setGoals)}>
                        {g.label}
                      </Choice>
                    ))}
                  </div>
                )}

                {step === 3 && result && engagement && (
                  <div className="mt-8">
                    <ol className="space-y-3" aria-live="polite">
                      {result.items.map((r, i) => {
                        const division = services.find((s) => s.id === r.service)!;
                        return (
                          <motion.li
                            key={r.id}
                            initial={reduce ? false : { opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08 * i }}
                            className={cn("rounded-2xl border p-5", i === 0 ? "border-cyan/50 bg-cyan/[0.06]" : "border-line bg-space/40")}
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <h4 className="flex items-center gap-2 font-display text-lg font-semibold text-ice">
                                {i === 0 && <Sparkles aria-hidden className="size-4 text-cyan" />}
                                {r.name}
                              </h4>
                              <span className="font-mono text-[10px] uppercase tracking-wider text-steel">
                                {division.index} · {division.title}
                              </span>
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-steel">{r.what}</p>
                            <p className="mt-3 text-xs text-steel">
                              <span className="text-cyan">Why:</span> {r.reasons.join(" · ")}
                            </p>
                          </motion.li>
                        );
                      })}
                    </ol>
                    <div className="mt-6 rounded-2xl border border-violet/30 bg-violet/[0.06] p-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-violet">Suggested engagement</p>
                      <p className="mt-1 font-display text-lg font-semibold">{engagement.name}</p>
                      <p className="mt-1 text-sm text-steel">{engagement.forWho}</p>
                    </div>
                    <p className="mt-4 text-xs text-steel/80">
                      These suggestions are a starting point based on your answers. We confirm the right plan together in a free
                      discovery call.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              {step > 0 ? (
                <button type="button" onClick={() => (step === 3 ? reset() : go(step - 1))} className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm text-steel hover:text-ice">
                  {step === 3 ? <RotateCcw className="size-4" /> : <ArrowLeft className="size-4" />}
                  {step === 3 ? "Start over" : "Back"}
                </button>
              ) : (
                <span className="hidden sm:block" />
              )}
              {step < 3 ? (
                <Button type="button" disabled={!canNext} onClick={() => go(step + 1)}>
                  {step === 2 ? "See recommendations" : "Continue"}
                  <ArrowRight aria-hidden className="ml-1 inline size-4" />
                </Button>
              ) : (
                <Button type="button" arrow onClick={discuss}>
                  Discuss this plan
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
