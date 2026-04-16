'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Lock, Mail, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';

import { getApiUrl } from '@/lib/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;

    try {
      const apiUrl = getApiUrl();
      const res = await fetch(`${apiUrl}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      // Robust Response Check (as suggested by user)
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Non-JSON response received:", text);
        // If it's HTML, it's likely a 502/404 from Nginx
        if (text.includes("<html")) {
          throw new Error("Server error (Nginx/HTML). Please check backend logs.");
        }
        throw new Error("Server returned non-JSON response.");
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Set cookie (expires in 24 hours)
      const expires = new Date();
      expires.setTime(expires.getTime() + (24 * 60 * 60 * 1000));
      document.cookie = `admin_token=${data.token}; expires=${expires.toUTCString()}; path=/`;

      router.push('/admin');
    } catch (err: any) {
      console.error("Login process failure:", err);
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Aesthetics */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#4F46E5]/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-500/10 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 lg:p-12 shadow-2xl relative z-10">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-br from-[#4F46E5] to-[#FB923C] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#4F46E5]/20">
              <ShieldCheck className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight mb-2">Admin Portal</h1>
            <p className="text-slate-400 font-medium">Please sign in to access management suite.</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-bold text-center"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Work Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  required
                  name="email"
                  type="email" 
                  placeholder="Authorized Access Only"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-[#4F46E5] focus:bg-white/10 transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Secure Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  required
                  name="password"
                  type={showPassword ? "text" : "password"} 
                  placeholder="*********"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-white focus:outline-none focus:border-[#4F46E5] focus:bg-white/10 transition-all font-medium"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 text-[#4F46E5] focus:ring-offset-0 focus:ring-[#4F46E5]" />
                <span className="text-sm text-slate-400 group-hover:text-white transition-colors font-medium">Remember me</span>
              </label>
              <button type="button" className="text-sm text-slate-500 hover:text-[#4F46E5] transition-colors font-bold">Forgot Access?</button>
            </div>

            <button 
              disabled={isLoading}
              className="w-full bg-[#4F46E5] text-white rounded-2xl py-4 font-black flex items-center justify-center gap-2 hover:bg-[#EA580C] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-[#4F46E5]/20"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </div>
              ) : (
                <>
                  Enter Dashboard
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm font-medium">
            Protected by Agara Identity Services. 
            <br />
            &copy; 2026 AgaraX Inc. All rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
