'use client';

import { getApiUrl } from "@/lib/api";

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from "motion/react";
import { CheckCircle2, ShieldCheck, ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/Button";

export function RequestDemoClient() {
  const searchParams = useSearchParams();
  const serviceName = searchParams.get('service') || '';
  
  const categorySlug = searchParams.get('category');
  const serviceSlug = searchParams.get('slug');
  const backHref = (categorySlug && serviceSlug) 
    ? `/services/${categorySlug}/${serviceSlug}` 
    : '/products';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: serviceName,
    message: ''
  });

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
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service || serviceName,
          message: `[DEMO REQUEST] Company: ${formData.company}. Requirements: ${formData.message}`,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit demo request');

      // Track Conversion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'lead_form_submit', {
          event_category: 'conversion',
          event_label: 'request_demo',
          value: 1
        });
      }

      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1500);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      alert('Something went wrong. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto py-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white rounded-[40px] p-8 md:p-12 lg:p-20 shadow-2xl border border-slate-100 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-[100px] rounded-full animate-pulse" />
          <div className="relative z-10 text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, stiffness: 200 }}
              className="w-24 h-24 bg-indigo-700 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-indigo-700/20 rotate-12"
            >
              <CheckCircle2 className="w-12 h-12" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">Successfully Received!</h2>
            <p className="text-xl text-slate-500 mb-12 max-w-lg mx-auto leading-relaxed">We've prioritized your request for a {serviceName} demonstration.</p>
            <Button href={backHref} size="lg" className="px-12 rounded-2xl">Return to Service Detail</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-20 items-center">
      <div>
        <Link href={backHref} className="inline-flex items-center gap-2 text-slate-500 hover:text-[#4F46E5] transition-colors font-semibold uppercase tracking-widest text-[11px] mb-6">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Service
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">Experience Agara {serviceName}</h1>
        <div className="space-y-6">
          {["Personalized 1-on-1 walkthrough", "Live technical Q&A session", "Custom solution architecture draft"].map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <CheckCircle2 className="w-5 h-5 text-indigo-700" />
              <span className="font-bold text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-3xl rounded-full" />
        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-wider text-slate-500 ml-4">Full Name</label>
              <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" className="w-full px-6 py-4 rounded-2xl bg-slate-100/50 border border-slate-200/60 focus:border-indigo-600 focus:bg-white outline-none font-medium transition-all placeholder:text-slate-400" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-wider text-slate-500 ml-4">Work Email</label>
              <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="email@company.com" className="w-full px-6 py-4 rounded-2xl bg-slate-100/50 border border-slate-200/60 focus:border-indigo-600 focus:bg-white outline-none font-medium transition-all placeholder:text-slate-400" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-wider text-slate-500 ml-4">Organization</label>
            <input required type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder="Your Company Name" className="w-full px-6 py-4 rounded-2xl bg-slate-100/50 border border-slate-200/60 focus:border-indigo-600 focus:bg-white outline-none font-medium transition-all placeholder:text-slate-400" />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-wider text-slate-500 ml-4">Requirements</label>
            <textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us about your project needs..." className="w-full px-6 py-4 rounded-2xl bg-slate-100/50 border border-slate-200/60 focus:border-indigo-600 focus:bg-white outline-none font-medium transition-all placeholder:text-slate-400 resize-none" />
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting} 
            type="submit" 
            className="w-full py-5 rounded-2xl bg-[#4F46E5] text-white font-black text-lg hover:shadow-xl hover:shadow-indigo-600/20 transition-all flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              <>
                Request Demo <Send className="w-5 h-5" />
              </>
            )}
          </motion.button>
          <p className="text-center text-xs text-slate-400 font-medium tracking-tight">
            Our solution architects typically respond within 12 business hours.
          </p>
        </form>
      </div>
    </div>
  );
}
