export const INITIAL_CATEGORIES = [
  { 
    id: "cx-sales", 
    sortOrder: 1,
    name: "Customer Experience & Sales Systems", 
    slug: "customer-experience-sales",
    icon: "Users",
    overview: "We unify your entire customer lifecycle — from lead generation to post-sales support — into a single intelligent system.",
    approach: "API-driven CRM ecosystem, Workflow automation engines, Real-time customer data synchronization",
    outcomes: ["Faster lead conversion cycles", "Improved customer retention", "Increased lifetime value"],
    capabilities: [
      { 
        name: "Centralized CRM & pipeline management", 
        slug: "crm-pipeline",
        icon: "Users",
        description: "A unified platform to manage every stage of your sales funnel, from lead capture to closing deals. Our CRM systems are engineered for high-velocity sales teams who require real-time visibility and automated precision. We eliminate the friction between marketing leads and sales closures by creating a single source of truth for every customer interaction.",
        features: ["Lead Scoring", "Automated Follow-ups", "Real-time Sales Tracking", "Pipeline Visualization"],
        benefits: ["Improved conversion rates", "Clearer sales visibility", "Reduced manual data entry"],
        whoNeeds: "B2B enterprises and high-growth startups experiencing lead leakage or fragmented customer data across multiple spreadsheets.",
        problemsSolved: ["Fragmented customer data", "Slow lead response times", "Inaccurate sales forecasting", "Manual data entry bottlenecks"],
        useCases: ["High-volume lead management", "Enterprise sales pipeline tracking", "Customer lifecycle automation"],
        outcomes: "Average 40% increase in sales team productivity and 25% improvement in lead-to-close conversion rates within the first 6 months.",
        faqs: [
          { q: "How long does the CRM integration take?", a: "Standard enterprise implementations typically take 4-6 weeks depending on data volume and custom workflow complexity." },
          { q: "Can it sync with my existing email tools?", a: "Yes, our CRM architecture provides native bi-directional sync with Gmail, Outlook, and major enterprise communication suites." }
        ]
      },
      { 
        name: "Omnichannel communication", 
        slug: "omnichannel-communication",
        icon: "MessageSquare",
        description: "Engage customers across email, chat, social messaging, and phone — all from a single interface. Modern consumers expect immediate responses on their preferred platform. Our omnichannel solutions unify these disparate streams into a cohesive conversation thread, allowing your agents to provide superior support without switching apps.",
        features: ["Unified Inbox", "Chatbots & AI Assistants", "Cross-channel History", "Automated Ticketing"],
        benefits: ["Seamless customer experience", "Faster response times", "Reduced agent fatigue"],
        whoNeeds: "Support and sales teams struggling to manage high volumes of inquiries across multiple social and digital platforms.",
        problemsSolved: ["Disconnected customer conversations", "Increasing response time SLAs", "Agent burnout from app-switching", "High volume support costs"],
        useCases: ["24/7 AI-driven support", "Social media sales engagement", "Internal cross-department communication"],
        outcomes: "Significant reduction in first-response time (FRT) and up to 50% decrease in overall support ticket volume through AI self-service.",
        faqs: [
          { q: "Which platforms are supported?", a: "We support WhatsApp, Facebook Messenger, Instagram, LinkedIn, Email, Live Chat, and Voice integrations." },
          { q: "Is the AI assistant customizable?", a: "Absolutely. We train the AI on your specific business knowledge base and brand voice for accurate, human-like interactions." }
        ]
      },
      { 
        name: "Appointment scheduling", 
        slug: "appointment-scheduling",
        icon: "Calendar",
        description: "Intelligent booking systems that eliminate back-and-forth emails and maximize your team's availability. Our scheduling architecture handles complex resource allocation, multi-time zone coordination, and automated reminder cascades to ensure your calendar stays optimized and your show-up rates remain high.",
        features: ["Self-service Booking", "Automated Reminders", "Calendar Sync", "Resource Allocation"],
        benefits: ["Zero double-bookings", "Higher show-up rates", "Improved client satisfaction"],
        whoNeeds: "Professional service providers, medical clinics, and sales teams managing high-volume consultation schedules.",
        problemsSolved: ["Manual booking overhead", "Missed appointments (No-shows)", "Time-zone scheduling errors", "Calendar fragmentation"],
        useCases: ["Client consultation booking", "Service technician dispatch", "Internal meeting orchestration"],
        outcomes: "Average 40% reduction in admin overhead and 30% increase in billable hours through optimized scheduling.",
        faqs: [
          { q: "Is it mobile friendly?", a: "Yes, the booking interface is fully responsive and optimized for mobile devices." },
          { q: "Can we collect payments?", a: "We can integrate Stripe or PayPal for upfront payments at the time of booking." }
        ]
      },
      { 
        name: "Field service systems", 
        slug: "field-service",
        icon: "MapPin",
        description: "Empower your mobile workforce with real-time job tracking, offline access, and integrated billing. Our field service solutions bridge the gap between dispatch and the job site, providing technicians with historical customer data and managers with real-time fleet visibility.",
        features: ["Job Dispatching", "Router Optimization", "Mobile App Access", "Digital Job Sign-off"],
        benefits: ["Optimized travel time", "Faster service delivery", "Error-free field operations"],
        whoNeeds: "Home service companies, telecommunications providers, and enterprise maintenance departments.",
        problemsSolved: ["Paper-based job tracking errors", "Inefficient technician routing", "Delayed billing cycles", "Lack of real-time job visibility"],
        useCases: ["HVAC/Plumbing dispatch", "Telecom infrastructure maintenance", "Property management inspections"],
        outcomes: "Up to 25% reduction in fuel costs and 50% faster invoicing through digital field completion.",
        faqs: [
          { q: "Does it work without internet?", a: "Yes, our mobile apps support full offline mode with background sync when reconnected." },
          { q: "Can customers track technicians?", a: "We provide Uber-style real-time tracking links for customers via SMS." }
        ]
      },
      { 
        name: "Customer onboarding", 
        slug: "customer-onboarding",
        icon: "UserPlus",
        description: "First impressions are critical; our onboarding systems ensure every new client feels supported through automated milestones and transparent progress tracking.",
        features: ["Automated Welcome Emails", "Onboarding Checklists", "Resource Delivery", "Client Portal Access"],
        benefits: ["Faster time-to-value", "Consistent client experience", "Scalable onboarding process"],
        whoNeeds: "SaaS companies and service agencies with complex implementation processes following a sale.",
        problemsSolved: ["Lack of post-sale momentum", "Manual client data collection", "Unclear project milestones", "High early-churn risk"],
        useCases: ["Software implementation tracking", "Client document collection", "Structured training delivery"],
        outcomes: "Significant improvement in 'Time to First Value' and higher long-term customer retention rates.",
        faqs: [
          { q: "How many phases can we add?", a: "The system is infinitely customizable to your specific project lifecycle." },
          { q: "Can clients upload documents?", a: "Yes, we provide a secure portal with encrypted document storage and verification." }
        ]
      }
    ]
  },
  { 
    id: "marketing", 
    sortOrder: 2,
    name: "Marketing & Growth Automation", 
    slug: "marketing-growth",
    icon: "Megaphone",
    overview: "We build performance-driven marketing systems that automate engagement and maximize conversion.",
    approach: "Behavior-based automation flows, Multi-channel campaign orchestration, Data-driven optimization frameworks",
    outcomes: ["Increased lead generation", "Higher engagement rates", "Improved ROI on marketing spend"],
    capabilities: [
      { 
        name: "Email & campaign automation", 
        slug: "email-automation",
        icon: "Mail",
        description: "Scale your reach with personalized, behavior-driven email sequences that nurture leads automatically.",
        features: ["Dynamic Content", "Drip Campaigns", "A/B Testing", "Behavioral Triggers"],
        benefits: ["Higher engagement", "Consistent nurturing", "Scalable communication"],
        whoNeeds: "Marketing teams looking to scale lead nurturing without increasing headcount.",
        problemsSolved: ["Low email engagement rates", "Manual campaign execution overhead", "Static one-size-fits-all messaging"],
        useCases: ["SaaS onboarding flows", "E-commerce abandoned cart recovery"],
        outcomes: "Average 3x increase in click-through rates.",
        faqs: [
          { q: "Do you provide email templates?", a: "Yes, we build a custom library of templates tailored to your brand." }
        ]
      },
      { 
        name: "Social media management", 
        slug: "social-media-management",
        icon: "Share2",
        description: "Manage multiple social platforms from one place, schedule posts, and track engagement in real-time.",
        features: ["Unified Calendar", "Post Scheduling", "Social Listening", "Engagement Analytics"],
        benefits: ["Consistent brand voice", "Saved time on posting", "Better performance tracking"],
        whoNeeds: "Digital marketing agencies and large organizations managing complex social presence.",
        problemsSolved: ["Inconsistent brand messaging", "Manual social posting inefficiencies"],
        useCases: ["Global brand orchestration", "Crisis management monitoring"],
        outcomes: "Up to 70% time saved on social operations.",
        faqs: [
          { q: "Can we manage direct messages here?", a: "Yes, all DMs are unified into a single inbox." }
        ]
      },
      { 
        name: "Lead capture workflows", 
        slug: "lead-capture",
        icon: "Zap",
        description: "Turn website visitors into leads with intelligent forms, popups, and automated capture systems.",
        features: ["Smart Forms", "Exit-intent Popups", "Immediate Auto-responses"],
        benefits: ["Increased capture rates", "Cleaner lead data", "Faster initial contact"],
        whoNeeds: "E-commerce and SaaS sites with high traffic but low conversion-to-lead ratios.",
        problemsSolved: ["Missed website opportunities", "Slow lead follow-up"],
        useCases: ["Gated content capture", "Exit-intent discounts"],
        outcomes: "Average 40% increase in lead volume.",
        faqs: [
          { q: "Do the popups disrupt SEO?", a: "No, we follow Google's best practices." }
        ]
      },
      { 
        name: "Webinar & event systems", 
        slug: "event-webinar-systems",
        icon: "Video",
        description: "Host engaging virtual events and webinars with automated registration and follow-up flows.",
        features: ["Registration Portals", "Live Q&A & Polls", "Pre-recorded Playback"],
        benefits: ["Broader audience reach", "Higher attendee engagement"],
        whoNeeds: "B2B marketing teams using education-based marketing.",
        problemsSolved: ["Low webinar attendance", "Disconnected follow-up workflows"],
        useCases: ["Product launch events", "Customer training workshops"],
        outcomes: "Higher conversion to qualified meetings post-event.",
        faqs: [
          { q: "Is registration automated?", a: "Yes, from landing page to calendar invite." }
        ]
      },
      { 
        name: "Landing page optimization", 
        slug: "landing-page-optimization",
        icon: "Layout",
        description: "Design and deploy high-converting landing pages that are perfectly aligned with your ad campaigns.",
        features: ["Drag-and-drop Builder", "Mobile Optimization", "A/B Testing"],
        benefits: ["Better ad ROI", "Improved user experience"],
        whoNeeds: "Performance marketers scaling Google Ads or Meta campaigns.",
        problemsSolved: ["High bounce rates on ads", "Slow IT deployment"],
        useCases: ["PPC landing pages", "New product launches"],
        outcomes: "Up to 100% improvement in conversion rates.",
        faqs: [
          { q: "Are the pages fast?", a: "Optimized for sub-second load times." }
        ]
      }
    ]
  },
  { 
    id: "commerce", 
    sortOrder: 3,
    name: "Commerce & Revenue Systems", 
    slug: "commerce-revenue",
    icon: "ShoppingCart",
    overview: "We enable seamless selling experiences across both digital and physical channels.",
    approach: "Omnichannel commerce integration, Secure payment infrastructure, Real-time transaction tracking",
    outcomes: ["Faster checkout experiences", "Increased revenue streams", "Scalable commerce operations"],
    capabilities: [
      { 
        name: "Retail POS systems", 
        slug: "retail-pos",
        icon: "ShoppingCart",
        description: "Modern point-of-sale systems that sync inventory and sales data across physical and digital stores.",
        features: ["Offline Mode", "Inventory Sync", "Customer Loyalty Integration"],
        benefits: ["Unified sales data", "Improved checkout speed"]
      },
      { 
        name: "eCommerce platform development", 
        slug: "ecommerce-platform",
        icon: "Globe",
        description: "Custom, high-performance online stores designed for maximum conversion and lightning-fast speed.",
        features: ["PWA Capabilities", "Custom Checkout Flows", "Headless Architecture"],
        benefits: ["Higher conversion rates", "Faster page loads"]
      },
      { 
        name: "Payment gateway integrations", 
        slug: "payment-gateways",
        icon: "CreditCard",
        description: "Secure, global payment processing supporting multiple currencies, local methods, and fraud protection.",
        features: ["Global Payouts", "Fraud Prevention", "Multi-currency Support"],
        benefits: ["Reduced cart abandonment", "Secure transactions"]
      },
      { 
        name: "Subscription & billing systems", 
        slug: "subscription-billing",
        icon: "BarChart3",
        description: "Automate recurring revenue, manage trials, upgrades, and cancellations with intelligent billing engines.",
        features: ["Automated Invoicing", "Dunning Management", "Usage-based Billing"],
        benefits: ["Reduced churn", "Automated revenue ops"]
      }
    ]
  },
  { 
    id: "finance-ops", 
    sortOrder: 4,
    name: "Finance & Business Operations", 
    slug: "finance-operations",
    icon: "BarChart3",
    overview: "We provide complete financial visibility and operational control through integrated systems.",
    approach: "Centralized financial data systems, Automated reconciliation workflows, Real-time reporting dashboards",
    outcomes: ["Reduced financial errors", "Better decision-making insights", "Improved operational efficiency"],
    capabilities: [
      { 
        name: "Accounting & financial reporting", 
        slug: "accounting-reporting",
        icon: "BarChart3",
        description: "Automate your bookkeeping and generate real-time financial statements with integrated accounting systems.",
        features: ["Automated Reconciliation", "Financial Dashboards", "Tax Compliance"],
        benefits: ["Faster month-end close", "Real-time financial health"]
      },
      { 
        name: "Expense and payroll management", 
        slug: "expense-payroll",
        icon: "DollarSign",
        description: "Streamline employee payments and expense reimbursements with automated approval workflows.",
        features: ["One-click Payroll", "Automated Expense Tracking", "Compliance Guardrails"],
        benefits: ["Reduced admin overhead", "Happier employees"]
      },
      { 
        name: "Inventory & procurement systems", 
        slug: "inventory-procurement",
        icon: "Box",
        description: "Master your supply chain with intelligent stock tracking, purchase order automation, and vendor management.",
        features: ["Low-stock Alerts", "Vendor Portals", "Batch & Serial Tracking"],
        benefits: ["Reduced stockouts", "Optimized capital"]
      },
      { 
        name: "Billing & invoicing", 
        slug: "billing-invoicing",
        icon: "FileText",
        description: "Create professional invoices automatically and get paid faster with integrated payment reminders.",
        features: ["Custom Invoice Templates", "Automated Reminders", "Online Payment Portals"],
        benefits: ["Improved cash flow", "Reduced AR aging"]
      },
      { 
        name: "ERP integration", 
        slug: "erp-integration",
        icon: "Building",
        description: "Connect your core business functions into a single, unified ERP system for true operational synergy.",
        features: ["Cross-department Data", "Unified Workflows", "Master Data Management"],
        benefits: ["Single source of truth", "Breaking departmental silos"]
      }
    ]
  },
  { 
    id: "productivity", 
    sortOrder: 5,
    name: "Workplace Productivity & Collaboration", 
    slug: "productivity-collaboration",
    icon: "Mail",
    overview: "We create a unified digital workplace where teams collaborate efficiently and execute faster.",
    approach: "Cloud-based collaboration systems, Role-based access control, Real-time synchronization",
    outcomes: ["Improved team productivity", "Faster internal communication", "Better project coordination"],
    capabilities: [
      { 
        name: "Document collaboration tools", 
        slug: "document-collaboration",
        icon: "Files",
        description: "Create, share, and edit documents in real-time with your team, strictly controlled by enterprise security.",
        features: ["Real-time Co-editing", "Version Control", "External Sharing Controls"],
        benefits: ["Reduced email clutter", "Faster document cycles"]
      },
      { 
        name: "Internal communication platforms", 
        slug: "internal-communication",
        icon: "MessageSquare",
        description: "Connect your team with instant messaging, channels, and video calls designed for business focus.",
        features: ["Threaded Channels", "Guest Access", "Deep App Integrations"],
        benefits: ["Breaking communication barriers", "Faster decision making"]
      },
      { 
        name: "Task and calendar management", 
        slug: "task-calendar-management",
        icon: "Calendar",
        description: "Organize your team's work with integrated task boards and shared calendars that keep everyone aligned.",
        features: ["Kanban & List Views", "Recurring Tasks", "Team Calendar Sync"],
        benefits: ["Clear accountability", "Proper resource planning"]
      },
      { 
        name: "Shared inbox systems", 
        slug: "shared-inbox",
        icon: "Inbox",
        description: "Transform support and sales email addresses into collaborative workspaces for your whole team.",
        features: ["Email Assignments", "Internal Comments", "Shared Drafts"],
        benefits: ["Zero missed emails", "Faster team responses"]
      },
      { 
        name: "Office productivity integration", 
        slug: "office-integration",
        icon: "Layout",
        description: "Deeply integrate your core office suite with your custom business applications and workflows.",
        features: ["Outlook/Google Sync", "Widget Embedding", "Automated Data Push"],
        benefits: ["Seamless user experience", "Eliminated app switching"]
      }
    ]
  },
  { 
    id: "hr", 
    sortOrder: 6,
    name: "Human Resources & Workforce Management", 
    slug: "hr-workforce",
    icon: "Users",
    overview: "We streamline the entire employee lifecycle from hiring to performance management.",
    approach: "Automated HR workflows, Employee data centralization, Compliance-ready systems",
    outcomes: ["Reduced HR workload", "Improved employee experience", "Efficient workforce management"],
    capabilities: [
      { 
        name: "Recruitment & applicant tracking", 
        slug: "recruitment-ats",
        icon: "Briefcase",
        description: "Modernize your hiring process with automated job postings, resume parsing, and interview scheduling.",
        features: ["Job Board Multi-posting", "AI Resume Screening", "Interview Scorecards"],
        benefits: ["Faster time-to-hire", "Higher quality candidates"]
      },
      { 
        name: "Payroll & compliance", 
        slug: "payroll-compliance",
        icon: "ShieldCheck",
        description: "Ensure error-free payroll processing and stay compliant with ever-changing labor laws automatically.",
        features: ["Tax Filing Automation", "Statutory Compliance", "Direct Deposit Integration"],
        benefits: ["Eliminated payroll errors", "Guaranteed legal compliance"]
      },
      { 
        name: "Attendance & shift scheduling", 
        slug: "attendance-scheduling",
        icon: "Clock",
        description: "Manage workforce time-tracking and complex shift rotations with ease through a unified portal.",
        features: ["Biometric Integration", "Geo-fenced Clock-ins", "Automated Shift Swaps"],
        benefits: ["Reduced labor costs", "Fair shift allocation"]
      },
      { 
        name: "Employee expense tracking", 
        slug: "employee-expenses",
        icon: "DollarSign",
        description: "Simplify how employees submit expenses and get reimbursed with automated approval chains.",
        features: ["Receipt Scanning (OCR)", "Policy Enforcement", "Automatic Category Tagging"],
        benefits: ["Zero paper receipts", "Faster reimbursements"]
      },
      { 
        name: "Workforce planning systems", 
        slug: "workforce-planning",
        icon: "PieChart",
        description: "Predict future hiring needs and optimize your current talent pool with data-driven workforce analytics.",
        features: ["Gap Analysis", "Succession Planning", "Skills Inventory"],
        benefits: ["Reduced talent gaps", "Better talent retention"]
      }
    ]
  },
  { 
    id: "it-security", 
    sortOrder: 7,
    name: "IT, Security & Developer Ecosystem", 
    slug: "it-security-development",
    icon: "Lock",
    overview: "We build secure, scalable, and high-performance digital infrastructure tailored for modern businesses.",
    approach: "Microservices & modular architecture, Secure authentication frameworks, DevOps & CI/CD pipelines",
    outcomes: ["Faster development cycles", "Strong data security", "Scalable infrastructure"],
    capabilities: [
      { 
        name: "Custom application development", 
        slug: "custom-app-dev",
        icon: "Code2",
        description: "Build bespoke web and mobile applications designed to solve your unique business challenges at scale.",
        features: ["React/Next.js Architecture", "Scalable Microservices", "API-first Design"],
        benefits: ["Unique competitive advantage", "Infinite scalability"]
      },
      { 
        name: "Workflow automation (RPA)", 
        slug: "workflow-automation-rpa",
        icon: "Cpu",
        description: "Eliminate repetitive tasks with intelligent robotic process automation that works across all your apps.",
        features: ["No-code Bot Builder", "Visual Workflow Designer", "Error Handling Logic"],
        benefits: ["Zero human errors", "Massive time savings"]
      },
      { 
        name: "Identity & access management", 
        slug: "iam-security",
        icon: "Key",
        description: "Secure your business with single sign-on (SSO), multi-factor authentication, and granular access controls.",
        features: ["SSO (SAML/OIDC)", "MFA Enforced Policies", "Role-based Access Control"],
        benefits: ["Reduced breach risk", "Seamless user login"]
      },
      { 
        name: "Security & compliance systems", 
        slug: "security-compliance",
        icon: "Lock",
        description: "Implement continuous security monitoring and stay compliant with SOC2, GDPR, and ISO standards.",
        features: ["Threat Detection", "Automated Compliance Checks", "Data Encryption at Rest"],
        benefits: ["Protected company reputation", "Customer data trust"]
      },
      { 
        name: "Testing & optimization", 
        slug: "performance-testing",
        icon: "LineChart",
        description: "Ensure your systems are always running at peak performance with automated testing and optimization suites.",
        features: ["Load & Stress Testing", "Automated Regression", "Real-time Site Monitoring"],
        benefits: ["Higher system uptime", "Better site conversion"]
      }
    ]
  },
  { 
    id: "data-ai", 
    sortOrder: 8,
    name: "Data, Analytics & IoT Intelligence", 
    slug: "data-analytics-ai",
    icon: "PieChart",
    overview: "We transform raw data into actionable insights and intelligent decision-making systems.",
    approach: "Centralized data pipelines, AI-powered analytics layers, Real-time data visualization",
    outcomes: ["Data-driven decision making", "Predictive insights", "Competitive advantage"],
    capabilities: [
      { 
        name: "BI dashboards", 
        slug: "bi-dashboards",
        icon: "BarChart3",
        description: "Visualize your core business metrics in real-time with beautiful, interactive business intelligence dashboards.",
        features: ["Interactive Charting", "Custom KPI Tracking", "Drill-down Capabilities"],
        benefits: ["Faster decision making", "Visible business trends"]
      },
      { 
        name: "Data integration & transformation", 
        slug: "data-integration-etl",
        icon: "Database",
        description: "Clean, normalize, and sync data from all your disparate sources into a single data warehouse.",
        features: ["Automated ETL Pipelines", "Data Cleaning Logic", "Multi-source Connectors"],
        benefits: ["Accurate data insights", "Reduced engineering time"]
      },
      { 
        name: "Embedded analytics", 
        slug: "embedded-analytics",
        icon: "PieChart",
        description: "Provide powerful analytical capabilities directly within your internal or customer-facing applications.",
        features: ["White-label Reporting", "Customer Facing Portals", "Customizable Widgets"],
        benefits: ["Increased app value", "Empowered end-users"]
      },
      { 
        name: "AI-driven reporting", 
        slug: "ai-reporting",
        icon: "Cpu",
        description: "Leverage machine learning to automatically find patterns, anomalies, and insights in your datasets.",
        features: ["Anomaly Detection", "Natural Language Queries", "Predictive Forecasting"],
        benefits: ["Proactive issue resolution", "Uncovered growth areas"]
      },
      { 
        name: "IoT-based monitoring", 
        slug: "iot-monitoring",
        icon: "Activity",
        description: "Connect physical assets to your digital systems for real-time monitoring and predictive maintenance.",
        features: ["Sensor Integration", "Real-time Telemetry", "Predictive Maintenance"],
        benefits: ["Reduced equipment downtime", "Remote operational control"]
      }
    ]
  }
];

export const INITIAL_TESTIMONIALS = [
  {
    name: "Vikram Mehta",
    role: "CEO, FinTech Solutions",
    content: "AgaraX transformed our legacy system into a high-performance engine. Their focus on scalability and security is unmatched in the Indian market.",
    rating: 5,
    order: 0
  },
  {
    name: "Sarah Chen",
    role: "Founder, AI HealthTech",
    content: "Building an MVP is easy, but building one that investors love is hard. AgaraX delivered our platform in just 5 weeks, helping us secure our Seed round.",
    rating: 5,
    order: 1
  },
  {
    name: "Arjun Reddy",
    role: "CTO, NextGen Logistics",
    content: "The ROI we've seen from their AI automation solutions is incredible. We reduced our operational overhead by 40% in just three months.",
    rating: 5,
    order: 2
  }
];
