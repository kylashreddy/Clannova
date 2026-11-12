// All marketing copy lives here so sections stay presentational.

export type ServiceId = "web" | "ai" | "software" | "growth";

export type Service = {
  id: ServiceId;
  slug: string;
  index: string;
  title: string;
  short: string;
  summary: string;
  capabilities: string[];
  useCase: { label: string; text: string };
  accent: "cyan" | "violet" | "mix" | "ice";
};

export const services: Service[] = [
  {
    id: "web",
    slug: "web-app-development",
    index: "01",
    title: "Web & Application Development",
    short: "Fast, considered websites and web apps that turn visitors into customers.",
    summary:
      "We design and engineer business websites, online stores and full web applications on a modern stack. Every build is responsive, accessible, search-ready and measured against real performance budgets, so it keeps working as you grow.",
    capabilities: ["Business websites", "E-commerce", "Web applications", "Custom dashboards", "Booking systems"],
    useCase: {
      label: "In practice",
      text: "A boutique fitness studio replaces a static brochure site with a class timetable, online booking and member logins, all managed from one admin panel.",
    },
    accent: "cyan",
  },
  {
    id: "ai",
    slug: "ai-automation",
    index: "02",
    title: "AI & Intelligent Automation",
    short: "AI agents and automated workflows that handle repetitive work around the clock.",
    summary:
      "We build AI assistants trained on your own information and connect them to the tools you already use. Enquiries get answered, leads get qualified and routine follow-ups happen automatically, with people stepping in only where judgement matters.",
    capabilities: ["AI agents", "Customer support assistants", "WhatsApp automation", "Workflow automation", "Lead management automation"],
    useCase: {
      label: "In practice",
      text: "A restaurant answers table and menu questions on WhatsApp instantly, confirms reservations automatically and hands complex requests to the manager with full context.",
    },
    accent: "violet",
  },
  {
    id: "software",
    slug: "business-software",
    index: "03",
    title: "Business Software Solutions",
    short: "Internal tools that replace spreadsheets, paperwork and guesswork.",
    summary:
      "We build software around how your team actually works: CRMs, inventory, staff management and billing systems that share one source of truth. Clear dashboards show what is happening today, not last month.",
    capabilities: ["CRM", "Inventory management", "Employee management", "Billing systems", "Custom internal tools"],
    useCase: {
      label: "In practice",
      text: "A distributor tracks stock across two warehouses, raises GST-ready invoices from the same system and gets an alert before a fast-moving item runs out.",
    },
    accent: "mix",
  },
  {
    id: "growth",
    slug: "digital-presence-growth",
    index: "04",
    title: "Digital Presence & Growth",
    short: "Make sure customers can find you, trust you and reach you.",
    summary:
      "We keep your digital presence healthy after launch: maintenance, security updates, SEO foundations, Google Business Profile setup and the integrations that connect your site to payments, maps, analytics and messaging.",
    capabilities: ["Website maintenance", "SEO foundations", "Google Business Profile assistance", "Website optimization", "Digital integrations"],
    useCase: {
      label: "In practice",
      text: "A neighbourhood clinic fixes its listing details, adds structured data and speeds up its site so patients searching nearby can find opening hours and book in two taps.",
    },
    accent: "ice",
  },
];

export const serviceOptions = [
  "Website",
  "E-commerce",
  "Web application",
  "AI assistant / agent",
  "WhatsApp automation",
  "Workflow automation",
  "CRM / business software",
  "Inventory / billing system",
  "SEO & digital presence",
  "Website maintenance",
  "Not sure yet",
] as const;

export const industryOptions = [
  "Retail",
  "Restaurants & Food",
  "Healthcare",
  "Education",
  "Real Estate",
  "Startup",
  "Professional Services",
  "Other",
] as const;

export const budgetOptions = [
  "Under ₹50,000",
  "₹50,000 – ₹2,00,000",
  "₹2,00,000 – ₹5,00,000",
  "₹5,00,000 – ₹15,00,000",
  "Above ₹15,00,000",
  "International project (USD/EUR)",
  "Not sure yet",
] as const;

export type IndustryId = "retail" | "restaurants" | "healthcare" | "education" | "realestate" | "startups" | "professional";

export type Industry = {
  id: IndustryId;
  slug: string;
  name: string;
  formValue: (typeof industryOptions)[number];
  challenge: string;
  stack: string[];
  outcomes: string[];
  preview: {
    title: string;
    subtitle: string;
    items: { label: string; meta: string }[];
    action: string;
  };
};

export const industries: Industry[] = [
  {
    id: "restaurants",
    slug: "restaurants",
    name: "Restaurants",
    formValue: "Restaurants & Food",
    challenge:
      "Phones ring during service, menus change weekly and orders arrive across three apps and a notebook.",
    stack: ["Website", "Digital Menu", "Online Ordering", "WhatsApp Automation"],
    outcomes: ["Orders land in one place", "Menu updates in seconds", "Reservations confirmed automatically"],
    preview: {
      title: "Tonight's menu",
      subtitle: "Order for pickup · ready in 20 min",
      items: [
        { label: "Paneer Tikka", meta: "₹320" },
        { label: "Hyderabadi Biryani", meta: "₹380" },
        { label: "Filter Coffee", meta: "₹90" },
      ],
      action: "Add to order",
    },
  },
  {
    id: "healthcare",
    slug: "healthcare",
    name: "Healthcare",
    formValue: "Healthcare",
    challenge:
      "Front-desk staff spend hours on calls about timings, availability and directions instead of patients in the room.",
    stack: ["Website", "Appointment Booking", "Enquiry Assistant"],
    outcomes: ["Patients self-book open slots", "Common questions answered instantly", "Reminders cut no-shows"],
    preview: {
      title: "Book a consultation",
      subtitle: "General physician · Thursday",
      items: [
        { label: "10:30 AM", meta: "Available" },
        { label: "12:00 PM", meta: "Available" },
        { label: "4:15 PM", meta: "Available" },
      ],
      action: "Confirm slot",
    },
  },
  {
    id: "retail",
    slug: "retail",
    name: "Retail",
    formValue: "Retail",
    challenge:
      "Stock lives in spreadsheets, customers ask on Instagram whether items are available, and repeat buyers go unrecognised.",
    stack: ["Digital Catalogue", "Inventory", "Customer Management"],
    outcomes: ["Live availability for customers", "Low-stock alerts", "Know and reward repeat buyers"],
    preview: {
      title: "New arrivals",
      subtitle: "Handloom collection",
      items: [
        { label: "Cotton Kurta · Indigo", meta: "In stock" },
        { label: "Linen Saree · Ivory", meta: "2 left" },
        { label: "Block-print Dupatta", meta: "In stock" },
      ],
      action: "Reserve in store",
    },
  },
  {
    id: "education",
    slug: "education",
    name: "Education",
    formValue: "Education",
    challenge:
      "Admission season brings hundreds of enquiries, and promising students slip through between calls, forms and follow-ups.",
    stack: ["Website", "Student Enquiries", "Admission Management"],
    outcomes: ["Every enquiry tracked to a decision", "Automated follow-ups", "Clear admissions pipeline"],
    preview: {
      title: "Admissions 2027",
      subtitle: "Choose a programme",
      items: [
        { label: "Grade 6 – 8", meta: "Open" },
        { label: "Grade 9 – 10", meta: "Open" },
        { label: "Grade 11 · Science", meta: "Few seats" },
      ],
      action: "Request a callback",
    },
  },
  {
    id: "realestate",
    slug: "real-estate",
    name: "Real Estate",
    formValue: "Real Estate",
    challenge:
      "Leads come from portals, ads and walk-ins, and site-visit scheduling happens over long WhatsApp threads.",
    stack: ["Property Website", "Lead CRM", "Site-visit Scheduling", "WhatsApp Automation"],
    outcomes: ["All leads in one pipeline", "Instant replies to new enquiries", "Visits booked without back-and-forth"],
    preview: {
      title: "3 BHK · Gachibowli",
      subtitle: "Ready to move · 1,640 sq ft",
      items: [
        { label: "Saturday · 11:00 AM", meta: "Site visit" },
        { label: "Saturday · 3:00 PM", meta: "Site visit" },
        { label: "Sunday · 10:00 AM", meta: "Site visit" },
      ],
      action: "Schedule visit",
    },
  },
  {
    id: "startups",
    slug: "startups",
    name: "Startups",
    formValue: "Startup",
    challenge:
      "You need a credible product in front of users quickly, without building something you will have to throw away.",
    stack: ["Landing Site", "MVP Web App", "Admin Dashboard", "AI Features"],
    outcomes: ["Launch-ready MVP", "Architecture that scales", "Analytics from day one"],
    preview: {
      title: "Your MVP",
      subtitle: "Sprint plan",
      items: [
        { label: "Auth & onboarding", meta: "Week 1–2" },
        { label: "Core workflow", meta: "Week 3–5" },
        { label: "Billing & launch", meta: "Week 6" },
      ],
      action: "View roadmap",
    },
  },
  {
    id: "professional",
    slug: "professional-services",
    name: "Professional Services",
    formValue: "Professional Services",
    challenge:
      "Consultants, firms and agencies lose hours to scheduling, chasing documents and re-typing client details.",
    stack: ["Website", "Consultation Booking", "Client Portal", "Billing"],
    outcomes: ["Clients book and pay online", "Documents collected securely", "Invoices generated automatically"],
    preview: {
      title: "Book a consultation",
      subtitle: "Tax & compliance advisory",
      items: [
        { label: "30-min discovery", meta: "Free" },
        { label: "60-min advisory", meta: "Paid" },
        { label: "Document review", meta: "Paid" },
      ],
      action: "Choose a time",
    },
  },
];

export const processSteps = [
  {
    n: "01",
    title: "Discover",
    text: "We learn how your business runs today: who your customers are, where time is lost and what success looks like.",
    output: "Requirements brief",
  },
  {
    n: "02",
    title: "Strategize",
    text: "We turn findings into a scoped plan with priorities, technology choices, milestones and a clear quote.",
    output: "Scope & roadmap",
  },
  {
    n: "03",
    title: "Design",
    text: "Flows, wireframes and visual design you can click through before any code is written.",
    output: "Interactive prototype",
  },
  {
    n: "04",
    title: "Develop",
    text: "We build in short cycles with a live staging link, so you see progress every week rather than at the end.",
    output: "Working staging build",
  },
  {
    n: "05",
    title: "Deploy",
    text: "Testing, performance tuning, security checks and a careful launch, plus training for your team.",
    output: "Production launch",
  },
  {
    n: "06",
    title: "Grow",
    text: "We monitor, maintain and improve, adding features as your business and your customers' needs evolve.",
    output: "Ongoing support plan",
  },
] as const;

export type WorkProject = {
  id: string;
  title: string;
  category: string;
  description: string;
  demonstrates: string[];
  stack: string[];
  visual: "commerce" | "restaurant" | "assistant" | "dashboard" | "booking";
};

export const workProjects: WorkProject[] = [
  {
    id: "commerce",
    title: "Lumen Store",
    category: "E-commerce platform",
    description:
      "A fashion storefront with fast product discovery, size guidance, UPI and card checkout, and an inventory-aware admin.",
    demonstrates: ["Instant product search and filters", "Checkout with Indian payment methods", "Stock synced to the admin"],
    stack: ["Next.js", "Stripe / Razorpay", "PostgreSQL"],
    visual: "commerce",
  },
  {
    id: "restaurant",
    title: "Tandoor & Co. Ordering",
    category: "Restaurant ordering system",
    description:
      "QR menu, online ordering and a kitchen display, with order updates sent to customers on WhatsApp.",
    demonstrates: ["QR table ordering", "Live kitchen queue", "WhatsApp order status"],
    stack: ["React", "WhatsApp Business API", "Supabase"],
    visual: "restaurant",
  },
  {
    id: "assistant",
    title: "Atlas Support Agent",
    category: "AI support assistant",
    description:
      "An AI assistant that answers from a company knowledge base, qualifies leads and hands off to a human with the full conversation.",
    demonstrates: ["Answers grounded in your documents", "Lead capture inside chat", "Human hand-off"],
    stack: ["LLM APIs", "Vector search", "Node.js"],
    visual: "assistant",
  },
  {
    id: "dashboard",
    title: "Meridian Ops",
    category: "Business dashboard",
    description:
      "A single operations view for a multi-branch business: revenue, inventory, staff and outstanding invoices.",
    demonstrates: ["Role-based access", "Branch-level reporting", "Exportable reports"],
    stack: ["Next.js", "PostgreSQL", "Charts"],
    visual: "dashboard",
  },
  {
    id: "booking",
    title: "Carewell Appointments",
    category: "Appointment booking platform",
    description:
      "Online appointment booking for a multi-doctor clinic with availability rules, reminders and a front-desk view.",
    demonstrates: ["Doctor availability rules", "SMS / WhatsApp reminders", "Front-desk schedule"],
    stack: ["React", "Node.js", "Calendar sync"],
    visual: "booking",
  },
];

export const principles = [
  {
    title: "Custom solutions",
    text: "No templates dressed up as custom work. We design around your processes, customers and goals.",
  },
  {
    title: "Clear communication",
    text: "Plain language, weekly updates and one point of contact. You always know what is happening and why.",
  },
  {
    title: "Modern technology",
    text: "Proven, current tools such as Next.js, TypeScript, PostgreSQL and leading AI models, chosen for fit rather than hype.",
  },
  {
    title: "Scalable development",
    text: "Clean architecture and documented code, so adding a feature next year does not mean rebuilding.",
  },
  {
    title: "Transparent execution",
    text: "Fixed scopes, itemised quotes and a staging link from week one. No surprises on the invoice.",
  },
  {
    title: "Long-term technical support",
    text: "We stay after launch with maintenance, monitoring and improvements, as a partner rather than a vendor.",
  },
] as const;

export const engagementModels = [
  {
    id: "starter",
    name: "Starter Projects",
    forWho: "For small businesses and first-time digital projects.",
    includes: [
      "Business website or landing site",
      "Google Business Profile setup",
      "Contact, enquiry or WhatsApp integration",
      "SEO foundations and analytics",
    ],
    pricing: "Fixed quote after a short discovery call",
    cta: "Discuss a starter project",
    budget: "Under ₹50,000" as const,
  },
  {
    id: "growth",
    name: "Business Growth Solutions",
    forWho: "For growing businesses ready to automate and scale.",
    includes: [
      "Web applications and booking systems",
      "AI assistants and WhatsApp automation",
      "CRM, inventory or billing modules",
      "Integrations with your existing tools",
    ],
    pricing: "Scoped proposal with milestone-based pricing",
    cta: "Plan a growth solution",
    budget: "₹2,00,000 – ₹5,00,000" as const,
    featured: true,
  },
  {
    id: "enterprise",
    name: "Custom Enterprise Solutions",
    forWho: "For complex operations, multiple teams or regulated workflows.",
    includes: [
      "Custom platforms and internal systems",
      "AI agents across departments",
      "Security reviews and role-based access",
      "Dedicated team and support agreement",
    ],
    pricing: "Tailored engagement after technical discovery",
    cta: "Start an enterprise conversation",
    budget: "Above ₹15,00,000" as const,
  },
] as const;
