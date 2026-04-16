import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { JsonLd, WEBSITE_SCHEMA, LOCAL_BUSINESS_SCHEMA } from "@/components/JsonLd";
// import { SmoothScroll } from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgaraX | Engineering Scalable Digital Products",
  description: "We build enterprise-grade software solutions that drive growth, enhance efficiency, and transform businesses globally.",
  icons: {
    icon: "/logo-v3.png",
  },
};

export const viewport = {
  themeColor: "#4F46E5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} antialiased min-h-screen bg-slate-50 overflow-x-hidden`} suppressHydrationWarning>
        {/* <SmoothScroll> */}
          <JsonLd type="WebSite" data={WEBSITE_SCHEMA} />
          <JsonLd type="LocalBusiness" data={LOCAL_BUSINESS_SCHEMA} />
          {/* GA4 Setup */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=G-H7ZQX3RQX9`}
            strategy="afterInteractive"
          />
          <Script id="ga" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-H7ZQX3RQX9');
            `}
          </Script>
          {/* Microsoft Clarity */}
          <Script id="clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "q7j8x9k0l1");
            `}
          </Script>
          {children}
        {/* </SmoothScroll> */}
      </body>
    </html>
  );
}
