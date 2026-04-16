import { seo } from "./metadata";
import { CORE_KEYWORDS, AI_KEYWORDS, BUSINESS_KEYWORDS, HIGH_INTENT_KEYWORDS, OFFSHORE_KEYWORDS, INDUSTRY_KEYWORDS, TECH_STACK_KEYWORDS } from "./keywords";
import { VELACHERY_BASE_SET, THARAMANI_BASE_SET, ALL_LOCATION_KEYWORDS } from "./locationKeywords";

export const PAGE_SEO = {
  home: seo({
    title: "Best Software Company in Velachery & Tharamani | AgaraX",
    description: "AgaraX builds AI-powered enterprise systems and scalable digital products. Premier software engineering agency serving Velachery, Tharamani, and the Chennai IT corridor.",
    path: "/",
    keywords: [
      ...CORE_KEYWORDS.slice(0, 5),
      ...AI_KEYWORDS.slice(0, 5),
      ...OFFSHORE_KEYWORDS.slice(0, 5),
      ...VELACHERY_BASE_SET.slice(0, 3),
      ...THARAMANI_BASE_SET.slice(0, 3)
    ]
  }),
  services: seo({
    title: "Enterprise Solutions & Digital Transformation Services | Scale Your Operations",
    description: "Modernize your business with AI-powered automation, custom CRM systems, and scalable cloud infrastructure. Explore our enterprise-grade digital services.",
    path: "/services",
    keywords: [
      ...CORE_KEYWORDS,
      ...AI_KEYWORDS,
      ...TECH_STACK_KEYWORDS,
      ...ALL_LOCATION_KEYWORDS.slice(0, 20)
    ]
  }),
  products: seo({
    title: "Custom SaaS & Enterprise Product Ecosystem | High-Performance Systems",
    description: "Discover our suite of business systems including CRM, Marketing Automation, and Finance Ops. Built for high-performance and seamless scalability.",
    path: "/products",
    keywords: [
      "SaaS product architecture",
      "enterprise product engineering",
      ...BUSINESS_KEYWORDS,
      ...INDUSTRY_KEYWORDS.slice(0, 5)
    ]
  }),
  about: seo({
    title: "About AgaraX | Leading IT Agency in Velachery & Tharamani",
    description: "Learn about AgaraX, a premier software engineering firm in the Velachery & Tharamani tech corridor. We specialize in strategic architecture and scalable digital transformation.",
    path: "/about",
    keywords: [
      "software engineering company Velachery",
      "IT agency Tharamani",
      "enterprise technology partner Chennai",
      ...HIGH_INTENT_KEYWORDS
    ]
  }),
  careers: seo({
    title: "Career Opportunities for Elite Engineers | Join AgaraX",
    description: "Build the future of enterprise software. We are looking for talented developers, architects, and designers to join our high-performance engineering team.",
    path: "/careers",
    keywords: [
      "software jobs",
      "developer careers",
      "IT jobs Velachery",
      "hiring software engineers Velachery"
    ]
  }),
  getStarted: seo({
    title: "Get Started | Contact AgaraX for Custom Software Solutions",
    description: "Ready to transform your business? Contact our team for a free consultation on enterprise systems, AI automation, and scalable digital products.",
    path: "/get-started",
    keywords: ["contact software company", "hire developers Chennai", "software consultation Velachery"]
  }),
  blog: seo({
    title: "Software Engineering Blog | Tech Insights from Velachery & Tharamani",
    description: "Expert insights on software development, AI, and startup growth from our engineering team in Velachery and Tharamani, Chennai.",
    path: "/blog",
    keywords: [
      "software development blog Chennai",
      "AI insights Velachery",
      "tech articles Tharamani",
      ...CORE_KEYWORDS.slice(0, 5)
    ]
  })
};
