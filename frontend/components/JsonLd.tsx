import { BASE_URL } from "@/lib/seo/metadata";

interface SchemaProps {
  type: 'WebSite' | 'BreadcrumbList' | 'Service' | 'FAQPage' | 'LocalBusiness' | 'BlogPosting';
  data: any;
}

export function JsonLd({ type, data }: SchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": type,
          ...data
        }),
      }}
    />
  );
}

export const WEBSITE_SCHEMA = {
  name: "AgaraX",
  url: BASE_URL,
  potentialAction: {
    "@type": "SearchAction",
    "target": `${BASE_URL}/products?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

export const LOCAL_BUSINESS_SCHEMA = {
  "@type": "SoftwareCompany",
  "name": "AgaraX",
  "image": `${BASE_URL}/logo-v3.png`,
  "description": "Premier software company in Velachery and Tharamani, Chennai. Specializing in enterprise solutions and AI automation.",
  "@id": `${BASE_URL}/#organization`,
  "url": BASE_URL,
  "telephone": "+91 98765 43210",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123, 1st Cross Street",
    "addressLocality": "Velachery",
    "addressRegion": "Chennai",
    "postalCode": "600042",
    "addressCountry": "IN"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Velachery"
    },
    {
      "@type": "City",
      "name": "Tharamani"
    }
  ],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 12.9784,
    "longitude": 80.2184
  },
  "sameAs": [
    "https://www.linkedin.com/in/agara-sofvix-068b703b2/?skipRedirect=true",
    "https://www.instagram.com/agara_sofvix/",
    "https://twitter.com/agarax"
  ]
};

export function generateBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${BASE_URL}${item.item}`
    }))
  };
}
