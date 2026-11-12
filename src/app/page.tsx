import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { BrandStatement } from "@/components/sections/BrandStatement";
import { Contact } from "@/components/sections/Contact";
import { Engagement } from "@/components/sections/Engagement";
import { Hero } from "@/components/sections/Hero";
import { Industries } from "@/components/sections/Industries";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { SolutionFinder } from "@/components/sections/SolutionFinder";
import { WhyClannova } from "@/components/sections/WhyClannova";
import { Work } from "@/components/sections/Work";
import { services } from "@/lib/content";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  slogan: site.tagline,
  description: site.description,
  url: site.url,
  logo: `${site.url}/assets/clannova-logo.png`,
  areaServed: ["IN", "Worldwide"],
  knowsAbout: services.flatMap((s) => s.capabilities),
  ...(site.email && { email: site.email }),
  ...(site.socials.some((s) => s.href) && { sameAs: site.socials.filter((s) => s.href).map((s) => s.href) }),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Navbar />
      <main id="main">
        <Hero />
        <BrandStatement />
        <Services />
        <Industries />
        <SolutionFinder />
        <Process />
        <Work />
        <WhyClannova />
        <Engagement />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
