import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/blog/posts";
import { seo, BASE_URL } from "@/lib/seo/metadata";
import { JsonLd, generateBreadcrumbSchema } from "@/components/JsonLd";
import { BlogPostClient } from "@/components/BlogPostClient";

type Props = {
  params: Promise<{ postSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { postSlug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === postSlug);

  if (!post) return {};

  return seo({
    title: `${post.title} | AgaraX Blog`,
    description: post.excerpt,
    path: `/blog/${postSlug}`,
    keywords: [post.category, "Software Development", "India", "Technology"]
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { postSlug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === postSlug);

  if (!post) {
    notFound();
  }

  const blogSchema = {
    headline: post.title,
    description: post.excerpt,
    datePublished: new Date(post.date).toISOString(),
    author: {
      "@type": "Organization",
      "name": "AgaraX"
    },
    image: `${BASE_URL}${post.image}`,
    publisher: {
      "@type": "Organization",
      "name": "AgaraX",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/logo-v3.png`
      }
    }
  };

  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: post.title, item: `/blog/${postSlug}` }
  ]);

  return (
    <>
      <JsonLd type="BlogPosting" data={blogSchema} />
      <JsonLd type="BreadcrumbList" data={breadcrumbs} />
      <BlogPostClient post={post} />
    </>
  );
}
