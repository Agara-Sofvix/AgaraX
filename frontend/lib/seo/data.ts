// lib/seo/data.ts

export const SERVICES_LIST = [
  { slug: "crm", name: "CRM Development" },
  { slug: "erp", name: "ERP Solutions" },
  { slug: "ai-chatbot", name: "AI Chatbot Integration" },
  { slug: "mobile-app", name: "Mobile App Development" },
  { slug: "web-portal", name: "Web Portal Development" }
];

export const INDUSTRIES_LIST = [
  { slug: "real-estate", name: "Real Estate" },
  { slug: "healthcare", name: "Healthcare" },
  { slug: "education", name: "Education" },
  { slug: "finance", name: "Finance & Banking" },
  { slug: "retail", name: "Retail & E-commerce" },
  { slug: "logistics", name: "Logistics & Supply Chain" },
  { slug: "manufacturing", name: "Manufacturing" },
  { slug: "hospitality", name: "Hospitality & Tourism" },
  { slug: "legal", name: "Legal Services" },
  { slug: "automotive", name: "Automotive" }
];

export const LOCATIONS_LIST = [
  { slug: "chennai", name: "Chennai" },
  { slug: "velachery", name: "Velachery" },
  { slug: "adyar", name: "Adyar" },
  { slug: "omr", name: "OMR" },
  { slug: "ambattur", name: "Ambattur" },
  { slug: "guindy", name: "Guindy" },
  { slug: "tamil-nadu", name: "Tamil Nadu" },
  { slug: "bangalore", name: "Bangalore" },
  { slug: "hyderabad", name: "Hyderabad" },
  { slug: "coimbatore", name: "Coimbatore" }
];

export function getSeoItem(list: {slug: string, name: string}[], slug: string) {
  return list.find(item => item.slug === slug);
}
