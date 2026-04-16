'use client';

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: 'New' | 'In Progress' | 'Resolved' | 'High Priority';
  date: string;
}

export interface CareerApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  roleId: string;
  roleTitle: string;
  experience: string;
  portfolio?: string;
  coverLetter?: string;
  status: 'New' | 'Review' | 'Interviewing' | 'Offer Sent' | 'Rejected';
  date: string;
  score: string;
}

const INQUIRIES_KEY = 'agara_admin_inquiries';
const APPLICATIONS_KEY = 'agara_admin_applications';

// Default Mock Data
const MOCK_INQUIRIES: Inquiry[] = [
  { id: '1', name: "Sarah Johnson", email: "sarah.j@enterprise.com", phone: "+1 415-555-0123", service: "AI Agent & SaaS", message: "We're looking to integrate a custom AI agent into our customer support workflow. Can we schedule a demo?", status: "High Priority", date: "2 mins ago" },
  { id: '2', name: "Michael Chen", email: "m.chen@techsolutions.io", phone: "+1 212-555-0198", service: "Infrastructure", message: "Need a quote for setting up a scalable cloud infrastructure for our new fintech app.", status: "New", date: "45 mins ago" },
  { id: '3', name: "David Miller", email: "dmiller@globalops.net", phone: "+44 20-7946-0123", service: "Commerce & Revenue", message: "Inquiring about omnichannel commerce solutions for our European retail branches.", status: "In Progress", date: "3 hours ago" },
];

const MOCK_APPLICATIONS: CareerApplication[] = [
  { id: '1', name: "David Miller", roleId: '1', roleTitle: "Senior Full Stack Developer", email: "david.m@dev.com", phone: "+1 555-0123", status: "Interviewing", date: "2 hours ago", score: "92/100", experience: "5+ years" },
  { id: '2', name: "Sarah Connor", roleId: '4', roleTitle: "AI/ML Engineer", email: "sara.c@tech.io", phone: "+1 555-9876", status: "New", date: "5 hours ago", score: "88/100", experience: "3+ years" },
];

export const adminStore = {
  getInquiries: (): Inquiry[] => {
    if (typeof window === 'undefined') return MOCK_INQUIRIES;
    const stored = localStorage.getItem(INQUIRIES_KEY);
    if (!stored) {
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(MOCK_INQUIRIES));
      return MOCK_INQUIRIES;
    }
    return JSON.parse(stored);
  },

  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'status' | 'date'>) => {
    const inquiries = adminStore.getInquiries();
    const newInquiry: Inquiry = {
      ...inquiry,
      id: Math.random().toString(36).substr(2, 9),
      status: 'New',
      date: 'Just now'
    };
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify([newInquiry, ...inquiries]));
  },

  getApplications: (): CareerApplication[] => {
    if (typeof window === 'undefined') return MOCK_APPLICATIONS;
    const stored = localStorage.getItem(APPLICATIONS_KEY);
    if (!stored) {
      localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(MOCK_APPLICATIONS));
      return MOCK_APPLICATIONS;
    }
    return JSON.parse(stored);
  },

  addApplication: (app: Omit<CareerApplication, 'id' | 'status' | 'date' | 'score'>) => {
    const apps = adminStore.getApplications();
    const newApp: CareerApplication = {
      ...app,
      id: Math.random().toString(36).substr(2, 9),
      status: 'New',
      date: 'Just now',
      score: `${Math.floor(Math.random() * 40) + 60}/100` // Mock matching algorithm
    };
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify([newApp, ...apps]));
  }
};
