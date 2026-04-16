export interface CaseStudy {
  id: string;
  slug: string;
  client: string;
  industry: string;
  title: string;
  description: string;
  heroMetric: string;
  metricLabel: string;
  tags: string[];
  problem: string;
  solution: string;
  impact: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    slug: 'fintech-mvp-scale',
    client: 'NexPay Solutions',
    industry: 'Fintech',
    title: 'Scaling an AI-Driven Fintech MVP to 10k Users in 90 Days',
    description: 'How we helped NexPay launch a high-performance payment platform with automated fraud detection.',
    heroMetric: '300%',
    metricLabel: 'Faster Onboarding',
    tags: ['Next.js', 'AI/LLM', 'PostgreSQL', 'AWS'],
    problem: 'NexPay had a prototype that crashed under minimal load and lacked automated security features.',
    solution: 'We rebuilt the core engine using an event-driven architecture and integrated a real-time AI risk assessment model.',
    impact: [
       'Reduced server latency by 75%',
       'Automated 90% of identity verification',
       'Zero security breaches since launch'
    ]
  },
  {
    id: '2',
    slug: 'enterprise-infra-migration',
    client: 'Global Logistics Corp',
    industry: 'Logistics',
    title: 'Modernizing Legacy Infrastructure for 120% Efficiency Gain',
    description: 'Transforming a fragmented legacy system into a unified cloud-native architecture.',
    heroMetric: '120%',
    metricLabel: 'OpEx Reduction',
    tags: ['Kubernetes', 'Go', 'Microservices', 'GCP'],
    problem: 'Manual inventory tracking and legacy servers were causing 15% annual revenue loss due to downtime.',
    solution: 'Implemented a Kubernetes-managed microservices cluster with automated resource scaling.',
    impact: [
      'Eliminated unplanned downtime',
      'Real-time global tracking accuracy at 99.9%',
      'System-wide performance increase of 2x'
    ]
  },
  {
    id: '3',
    slug: 'ecommerce-automation',
    client: 'BrandFlow Retail',
    industry: 'E-commerce',
    title: 'Revolutionizing Retail: 3x Faster Checkout via Custom Automation',
    description: 'Building a high-conversion retail platform with headless commerce integration.',
    heroMetric: '3x',
    metricLabel: 'Checkout Speed',
    tags: ['React', 'Node.js', 'Shopify Plus', 'Redis'],
    problem: 'Abandoned carts were skyrocketing due to a slow, 5-step checkout process.',
    solution: 'Developed a custom headless checkout integration with one-tap payment and smart predictive search.',
    impact: [
      '45% increase in conversion rate',
      '25% reduction in cart abandonment',
      'Mobile user engagement up by 60%'
    ]
  }
];
