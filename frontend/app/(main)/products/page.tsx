import { ProductsClient } from "@/components/ProductsClient";
import { PAGE_SEO } from "@/lib/seo/pageMapping";
import { Suspense } from "react";
import { getApiUrl } from "@/lib/api";

export const metadata = PAGE_SEO.products;

async function getCategories() {
  const apiUrl = getApiUrl();
  try {
    const res = await fetch(`${apiUrl}/api/categories`, { 
      cache: 'no-store' // Ensure we get fresh data from DB
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export default async function ProductsPage() {
  const initialCategories = await getCategories();

  return (
    <Suspense fallback={<div className="min-h-screen bg-gemini-light flex items-center justify-center">Loading...</div>}>
      <ProductsClient initialCategories={initialCategories} />
    </Suspense>
  );
}
