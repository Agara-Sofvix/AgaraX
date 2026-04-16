'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { 
  Globe, 
  Search, 
  Edit2, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  ChevronRight,
  Layout,
  ExternalLink,
  Save,
  X,
  Users,
  Layers,
  Zap,
  Briefcase
} from "lucide-react";
import { PAGE_SEO } from "@/lib/seo/pageMapping";

export default function AdminSEOPage() {
  const [pages, setPages] = useState(
    Object.entries(PAGE_SEO).map(([id, data]) => ({
      id,
      title: data.title,
      description: data.description,
      path: data.openGraph?.url || (id === 'home' ? '/' : `/${id}`),
      status: 'optimized' as 'optimized' | 'needs-update' | 'missing',
      lastModified: 'Oct 24, 2023'
    }))
  );

  const [editingPage, setEditingPage] = useState<any>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [auditPage, setAuditPage] = useState<any>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getPageIcon = (id: string) => {
    switch (id) {
      case 'home': return <Layout className="w-5 h-5" />;
      case 'about': return <Users className="w-5 h-5" />;
      case 'services': return <Layers className="w-5 h-5" />;
      case 'products': return <Zap className="w-5 h-5" />;
      case 'careers': return <Briefcase className="w-5 h-5" />;
      case 'get-started': return <ExternalLink className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setPages(pages.map(p => p.id === editingPage.id ? editingPage : p));
    setEditingPage(null);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-black/5">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Global SEO Control</h1>
          <p className="text-gray-500 font-medium max-w-xl">Centralized metadata management for search engine visibility and social media appearance across all core platform pages.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="bg-emerald-50 text-emerald-600 px-6 py-3 rounded-2xl border border-emerald-100 flex items-center gap-3 shadow-sm scale-95 origin-right">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest">Health Index: 94%</span>
           </div>
        </div>
      </div>

      {/* Pages List */}
      <div className="grid gap-6">
        {pages.map((page, i) => (
          <motion.div
            key={page.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group bg-white rounded-[40px] border border-black/5 shadow-sm hover:shadow-xl hover:border-[#4F46E5]/20 transition-all p-8 relative overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 -mr-16 -mt-16 rounded-full group-hover:bg-[#4F46E5]/5 transition-colors" />

            <div className="flex flex-col xl:flex-row gap-10 items-start xl:items-center relative z-10">
              {/* Icon & Page ID */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="w-14 h-14 bg-gray-50 border border-black/5 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-[#4F46E5] group-hover:text-white group-hover:border-[#4F46E5] transition-all duration-300">
                   {getPageIcon(page.id)}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Page ID</p>
                  <p className="text-lg font-black text-gray-900">{page.id}</p>
                </div>
              </div>

              {/* SERP Preview (Google Style) */}
              <div className="flex-grow min-w-0 max-w-2xl bg-gray-50/50 p-6 rounded-3xl border border-black/5 space-y-1 group-hover:bg-white transition-colors">
                 <div className="flex items-center gap-2 mb-1">
                    <div className="w-4 h-4 bg-white rounded-full border border-black/5 flex items-center justify-center">
                       <Globe className="w-2 h-2 text-gray-400" />
                    </div>
                    <span className="text-[11px] text-gray-600 truncate">{page.path}</span>
                 </div>
                 <h3 className="text-xl font-bold text-[#1a0dab] group-hover:underline cursor-pointer transition-all line-clamp-1">{page.title}</h3>
                 <p className="text-sm text-gray-600 leading-relaxed font-normal line-clamp-2">{page.description}</p>
              </div>

              {/* Status & Actions */}
              <div className="flex xl:flex-col items-center xl:items-end gap-6 xl:gap-2 ml-auto shrink-0 w-full xl:w-auto pt-6 xl:pt-0 border-t xl:border-0 border-black/5">
                <div className="flex items-center gap-2">
                   <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${
                     page.status === 'optimized' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-amber-50 text-amber-600 border border-amber-100"
                   }`}>
                     {page.status}
                   </span>
                </div>
                <div className="flex items-center gap-3">
                   <button 
                     onClick={() => setEditingPage(page)}
                     className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl text-sm font-black hover:bg-black transition-all shadow-xl hover:-translate-y-0.5"
                   >
                     <Edit2 className="w-4 h-4" />
                     Manage Meta
                   </button>
                    <div className="relative">
                      <button 
                        onClick={() => setActiveDropdown(activeDropdown === page.id ? null : page.id)}
                        className={`p-4 bg-white border border-black/5 rounded-2xl text-gray-400 hover:text-gray-900 transition-all hover:bg-gray-50 ${activeDropdown === page.id ? 'border-[#4F46E5] text-[#4F46E5]' : ''}`}
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      
                      {activeDropdown === page.id && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)} />
                          <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-2xl shadow-2xl border border-black/5 p-2 z-50 overflow-hidden">
                             <button 
                               onClick={() => {
                                 window.open(page.path, '_blank');
                                 setActiveDropdown(null);
                               }}
                               className="w-full text-left px-4 py-2.5 hover:bg-gray-50 rounded-xl text-xs font-bold text-gray-700 flex items-center gap-2 group transition-colors"
                             >
                               <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-900" />
                               View Live Page
                             </button>
                             <button 
                               onClick={() => {
                                 navigator.clipboard.writeText(page.title);
                                 setCopiedId(page.id);
                                 setTimeout(() => setCopiedId(null), 2000);
                                 setActiveDropdown(null);
                               }}
                               className="w-full text-left px-4 py-2.5 hover:bg-gray-50 rounded-xl text-xs font-bold text-gray-700 flex items-center gap-2 group transition-colors"
                             >
                               <CheckCircle2 className={`w-3.5 h-3.5 transition-colors ${copiedId === page.id ? 'text-emerald-500' : 'text-gray-400 group-hover:text-gray-900'}`} />
                               {copiedId === page.id ? 'Copied!' : 'Copy Meta Title'}
                             </button>
                             <div className="my-1 border-t border-black/5" />
                             <button 
                               onClick={() => {
                                 setAuditPage(page);
                                 setActiveDropdown(null);
                               }}
                               className="w-full text-left px-4 py-2.5 hover:bg-rose-50 rounded-xl text-xs font-bold text-rose-500 flex items-center gap-2 group transition-colors"
                             >
                               <AlertCircle className="w-3.5 h-3.5 opacity-50" />
                               Run SEO Audit
                             </button>
                          </div>
                        </>
                      )}
                    </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingPage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingPage(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden">
              <div className="p-8 md:p-12">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-gray-900">Edit Page SEO</h2>
                  <button onClick={() => setEditingPage(null)} className="p-2 text-gray-400 hover:text-gray-900 transition-colors"><X className="w-6 h-6" /></button>
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Meta Title</label>
                    <input required type="text" value={editingPage.title} onChange={(e) => setEditingPage({...editingPage, title: e.target.value})} className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:border-[#4F46E5]" />
                    <p className="text-[10px] text-gray-400 font-medium px-1">Character count: {editingPage.title.length} (Recommended: 50-60)</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Meta Description</label>
                    <textarea required rows={4} value={editingPage.description} onChange={(e) => setEditingPage({...editingPage, description: e.target.value})} className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-medium text-gray-600 focus:outline-none focus:border-[#4F46E5] resize-none" />
                    <p className="text-[10px] text-gray-400 font-medium px-1">Character count: {editingPage.description.length} (Recommended: 120-158)</p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setEditingPage(null)} className="flex-1 px-8 py-4 bg-gray-100 text-gray-500 rounded-2xl text-sm font-black hover:bg-gray-200 transition-all">Cancel</button>
                    <button type="submit" className="flex-1 px-8 py-4 bg-[#4F46E5] text-white rounded-2xl text-sm font-black hover:bg-[#EA580C] transition-all shadow-xl flex items-center justify-center gap-2">
                      <Save className="w-5 h-5" />
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Audit Modal */}
      <AnimatePresence>
        {auditPage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setAuditPage(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden">
              <div className="p-8 md:p-12">
                 <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-black text-gray-900 leading-none mb-2">SEO Audit Detail</h2>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#4F46E5]">Page: {auditPage.id}</p>
                    </div>
                    <button onClick={() => setAuditPage(null)} className="p-2 text-gray-400 hover:text-gray-900 transition-colors"><X className="w-6 h-6" /></button>
                 </div>

                 <div className="space-y-8">
                    <div className="bg-gray-50 rounded-3xl p-6 border border-black/5">
                       <div className="flex items-end justify-between mb-4">
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Optimization Score</span>
                          <span className="text-4xl font-black text-emerald-600">92/100</span>
                       </div>
                       <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 w-[92%]" />
                       </div>
                    </div>

                    <div className="space-y-4">
                       <div className="flex items-center justify-between p-4 bg-white border border-black/5 rounded-2xl">
                          <div className="flex items-center gap-3">
                             {auditPage.title.length >= 50 && auditPage.title.length <= 60 ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-amber-500" />}
                             <span className="text-xs font-bold text-gray-700">Title Length ({auditPage.title.length})</span>
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Perfect</span>
                       </div>
                       <div className="flex items-center justify-between p-4 bg-white border border-black/5 rounded-2xl">
                          <div className="flex items-center gap-3">
                             {auditPage.description.length >= 120 && auditPage.description.length <= 158 ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-emerald-500" />}
                             <span className="text-xs font-bold text-gray-700">Description Length ({auditPage.description.length})</span>
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Optimized</span>
                       </div>
                       <div className="flex items-center justify-between p-4 bg-white border border-black/5 rounded-2xl">
                          <div className="flex items-center gap-3">
                             <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                             <span className="text-xs font-bold text-gray-700">Mobile Compatibility</span>
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Ready</span>
                       </div>
                    </div>

                    <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100">
                       <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-2">Recommendation</p>
                       <p className="text-xs font-medium text-amber-900 leading-relaxed">Consider adding more high-intent keywords like "Enterprise Solutions" or "Custom Software" to the {auditPage.id} page description to improve CTR by ~15%.</p>
                    </div>
                 </div>

                 <button 
                   onClick={() => setAuditPage(null)}
                   className="w-full mt-8 px-8 py-4 bg-slate-900 text-white rounded-2xl text-sm font-black hover:bg-black transition-all shadow-xl"
                 >
                   Fulfill Recommendations
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
