import { AboutClient } from "@/components/AboutClient";
import { PAGE_SEO } from "@/lib/seo/pageMapping";

export const metadata = PAGE_SEO.about;

export default function AboutPage() {
  return <AboutClient />;
}
