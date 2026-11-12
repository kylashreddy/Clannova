import { Check } from "lucide-react";
import { engagementModels } from "@/lib/content";
import { cn } from "@/lib/cn";
import { EnquireButton } from "../ui/EnquireButton";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function Engagement() {
  return (
    <section id="engagement" aria-labelledby="engagement-title" className="section-y relative border-t border-line bg-navy/30">
      <div className="container-x">
        <SectionHeading
          id="engagement-title"
          eyebrow="Engagement models"
          title="Start where you are. Scale when you're ready."
          intro="Every project is quoted on its scope. We'd rather understand your needs than show you a price that doesn't fit them."
          align="center"
        />
        <ul className="mt-16 grid gap-5 lg:grid-cols-3">
          {engagementModels.map((m, i) => {
            const featured = "featured" in m && m.featured;
            return (
              <Reveal as="li" key={m.id} delay={0.06 * i}>
                <article
                  className={cn(
                    "relative flex h-full flex-col rounded-3xl border p-7 sm:p-9",
                    featured ? "border-cyan/40 bg-[linear-gradient(180deg,rgb(57_213_255/0.08),transparent_60%)]" : "border-line bg-space/50",
                  )}
                >
                  {featured && (
                    <span className="absolute -top-3 left-8 rounded-full bg-cyan px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-space">
                      For growing businesses
                    </span>
                  )}
                  <p className="font-mono text-[11px] tracking-[0.2em] text-steel">0{i + 1}</p>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{m.name}</h3>
                  <p className="mt-2 text-sm text-steel">{m.forWho}</p>
                  <ul className="mt-8 flex-1 space-y-3 border-t border-line pt-6">
                    {m.includes.map((x) => (
                      <li key={x} className="flex gap-3 text-sm text-ice">
                        <Check aria-hidden className={cn("mt-0.5 size-4 shrink-0", featured ? "text-cyan" : "text-violet")} />
                        {x}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 rounded-2xl border border-line bg-space/60 p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel">Pricing</p>
                    <p className="mt-1 text-sm text-ice">{m.pricing}</p>
                  </div>
                  <EnquireButton
                    variant={featured ? "primary" : "secondary"}
                    className="mt-6 w-full"
                    prefill={{ budget: m.budget, description: `I'm interested in ${m.name}.` }}
                  >
                    {m.cta}
                  </EnquireButton>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
