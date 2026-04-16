'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from "motion/react";
import { getApiUrl } from '@/lib/api';
import { 
  Plus, 
  Search, 
  Layers, 
  ChevronRight, 
  Eye, 
  TrendingUp,
  Box,
  LayoutGrid,
  X,
  CheckCircle2,
  BarChart3,
  Activity,
  Trash2,
  Edit3,
  Zap,
  Briefcase,
  Settings
} from "lucide-react";

interface Capability {
  _id?: string;
  name: string;
  icon: string;
  slug: string;
  description: string;
}

interface Category {
  _id?: string;
  id: string;
  name: string;
  slug: string;
  icon: string;
  overview: string;
  capabilities: Capability[];
  outcomes?: string[];
}

function AdminProductsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showUsageModal, setShowUsageModal] = useState(false);
  const [showServicesModal, setShowServicesModal] = useState(false);
  const [showGlobalAddServiceModal, setShowGlobalAddServiceModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  
  const [newCategory, setNewCategory] = useState({
    name: "",
    overview: "",
    icon: "LayoutGrid"
  });

  const [newService, setNewService] = useState({
    name: "",
    description: "",
    icon: "Zap",
    categoryId: "" // Used for global add
  });

  const fetchCategories = async () => {
    try {
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/api/categories`);
      if (response.ok) {
        const data = await response.json();
        setCategoriesList(data);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (searchParams.get('add') === 'true') {
      setShowAddModal(true);
      const params = new URLSearchParams(searchParams.toString());
      params.delete('add');
      router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ''}`);
    }
  }, [searchParams, router, pathname]);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/api/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory),
      });
      if (response.ok) {
        fetchCategories();
        setShowAddModal(false);
        setNewCategory({ name: "", overview: "", icon: "LayoutGrid" });
      }
    } catch (error) {
      console.error('Failed to add category:', error);
    }
  };

  const handleUpdateCategory = async (e?: React.FormEvent, updatedCat?: Category) => {
    if (e) e.preventDefault();
    const categoryToUpdate = updatedCat || selectedCategory;
    if (!categoryToUpdate || !categoryToUpdate._id) return;
    
    try {
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/api/categories/${categoryToUpdate._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryToUpdate),
      });
      if (response.ok) {
        fetchCategories();
        if (!updatedCat) setShowEditModal(false);
      }
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/api/categories/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchCategories();
      }
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  const handleAddService = async (e: React.FormEvent, targetCategoryId?: string) => {
    e.preventDefault();
    const catId = targetCategoryId || newService.categoryId;
    const category = categoriesList.find(c => c._id === catId);
    
    if (!category || !category._id) {
      alert("Please select a valid product (category).");
      return;
    }

    const capability: Capability = {
      name: newService.name,
      description: newService.description,
      icon: newService.icon,
      slug: newService.name.toLowerCase().replace(/\s+/g, '-')
    };

    const updatedCategory = {
      ...category,
      capabilities: [...(category.capabilities || []), capability]
    };

    try {
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/api/categories/${category._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCategory),
      });
      if (response.ok) {
        fetchCategories();
        setShowGlobalAddServiceModal(false);
        setShowServicesModal(false);
        setNewService({ name: "", description: "", icon: "Zap", categoryId: "" });
      }
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  const handleDeleteService = async (serviceName: string) => {
    if (!selectedCategory || !selectedCategory._id) return;
    
    const updatedCategory = {
      ...selectedCategory,
      capabilities: selectedCategory.capabilities.filter(s => s.name !== serviceName)
    };

    setSelectedCategory(updatedCategory);
    await handleUpdateCategory(undefined, updatedCategory);
  };

  if (loading) return <div className="p-8">Loading Platform Systems...</div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Platform Systems</h1>
          <p className="text-gray-500 font-medium tracking-tight">Configure and manage your core system categories and their content.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              setNewService({ ...newService, categoryId: categoriesList[0]?._id || "" });
              setShowGlobalAddServiceModal(true);
            }}
            className="flex items-center gap-2 px-6 py-4 bg-white border border-black/5 rounded-2xl text-sm font-black text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
          >
            <Plus className="w-5 h-5 text-[#4F46E5]" />
            Add New Service
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl text-sm font-black hover:bg-black transition-all shadow-xl"
          >
            <LayoutGrid className="w-5 h-5 text-[#4F46E5]" />
            New Category
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Systems", value: categoriesList.length, icon: Layers, color: "text-[#4F46E5]", bg: "bg-[#4F46E5]/5" },
          { label: "Total Services", value: categoriesList.reduce((acc, cat) => acc + (cat.capabilities?.length || 0), 0), icon: Zap, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Platform Health", value: "99.9%", icon: Activity, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border border-black/5 shadow-sm flex items-center gap-6">
             <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                <stat.icon className="w-7 h-7" />
             </div>
             <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-gray-900">{stat.value}</p>
             </div>
          </div>
        ))}
      </div>

      {/* Categories Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {categoriesList.map((category, i) => (
          <motion.div
            key={category._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="group bg-white rounded-[40px] border border-black/5 shadow-sm hover:shadow-xl transition-all p-2"
          >
            <div className="bg-gray-50/50 rounded-[34px] p-8 h-full flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 bg-white rounded-2xl border border-black/5 flex items-center justify-center text-[#4F46E5] group-hover:bg-[#4F46E5] group-hover:text-white transition-all shadow-sm">
                   <LayoutGrid className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Active
                  </div>
                  <button 
                    onClick={() => handleDeleteCategory(category._id!)}
                    className="p-2 text-gray-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-8 text-left">
                <h3 className="text-xl font-black text-gray-900 group-hover:text-[#4F46E5] transition-colors line-clamp-1">{category.name}</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed line-clamp-2">{category.overview}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-8">
                <button 
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowServicesModal(true);
                  }}
                  className="bg-white/50 rounded-xl p-3 border border-black/5 hover:border-[#4F46E5] transition-colors text-left"
                >
                   <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Services</p>
                   <div className="flex items-center justify-between">
                     <p className="text-sm font-bold text-gray-900">{category.capabilities?.length || 0}</p>
                     <Settings className="w-3 h-3 text-[#4F46E5]" />
                   </div>
                </button>
                <div className="bg-white/50 rounded-xl p-3 border border-black/5">
                   <p className="text-[10px] font-black uppercase text-gray-400 mb-1 text-left">Outcomes</p>
                   <p className="text-sm font-bold text-gray-900 text-left">{category.outcomes?.length || 0}</p>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between pt-6 border-t border-black/5">
                 <button 
                   onClick={() => {
                     setSelectedCategory(category);
                     setShowEditModal(true);
                   }}
                   className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-2"
                 >
                   <Edit3 className="w-4 h-4" />
                   Edit Details
                 </button>
                 <button 
                   onClick={() => {
                     setSelectedCategory(category);
                     setShowUsageModal(true);
                   }}
                   className="flex items-center gap-2 text-sm font-black text-[#4F46E5] group/btn"
                 >
                    View Usage
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                 </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Global Add Service Modal (with Category selection) */}
      <AnimatePresence>
        {showGlobalAddServiceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowGlobalAddServiceModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden">
              <div className="p-10">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-gray-900">Add New Service</h2>
                  <button onClick={() => setShowGlobalAddServiceModal(false)} className="p-2 text-gray-400 hover:text-gray-900 transition-colors"><X className="w-6 h-6" /></button>
                </div>

                <form onSubmit={(e) => handleAddService(e)} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Target Product (Category)</label>
                    <select 
                      required
                      value={newService.categoryId}
                      onChange={(e) => setNewService({...newService, categoryId: e.target.value})}
                      className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:border-[#4F46E5] transition-all appearance-none"
                    >
                      {categoriesList.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Service Name</label>
                    <input required type="text" value={newService.name} onChange={(e) => setNewService({...newService, name: e.target.value})} placeholder="e.g., Inventory Tracking" className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:border-[#4F46E5] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Description</label>
                    <input required type="text" value={newService.description} onChange={(e) => setNewService({...newService, description: e.target.value})} placeholder="Brief value proposition..." className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-medium text-gray-600 focus:outline-none focus:border-[#4F46E5] transition-all" />
                  </div>
                  <button type="submit" className="w-full py-5 bg-[#4F46E5] text-white rounded-2xl text-sm font-black hover:bg-[#EA580C] transition-all shadow-xl flex items-center justify-center gap-2">
                    <Plus className="w-5 h-5" />
                    Publish Service
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add New Category Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden">
              <div className="p-10">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-gray-900">New Category</h2>
                  <button onClick={() => setShowAddModal(false)} className="p-2 text-gray-400 hover:text-gray-900 transition-colors"><X className="w-6 h-6" /></button>
                </div>

                <form onSubmit={handleAddCategory} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Category Name</label>
                    <input required type="text" value={newCategory.name} onChange={(e) => setNewCategory({...newCategory, name: e.target.value})} placeholder="e.g., Supply Chain Systems" className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:border-[#4F46E5] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Overview</label>
                    <textarea required rows={4} value={newCategory.overview} onChange={(e) => setNewCategory({...newCategory, overview: e.target.value})} placeholder="Describe the focus of this system category..." className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-medium text-gray-600 focus:outline-none focus:border-[#4F46E5] transition-all resize-none" />
                  </div>
                  <button type="submit" className="w-full py-5 bg-slate-900 text-white rounded-2xl text-sm font-black hover:bg-black transition-all shadow-xl flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#4F46E5]" />
                    Create Category
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Manage Services Modal (per category) */}
      <AnimatePresence>
        {showServicesModal && selectedCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowServicesModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden">
              <div className="p-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">Manage Services</h2>
                    <p className="text-sm font-bold text-gray-400">{selectedCategory.name}</p>
                  </div>
                  <button onClick={() => setShowServicesModal(false)} className="p-2 text-gray-400 hover:text-gray-900 transition-colors"><X className="w-6 h-6" /></button>
                </div>

                {/* Add New Service Form */}
                <form onSubmit={(e) => handleAddService(e, selectedCategory._id)} className="bg-gray-50 p-6 rounded-3xl border border-black/5 mb-8 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Service Name</label>
                      <input required type="text" value={newService.name} onChange={(e) => setNewService({...newService, name: e.target.value})} placeholder="e.g., Inventory Tracking" className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-[#4F46E5]" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Description Hint</label>
                      <input required type="text" value={newService.description} onChange={(e) => setNewService({...newService, description: e.target.value})} placeholder="Brief value proposition..." className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 focus:outline-none focus:border-[#4F46E5]" />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-3 bg-[#4F46E5] text-white rounded-xl text-sm font-black hover:bg-[#EA580C] transition-all flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Service to {selectedCategory.name}
                  </button>
                </form>

                {/* Services List */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-2">Current Services</h3>
                  {selectedCategory.capabilities?.length > 0 ? (
                    selectedCategory.capabilities.map((service, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-white p-4 rounded-2xl border border-black/5 hover:border-black/10 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#4F46E5]">
                            <Zap className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{service.name}</p>
                            <p className="text-[10px] font-medium text-gray-400 line-clamp-1">{service.description}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleDeleteService(service.name)}
                          className="p-2 text-gray-400 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                      <p className="text-sm font-medium text-gray-400">No services added to this category yet.</p>
                    </div>
                  )}
                </div>

                <button onClick={() => setShowServicesModal(false)} className="w-full py-5 mt-8 bg-gray-900 text-white rounded-2xl text-sm font-black hover:bg-black transition-all">
                  Done Managing Services
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Category Modal */}
      <AnimatePresence>
        {showEditModal && selectedCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowEditModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden">
              <div className="p-10">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-gray-900">Edit Category</h2>
                  <button onClick={() => setShowEditModal(false)} className="p-2 text-gray-400 hover:text-gray-900 transition-colors"><X className="w-6 h-6" /></button>
                </div>

                <form onSubmit={(e) => handleUpdateCategory(e)} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Category Name</label>
                    <input required type="text" value={selectedCategory.name} onChange={(e) => setSelectedCategory({...selectedCategory, name: e.target.value})} className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:border-[#4F46E5] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Overview</label>
                    <textarea required rows={4} value={selectedCategory.overview} onChange={(e) => setSelectedCategory({...selectedCategory, overview: e.target.value})} className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-medium text-gray-600 focus:outline-none focus:border-[#4F46E5] transition-all resize-none" />
                  </div>
                  <button type="submit" className="w-full py-5 bg-[#4F46E5] text-white rounded-2xl text-sm font-black hover:bg-[#EA580C] transition-all shadow-xl flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Save Changes
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Usage Modal */}
      <AnimatePresence>
        {showUsageModal && selectedCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowUsageModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden">
              <div className="p-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">Usage Analytics</h2>
                    <p className="text-sm font-bold text-gray-400">{selectedCategory.name}</p>
                  </div>
                  <button onClick={() => setShowUsageModal(false)} className="p-2 text-gray-400 hover:text-gray-900 transition-colors"><X className="w-6 h-6" /></button>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                   <div className="bg-slate-50 p-6 rounded-3xl border border-black/5">
                      <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Weekly Views</p>
                      <p className="text-2xl font-black text-gray-900">1,284</p>
                      <p className="text-[10px] font-bold text-emerald-600">+12.4% vs last week</p>
                   </div>
                   <div className="bg-slate-50 p-6 rounded-3xl border border-black/5">
                      <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Inquiry Rate</p>
                      <p className="text-2xl font-black text-gray-900">4.2%</p>
                      <p className="text-[10px] font-bold text-emerald-600">+0.8% focus</p>
                   </div>
                   <div className="bg-slate-50 p-6 rounded-3xl border border-black/5">
                      <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Avg. Retention</p>
                      <p className="text-2xl font-black text-gray-900">84s</p>
                      <p className="text-[10px] font-bold text-rose-600">-2s drop</p>
                   </div>
                </div>

                <div className="bg-gray-50 p-8 rounded-[32px] border border-black/5 mb-8">
                   <div className="flex items-center justify-between mb-6">
                      <h3 className="text-sm font-black uppercase text-gray-900 tracking-widest">Traffic Trend</h3>
                      <BarChart3 className="w-5 h-5 text-gray-400" />
                   </div>
                   <div className="h-40 flex items-end gap-2 px-2">
                      {[40, 60, 45, 80, 55, 90, 75].map((h, i) => (
                        <div key={i} className="flex-1 bg-slate-200 rounded-lg group/bar relative">
                           <motion.div 
                             initial={{ height: 0 }} 
                             animate={{ height: `${h}%` }} 
                             className="absolute bottom-0 inset-x-0 bg-[#4F46E5] rounded-lg group-hover/bar:bg-indigo-700 transition-all" 
                           />
                        </div>
                      ))}
                   </div>
                   <div className="flex justify-between mt-4 text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
                      <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                   </div>
                </div>

                <button onClick={() => setShowUsageModal(false)} className="w-full py-5 bg-gray-900 text-white rounded-2xl text-sm font-black hover:bg-black transition-all">
                  Close Dashboard
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AdminProductsPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading Products...</div>}>
      <AdminProductsContent />
    </Suspense>
  );
}
