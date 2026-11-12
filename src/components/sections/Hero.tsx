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
    <section id="home" aria-labelledby="hero-title" className="relative px-3 pt-[calc(var(--nav-h)-60px)] sm:px-4">
      {/* Cinematic panel: the 3D composition sits behind centred copy */}
      <div className="relative isolate flex min-h-[calc(100svh-24px)] flex-col items-center justify-center overflow-hidden rounded-[28px] border border-line bg-[radial-gradient(120%_80%_at_50%_0%,#0f1a2e_0%,#070a12_60%)] px-4 pb-16 pt-32 text-center sm:rounded-[36px] sm:pt-40">
        <div aria-hidden className="absolute inset-0 -z-10 opacity-80">
          <HeroVisual ambient />
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_40%_at_50%_55%,rgb(7_10_18/0.9),transparent_80%)]" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-[#070a12] to-transparent" />

        <p className="eyebrow backdrop-blur">
          <span aria-hidden className="relative flex size-1.5">
            <span className="absolute inset-0 rounded-full bg-cyan [animation:pulse-dot_2.4s_ease-in-out_infinite]" />
          </span>
          Technology · AI · Automation
        </p>

        <h1 id="hero-title" className="display-xl text-fade mt-8 max-w-5xl pb-3">
          Build beyond limits.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ice/90 sm:text-xl text-pretty">
          We engineer digital experiences, intelligent systems, and automation that move businesses forward.
        </p>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-steel text-pretty">
          From high-performance websites to AI-powered business automation, CLANNOVA helps businesses transform ideas into
          meaningful digital solutions.
        </p>

        <div className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <ButtonLink href="#contact" arrow>
            Start a Project
          </ButtonLink>
          <ButtonLink href="#services" variant="secondary">
            Explore Our Solutions
          </ButtonLink>
        </div>
      </div>

      {/* Capability strip, in place of a client-logo row */}
      <div className="container-x py-12">
        <p className="text-center text-sm text-steel">What we build for businesses in India and worldwide</p>
        <div className="mt-6 flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <ul aria-label="What we build" className="flex shrink-0 animate-[marquee_45s_linear_infinite] items-center gap-12 pr-12 motion-reduce:animate-none">
            {[...capabilities, ...capabilities].map((c, i) => (
              <li key={i} aria-hidden={i >= capabilities.length} className="whitespace-nowrap font-display text-xl font-medium tracking-[-0.03em] text-ice/45">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
