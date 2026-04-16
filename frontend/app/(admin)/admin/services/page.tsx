'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  ChevronRight,
  Download,
  Layers,
  Zap,
  Clock,
  X,
  CheckCircle2
} from "lucide-react";
import { getApiUrl } from "@/lib/api";

function AdminServicesContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState<any[]>([]);
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    category: "",
    description: "",
    features: ["", "", ""],
    whoNeeds: "",
    benefits: ["", "", ""],
    problemsSolved: ["", "", ""],
    useCases: ["", "", ""],
    faqs: [{ q: "", a: "" }],
    heroImage: ""
  });

  const [editingService, setEditingService] = useState<any>(null);

  const fetchData = async () => {
    setIsLoading(true);
    const apiUrl = getApiUrl();
    try {
      const res = await fetch(`${apiUrl}/api/categories`);
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
        // Flatten all capabilities into a single services list
        const allServices = data.flatMap((cat: any) => 
          cat.capabilities.map((cap: any) => ({
            ...cap,
            categoryId: cat.id || cat._id,
            categoryName: cat.name,
            categorySlug: cat.slug
          }))
        );
        setServicesList(allServices);
        if (data.length > 0) {
          setNewService(prev => ({ ...prev, category: prev.category || data[0].id || data[0]._id }));
        }
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchParams.get('add') === 'true') {
      setShowAddModal(true);
      const params = new URLSearchParams(searchParams.toString());
      params.delete('add');
      router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ''}`);
    }
  }, [searchParams, router, pathname]);

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiUrl = getApiUrl();
    try {
      const method = editingService ? 'PUT' : 'POST';
      const url = editingService 
        ? `${apiUrl}/api/categories/${editingService.categoryId}/capabilities/${editingService.slug}`
        : `${apiUrl}/api/categories/${newService.category}/capabilities`;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newService.name,
          description: newService.description,
          features: newService.features.filter(f => f.trim() !== ""),
          whoNeeds: newService.whoNeeds,
          benefits: newService.benefits.filter(f => f.trim() !== ""),
          problemsSolved: newService.problemsSolved.filter(f => f.trim() !== ""),
          useCases: newService.useCases.filter(f => f.trim() !== ""),
          faqs: newService.faqs.filter(f => f.q.trim() !== "" && f.a.trim() !== ""),
          heroImage: newService.heroImage,
          icon: "Zap"
        })
      });

      if (res.ok) {
        await fetchData(); // Refresh list
        setShowAddModal(false);
        setEditingService(null);
        setNewService({
          name: "",
          category: categories[0]?.id || categories[0]?._id || "",
          description: "",
          features: ["", "", ""],
          whoNeeds: "",
          benefits: ["", "", ""],
          problemsSolved: ["", "", ""],
          useCases: ["", "", ""],
          faqs: [{ q: "", a: "" }],
          heroImage: ""
        });
      } else {
        const errorData = await res.json();
        alert(`Failed to save service: ${errorData.details || errorData.error}`);
      }
    } catch (error) {
      console.error("Failed to save service:", error);
      alert("Failed to connect to the server.");
    }
  };

  const startEdit = (service: any) => {
    setEditingService(service);
    setNewService({
      name: service.name,
      category: service.categoryId,
      description: service.description,
      features: service.features?.length > 0 ? service.features : ["", "", ""],
      whoNeeds: service.whoNeeds || "",
      benefits: service.benefits?.length > 0 ? (service.benefits.length < 3 ? [...service.benefits, ...Array(3-service.benefits.length).fill("")] : service.benefits) : ["", "", ""],
      problemsSolved: service.problemsSolved?.length > 0 ? (service.problemsSolved.length < 3 ? [...service.problemsSolved, ...Array(3-service.problemsSolved.length).fill("")] : service.problemsSolved) : ["", "", ""],
      useCases: service.useCases?.length > 0 ? (service.useCases.length < 3 ? [...service.useCases, ...Array(3-service.useCases.length).fill("")] : service.useCases) : ["", "", ""],
      faqs: service.faqs?.length > 0 ? service.faqs : [{ q: "", a: "" }],
      heroImage: service.heroImage || ""
    });
    setShowAddModal(true);
  };

  const handleDeleteService = async (categoryId: string, slug: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    const apiUrl = getApiUrl();
    try {
      const res = await fetch(`${apiUrl}/api/categories/${categoryId}/capabilities/${slug}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        await fetchData();
      } else {
        alert("Failed to delete service.");
      }
    } catch (error) {
      console.error("Failed to delete service:", error);
    }
  };


  const handleExportCSV = () => {
    console.log("Generating CSV for", servicesList.length, "services...");
    const headers = ["Name", "Category", "Description", "Features", "Benefits", "Use Cases", "Problems Solved"];
    const rows = servicesList.map(s => [
      `"${(s.name || '').replace(/"/g, '""')}"`,
      `"${(s.categoryName || '').replace(/"/g, '""')}"`,
      `"${(s.description || '').replace(/"/g, '""')}"`,
      `"${(s.features || []).join("; ").replace(/"/g, '""')}"`,
      `"${(s.benefits || []).join("; ").replace(/"/g, '""')}"`,
      `"${(s.useCases || []).join("; ").replace(/"/g, '""')}"`,
      `"${(s.problemsSolved || []).join("; ").replace(/"/g, '""')}"`
    ]);
    
    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `agara_services_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    console.log("Triggering download...");
    link.click();
    document.body.removeChild(link);
    console.log("CSV Export complete.");
  };

  const filteredServices = servicesList.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Services Management</h1>
          <p className="text-gray-500 font-medium">Manage your {servicesList.length} system offerings across {categories.length} categories.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-black/5 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#4F46E5] text-white rounded-xl text-sm font-bold hover:bg-[#EA580C] transition-all shadow-lg shadow-[#4F46E5]/20"
          >
            <Plus className="w-4 h-4" />
            Add New Service
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-6 rounded-[32px] border border-black/5 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search systems by name, description, or features..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-black/5 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-[#4F46E5] transition-colors"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-gray-50 border border-black/5 rounded-2xl pl-12 pr-8 py-3 text-sm focus:outline-none focus:border-[#4F46E5] transition-colors appearance-none font-bold text-gray-700"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id || cat._id} value={cat.id || cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Services List Table */}
      <div className="bg-white rounded-[40px] border border-black/5 shadow-sm overflow-hidden min-h-[500px]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">System Name</th>
                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Category</th>
                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Description</th>
                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Last Modified</th>
                <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              <AnimatePresence mode='popLayout'>
                {filteredServices.map((service, index) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={`${service.name}-${index}`} 
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#4F46E5]/5 text-[#4F46E5] flex items-center justify-center group-hover:bg-[#4F46E5] group-hover:text-white transition-all">
                          <Zap className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-bold text-gray-900">{service.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg border border-black/5">
                        {service.categoryName}
                      </span>
                    </td>
                    <td className="px-8 py-6 max-w-xs">
                      <p className="text-sm text-gray-500 line-clamp-1 font-medium italic">{service.description}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link 
                          href={`/services/${categories.find(c => (c.id || c._id) === service.categoryId)?.slug || service.categorySlug || service.categoryId}/${service.slug}`}
                          target="_blank"
                          className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                          title="View on Site"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => startEdit(service)}
                          className="p-2.5 text-gray-400 hover:text-[#4F46E5] hover:bg-[#4F46E5]/5 rounded-xl transition-all"
                          title="Edit Service"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteService(service.categoryId, service.slug)}
                          className="p-2.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                          title="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>

          {filteredServices.length === 0 && (
            <div className="py-24 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No systems found</h3>
              <p className="text-gray-500 font-medium">Try adjusting your search or category filter.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add New Service Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => { setShowAddModal(false); setEditingService(null); }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden border border-white/20"
            >
              <div className="p-8 md:p-12">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#4F46E5]/10 text-[#4F46E5] rounded-2xl flex items-center justify-center">
                      {editingService ? <Edit2 className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-gray-900">{editingService ? "Edit Service" : "Add New Service"}</h2>
                      <p className="text-gray-500 font-medium text-sm">{editingService ? "Refine your existing system orchestration." : "Expand your enterprise service portfolio."}</p>
                    </div>
                  </div>
                  <button onClick={() => { setShowAddModal(false); setEditingService(null); }} className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleAddService} className="space-y-6">
                  <div className="max-h-[60vh] overflow-y-auto pr-4 space-y-8 -mr-4 scrollbar-thin scrollbar-thumb-gray-200">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Service Name</label>
                        <input 
                          required
                          type="text" 
                          value={newService.name}
                          onChange={(e) => setNewService({...newService, name: e.target.value})}
                          placeholder="e.g. AI Customer Support Chatbot"
                          className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:border-[#4F46E5] transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Category</label>
                        <select 
                          required
                          value={newService.category}
                          onChange={(e) => setNewService({...newService, category: e.target.value})}
                          className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:border-[#4F46E5] transition-all appearance-none"
                        >
                          {categories.map(cat => (
                            <option key={cat.id || cat._id} value={cat.id || cat._id}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Hero Section Image (URL)</label>
                        <input 
                          type="text" 
                          value={newService.heroImage}
                          onChange={(e) => setNewService({...newService, heroImage: e.target.value})}
                          placeholder="e.g. /images/service-mockups/ai-chatbot.png"
                          className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:border-[#4F46E5] transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">System Description</label>
                      <textarea 
                        required
                        rows={3}
                        value={newService.description}
                        onChange={(e) => setNewService({...newService, description: e.target.value})}
                        placeholder="High-level overview of the system's purpose and primary value..."
                        className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-medium text-gray-600 focus:outline-none focus:border-[#4F46E5] transition-all resize-none"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Key Features (Selection)</label>
                        <button 
                          type="button"
                          onClick={() => setNewService({...newService, features: [...newService.features, ""]})}
                          className="text-[10px] font-black uppercase tracking-widest text-[#4F46E5] hover:text-[#EA580C]"
                        >
                          + Add Field
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {newService.features.map((feature, i) => (
                          <input 
                            key={i}
                            type="text" 
                            value={feature}
                            onChange={(e) => {
                              const f = [...newService.features];
                              f[i] = e.target.value;
                              setNewService({...newService, features: f});
                            }}
                            placeholder={`Feature ${i + 1}`}
                            className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 text-xs font-bold text-gray-700 outline-none focus:border-[#4F46E5]"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Advanced Strategic Details */}
                    <div className="pt-8 border-t border-black/5 space-y-8">
                      <div className="flex items-center gap-3">
                        <Layers className="w-5 h-5 text-[#4F46E5]" />
                        <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">Advanced Page Content</h3>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Who Needs This? (Target Audience)</label>
                        <input 
                          type="text" 
                          value={newService.whoNeeds}
                          onChange={(e) => setNewService({...newService, whoNeeds: e.target.value})}
                          placeholder="e.g. Scale-up enterprises looking to automate..."
                          className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-medium text-gray-700 focus:outline-none focus:border-[#4F46E5]"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Problems Solved</label>
                          <div className="space-y-2">
                            {newService.problemsSolved.map((p, i) => (
                              <input key={i} value={p} onChange={(e) => {
                                const arr = [...newService.problemsSolved];
                                arr[i] = e.target.value;
                                setNewService({...newService, problemsSolved: arr});
                              }} placeholder={`Internal Silos / Data Drift...`} className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 text-xs font-bold" />
                            ))}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Strategic Use Cases</label>
                          <div className="space-y-2">
                            {newService.useCases.map((u, i) => (
                              <input key={i} value={u} onChange={(e) => {
                                const arr = [...newService.useCases];
                                arr[i] = e.target.value;
                                setNewService({...newService, useCases: arr});
                              }} placeholder={`Support Automation...`} className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 text-xs font-bold" />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Core Strategic Advantages (Benefits)</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {newService.benefits.map((b, i) => (
                            <textarea 
                              key={i} 
                              value={b} 
                              onChange={(e) => {
                                const arr = [...newService.benefits];
                                arr[i] = e.target.value;
                                setNewService({...newService, benefits: arr});
                              }} 
                              placeholder={`Benefit ${i + 1}`} 
                              className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 text-[10px] font-bold h-24 resize-none" 
                            />
                          ))}
                        </div>
                      </div>

                      {/* FAQs Section */}
                      <div className="pt-8 border-t border-black/5 space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-[#4F46E5]" />
                            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">Frequently Asked Questions</h3>
                          </div>
                          <button 
                            type="button"
                            onClick={() => setNewService({...newService, faqs: [...newService.faqs, { q: "", a: "" }]})}
                            className="text-[10px] font-black uppercase tracking-widest text-[#4F46E5] hover:text-[#EA580C]"
                          >
                            + Add FAQ
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          {newService.faqs.map((faq, i) => (
                            <div key={i} className="p-6 bg-gray-50/50 rounded-[32px] border border-black/5 space-y-4 relative group/faq">
                              <button 
                                type="button"
                                onClick={() => {
                                  const newFaqs = newService.faqs.filter((_, idx) => idx !== i);
                                  setNewService({...newService, faqs: newFaqs.length > 0 ? newFaqs : [{ q: "", a: "" }]});
                                }}
                                className="absolute top-4 right-4 p-2 text-gray-300 hover:text-rose-500 opacity-0 group-hover/faq:opacity-100 transition-all"
                              >
                                <X className="w-4 h-4" />
                              </button>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Question {i + 1}</label>
                                <input 
                                  value={faq.q}
                                  onChange={(e) => {
                                    const newFaqs = [...newService.faqs];
                                    newFaqs[i].q = e.target.value;
                                    setNewService({...newService, faqs: newFaqs});
                                  }}
                                  placeholder="e.g. How long does implementation take?"
                                  className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 text-xs font-bold text-gray-900 focus:border-[#4F46E5] outline-none"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Answer {i + 1}</label>
                                <textarea 
                                  value={faq.a}
                                  onChange={(e) => {
                                    const newFaqs = [...newService.faqs];
                                    newFaqs[i].a = e.target.value;
                                    setNewService({...newService, faqs: newFaqs});
                                  }}
                                  rows={2}
                                  placeholder="Provide a concise, professional answer..."
                                  className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 text-xs font-medium text-gray-600 focus:border-[#4F46E5] outline-none resize-none"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button 
                      type="button"
                      onClick={() => { setShowAddModal(false); setEditingService(null); }}
                      className="flex-1 px-8 py-4 bg-gray-100 text-gray-500 rounded-2xl text-sm font-black hover:bg-gray-200 transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 px-8 py-4 bg-[#4F46E5] text-white rounded-2xl text-sm font-black hover:bg-[#EA580C] transition-all shadow-xl shadow-[#4F46E5]/20 flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      {editingService ? "Save Changes" : "Publish Service"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AdminServicesPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading Services...</div>}>
      <AdminServicesContent />
    </Suspense>
  );
}
