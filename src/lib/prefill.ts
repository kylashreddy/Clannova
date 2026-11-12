// Lets any section (service CTAs, the solution finder, engagement models) pre-fill
// the enquiry form and scroll to it, without coupling components together.

import type { LeadInput } from "./lead-schema";

export type Prefill = Partial<Pick<LeadInput, "industry" | "service" | "budget" | "description">>;

const EVENT = "clannova:prefill";

export function prefillEnquiry(detail: Prefill) {
  window.dispatchEvent(new CustomEvent<Prefill>(EVENT, { detail }));
  document.getElementById("contact")?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}

export function onPrefill(handler: (detail: Prefill) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<Prefill>).detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
