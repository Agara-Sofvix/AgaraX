'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Layers, 
  ShoppingCart, 
  MessageSquare, 
  Users,
  Briefcase,
  Settings, 
  LogOut,
  ChevronRight,
  Globe,
  Database,
  Star
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Services", href: "/admin/services", icon: Layers },
    { name: "Products", href: "/admin/products", icon: ShoppingCart },
    { name: "Jobs", href: "/admin/jobs", icon: Briefcase },
    { name: "Careers", href: "/admin/careers", icon: Users },
    { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
    { name: "Testimonials", href: "/admin/testimonials", icon: Star },
    { name: "SEO", href: "/admin/seo", icon: Globe },
    { name: "Logs", href: "/admin/logs", icon: Database },
  ];

  return (
    <aside className="w-20 lg:w-72 h-screen border-r border-black/5 flex flex-col bg-white shrink-0 transition-all duration-300 z-40">
      <div className="p-8 border-b border-black/5 flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-[#4F46E5] to-[#FB923C] rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">A</span>
        </div>
        <div className="hidden lg:block">
          <h2 className="text-sm font-bold text-gray-900 leading-tight">Agara Admin</h2>
          <p className="text-[10px] text-gray-500 font-medium tracking-widest uppercase">Management Suite</p>
        </div>
      </div>

      <nav className="flex-grow p-4 lg:p-6 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center justify-center lg:justify-between p-3 lg:p-4 rounded-xl transition-all duration-200 group relative ${
                isActive 
                  ? "bg-[#4F46E5]/10 text-[#4F46E5]" 
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-4">
                <Icon className={`w-6 h-6 lg:w-5 lg:h-5 ${isActive ? "text-[#4F46E5]" : "group-hover:text-gray-900"}`} />
                <span className={`hidden lg:block text-sm font-bold ${isActive ? "text-[#4F46E5]" : "group-hover:text-gray-900"}`}>
                  {link.name}
                </span>
                
                {/* Mobile Tooltip */}
                <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible lg:hidden whitespace-nowrap z-50 transition-all">
                  {link.name}
                </div>
              </div>
              {isActive && <div className="hidden lg:block w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />}
            </Link>
          );
        })}
      </nav>

    </aside>
  );
}
