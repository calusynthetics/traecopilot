"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { products, Product } from "@/lib/mock-data";
import { getAssignedStockStatus, getStatusLabel } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { motion, AnimatePresence } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function FeaturedProductsSlider() {
  const { addToCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  
  // Use all products for the slider to ensure a good infinite loop experience
  const featuredProducts = products;

  useEffect(() => {
    setMounted(true);
  }, []);

  const getStockBadge = (status: Product["stockStatus"]) => {
    const label = getStatusLabel(status);
    switch (status) {
      case "IN_STOCK":
        return (
          <span className="bg-white/90 backdrop-blur-sm text-green-700 text-[10px] font-bold px-2 py-1 rounded-sm border border-green-200 flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            {label}
          </span>
        );
      case "LOW_STOCK":
        return (
          <span className="bg-white/90 backdrop-blur-sm text-orange-700 text-[10px] font-bold px-2 py-1 rounded-sm border border-orange-200 flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
            {label}
          </span>
        );
      case "CONTACT":
        return (
          <span className="bg-white/90 backdrop-blur-sm text-red-700 text-[10px] font-bold px-2 py-1 rounded-sm border border-red-200 flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            {label}
          </span>
        );
      default:
        return null;
    }
  };

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-12">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg h-[400px] border border-gray-100 shadow-sm animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="pb-1 relative group max-w-[1600px] mx-auto px-2 md:px-16 w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        loop={true}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active !bg-industrial-600",
        }}
        autoplay={{ 
          delay: 3000, 
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        breakpoints={{
          // mobile screens
          320: { 
            slidesPerView: 1,
            spaceBetween: 20
          },
          // tablet
          640: { 
            slidesPerView: 2,
            spaceBetween: 24
          },
          // desktop
          1024: { 
            slidesPerView: 4,
            spaceBetween: 24
          },
          // large desktop
          1440: {
            slidesPerView: 5,
            spaceBetween: 24
          }
        }}
        className="pb-2"
      >
        {featuredProducts.map((product, index) => {
          const displayStatus = getAssignedStockStatus(index, products.length);
          return (
            <SwiperSlide key={`${product.id}-${index}`} className="h-full flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden flex flex-col h-full border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group/card w-full max-w-[320px] mx-auto"
              >
                {/* Professional Grey-scale Placeholder */}
                <div className="relative h-56 bg-[#F5F5F5] flex items-center justify-center overflow-hidden shrink-0">
                  <div className="absolute inset-0 opacity-[0.03] grayscale bg-[url('/images/logo.png')] bg-center bg-no-repeat bg-contain p-12"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-16 h-16 border-2 border-gray-200 rounded-full flex items-center justify-center mb-2">
                      <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Industrial Grade</span>
                  </div>
                  
                  {/* Availability Label */}
                  <div className="absolute top-4 right-4 z-20">
                    {getStockBadge(displayStatus)}
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <div className="mb-4">
                    <p className="text-[10px] font-black text-industrial-600 uppercase tracking-[0.3em] mb-1">
                      {product.category}
                    </p>
                    <h3 className="text-lg font-black text-gray-950 mb-1 line-clamp-1 tracking-tight">
                      {product.name}
                    </h3>
                  </div>

                  {/* Properties List - Clean Typography */}
                  <div className="space-y-3 mb-6 flex-grow">
                    <div className="flex justify-between items-center text-[11px] border-b border-gray-100 pb-2">
                      <span className="text-gray-400 font-bold uppercase tracking-wider">CAS Number</span>
                      <span className="text-gray-900 font-bold font-mono">{product.casNumber}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] border-b border-gray-100 pb-2">
                      <span className="text-gray-400 font-bold uppercase tracking-wider">Density</span>
                      <span className="text-gray-900 font-bold">{product.specifications.density}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] border-b border-gray-100 pb-2">
                      <span className="text-gray-400 font-bold uppercase tracking-wider">Molar Mass</span>
                      <span className="text-gray-900 font-bold">{product.specifications.molarMass}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 mt-auto">
                    <Link
                      href={`/products/${product.id}`}
                      className="text-[10px] font-black text-gray-500 hover:text-industrial-600 transition-colors uppercase tracking-[0.2em] flex items-center gap-1 group/link"
                    >
                      View Specs
                      <svg className="w-3 h-3 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <button
                      onClick={() => {
                        addToCart(product);
                        setAddedProductId(product.id);
                        window.setTimeout(() => setAddedProductId(null), 1500);
                      }}
                      disabled={addedProductId === product.id}
                      className="px-5 py-2.5 bg-industrial-950 text-white text-[10px] font-black rounded-sm hover:bg-industrial-800 transition-all uppercase tracking-[0.2em] disabled:opacity-50 shadow-md active:scale-95"
                    >
                      {addedProductId === product.id ? "Added" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Sleek Minimalist Chevron Arrows */}
      <button className="swiper-button-prev-custom absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-industrial-600 transition-all group/btn">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transition-transform group-hover/btn:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button className="swiper-button-next-custom absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-industrial-600 transition-all group/btn">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #E5E7EB !important;
          opacity: 1 !important;
          width: 6px !important;
          height: 6px !important;
          transition: all 0.3s ease !important;
          border-radius: 0 !important;
        }
        .swiper-pagination-bullet-active {
          background: #0b3c6d !important;
          width: 20px !important;
        }
      `}</style>
    </div>
  );
}
