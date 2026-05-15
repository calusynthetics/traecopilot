import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { CartProvider } from "@/lib/cart-context";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Calu-Synthetics | Industrial Chemical Manufacturers",
  description: "Trusted Global Supply of Caluanie Muelear Oxidize and industrial chemicals.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <CartProvider>
          <Navbar />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <footer className="bg-industrial-950 text-white pt-16 pb-8">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="relative w-10 h-10 bg-white p-1 rounded">
                  <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
                </div>
                <span className="text-xl font-bold tracking-tight">CALU-SYNTHETICS</span>
              </div>
              <p className="text-industrial-400 max-w-md mb-6">
                Leading manufacturer and global supplier of high-grade industrial chemicals.
                Specializing in Caluanie Muelear Oxidize with ISO-certified production standards.
              </p>
              <div className="flex gap-4">
                {/* Social icons */}
              </div>
            </div>
            
            <div className="hidden md:block">
              <h4 className="font-bold mb-6 text-industrial-100 uppercase tracking-wider text-sm">Quick Links</h4>
              <ul className="space-y-4 text-industrial-400 text-sm">
                <li><Link href="/products" className="hover:text-white transition-colors">Product Offerings</Link></li>
                <li><Link href="/categories" className="hover:text-white transition-colors">Categories</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Company</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Request Quote</Link></li>
                <li><Link href="/#wholesale" className="hover:text-white transition-colors">Wholesale</Link></li>
              </ul>
            </div>
            
            <div className="hidden md:block">
              <h4 className="font-bold mb-6 text-industrial-100 uppercase tracking-wider text-sm">Legal & Quality</h4>
              <ul className="space-y-4 text-industrial-400 text-sm">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/iso" className="hover:text-white transition-colors">ISO Certification</Link></li>
                <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
                <li><Link href="/cancellation" className="hover:text-white transition-colors">Returns, Refunds & Cancellation Policies</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="container mx-auto px-4 mt-16 pt-8 border-t border-industrial-900 flex flex-col md:flex-row justify-between items-center text-xs text-industrial-500">
            <p>© 2026 Calu-Synthetics. All rights reserved. Bangkok, Thailand.</p>
            <p>Designed for Industrial Excellence</p>
          </div>
        </footer>
        </CartProvider>
      </body>
    </html>
  );
}
