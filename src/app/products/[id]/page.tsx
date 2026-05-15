"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/mock-data";
import { getAssignedStockStatus, getStatusLabel } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import Tabs from "@/components/Tabs";
import ReviewsList from "@/components/ReviewsList";
import { getProductReviews } from "@/lib/reviews";

export default function ProductDetailPage() {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"specs" | "reviews" | "shipping">("specs");
  const params = useParams();
  const router = useRouter();
  
  const productIndex = products.findIndex((p) => p.id === params.id);
  const product = products[productIndex];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-metallic-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-industrial-900 mb-4">Product Not Found</h2>
          <button 
            onClick={() => router.push("/products")}
            className="px-6 py-2 bg-industrial-600 text-white font-bold rounded-lg"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const assignedStatus = getAssignedStockStatus(productIndex, products.length);
  const statusLabel = getStatusLabel(assignedStatus);
  const productReviews = getProductReviews(product.id);

  return (
    <div className="bg-metallic-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-metallic-400 mb-12">
          <Link href="/" className="hover:text-industrial-600">Home</Link>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/products" className="hover:text-industrial-600">Products</Link>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-industrial-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Image Section */}
          <div className="metallic-card rounded-3xl overflow-hidden relative aspect-square p-12 group bg-white">
            <Image
              src="/images/logo.png"
              alt={product.name}
              fill
              className="object-contain p-12 opacity-20"
            />
            <div className="absolute inset-0 flex items-center justify-center text-4xl font-black text-industrial-900/30 uppercase tracking-tighter">
              Industrial Image Placeholder
            </div>
            
            <div className="absolute top-8 left-8 flex flex-col gap-4">
              <div className="bg-industrial-950 text-white px-4 py-2 rounded-lg shadow-xl border border-industrial-800">
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Purity</p>
                <p className="text-lg font-bold tracking-tight">99.9% Research Grade</p>
              </div>
              <div className="bg-white/80 backdrop-blur-md text-industrial-900 px-4 py-2 rounded-lg shadow-xl border border-white/20">
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Minimum Order</p>
                <p className="text-lg font-mono font-bold tracking-tight">{product.minOrder ?? "—"}</p>
              </div>
              <div className="bg-white/80 backdrop-blur-md text-industrial-900 px-4 py-2 rounded-lg shadow-xl border border-white/20">
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">CAS Registry</p>
                <p className="text-lg font-mono font-bold tracking-tight">{product.casNumber}</p>
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col">
            <div className="mb-8 pb-8 border-b border-metallic-200">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-industrial-500 mb-4 inline-block">{product.category}</span>
              <h1 className="text-4xl md:text-5xl font-black text-industrial-950 mb-6 tracking-tight leading-none">{product.name}</h1>
              <p className="text-lg text-metallic-600 leading-relaxed mb-8">{product.description}</p>
              
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-black text-industrial-900">${product.price?.toLocaleString()}</span>
                <span className="text-metallic-500 line-through text-xl font-medium font-mono">${(product.price! * 1.25).toLocaleString()}</span>
                <span className="text-industrial-600 font-bold bg-industrial-100 px-3 py-1 rounded text-sm">-25% OFF</span>
              </div>
            </div>

            <div className="mb-12">
              <Tabs
                activeId={activeTab}
                onChange={setActiveTab}
                items={[
                  {
                    id: "specs",
                    label: "Specifications",
                    content: (
                      <div className="metallic-card rounded-2xl overflow-hidden border border-metallic-200 shadow-sm">
                        <table className="w-full text-left text-sm">
                          <tbody>
                            <tr className="border-b border-metallic-200">
                              <th className="px-6 py-4 bg-metallic-100 font-bold text-industrial-900 w-1/3">Density</th>
                              <td className="px-6 py-4 text-metallic-600 font-mono">{product.specifications.density}</td>
                            </tr>
                            <tr className="border-b border-metallic-200">
                              <th className="px-6 py-4 bg-metallic-100 font-bold text-industrial-900">Molar Mass</th>
                              <td className="px-6 py-4 text-metallic-600 font-mono">{product.specifications.molarMass}</td>
                            </tr>
                            <tr>
                              <th className="px-6 py-4 bg-metallic-100 font-bold text-industrial-900">Flash Point</th>
                              <td className="px-6 py-4 text-metallic-600 font-mono">{product.specifications.flashPoint}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ),
                  },
                  {
                    id: "reviews",
                    label: "Reviews",
                    content: (
                      <ReviewsList
                        title="Product Reviews"
                        subtitle="Only genuine, permissioned customer feedback is published."
                        items={productReviews}
                      />
                    ),
                  },
                  {
                    id: "shipping",
                    label: "Shipping",
                    content: (
                      <div className="metallic-card bg-white rounded-3xl p-8 border border-metallic-200 shadow-sm">
                        <h3 className="text-sm font-black uppercase tracking-widest text-industrial-900 mb-3">
                          Shipping Notes
                        </h3>
                        <ul className="text-sm text-metallic-600 space-y-2 leading-relaxed">
                          <li>Dispatch timing depends on availability status and destination.</li>
                          <li>Tracking is provided when available from the carrier.</li>
                          <li>Export documentation support is available upon request.</li>
                        </ul>
                        <p className="mt-5 text-xs text-metallic-500 font-bold">
                          See full policy:{" "}
                          <Link href="/shipping" className="text-industrial-700 hover:text-industrial-900 underline decoration-industrial-300">
                            Shipping & Returns
                          </Link>
                        </p>
                      </div>
                    ),
                  },
                ]}
              />
            </div>

            {/* Sales & Action Section */}
            <div className="flex flex-col gap-6 mt-auto">
              <div className={`flex items-center gap-4 p-4 rounded-xl border ${
                assignedStatus === 'IN_STOCK' ? 'bg-green-50 border-green-100' :
                assignedStatus === 'LOW_STOCK' ? 'bg-orange-50 border-orange-100' :
                'bg-red-50 border-red-100'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  assignedStatus === 'IN_STOCK' ? 'bg-green-500' :
                  assignedStatus === 'LOW_STOCK' ? 'bg-orange-500 animate-pulse' :
                  'bg-red-500'
                }`}></div>
                <p className={`text-sm ${
                  assignedStatus === 'IN_STOCK' ? 'text-green-800' :
                  assignedStatus === 'LOW_STOCK' ? 'text-orange-800' :
                  'text-red-800'
                }`}>
                  <span className="font-bold">{statusLabel}:</span> {
                    assignedStatus === 'IN_STOCK' ? 'Immediate dispatch available for Bangkok and international shipping.' :
                    assignedStatus === 'LOW_STOCK' ? 'Limited quantity available. Order soon to secure current pricing.' :
                    'Please contact our sales team for current lead times and availability.'
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => {
                    addToCart(product);
                    setJustAdded(true);
                    window.setTimeout(() => setJustAdded(false), 1500);
                  }}
                  className="flex items-center justify-center gap-3 px-8 py-5 bg-industrial-600 hover:bg-industrial-700 text-white font-black rounded-2xl transition-all shadow-2xl shadow-industrial-900/30 transform hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:cursor-default disabled:transform-none"
                  disabled={justAdded}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {justAdded ? "ADDED" : "ADD TO CART"}
                </button>
                <button className="px-8 py-5 bg-white hover:bg-metallic-50 text-industrial-900 font-black rounded-2xl border-2 border-industrial-900 transition-all shadow-lg">
                  REQUEST QUOTE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
