import { HomeClient } from "@/components/HomeClient";
import { PAGE_SEO } from "@/lib/seo/pageMapping";

export const metadata = PAGE_SEO.home;

export default function HomePage() {
  return <HomeClient />;
}
