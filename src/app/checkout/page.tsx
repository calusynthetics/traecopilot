"use client";

import { useCart } from "@/lib/cart-context";
import OrderForm from "@/components/OrderForm";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();

  const initialItems = cart.map(item => ({
    name: item.name,
    quantity: item.quantity,
    price: item.price || 0
  }));

  if (cart.length === 0) {
    return (
      <div className="bg-metallic-50 min-h-screen py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-industrial-950 mb-4">Your cart is empty</h1>
          <p className="text-metallic-600 mb-10">Add items before submitting a purchase request.</p>
          <Link
            href="/products"
            className="px-8 py-4 bg-industrial-600 text-white font-bold rounded-lg hover:bg-industrial-700 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-metallic-50 min-h-screen py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-industrial-950 mb-4 tracking-tight uppercase">Purchase Request</h1>
          <p className="text-industrial-600 font-bold tracking-widest uppercase text-xs">Individuals and businesses welcome</p>
        </div>

        <OrderForm 
          initialItems={initialItems} 
          onReceiptExit={clearCart}
        />
      </div>
    </div>
  );
}
