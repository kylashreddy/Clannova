import { Reveal } from "../ui/Reveal";
import { ScrollWords } from "../visuals/ScrollWords";
import { Bridge } from "../visuals/Bridge";

export function BrandStatement() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y relative">
      <div className="container-x">
        <p className="eyebrow flex items-center gap-3">
          <span aria-hidden className="h-px w-8 bg-cyan/70" />
          About CLANNOVA
        </p>
        <h2 id="about-title" className="mt-8 max-w-5xl font-display text-[clamp(2.25rem,6vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
          <ScrollWords text="Technology is not the destination." />{" "}
          <ScrollWords text="It's the advantage." accent />
        </h2>

        <div className="mt-20 grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal className="space-y-6 text-lg leading-relaxed text-steel">
            <p className="text-ice">
              Most businesses know exactly what they need: more customers, faster responses, fewer spreadsheets and a clear
              view of the numbers. What they rarely get is someone who can translate those needs into technology that
              actually works.
            </p>
            <p>
              CLANNOVA sits in that gap. We start with how your business runs, then design and build the websites, software
              and AI automation that remove friction, so technology becomes an advantage instead of another problem to
              manage.
            </p>

            <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              <div className="bg-space p-6">
                <dt className="font-mono text-xs tracking-[0.2em] text-cyan">CLAN</dt>
                <dd className="mt-2 text-base text-ice">A collective of designers, engineers and problem-solvers working as one team.</dd>
              </div>
              <div className="bg-space p-6">
                <dt className="font-mono text-xs tracking-[0.2em] text-violet">NOVA</dt>
                <dd className="mt-2 text-base text-ice">Innovation, new possibilities and the transformation they make possible.</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <Bridge />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
