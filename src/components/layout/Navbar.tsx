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
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Announcement bar */}
      <div
        className={cn(
          "hidden h-9 items-center justify-center gap-3 border-b border-line bg-[#05070d] text-[13px] text-steel transition-[margin] duration-500 sm:flex",
          scrolled && "-mt-9",
        )}
      >
        <span className="font-medium text-ice">Now booking projects</span>
        <span aria-hidden className="h-3 w-px bg-line-strong" />
        <span>Websites, AI agents and business automation</span>
        <Link href="/#contact" className="font-medium text-ice underline decoration-white/30 underline-offset-4 hover:decoration-white">
          Book a free discovery call
        </Link>
      </div>
      <nav
        aria-label="Primary"
        className={cn(
          "container-x mt-3 flex h-[60px] items-center justify-between gap-6 transition-all duration-500",
        )}
      >
        <div
          className={cn(
            "flex w-full items-center justify-between gap-6 rounded-full border py-2 pl-4 pr-2 backdrop-blur-xl backdrop-saturate-150 transition-colors duration-500",
            scrolled || open ? "border-line-strong bg-[#0b0f18]/80" : "border-line bg-white/[0.035]",
          )}
        >
        <Link href="/#home" aria-label={`${site.name} home`} className="shrink-0 rounded-lg" onClick={() => setOpen(false)}>
          <Logo variant="lockup" priority className="[&>img:first-child]:size-9" />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={l.href}
                aria-current={active === l.id ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-[13.5px] transition-colors duration-300",
                  active === l.id ? "text-ice" : "text-steel hover:text-ice",
                )}
              >
                {active === l.id && (
                  <motion.span
                    layoutId={reduce ? undefined : "nav-active"}
                    className="absolute inset-0 -z-10 rounded-full bg-white/[0.07]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link href="/#finder" className="hidden rounded-full px-4 py-2 text-[13.5px] text-steel transition-colors hover:text-ice xl:block">
            Find your solution
          </Link>
          <span className="hidden sm:block">
            <ButtonLink href="/#contact" className="!px-5 !py-2.5 !text-[13.5px]">
              Let&apos;s Talk
            </ButtonLink>
          </span>
          <button
            ref={toggleRef}
            type="button"
            className="grid size-10 place-items-center rounded-full border border-line-strong text-ice lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
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
            className="mx-3 mt-2 max-h-[calc(100dvh-88px)] overflow-y-auto rounded-[28px] border border-line-strong bg-[#0b0f18]/95 backdrop-blur-xl lg:hidden"
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
              <p className="mt-8 text-center font-mono text-xs tracking-[0.2em] text-steel">{site.tagline}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
