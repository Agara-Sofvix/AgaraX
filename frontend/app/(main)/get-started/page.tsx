import { Suspense } from "react";
import { GetStartedClient } from "@/components/GetStartedClient";
import { PAGE_SEO } from "@/lib/seo/pageMapping";

export const metadata = PAGE_SEO.getStarted;

export default function GetStartedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gemini-light flex items-center justify-center">Loading...</div>}>
      <GetStartedClient />
    </Suspense>
  );
}
