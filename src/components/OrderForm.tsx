"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Printer, Mail, User, Package, Hash, Building, Phone, MapPin, Download, Search, ChevronDown, X } from "lucide-react";
import { EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATES } from "@/lib/emailjs";
import { BRAND, getPublicAssetUrl } from "@/lib/branding";
import { countries } from "@/lib/countries";

interface OrderFormProps {
  initialItems?: { name: string; quantity: number; price: number }[];
  onSuccess?: () => void;
  onReceiptExit?: () => void;
}

const LOGO_URL = BRAND.logoPath;

const formatMoney = (value: number) =>
  value.toLocaleString(undefined, { style: "currency", currency: "USD" });

/**
 * Generates a professional HTML invoice for email clients.
 */
const generateInvoiceHTML = (orderId: string, formData: any, items: any[]) => {
  const escapeHtml = (value: unknown) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const date = new Date().toLocaleDateString();
  const logoUrl = BRAND.emailLogoUrl;
  const total = items.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  const specialRequest =
    typeof formData.specialRequest === "string" ? formData.specialRequest.trim() : "";

  const safeCustomerName = escapeHtml(formData.name || "Customer");
  const safeEmail = escapeHtml(formData.email);
  const safeCompany = escapeHtml(formData.company);
  const safePhone = escapeHtml(formData.phone);
  const safeSpecialRequest = escapeHtml(specialRequest);

  const shippingAddress = [
    formData.address && `Street: ${escapeHtml(formData.address)}`,
    formData.city && `Town / City: ${escapeHtml(formData.city)}`,
    formData.stateRegion && `State / Region: ${escapeHtml(formData.stateRegion)}`,
    formData.country && `Country: ${escapeHtml(formData.country)}`,
  ]
    .filter(Boolean)
    .join("<br />");

  const specialRequestHTML = specialRequest
    ? `
        <div style="margin: 0 0 30px 0; background-color: #fff7ed; padding: 18px 20px; border-radius: 12px; border: 1px solid #fed7aa;">
          <p style="margin: 0 0 8px 0; font-size: 10px; color: #9a3412; font-weight: 900; text-transform: uppercase; letter-spacing: 1.5px;">Special Request</p>
          <p style="margin: 0; font-size: 13px; color: #7c2d12; line-height: 1.6; white-space: pre-wrap;">${safeSpecialRequest}</p>
        </div>
      `
    : "";

  const itemsHTML = items
    .map((item) => {
      const unitPrice = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      const lineTotal = unitPrice * quantity;
      const showPrices = unitPrice > 0;

      return `
    <tr>
      <td style="padding: 20px; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0; font-size: 16px; font-weight: bold; color: #0b1e33;">${escapeHtml(item.name)}</p>
        <p style="margin: 5px 0 0 0; font-size: 11px; color: #64748b; font-weight: bold; text-transform: uppercase;">Requested Item</p>
      </td>
      <td style="padding: 20px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 20px; font-weight: 900; color: #0d84eb;">
        ${quantity}
      </td>
      <td style="padding: 20px; border-top: 1px solid #e5e7eb; text-align: right; font-size: 14px; font-weight: 800; color: #0b1e33;">
        ${showPrices ? formatMoney(unitPrice) : "TBD"}
      </td>
      <td style="padding: 20px; border-top: 1px solid #e5e7eb; text-align: right; font-size: 14px; font-weight: 900; color: #0b1e33;">
        ${showPrices ? formatMoney(lineTotal) : "TBD"}
      </td>
    </tr>
  `;
    })
    .join("");

  return `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden;">
      <!-- Header -->
      <div style="background-color: #0b1e33; padding: 40px; text-align: center; border-bottom: 4px solid #0d84eb;">
        <div style="background-color: #ffffff; padding: 10px; border-radius: 8px; display: inline-block; margin-bottom: 20px;">
          <img src="${logoUrl}" alt="Calu-Synthetics" style="height: 50px; width: auto; display: block;" />
        </div>
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: -0.5px; font-weight: 900;">Purchase Request Confirmation</h1>
        <p style="color: #94a3b8; margin: 10px 0 0 0; font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase;">Calu-Synthetics Sales Desk</p>
      </div>

      <!-- Info Strip -->
      <div style="background-color: #f8fafc; padding: 20px 40px; border-bottom: 1px solid #e5e7eb;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td>
              <p style="margin: 0; font-size: 10px; color: #64748b; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Order Identifier</p>
              <p style="margin: 5px 0 0 0; font-size: 18px; color: #0d84eb; font-weight: bold; font-family: monospace;">${orderId}</p>
            </td>
            <td style="text-align: right;">
              <p style="margin: 0; font-size: 10px; color: #64748b; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Date Issued</p>
              <p style="margin: 5px 0 0 0; font-size: 14px; color: #1e293b; font-weight: bold;">${date}</p>
            </td>
          </tr>
        </table>
      </div>

	      <!-- Details -->
	      <div style="padding: 40px;">
	        <p style="margin: 0 0 20px 0; font-size: 13px; color: #475569; line-height: 1.6;">
	          Dear ${safeCustomerName},<br />
	          Thank you for your purchase request. Our team will review your submission and respond with availability, shipping options, and a final quotation.
	        </p>
	        <table style="width: 100%; border-collapse: collapse; margin-bottom: 40px;">
	          <tr>
	            <td style="width: 50%; vertical-align: top; padding-right: 20px;">
	              <h3 style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #64748b; margin: 0 0 15px 0; font-weight: 900;">Customer Details</h3>
	              <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Name:</strong> ${safeCustomerName}</p>
	              <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Email:</strong> ${safeEmail}</p>
	              ${formData.company ? `<p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Company:</strong> ${safeCompany}</p>` : ""}
	              ${formData.phone ? `<p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Phone:</strong> ${safePhone}</p>` : ""}
	            </td>
	            <td style="width: 50%; vertical-align: top; background-color: #f1f5f9; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
	              <h3 style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #64748b; margin: 0 0 10px 0; font-weight: 900;">Shipping Location</h3>
	              <p style="margin: 0; font-size: 13px; color: #475569; line-height: 1.6; white-space: pre-wrap;">${shippingAddress || "Shipping details not provided."}</p>
	            </td>
	          </tr>
	        </table>

          ${specialRequestHTML}

	        <!-- Product Table -->
	        <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
	          <thead>
	            <tr style="background-color: #f1f5f9;">
              <th style="padding: 15px 20px; text-align: left; font-size: 10px; text-transform: uppercase; color: #64748b; font-weight: 900;">Product</th>
              <th style="padding: 15px 20px; text-align: center; font-size: 10px; text-transform: uppercase; color: #64748b; font-weight: 900;">Qty</th>
              <th style="padding: 15px 20px; text-align: right; font-size: 10px; text-transform: uppercase; color: #64748b; font-weight: 900;">Unit</th>
              <th style="padding: 15px 20px; text-align: right; font-size: 10px; text-transform: uppercase; color: #64748b; font-weight: 900;">Line Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td></td>
            <td style="text-align: right;">
              <p style="margin: 0; font-size: 10px; color: #64748b; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Estimated Total</p>
              <p style="margin: 6px 0 0 0; font-size: 18px; color: #0b1e33; font-weight: 900;">
                ${total > 0 ? formatMoney(total) : "To be confirmed"}
              </p>
              <p style="margin: 6px 0 0 0; font-size: 11px; color: #64748b;">
                Final pricing may vary based on shipping, destination, and availability.
              </p>
            </td>
          </tr>
        </table>

        <!-- Next Steps -->
        <div style="margin-top: 40px; padding: 25px; background-color: #eff6ff; border-radius: 12px; border: 1px solid #bfdbfe;">
          <p style="margin: 0 0 10px 0; font-size: 14px; font-weight: bold; color: #1e40af;">Processing Status: Queued</p>
          <p style="margin: 0; font-size: 12px; color: #1e40af; line-height: 1.5; opacity: 0.8;">
            Thank you for your purchase request. Our team will verify availability and shipping options. A formal quotation and payment instructions will be sent to your email within 24 business hours.
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="padding: 30px; text-align: center; background-color: #f8fafc; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0; font-size: 10px; font-weight: bold; color: #94a3b8; text-transform: uppercase; letter-spacing: 3px;">Calu-Synthetics Bangkok</p>
        <p style="margin: 5px 0 0 0; font-size: 10px; color: #cbd5e1;">Global Chemical Solutions & Distribution</p>
      </div>
    </div>
  `;
};

export default function OrderForm({ initialItems = [], onSuccess, onReceiptExit }: OrderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId] = useState(`PO-${Math.floor(100000 + Math.random() * 900000)}`);
  
  // Store items in state to handle dynamic form changes if needed
  const [orderItems, setOrderItems] = useState(initialItems);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    stateRegion: "",
    country: "",
    specialRequest: "",
    // Only used if orderItems is empty (manual entry)
    product: "",
    quantity: 1,
  });

  const invoiceRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  const [countrySearch, setCountrySearch] = useState("");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  const filteredCountries = useMemo(() => {
    return countries.filter((c) =>
      c.toLowerCase().includes(countrySearch.toLowerCase())
    );
  }, [countrySearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Use manually entered product if orderItems is empty
      const finalItems = orderItems.length > 0 
        ? orderItems 
        : [{ name: formData.product, quantity: formData.quantity, price: 0 }];

      const invoiceHTML = generateInvoiceHTML(orderId, formData, finalItems);
      
      const templateParams = {
        message: invoiceHTML,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATES.internalNotification,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATES.autoReply,
          {
            to_name: formData.name,
            to_email: formData.email,
            order_id: orderId,
            message: invoiceHTML,
          },
          EMAILJS_PUBLIC_KEY
        );
      } catch (autoReplyError) {
        console.error("Failed to send auto-reply:", autoReplyError);
      }
      
      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Failed to send order:", error);
      alert("Failed to send order. Please try again or contact support.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const checkoutItems =
    orderItems.length > 0
      ? orderItems
      : [{ name: formData.product, quantity: formData.quantity, price: 0 }];

  const checkoutTotal = checkoutItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  const receiptItems =
    orderItems.length > 0
      ? orderItems
      : [{ name: formData.product, quantity: formData.quantity, price: 0 }];

  const receiptTotal = receiptItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-metallic-200 print:shadow-none print:border-none" ref={invoiceRef}>
          {/* Invoice Header */}
          <div className="bg-industrial-950 p-8 md:p-12 text-white flex flex-col md:flex-row justify-between items-start gap-8 border-b-4 border-industrial-500">
            <div>
              <div className="bg-white p-3 rounded-xl inline-block mb-6 shadow-xl">
                <img src={LOGO_URL} alt="Calu-Synthetics" className="h-12 w-auto object-contain" />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter">Purchase Order Confirmation</h2>
              <p className="text-industrial-400 font-bold mt-2 uppercase tracking-widest text-xs">Official Digital Receipt</p>
            </div>
            <div className="text-right md:text-right">
              <div className="inline-block bg-industrial-800 px-6 py-4 rounded-2xl border border-industrial-700">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-industrial-400 mb-1">Order ID</p>
                <p className="text-2xl font-black text-cyan-400 font-mono">{orderId}</p>
              </div>
              <p className="text-sm mt-4 text-industrial-300 font-bold">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Invoice Body */}
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-industrial-500 mb-6">Customer Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-industrial-600" />
                    <span className="font-bold text-industrial-950">{formData.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-metallic-600">
                    <Mail size={16} />
                    <span>{formData.email}</span>
                  </div>
                  {formData.company && (
                    <div className="flex items-center gap-3 text-metallic-600">
                      <Building size={16} />
                      <span>{formData.company}</span>
                    </div>
                  )}
                  {formData.phone && (
                    <div className="flex items-center gap-3 text-metallic-600">
                      <Phone size={16} />
                      <span>{formData.phone}</span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-industrial-500 mb-6">Shipping Address</h3>
                <div className="flex gap-3 text-metallic-600 bg-metallic-50 p-4 rounded-xl border border-metallic-200">
                  <MapPin size={18} className="flex-shrink-0 mt-1" />
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{[formData.address, formData.city, formData.stateRegion, formData.country].filter(Boolean).join("\n") || "Shipping address details recorded in secure database."}</p>
                </div>
              </div>
            </div>

            {formData.specialRequest?.trim() && (
              <div className="mb-12 rounded-2xl border border-orange-200 bg-orange-50/60 p-6">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-800 mb-2">Special Request</div>
                <p className="text-sm font-bold text-orange-900 whitespace-pre-wrap">{formData.specialRequest.trim()}</p>
              </div>
            )}

		            <div className="rounded-2xl border border-metallic-200 overflow-hidden mb-12 shadow-sm">
		              <table className="w-full text-left">
	                <thead>
	                  <tr className="bg-metallic-100 border-b border-metallic-200">
	                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-industrial-600">Item Description</th>
	                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-industrial-600 text-center">Qty</th>
	                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-industrial-600 text-right">Unit</th>
	                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-industrial-600 text-right">Line Total</th>
	                  </tr>
	                </thead>
	                <tbody className="divide-y divide-metallic-100">
	                  {receiptItems.map((item, idx) => (
	                    <tr key={idx}>
	                      <td className="px-6 py-6">
	                        <p className="font-black text-industrial-950 text-lg mb-1">{item.name}</p>
	                        <p className="text-xs text-industrial-500 font-bold uppercase tracking-widest">Purchase Request Item</p>
	                      </td>
	                      <td className="px-6 py-6 text-center font-black text-xl text-industrial-900">{item.quantity}</td>
	                      <td className="px-6 py-6 text-right font-black text-industrial-900">
	                        {item.price ? formatMoney(item.price) : "TBD"}
	                      </td>
	                      <td className="px-6 py-6 text-right font-black text-industrial-900">
	                        {item.price ? formatMoney(item.price * item.quantity) : "TBD"}
	                      </td>
	                    </tr>
	                  ))}
	                </tbody>
	              </table>
	            </div>

	            <div className="flex justify-end mb-12">
	              <div className="w-full md:w-[360px] bg-white rounded-2xl border border-metallic-200 p-6 shadow-sm">
	                <div className="flex justify-between text-sm text-metallic-600">
	                  <span className="font-bold">Estimated Total</span>
	                  <span className="font-black text-industrial-900">
	                    {receiptTotal > 0 ? formatMoney(receiptTotal) : "To be confirmed"}
	                  </span>
	                </div>
	                <p className="text-[11px] text-metallic-500 mt-2 leading-relaxed">
	                  Final pricing may vary based on shipping, destination, and availability.
	                </p>
	              </div>
	            </div>

	            <div className="bg-industrial-50 p-8 rounded-2xl border border-industrial-100 flex flex-col md:flex-row justify-between items-center gap-8">
	              <div className="max-w-md">
	                <p className="text-sm text-industrial-800 font-bold mb-2">Next Steps:</p>
	                <p className="text-xs text-industrial-600 leading-relaxed">
	                  Our team will contact you within 24 business hours to confirm availability, shipping options, and payment terms. This document serves as a preliminary confirmation of your request.
	                </p>
	              </div>
	              <div className="flex gap-4 print:hidden">
                <button 
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-industrial-900 text-industrial-900 font-black rounded-xl hover:bg-industrial-50 transition-all text-xs uppercase tracking-widest shadow-xl"
                >
                  <Printer size={16} />
                  Print Invoice
	                </button>
	                <button 
	                  onClick={() => {
	                    onReceiptExit?.();
	                    window.location.href = "/products";
	                  }}
	                  className="flex items-center gap-2 px-6 py-3 bg-industrial-900 text-white font-black rounded-xl hover:bg-industrial-800 transition-all text-xs uppercase tracking-widest shadow-xl"
	                >
	                  Exit
	                </button>
	              </div>
	            </div>
          </div>
          
          <div className="p-8 text-center text-[10px] text-metallic-400 font-bold uppercase tracking-[0.5em] border-t border-metallic-100 bg-metallic-50">
            Calu-Synthetics Bangkok - Global Industrial Supply Chain
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-xl rounded-[3rem] shadow-2xl border border-metallic-200 overflow-hidden flex flex-col lg:flex-row relative">
      {/* Industrial Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      {/* Form Sidebar */}
      <div className="lg:w-1/3 bg-industrial-950 p-12 text-white flex flex-col justify-between relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
	          <div className="bg-white p-2 rounded-lg inline-block mb-8 shadow-xl">
	            <img src={LOGO_URL} alt="Calu-Synthetics" className="h-8 w-auto object-contain" />
	          </div>
	          <h2 className="text-3xl font-black mb-6 tracking-tighter leading-none uppercase font-inter">Secure Order Request</h2>
	          <p className="text-industrial-400 text-sm font-bold leading-relaxed opacity-80 mb-8 font-inter">
	            Submit a purchase request for individuals or businesses. Our team will confirm availability, shipping options, and final pricing.
	          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-industrial-800 flex items-center justify-center flex-shrink-0">
                <CheckCircle size={16} className="text-cyan-400" />
              </div>
              <p className="text-xs text-industrial-300 font-medium font-inter tracking-tight">Direct processing with Bangkok HQ</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-industrial-800 flex items-center justify-center flex-shrink-0">
                <CheckCircle size={16} className="text-cyan-400" />
              </div>
              <p className="text-xs text-industrial-300 font-medium font-inter tracking-tight">Global shipping coordination included</p>
            </div>
          </div>
        </motion.div>
        
        {/* Background Decorative Element */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-industrial-500/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      </div>

      {/* Main Form */}
      <div className="lg:w-2/3 p-12 bg-white/50 backdrop-blur-sm relative">
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Section 1: Client Information */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-metallic-100 pb-2">
              <div className="w-2 h-6 bg-industrial-600 rounded-full"></div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-industrial-950 font-inter">Client Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-industrial-500 font-inter">Full Name</label>
                <div className="relative group">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-metallic-400 group-focus-within:text-industrial-600 transition-colors" />
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    className="industrial-input pl-12 font-inter"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-industrial-500 font-inter">Email Address</label>
                <div className="relative group">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-metallic-400 group-focus-within:text-industrial-600 transition-colors" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="industrial-input pl-12 font-inter"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-industrial-500 font-inter">Company (optional)</label>
                <div className="relative group">
                  <Building size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-metallic-400 group-focus-within:text-industrial-600 transition-colors" />
                  <input
                    type="text"
                    placeholder="Company name (optional)"
                    className="industrial-input pl-12 font-inter"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-industrial-500 font-inter">Phone Number</label>
                <div className="relative group">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-metallic-400 group-focus-within:text-industrial-600 transition-colors" />
                  <input
                    type="tel"
                    required
                    placeholder="+X XXX XXX XXXX"
                    className="industrial-input pl-12 font-mono"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section 2: Order Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-metallic-100 pb-2">
              <div className="w-2 h-6 bg-industrial-600 rounded-full"></div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-industrial-950 font-inter">Order Details</h3>
            </div>

	            {orderItems.length > 0 ? (
	              <div className="space-y-4">
	                <div className="rounded-xl border border-metallic-200 bg-metallic-50/50 backdrop-blur-md overflow-hidden shadow-inner">
	                  <div className="divide-y divide-metallic-200 md:hidden">
	                    {orderItems.map((item, idx) => (
	                      <div key={idx} className="p-4 space-y-3">
	                        <div className="font-black text-industrial-950 font-inter leading-snug">
	                          {item.name}
	                        </div>
	                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px]">
	                          <div className="text-metallic-500 font-black uppercase tracking-widest font-inter">Qty</div>
	                          <div className="text-right text-industrial-900 font-black font-mono">{item.quantity}</div>
	                          <div className="text-metallic-500 font-black uppercase tracking-widest font-inter">Unit</div>
	                          <div className="text-right text-industrial-900 font-black font-mono">
	                            {item.price ? formatMoney(item.price) : "TBD"}
	                          </div>
	                          <div className="text-metallic-500 font-black uppercase tracking-widest font-inter">Line Total</div>
	                          <div className="text-right text-industrial-900 font-black font-mono">
	                            {item.price ? formatMoney(item.price * item.quantity) : "TBD"}
	                          </div>
	                        </div>
	                      </div>
	                    ))}
	                    <div className="p-4 bg-industrial-50/50">
	                      <div className="flex justify-between items-baseline font-inter">
	                        <span className="font-black text-industrial-500 uppercase tracking-widest">Total</span>
	                        <span className="font-black text-industrial-950 text-base font-mono text-right">
	                          {checkoutTotal > 0 ? formatMoney(checkoutTotal) : "To be confirmed"}
	                        </span>
	                      </div>
	                    </div>
	                  </div>

	                  <table className="hidden md:table w-full text-left text-xs border-collapse">
	                    <thead className="bg-metallic-100/80 border-b border-metallic-200">
	                      <tr>
	                        <th className="px-4 py-3 font-black text-industrial-600 uppercase tracking-widest font-inter">Product</th>
	                        <th className="px-4 py-3 font-black text-industrial-600 text-center uppercase tracking-widest font-inter">Qty</th>
                        <th className="px-4 py-3 font-black text-industrial-600 text-right uppercase tracking-widest font-inter">Unit</th>
                        <th className="px-4 py-3 font-black text-industrial-600 text-right uppercase tracking-widest font-inter">Line Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-metallic-200">
                      {orderItems.map((item, idx) => (
                        <tr key={idx} className="hover:bg-industrial-50/30 transition-colors">
                          <td className="px-4 py-4 font-bold text-industrial-950 font-inter">{item.name}</td>
                          <td className="px-4 py-4 text-center font-black text-industrial-900 font-mono">{item.quantity}</td>
                          <td className="px-4 py-4 text-right font-black text-industrial-900 font-mono">
                            {item.price ? formatMoney(item.price) : "TBD"}
                          </td>
                          <td className="px-4 py-4 text-right font-black text-industrial-900 font-mono">
                            {item.price ? formatMoney(item.price * item.quantity) : "TBD"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="border-t-2 border-industrial-100 bg-industrial-50/50">
                      <tr>
                        <td colSpan={4} className="px-4 py-4 font-inter">
                          <div className="flex justify-between items-baseline">
                            <span className="font-black text-industrial-500 uppercase tracking-widest">Total</span>
                            <span className="font-black text-industrial-950 text-base font-mono text-right">
                              {checkoutTotal > 0 ? formatMoney(checkoutTotal) : "To be confirmed"}
                            </span>
                          </div>
                        </td>
                      </tr>
	                    </tfoot>
	                  </table>
	                </div>
	              </div>
	            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-industrial-500 font-inter">Product Selection</label>
                  <div className="relative group">
                    <Package size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-metallic-400 group-focus-within:text-industrial-600 transition-colors" />
                    <input
                      type="text"
                      required
                      placeholder="Product Name / Description"
                      className="industrial-input pl-12 font-inter"
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-industrial-500 font-inter">Order Quantity</label>
                  <div className="relative group">
                    <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-metallic-400 group-focus-within:text-industrial-600 transition-colors" />
                    <input
                      type="number"
                      min="1"
                      required
                      placeholder="Units"
                      className="industrial-input pl-12 font-mono"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Section 3: Shipping Information */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-metallic-100 pb-2">
              <div className="w-2 h-6 bg-industrial-600 rounded-full"></div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-industrial-950 font-inter">Shipping Destination</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2" ref={countryDropdownRef}>
                <label className="text-[10px] font-black uppercase tracking-widest text-industrial-500 font-inter">Country</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-metallic-400 group-focus-within:text-industrial-600 transition-colors z-10" />
                  
                  <div className="relative group">
                    <input
                      type="text"
                      className="industrial-input pl-12 pr-10 cursor-pointer font-inter"
                      placeholder="Select country"
                      value={isCountryDropdownOpen ? countrySearch : formData.country}
                      onChange={(e) => {
                        if (!isCountryDropdownOpen) setIsCountryDropdownOpen(true);
                        setCountrySearch(e.target.value);
                      }}
                      onFocus={() => setIsCountryDropdownOpen(true)}
                      autoComplete="off"
                    />
                    <div 
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-metallic-400 hover:text-industrial-600 transition-colors"
                      onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                    >
                      <ChevronDown size={18} className={`transition-transform duration-300 ${isCountryDropdownOpen ? "rotate-180" : ""}`} />
                    </div>
                  </div>

                  <AnimatePresence>
                    {isCountryDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        className="absolute left-0 right-0 top-full mt-2 bg-white/90 backdrop-blur-xl border border-metallic-200 rounded-2xl shadow-2xl z-[100] overflow-hidden border-t-0 rounded-t-none"
                        style={{ borderTop: 'none' }}
                      >
                        <div className="max-h-[240px] overflow-y-auto custom-scrollbar py-2">
                          {filteredCountries.length > 0 ? (
                            filteredCountries.map((country) => (
                              <div
                                key={country}
                                className="px-5 py-2.5 text-xs font-bold text-industrial-700 hover:bg-industrial-900 hover:text-white cursor-pointer transition-all flex items-center justify-between group mx-2 rounded-lg font-inter"
                                onClick={() => {
                                  setFormData({ ...formData, country });
                                  setIsCountryDropdownOpen(false);
                                  setCountrySearch("");
                                }}
                              >
                                {country}
                                {formData.country === country && <CheckCircle size={14} className="text-cyan-500 group-hover:text-cyan-300" />}
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-8 text-center text-xs text-metallic-400 italic font-inter">
                              No countries found matching &ldquo;{countrySearch}&rdquo;
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-industrial-500 font-inter">State / Region</label>
                <div className="relative group">
                  <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-metallic-400 group-focus-within:text-industrial-600 transition-colors" />
                  <input
                    type="text"
                    required
                    placeholder="State / Region"
                    className="industrial-input pl-12 font-inter"
                    value={formData.stateRegion}
                    onChange={(e) => setFormData({ ...formData, stateRegion: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-industrial-500 font-inter">Town / City</label>
                <div className="relative group">
                  <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-metallic-400 group-focus-within:text-industrial-600 transition-colors" />
                  <input
                    type="text"
                    required
                    placeholder="Town / City"
                    className="industrial-input pl-12 font-inter"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
              </div>
              
	              <div className="space-y-2">
	                <label className="text-[10px] font-black uppercase tracking-widest text-industrial-500 font-inter">Street address</label>
	                <div className="relative group">
	                  <MapPin size={18} className="absolute left-4 top-6 text-metallic-400 group-focus-within:text-industrial-600 transition-colors" />
	                  <textarea
	                    required
	                    rows={3}
	                    className="industrial-input pl-12 resize-none font-inter"
	                    placeholder="Full street address, building, suite, etc."
	                    value={formData.address}
	                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
	                  ></textarea>
	                </div>
	              </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-industrial-500 font-inter">
                    Special Request (Optional)
                  </label>
                  <div className="relative group">
                    <Package size={18} className="absolute left-4 top-6 text-metallic-400 group-focus-within:text-industrial-600 transition-colors" />
                    <textarea
                      rows={3}
                      className="industrial-input pl-12 resize-none font-inter"
                      placeholder="Packaging notes, preferred delivery time window, documentation needs, or anything else we should know."
                      value={formData.specialRequest}
                      onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                    ></textarea>
                  </div>
                </div>
	            </div>
	          </motion.div>

          {/* Advanced Payment Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-industrial-900/5 to-cyan-500/5 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/40 backdrop-blur-md border-2 border-dashed border-metallic-200 rounded-[2rem] p-0 transition-all duration-300 group-hover:border-industrial-300 group-hover:shadow-2xl overflow-hidden">
              <div className="flex flex-col relative z-10">
                {/* Banner Image at Top */}
                <div className="relative w-full h-24 md:h-28 overflow-hidden border-b border-metallic-100 flex items-center justify-center p-4 shadow-inner bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.28),transparent_55%),linear-gradient(to_right,rgba(15,23,42,0.06),rgba(255,255,255,0.96),rgba(15,23,42,0.06))]">
                  <Image 
                    src="/images/payment.png" 
                    alt="Payment" 
                    width={500} 
                    height={100} 
                    className="object-contain w-full h-full max-w-[400px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
                </div>
                
                <div className="p-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-industrial-500 font-inter">Secure Settlement</span>
                    <div className="h-[1px] flex-grow bg-gradient-to-r from-metallic-200 to-transparent"></div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                      <span className="text-sm font-black text-industrial-950 tracking-tight font-inter">USDT, BTC, ETH</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-industrial-400"></div>
                      <span className="text-sm font-black text-industrial-950 tracking-tight font-inter">Binance Pay</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-metallic-500 font-medium leading-relaxed font-inter max-w-xl">
                    Settlement instructions and secure wallet addresses will be communicated once your request is verified and everything is ready for the transaction.
                  </p>
                </div>

                <div className="absolute top-4 right-4 hidden lg:flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity duration-700">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-industrial-200"></div>
                  ))}
                </div>
              </div>

              {/* Decorative background element */}
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-industrial-50 rounded-full blur-3xl opacity-50"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-5 bg-industrial-900 text-white font-black rounded-2xl shadow-2xl transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs hover:bg-industrial-800 font-inter ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Processing Request...
                </>
              ) : (
                <>
                  <CheckCircle size={16} />
                  Submit Purchase Request
                </>
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
