// Rule-based recommender for the "Find Your Business Solution" guide.
// Each answer adds weight to solutions; the highest-scoring ones are recommended
// along with the reasons that triggered them.

import type { ServiceId } from "./content";

export type BusinessType =
  | "restaurant"
  | "clinic"
  | "retail"
  | "education"
  | "realestate"
  | "startup"
  | "professional"
  | "other";

export type SolutionId =
  | "website"
  | "ecommerce"
  | "booking"
  | "ordering"
  | "whatsapp"
  | "aiSupport"
  | "crm"
  | "inventory"
  | "billing"
  | "dashboard"
  | "workflow"
  | "seo"
  | "gbp"
  | "maintenance"
  | "webapp";

type Solution = { name: string; service: ServiceId; what: string };

const solutions: Record<SolutionId, Solution> = {
  website: { name: "Business website", service: "web", what: "A fast, mobile-first site that explains what you do and makes it easy to get in touch." },
  ecommerce: { name: "Online store", service: "web", what: "Sell online with a catalogue, cart, UPI/card payments and order tracking." },
  booking: { name: "Online booking system", service: "web", what: "Customers pick a slot themselves; you control availability and get reminders sent automatically." },
  ordering: { name: "Online ordering", service: "web", what: "Take orders directly from your website or QR codes, without marketplace commissions." },
  whatsapp: { name: "WhatsApp automation", service: "ai", what: "Instant replies, confirmations and follow-ups on the app your customers already use." },
  aiSupport: { name: "AI customer support assistant", service: "ai", what: "Answers common questions 24/7 from your own information and hands over to your team when needed." },
  crm: { name: "Customer & lead management (CRM)", service: "software", what: "Every enquiry and customer in one place, with reminders so nobody is forgotten." },
  inventory: { name: "Inventory management", service: "software", what: "Live stock levels, low-stock alerts and purchase history across locations." },
  billing: { name: "Billing & invoicing system", service: "software", what: "Generate GST-ready invoices, track payments and send reminders automatically." },
  dashboard: { name: "Business dashboard", service: "software", what: "See sales, bookings and performance at a glance instead of compiling spreadsheets." },
  workflow: { name: "Workflow automation", service: "ai", what: "Connect your tools so repetitive steps such as data entry, approvals and notifications happen on their own." },
  seo: { name: "SEO foundations", service: "growth", what: "Technical SEO, structured data and content structure so customers can find you on search." },
  gbp: { name: "Google Business Profile setup", service: "growth", what: "Accurate hours, photos, reviews and directions where local customers search first." },
  maintenance: { name: "Website care & optimization", service: "growth", what: "Updates, backups, speed and security handled so your site keeps performing." },
  webapp: { name: "Custom web application", service: "web", what: "Software built around a workflow that off-the-shelf tools cannot handle well." },
};

// Industry-specific names make recommendations feel like they were written for the reader.
const nameOverrides: Partial<Record<BusinessType, Partial<Record<SolutionId, string>>>> = {
  restaurant: { website: "Restaurant website & digital menu", dashboard: "Order management dashboard", ordering: "Online & QR ordering", booking: "Table reservations" },
  clinic: { website: "Clinic website", booking: "Appointment booking", aiSupport: "Patient enquiry assistant" },
  retail: { ecommerce: "Digital catalogue & online store", crm: "Customer loyalty & management" },
  education: { website: "Institution website", crm: "Admission enquiry management", dashboard: "Admissions dashboard" },
  realestate: { website: "Property listing website", crm: "Lead CRM for property enquiries", booking: "Site-visit scheduling" },
  startup: { webapp: "MVP web application", website: "Launch website" },
  professional: { booking: "Consultation booking", billing: "Client billing & invoicing", crm: "Client management" },
};

export const businessTypes: { id: BusinessType; label: string; hint: string }[] = [
  { id: "restaurant", label: "Restaurant or café", hint: "Dine-in, takeaway, cloud kitchen" },
  { id: "clinic", label: "Clinic or healthcare", hint: "Doctors, dental, diagnostics, wellness" },
  { id: "retail", label: "Retail or shop", hint: "Physical store, D2C brand, wholesale" },
  { id: "education", label: "School or institute", hint: "Schools, coaching, academies" },
  { id: "realestate", label: "Real estate", hint: "Builders, brokers, property managers" },
  { id: "startup", label: "Startup", hint: "New product or venture" },
  { id: "professional", label: "Professional services", hint: "Consulting, legal, finance, agencies" },
  { id: "other", label: "Something else", hint: "We work across industries" },
];

export type ProblemId =
  | "enquiries"
  | "visibility"
  | "manual"
  | "bookings"
  | "stock"
  | "leads"
  | "billing"
  | "insight"
  | "outdated";

export const problems: { id: ProblemId; label: string }[] = [
  { id: "enquiries", label: "Too many calls and messages to answer" },
  { id: "visibility", label: "Customers can't find us online" },
  { id: "outdated", label: "Our website is outdated or missing" },
  { id: "bookings", label: "Bookings and appointments are chaotic" },
  { id: "leads", label: "Leads slip through the cracks" },
  { id: "manual", label: "Too much manual, repetitive work" },
  { id: "stock", label: "Hard to track stock or orders" },
  { id: "billing", label: "Billing and payments take too long" },
  { id: "insight", label: "No clear view of how the business is doing" },
];

export type GoalId = "sales" | "time" | "experience" | "online" | "decisions" | "scale";

export const goals: { id: GoalId; label: string }[] = [
  { id: "sales", label: "Win more customers and sales" },
  { id: "time", label: "Save my team's time" },
  { id: "experience", label: "Give customers a better experience" },
  { id: "online", label: "Sell or take orders online" },
  { id: "decisions", label: "Make decisions with real data" },
  { id: "scale", label: "Prepare to scale or expand" },
];

const businessWeights: Record<BusinessType, Partial<Record<SolutionId, number>>> = {
  restaurant: { website: 3, ordering: 2, whatsapp: 2, gbp: 2 },
  clinic: { website: 3, booking: 3, aiSupport: 1, gbp: 2 },
  retail: { ecommerce: 3, inventory: 2, crm: 1, gbp: 1 },
  education: { website: 3, crm: 2, whatsapp: 1 },
  realestate: { website: 3, crm: 3, whatsapp: 1, booking: 1 },
  startup: { webapp: 3, website: 2, dashboard: 1 },
  professional: { website: 3, booking: 2, billing: 1, crm: 1 },
  other: { website: 2 },
};

const problemWeights: Record<ProblemId, Partial<Record<SolutionId, number>>> = {
  enquiries: { aiSupport: 4, whatsapp: 3 },
  visibility: { seo: 3, gbp: 3, website: 1 },
  outdated: { website: 4, maintenance: 2 },
  bookings: { booking: 4, whatsapp: 1 },
  leads: { crm: 4, workflow: 2 },
  manual: { workflow: 4, webapp: 1 },
  stock: { inventory: 4, dashboard: 1, ordering: 1 },
  billing: { billing: 4, workflow: 1 },
  insight: { dashboard: 4 },
};

const goalWeights: Record<GoalId, Partial<Record<SolutionId, number>>> = {
  sales: { seo: 2, website: 1, crm: 1 },
  time: { workflow: 2, aiSupport: 2 },
  experience: { whatsapp: 2, booking: 1, aiSupport: 1 },
  online: { ecommerce: 3, ordering: 3 },
  decisions: { dashboard: 3 },
  scale: { webapp: 2, maintenance: 1, crm: 1 },
};

export type Recommendation = {
  id: SolutionId;
  name: string;
  service: ServiceId;
  what: string;
  reasons: string[];
  score: number;
};

export function recommend(input: {
  business: BusinessType;
  problems: ProblemId[];
  goals: GoalId[];
}): { items: Recommendation[]; engagement: "starter" | "growth" | "enterprise" } {
  const score = new Map<SolutionId, number>();
  const reasons = new Map<SolutionId, Set<string>>();

  const add = (weights: Partial<Record<SolutionId, number>>, reason: string) => {
    for (const [id, w] of Object.entries(weights) as [SolutionId, number][]) {
      score.set(id, (score.get(id) ?? 0) + w);
      if (!reasons.has(id)) reasons.set(id, new Set());
      reasons.get(id)!.add(reason);
    }
  };

  const businessLabel = businessTypes.find((b) => b.id === input.business)?.label ?? "your business";
  add(businessWeights[input.business], `Common for ${businessLabel.toLowerCase()}`);
  for (const p of input.problems) add(problemWeights[p], problems.find((x) => x.id === p)!.label);
  for (const g of input.goals) add(goalWeights[g], goals.find((x) => x.id === g)!.label);

  const items = [...score.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([id, s]) => ({
      id,
      name: nameOverrides[input.business]?.[id] ?? solutions[id].name,
      service: solutions[id].service,
      what: solutions[id].what,
      // Show the answers the reader gave first; the industry default is supporting context.
      reasons: [...reasons.get(id)!].sort((a, b) => Number(a.startsWith("Common")) - Number(b.startsWith("Common"))).slice(0, 2),
      score: s,
    }));

  const softwareHeavy = items.filter((i) => i.service === "software" || i.id === "webapp" || i.id === "workflow").length;
  const engagement =
    input.problems.length + input.goals.length >= 6 || softwareHeavy >= 3
      ? "enterprise"
      : softwareHeavy >= 1 || input.problems.length >= 2
        ? "growth"
        : "starter";

  return { items, engagement };
}
