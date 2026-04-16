'use client';

import { 
  Search, 
  Bell, 
  User, 
  Settings,
  HelpCircle,
  Menu,
  LogOut,
  ChevronRight
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { getApiUrl } from "@/lib/api";

export function AdminTopbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [helpContent, setHelpContent] = useState<{title: string, content: React.ReactNode} | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [hasNew, setHasNew] = useState(false);
  
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get('search') || '';

  useEffect(() => {
    // Basic check for token on client side
    setIsLoggedIn(document.cookie.includes("admin_token="));
    if (urlSearch) {
      setSearch(urlSearch);
    } else {
      setSearch("");
    }
  }, [urlSearch]);

  const fetchNotifications = async () => {
    try {
      const apiUrl = getApiUrl();
      const res = await fetch(`${apiUrl}/api/admin/notifications`);
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
        
        // Check for new notifications
        const lastSeen = localStorage.getItem('admin_last_seen_notification');
        if (data.length > 0) {
          const latestDate = new Date(data[0].createdAt).getTime();
          if (!lastSeen || latestDate > parseInt(lastSeen)) {
            setHasNew(true);
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch notifications', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 30000); // Poll every 30 seconds
      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  const handleOpenNotifications = () => {
    const newState = !showNotifications;
    setShowNotifications(newState);
    if (newState && notifications.length > 0) {
      setHasNew(false);
      localStorage.setItem('admin_last_seen_notification', new Date(notifications[0].createdAt).getTime().toString());
    }
    if (newState) setShowHelp(false);
  };

  const handleSearch = (query: string) => {
    setSearch(query);
    const params = new URLSearchParams(window.location.search);
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    router.replace(`${window.location.pathname}?${params.toString()}`);
  };

  const handleLogout = () => {
    // Delete cookie by setting expiry to past date
    document.cookie = "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/admin/login");
  };

  return (
    <header className="h-20 bg-white border-b border-black/5 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-6 flex-grow max-w-2xl">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-gray-50 border border-black/5 rounded-full pl-10 lg:pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#4F46E5] transition-colors shadow-inner-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-4 shrink-0">
        <button 
          onClick={() => {
            setShowHelp(!showHelp);
            if (!showHelp) setShowNotifications(false);
          }}
          className={`hidden sm:block p-2.5 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all ${showHelp ? 'bg-gray-100 text-gray-900' : ''}`}
        >
          <HelpCircle className="w-5 h-5" />
        </button>
        {showHelp && (
          <div className="absolute top-16 right-48 w-80 bg-white rounded-2xl shadow-2xl border border-black/5 p-6 z-50">
            <h4 className="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Admin Help Center</h4>
            <p className="text-xs text-gray-500 mb-6 font-medium">Detailed documentation for managing your platform.</p>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-xl border border-black/5">
                <p className="text-[10px] font-black uppercase text-[#4F46E5] mb-1">Quick Tip</p>
                <p className="text-[10px] text-gray-600 leading-relaxed font-medium">Use the "Interviewing" status in Careers to automatically send scheduling emails to candidates.</p>
              </div>
              <div className="space-y-1">
                <button 
                  onClick={() => {
                    setHelpContent({
                      title: "How to Manage Jobs",
                      content: (
                        <div className="space-y-4 text-gray-600">
                          <p>To post or manage job openings:</p>
                          <ol className="list-decimal pl-5 space-y-2">
                            <li>Navigate to the <b>Jobs</b> section from the sidebar.</li>
                            <li>Click the <b>Post New Job</b> button in the top right.</li>
                            <li>Fill in the job details, requirements, and responsibilities.</li>
                            <li>Click <b>Publish Job</b> to make it live on the careers portal.</li>
                            <li>You can delete or edit existing jobs using the actions in each card.</li>
                          </ol>
                        </div>
                      )
                    });
                    setShowHelp(false);
                  }}
                  className="w-full text-left p-2.5 hover:bg-gray-50 rounded-xl text-xs font-bold text-gray-700 flex items-center justify-between group"
                >
                  How to Manage Jobs
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-900 transition-colors" />
                </button>
                <button 
                  onClick={() => {
                    setHelpContent({
                      title: "SEO Optimization Guide",
                      content: (
                        <div className="space-y-4 text-gray-600">
                          <p>To optimize your site for search engines:</p>
                          <ul className="list-disc pl-5 space-y-2">
                            <li>Go to the <b>SEO</b> module.</li>
                            <li>Select the page you want to optimize from the list.</li>
                            <li>Update the <b>Meta Title</b> and <b>Description</b>. These are what users see in search results.</li>
                            <li>Add relevant <b>Keywords</b> separated by commas.</li>
                            <li>Click <b>Save Changes</b> to apply. Changes may take a few hours to be indexed by Google.</li>
                          </ul>
                        </div>
                      )
                    });
                    setShowHelp(false);
                  }}
                  className="w-full text-left p-2.5 hover:bg-gray-50 rounded-xl text-xs font-bold text-gray-700 flex items-center justify-between group"
                >
                  SEO Optimization Guide
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-900 transition-colors" />
                </button>
                <button 
                  onClick={() => {
                    window.location.href = 'mailto:support@agara.com';
                    setShowHelp(false);
                  }}
                  className="w-full text-left p-2.5 hover:bg-indigo-50 rounded-xl text-xs font-bold text-[#4F46E5] flex items-center justify-between group"
                >
                  Contact Developer Support
                  <ChevronRight className="w-3.5 h-3.5 text-[#4F46E5]/30 group-hover:text-[#4F46E5] transition-colors" />
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="relative">
          <button 
            onClick={handleOpenNotifications}
            className={`p-2.5 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all relative ${showNotifications ? 'bg-gray-100 text-gray-900' : ''}`}
          >
            <Bell className="w-5 h-5" />
            {hasNew && <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-[#4F46E5] border-2 border-white rounded-full animate-pulse" />}
          </button>
          
          {showNotifications && (
            <div className="absolute top-12 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-black/5 z-50 overflow-hidden">
              <div className="p-4 border-b border-black/5 flex items-center justify-between bg-gray-50/50">
                <span className="text-xs font-black uppercase tracking-widest text-gray-900">Notifications</span>
                <span className="text-[10px] font-bold text-[#4F46E5] cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div key={notif._id} className="p-4 hover:bg-gray-50 transition-colors border-b border-black/5 cursor-pointer group">
                      <div className="flex items-start justify-between gap-4">
                        <p className="text-xs font-bold text-gray-900 group-hover:text-[#4F46E5] transition-colors">{notif.title}</p>
                        <span className="text-[10px] text-gray-400 font-medium shrink-0">{new Date(notif.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">{notif.description}</p>
                      <p className="text-[10px] text-[#4F46E5] font-bold mt-1.5 uppercase tracking-tighter">
                        {Math.floor((new Date().getTime() - new Date(notif.createdAt).getTime()) / 60000)}m ago
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-xs font-bold text-gray-400">No new notifications</p>
                  </div>
                )}
              </div>
              <div className="p-3 bg-gray-50 text-center">
                <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">Clear All History</button>
              </div>
            </div>
          )}
        </div>
        <div className="h-8 w-[1px] bg-black/5 mx-2" />
        {isLoggedIn ? (
          <button className="flex items-center gap-3 p-1.5 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-black/5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white text-xs font-bold">
              AU
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-gray-900">Admin User</p>
              <p className="text-[10px] text-gray-500 font-medium tracking-tight">admin@agara.com</p>
            </div>
          </button>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl border border-black/5">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-bold text-gray-400 underline decoration-dotted">Secure Mode</span>
          </div>
        )}
        <div className="h-8 w-[1px] bg-black/5 mx-2" />
        <button 
          onClick={handleLogout}
          className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all flex items-center gap-2 group"
          title="Logout"
        >
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold hidden lg:block">Logout</span>
        </button>
      </div>

      {/* Help Modal */}
      {helpContent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-[40px] w-full max-w-lg shadow-2xl border border-white/20 overflow-hidden">
            <div className="p-8 border-b border-black/5 flex items-center justify-between bg-gray-50/50">
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">{helpContent.title}</h3>
              <button 
                onClick={() => setHelpContent(null)}
                className="w-10 h-10 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
              >
                <span className="text-2xl font-bold">&times;</span>
              </button>
            </div>
            <div className="p-10 text-sm">
              {helpContent.content}
            </div>
            <div className="p-8 bg-gray-50 border-t border-black/5 flex justify-end">
              <button 
                onClick={() => setHelpContent(null)}
                className="px-8 py-3 bg-[#4F46E5] text-white rounded-2xl text-sm font-black hover:bg-[#EA580C] transition-all shadow-lg shadow-indigo-600/20"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
