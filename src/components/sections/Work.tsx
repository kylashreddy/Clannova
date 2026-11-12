import { Info } from "lucide-react";
import { workProjects } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { WorkVisual } from "../visuals/WorkVisuals";

export function Work() {
  const [feature, ...rest] = workProjects;
  return (
    <section id="work" aria-labelledby="work-title" className="section-y relative border-t border-line bg-navy/30">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="work-title"
            eyebrow="Selected work"
            title="Ideas engineered into experiences."
            intro="Concept demonstrations that show how we approach common business problems, from first screen to working system."
          />
          <Reveal className="flex max-w-sm items-start gap-3 rounded-2xl border border-violet/30 bg-violet/[0.06] p-4 text-sm text-steel">
            <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-violet" />
            <p>
              <span className="text-ice">These are concept demonstrations, not client projects.</span> Names and brands shown are
              fictional and created to illustrate our capabilities.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {[feature, ...rest].map((p, i) => (
            <Reveal
              as="li"
              key={p.id}
              delay={0.05 * (i % 3)}
              className={cn(i === 0 ? "md:col-span-2 lg:col-span-6" : i < 3 ? "lg:col-span-3" : "lg:col-span-3")}
            >
              <article
                className={cn(
                  "group relative grid h-full overflow-hidden rounded-3xl border border-line bg-space/60 transition-colors duration-500 hover:border-cyan/30",
                  i === 0 && "lg:grid-cols-[0.9fr_1.1fr]",
                )}
              >
                <div className={cn("flex flex-col p-6 sm:p-8", i === 0 && "lg:justify-center lg:p-12")}>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-violet/40 bg-violet/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-violet">
                      Concept demo
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-steel">{p.category}</span>
                  </div>
                  <h3 className={cn("mt-5 font-display font-semibold tracking-tight", i === 0 ? "text-3xl sm:text-4xl" : "text-2xl")}>
                    {p.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-steel">{p.description}</p>
                  <ul className="mt-5 space-y-1.5 text-sm text-ice">
                    {p.demonstrates.map((d) => (
                      <li key={d} className="flex gap-2">
                        <span aria-hidden className="text-cyan">
                          →
                        </span>
                        {d}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technology">
                    {p.stack.map((s) => (
                      <li key={s} className="rounded-md bg-slate px-2 py-1 font-mono text-[10px] text-steel">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={cn(
                    "relative m-3 mt-0 overflow-hidden rounded-2xl border border-line bg-navy",
                    i === 0 ? "min-h-[300px] lg:m-4 lg:min-h-[420px]" : "min-h-[240px]",
                  )}
                >
                  <div aria-hidden className="grid-backdrop absolute inset-0 opacity-40" />
                  <div className="relative h-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.02]">
                    <WorkVisual kind={p.visual} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
