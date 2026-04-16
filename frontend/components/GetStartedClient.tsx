'use client';

import { getApiUrl } from "@/lib/api";

import { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, Send, CheckCircle2, MapPin, ArrowRight, Upload } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/Button";

function GetStartedForm() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('service') || "";

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: initialService,
    message: "",
  });

  useEffect(() => {
    if (initialService) {
      setFormState(prev => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          service: formState.service,
          message: `${formState.company ? `Company: ${formState.company}. ` : ''}${formState.message}`,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit inquiry');

      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormState({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        });
        setTimeout(() => setIsSubmitted(false), 5000);
      }, 1500);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      alert('Something went wrong. Please try again.');
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      detail: "info@agarax.com",
      href: "mailto:info@agarax.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      detail: "+91 94980 69292",
      href: "tel:+919498069292"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      detail: "View on Map",
      href: "https://share.google/ryAuYzrJa0tTt3g5o"
    }
  ];

  const cardStyle = "bg-white p-6 sm:p-8 rounded-[32px] border border-black/5 shadow-sm hover:shadow-xl hover:border-[#4F46E5]/20 transition-all duration-300";
  const iconBoxStyle = "w-14 h-14 bg-[#4F46E5]/10 text-[#4F46E5] rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110";

  return (
    <div className="relative w-full text-gray-900 selection:bg-[#4F46E5]/20 bg-gemini-light">
      {/* Cinematic Mesh Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gemini-light" />
        
        {/* Animated Mesh blobs - adjusted for light theme */}
        <motion.div 
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] bg-[#4F46E5]/10 blur-[80px] rounded-full pointer-events-none opacity-50 will-change-transform transform-gpu"
        />
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -60, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[70%] h-[70%] bg-blue-500/5 blur-[80px] rounded-full pointer-events-none opacity-40 will-change-transform transform-gpu"
        />

        {/* Waves overlay - subtle for light theme */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none text-black/5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="grain">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
              </filter>
            </defs>
            <rect width="100%" height="100%" filter="url(#grain)" />
          </svg>
        </div>
        
        {/* Soft Mesh Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/60" />
      </div>

      <div className="relative z-10">
        {/* Page Header */}
      <section className="pt-32 pb-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
              Let's Build Something <span className="text-[#4F46E5]">Great Together</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Tell us about your project and we'll get back to you within 24 hours with a tailored proposal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="pb-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {contactInfo.map((item, index) => (
              <Link 
                key={index}
                href={item.href}
                target={item.href.startsWith('http') ? "_blank" : undefined}
                className="group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cardStyle}
                >
                  <div className={iconBoxStyle}>
                    {item.icon}
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-1">{item.title}</h4>
                  <p className="text-lg font-bold text-gray-900 group-hover:text-[#4F46E5] transition-colors">{item.detail}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Action Area */}
      <section className="py-12 pb-32">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            
            {/* Trust Column (1/3) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 space-y-8"
            >
              <div className={`${cardStyle} h-full`}>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
                  Ready to grow?
                </h2>
                <p className="text-gray-600 leading-relaxed mb-10 font-medium">
                  Whether you need a brand-new SaaS platform, a mobile app, or AI-powered features, our world-class team is ready to turn your vision into reality.
                </p>

                <div className="space-y-6">
                  {[
                    { title: "Free Initial Consultation", desc: "Get expert advice with no commitment required." },
                    { title: "Tailored Proposal in 24h", desc: "Receive a detailed plan and transparent pricing." },
                    { title: "Dedicated Project Manager", desc: "A single point of contact throughout your project." },
                    { title: "On-Time & On-Budget", desc: "We guarantee delivery without scope creep." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <CheckCircle2 className="w-6 h-6 text-[#4F46E5] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Form Column (2/3) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <div className={cardStyle}>
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="border-b border-black/5 pb-6 mb-12">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">Get in Touch</h3>
                      <p className="text-gray-500 text-sm">We'll respond within 24 hours.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3.5">
                        <label className="text-xs font-black uppercase tracking-widest text-[#4F46E5] ml-2">Full Name *</label>
                        <input
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder="Name"
                          className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 text-gray-900 font-bold focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all shadow-sm"
                        />
                      </div>
                      <div className="space-y-3.5">
                        <label className="text-xs font-black uppercase tracking-widest text-[#4F46E5] ml-2">Email Address *</label>
                        <input
                          required
                          type="email"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="email@company.com"
                          className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 text-gray-900 font-bold focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3.5">
                        <label className="text-xs font-black uppercase tracking-widest text-[#4F46E5] ml-2">Phone Number</label>
                        <input
                          value={formState.phone}
                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                          placeholder="+xx xxxxxxxxx"
                          className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 text-gray-900 font-bold focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all shadow-sm"
                        />
                      </div>
                      <div className="space-y-3.5">
                        <label className="text-xs font-black uppercase tracking-widest text-[#4F46E5] ml-2">Company Name</label>
                        <input
                          value={formState.company}
                          onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                          placeholder="Organization"
                          className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 text-gray-900 font-bold focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-3.5">
                      <label className="text-xs font-black uppercase tracking-widest text-[#4F46E5] ml-2">Service Interested In</label>
                      <select
                        value={formState.service}
                        onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                        className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 text-gray-900 font-bold focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all shadow-sm appearance-none cursor-pointer"
                      >
                        <option value="">Select a service...</option>
                        {initialService && !["infrastructure", "automation", "ai-saas", "seo", "web-app", "other"].includes(initialService.toLowerCase()) && (
                          <option value={initialService}>{initialService}</option>
                        )}
                        <option value="infrastructure">Infrastructure</option>
                        <option value="automation">Automation</option>
                        <option value="ai-saas">AI Agent & SaaS Development</option>
                        <option value="seo">SEO Optimization</option>
                        <option value="web-app">Web & App Development</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-3.5">
                      <label className="text-xs font-black uppercase tracking-widest text-[#4F46E5] ml-2">Project Description *</label>
                      <textarea
                        required
                        rows={5}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Tell us about your project, goals, and timeline..."
                        className="w-full bg-gray-50 border border-black/5 rounded-[32px] px-8 py-6 text-gray-900 font-bold focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all shadow-sm resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-16 bg-gray-900 hover:bg-[#4F46E5] text-white rounded-[24px] px-10 text-lg font-black uppercase tracking-widest transition-all duration-300 shadow-xl flex items-center justify-center gap-4 active:scale-[0.98] disabled:opacity-50"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                  >
                    <div className="w-24 h-24 bg-[#22C55E]/10 rounded-[32px] flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 className="w-12 h-12 text-[#22C55E]" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Message Sent!</h3>
                    <p className="text-xl text-gray-500 font-medium max-w-sm mx-auto">
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}

export function GetStartedClient() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-black/5 border-t-[#4F46E5] rounded-full animate-spin" />
    </div>}>
      <GetStartedForm />
    </Suspense>
  );
}
