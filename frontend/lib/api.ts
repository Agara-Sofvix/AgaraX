export function getApiUrl() {
  // 1. Server-side (SSR/Prerendering)
  if (typeof window === 'undefined') {
    // Inside Docker (EC2), we should use the service name.
    // We check for a specific environment variable or fallback to 127.0.0.1 for development.
    return process.env.INTERNAL_API_URL || 'http://127.0.0.1:5000';
  }

  // 2. Explicit environment variable override (for browser)
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // 3. Client-side dynamic resolution (browser fallback)
  // We always use relative paths in the browser to go through Nginx
  return '';
}
