import Link from 'next/link';
import { Button } from '@/components/Button';
import { ArrowLeft, Home, Search, MessageSquare } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_20%_30%,_#4F46E5_0%,_transparent_50%)]"></div>
      <div className="absolute bottom-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_80%_70%,_#4F46E5_0%,_transparent_50%)]"></div>

      <div className="max-w-2xl w-full text-center relative z-10">
        <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#4F46E5] text-xs font-bold uppercase tracking-widest mb-8">
          Error 404
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          Page <span className="text-[#4F46E5]">Not Found</span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl mb-12 leading-relaxed max-w-lg mx-auto">
          The software architectural layer you are looking for does not exist or has been shifted to a new endpoint.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto mb-16">
          <Link href="/" className="group">
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 hover:border-[#4F46E5]/30 transition-all duration-300 text-left">
              <Home className="w-8 h-8 text-[#4F46E5] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-bold mb-1">Return Home</h3>
              <p className="text-gray-500 text-sm">Back to our main system</p>
            </div>
          </Link>
          
          <Link href="/services" className="group">
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 hover:border-[#4F46E5]/30 transition-all duration-300 text-left">
              <Search className="w-8 h-8 text-[#4F46E5] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-bold mb-1">Explore Services</h3>
              <p className="text-gray-500 text-sm">Find the right solution</p>
            </div>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button href="/" variant="primary" size="lg" className="w-full sm:w-auto px-12 rounded-2xl">
            <ArrowLeft className="mr-2 w-5 h-5" />
            Go Back
          </Button>
          
          <Link href="/get-started" className="flex items-center text-white font-bold hover:text-[#4F46E5] transition-colors group">
            <MessageSquare className="mr-2 w-5 h-5 text-[#4F46E5]" />
            Report an issue
          </Link>
        </div>
      </div>

      <div className="absolute bottom-12 left-0 w-full text-center">
        <p className="text-gray-600 text-xs font-medium tracking-widest uppercase">
          AgaraX Engineering Ecosystem
        </p>
      </div>
    </div>
  );
}
