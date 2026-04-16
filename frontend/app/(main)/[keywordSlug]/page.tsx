import { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANDING_PAGES } from "@/lib/seo/landingPages";
import { seo } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/JsonLd";
import { LandingPageClient } from "@/components/LandingPageClient";

type Props = {
  params: Promise<{ keywordSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { keywordSlug } = await params;
  const pageData = LANDING_PAGES[keywordSlug];

  if (!pageData) return {};

  return seo({
    title: pageData.title,
    description: pageData.description,
    path: `/${keywordSlug}`,
    keywords: pageData.keywords
  });
}

export default async function KeywordLandingPage({ params }: Props) {
  const { keywordSlug } = await params;
  const pageData = LANDING_PAGES[keywordSlug];

  if (!pageData) {
    notFound();
  }

  const data = pageData;
  const faqSchema = {
    mainEntity: data.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <>
      <JsonLd type="FAQPage" data={faqSchema} />
      <LandingPageClient data={data} slug={keywordSlug} />
    </>
  );
}
