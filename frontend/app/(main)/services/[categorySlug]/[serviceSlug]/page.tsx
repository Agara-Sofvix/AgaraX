import { ServiceDetailClient } from "@/components/ServiceDetailClient";
import { seo } from "@/lib/seo/metadata";
import { JsonLd, generateBreadcrumbSchema } from "@/components/JsonLd";
import { Metadata } from "next";
import { getApiUrl } from "@/lib/api";

type Props = {
  params: Promise<{ categorySlug: string; serviceSlug: string }>;
};

async function getCategoryBySlug(slug: string) {
  const apiUrl = getApiUrl();
  try {
    const res = await fetch(`${apiUrl}/api/categories/slug/${slug}`, {
      cache: 'no-store'
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch category by slug:", error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug, serviceSlug } = await params;
  const category = await getCategoryBySlug(categorySlug);
  const service = category?.capabilities?.find((s: any) => s.slug === serviceSlug);

  if (!service) return {};

  return seo({
    title: `${service.name} | AgaraX`,
    description: service.description,
    path: `/services/${categorySlug}/${serviceSlug}`,
    keywords: [service.name, ...(category?.name ? [category.name] : []), "Enterprise Software", "Custom Solutions"]
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const { categorySlug, serviceSlug } = resolvedParams;

  const category = await getCategoryBySlug(categorySlug);
  const service = category?.capabilities?.find((s: any) => s.slug === serviceSlug);

  if (!category || !service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
        <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
        <p className="text-gray-500">The system or capability you are looking for does not exist.</p>
      </div>
    );
  }

  const serviceSchema = {
    name: service.name,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      "name": "AgaraX"
    },
    areaServed: "Global",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      "name": service.name,
      "itemListElement": (service.features || []).map((f: string) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": f
        }
      }))
    }
  };

  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Services", item: "/services" },
    { name: category.name, item: `/services/${categorySlug}/${serviceSlug}` }, // Simplified path for breadcrumbs
    { name: service.name, item: `/services/${categorySlug}/${serviceSlug}` }
  ]);

  return (
    <>
      <JsonLd type="Service" data={serviceSchema} />
      <JsonLd type="BreadcrumbList" data={breadcrumbs} />
      <ServiceDetailClient 
        category={category} 
        service={service} 
        categorySlug={categorySlug} 
        serviceSlug={serviceSlug} 
      />
    </>
  );
}
