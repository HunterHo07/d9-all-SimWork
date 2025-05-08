import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import FuturisticNavbar from "@/components/ui/FuturisticNavbar";
import FuturisticFooter from "@/components/ui/FuturisticFooter";
import { DeploymentBanner } from "@/components/ui/DeploymentBanner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SimulEx - The Future of Work Training",
  description: "Immersive AI-driven simulations that bridge the gap between learning and real-world performance.",
  keywords: "simulation, training, hiring, AI, immersive learning, skill development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <DeploymentBanner />
        <FuturisticNavbar />
        <main className="flex-grow">
          {children}
        </main>
        <FuturisticFooter />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
