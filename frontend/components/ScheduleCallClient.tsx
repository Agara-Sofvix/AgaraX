'use client';

import { getApiUrl } from "@/lib/api";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from "motion/react";
import { Calendar, Clock, Video, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/Button";

export function ScheduleCallClient() {
  const searchParams = useSearchParams();
  const serviceName = searchParams.get('service') || '';
  
  const categorySlug = searchParams.get('category');
  const serviceSlug = searchParams.get('slug');
  const backHref = (categorySlug && serviceSlug) 
    ? `/services/${categorySlug}/${serviceSlug}` 
    : '/products';

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    techStack: '',
    message: '',
    timeSlot: '09:00 AM'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);

  const [days, setDays] = useState<{name: string, date: number, month: string}[]>([]);

  useEffect(() => {
    const arr = [];
    const now = new Date();
    // Dynamically show the next 4 days from 'today'
    for (let i = 1; i <= 4; i++) {
        const d = new Date();
        d.setDate(now.getDate() + i);
        arr.push({
          name: d.toLocaleDateString('en-US', { weekday: 'short' }),
          date: d.getDate(),
          month: d.toLocaleDateString('en-US', { month: 'short' })
        });
      }
      setDays(arr);
    }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const day = days[selectedDay];
    
    try {
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: "Architect Call",
          email: formData.email,
          phone: formData.phone,
          service: serviceName || "Architecture Consultation",
          message: `[ARCHITECT CALL] Scheduled for ${day.name} ${day.month} ${day.date} at ${formData.timeSlot}. Tech Stack: ${formData.techStack}.`,
        }),
      });

      if (!response.ok) throw new Error('Failed to schedule call');

      // Track Conversion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'lead_form_submit', {
          event_category: 'conversion',
          event_label: 'schedule_call',
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
      alert('Something went wrong.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto py-10 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[40px] p-12 lg:p-20 shadow-2xl border border-slate-100">
          <Calendar className="w-20 h-20 text-slate-900 mx-auto mb-8" />
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Call Confirmed!</h2>
          <p className="text-xl text-slate-500 mb-12">A calendar invite has been dispatched to your email.</p>
          <Button href={backHref} size="lg" className="px-12 rounded-2xl">Back to Service Detail</Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-20 items-stretch">
      <div>
        <Link href={backHref} className="inline-flex items-center gap-2 text-slate-500 hover:text-[#4F46E5] transition-colors font-semibold uppercase tracking-widest text-[11px] mb-6">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Service
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Architect Call</h1>
        <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 space-y-8">
          <div className="flex items-start gap-6">
            <Clock className="w-6 h-6 text-slate-800" />
            <div>
              <p className="font-bold text-slate-900">30 Minutes</p>
              <p className="text-slate-500 text-sm">Focused Consultation</p>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <Video className="w-6 h-6 text-slate-800" />
            <div>
              <p className="font-bold text-slate-900">Web Conference</p>
              <p className="text-slate-500 text-sm">Google Meet / Microsoft Teams</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-3xl rounded-full" />
        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="space-y-3">
            <label className="text-[11px] font-black uppercase tracking-wider text-slate-500 ml-4">Select Your Preferred Day</label>
            <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar flex-nowrap max-w-full touch-pan-x">
              {days.map((day, i) => (
                <button 
                  key={i} 
                  type="button" 
                  onClick={() => setSelectedDay(i)} 
                  className={`flex-shrink-0 w-[90px] p-5 rounded-[24px] border transition-all duration-300 ${
                    selectedDay === i 
                      ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/20 scale-105' 
                      : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  <span className="text-[10px] font-black uppercase block mb-1 opacity-60 tracking-tighter">{day.name}</span>
                  <span className="text-xl font-black block leading-none">{day.date}</span>
                  <span className="text-[10px] font-bold block mt-1 opacity-60">{day.month}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-wider text-slate-500 ml-4">Business Email</label>
              <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="email@company.com" className="w-full px-6 py-4 rounded-2xl bg-slate-100/50 border border-slate-200/60 focus:border-indigo-600 focus:bg-white outline-none font-medium transition-all placeholder:text-slate-400" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-wider text-slate-500 ml-4">Phone Number</label>
              <input required type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+xx xxxxxxxxxx" className="w-full px-6 py-4 rounded-2xl bg-slate-100/50 border border-slate-200/60 focus:border-indigo-600 focus:bg-white outline-none font-medium transition-all placeholder:text-slate-400" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-wider text-slate-500 ml-4">Current Tech Stack</label>
            <input required type="text" value={formData.techStack} onChange={(e) => setFormData({ ...formData, techStack: e.target.value })} placeholder="e.g., React, Node.js, AWS" className="w-full px-6 py-4 rounded-2xl bg-slate-100/50 border border-slate-200/60 focus:border-indigo-600 focus:bg-white outline-none font-medium transition-all placeholder:text-slate-400" />
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
                <span>Scheduling...</span>
              </div>
            ) : (
              <>
                Confirm Call <Video className="w-5 h-5" />
              </>
            )}
          </motion.button>
          <p className="text-center text-xs text-slate-400 font-medium tracking-tight">
            Select a time slot on the next step or we will contact you via email.
          </p>
        </form>
      </div>
    </div>
  );
}
