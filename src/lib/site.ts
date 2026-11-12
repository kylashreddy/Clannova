// Central site configuration. Contact details and social profiles are read from
// environment variables so nothing unverified is published by default.

export const site = {
  name: "CLANNOVA",
  tagline: "BUILD BEYOND LIMITS.",
  description:
    "CLANNOVA is a technology and digital solutions agency building high-performance websites, web applications, AI agents and business automation for companies in India and worldwide.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  location: "India · Working worldwide",
  socials: [
    { name: "LinkedIn", href: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN ?? "" },
    { name: "Instagram", href: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? "" },
    { name: "X", href: process.env.NEXT_PUBLIC_SOCIAL_X ?? "" },
    { name: "GitHub", href: process.env.NEXT_PUBLIC_SOCIAL_GITHUB ?? "" },
  ],
} as const;

export const navLinks = [
  { label: "Home", href: "/#home", id: "home" },
  { label: "Services", href: "/#services", id: "services" },
  { label: "Industries", href: "/#industries", id: "industries" },
  { label: "Our Work", href: "/#work", id: "work" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Contact", href: "/#contact", id: "contact" },
] as const;
