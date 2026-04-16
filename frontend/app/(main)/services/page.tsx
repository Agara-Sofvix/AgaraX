import { ServicesClient } from "@/components/ServicesClient";
import { PAGE_SEO } from "@/lib/seo/pageMapping";

export const metadata = PAGE_SEO.services;

export default function ServicesPage() {
  return <ServicesClient />;
}
