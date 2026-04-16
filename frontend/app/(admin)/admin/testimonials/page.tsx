'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Star,
  Quote,
  X,
  CheckCircle2,
  Clock,
  User
} from "lucide-react";
import { getApiUrl } from "@/lib/api";

function AdminTestimonialsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
    rating: 5,
    isVisible: true
  });

  const fetchData = async () => {
    setIsLoading(true);
    const apiUrl = getApiUrl();
    try {
      const res = await fetch(`${apiUrl}/api/testimonials`);
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data);
      }
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiUrl = getApiUrl();
    try {
      const method = editingTestimonial ? 'PUT' : 'POST';
      const url = editingTestimonial 
        ? `${apiUrl}/api/testimonials/${editingTestimonial._id}`
        : `${apiUrl}/api/testimonials`;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        await fetchData();
        setShowAddModal(false);
        setEditingTestimonial(null);
        setFormData({ name: "", role: "", content: "", rating: 5, isVisible: true });
      } else {
        alert("Failed to save testimonial.");
      }
    } catch (error) {
      console.error("Failed to save testimonial:", error);
      alert("Error connecting to server.");
    }
  };

  const startEdit = (t: any) => {
    setEditingTestimonial(t);
    setFormData({
      name: t.name,
      role: t.role,
      content: t.content,
      rating: t.rating,
      isVisible: t.isVisible !== undefined ? t.isVisible : true
    });
    setShowAddModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    const apiUrl = getApiUrl();
    try {
      const res = await fetch(`${apiUrl}/api/testimonials/${id}`, { method: 'DELETE' });
      if (res.ok) await fetchData();
      else alert("Failed to delete.");
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
    }
  };

  const filtered = testimonials.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Testimonials Management</h1>
          <p className="text-gray-500 font-medium">Manage client success stories and visionary leadership reviews.</p>
        </div>
        <button 
          onClick={() => {
            setEditingTestimonial(null);
            setFormData({ name: "", role: "", content: "", rating: 5, isVisible: true });
            setShowAddModal(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-[#4F46E5] text-white rounded-xl text-sm font-bold hover:bg-[#EA580C] transition-all shadow-lg shadow-[#4F46E5]/20"
        >
          <Plus className="w-4 h-4" />
          Add New Review
        </button>
      </div>

      <div className="bg-white p-6 rounded-[32px] border border-black/5 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search testimonials by name, role, or content..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-black/5 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-[#4F46E5] transition-colors"
          />
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-black/5 shadow-sm overflow-hidden min-h-[400px]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Author</th>
                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Review Content</th>
                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Rating</th>
                <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              <AnimatePresence mode='popLayout'>
                {filtered.map((t) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={t._id} 
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#4F46E5]/10 text-[#4F46E5] flex items-center justify-center font-bold text-xs">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">{t.name}</div>
                          <div className="text-xs text-gray-500">{t.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 max-w-md">
                      <p className="text-sm text-gray-600 line-clamp-2 italic font-medium">"{t.content}"</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < t.rating ? "fill-[#4F46E5] text-[#4F46E5]" : "text-gray-200"}`} />
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => startEdit(t)}
                          className="p-2.5 text-gray-400 hover:text-[#4F46E5] hover:bg-[#4F46E5]/5 rounded-xl transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(t._id)}
                          className="p-2.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
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
          {filtered.length === 0 && !isLoading && (
            <div className="py-24 text-center">
              <Quote className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No testimonials found. Start by adding one!</p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 md:p-12">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-gray-900">{editingTestimonial ? "Edit Review" : "Add Review"}</h2>
                  <button onClick={() => setShowAddModal(false)} className="p-2 text-gray-400 hover:text-gray-900"><X className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Author Name</label>
                        <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold" placeholder="e.g. John Doe" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Role / Company</label>
                        <input required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold" placeholder="e.g. CEO at TechCorp" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Rating (1-5)</label>
                      <select value={formData.rating} onChange={e => setFormData({...formData, rating: Number(e.target.value)})} className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold appearance-none">
                        {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Review Content</label>
                      <textarea required rows={4} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-medium leading-relaxed resize-none" placeholder="Enter the client's words..." />
                    </div>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl text-sm font-black">Cancel</button>
                    <button type="submit" className="flex-1 py-4 bg-[#4F46E5] text-white rounded-2xl text-sm font-black shadow-xl shadow-[#4F46E5]/20 flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      {editingTestimonial ? "Save Changes" : "Publish Review"}
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

export default function AdminTestimonialsPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading Management Suite...</div>}>
      <AdminTestimonialsContent />
    </Suspense>
  );
}
