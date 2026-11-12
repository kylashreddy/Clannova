"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { navLinks, site } from "@/lib/site";
import { ButtonLink } from "../ui/Button";
import { Logo } from "../ui/Logo";

const sectionToNav: Record<string, string> = { finder: "industries", why: "about", process: "", engagement: "" };

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const reduce = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in the middle band of the viewport. Sections
  // without their own nav item map to the closest one, or clear the highlight.
  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>("main section[id]")];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(sectionToNav[e.target.id] ?? e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const mq = matchMedia("(min-width: 1024px)");
    const close = () => mq.matches && setOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open
          ? "border-b border-line bg-space/80 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav aria-label="Primary" className="container-x flex h-[var(--nav-h)] items-center justify-between gap-6">
        <Link href="/#home" aria-label={`${site.name} home`} className="shrink-0 rounded-lg" onClick={() => setOpen(false)}>
          <Logo variant="lockup" priority />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={l.href}
                aria-current={active === l.id ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors duration-300",
                  active === l.id ? "text-ice" : "text-steel hover:text-ice",
                )}
              >
                {active === l.id && (
                  <motion.span
                    layoutId={reduce ? undefined : "nav-active"}
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-cyan"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block">
            <ButtonLink href="/#contact" arrow className="!px-5 !py-2.5">
              Let&apos;s Talk
            </ButtonLink>
          </span>
          <button
            ref={toggleRef}
            type="button"
            className="grid size-11 place-items-center rounded-full border border-line-strong text-ice lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="h-[calc(100dvh-var(--nav-h))] overflow-y-auto border-t border-line bg-space lg:hidden"
          >
            <ul className="container-x flex flex-col py-6">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={reduce ? false : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.4 }}
                  className="border-b border-line"
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-baseline justify-between py-5 font-display text-3xl font-medium tracking-tight",
                      active === l.id ? "text-cyan" : "text-ice",
                    )}
                  >
                    {l.label}
                    <span className="font-mono text-xs text-steel">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="container-x pb-10">
              <ButtonLink href="/#contact" arrow className="w-full" onClick={() => setOpen(false)}>
                Let&apos;s Talk
              </ButtonLink>
              <p className="eyebrow mt-8 text-center !text-steel">{site.tagline}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
