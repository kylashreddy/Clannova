import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = { title: "Terms", alternates: { canonical: "/terms" } };

export default function Terms() {
  return (
    <LegalPage title="Terms of Use" updated="12 November 2026">
      <section>
        <h2>Using this website</h2>
        <p>This website provides information about CLANNOVA and its services. You may browse it and contact us for legitimate business enquiries.</p>
      </section>
      <section>
        <h2>Concept demonstrations</h2>
        <p>Projects shown under &ldquo;Selected work&rdquo; are concept demonstrations created to illustrate our capabilities. Names and brands in them are fictional.</p>
      </section>
      <section>
        <h2>Engagements</h2>
        <p>Any project work is governed by a separate written agreement that sets out scope, timeline, pricing and ownership. Nothing on this site is a binding offer.</p>
      </section>
      <section>
        <h2>Intellectual property</h2>
        <p>The CLANNOVA name, logo and website content belong to CLANNOVA and may not be reused without permission.</p>
      </section>
      <p className="text-sm text-steel/70">These terms are a starting template and should be reviewed by a qualified legal adviser before launch.</p>
    </LegalPage>
  );
}
