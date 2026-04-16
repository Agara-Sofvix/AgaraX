'use client';

import { motion } from "motion/react";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Zap, 
  ArrowRight,
  ShieldCheck,
  Target,
  Rocket,
  Settings,
  Shield,
  LayoutGrid
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES, Category, Capability } from "@/app/(main)/products/data";
import { Button } from "@/components/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ChevronDown } from "lucide-react";
import * as LucideIcons from "lucide-react";

const ICON_MAP: Record<string, any> = { ...LucideIcons };

const CATEGORY_MOCKUPS: Record<string, string> = {
  'cx-sales': '/images/service-mockups/sales-crm.png',
  'marketing': '/images/service-mockups/marketing-automation.png',
  'commerce': '/images/service-mockups/operations-portal.png',
  'finance-ops': '/images/service-mockups/operations-portal.png',
  'hr': '/images/service-mockups/operations-portal.png',
  'it-security': '/images/service-mockups/operations-portal.png',
  'data-ai': '/images/service-mockups/operations-portal.png',
  'productivity': '/images/service-mockups/operations-portal.png'
};

const SERVICE_MOCKUPS: Record<string, string> = {
  'crm-pipeline': '/images/service-mockups/crm-pipeline.png',
  'omnichannel-communication': '/images/service-mockups/omnichannel-communication.png',
  'appointment-scheduling': '/images/service-mockups/appointment-scheduling.png',
  'field-service': '/images/service-mockups/field-service.png',
  'customer-onboarding': '/images/service-mockups/customer-onboarding.png',
  'email-automation': '/images/service-mockups/email-automation.png',
  'social-media-management': '/images/service-mockups/social-media-management.png',
  'lead-capture': '/images/service-mockups/lead-capture.png',
  'event-webinar-systems': '/images/service-mockups/event-webinar-systems.png',
  'landing-page-optimization': '/images/service-mockups/landing-page-optimization.png',
  'retail-pos': '/images/service-mockups/retail-pos.png',
  'ecommerce-platform': '/images/service-mockups/ecommerce-platform.png',
  'payment-gateways': '/images/service-mockups/payment-gateways.png',
  'subscription-billing': '/images/service-mockups/subscription-billing.png',
  'accounting-reporting': '/images/service-mockups/accounting-reporting.png',
  'expense-payroll': '/images/service-mockups/expense-payroll.png',
  'inventory-procurement': '/images/service-mockups/inventory-procurement.png',
  'billing-invoicing': '/images/service-mockups/sales-crm.png',
  'erp-integration': '/images/service-mockups/operations-portal.png',
  'document-collaboration': '/images/service-mockups/marketing-automation.png',
  'internal-communication': '/images/service-mockups/omnichannel-communication.png',
  'task-calendar-management': '/images/service-mockups/appointment-scheduling.png',
  'shared-inbox': '/images/service-mockups/email-automation.png',
  'office-integration': '/images/service-mockups/operations-portal.png',
  'recruitment-ats': '/images/service-mockups/customer-onboarding.png',
  'payroll-compliance': '/images/service-mockups/expense-payroll.png',
  'attendance-scheduling': '/images/service-mockups/appointment-scheduling.png',
  'employee-expenses': '/images/service-mockups/crm-pipeline.png',
  'workforce-planning': '/images/service-mockups/accounting-reporting.png',
  'custom-app-dev': '/images/service-mockups/ecommerce-platform.png',
  'workflow-automation-rpa': '/images/service-mockups/marketing-automation.png',
  'iam-security': '/images/service-mockups/payment-gateways.png',
  'security-compliance': '/images/service-mockups/field-service.png',
  'performance-testing': '/images/service-mockups/landing-page-optimization.png',
  'bi-dashboards': '/images/service-mockups/retail-pos.png',
  'data-integration-etl': '/images/service-mockups/inventory-procurement.png',
  'embedded-analytics': '/images/service-mockups/accounting-reporting.png',
  'ai-reporting': '/images/service-mockups/marketing-automation.png',
  'iot-monitoring': '/images/service-mockups/field-service.png'
};

const STEPS = [
  { title: "Define", desc: "Collaborative discovery to map your unique business logic and requirements.", icon: Target },
  { title: "Configure", desc: "Expert implementation and deep integration with your existing tech stack.", icon: Settings },
  { title: "Validate", desc: "Rigorous testing and user-acceptance to ensure seamless performance.", icon: Shield },
  { title: "Scale", desc: "Continuous optimization and proactive support for your global growth.", icon: Rocket }
];

export function ServiceDetailClient({ category, service, categorySlug, serviceSlug }: { category: Category, service: Capability, categorySlug: string, serviceSlug: string }) {
  const MockupImage = service.heroImage || SERVICE_MOCKUPS[service.slug] || CATEGORY_MOCKUPS[category.id] || CATEGORY_MOCKUPS['finance-ops'];

  return (
    <div className="relative w-full text-slate-900 selection:bg-indigo-600/10 bg-white min-h-screen overflow-x-hidden">
      <section className="relative pt-8 pb-12 lg:pb-16 border-b border-slate-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -z-10 hidden lg:block" />
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs items={[
            { name: "Services", item: "/services" },
            { name: category.name, item: `/products?category=${category.id}` },
            { name: service.name, item: `/services/${categorySlug}/${serviceSlug}` }
          ]} />
          
          <div className="grid lg:grid-cols-2 gap-10 md:gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-3xl md:text-4xl font-bold mb-8 leading-[1.1] text-slate-900 tracking-tight">{service.name}</h1>
              <p className="text-xl lg:text-2xl text-slate-600 leading-relaxed mb-10 font-medium max-w-xl">{service.description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href={`/get-started?service=${encodeURIComponent(service.name)}&category=${categorySlug}&slug=${serviceSlug}`} size="lg" className="w-full sm:w-72 whitespace-nowrap h-[64px] rounded-2xl shadow-xl shadow-[#4F46E5]/10">Get Started</Button>
                <Button href="#features" size="lg" variant="outline" className="w-full sm:w-72 whitespace-nowrap h-[64px] rounded-2xl border-slate-200 text-slate-700 transition-all">View Documentation</Button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="relative flex items-center justify-center pt-8 lg:pt-0 pb-0">
              <div className="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full" />
              <div className="relative z-10 w-full group">
                 <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-600 to-blue-500 rounded-[32px] opacity-10 blur-2xl group-hover:opacity-15 transition-opacity" />
                  <div className="relative bg-white p-2 rounded-[32px] border border-slate-200 shadow-2xl overflow-hidden shadow-slate-200/50 aspect-video">
                     <Image src={MockupImage} alt={service.name} fill className="object-cover rounded-[24px]" priority />
                  </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SEARCH INTENT COMPLETION SECTIONS */}
      <section className="pt-12 pb-20 lg:pt-16 lg:pb-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10 tracking-tight">Who Needs This Solution</h2>
              <p className="text-xl text-slate-600 leading-relaxed mb-12 font-medium">
                {service.whoNeeds || "Scale-up enterprises and digital-first organizations looking to automate complex business workflows and eliminate operational silos."}
              </p>
              
              <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Target className="w-6 h-6 text-indigo-700" /> Problems This Solves
                </h3>
                <ul className="space-y-4">
                  {(service.problemsSolved || ["Manual process inefficiencies", "Broken data flows", "Operational scale blocks"]).map((problem, i) => (
                    <li key={i} className="flex gap-3 text-slate-600 font-medium">
                      <span className="text-indigo-700 font-bold">•</span> {problem}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="pt-10">
              <div className="space-y-12">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-6">Strategic Use Cases</h3>
                  <div className="grid gap-4">
                    {(service.useCases || ["Enterprise automation", "Process orchestration", "Outcome-driven scaling"]).map((useCase, i) => (
                      <div key={i} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center gap-4 transition-all hover:border-indigo-200">
                         <div className="w-2 h-2 rounded-full bg-indigo-600" />
                         <span className="font-bold text-slate-800">{useCase}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-10 rounded-[40px] bg-slate-900 text-white shadow-2xl shadow-slate-900/40">
                  <h3 className="text-2xl font-black mb-4">Expected Outcomes</h3>
                  <p className="text-slate-400 font-medium leading-relaxed">
                    {service.outcomes || "Measurable increase in operational velocity, significant reduction in overhead, and a resilient foundation for global system growth."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-3xl md:text-4xl font-bold text-slate-900 max-w-3xl leading-tight mb-20">Designed to eliminate operational friction and accelerate measurable outcomes.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {(service.benefits || []).map((benefit, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white border border-slate-100 p-10 rounded-[32px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-8 group-hover:bg-indigo-700 group-hover:text-white transition-colors duration-500"><Zap className="w-7 h-7" /></div>
                <h3 className="text-xl font-bold mb-4 text-slate-900 tracking-tight">Core Strategic Advantage</h3>
                <p className="text-slate-600 leading-relaxed font-medium">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION (EXPANDABLE CONTENT) */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16 tracking-tight">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {service.faqs.map((faq, i) => (
                <details key={i} className="group bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden transition-all duration-300">
                  <summary className="flex items-center justify-between p-8 cursor-pointer list-none">
                    <span className="text-lg font-bold text-slate-900 pr-10">{faq.q}</span>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-200 group-open:rotate-180 transition-transform">
                       <ChevronDown className="w-4 h-4 text-slate-600" />
                    </div>
                  </summary>
                  <div className="p-8 pt-0 text-slate-600 font-medium leading-relaxed border-t border-slate-100 bg-white/50">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="features" className="py-24 lg:py-32 bg-slate-900 text-white relative overflow-hidden scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
           <div className="grid lg:grid-cols-12 gap-10 md:gap-20 items-center">
              <div className="lg:col-span-4">
                 <p className="text-3xl md:text-4xl font-bold mb-8 leading-tight tracking-tight">Modular capabilities built for scale and flexibility.</p>
                 <Button href={`/get-started?service=${encodeURIComponent(service.name)}&category=${categorySlug}&slug=${serviceSlug}`} size="lg" variant="outline" className="rounded-2xl px-10 bg-white border-white !text-slate-900 hover:!bg-slate-100 transition-all shadow-lg border-2">Request Feature Demo</Button>
              </div>
              <div className="lg:col-span-8">
                 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(service.features || []).map((feature, i) => (
                      <motion.div key={i} whileHover={{ x: 10 }} className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-start gap-4 transition-all hover:bg-white/10">
                         <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-1 flex-shrink-0" />
                         <div>
                            <p className="font-bold text-lg mb-1">{feature}</p>
                            <p className="text-slate-500 text-xs leading-relaxed uppercase tracking-widest font-bold">Standard Integrated Capability</p>
                         </div>
                      </motion.div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      <section className="py-24 lg:py-40 border-t border-slate-100">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-10 md:gap-20">
               <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 leading-tight">Related Solutions</h3>
                  <div className="grid gap-3 mb-12">
                     {/* TOPOLOGICAL INTERNAL LINKING: Related by category */}
                     {category.capabilities?.filter(c => c.slug !== serviceSlug).slice(0, 2).map((cap, i) => (
                        <Link key={i} href={`/services/${category.slug}/${cap.slug}`} className="group flex items-center justify-between p-6 rounded-3xl border border-slate-100 bg-white hover:border-indigo-300 transition-all shadow-sm">
                           <div className="flex items-center gap-5">
                              <span className="font-bold text-slate-800">{cap.name}</span>
                           </div>
                           <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-700 transition-all" />
                        </Link>
                     ))}
                     {/* Cross-linking to other categories */}
                     {CATEGORIES.filter(c => c.id !== category.id).slice(0, 1).map((crossCat) => (
                       crossCat.capabilities?.slice(0, 1).map((cap, i) => (
                          <Link key={i} href={`/services/${crossCat.slug}/${cap.slug}`} className="group flex items-center justify-between p-6 rounded-3xl border border-slate-100 bg-white hover:border-blue-300 transition-all shadow-sm">
                            <div className="flex items-center gap-5">
                                <span className="font-bold text-slate-800">{cap.name}</span>
                                <span className="text-[10px] uppercase tracking-widest font-black text-slate-400">Collaborative Layer</span>
                            </div>
                            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-all" />
                          </Link>
                       ))
                     ))}
                     <Link href="/get-started" className="group flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all">
                        <span className="font-bold text-slate-900">Request Custom Architecture</span>
                        <ArrowRight className="w-5 h-5 text-slate-400" />
                     </Link>
                  </div>
               </div>
               <div className="flex items-center justify-center">
                  <div className="w-full bg-slate-900 rounded-[32px] p-8 md:p-12 lg:p-20 text-center relative overflow-hidden">
                     <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">Ready to integrate?</h3>
                     <Button href={`/get-started?service=${encodeURIComponent(service.name)}&category=${categorySlug}&slug=${serviceSlug}`} size="lg" className="px-12 rounded-3xl text-lg font-bold">Get Started Now</Button>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
