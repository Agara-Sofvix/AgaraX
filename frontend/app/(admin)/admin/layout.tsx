import { Suspense } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-[#F8FAFC] min-h-screen text-slate-900 selection:bg-[#4F46E5]/20">
      {/* Fixed Sidebar */}
      <AdminSidebar />
      
      {/* Main Content Area */}
      <div className="flex-grow flex flex-col h-screen overflow-hidden">
        <Suspense fallback={<div className="h-16 bg-white border-b border-black/5" />}>
          <AdminTopbar />
        </Suspense>
        
        {/* Scrollable Page Content */}
        <main className="flex-grow overflow-y-auto overflow-x-hidden">
          <div className="p-4 md:p-8 lg:p-12 max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
