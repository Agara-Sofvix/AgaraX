'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "motion/react";
import { 
  Search, 
  ArrowRight, 
  DollarSign, 
  Megaphone, 
  ShoppingCart, 
  Wrench, 
  BarChart3, 
  Building, 
  Mail, 
  Users, 
  Lock, 
  PieChart, 
  LayoutGrid, 
  Code2, 
  Globe,
  Home,
  Share2,
  Settings,
  ChevronRight,
  Maximize2,
  Sparkles,
  Zap,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  MessageSquare,
  Calendar,
  FileSignature,
  Video,
  CreditCard,
  Box,
  Layout,
  Trello,
  Briefcase,
  Database,
  ArrowUpRight,
  MapPin,
  UserPlus,
  Files,
  Inbox,
  Clock,
  LineChart,
  Activity,
  FileText
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { CATEGORIES, SERVICES, Service, Category } from "@/app/(main)/products/data";

const ICON_MAP: Record<string, any> = {
  DollarSign,
  Megaphone,
  ShoppingCart,
  Wrench,
  BarChart3,
  Building,
  Mail,
  Users,
  Lock,
  PieChart,
  Code2,
  Globe,
  LayoutGrid,
  Zap,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  MessageSquare,
  Calendar,
  FileSignature,
  Video,
  CreditCard,
  Box,
  Layout,
  Trello,
  Briefcase,
  Database,
  MapPin,
  UserPlus,
  Files,
  Inbox,
  Clock,
  LineChart,
  Activity,
  FileText
};

export function ServicesClient() {
  return (
    <div className="relative w-full text-gray-900 selection:bg-[#4F46E5]/20">
      {/* Cinematic Mesh Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gemini-light" />
        
        {/* Animated Mesh blobs - adjusted for light theme */}
        <motion.div 
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] bg-[#4F46E5]/10 blur-[80px] rounded-full pointer-events-none opacity-50"
        />
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -60, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[70%] h-[70%] bg-blue-500/5 blur-[80px] rounded-full pointer-events-none opacity-40"
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

      {/* Main Content Stage */}
      <div className="relative z-10 flex flex-col w-full">
        
        {/* Hero Section */}
        <header className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-8 drop-shadow-sm text-gray-900 leading-[1.1]">
              Enterprise-Grade Digital Systems <br />
              <span className="text-gray-500">That Scale Your Business Without Complexity</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 font-medium tracking-wide max-w-4xl mx-auto mb-12">
              We architect, implement, and integrate intelligent software ecosystems that streamline operations, 
              enhance customer experiences, and accelerate measurable business growth.
            </p>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-6">
              <Button href="/get-started" size="lg" className="w-full sm:w-80 whitespace-nowrap">
                Get Free System Consultation
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => window.scrollTo({ top: window.innerHeight * 1.5, behavior: 'smooth' })}
                className="bg-white/40 backdrop-blur-xl w-full sm:w-80 whitespace-nowrap"
              >
                Explore Our Solutions
              </Button>
            </div>
          </motion.div>
        </header>

        {/* Trust Indicators */}
        <section className="py-20 border-y border-black/5 bg-white/40 backdrop-blur-sm">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                "Fully Integrated Business Ecosystems",
                "Scalable for High-Growth Companies",
                "Secure, Compliant & Reliable Systems",
                "End-to-End Implementation & Support"
              ].map((trust, idx) => (
                <div key={idx} className="flex items-center gap-4 text-gray-500 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#4F46E5]" />
                  <span>{trust}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How We Deliver (Process) */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto w-full">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">How We Deliver</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A structured, architecture-driven approach ensures predictable outcomes and long-term scalability.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {[
              { id: 1, title: "Business Analysis", desc: "We deeply understand your workflows, challenges, and growth objectives." },
              { id: 2, title: "System Architecture Design", desc: "We design a scalable, modular system tailored to your business model." },
              { id: 3, title: "Implementation & Integration", desc: "We deploy and integrate tools into a unified ecosystem." },
              { id: 4, title: "Automation & Optimization", desc: "We eliminate manual work through intelligent workflows." },
              { id: 5, title: "Continuous Scaling", desc: "We evolve your system as your business grows." }
            ].map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -top-6 -left-6 text-8xl font-black text-black/[0.03] group-hover:text-[#4F46E5]/10 transition-colors">
                  {step.id}
                </div>
                <div className="relative pt-12">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-[#4F46E5] transition-colors">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
                {idx < 4 && <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-black/5" />}
              </div>
            ))}
          </div>
        </section>

        {/* System Architecture Layered Visual */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight text-gray-900">Our System <br /> Architecture</h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                We build connected, scalable ecosystems across five critical layers of enterprise intelligence.
              </p>
              
              <div className="space-y-6">
                {[
                  { layer: "Experience Layer", detail: "Customer Interfaces & Applications" },
                  { layer: "Application Layer", detail: "CRM, ERP, Business Systems" },
                  { layer: "Automation Layer", detail: "Workflows, RPA, AI" },
                  { layer: "Data Layer", detail: "Analytics, BI, Data Processing" },
                  { layer: "Infrastructure Layer", detail: "Cloud, Security, Integrations" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-xl bg-white border border-black/5 flex items-center justify-center text-[#4F46E5] font-bold group-hover:bg-[#4F46E5] group-hover:text-white transition-all shadow-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{item.layer}</h4>
                      <p className="text-sm text-gray-500">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-square perspective-1000 hidden lg:block">
              {/* Stacked Glass visual */}
              {[4, 3, 2, 1, 0].map((i) => (
                <motion.div
                  key={i}
                  initial={{ rotateX: 45, rotateZ: -35, y: 0, opacity: 0 }}
                  animate={{ 
                    y: i * -50, 
                    opacity: 1 - (i * 0.15),
                    scale: 1 - (i * 0.05)
                  }}
                  className="absolute inset-20 bg-white/40 backdrop-blur-xl border border-black/5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex items-center justify-center"
                >
                  <div className="w-1/2 h-1/2 border border-black/5 rounded-full opacity-20" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Metrics */}
        <section className="py-24 border-y border-black/5 bg-white/20">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="grid lg:grid-cols-4 gap-12 text-center">
              {[
                { val: "60%", label: "Process automation achieved" },
                { val: "2x", label: "Improvement in productivity" },
                { val: "50%", label: "Reduction in inefficiencies" },
                { val: "Phased", label: "Deployment Strategy" }
              ].map((metric, idx) => (
                <div key={idx} className="group">
                  <div className="text-6xl font-black mb-4 text-[#4F46E5] drop-shadow-[0_0_20px_rgba(249,115,22,0.2)] group-hover:scale-110 transition-transform">
                    {metric.val}
                  </div>
                  <p className="text-gray-500 font-medium tracking-wide uppercase text-xs">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[#4F46E5]/5 blur-[150px] rounded-full -bottom-1/2 left-1/2 -translate-x-1/2 pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto relative z-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-gray-900">
              Build a Scalable Digital <br /> Ecosystem for Your Business
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Get a clear, expert-driven roadmap before you invest in technology.
            </p>
            <Button href="/get-started" size="lg" className="w-full md:w-auto">
              Book Your Free System Architecture Consultation
            </Button>
          </motion.div>
        </section>

      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .perspective-1000 { perspective: 1000px; }
        
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .scanline {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 2px;
          background: linear-gradient(to right, transparent, rgba(0,0,0,0.05), transparent);
          animation: scan 4s linear infinite;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
