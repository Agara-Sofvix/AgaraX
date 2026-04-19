'use client';

import { getApiUrl } from '@/lib/api';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import { Plus, Trash2, Briefcase, MapPin, Search } from 'lucide-react';
import { IJob } from '@/models/Job';
import { Button } from '@/components/Button';

function AdminJobsContent() {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [search, setSearch] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    experience: '',
    description: '',
    requirements: '',
    responsibilities: ''
  });

  const fetchJobs = async () => {
    try {
      const apiUrl = getApiUrl();
      const res = await fetch(`${apiUrl}/api/jobs`);
      if (res.ok) {
        const data = await res.json();
        setJobs(data);
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchParams = useSearchParams();
  const urlSearch = searchParams.get('search') || '';

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (urlSearch) {
      setSearch(urlSearch);
    }
  }, [urlSearch]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job posting?')) return;
    try {
      const apiUrl = getApiUrl();
      const res = await fetch(`${apiUrl}/api/jobs/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setJobs(prev => prev.filter(job => job._id !== id));
      }
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newJob = {
      ...formData,
      requirements: formData.requirements.split('\n').filter(r => r.trim()),
      responsibilities: formData.responsibilities.split('\n').filter(r => r.trim())
    };

    try {
      const apiUrl = getApiUrl();
      const res = await fetch(`${apiUrl}/api/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob)
      });
      if (res.ok) {
        const createdJob = await res.json();
        setJobs([createdJob, ...jobs]);
        setIsModalOpen(false);
        setFormData({
          title: '',
          department: '',
          location: '',
          type: 'Full-time',
          experience: '',
          description: '',
          requirements: '',
          responsibilities: ''
        });
      }
    } catch (error) {
      console.error('Failed to create job:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(search.toLowerCase()) || 
    job.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Job Postings</h1>
          <p className="text-gray-500 font-medium mt-1">Manage open positions on the careers portal.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" /> Post New Job
        </Button>
      </div>

      {/* Stats & Search */}
      <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900">{jobs.length}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Total Active Jobs</p>
          </div>
        </div>
        
        <div className="w-full md:w-auto flex-1 max-w-md relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-transparent focus:border-indigo-600 focus:bg-white rounded-xl pl-12 pr-4 py-3 text-sm font-medium transition-all outline-none"
          />
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={job._id} 
              className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg">
                  {job.department}
                </span>
                <button 
                  onClick={() => handleDelete(job._id)}
                  className="w-8 h-8 bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2">{job.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mb-6">{job.description}</p>
              
              <div className="space-y-2 mt-auto">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" /> {job.location}
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                  <Briefcase className="w-3.5 h-3.5 text-gray-400" /> {job.type} • {job.experience}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create Job Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[40px] w-full max-w-3xl max-h-[85vh] flex flex-col relative z-10 shadow-2xl border border-white/20 overflow-hidden"
          >
            {/* Modal Header */}
            <div className="p-8 pb-4 border-b border-black/5 bg-white shrink-0">
              <h2 className="text-2xl font-black text-gray-900">Post New Job</h2>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="flex-1 overflow-y-auto p-8 pt-6 custom-scrollbar" data-lenis-prevent>
              <form id="job-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">Job Title</label>
                    <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-indigo-600 transition-all" placeholder="e.g. Senior Frontend Engineer" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">Department</label>
                    <input required value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-indigo-600 transition-all" placeholder="e.g. Engineering" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">Location</label>
                    <input required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-indigo-600 transition-all" placeholder="e.g. Remote / San Francisco, CA" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">Experience Required</label>
                    <input required value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-indigo-600 transition-all" placeholder="e.g. 5+ years" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">Short Description</label>
                  <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-indigo-600 resize-none transition-all" placeholder="Summary of the role..." />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">Requirements (One per line)</label>
                    <textarea required rows={6} value={formData.requirements} onChange={e => setFormData({...formData, requirements: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-indigo-600 resize-none transition-all" placeholder="Requirement 1&#10;Requirement 2&#10;Requirement 3..." />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">Responsibilities (One per line)</label>
                    <textarea required rows={6} value={formData.responsibilities} onChange={e => setFormData({...formData, responsibilities: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-indigo-600 resize-none transition-all" placeholder="Responsibility 1&#10;Responsibility 2&#10;Responsibility 3..." />
                  </div>
                </div>
              </form>
            </div>

            {/* Modal Footer - Fixed */}
            <div className="p-8 border-t border-black/5 bg-white shrink-0">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="button" variant="outline" className="w-full sm:flex-1 h-14 rounded-2xl" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" form="job-form" className="w-full sm:flex-1 h-14 rounded-2xl" disabled={isSubmitting}>
                  {isSubmitting ? 'Posting...' : 'Publish Job Listing'}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default function AdminJobsPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading Jobs...</div>}>
      <AdminJobsContent />
    </Suspense>
  );
}
