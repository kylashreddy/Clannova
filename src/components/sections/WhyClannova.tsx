import { Compass, Cpu, Eye, Layers, LifeBuoy, MessagesSquare, type LucideIcon } from "lucide-react";
import { principles } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const icons: LucideIcon[] = [Compass, MessagesSquare, Cpu, Layers, Eye, LifeBuoy];

export function WhyClannova() {
  return (
    <section id="why" aria-labelledby="why-title" className="section-y relative border-t border-line">
      <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="why-title"
            eyebrow="Why CLANNOVA"
            title="Technology built around your business."
            intro="We are a small, senior team. You work directly with the people designing and building your product, from first call to long after launch."
          />
        </div>
        <ul className="grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2">
          {principles.map((p, i) => {
            const Icon = icons[i];
            return (
              <Reveal as="li" key={p.title} delay={0.04 * i} className="group relative bg-space p-7 transition-colors duration-500 hover:bg-navy sm:p-8">
                <span aria-hidden className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-brand transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
                <div className="flex items-center justify-between">
                  <Icon aria-hidden className="size-5 text-cyan" />
                  <span className="font-mono text-[11px] text-steel">0{i + 1}</span>
                </div>
                <h3 className="mt-8 font-display text-xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel">{p.text}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
