import { CareersClient } from "@/components/CareersClient";
import { Suspense } from "react";
import Loading from "../loading";
import { PAGE_SEO } from "@/lib/seo/pageMapping";

import { getApiUrl } from "@/lib/api";

export const metadata = PAGE_SEO.careers;

async function getJobs() {
  const apiUrl = getApiUrl();
  try {
    const res = await fetch(`${apiUrl}/api/jobs`, {
      next: { revalidate: 60 }
    });
    
    // Check if the response is successful and is JSON
    const contentType = res.headers.get("content-type");
    if (!res.ok || !contentType || !contentType.includes("application/json")) {
      console.error('Failed to fetch jobs:', res.status, res.statusText);
      return [];
    }
    
    return res.json();
  } catch (error) {
    console.error('Network error during jobs fetch:', error);
    return [];
  }
}

async function CareersList() {
  const jobs = await getJobs();
  return <CareersClient initialJobs={jobs} />;
}

export default function CareersPage() {
  return (
    <Suspense fallback={<Loading />}>
      <CareersList />
    </Suspense>
  );
}
