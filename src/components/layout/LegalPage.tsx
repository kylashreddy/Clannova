import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "../ui/Logo";
import { Footer } from "./Footer";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <header className="border-b border-line">
        <div className="container-x flex h-[var(--nav-h)] items-center justify-between">
          <Link href="/" aria-label="CLANNOVA home">
            <Logo variant="lockup" priority />
          </Link>
          <Link href="/" className="text-sm text-steel hover:text-ice">
            ← Back to site
          </Link>
        </div>
      </header>
      <main id="main" className="container-x max-w-3xl py-20">
        <p className="eyebrow">Legal</p>
        <h1 className="display-lg mt-4">{title}</h1>
        <p className="mt-4 font-mono text-xs text-steel">Last updated: {updated}</p>
        <div className="mt-12 space-y-8 leading-relaxed text-steel [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ice [&_li]:ml-5 [&_li]:list-disc">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
