import { BlogListingClient } from "@/components/BlogListingClient";
import { PAGE_SEO } from "@/lib/seo/pageMapping";

export const metadata = PAGE_SEO.blog;

export default function BlogListingPage() {
  return <BlogListingClient />;
}
