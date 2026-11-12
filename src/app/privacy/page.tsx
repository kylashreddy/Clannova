import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="12 November 2026">
      <section>
        <h2>What we collect</h2>
        <p>When you send an enquiry we collect the details you provide: name, company, email, phone number, industry, required service, budget range and project description.</p>
      </section>
      <section>
        <h2>How we use it</h2>
        <ul>
          <li>To respond to your enquiry and prepare proposals.</li>
          <li>To communicate with you about a project you have asked us about.</li>
        </ul>
        <p className="mt-3">We do not sell your information or use it for unrelated marketing.</p>
      </section>
      <section>
        <h2>Storage and retention</h2>
        <p>Enquiries are stored securely with our infrastructure provider and kept only as long as needed to handle your request or as required by law.</p>
      </section>
      <section>
        <h2>Your rights</h2>
        <p>You can ask us to access, correct or delete your information at any time by contacting us through the enquiry form. We handle personal data in line with India&apos;s Digital Personal Data Protection Act, 2023.</p>
      </section>
      <p className="text-sm text-steel/70">This policy is a starting template and should be reviewed by a qualified legal adviser before launch.</p>
    </LegalPage>
  );
}
