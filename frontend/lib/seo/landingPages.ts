
export interface LandingPageData {
  title: string;
  description: string;
  headline: string;
  subheadline: string;
  content: string[]; // Sections of content
  keywords: string[];
  faqs: { q: string, a: string }[];
}

export const LANDING_PAGES: Record<string, LandingPageData> = {
  'web-development-chennai': {
    title: "Top Web Development Company in Chennai | Custom Scalable Apps",
    description: "Looking for the best web development company in Chennai? AgaraX builds high-performance, conversion-focused web applications for startups and enterprises.",
    headline: "Transform Your Business with Elite Web Development in Chennai",
    subheadline: "We build more than just websites. We build revenue engines using Next.js, AI, and scalable architectures.",
    keywords: ["software development company in Chennai", "web application development services", "web development Chennai", "best IT company Chennai"],
    content: [
      "AgaraX stands at the forefront of digital innovation in Chennai. Our team of expert developers and architects specialize in building high-performance web applications that don't just look good but drive actual business growth.",
      "In today's competitive landscape, a generic website isn't enough. You need a platform that is secure, lightning-fast, and optimized for conversions. Whether you're a startup looking for an MVP or an enterprise scaling your digital presence, our Chennai-based team delivers world-class results.",
      "Our tech stack includes Next.js, Tailwind CSS, and headless CMS solutions, ensuring your site is ready for the future. We focus on Core Web Vitals to ensure your LCP is under 2.5s and your CLS is near zero.",
      "Why choose a local partner? Working with AgaraX in Chennai means you get personalized attention, real-time collaboration, and a team that understands the local market dynamics while delivering global quality standards."
    ],
    faqs: [
      { q: "How long does a web development project take?", a: "Most projects range from 4 to 12 weeks depending on complexity. We use agile methodology for rapid delivery." },
      { q: "Do you provide maintenance after launch?", a: "Yes, we offer ongoing support and optimization packages to ensure your systems remain secure and high-performing." }
    ]
  },
  'mobile-app-development-chennai': {
    title: "Mobile App Development Company in Chennai | iOS & Android",
    description: "Expert mobile app development in Chennai. AgaraX creates high-performance React Native and Flutter apps that users love.",
    headline: "Build World-Class Mobile Apps with Chennai's Top Developers",
    subheadline: "Scale your reach with premium mobile solutions for iOS and Android.",
    keywords: ["mobile app development Chennai", "startup app development company", "iOS app developers Chennai", "Android app development India"],
    content: [
      "The mobile-first revolution is here. AgaraX helps businesses in Chennai and beyond capture the mobile market with stunning, high-performance apps.",
      "We specialize in cross-platform development using React Native and Flutter, allowing you to reach both iOS and Android users with a single codebase, reducing time-to-market by 40%.",
      "Our focus is on user experience (UX) and performance. We ensure your app is responsive, battery-efficient, and capable of handling thousands of concurrent users.",
      "From fintech to e-commerce, our mobile solutions are built to scale. We integrate AI features, secure payment gateways, and real-time synchronization to give your users a seamless experience."
    ],
    faqs: [
      { q: "Is React Native better than Native development?", a: "For most business use cases, React Native offers near-native performance while being significantly more cost-effective and faster to build." },
      { q: "Can you help with App Store submissions?", a: "Absolutely. handle the entire process from development to deployment on Google Play and Apple App Store." }
    ]
  },
  'ai-development-company-india': {
    title: "Leading AI Development Company in India | Custom AI Agents & LLMs",
    description: "AgaraX is a premier AI development company in India specializing in custom AI agents, LLM integration, and business automation.",
    headline: "Automate Your Business with Future-Ready AI Solutions",
    subheadline: "We build custom AI agents that slice through operational costs and drive 24/7 efficiency.",
    keywords: ["AI development services India", "AI automation experts", "custom AI agents", "LLM development India"],
    content: [
      "Artificial Intelligence is no longer a luxury; it's a necessity for scaling. As a leading AI development company in India, AgaraX builds production-ready AI systems.",
      "We help you leverage Large Language Models (LLMs) like GPT-4, Claude, and Llama 3 to create custom internal tools, customer support agents, and predictive analytics dashboards.",
      "Our AI solutions focus on ROI. We don't just build chatbots; we build intelligent systems that automate complex workflows, reducing human error and operational overhead by up to 60%.",
      "Security and privacy are our top priorities. We implement RAG (Retrieval-Augmented Generation) architectures to ensure your proprietary data remains safe while providing high-quality AI responses."
    ],
    faqs: [
      { q: "How much does AI development cost?", a: "Costs vary based on model choice and data complexity. We offer modular pricing to ensure you get value at every step." },
      { q: "Is my data safe with AI?", a: "Yes, we use enterprise-grade security and private cloud deployments to ensure your data stays within your control." }
    ]
  },
  'startup-mvp-development': {
    title: "Startup MVP Development Services | Launch in 4-6 Weeks",
    description: "Launch your startup fast with our expert MVP development services. AgaraX helps founders build scalable, investor-ready products quickly.",
    headline: "From Idea to Market: Rapid MVP Development for Startups",
    subheadline: "Build the right foundation for your startup with conversion-focused design and scalable code.",
    keywords: ["startup app development company", "build MVP fast", "product development for startups", "MVP developers India"],
    content: [
      "Speed is the ultimate competitive advantage for startups. AgaraX specializes in rapid MVP development, helping you launch in weeks instead of months.",
      "We follow a lean development philosophy: Focus on the core value proposition, build with scalability in mind, and iterate based on real user feedback.",
      "Our team acts as your fractional CTO and engineering team. We don't just take orders; we help you refine your product roadmap to ensure maximum market fit.",
      "We've helped startups across India and globally secure funding by delivering polished, high-performance products that impress both users and investors."
    ],
    faqs: [
      { q: "What happens after the MVP launch?", a: "We provide post-launch support and help you scale your engineering team or transition to a full-scale product." },
      { q: "Can you help with investor demos?", a: "Yes, we often build specific features or dashboards optimized for demonstrating value to potential investors." }
    ]
  }
};
