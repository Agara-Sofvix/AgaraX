'use client';

import { getApiUrl } from '@/lib/api';

import { 
  Search, 
  Filter, 
  Briefcase, 
  Calendar, 
  FileText,
  Mail,
  Phone,
  CheckCircle2,
  XCircle,
  Clock,
  Users
} from "lucide-react";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { IApplication } from "@/models/Application";

function AdminCareersContent() {
  const [applications, setApplications] = useState<IApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<IApplication | null>(null);
  const [schedulingId, setSchedulingId] = useState<string | null>(null);
  const [scheduleSuccess, setScheduleSuccess] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const fetchApplications = async () => {
    try {
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/api/applications`);
      if (!response.ok) throw new Error('Failed to fetch applications');
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const searchParams = useSearchParams();
  const urlSearch = searchParams.get('search') || '';

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
  }, [urlSearch]);

  const calculateMatchScore = (experience: string) => {
    const years = parseInt(experience) || 0;
    if (years >= 5) return 95;
    if (years >= 3) return 85;
    if (years >= 1) return 70;
    return 60;
  };

  const handleStatusChange = async (id: string, newStatus: string, triggerEmail?: boolean, interviewDate?: Date) => {
    try {
      if (newStatus === 'Interviewing' && triggerEmail) {
        setSchedulingId(id);
        setScheduleSuccess(false);
      }
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/api/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: newStatus, 
          triggerEmail,
          ...(interviewDate && { interviewDate: interviewDate.toISOString() })
        }),
      });
      if (response.ok) {
        const updated = await response.json();
        const newStatusLiteral = updated.status as IApplication['status'];
        setApplications(prev => prev.map(a => a._id.toString() === id ? { ...a, status: newStatusLiteral, ...(interviewDate && { interviewDate }) } as IApplication : a));
        if (selectedApp?._id.toString() === id) {
          setSelectedApp(prev => prev ? { ...prev, status: newStatusLiteral, ...(interviewDate && { interviewDate }) } as IApplication : prev);
        }
        if (newStatus === 'Interviewing' && triggerEmail) {
          setScheduleSuccess(true);
          setTimeout(() => setScheduleSuccess(false), 3000);
        }
      } else {
        const errorData = await response.json();
        alert(`Failed to update status: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to connect to server.');
    } finally {
      setSchedulingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    try {
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/api/applications/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchApplications();
      }
    } catch (error) {
      console.error('Failed to delete application:', error);
    }
  };

  const handleDownloadResume = (resumePath: string, fileName: string) => {
    try {
      // resumePath is now always a URL path like /uploads/abc123.pdf
      // Build the full URL using the API base and open in a new tab
      const apiUrl = getApiUrl();
      const fullUrl = resumePath.startsWith('http')
        ? resumePath
        : `${apiUrl}${resumePath}`;

      const a = document.createElement('a');
      a.href = fullUrl;
      a.download = fileName || 'resume';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.click();
    } catch (error) {
      console.error('Failed to open resume:', error);
    }
  };
 
  if (loading) return <div className="p-8">Loading applications...</div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Talent Acquisition</h1>
          <p className="text-gray-500 font-medium tracking-tight">Manage your recruitment pipeline and review candidate applications.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="bg-white px-6 py-4 rounded-2xl border border-black/5 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                 <Users className="w-5 h-5" />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase text-gray-400">Total Applicants</p>
                 <p className="text-xl font-black text-gray-900">{applications.length}</p>
              </div>
           </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-6 rounded-[32px] border border-black/5 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by candidate name, role, or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-black/5 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-[#4F46E5] transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto relative">
           <button 
             onClick={() => setIsFilterOpen(!isFilterOpen)}
             className={`flex items-center gap-2 px-6 py-4 bg-gray-50 border border-black/5 rounded-2xl text-sm font-bold text-gray-700 hover:bg-gray-100 transition-all ${isFilterOpen ? 'border-[#4F46E5] text-[#4F46E5] bg-white' : ''}`}
           >
              <Filter className="w-4 h-4" />
              {roleFilter}
           </button>
           
           {isFilterOpen && (
             <>
               <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)} />
               <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-black/5 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                 {['All Roles', ...Array.from(new Set(applications.map(app => app.roleTitle)))].map((role) => (
                   <button
                     key={role}
                     onClick={() => {
                       setRoleFilter(role);
                       setIsFilterOpen(false);
                     }}
                     className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
                       roleFilter === role 
                         ? 'bg-[#4F46E5]/10 text-[#4F46E5]' 
                         : 'text-gray-600 hover:bg-gray-50'
                     }`}
                   >
                     {role}
                   </button>
                 ))}
               </div>
             </>
           )}
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-[40px] border border-black/5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
             <thead>
                <tr className="bg-gray-50/50">
                   <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Candidate</th>
                   <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Position</th>
                   <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Match Score</th>
                   <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Recruitment Stage</th>
                   <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-gray-400 min-w-[140px]">Applied</th>
                   <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-gray-400 min-w-[120px]">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-black/5">
                  {applications
                    .filter(app => {
                      const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                           app.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                           app.email.toLowerCase().includes(searchQuery.toLowerCase());
                      const matchesRole = roleFilter === 'All Roles' || app.roleTitle === roleFilter;
                      return matchesSearch && matchesRole;
                    })
                    .map((app) => (
                   <tr 
                     key={app._id.toString()} 
                     onClick={() => setSelectedApp(app)}
                     className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
                   >
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs uppercase">
                               {app.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                               <p className="text-sm font-bold text-gray-900 group-hover:text-[#4F46E5] transition-colors">{app.name}</p>
                               <p className="text-xs text-gray-400 font-medium">{app.email}</p>
                            </div>
                         </div>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                            <Briefcase className="w-4 h-4 text-[#4F46E5]" />
                            {app.roleTitle}
                         </div>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                               <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-[#4F46E5] transition-all duration-1000" 
                                    style={{ width: `${calculateMatchScore(app.experience)}%` }}
                                  />
                               </div>
                               <span className="text-xs font-black text-gray-900">{calculateMatchScore(app.experience)}%</span>
                            </div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Experience: {app.experience}</p>
                         </div>
                      </td>
                      <td className="px-8 py-6">
                         <select 
                           value={app.status}
                           onClick={(e) => e.stopPropagation()}
                           onChange={(e) => {
                             e.stopPropagation();
                             handleStatusChange(app._id.toString(), e.target.value);
                           }}
                           className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border-none focus:ring-2 focus:ring-[#4F46E5] outline-none cursor-pointer transition-all ${
                              app.status === 'Interviewing' ? "bg-blue-50 text-blue-600" :
                              app.status === 'New' ? "bg-[#4F46E5]/10 text-[#4F46E5]" :
                              app.status === 'Offer Sent' ? "bg-emerald-50 text-emerald-600" :
                              app.status === 'Rejected' ? "bg-rose-50 text-rose-600" :
                              "bg-amber-50 text-amber-600"
                           }`}
                         >
                            <option value="New">New</option>
                            <option value="Review">Review</option>
                            <option value="Interviewing">Interviewing</option>
                            <option value="Offer Sent">Offer Sent</option>
                            <option value="Rejected">Rejected</option>
                         </select>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                         <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                            <Clock className="w-3.5 h-3.5" />
                            {new Date(app.createdAt).toLocaleDateString()}
                         </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                         <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {app.resume && (
                               <button 
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   handleDownloadResume(app.resume!, `resume-${app.name.replace(/\s+/g, '-').toLowerCase()}`);
                                 }}
                                 className="p-2.5 bg-[#4F46E5]/10 text-[#4F46E5] rounded-xl hover:bg-[#4F46E5] hover:text-white transition-all flex items-center justify-center"
                                 title="Download Resume"
                               >
                                 <FileText className="w-4 h-4" />
                               </button>
                             )}
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(app._id.toString());
                              }}
                              className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all"
                              title="Delete Application"
                            >
                               <XCircle className="w-4 h-4" />
                            </button>
                         </div>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
        </div>
      </div>

      {/* Candidate Detail Drawer */}
      {selectedApp && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end"
          onClick={() => setSelectedApp(null)}
        >
          <div 
            className="w-full max-w-4xl bg-white h-full shadow-2xl overflow-y-auto custom-scrollbar"
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-xl uppercase">
                     {selectedApp.name?.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">{selectedApp.name}</h2>
                    <p className="text-gray-500 font-bold">{selectedApp.roleTitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    disabled={schedulingId === selectedApp._id.toString() || scheduleSuccess}
                    className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                      scheduleSuccess
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-gray-900 text-white hover:bg-black'
                    } disabled:opacity-75 disabled:cursor-not-allowed`}
                    onClick={() => {
                      setScheduleDate('');
                      setScheduleTime('');
                      setShowScheduleModal(true);
                    }}
                  >
                     {scheduleSuccess ? (
                       <><CheckCircle2 className="w-4 h-4" /> Scheduled</>
                     ) : schedulingId === selectedApp._id.toString() ? (
                       'Scheduling...'
                     ) : (
                       'Schedule Interview'
                     )}
                  </button>
                  <button 
                    onClick={() => setSelectedApp(null)}
                    className="p-2.5 bg-gray-100 text-gray-500 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-all"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-6 rounded-3xl border border-black/5">
                   <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Email Address</p>
                   <p className="text-sm font-bold text-gray-900 truncate">
                      {selectedApp.email}
                   </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-3xl border border-black/5">
                   <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Mobile Number</p>
                   <p className="text-sm font-bold text-gray-900 truncate">
                      {selectedApp.phone || 'Not provided'}
                   </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-3xl border border-black/5">
                   <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Experience</p>
                   <p className="text-sm font-bold text-gray-900 italic">
                      {selectedApp.experience}
                   </p>
                </div>
              </div>

              {selectedApp.status === 'Interviewing' && selectedApp.interviewDate && (
                <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
                     <Calendar className="w-6 h-6 text-emerald-600" />
                   </div>
                   <div>
                     <p className="text-[10px] font-black uppercase text-emerald-600 mb-1">Interview Scheduled For</p>
                     <p className="text-sm font-bold text-emerald-900">
                        {new Date(selectedApp.interviewDate).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                     </p>
                   </div>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase text-gray-900 tracking-widest">Cover Letter</h3>
                <div className="bg-gray-50 p-8 rounded-[32px] border border-black/5 italic text-gray-600 leading-relaxed text-sm max-h-40 overflow-y-auto">
                   "{selectedApp.coverLetter || 'No cover letter provided.'}"
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase text-gray-900 tracking-widest">Resume Preview</h3>
                {selectedApp.resume ? (
                  <div className="w-full h-[600px] bg-gray-100 rounded-[32px] border-2 border-dashed border-gray-200 overflow-hidden relative">
                    <iframe 
                      src={selectedApp.resume} 
                      className="w-full h-full border-none"
                      title="Resume Preview"
                    />
                  </div>
                ) : (
                  <div className="w-full h-32 bg-gray-50 rounded-[32px] border border-black/5 flex items-center justify-center text-gray-400 font-bold italic">
                    No resume uploaded
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Interview Modal overlay */}
      {showScheduleModal && selectedApp && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowScheduleModal(false)}></div>
          <div className="bg-white rounded-[32px] w-full max-w-sm p-8 relative z-10 shadow-2xl overflow-hidden border border-white/20">
            <h3 className="text-2xl font-black text-gray-900 mb-2">Schedule Interview</h3>
            <p className="text-gray-500 mb-6 text-sm">Set the date and time. An email will be sent automatically to the candidate.</p>
            
            <div className="space-y-5">
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-500 mb-2">Date</label>
                <input 
                  type="date"
                  value={scheduleDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-gray-900 transition-all text-sm font-bold text-gray-900"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-500 mb-2">Time</label>
                <input 
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-gray-900 transition-all text-sm font-bold text-gray-900"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="w-full sm:flex-1 py-3.5 font-bold rounded-xl text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all text-sm"
              >
                Cancel
              </button>
              <button 
                disabled={!scheduleDate || !scheduleTime}
                onClick={() => {
                  const combinedDate = new Date(`${scheduleDate}T${scheduleTime}`);
                  handleStatusChange(selectedApp._id.toString(), 'Interviewing', true, combinedDate);
                  setShowScheduleModal(false);
                }}
                className="w-full sm:flex-1 py-3.5 font-bold rounded-xl text-white bg-gray-900 hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm flex items-center justify-center gap-2"
              >
                Confirm & Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminCareersPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading Applications...</div>}>
      <AdminCareersContent />
    </Suspense>
  );
}
