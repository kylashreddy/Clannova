import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SubPage } from "@/components/layout/SubPage";
import { industries, services } from "@/lib/content";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const i = industries.find((x) => x.slug === slug);
  if (!i) return {};
  return {
    title: `Websites, Software & Automation for ${i.name}`,
    description: `${i.challenge} CLANNOVA builds ${i.stack.join(", ")} for ${i.name.toLowerCase()} businesses.`,
    alternates: { canonical: `/industries/${i.slug}` },
  };
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const i = industries.find((x) => x.slug === slug);
  if (!i) notFound();

  return (
    <SubPage eyebrow="Industry solutions" title={`Digital solutions for ${i.name}`} intro={i.challenge}>
      <h2 className="display-md">The solution stack</h2>
      <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {i.stack.map((st, n) => (
          <li key={st} className="rounded-2xl border border-line bg-navy/40 p-6">
            <span className="font-mono text-xs text-cyan">0{n + 1}</span>
            <span className="mt-3 block font-display text-xl font-semibold">{st}</span>
          </li>
        ))}
      </ol>

      <h2 className="display-md mt-24">What changes</h2>
      <ul className="mt-8 grid gap-6 sm:grid-cols-3">
        {i.outcomes.map((o) => (
          <li key={o} className="border-l border-cyan/50 pl-5 text-lg text-ice">
            {o}
          </li>
        ))}
      </ul>

      <h2 className="display-md mt-24">Services involved</h2>
      <nav aria-label="Services" className="mt-8 grid gap-4 sm:grid-cols-2">
        {services.map((s) => (
          <Link key={s.id} href={`/services/${s.slug}`} className="rounded-2xl border border-line p-6 transition-colors hover:border-cyan/40">
            <span className="font-mono text-xs text-steel">{s.index}</span>
            <span className="mt-2 block font-display text-lg font-semibold">{s.title}</span>
            <span className="mt-2 block text-sm text-steel">{s.short}</span>
          </Link>
        ))}
      </nav>

      <nav aria-label="Other industries" className="mt-20 flex flex-wrap gap-3">
        {industries
          .filter((x) => x.id !== i.id)
          .map((x) => (
            <Link key={x.id} href={`/industries/${x.slug}`} className="rounded-full border border-line-strong px-5 py-2.5 text-sm hover:border-cyan/60 hover:text-cyan">
              {x.name}
            </Link>
          ))}
      </nav>
    </SubPage>
  );
}
