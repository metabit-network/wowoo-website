import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Wowoo",
  description:
    "Wowoo token powered by Optimism. Learn about our tokenomics, whitepaper, and roadmap.",
  keywords: [
    "Wowoo",
    "token",
    "Optimism",
    "blockchain",
    "cryptocurrency",
    "WWB",
  ],
  authors: [{ name: "Wowoo Team" }],
  creator: "Wowoo",
  publisher: "Wowoo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://wowoonet.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "Wowoo - Your Token Gateway",
    description:
      "Discover Wowoo token, powered by Optimism. View token info, scan contract, download whitepaper.",
    url: "https://wowoonet.com",
    siteName: "Wowoo",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "Wowoo Token",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wowoo - Your Token Gateway",
    description:
      "Discover Wowoo token and join the future of Optimism-powered tokens.",
    images: ["/image.png"],
    creator: "@WowooHQ",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/image.png",
    shortcut: "/image.png",
    apple: "/image.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
