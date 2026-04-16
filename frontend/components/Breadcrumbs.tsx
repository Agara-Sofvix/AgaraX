'use client';

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { JsonLd, generateBreadcrumbSchema } from "./JsonLd";

interface BreadcrumbItem {
  name: string;
  item: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const schemaItems = [{ name: "Home", item: "/" }, ...items];

  return (
    <nav className="flex items-center space-x-2 text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
      <JsonLd type="BreadcrumbList" data={generateBreadcrumbSchema(schemaItems)} />
      
      <Link href="/" className="hover:text-indigo-700 transition-colors flex items-center gap-1">
        <Home className="w-4 h-4" />
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4 text-slate-300" />
          <Link 
            href={item.item} 
            className={`hover:text-indigo-700 transition-colors ${index === items.length - 1 ? 'font-bold text-slate-900' : ''}`}
            aria-current={index === items.length - 1 ? 'page' : undefined}
          >
            {item.name}
          </Link>
        </div>
      ))}
    </nav>
  );
}
