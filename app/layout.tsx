import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Wowoo 2.0",
    description:
      "Discover Wowoo Token powered by Optimism. Explore our tokenomics, roadmap, whitepaper, and how we're shaping the future of decentralized finance.",
  };
}

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  keywords: [
    "Wowoo",
    "token",
    "OptimismScan",
    "Wowbit Token",
    "Wowbit",
    "WWB",
    "WowooNet",
    "Wowoo 2.0",
    "Wowoo 2.0 Token",
    "Optimism",
    "Optimism Network",
    "Whitepaper",
    "0x03cc5feF38896537c10Fcb30A53A1B12be101da6",
    "Happiness",
    "scroll",
    "explore",
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
    canonical: "https://wowoonet.com",
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
