import type { MetadataRoute } from "next";
import { industries, services } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", ...services.map((x) => `/services/${x.slug}`), ...industries.map((x) => `/industries/${x.slug}`), "/privacy", "/terms"].map((path) => ({ url: `${site.url}${path}`, changeFrequency: "monthly", priority: !path ? 1 : path.startsWith("/services") || path.startsWith("/industries") ? 0.8 : 0.3 }));
}
