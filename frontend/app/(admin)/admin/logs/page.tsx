'use client';

import { useState, useEffect } from 'react';
import { motion } from "motion/react";
import { 
  Database, 
  MessageSquare, 
  Users, 
  Zap, 
  Filter, 
  Search,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

export default function AdminLogsPage() {
  const [logs, setLogs] = useState([
    { id: 1, type: 'inquiry', message: 'New inquiry received for AI Enterprise', time: '2 mins ago', status: 'success' },
    { id: 2, type: 'application', message: 'New job application: Sr. Frontend Architect', time: '15 mins ago', status: 'success' },
    { id: 3, type: 'system', message: 'SEO Metadata crawled by Googlebot', time: '1 hour ago', status: 'info' },
    { id: 4, type: 'security', message: 'Admin login detected: ID 1024', time: '3 hours ago', status: 'warning' },
    { id: 5, type: 'inquiry', message: 'New inquiry received for CRM Solutions', time: '5 hours ago', status: 'success' },
    { id: 6, type: 'system', message: 'Sitemap.xml successfully rebuilt', time: '8 hours ago', status: 'success' },
    { id: 7, type: 'application', message: 'New job application: AI Researcher', time: '12 hours ago', status: 'success' },
    { id: 8, type: 'security', message: 'Unauthorized API attempt blocked', time: '1 day ago', status: 'error' },
  ]);
  const [selectedLog, setSelectedLog] = useState<any>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case 'inquiry': return <MessageSquare className="w-4 h-4" />;
      case 'application': return <Users className="w-4 h-4" />;
      case 'system': return <Zap className="w-4 h-4" />;
      case 'security': return <ShieldCheck className="w-4 h-4" />;
      default: return <Database className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'warning': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'error': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'info': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">System Activity Logs</h1>
          <p className="text-gray-500 font-medium">Real-time feed of all administrative and business-critical events.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-6 py-3 bg-white border border-black/5 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
              <Clock className="w-4 h-4" />
              Past 24 Hours
           </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Events", value: "128", icon: Database, color: "text-slate-900" },
          { label: "Critical Alerts", value: "2", icon: AlertCircle, color: "text-rose-600" },
          { label: "Inquiries (24h)", value: "12", icon: MessageSquare, color: "text-[#4F46E5]" },
          { label: "Health Score", value: "99%", icon: ShieldCheck, color: "text-emerald-600" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-black/5 shadow-sm">
             <div className="flex items-center gap-3 mb-2">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</span>
             </div>
             <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-[40px] border border-black/5 shadow-sm overflow-hidden min-h-[500px]">
        <div className="p-8 border-b border-black/5 flex items-center justify-between bg-gray-50/30">
          <div className="flex items-center gap-4 flex-grow max-w-xl">
             <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Filter logs by message or type..." className="w-full bg-white border border-black/5 rounded-xl pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#4F46E5] transition-all shadow-sm" />
             </div>
          </div>
          <div className="flex items-center gap-2">
             <button className="p-2.5 bg-white border border-black/5 rounded-xl text-gray-400 hover:text-gray-900 transition-all shadow-sm">
                <Filter className="w-4 h-4" />
             </button>
          </div>
        </div>

        <div className="divide-y divide-black/5">
          {logs.map((log, i) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="px-8 py-6 hover:bg-gray-50/50 transition-colors flex items-center gap-6 group"
            >
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${getStatusColor(log.status)} shadow-sm group-hover:scale-110 transition-transform`}>
                {getIcon(log.type)}
              </div>
              <div className="flex-grow">
                <p className="text-sm font-bold text-gray-900">{log.message}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    {log.time}
                  </span>
                  <span className="w-1 h-1 bg-gray-200 rounded-full" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Origin: Production</span>
                </div>
              </div>
              <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setSelectedLog(log)}
                  className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#4F46E5]"
                >
                  Details
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>

      {/* Log Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-[40px] w-full max-w-lg shadow-2xl border border-white/20 overflow-hidden">
            <div className="p-8 border-b border-black/5 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${getStatusColor(selectedLog.status)} shadow-sm`}>
                  {getIcon(selectedLog.type)}
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 tracking-tight">Log Details</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">ID: LOG-{selectedLog.id}882</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedLog(null)}
                className="w-10 h-10 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
              >
                <span className="text-2xl font-bold">&times;</span>
              </button>
            </div>
            
            <div className="p-10 space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Event Message</label>
                <p className="text-base font-bold text-gray-900 leading-relaxed">{selectedLog.message}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Timestamp</label>
                  <p className="text-xs font-bold text-gray-700">{selectedLog.time}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Event Type</label>
                  <p className="text-xs font-bold text-[#4F46E5] uppercase">{selectedLog.type}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Origin</label>
                  <p className="text-xs font-bold text-gray-700 underline decoration-dotted capitalize">Production Cluster</p>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Environment</label>
                  <p className="text-xs font-bold text-gray-700">AWS EC2 (Agara-Next)</p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-black/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Technical Context</p>
                <code className="text-[10px] text-gray-500 font-mono block overflow-x-auto whitespace-pre">
                  {`{\n  "service": "backend-api",\n  "method": "POST",\n  "status": 201,\n  "responseTime": "142ms",\n  "traceId": "ag-${Math.random().toString(36).substr(2, 9)}"\n}`}
                </code>
              </div>
            </div>

            <div className="p-8 bg-gray-50 border-t border-black/5 flex justify-end">
              <button 
                onClick={() => setSelectedLog(null)}
                className="px-8 py-3 bg-slate-900 text-white rounded-2xl text-sm font-black hover:bg-black transition-all shadow-xl"
              >
                Close Trace
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
