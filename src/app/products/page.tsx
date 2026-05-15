import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Products | Calu-Synthetics",
  description: "Browse the Calu-Synthetics product catalogue.",
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-metallic-50 min-h-screen py-16">
          <div className="container mx-auto px-4">
            <div className="metallic-card rounded-3xl p-10 border border-metallic-200 shadow-sm animate-pulse">
              <div className="h-8 w-64 bg-white/60 rounded mb-4" />
              <div className="h-4 w-[520px] max-w-full bg-white/40 rounded" />
            </div>
          </div>
        </div>
      }
    >
      <ProductsClient />
    </Suspense>
  );
}

