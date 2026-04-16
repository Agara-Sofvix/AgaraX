'use client';

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, Linkedin, Twitter, Github, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-1 mb-6">
              <Image src="/logo-v3.png" alt="AgaraX Logo" width={40} height={40} className="" />
              <span className="text-white text-2xl font-bold tracking-tight">
                AgaraX
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Engineering scalable digital products and enterprise solutions for global businesses.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors text-sm">Services</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-white transition-colors text-sm">Products</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors text-sm">Careers</Link></li>
            </ul>
          </div>

          {/* Services - Internal Linking */}
          <div>
            <h3 className="text-white font-semibold mb-6">Enterprise Systems</h3>
            <ul className="space-y-3">
              <li><Link href="/products?category=cx-sales" className="text-gray-400 hover:text-white transition-colors text-sm">Customer Experience</Link></li>
              <li><Link href="/products?category=marketing" className="text-gray-400 hover:text-white transition-colors text-sm">Marketing Automation</Link></li>
              <li><Link href="/products?category=finance-ops" className="text-gray-400 hover:text-white transition-colors text-sm">Finance & Operations</Link></li>
              <li><Link href="/products?category=it-security" className="text-gray-400 hover:text-white transition-colors text-sm">IT & Security</Link></li>
            </ul>
          </div>

          {/* Contact & Location (Symbols Only) */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <div className="flex justify-start gap-4 mt-2">
              <a 
                href="https://share.google/ryAuYzrJa0tTt3g5o" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#4F46E5] hover:bg-white/10 hover:border-[#4F46E5]/30 transition-all duration-300"
                aria-label="Find us on Google Maps - AgaraX Velachery Chennai"
              >
                <MapPin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:info@agarax.com" 
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#4F46E5] hover:bg-white/10 hover:border-[#4F46E5]/30 transition-all duration-300"
                aria-label="Send an email to AgaraX"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="tel:+919498069292" 
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#4F46E5] hover:bg-white/10 hover:border-[#4F46E5]/30 transition-all duration-300"
                aria-label="Call AgaraX support at +91 94980 69292"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
            <div className="flex justify-start gap-4 mt-4">
              <a 
                href="https://www.linkedin.com/company/AgaraX/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#4F46E5] hover:bg-white/10 hover:border-[#4F46E5]/30 transition-all duration-300"
                aria-label="Follow AgaraX on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/agarax?igsh=MWs1NWVjejdpcHVtMg%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#4F46E5] hover:bg-white/10 hover:border-[#4F46E5]/30 transition-all duration-300"
                aria-label="Follow AgaraX on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-xs max-w-2xl text-center md:text-left leading-relaxed">
              AgaraX is a leading software engineering and SEO automation agency in Velachery, Chennai. 
              We specialize in custom enterprise systems, AI-driven marketing automation, and scalable digital solutions for global enterprises.
            </p>
            <p className="text-gray-400 text-sm whitespace-nowrap">
              © 2026 AgaraX. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
