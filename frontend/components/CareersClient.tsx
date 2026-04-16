'use client';

import { getApiUrl } from "@/lib/api";

import { useState, useRef } from "react";
import { motion } from "motion/react";
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Clock, 
  ArrowRight,
  Upload,
  CheckCircle2,
  Heart,
  TrendingUp,
  Users,
  Award
} from "lucide-react";
import { Button } from "@/components/Button";
import { IJob } from '@/models/Job';

interface CareersClientProps {
  initialJobs: IJob[];
}

export function CareersClient({ initialJobs }: CareersClientProps) {
  const [jobs] = useState<IJob[]>(initialJobs);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filters, setFilters] = useState({
    role: "all",
    type: "all",
    experience: "all"
  });

  const benefits = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Employee Wellbeing",
      description: "Health support, stress-free environment, and a culture that genuinely cares about growth and balance."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Career Growth",
      description: "Work on real-world projects, learn modern technologies, and grow faster with hands-on experience."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Flexible Culture",
      description: "Flexible timings, remote-friendly environment, and a team that values productivity over micromanagement."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Competitive Rewards",
      description: "Performance-based salary growth, incentives, and recognition for your unique contributions."
    }
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roleId: '',
    experience: '',
    portfolio: '',
    coverLetter: '',
    resume: ''
  });

  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit.");
        return;
      }
      setSelectedFileName(file.name);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, resume: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApply = (jobId: string) => {
    setFormData(prev => ({ ...prev, roleId: jobId }));
    setSelectedJob(jobId);
    setShowApplicationForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const job = jobs.find(j => j._id === formData.roleId);

    try {
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          roleTitle: job?.title || 'Unknown Position',
          experience: formData.experience,
          phone: formData.phone,
          coverLetter: formData.coverLetter,
          resume: formData.resume,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit application');

      setFormSubmitted(true);
      setTimeout(() => {
        setShowApplicationForm(false);
        setFormSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          roleId: '',
          experience: '',
          portfolio: '',
          coverLetter: '',
          resume: ''
        });
        setSelectedFileName("");
      }, 3000);
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredJobs = jobs.filter(job => {
    if (filters.role !== "all" && !job.department.toLowerCase().includes(filters.role)) return false;
    if (filters.type !== "all" && !job.type.toLowerCase().includes(filters.type)) return false;
    return true;
  });

  return (
    <div className="bg-gemini-light min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/10 via-transparent to-transparent"></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Build Your Career With Us
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Join a team of talented professionals building the future of enterprise software at AgaraX. We offer competitive compensation, growth opportunities, and a culture of innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Employee Benefits Section */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Employee Benefits</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">We invest in our people by providing an environment that fosters growth, wellbeing, and work-life harmony.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, translateY: -5 }}
                transition={{ 
                  duration: 0.3,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300
                }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-[32px] border border-black/5 shadow-sm hover:shadow-xl hover:border-[#4F46E5]/20 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-[#4F46E5]/10 text-[#4F46E5] rounded-2xl flex items-center justify-center mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search positions..."
                  className="w-full bg-white border border-black/10 rounded-lg pl-12 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#4F46E5] shadow-sm"
                />
              </div>
            </div>
            <select
              value={filters.role}
              onChange={(e) => setFilters({ ...filters, role: e.target.value })}
              className="bg-white border border-black/10 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-[#4F46E5] shadow-sm appearance-none"
            >
              <option value="all">All Departments</option>
              <option value="engineering">Engineering</option>
              <option value="design">Design</option>
              <option value="product">Product</option>
              <option value="infrastructure">Infrastructure</option>
            </select>
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="bg-white border border-black/10 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-[#4F46E5] shadow-sm appearance-none"
            >
              <option value="all">All Types</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
            </select>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12 text-gray-500">No jobs found matching your filters.</div>
            ) : (
              filteredJobs.map((job, index) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 border border-black/5 hover:border-[#4F46E5]/50 transition-all duration-300 shadow-sm"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-2xl font-semibold text-gray-900">{job.title}</h3>
                      <span className="bg-[#4F46E5]/10 text-[#4F46E5] text-xs font-medium px-3 py-1 rounded-full">
                        {job.department}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        {job.type}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {job.experience}
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{job.description}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedJob(selectedJob === job._id ? null : job._id)}
                      className="w-full sm:w-auto"
                    >
                      {selectedJob === job._id ? "Hide Details" : "View Details"}
                    </Button>
                    <Button onClick={() => handleApply(job._id)} className="w-full sm:w-auto">
                      Apply Now
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Job Details */}
                {selectedJob === job._id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-8 pt-8 border-t border-black/5 grid md:grid-cols-2 gap-8"
                  >
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h4>
                      <ul className="space-y-3">
                        {job.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                            <CheckCircle2 className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Responsibilities</h4>
                      <ul className="space-y-3">
                        {job.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                            <CheckCircle2 className="w-5 h-5 text-[#4F46E5] flex-shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )))}
          </div>
        </div>
      </section>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col relative z-10 shadow-2xl border border-white/20 overflow-hidden"
          >
            {!formSubmitted ? (
              <>
                {/* Modal Header */}
                <div className="p-8 pb-4 border-b border-black/5 bg-white shrink-0">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Apply for Position</h2>
                    <button
                      onClick={() => setShowApplicationForm(false)}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-all"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Modal Body - Scrollable */}
                <div className="flex-1 overflow-y-auto p-8 pt-6 custom-scrollbar" data-lenis-prevent>
                  <form id="apply-form" onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-gray-50 border border-transparent rounded-xl px-5 py-4 text-gray-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5] transition-all"
                          placeholder="Name"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">Email *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-gray-50 border border-transparent rounded-xl px-5 py-4 text-gray-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5] transition-all"
                          placeholder="email@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">Phone *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-gray-50 border border-transparent rounded-xl px-5 py-4 text-gray-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5] transition-all"
                          placeholder="+xx xxxxxxxxx"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">Role Applying For *</label>
                        <select
                          required
                          value={formData.roleId}
                          onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
                          className="w-full bg-gray-50 border border-transparent rounded-xl px-5 py-4 text-gray-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5] appearance-none transition-all"
                        >
                          <option value="">Select Role</option>
                          {jobs.map(job => (
                            <option key={job._id} value={job._id}>{job.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">Years of Experience *</label>
                        <select
                          required
                          value={formData.experience}
                          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                          className="w-full bg-gray-50 border border-transparent rounded-xl px-5 py-4 text-gray-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5] appearance-none transition-all"
                        >
                          <option value="">Select Experience</option>
                          <option value="0-2">0-2 years</option>
                          <option value="2-5">2-5 years</option>
                          <option value="5-10">5-10 years</option>
                          <option value="10+">10+ years</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">Portfolio Link (Optional)</label>
                        <input
                          type="url"
                          value={formData.portfolio}
                          onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                          className="w-full bg-gray-50 border border-transparent rounded-xl px-5 py-4 text-gray-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5] transition-all"
                          placeholder="https://portfolio.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">Resume/CV * (PDF or DOCX)</label>
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer bg-gray-50 ${
                          selectedFileName ? 'border-[#22C55E] bg-[#22C55E]/5' : 'border-gray-200 hover:border-[#4F46E5] hover:bg-white'
                        }`}
                      >
                        {selectedFileName ? (
                          <div className="flex flex-col items-center">
                            <CheckCircle2 className="w-12 h-12 text-[#22C55E] mx-auto mb-4" />
                            <p className="text-gray-900 font-black mb-1">{selectedFileName}</p>
                            <p className="text-gray-500 text-xs font-bold">Click to change file</p>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-900 font-black mb-2 tracking-tight">Drag and drop or click to upload</p>
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Maximum file size: 5MB</p>
                          </>
                        )}
                        <input 
                          ref={fileInputRef}
                          type="file" 
                          className="hidden" 
                          accept=".pdf,.doc,.docx" 
                          onChange={handleFileChange}
                          required={!selectedFileName}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">Cover Letter (Optional)</label>
                      <textarea
                        rows={5}
                        value={formData.coverLetter}
                        onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                        className="w-full bg-gray-50 border border-transparent rounded-xl px-5 py-4 text-gray-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5] resize-none transition-all"
                        placeholder="Tell us why you're a great fit..."
                      />
                    </div>
                  </form>
                </div>

                {/* Modal Footer - Fixed */}
                <div className="p-8 border-t border-black/5 bg-white shrink-0">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      type="submit" 
                      form="apply-form"
                      size="lg" 
                      className="w-full sm:flex-2 h-14 rounded-2xl font-black" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting Application..." : "Submit Application"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() => setShowApplicationForm(false)}
                      className="w-full sm:flex-1 h-14 rounded-2xl font-black"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-20 px-8">
                  <div className="w-24 h-24 bg-[#22C55E] rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-[#22C55E]/20">
                    <CheckCircle2 className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">Application Submitted!</h3>
                  <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-md mx-auto">
                    Thank you for applying. We'll review your application and get back to you within 5-7 business days.
                  </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
