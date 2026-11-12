import type { ReactNode } from "react";
import { ButtonLink } from "../ui/Button";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

/** Shell for service and industry landing pages. */
export function SubPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main" className="pt-[var(--nav-h)]">
        <section className="relative overflow-hidden border-b border-line">
          <div aria-hidden className="grid-backdrop absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_70%_30%,black_10%,transparent_70%)]" />
          <div className="container-x py-20 sm:py-28">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="display-lg mt-5 max-w-4xl text-balance">{title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-steel">{intro}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/#contact" arrow>
                Start a Project
              </ButtonLink>
              <ButtonLink href="/#finder" variant="secondary">
                Find your solution
              </ButtonLink>
            </div>
          </div>
        </section>
        <div className="container-x section-y">{children}</div>
      </main>
      <Footer />
    </>
  );
}
