import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="min-h-screen bg-[#0F172A]">
        {children}
      </main>
      <Footer />
    </SmoothScroll>
  );
}
