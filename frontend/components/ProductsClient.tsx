'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { 
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
  FileText,
  ChevronDown
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

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

interface Capability {
  name: string;
  icon: string;
  slug: string;
  description: string;
}

interface Category {
  id: string;
  slug: string;
  name: string;
  overview: string;
  outcomes: string[];
  capabilities: Capability[];
}

interface ProductsClientProps {
  initialCategories: Category[];
}

export function ProductsClient({ initialCategories }: ProductsClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const [categories] = useState<Category[]>(initialCategories || []);
  const initialCategory = searchParams.get('category') || categories[0]?.slug || '';
  const [activeCategoryId, setActiveCategoryId] = useState<string>(initialCategory);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && cat !== activeCategoryId) {
      setActiveCategoryId(cat);
    }
  }, [searchParams]);
  
  const handleCategoryClick = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', categoryId);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const itemsRef = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    if (activeCategoryId && itemsRef.current[activeCategoryId]) {
      itemsRef.current[activeCategoryId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [activeCategoryId]);

  const activeCategory = useMemo(() => 
    categories.find(c => c.slug === activeCategoryId || c.id === activeCategoryId)
  , [activeCategoryId, categories]);

  if (categories.length === 0) return <div className="p-8">No products found.</div>;

  return (
    <div className="relative w-full text-gray-900 selection:bg-[#4F46E5]/20 bg-gemini-light min-h-screen">
      <div className="relative z-10 flex flex-col w-full px-6">
        <header className="pt-12 pb-6 max-w-7xl mx-auto text-center w-full overflow-hidden">
          {/* Mobile Dropdown */}
          <div className="md:hidden flex justify-center mb-8 px-4 w-full">
            <div className="relative w-full max-w-xs">
              <select
                value={activeCategoryId}
                onChange={(e) => handleCategoryClick(e.target.value)}
                className="w-full bg-white/60 backdrop-blur-2xl border border-black/5 p-4 rounded-3xl shadow-xl appearance-none text-sm font-black uppercase tracking-wider text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug || cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Desktop Pills */}
          <div className="hidden md:flex justify-center mb-8 w-full">
            <nav className="bg-white/60 backdrop-blur-2xl border border-black/5 p-1.5 rounded-full shadow-xl flex items-center gap-1 overflow-x-auto no-scrollbar max-w-full touch-pan-x">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  ref={(el) => { itemsRef.current[cat.slug || cat.id] = el; }}
                  onClick={() => handleCategoryClick(cat.slug || cat.id)}
                  className={`relative px-6 py-3 rounded-full text-xs font-black transition-all duration-500 whitespace-nowrap uppercase tracking-wider ${
                    (activeCategoryId === cat.slug || activeCategoryId === cat.id) ? 'text-gray-900' : 'text-gray-400 hover:text-gray-900'
                  }`}
                >
                  {(activeCategoryId === cat.slug || activeCategoryId === cat.id) && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute inset-0 bg-[#4F46E5]/10 border border-[#4F46E5]/20 rounded-full"
                    />
                  )}
                  <span className="relative z-10">{cat.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto w-full pb-32">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategoryId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-12 gap-10"
            >
               <div className="lg:col-span-5">
                  <div className="bg-white p-10 rounded-[40px] shadow-xl border border-black/5">
                     <h2 className="text-3xl font-bold mb-6">{activeCategory?.name}</h2>
                     <p className="text-lg text-gray-600 mb-8">{activeCategory?.overview}</p>
                     <div className="space-y-4">
                        {activeCategory?.outcomes?.map((outcome, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm font-medium text-gray-600">
                             <CheckCircle2 className="w-4 h-4 text-[#4F46E5]" />
                             {outcome}
                          </div>
                        ))}
                     </div>
                  </div>
               </div>
               <div className="lg:col-span-7">
                  <div className="grid sm:grid-cols-2 gap-6">
                     {activeCategory?.capabilities?.map((cap, i) => (
                       <Link key={i} href={`/services/${activeCategory.slug}/${cap.slug}`} className="group p-8 bg-white rounded-3xl border border-black/5 hover:border-[#4F46E5]/20 transition-all hover:shadow-xl">
                          <div className="flex items-center justify-between mb-6">
                             <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center">
                                {(() => {
                                  const CapIcon = ICON_MAP[cap.icon] || LayoutGrid;
                                  return <CapIcon className="w-5 h-5" />;
                                })()}
                             </div>
                             <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-gray-900 transition-colors" />
                          </div>
                          <h4 className="font-bold text-gray-900 mb-2">{cap.name}</h4>
                          <p className="text-xs text-gray-500 font-medium">Standard Integrated Capability</p>
                       </Link>
                     ))}
                  </div>
               </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
