import { CORE_KEYWORDS, AI_KEYWORDS, CLOUD_KEYWORDS, WEB_APP_KEYWORDS, BUSINESS_KEYWORDS, HIGH_INTENT_KEYWORDS } from "./keywords";

const LOCATION_SUFFIXES = [
  "Velachery",
  "Tharamani",
  "Guindy",
  "OMR Chennai",
  "Adyar",
  "Perungudi",
  "Chennai IT corridor",
  "Chennai IT services",
  "Tamil Nadu software company",
  "near me",
  "in Velachery",
  "in Tharamani",
  "in Guindy",
  "in OMR",
  "near Adyar",
  "Chennai south",
  "service center Velachery",
  "agency in Tharamani",
  "company near Perungudi"
];

export function expandKeywords(baseKeywords: string[]): string[] {
  return baseKeywords.flatMap(b =>
    LOCATION_SUFFIXES.map(s => `${b} ${s}`)
  );
}

export const VELACHERY_BASE_SET = [
  "software company Velachery",
  "software company in Velachery",
  "IT company Velachery",
  "IT services Velachery",
  "custom software Velachery",
  "enterprise software Velachery",
  "software development Velachery",
  "Velachery tech companies",
  "web development Velachery",
  "mobile app development Velachery",
  "AI automation Velachery",
  "SaaS development Velachery",
  "cloud solutions Velachery",
  "IT consulting Velachery",
  "staff augmentation Velachery",
  "offshore development Velachery",
  "full stack developers Velachery",
  "backend engineering Velachery",
  "frontend engineering Velachery",
  "UI UX design Velachery",
  "digital transformation Velachery",
  "business automation Velachery",
  "MVP development Velachery",
  "CRM systems Velachery",
  "ERP software Velachery",
  "e-commerce development Velachery",
  "API integration Velachery",
  "DevOps services Velachery",
  "FinTech solutions Velachery",
  "HealthTech development Velachery",
  "EdTech platforms Velachery",
  "logistics software Velachery",
  "real estate tech Velachery",
  "hire developers Velachery",
  "python development Velachery",
  "nodejs engineering Velachery",
  "react development Velachery",
  "nextjs development Velachery",
  "managed IT services Velachery",
  "technology partner Velachery",
  "software outsource Velachery",
  "dedicated teams Velachery",
  "software firm Velachery Chennai",
  "best local IT company Velachery",
  "software support Velachery",
  "application modernization Velachery",
  "legacy system upgrade Velachery",
  "scaling startups Velachery",
  "software architecture Velachery",
  "system integration Velachery"
];

export const THARAMANI_BASE_SET = [
  "software company Tharamani",
  "software company in Tharamani",
  "IT company Tharamani",
  "IT services Tharamani",
  "custom software Tharamani",
  "enterprise software Tharamani",
  "software development Tharamani",
  "Tharamani tech companies",
  "web development Tharamani",
  "mobile app development Tharamani",
  "AI services Tharamani",
  "SaaS product building Tharamani",
  "cloud infrastructure Tharamani",
  "Tidel Park software company",
  "IT park tech solutions Tharamani",
  "dedicated dev center Tharamani",
  "remote engineering Tharamani",
  "staffing solutions Tharamani",
  "IT consulting Tharamani",
  "full stack engineering Tharamani",
  "backend API development Tharamani",
  "frontend design Tharamani",
  "UX UI agency Tharamani",
  "digital strategy Tharamani",
  "workflow automation Tharamani",
  "startup MVP Tharamani",
  "CRM development Tharamani",
  "ERP implementation Tharamani",
  "marketing tech Tharamani",
  "fintech engineering Tharamani",
  "healthtech solutions Tharamani",
  "edtech building Tharamani",
  "supply chain tech Tharamani",
  "hire software engineers Tharamani",
  "javascript experts Tharamani",
  "nodejs agency Tharamani",
  "react native mobile Tharamani",
  "typescript developers Tharamani",
  "managed infrastructure Tharamani",
  "strategic IT partner Tharamani",
  "outsource engineering Tharamani",
  "offshore team Tharamani",
  "software house Tharamani Chennai",
  "top rated IT agency Tharamani",
  "maintenance and support Tharamani",
  "code audit services Tharamani",
  "performance optimization Tharamani",
  "growth hacking tech Tharamani",
  "advanced architecture Tharamani",
  "omni channel solutions Tharamani"
];

export const VELACHERY_CORE = expandKeywords(CORE_KEYWORDS);
export const VELACHERY_AI = expandKeywords(AI_KEYWORDS);
export const VELACHERY_WEB = expandKeywords(WEB_APP_KEYWORDS);
export const VELACHERY_CLOUD = expandKeywords(CLOUD_KEYWORDS);
export const VELACHERY_BUSINESS = expandKeywords(BUSINESS_KEYWORDS);
export const VELACHERY_HIGH_INTENT = expandKeywords(HIGH_INTENT_KEYWORDS);

export const ALL_LOCATION_KEYWORDS = [
  ...VELACHERY_BASE_SET,
  ...THARAMANI_BASE_SET,
  ...VELACHERY_CORE,
  ...VELACHERY_AI,
  ...VELACHERY_WEB,
  ...VELACHERY_CLOUD,
  ...VELACHERY_BUSINESS,
  ...VELACHERY_HIGH_INTENT
];
