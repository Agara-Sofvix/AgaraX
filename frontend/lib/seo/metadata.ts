export const BASE_URL = "https://AgaraX.com";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
}

export function seo({
  title,
  description,
  path,
  keywords = [],
  ogImage = "/og.png",
}: SeoProps) {
  const url = `${BASE_URL}${path}`;

  return {
    title: `${title} | AgaraX`,
    description,
    keywords: keywords.join(", "),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | AgaraX`,
      description,
      url,
      siteName: "AgaraX",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | AgaraX`,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}
