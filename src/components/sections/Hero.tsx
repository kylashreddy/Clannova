import { ButtonLink } from "../ui/Button";
import { HeroVisual } from "../visuals/HeroVisual";

const capabilities = [
  "Business websites",
  "E-commerce",
  "Web applications",
  "AI agents",
  "WhatsApp automation",
  "Workflow automation",
  "CRM",
  "Inventory systems",
  "Billing software",
  "Custom dashboards",
  "SEO foundations",
];

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-[var(--nav-h)]">
      {/* Backdrop: hairline grid fading out, plus a soft brand-coloured bloom */}
      <div aria-hidden className="grid-backdrop absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_70%_40%,black_10%,transparent_70%)]" />
      <div aria-hidden className="absolute -right-40 top-10 -z-10 size-[720px] rounded-full bg-[radial-gradient(circle,rgb(57_213_255/0.14),transparent_60%)] blur-2xl" />
      <div aria-hidden className="absolute -left-60 bottom-0 -z-10 size-[560px] rounded-full bg-[radial-gradient(circle,rgb(155_123_255/0.10),transparent_60%)] blur-2xl" />

      <div className="container-x grid min-h-[calc(100svh-var(--nav-h))] items-center gap-6 py-12 lg:grid-cols-[1.08fr_0.92fr] lg:py-16">
        <div className="relative z-10">
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inset-0 rounded-full bg-cyan [animation:pulse-dot_2.4s_ease-in-out_infinite]" />
            </span>
            Technology · AI · Automation
          </p>

          <h1 id="hero-title" className="display-xl mt-6 uppercase">
            <span className="block">Build</span>
            <span className="block">Beyond</span>
            <span className="text-gradient block pb-2">Limits.</span>
          </h1>

          <p className="mt-8 max-w-xl font-display text-xl leading-snug text-ice sm:text-2xl text-pretty">
            We engineer digital experiences, intelligent systems, and automation that move businesses forward.
          </p>
          <p className="mt-5 max-w-lg leading-relaxed text-steel text-pretty">
            From high-performance websites to AI-powered business automation, CLANNOVA helps businesses transform ideas into
            meaningful digital solutions.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#contact" arrow>
              Start a Project
            </ButtonLink>
            <ButtonLink href="#services" variant="secondary">
              Explore Our Solutions
            </ButtonLink>
          </div>
        </div>

        <div className="relative -mx-4 sm:mx-auto sm:w-full sm:max-w-[620px] lg:-mr-10 lg:max-w-none">
          <HeroVisual />
          <p className="pointer-events-none absolute bottom-[6%] left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.3em] text-steel/70">
            Connected · Intelligent · Forward
          </p>
        </div>
      </div>

      {/* Capability ticker */}
      <div className="relative border-y border-line bg-navy/40 py-5">
        <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <ul aria-label="What we build" className="flex shrink-0 animate-[marquee_40s_linear_infinite] items-center gap-10 pr-10 motion-reduce:animate-none">
            {[...capabilities, ...capabilities].map((c, i) => (
              <li key={i} aria-hidden={i >= capabilities.length} className="flex items-center gap-10 whitespace-nowrap font-display text-lg text-steel">
                {c}
                <svg viewBox="0 0 10 10" className="size-2 text-cyan/70" aria-hidden>
                  <polygon points="5,0 9.33,2.5 9.33,7.5 5,10 0.67,7.5 0.67,2.5" fill="currentColor" />
                </svg>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
