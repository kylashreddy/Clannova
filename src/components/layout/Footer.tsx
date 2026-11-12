import Link from "next/link";
import { industries, services } from "@/lib/content";
import { site } from "@/lib/site";
import { Logo } from "../ui/Logo";
import { SocialIcon } from "../ui/SocialIcon";
import { Year } from "../ui/Year";

export function Footer() {
  const socials = site.socials.filter((s) => s.href);
  const cols = [
    { title: "Services", links: services.map((s) => ({ label: s.title, href: `/services/${s.slug}` })) },
    { title: "Industries", links: industries.map((i) => ({ label: i.name, href: `/industries/${i.slug}` })) },
    {
      title: "Company",
      links: [
        { label: "About", href: "/#about" },
        { label: "How we work", href: "/#process" },
        { label: "Our Work", href: "/#work" },
        { label: "Find your solution", href: "/#finder" },
        { label: "Contact", href: "/#contact" },
      ],
    },
  ];

  return (
    <footer className="relative px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="mx-auto overflow-hidden rounded-[28px] border border-line bg-[radial-gradient(100%_60%_at_50%_100%,#101b2c_0%,#070a12_70%)] px-[clamp(1rem,4vw,2.5rem)] pt-20 sm:rounded-[36px]">
      <div className="mx-auto max-w-[1160px]">
        <div className="grid gap-14 lg:grid-cols-[1fr_2fr]">
          <div>
            <Link href="/#home" aria-label="CLANNOVA home" className="block w-full max-w-[240px]">
              <Logo variant="full" />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-steel">
              Websites, software and AI automation for businesses in India and around the world.
            </p>
            <p className="mt-2 font-mono text-xs text-steel/80">{site.location}</p>
          </div>
          <div className="grid gap-10 sm:grid-cols-3">
            {cols.map((c) => (
              <nav key={c.title} aria-label={c.title}>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel">{c.title}</h2>
                <ul className="mt-5 space-y-3">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-sm text-ice/80 transition-colors hover:text-cyan">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <p aria-hidden className="mt-24 select-none text-center font-display text-[clamp(2.25rem,9.5vw,8.5rem)] font-medium leading-none tracking-[-0.055em]">
          <span className="text-fade">BUILD BEYOND </span>
          <span className="text-gradient">LIMITS.</span>
        </p>
        <p className="sr-only">BUILD BEYOND LIMITS.</p>

        <div className="mt-14 flex flex-col gap-6 border-t border-line py-8 text-xs text-steel md:flex-row md:items-center md:justify-between">
          <p>
            © <Year /> CLANNOVA. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-ice">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-ice">
              Terms
            </Link>
          </div>
          {socials.length > 0 ? (
            <ul className="flex items-center gap-2" aria-label="Social media">
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`CLANNOVA on ${s.name}`}
                    className="grid size-9 place-items-center rounded-full border border-line-strong text-ice transition-colors hover:border-cyan/60 hover:text-cyan"
                  >
                    <SocialIcon name={s.name} />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-mono">Social profiles launching soon</p>
          )}
        </div>
      </div>
      </div>
    </footer>
  );
}
