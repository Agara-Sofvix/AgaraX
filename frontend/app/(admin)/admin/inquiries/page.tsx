'use client';

import { getApiUrl } from '@/lib/api';

import { 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  MessageSquare, 
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Trash2
} from "lucide-react";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { IInquiry } from "@/models/Inquiry";

function AdminInquiriesContent() {
  const [inquiries, setInquiries] = useState<IInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const apiUrl = getApiUrl();
        const response = await fetch(`${apiUrl}/api/inquiries`);
        if (!response.ok) throw new Error('Failed to fetch inquiries');
        const data = await response.json();
        setInquiries(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  const searchParams = useSearchParams();
  const urlSearch = searchParams.get('search') || '';

  useEffect(() => {
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
  }, [urlSearch]);

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const apiUrl = getApiUrl();
      const res = await fetch(`${apiUrl}/api/inquiries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const updatedInquiry = await res.json();
        setInquiries(prev => prev.map(inq => inq._id.toString() === id ? updatedInquiry : inq));
      }
    } catch (error) {
      console.error('Failed to update status', error);
      alert('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    setUpdatingId(id);
    try {
      const apiUrl = getApiUrl();
      const res = await fetch(`${apiUrl}/api/inquiries/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setInquiries(prev => prev.filter(inq => inq._id.toString() !== id));
      }
    } catch (error) {
      console.error('Failed to delete inquiry', error);
      alert('Failed to delete inquiry');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <div className="p-8">Loading inquiries...</div>;
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Customer Inquiries</h1>
        <p className="text-gray-500 font-medium tracking-tight">Review and manage messages from potential clients and partners.</p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-6 rounded-[32px] border border-black/5 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name, email, or message content..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-black/5 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-[#4F46E5] transition-colors"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto relative">
           <button 
             onClick={() => setIsFilterOpen(!isFilterOpen)}
             className={`flex items-center gap-2 px-6 py-4 bg-gray-50 border border-black/5 rounded-2xl text-sm font-bold text-gray-700 hover:bg-gray-100 transition-all ${isFilterOpen ? 'border-[#4F46E5] text-[#4F46E5] bg-white' : ''}`}
           >
              <Filter className="w-4 h-4" />
              {statusFilter}
           </button>
           
           {isFilterOpen && (
             <>
               <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)} />
               <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-black/5 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                 {['All Statuses', 'New', 'In Progress', 'Resolved', 'High Priority'].map((status) => (
                   <button
                     key={status}
                     onClick={() => {
                       setStatusFilter(status);
                       setIsFilterOpen(false);
                     }}
                     className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
                       statusFilter === status 
                         ? 'bg-[#4F46E5]/10 text-[#4F46E5]' 
                         : 'text-gray-600 hover:bg-gray-50'
                     }`}
                   >
                     {status}
                   </button>
                 ))}
               </div>
             </>
           )}
        </div>
      </div>

      {/* Inquiries List */}
      <div className="grid gap-6">
        {inquiries
          .filter(inq => {
            const matchesSearch = inq.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 inq.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 inq.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 inq.service.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'All Statuses' || inq.status === statusFilter;
            return matchesSearch && matchesStatus;
          })
          .map((inquiry, i) => (
          <div key={inquiry._id.toString()} className="bg-white rounded-[32px] border border-black/5 shadow-sm hover:shadow-md transition-all overflow-hidden group">
            <div className="p-8 flex flex-col lg:flex-row lg:items-start justify-between gap-8">
              <div className="flex items-start gap-6 flex-grow">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-lg font-black shrink-0">
                  {inquiry.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="space-y-4 flex-grow">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-black text-gray-900">{inquiry.name}</h3>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${
                      inquiry.status === 'High Priority' ? "bg-rose-50 text-rose-600" :
                      inquiry.status === 'New' ? "bg-[#4F46E5]/10 text-[#4F46E5]" :
                      inquiry.status === 'In Progress' ? "bg-blue-50 text-blue-600" :
                      "bg-emerald-50 text-emerald-600"
                    }`}>
                      {inquiry.status}
                    </span>
                    <span className="text-xs font-bold text-gray-400 flex items-center gap-1.5 ml-2">
                       <Clock className="w-3.5 h-3.5" />
                       {new Date(inquiry.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-x-8 gap-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                      <Mail className="w-4 h-4 text-[#4F46E5]" />
                      {inquiry.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                      <Phone className="w-4 h-4 text-[#4F46E5]" />
                      {inquiry.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                       <FileText className="w-4 h-4 text-[#4F46E5]" />
                       Interest: {inquiry.service}
                    </div>
                  </div>

                  <div className="bg-gray-50/50 p-6 rounded-2xl border border-black/5 relative">
                    <p className="text-gray-600 text-sm leading-relaxed italic">"{inquiry.message}"</p>
                  </div>
                </div>
              </div>

              <div className="flex lg:flex-col items-center lg:items-stretch gap-3 shrink-0">
                <button 
                  onClick={() => window.location.href = `mailto:${inquiry.email}`}
                  className="flex-grow lg:flex-none h-12 px-6 bg-[#4F46E5] text-white rounded-xl text-sm font-black hover:bg-[#EA580C] transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Reply
                </button>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => updateStatus(inquiry._id.toString(), 'In Progress')}
                    disabled={updatingId === inquiry._id.toString()}
                    className="w-12 h-12 flex items-center justify-center text-blue-500 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all border border-blue-100 disabled:opacity-50"
                    title="Mark as In Progress"
                  >
                    <Clock className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => updateStatus(inquiry._id.toString(), 'Resolved')}
                    disabled={updatingId === inquiry._id.toString()}
                    className="w-12 h-12 flex items-center justify-center text-emerald-500 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-all border border-emerald-100 disabled:opacity-50"
                    title="Mark as Resolved"
                  >
                    {updatingId === inquiry._id.toString() ? <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                  </button>
                  <button 
                    onClick={() => updateStatus(inquiry._id.toString(), 'High Priority')}
                    disabled={updatingId === inquiry._id.toString()}
                    className="w-12 h-12 flex items-center justify-center text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-all border border-rose-100 disabled:opacity-50"
                    title="Mark as High Priority"
                  >
                    <AlertCircle className="w-5 h-5" />
                  </button>
                   <button 
                    onClick={() => deleteInquiry(inquiry._id.toString())}
                    disabled={updatingId === inquiry._id.toString()}
                    className="w-12 h-12 flex items-center justify-center text-red-400 hover:text-white hover:bg-red-500 bg-red-50 rounded-xl transition-all border border-red-100 disabled:opacity-50"
                    title="Delete Inquiry"
                  >
                     <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminInquiriesPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading Inquiries...</div>}>
      <AdminInquiriesContent />
    </Suspense>
  );
}
