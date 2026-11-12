"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CircleCheck, Copy, LoaderCircle, Mail, TriangleAlert } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { budgetOptions, industryOptions, serviceOptions } from "@/lib/content";
import { leadSchema, type LeadField, type LeadInput } from "@/lib/lead-schema";
import { cn } from "@/lib/cn";
import { onPrefill } from "@/lib/prefill";
import { site } from "@/lib/site";
import { Button } from "../ui/Button";
import { Turnstile, turnstileSiteKey } from "../ui/Turnstile";
import { Reveal } from "../ui/Reveal";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "not-configured" }
  | { kind: "error"; message: string };

const empty: LeadInput = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  industry: "" as LeadInput["industry"],
  service: "" as LeadInput["service"],
  budget: "" as LeadInput["budget"],
  description: "",
  website: "",
};

type Errors = Partial<Record<LeadField, string>>;

function validate(values: LeadInput): Errors {
  const r = leadSchema.safeParse(values);
  if (r.success) return {};
  const errs: Errors = {};
  for (const issue of r.error.issues) {
    const k = issue.path[0] as LeadField;
    if (!errs[k]) errs[k] = issue.message;
  }
  return errs;
}

const inputBase =
  "w-full rounded-xl border bg-space/60 px-4 py-3.5 text-[15px] text-ice placeholder:text-steel/60 transition-colors duration-300 focus:border-cyan/70 focus:bg-space focus:outline-none";

export function Contact() {
  const uid = useId();
  const reduce = useReducedMotion();
  const [values, setValues] = useState<LeadInput>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<LeadField, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [copied, setCopied] = useState(false);
  const [botToken, setBotToken] = useState("");
  const [botReset, setBotReset] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(
    () =>
      onPrefill((p) => {
        setValues((v) => ({
          ...v,
          ...Object.fromEntries(Object.entries(p).filter(([, val]) => val)),
          // Keep anything the visitor already typed in the description.
          description: v.description.trim() ? v.description : (p.description ?? v.description),
        }));
        setStatus({ kind: "idle" });
      }),
    [],
  );

  const set = (k: LeadField, val: string) => {
    const next = { ...values, [k]: val };
    setValues(next);
    if (touched[k]) setErrors((e) => ({ ...e, [k]: validate(next)[k] }));
  };

  const blur = (k: LeadField) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors((e) => ({ ...e, [k]: validate(values)[k] }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched(Object.fromEntries(Object.keys(empty).map((k) => [k, true])));
    const first = Object.keys(errs)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (turnstileSiteKey && !botToken) {
      setStatus({ kind: "error", message: "Please complete the verification below before sending." });
      return;
    }
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, turnstileToken: botToken }),
      });
      const data = (await res.json().catch(() => ({}))) as { code?: string; message?: string; errors?: Errors };
      // Turnstile tokens are single-use.
      setBotToken("");
      setBotReset((n) => n + 1);
      if (res.ok) {
        setStatus({ kind: "success" });
        setValues(empty);
        setTouched({});
      } else if (data.code === "NOT_CONFIGURED") {
        setStatus({ kind: "not-configured" });
      } else if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus({ kind: "idle" });
      } else {
        setStatus({ kind: "error", message: data.message ?? "Something went wrong on our side. Please try again." });
      }
    } catch {
      setStatus({ kind: "error", message: "We couldn't reach the server. Check your connection and try again." });
    }
  };

  const summary = () =>
    [
      `Name: ${values.fullName}`,
      values.company && `Company: ${values.company}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone}`,
      `Industry: ${values.industry}`,
      `Service: ${values.service}`,
      `Budget: ${values.budget}`,
      "",
      values.description,
    ]
      .filter(Boolean)
      .join("\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable; the mailto link remains */
    }
  };

  const field = (k: LeadField) => ({
    id: `${uid}-${k}`,
    name: k,
    value: values[k] ?? "",
    onBlur: () => blur(k),
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${uid}-${k}-err` : undefined,
    className: cn(inputBase, errors[k] ? "border-[#ff7a7a]/70" : "border-line-strong"),
  });

  const label = (k: LeadField, children: React.ReactNode, optional?: boolean) => (
    <label htmlFor={`${uid}-${k}`} className="mb-2 flex items-baseline justify-between text-sm font-medium text-ice">
      <span>
        {children}
        {!optional && (
          <span aria-hidden className="text-cyan">
            {" "}
            *
          </span>
        )}
      </span>
      {optional && <span className="text-xs font-normal text-steel">Optional</span>}
    </label>
  );

  const err = (k: LeadField) =>
    errors[k] ? (
      <p id={`${uid}-${k}-err`} className="mt-2 text-xs text-[#ff9b9b]">
        {errors[k]}
      </p>
    ) : null;

  const select = (k: LeadField, options: readonly string[], placeholder: string) => (
    <select {...field(k)} required onChange={(e) => set(k, e.target.value)} className={cn(field(k).className, "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%238493AA%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-11", !values[k] && "text-steel/70")}>
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );

  const mailto = site.email
    ? `mailto:${site.email}?subject=${encodeURIComponent(`Project enquiry from ${values.fullName || "website"}`)}&body=${encodeURIComponent(summary())}`
    : "";

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y relative overflow-hidden border-t border-line">
      <div aria-hidden className="absolute -left-40 top-20 -z-10 size-[600px] rounded-full bg-[radial-gradient(circle,rgb(57_213_255/0.1),transparent_60%)] blur-2xl" />
      <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">
            <span aria-hidden className="size-1.5 rounded-full bg-cyan" />
            Contact
          </p>
          <h2 id="contact-title" className="display-lg text-fade mt-6 pb-1">
            Let&apos;s build <span className="text-gradient">what&apos;s next.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-steel">
            Tell us about your business and what you want to achieve. No jargon required: we&apos;ll handle the technical side.
          </p>

          <ol className="mt-10 space-y-5">
            {[
              ["We review your enquiry", "and come back with questions or initial thoughts."],
              ["Free discovery call", "to understand your goals, users and constraints."],
              ["Clear proposal", "with scope, timeline and an itemised quote."],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line-strong font-mono text-[11px] text-cyan">
                  0{i + 1}
                </span>
                <p className="pt-1 text-sm leading-relaxed text-steel">
                  <span className="text-ice">{t}</span> {d}
                </p>
              </li>
            ))}
          </ol>

          {(site.email || site.phone) && (
            <div className="mt-10 space-y-2 border-t border-line pt-6 text-sm">
              {site.email && (
                <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-ice hover:text-cyan">
                  <Mail className="size-4 text-cyan" /> {site.email}
                </a>
              )}
              {site.phone && (
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="block text-ice hover:text-cyan">
                  {site.phone}
                </a>
              )}
            </div>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative rounded-[28px] border border-line bg-surface p-5 sm:p-9">
            <AnimatePresence mode="wait" initial={false}>
              {status.kind === "success" ? (
                <motion.div
                  key="success"
                  role="status"
                  initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex min-h-[520px] flex-col items-center justify-center text-center"
                >
                  <CircleCheck className="size-14 text-cyan" aria-hidden />
                  <h3 className="mt-6 font-display text-3xl font-semibold">Enquiry received.</h3>
                  <p className="mt-3 max-w-sm text-steel">
                    Thank you. Your details reached our team and we&apos;ll get back to you shortly.
                  </p>
                  <Button variant="secondary" className="mt-8" onClick={() => setStatus({ kind: "idle" })}>
                    Send another enquiry
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  noValidate
                  onSubmit={submit}
                  aria-labelledby="contact-title"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid gap-5 sm:grid-cols-2"
                >
                  <div>
                    {label("fullName", "Full Name")}
                    <input {...field("fullName")} type="text" autoComplete="name" required onChange={(e) => set("fullName", e.target.value)} placeholder="Your name" />
                    {err("fullName")}
                  </div>
                  <div>
                    {label("company", "Company Name", true)}
                    <input {...field("company")} type="text" autoComplete="organization" onChange={(e) => set("company", e.target.value)} placeholder="Company or brand" />
                    {err("company")}
                  </div>
                  <div>
                    {label("email", "Email")}
                    <input {...field("email")} type="email" inputMode="email" autoComplete="email" required onChange={(e) => set("email", e.target.value)} placeholder="you@company.com" />
                    {err("email")}
                  </div>
                  <div>
                    {label("phone", "Phone Number")}
                    <input {...field("phone")} type="tel" inputMode="tel" autoComplete="tel" required onChange={(e) => set("phone", e.target.value)} placeholder="+91 98765 43210" />
                    {err("phone")}
                  </div>
                  <div>
                    {label("industry", "Industry")}
                    {select("industry", industryOptions, "Select your industry")}
                    {err("industry")}
                  </div>
                  <div>
                    {label("service", "Required Service")}
                    {select("service", serviceOptions, "What do you need?")}
                    {err("service")}
                  </div>
                  <div className="sm:col-span-2">
                    {label("budget", "Budget Range")}
                    {select("budget", budgetOptions, "Select a range")}
                    {err("budget")}
                  </div>
                  <div className="sm:col-span-2">
                    {label("description", "Project Description")}
                    <textarea
                      {...field("description")}
                      rows={5}
                      required
                      onChange={(e) => set("description", e.target.value)}
                      placeholder="What does your business do, and what would you like to build or improve?"
                      className={cn(field("description").className, "resize-y")}
                    />
                    {err("description")}
                  </div>

                  {/* Honeypot */}
                  <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
                    <label htmlFor={`${uid}-website`}>Website</label>
                    <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} />
                  </div>

                  <div className="sm:col-span-2">
                    <Turnstile onToken={setBotToken} resetSignal={botReset} />
                  </div>

                  <div className="sm:col-span-2" aria-live="polite">
                    {status.kind === "not-configured" && (
                      <div role="alert" className="rounded-2xl border border-[#ffb454]/40 bg-[#ffb454]/10 p-4 text-sm text-[#ffe2b8]">
                        <p className="flex items-center gap-2 font-medium">
                          <TriangleAlert className="size-4" aria-hidden /> Your enquiry has not been sent.
                        </p>
                        <p className="mt-1 text-[#ffe2b8]/80">
                          Online enquiries are not connected yet. Your details are valid and still in the form.
                          {site.email ? " You can email them to us directly:" : " Copy them below to share with us directly."}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {mailto && (
                            <a href={mailto} className="inline-flex items-center gap-2 rounded-full bg-[#ffb454] px-4 py-2 text-xs font-semibold text-space">
                              <Mail className="size-3.5" /> Email enquiry
                            </a>
                          )}
                          <button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-full border border-[#ffb454]/50 px-4 py-2 text-xs">
                            <Copy className="size-3.5" /> {copied ? "Copied" : "Copy details"}
                          </button>
                        </div>
                      </div>
                    )}
                    {status.kind === "error" && (
                      <div role="alert" className="flex items-start gap-2 rounded-2xl border border-[#ff7a7a]/40 bg-[#ff7a7a]/10 p-4 text-sm text-[#ffc9c9]">
                        <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden /> {status.message}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-steel">
                      By submitting, you agree to our{" "}
                      <a href="/privacy" className="text-ice underline decoration-line-strong underline-offset-4 hover:text-cyan">
                        Privacy Policy
                      </a>
                      .
                    </p>
                    <Button type="submit" disabled={status.kind === "submitting"} arrow={status.kind !== "submitting"} className="w-full sm:w-auto">
                      {status.kind === "submitting" ? (
                        <span className="inline-flex items-center gap-2">
                          <LoaderCircle className="size-4 animate-spin" aria-hidden /> Sending…
                        </span>
                      ) : (
                        "Start a Conversation"
                      )}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
