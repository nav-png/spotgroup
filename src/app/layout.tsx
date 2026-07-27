import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";

import { CookieConsent } from "@/components/layout/cookie-consent";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { site } from "@/lib/site";

import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["600", "700", "800"],
});

const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Lower Mainland Real Estate`,
    template: `%s | ${site.name}`,
  },
  description:
    "SPOT Group — Lower Mainland real estate consultants. Resale homes, development land, new construction and firm cash offers on as-is properties.",
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_CA",
    title: `${site.name} | Lower Mainland Real Estate`,
    description:
      "Resale homes, development land, new construction and firm cash offers on as-is properties across the Lower Mainland.",
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Lower Mainland Real Estate`,
    description:
      "Resale homes, development land, new construction and firm cash offers on as-is properties across the Lower Mainland.",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${archivo.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <CookieConsent />
      </body>
    </html>
  );
}
