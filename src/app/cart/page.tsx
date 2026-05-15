"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { useRef } from "react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const orderSummaryRef = useRef<HTMLDivElement | null>(null);

  if (cart.length === 0) {
    return (
      <div className="bg-metallic-50 min-h-screen py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="w-24 h-24 bg-metallic-200 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-metallic-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-industrial-950 mb-4">Your cart is empty</h1>
          <p className="text-metallic-600 mb-12">Looks like you have not added any industrial chemicals to your order yet.</p>
          <Link href="/products" className="px-8 py-4 bg-industrial-600 text-white font-bold rounded-lg hover:bg-industrial-700 transition-colors">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-metallic-50 min-h-screen py-16">
      <button
        type="button"
        onClick={() => orderSummaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 lg:hidden px-6 py-3 rounded-full bg-industrial-900 text-white font-black text-xs uppercase tracking-widest shadow-2xl shadow-industrial-900/30 border border-white/10"
      >
        View Order Summary
      </button>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-black text-industrial-950 mb-12 tracking-tight">Industrial Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="metallic-card rounded-2xl p-4 sm:p-6 flex flex-row gap-4 sm:gap-6 items-center relative">
                <div className="relative w-16 h-16 sm:w-24 sm:h-24 bg-white rounded-xl overflow-hidden p-2 flex-shrink-0 border border-metallic-100">
                  <Image src="/images/logo.png" alt={item.name} fill className="object-contain opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center text-[6px] sm:text-[8px] font-bold text-industrial-900/40 uppercase text-center p-1">
                    Chemical Product
                  </div>
                </div>
                
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-lg font-bold text-industrial-900 leading-tight truncate">{item.name}</h3>
                      <p className="text-[10px] sm:text-xs text-metallic-500 font-mono">CAS: {item.casNumber}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-metallic-400 hover:text-red-500 transition-colors p-1 flex-shrink-0"
                      aria-label="Remove item"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2 sm:mt-4 gap-2">
                    <div className="flex items-center gap-2 sm:gap-4 bg-metallic-100 rounded-lg p-0.5 sm:p-1 border border-metallic-200">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-white rounded shadow-sm text-industrial-900 hover:bg-industrial-50 transition-colors font-bold text-xs sm:text-base"
                      >
                        -
                      </button>
                      <span className="font-bold text-industrial-900 w-4 sm:w-8 text-center text-xs sm:text-base">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-white rounded shadow-sm text-industrial-900 hover:bg-industrial-50 transition-colors font-bold text-xs sm:text-base"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-base sm:text-xl font-black text-industrial-900">${((item.price || 0) * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div ref={orderSummaryRef} className="metallic-card rounded-2xl p-8 sticky top-32 border border-metallic-300 shadow-xl">
              <h2 className="text-xl font-bold text-industrial-950 mb-8 pb-4 border-b border-metallic-200">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-metallic-600">
                  <span>Subtotal</span>
                  <span className="font-mono">${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-metallic-600">
                  <span>Shipping</span>
                  <span className="text-industrial-600 font-bold uppercase text-xs tracking-widest">Calculated at Checkout</span>
                </div>
                <div className="flex justify-between text-metallic-600">
                  <span>Tax (VAT)</span>
                  <span className="text-industrial-600 font-bold uppercase text-xs tracking-widest">Exempt / Export</span>
                </div>
                <div className="pt-4 border-t border-metallic-200 flex justify-between items-baseline">
                  <span className="text-lg font-bold text-industrial-950">Total</span>
                  <span className="text-3xl font-black text-industrial-900">${cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <Link href="/checkout" className="block w-full text-center px-8 py-4 bg-industrial-600 hover:bg-industrial-700 text-white font-black rounded-xl transition-all shadow-lg shadow-industrial-900/20 transform hover:-translate-y-1">
                PROCEED TO CHECKOUT
              </Link>
              
              <p className="text-[10px] text-metallic-500 mt-6 text-center uppercase tracking-widest font-bold">
                ISO 9001 Certified Secure Transaction
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
