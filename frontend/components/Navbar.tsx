'use client';

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "./Button";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/products" },
    { name: "Careers", path: "/careers" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black border-b border-white/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1">
            <Image src="/logo-v3.png" alt="AgaraX Logo" width={40} height={40} className="" />
            <span className="text-white text-2xl font-bold tracking-tight">
              AgaraX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`transition-colors duration-200 text-sm font-medium ${
                  pathname === link.path 
                    ? "text-[#4F46E5] font-bold" 
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button href="/get-started" size="sm" className="px-6">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#111827] border-t border-white/10">
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block transition-colors duration-200 text-sm font-medium ${
                  pathname === link.path 
                    ? "text-[#4F46E5] font-bold" 
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button href="/get-started" className="w-full" onClick={() => setIsMenuOpen(false)}>
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
