// lib/seo/linking.ts

export const RELATED_SERVICES_MAP: Record<string, string[]> = {
  "crm": ["erp", "ai-chatbot", "web-portal"],
  "erp": ["crm", "web-portal", "ai-chatbot"],
  "ai-chatbot": ["crm", "mobile-app", "web-portal"],
  "mobile-app": ["web-portal", "ai-chatbot", "crm"],
  "web-portal": ["mobile-app", "crm", "erp"]
};

export function getRelatedServices(serviceSlug: string, count: number = 2) {
  const related = RELATED_SERVICES_MAP[serviceSlug] || [];
  return related.slice(0, count);
}

export function getInternalLinkGraph(currentPath: string) {
  // Logic to return topological links based on current location/service
  // This helps in automated crawler discovery
  const parts = currentPath.split('/').filter(Boolean);
  
  if (parts.length >= 3) {
    const [service, industry, location] = parts;
    return {
      type: 'programmatic',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: service.toUpperCase(), path: `/${service}` }
      ],
      suggested: [
        { name: `${service} for ${industry} solutions`, path: `/${service}/${industry}` },
        { name: `Our ${location} presence`, path: `/contact?loc=${location}` }
      ]
    };
  }
  
  return null;
}
