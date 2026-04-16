// lib/seo/blogData.ts

export const BLOG_POSTS = [
  // CRM Cluster
  {
    slug: "what-is-crm-for-small-business",
    title: "What is CRM for Small Business? A Complete Guide",
    description: "Learn how CRM systems help small businesses automate sales and manage customer relationships effectively.",
    cluster: "CRM",
    content: "Full guide content here..."
  },
  {
    slug: "crm-vs-erp-key-differences",
    title: "CRM vs ERP: Which One Does Your Business Need?",
    description: "Understand the key differences between CRM and ERP systems and how to choose the right one for your growth.",
    cluster: "CRM",
    content: "Technical breakdown here..."
  },
  {
    slug: "benefits-of-crm-in-real-estate",
    title: "5 Massive Benefits of CRM in Real Estate",
    description: "Discover why top real estate firms in Chennai are using custom CRM solutions to manage leads and closings.",
    cluster: "CRM",
    content: "Real estate specific insights..."
  },
  // ERP Cluster
  {
    slug: "erp-implementation-guide-2026",
    title: "ERP Implementation Guide: Step-by-Step for Success",
    description: "Our comprehensive guide to successful ERP implementation for enterprise-grade businesses.",
    cluster: "ERP",
    content: "Implementation steps..."
  },
  {
    slug: "erp-cost-breakdown-india",
    title: "ERP Cost Breakdown in India: What to Expect in 2026",
    description: "A detailed look at ERP licensing, implementation, and maintenance costs for Indian enterprises.",
    cluster: "ERP",
    content: "Cost analysis..."
  }
];

export function getPost(slug: string) {
  return BLOG_POSTS.find(p => p.slug === slug);
}
