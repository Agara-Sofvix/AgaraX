'use client';

import { useState, useEffect } from 'react';
import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { getApiUrl } from "@/lib/api";

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const apiUrl = getApiUrl();
      try {
        const res = await fetch(`${apiUrl}/api/testimonials`);
        if (res.ok) {
          const data = await res.json();
          // Filter out hidden testimonials if they are not already filtered by the API
          const visibleTestimonials = data?.filter((t: any) => t.isVisible !== false) || [];
          setTestimonials(visibleTestimonials);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Do not render anything if loading or if there are no testimonials to show.
  // This fulfills the requirement that the section should only show if the user has added reviews.
  if (isLoading || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-gray-50 border-y border-gray-100 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by Visionary Leaders</h2>
          <p className="text-xl text-gray-600">We don't just deliver code; we deliver peace of mind.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t._id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative group hover:shadow-xl transition-all duration-300"
            >
              <Quote className="absolute top-6 right-8 w-12 h-12 text-gray-100 group-hover:text-indigo-50 transition-colors" />
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#4F46E5] text-[#4F46E5]" />
                ))}
              </div>
              <p className="text-gray-700 mb-8 relative z-10 font-medium italic">
                "{t.content}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center font-bold text-gray-400 capitalize">
                  {t.name ? t.name[0] : "?"}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{t.name}</h4>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
