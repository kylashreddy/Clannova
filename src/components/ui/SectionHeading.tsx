import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
  id?: string;
};

export function SectionHeading({ eyebrow, title, intro, align = "left", className, id }: Props) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <p className="eyebrow flex items-center gap-3">
        <span aria-hidden className={cn("h-px w-8 bg-cyan/70", align === "center" && "hidden")} />
        {eyebrow}
      </p>
      <h2 id={id} className="display-lg mt-5 text-balance">
        {title}
      </h2>
      {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-steel text-pretty">{intro}</p>}
    </Reveal>
  );
}
