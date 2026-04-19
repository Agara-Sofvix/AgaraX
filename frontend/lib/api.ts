export function getApiUrl() {
  // Server-side (Docker / SSR)
  if (typeof window === "undefined") {
    return process.env.INTERNAL_API_URL || "http://backend:5000";
  }

  // Client-side (browser)
  return process.env.NEXT_PUBLIC_API_URL || "";
}
