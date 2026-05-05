import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CustomCursor from "@/components/CustomCursor";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: {
    default: "Forever Bali Villas — Luxury Private Villas in Bali",
    template: "%s | Forever Bali Villas",
  },
  description:
    "Experience the art of slow living at Forever Bali Villas. Two exquisite private villas — Forever Santai and Forever Pandawa — nestled in the heart of Bali.",
  keywords: [
    "Bali villas",
    "luxury villa Bali",
    "private villa Bali",
    "Forever Santai",
    "Forever Pandawa",
    "Nusa Dua villa",
    "Bali accommodation",
  ],
  authors: [{ name: "Forever Bali Villas" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Forever Bali Villas",
    title: "Forever Bali Villas — Luxury Private Villas in Bali",
    description:
      "Experience the art of slow living at Forever Bali Villas. Two exquisite private villas in the heart of Bali.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Forever Bali Villas",
    description: "Luxury private villas in Bali — where tradition meets modern luxury.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        <Header />
        <main>{children}</main>
        <WhatsAppButton />
        <ScrollReveal />
      </body>
    </html>
  );
}
