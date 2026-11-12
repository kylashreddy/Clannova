"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { processSteps } from "@/lib/content";
import { cn } from "@/lib/cn";
import { SectionHeading } from "../ui/SectionHeading";

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="process" aria-labelledby="process-title" className="section-y relative border-t border-line">
      <div className="container-x">
        <SectionHeading
          id="process-title"
          eyebrow="How we work"
          title="From business challenge to digital transformation."
          intro="A clear, six-stage process with something tangible at the end of every stage, so you always know where your project stands."
          align="center"
          className="mx-auto"
        />

        <svg aria-hidden className="absolute size-0">
          <defs>
            <linearGradient id="process-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#39D5FF" />
              <stop offset="1" stopColor="#9B7BFF" />
            </linearGradient>
          </defs>
        </svg>
        <ol ref={ref} className="relative mx-auto mt-20 max-w-5xl">
          {/* Track + scroll-linked progress line */}
          <span aria-hidden className="absolute bottom-0 left-[19px] top-0 w-px bg-line md:left-1/2" />
          <motion.span
            aria-hidden
            style={{ scaleY: reduce ? 1 : fill }}
            className="absolute bottom-0 left-[19px] top-0 w-px origin-top bg-gradient-to-b from-cyan via-cyan to-violet md:left-1/2"
          />

          {processSteps.map((s, i) => {
            const right = i % 2 === 1;
            return (
              <li key={s.n} className="relative grid grid-cols-[40px_1fr] gap-6 pb-14 last:pb-0 md:grid-cols-[1fr_40px_1fr] md:gap-10">
                <motion.div
                  initial={reduce ? false : { opacity: 0, x: right ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={cn("col-start-2 row-start-1", right ? "md:col-start-3" : "md:col-start-1 md:text-right")}
                >
                  <p className="font-mono text-xs tracking-[0.2em] text-cyan">STAGE {s.n}</p>
                  <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{s.title}</h3>
                  <p className={cn("mt-3 max-w-md leading-relaxed text-steel", !right && "md:ml-auto")}>{s.text}</p>
                  <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-[11px] text-ice">
                    <span className="size-1.5 rounded-full bg-violet" /> Output: {s.output}
                  </p>
                </motion.div>
                <div className="col-start-1 row-start-1 flex justify-center md:col-start-2">
                  <motion.span
                    initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="relative z-10 grid size-10 place-items-center"
                  >
                    <svg viewBox="0 0 40 40" className="absolute inset-0" aria-hidden>
                      <polygon points="20,2 35.6,11 35.6,29 20,38 4.4,29 4.4,11" fill="#080D19" stroke="url(#process-grad)" strokeWidth="1.5" />
                    </svg>
                    <span className="relative font-mono text-[11px] text-ice">{s.n}</span>
                  </motion.span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
