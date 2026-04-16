'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Heart,
  Users,
  CheckCircle2,
  Rocket,
  BarChart3,
  Terminal,
  ChevronRight,
  Zap,
  Award
} from 'lucide-react';
import { Button } from '@/components/Button';

export function AboutClient() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true }
  };

  const expertise = [
    {
      title: "Enterprise Architecture",
      desc: "Building scalable, high-availability systems for global institutions.",
      icon: <Layers className="w-6 h-6" />,
      tag: "Core"
    },
    {
      title: "AI Integration",
      desc: "Deploying intelligent agents and predictive models into production workflows.",
      icon: <Cpu className="w-6 h-6" />,
      tag: "Advanced"
    },
    {
      title: "Custom SaaS",
      desc: "Multi-tenant platforms optimized for growth and conversion.",
      icon: <Rocket className="w-6 h-6" />,
      tag: "Innovation"
    },
    {
      title: "Data Intelligence",
      desc: "Processing massive datasets into actionable business insights.",
      icon: <BarChart3 className="w-6 h-6" />,
      tag: "Strategic"
    }
  ];

  return (
    <div className="bg-gemini-light text-gray-900 min-h-screen selection:bg-[#4F46E5]/10">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 md:pt-24 md:pb-32 overflow-hidden border-b border-black/5 bg-gemini-light">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_70%)] opacity-60" />
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#4F46E5]/5 blur-[120px] rounded-full opacity-50 pointer-events-none will-change-[filter] transform-gpu" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full opacity-50 pointer-events-none will-change-[filter] transform-gpu" />
          {/* Dots pattern removed as per user request */}
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-tight text-gray-900 leading-[1.1]">
                Scalable Solutions Built on <br /> <span className="text-[#4F46E5]">Purpose & Belief.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-12 font-medium leading-relaxed max-w-3xl mx-auto">
                AgaraX is a global software engineering partner dedicated to building resilient digital products that foster growth, innovation, and human-centered impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Button href="/services" size="lg" className="w-full sm:w-80 whitespace-nowrap">
                  Explore Our Services
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button href="/get-started" variant="outline" size="lg" className="w-full sm:w-80 whitespace-nowrap">
                  Get Started
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Story Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight text-gray-900"> <span className="text-[#4F46E5]">Software that moves you forward</span></h2>
              <div className="space-y-6 text-lg text-gray-600 font-medium leading-relaxed">
                <p>
                  AgaraX was founded to bridge the gap between complex technological demands and the human purpose behind them. We believe that software should not just solve problems—it should create opportunities.
                </p>
                <p>
                  From our headquarters, we oversee a global operation of architects and developers who prioritize clean code, architectural purity, and long-term scalability. We are not just a vendor; we are your strategic engineering partner.
                </p>
              </div>
              <div className="mt-10 flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm w-fit">
                 <div className="w-12 h-12 bg-[#4F46E5]/10 rounded-xl flex items-center justify-center text-[#4F46E5]">
                    <ShieldCheck className="w-6 h-6" />
                 </div>
                 <p className="text-sm font-bold text-gray-900">Enterprise-Grade Security & Compliance</p>
              </div>
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="relative"
            >
               <div className="aspect-video bg-white rounded-3xl border border-gray-100 shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <Terminal className="w-20 h-20 text-gray-100 group-hover:text-gray-200 transition-colors" />
                  </div>
                  <div className="absolute top-6 left-6 flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-400" />
                     <div className="w-3 h-3 rounded-full bg-yellow-400" />
                     <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
               </div>
               <div className="absolute -bottom-10 -left-10 bg-[#4F46E5] p-8 rounded-3xl shadow-2xl text-white">
                 <p className="text-4xl font-black mb-1 leading-none">24/7</p>
                 <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Global Operations</p>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-24 md:py-32 border-y border-black/5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-gray-900">Our Technical Prowess</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">Delivering complex solutions with surgical precision and modern patterns.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertise.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white/40 backdrop-blur-md border border-black/5 rounded-3xl hover:bg-white hover:shadow-2xl hover:border-[#4F46E5]/20 transition-all duration-500 group"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#4F46E5] mb-6 group-hover:bg-[#4F46E5] group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#4F46E5] mb-2 block">{item.tag}</span>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="pt-24 pb-12 md:pt-40 md:pb-20 bg-gemini-light">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp} className="max-w-3xl mx-auto mb-24">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight text-gray-900 leading-none">
              Engineering <span className="italic text-gray-400 font-serif">Culture</span> Over Code.
            </h2>
            <p className="text-xl text-gray-600 font-medium leading-relaxed">
              We believe that the quality of our systems is a direct reflection of our cultural principles. We hire for character and train for elite performance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Radical Transparency", desc: "Honest communication and clear roadmaps ensure zero surprises in the development lifecycle.", icon: <Users /> },
              { title: "Execution Focus", desc: "We prioritize tangible outcomes over theoretical discussions. We ship clean, working code.", icon: <Zap /> },
              { title: "Human Centricity", desc: "Every feature is designed to empower a human being. UX is not a layer; it's the core.", icon: <Heart /> }
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-left"
              >
                <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center text-[#4F46E5] mb-8">
                  {React.cloneElement(v.icon as React.ReactElement<any>, { className: "w-7 h-7" })}
                </div>
                <h4 className="text-2xl font-bold mb-4 text-gray-900 tracking-tight">{v.title}</h4>
                <p className="text-gray-500 font-medium leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pt-12 pb-24 md:pt-20 md:pb-48 bg-gemini-light overflow-hidden">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-10 tracking-tight text-gray-900 leading-[1.1]">
              Let’s Engineer Your <br /><span className="text-[#4F46E5]">Future Together..</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-12 font-medium max-w-2xl mx-auto">
              Ready to deploy your next high-impact digital product? Join a community of forward-thinking enterprise leaders.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button href="/services" size="lg" className="w-full sm:w-80 whitespace-nowrap group">
                Begin a Project
                <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button href="/get-started" variant="outline" size="lg" className="w-full sm:w-80 whitespace-nowrap">
                Get Started
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
