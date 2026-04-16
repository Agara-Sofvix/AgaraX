'use client';

import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import {
  ArrowRight,
  Users,
  Award,
  Zap,
  Shield,
  Terminal,
  Layers,
  Monitor,
  Cpu,
  Bookmark,
  ShoppingCart,
  Megaphone,
  BarChart3,
  Globe,
  Lock,
  PieChart
} from "lucide-react";
import { Button } from "@/components/Button";
import { CATEGORIES } from "@/app/(main)/products/data";
import { useRouter } from "next/navigation";
import { Testimonials } from "@/components/Testimonials";
import { LivingDiagram } from "@/components/LivingDiagram";

const ICON_MAP: Record<string, any> = {
  Users,
  Megaphone,
  ShoppingCart,
  BarChart3,
  Mail: Layers,
  Box: Layers,
  Lock,
  PieChart,
  Globe,
  Zap
};

export function HomeClient() {
  const router = useRouter();
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const services = [
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Custom Web App Development",
      description: "High-performance, scalable web applications built with Next.js and modern architectures."
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "AI-Powered Solutions",
      description: "Intelligent automation and AI agents that transform how your business operates."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Startup MVP Development",
      description: "Launch your product in weeks, not months, with our optimized development blueprint."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Business Automation Systems",
      description: "Streamline workflows and eliminate manual tasks with custom software solutions."
    }
  ];

  const featuredCategories = CATEGORIES.slice(0, 3);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Scalable Development Pipeline",
      description: "Agile methodology ensuring rapid delivery without compromising quality"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise-Grade Security",
      description: "Bank-level security standards and compliance certifications"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Expert Team",
      description: "200+ certified developers and architects with proven expertise"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Results-Driven Delivery",
      description: "Consistent, measurable outcomes aligned with your business goals"
    }
  ];

  return (
    <div className="bg-gemini-light min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/10 via-transparent to-transparent"></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 lg:pt-8 lg:pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Build Scalable Software That Drives <span className="text-[#4F46E5]">Real Business Growth</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
                We help startups and businesses launch high-performance web, mobile, and AI solutions — fast, reliable, and conversion-focused.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 relative z-20 w-full sm:w-auto mb-8">
                <Button href="/get-started" size="md" className="w-full sm:w-64">
                  Get Free Consultation
                </Button>
                <Button href="tel:+919498069292" variant="outline" size="md" className="w-full sm:w-64 text-slate-700">
                  Talk to Expert
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative flex items-center justify-center min-h-[600px]"
            >
              <LivingDiagram />
            </motion.div>
          </div>
        </div>
      </section>


      {/* Problem → Solution Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Performance holding you back?<span className="text-[#4F46E5]">Upgrade speed and scale.</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Many businesses fail because their technology can't keep up with their growth. We bridge the gap between vision and reality.
              </p>
              <div className="space-y-4">
                {[
                  { title: "Scalable architecture", desc: "Systems that grow with your user base without breaking." },
                  { title: "Fast deployment", desc: "Agile processes to get you to market in record time." },
                  { title: "Conversion-focused design", desc: "UI/UX optimized to turn visitors into paying customers." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div>
                      <h4 className="font-bold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-inner">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-black/5 flex items-center gap-4">
                  <div>
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Metric Update</div>
                    <div className="font-bold text-gray-900">3x Faster Deployment Achieved</div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-black/5 flex items-center gap-4 translate-x-4">
                  <div>
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Performance</div>
                    <div className="font-bold text-gray-900">+120% Infrastructure Efficiency</div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-black/5 flex items-center gap-4 translate-x-8">
                  <div>
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Revenue</div>
                    <div className="font-bold text-gray-900">Increased Client Conversion Rates</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-24 bg-[#1E293B] text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-center"></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">We don’t build projects. We build results.</h2>
            <p className="text-xl text-gray-400">Our impact is measured in the growth of our partners.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: "Deployment Speed", val: "3x", sub: "Faster than industry average" },
              { label: "Performance Boost", val: "40–120%", sub: "Across all major web vitals" },
              { label: "Client Conversion", val: "Increased", sub: "Scalable revenue systems" }
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl text-center">
                <div className="text-[#4F46E5] text-4xl md:text-5xl font-bold mb-2">{stat.val}</div>
                <div className="text-xl font-bold mb-1">{stat.label}</div>
                <div className="text-sm text-gray-400">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              End-to-end software development services tailored to your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => router.push('/get-started')}
                className="group bg-white rounded-xl p-8 border border-black/5 hover:border-[#4F46E5]/50 transition-all duration-300 hover:transform hover:-translate-y-2 cursor-pointer shadow-sm hover:shadow-md h-full flex flex-col justify-center"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="py-24 bg-black/20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Innovative SaaS products designed for modern enterprises
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCategories.map((category, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => router.push(`/products?category=${category.id}`)}
                  className="group bg-white rounded-xl overflow-hidden border border-black/5 hover:border-[#4F46E5]/50 transition-all duration-500 shadow-sm hover:shadow-xl flex flex-col h-full cursor-pointer"
                >
                  <div className="p-10 flex flex-col flex-grow">
                    <div className="inline-block bg-[#4F46E5]/10 text-[#4F46E5] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4 w-fit">
                      {category.id.replace('-', ' ')}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#4F46E5] transition-colors">{category.name}</h3>
                    <p className="text-gray-500 text-sm mb-8 line-clamp-3 leading-relaxed">{category.overview}</p>
                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-black/5">
                      <span className="text-[#4F46E5] text-sm font-bold flex items-center gap-2 group/link">
                        Explore System
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Button href="/products" variant="primary">
              Explore All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">Why Partner with AgaraX</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We deliver excellence through AI-powered innovation, deep technical expertise, and a commitment to your business growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 bg-gray-50 rounded-[32px] border border-transparent hover:border-[#4F46E5]/20 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-default group"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#4F46E5] transition-colors">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Final CTA */}
      <section className="py-24 bg-white relative overflow-hidden border-t border-black/5">
        <div className="absolute inset-0 bg-[#4F46E5]/5 blur-[150px] rounded-full -bottom-1/2 left-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-gray-900">
              Let’s Engineer Your <br /> <span className="text-[#4F46E5]">Revenue Engine.</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-10 font-medium max-w-2xl mx-auto">
              Stop settling for generic solutions. Join forward-thinking leaders who scale with AI-driven software ecosystems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button href="/get-started" variant="primary" size="lg" className="rounded-xl w-full sm:w-64">
                Begin a Project
              </Button>
              <Button href="tel:+919498069292" variant="outline" size="lg" className="rounded-xl w-full sm:w-64">
                Book Strategy Call
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
