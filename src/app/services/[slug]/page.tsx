import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SubPage } from "@/components/layout/SubPage";
import { ServiceVisual } from "@/components/visuals/ServiceVisuals";
import { industries, services } from "@/lib/content";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: `${s.title} Services in India`,
    description: `${s.short} ${s.capabilities.join(", ")}.`,
    alternates: { canonical: `/services/${s.slug}` },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const related = industries.filter((i) => i.stack.some((st) => s.capabilities.some((c) => c.toLowerCase().includes(st.toLowerCase().split(" ")[0]))));

  return (
    <SubPage eyebrow={`Service ${s.index}`} title={s.title} intro={s.summary}>
      <div className="grid gap-14 lg:grid-cols-2">
        <div>
          <h2 className="display-md">What we build</h2>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {s.capabilities.map((c) => (
              <li key={c} className="flex items-center justify-between py-4 font-display text-lg">
                {c}
                <span aria-hidden className="text-cyan">→</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 rounded-2xl border border-line bg-surface p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel">{s.useCase.label}</p>
            <p className="mt-2 leading-relaxed text-ice">{s.useCase.text}</p>
          </div>
        </div>
        <div className="h-[380px]">
          <ServiceVisual id={s.id} />
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-24">
          <h2 className="display-md">Popular with</h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {related.map((i) => (
              <li key={i.id}>
                <Link href={`/industries/${i.slug}`} className="block rounded-full border border-line-strong px-5 py-2.5 text-sm hover:border-cyan/60 hover:text-cyan">
                  {i.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <nav aria-label="Other services" className="mt-24 grid gap-4 sm:grid-cols-3">
        {services
          .filter((x) => x.id !== s.id)
          .map((x) => (
            <Link key={x.id} href={`/services/${x.slug}`} className="rounded-2xl border border-line p-6 transition-colors hover:border-cyan/40">
              <span className="font-mono text-xs text-steel">{x.index}</span>
              <span className="mt-2 block font-display text-lg font-semibold">{x.title}</span>
              <span className="mt-2 block text-sm text-steel">{x.short}</span>
            </Link>
          ))}
      </nav>
    </SubPage>
  );
}
