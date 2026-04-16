'use client';

import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Zap, PhoneCall, ChevronDown } from "lucide-react";
import { Button } from "@/components/Button";
import { LandingPageData } from "@/lib/seo/landingPages";

interface LandingPageClientProps {
  data: LandingPageData;
  slug: string;
}

export function LandingPageClient({ data, slug }: LandingPageClientProps) {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden border-b border-gray-100">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#4F46E5]/5 -z-10 hidden lg:block rounded-l-[100px]"></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div {...fadeInUp}>
              <div className="inline-block bg-[#4F46E5]/10 text-[#4F46E5] text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
                Premium Solutions Provider
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {data.headline}
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed font-medium">
                {data.subheadline}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/get-started" size="lg" className="w-full sm:w-80 whitespace-nowrap">
                  Get Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button href="tel:+919498069292" variant="outline" size="lg" className="w-full sm:w-80 whitespace-nowrap text-gray-700">
                  <PhoneCall className="mr-2 w-5 h-5" />
                  Talk to Expert
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Sections (1200+ words target) */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-12">
              {data.content.map((paragraph, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <p className="text-xl text-gray-700 leading-relaxed font-light">
                    {paragraph}
                  </p>
                </motion.div>
              ))}
              
              {/* Added standard SEO content blocks to reach word counts */}
              <div className="prose prose-lg max-w-none text-gray-600">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-16 mb-8">Our Proven Development Methodology</h2>
                <p>
                  At AgaraX, we believe that the best software is built through a partnership of vision and technical expertise. Our approach is rooted in the Agile methodology, allowing us to pivot quickly and deliver incremental value. When you partner with us for {data.keywords[0]}, you're not just getting a vendor; you're getting a strategic ally committed to your long-term success.
                </p>
                <p>
                  Our process begins with intensive discovery sessions where we deep-dive into your business goals, user personas, and technical requirements. We then move into the architecture phase, ensuring that the foundation we build is scalable, secure, and ready to handle the demands of a growing user base.
                </p>
                
                <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Why Scalability Matters in {data.keywords[2]}</h3>
                <p>
                  In the digital age, performance is non-negotiable. A delay of just one second in page load time can lead to a significant drop in conversion rates. That's why we prioritize performance from day one. By using modern frameworks like Next.js and optimizing our backend systems, we ensure that your platform remains fast even as your traffic spikes.
                </p>
                <p>
                  Furthermore, security is woven into every line of code we write. From implementing robust authentication protocols to ensuring data encryption at rest and in transit, we protect your business and your users' privacy with enterprise-grade standards.
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <div className="sticky top-24 bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-[#4F46E5]" /> Project Highlights
                </h3>
                <ul className="space-y-4 mb-8">
                  {[
                    "3x Faster Deployment Speed",
                    "Enterprise-Grade Security",
                    "24/7 Proactive Support",
                    "Custom Scalable Architecture",
                    "AI-Driven Automation Integration"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-gray-600 font-medium text-sm">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button href="/get-started" className="w-full">
                  Start My Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {data.faqs.map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="text-lg font-bold text-gray-900 pr-10">{faq.q}</span>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200 group-open:rotate-180 transition-transform">
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </div>
                </summary>
                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1E293B] rounded-[40px] p-8 md:p-16 lg:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-[#4F46E5]"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 relative z-10">
              Ready to build the future?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto relative z-10">
              Join dozens of successful businesses that have scaled their digital presence with AgaraX. Let's discuss your next project today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center sm:items-center relative z-10">
              <Button href="/get-started" variant="primary" size="lg" className="rounded-2xl w-full sm:w-64">
                Get Started Now
              </Button>
              <Button href="tel:+919498069292" variant="outline" size="lg" className="rounded-2xl border-white/20 text-white hover:bg-white hover:text-black w-full sm:w-64">
                Talk to Expert
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
