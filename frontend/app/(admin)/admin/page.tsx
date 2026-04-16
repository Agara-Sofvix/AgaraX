'use client';

import { getApiUrl } from '@/lib/api';

import { motion } from "motion/react";
import { 
  Users, 
  Layers, 
  MessageSquare, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  MoreVertical,
  ChevronRight,
  Zap,
  Globe,
  Database,
  Search
} from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { IInquiry } from "@/models/Inquiry";
import { IApplication } from "@/models/Application";
function AdminDashboardContent() {
  const [inquiries, setInquiries] = useState<IInquiry[]>([]);
  const [applications, setApplications] = useState<IApplication[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const searchParams = useSearchParams();
  const urlSearch = searchParams.get('search') || '';

  useEffect(() => {
    if (urlSearch) {
      setSearchQuery(urlSearch);
    } else {
      setSearchQuery('');
    }
  }, [urlSearch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = getApiUrl();
        const [inquiriesRes, applicationsRes, categoriesRes] = await Promise.all([
          fetch(`${apiUrl}/api/inquiries`),
          fetch(`${apiUrl}/api/applications`),
          fetch(`${apiUrl}/api/categories`)
        ]);

        if (!inquiriesRes.ok || !applicationsRes.ok || !categoriesRes.ok) throw new Error('Failed to fetch data');

        const inquiriesData = await inquiriesRes.json();
        const applicationsData = await applicationsRes.json();
        const categoriesData = await categoriesRes.json();

        setInquiries(inquiriesData);
        setApplications(applicationsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalServices = categories.reduce((acc, cat) => acc + (cat.capabilities?.length || 0), 0);

  const filteredInquiries = inquiries.filter(inq => 
    inq.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    inq.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
    inq.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inq.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredApplications = applications.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    app.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
    app.roleTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { 
      label: "Total Inquiries", 
      value: filteredInquiries.length.toString(), 
      change: "+12.5%", 
      trend: "up", 
      icon: MessageSquare,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    { 
      label: "Active Services", 
      value: totalServices.toString(), 
      change: "+2 new", 
      trend: "up", 
      icon: Layers,
      color: "text-[#4F46E5]",
      bg: "bg-[#4F46E5]/5"
    },
    { 
      label: "Talent Pipeline", 
      value: filteredApplications.length.toString(), 
      change: "+3 new", 
      trend: "up", 
      icon: Users,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    { 
      label: "System Health", 
      value: "98%", 
      change: "Stable", 
      trend: "neutral", 
      icon: Zap,
      color: "text-amber-600",
      bg: "bg-amber-50"
    }
  ];

  if (loading) return <div className="p-8">Loading Dashboard...</div>;
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">System Overview</h1>
        <p className="text-gray-500 font-medium">Welcome back, Admin. Here is what is happening across your platforms today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm flex flex-col gap-6"
          >
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                stat.trend === 'up' ? "text-emerald-600 bg-emerald-50" : 
                stat.trend === 'down' ? "text-rose-600 bg-rose-50" : 
                "text-gray-500 bg-gray-50"
              }`}>
                {stat.trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
                {stat.trend === 'down' && <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-4xl font-black text-gray-900 mt-1">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Inquiries Table */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white rounded-[32px] border border-black/5 shadow-sm overflow-hidden"
        >
          <div className="p-8 border-b border-black/5 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Recent Customer Inquiries</h3>
            <button className="text-[#4F46E5] text-sm font-bold flex items-center gap-1 hover:underline">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Customer</th>
                  <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Service Interest</th>
                  <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                  <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {filteredInquiries
                  .slice(0, 5)
                  .map((inquiry) => (
                  <tr key={inquiry._id.toString()} className="hover:bg-gray-50/50 transition-colors cursor-pointer group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs uppercase">
                          {inquiry.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 group-hover:text-[#4F46E5] transition-colors">{inquiry.name}</p>
                          <p className="text-xs text-gray-400 italic font-medium">{inquiry.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-bold text-gray-700">{inquiry.service}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${
                        inquiry.status === 'High Priority' ? "bg-rose-50 text-rose-600" :
                        inquiry.status === 'New' ? "bg-[#4F46E5]/10 text-[#4F46E5]" :
                        "bg-emerald-50 text-emerald-600"
                      }`}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* System Health / Status */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4F46E5]/20 blur-3xl rounded-full" />
            <h3 className="text-xl font-bold mb-6 relative z-10 font-display">Optimization Score</h3>
            <div className="flex items-end gap-2 mb-8 relative z-10">
              <span className="text-6xl font-black">94</span>
              <span className="text-2xl font-bold text-[#4F46E5] mb-1.5 font-display">/100</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">Your platform performance is optimal. SEO health is excellent across all service categories.</p>
            <div className="space-y-4">
              {[
                { label: "Page Load Speed", value: 98, color: "bg-[#4F46E5]" },
                { label: "Mobile Optimization", value: 92, color: "bg-blue-500" },
                { label: "SEO Score", value: 94, color: "bg-emerald-500" },
              ].map((item, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                      className={`h-full ${item.color}`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[32px] border border-black/5 p-8 shadow-sm">
             <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Add Service", icon: Layers, color: "text-[#4F46E5]", bg: "bg-[#4F46E5]/5", href: "/admin/services?add=true" },
                  { label: "New Product", icon: Zap, color: "text-blue-600", bg: "bg-blue-50", href: "/admin/products?add=true" },
                  { label: "Global SEO", icon: Globe, color: "text-emerald-600", bg: "bg-emerald-50", href: "/admin/seo" },
                  { label: "Logs", icon: Database, color: "text-slate-600", bg: "bg-slate-50", href: "/admin/logs" }
                ].map((action, i) => (
                  <Link key={i} href={action.href} className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-gray-50 border border-transparent hover:border-black/5 transition-all group">
                    <div className={`w-12 h-12 ${action.bg} ${action.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-gray-700">{action.label}</span>
                  </Link>
                ))}
              </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading Dashboard...</div>}>
      <AdminDashboardContent />
    </Suspense>
  );
}
