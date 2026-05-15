"use client";

import { useState, useEffect, useCallback } from "react";
import { Star, StarHalf, BadgeCheck, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import type { Review } from "@/lib/reviews";
import { motion, AnimatePresence } from "framer-motion";

function Stars({ rating }: { rating: Review["rating"] }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => {
        if (index < fullStars) {
          return (
            <Star
              key={index}
              size={16}
              className="text-cyan-500 fill-cyan-500"
            />
          );
        } else if (index === fullStars && hasHalfStar) {
          return (
            <StarHalf
              key={index}
              size={16}
              className="text-cyan-500 fill-cyan-500"
            />
          );
        } else {
          return (
            <Star
              key={index}
              size={16}
              className="text-metallic-300"
            />
          );
        }
      })}
    </div>
  );
}

export default function ReviewsList({
  title = "Customer Reviews",
  subtitle = "Published feedback from verified customers and documented inquiries.",
  items,
}: {
  title?: string;
  subtitle?: string;
  items: Review[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (!isAutoPlaying || items.length <= 1) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, items.length]);

  if (items.length === 0) {
    return (
      <div className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
        <p className="text-metallic-600 leading-relaxed text-center">
          No reviews are published yet. Add genuine customer feedback to <span className="font-mono font-bold text-industrial-900">src/lib/reviews.ts</span> and they will appear here automatically.
        </p>
      </div>
    );
  }

  const currentReview = items[currentIndex];

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-5xl font-black text-industrial-950 tracking-tight leading-tight">{title}</h2>
        <p className="text-metallic-600 leading-relaxed max-w-2xl mx-auto text-base md:text-lg">{subtitle}</p>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-12 group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentReview.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="metallic-card bg-white rounded-[2.5rem] p-8 md:p-16 border border-metallic-200 shadow-xl relative overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center space-y-8">
              <div className="flex flex-col items-center gap-4">
	                <Stars rating={currentReview.rating} />
	                <h3 className="text-2xl md:text-3xl font-black text-industrial-950 leading-tight tracking-tight">
	                  &quot;{currentReview.title}&quot;
	                </h3>
	              </div>

              <blockquote className="text-lg md:text-2xl text-metallic-600 leading-relaxed font-medium italic max-w-3xl">
                {currentReview.body}
              </blockquote>

              <div className="pt-8 border-t border-metallic-100 w-full flex flex-col items-center space-y-4">
                <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 text-sm md:text-base font-bold text-metallic-600">
                  <span className="text-industrial-900 font-black">{currentReview.authorName}</span>
                  {currentReview.authorCompany && <span className="hidden sm:inline">•</span>}
                  {currentReview.authorCompany && <span className="text-industrial-600">{currentReview.authorCompany}</span>}
                  {currentReview.authorLocation && <span className="hidden sm:inline">•</span>}
                  {currentReview.authorLocation && <span>{currentReview.authorLocation}</span>}
                </div>

                <div className="flex items-center gap-6">
                  {currentReview.verifiedPurchase && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-[10px] font-black uppercase tracking-[0.2em]">
                      <BadgeCheck size={14} className="text-cyan-600" />
                      Verified Industrial Order
                    </div>
                  )}
                  {currentReview.sourceLabel && (
                    <div className="text-[11px] text-metallic-400 font-bold uppercase tracking-widest">
                      {currentReview.sourceLabel}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 w-12 h-12 rounded-full bg-white border border-metallic-200 shadow-lg flex items-center justify-center text-industrial-900 hover:bg-industrial-50 hover:text-cyan-600 transition-all z-20"
          aria-label="Previous review"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 w-12 h-12 rounded-full bg-white border border-metallic-200 shadow-lg flex items-center justify-center text-industrial-900 hover:bg-industrial-50 hover:text-cyan-600 transition-all z-20"
          aria-label="Next review"
        >
          <ChevronRight size={24} />
        </button>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-8 bg-cyan-500" : "w-2 bg-metallic-200 hover:bg-metallic-300"
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
