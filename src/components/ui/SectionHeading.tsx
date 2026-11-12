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
      <p className="eyebrow">
        <span aria-hidden className="size-1.5 rounded-full bg-cyan" />
        {eyebrow}
      </p>
      <h2 id={id} className="display-lg text-fade mt-6 pb-1 text-balance">
        {title}
      </h2>
      {intro && <p className={cn("mt-5 max-w-2xl text-lg leading-relaxed text-steel text-pretty", align === "center" && "mx-auto")}>{intro}</p>}
    </Reveal>
  );
}
