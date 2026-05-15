"use client";

import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import emailjs from "@emailjs/browser";
import { EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATES } from "@/lib/emailjs";
import { BRAND, getPublicAssetUrl } from "@/lib/branding";

/**
 * Generates a professional HTML inquiry for email clients.
 */
const generateContactHTML = (formData: any) => {
  const date = new Date().toLocaleDateString();
  const logoUrl = BRAND.emailLogoUrl;
  return `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden;">
      <!-- Header -->
      <div style="background-color: #0b1e33; padding: 40px; text-align: center; border-bottom: 4px solid #0d84eb;">
        <div style="background-color: #ffffff; padding: 10px; border-radius: 8px; display: inline-block; margin-bottom: 20px;">
          <img src="${logoUrl}" alt="Calu-Synthetics" style="height: 50px; width: auto; display: block;" />
        </div>
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: -0.5px; font-weight: 900;">New Customer Inquiry</h1>
        <p style="color: #94a3b8; margin: 10px 0 0 0; font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase;">Calu-Synthetics Support Desk</p>
      </div>

      <!-- Details -->
      <div style="padding: 40px;">
        <div style="margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #f1f5f9;">
          <p style="margin: 0; font-size: 10px; color: #64748b; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Inquiry Subject</p>
          <p style="margin: 5px 0 0 0; font-size: 18px; color: #0b1e33; font-weight: bold;">${formData.subject}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
          <tr>
            <td style="width: 50%; vertical-align: top;">
              <h3 style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #64748b; margin: 0 0 10px 0; font-weight: 900;">Contact Details</h3>
              <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Name:</strong> ${formData.name}</p>
              <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Email:</strong> ${formData.email}</p>
            </td>
            <td style="width: 50%; vertical-align: top; text-align: right;">
              <p style="margin: 0; font-size: 10px; color: #64748b; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Date Received</p>
              <p style="margin: 5px 0 0 0; font-size: 14px; color: #1e293b; font-weight: bold;">${date}</p>
            </td>
          </tr>
        </table>

        <div style="background-color: #f8fafc; padding: 30px; border-radius: 12px; border: 1px solid #e2e8f0;">
          <h3 style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #64748b; margin: 0 0 15px 0; font-weight: 900;">Message Content</h3>
          <p style="margin: 0; font-size: 14px; color: #1e293b; line-height: 1.6; white-space: pre-wrap;">${formData.message}</p>
        </div>

        <div style="margin-top: 30px; text-align: center;">
          <p style="font-size: 12px; color: #64748b;">This message was submitted via the Calu-Synthetics website contact form.</p>
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

function ContactContent() {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Product Inquiry",
    message: "",
  });

  useEffect(() => {
    const subject = searchParams.get("subject");
    const message = searchParams.get("message");
    
    if (subject || message) {
      setFormData(prev => ({
        ...prev,
        subject: subject || prev.subject,
        message: message || prev.message
      }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const inquiryHTML = generateContactHTML(formData);
      
      const templateParams = {
        message: inquiryHTML,
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
            subject: formData.subject,
            message: inquiryHTML,
          },
          EMAILJS_PUBLIC_KEY
        );
      } catch (autoReplyError) {
        console.error("Failed to send auto-reply:", autoReplyError);
      }
      
      alert("Thank you for your inquiry. Our technical sales team will contact you within 24 hours.");
      setFormData({ name: "", email: "", subject: "General Questions", message: "" });
    } catch (error) {
      console.error("Failed to send inquiry:", error);
      alert("Failed to send inquiry. Please try again or contact support.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-metallic-50 min-h-screen relative flex flex-col items-center justify-center">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0 h-[60vh] overflow-hidden">
        <Image
          src="/New stuff/Public Compressed/Many Warehouse workers.png"
          alt="Contact Background"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-metallic-50/0 via-metallic-50/60 to-metallic-50"></div>
      </div>

      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center lg:text-left">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-cyan-600 mb-4">Get in Touch</p>
            <h1 className="text-4xl md:text-6xl font-black text-industrial-950 tracking-tight">Contact Our Technical Sales Team</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Column */}
            <section className="lg:col-span-2 rounded-[2.5rem] border border-metallic-200 bg-white p-8 md:p-12 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-industrial-100/50 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none group-hover:bg-industrial-200/50 transition-colors duration-700"></div>
              
              <div className="relative z-10">
                <div className="mb-10">
                  <h2 className="text-3xl font-black text-industrial-950">Start your inquiry</h2>
                  <p className="mt-3 text-base text-metallic-600 leading-relaxed max-w-xl">
                    Tell us about your requirements and our technical sales team will respond with tailored guidance.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2.5">
                      <label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-industrial-500 ml-1">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="industrial-input h-14"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-industrial-500 ml-1">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="industrial-input h-14"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <label htmlFor="subject" className="text-[10px] font-black uppercase tracking-[0.2em] text-industrial-500 ml-1">Inquiry Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      className="industrial-select h-14"
                      value={formData.subject}
                      onChange={handleChange}
                    >
                      <option value="Bulk & Wholesale Quote">Bulk & Wholesale Quote</option>
                      <option value="Technical Product Inquiry">Technical Product Inquiry</option>
                      <option value="General Questions">General Questions</option>
                    </select>
                  </div>

                  <div className="space-y-2.5">
                    <label htmlFor="message" className="text-[10px] font-black uppercase tracking-[0.2em] text-industrial-500 ml-1">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="industrial-input p-5 resize-none"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you today?"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-industrial-600 hover:bg-industrial-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-industrial-600/20 transform hover:-translate-y-1 uppercase tracking-widest text-sm disabled:opacity-70 disabled:transform-none"
                  >
                    {isSubmitting ? "Processing..." : "Submit Inquiry"}
                  </button>
                </form>
              </div>
            </section>

            {/* Sidebar Column */}
            <aside className="space-y-6">
              <div className="rounded-[2.5rem] border border-metallic-200 bg-white p-8 md:p-10 shadow-sm">
                <h3 className="text-xl font-black text-industrial-950 mb-8 tracking-tight">Quick Contact</h3>
                
                <div className="space-y-10">
                  <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-industrial-400">Headquarters</p>
                    <p className="text-base font-bold text-industrial-950 leading-tight">Bangkok, Thailand</p>
                    <p className="text-sm text-metallic-600 font-medium">123 Industrial Park, Bang Na</p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-industrial-400">Main Email</p>
                    <a href="mailto:sales@calusynthetics.com" className="text-base font-bold text-industrial-900 hover:text-industrial-600 transition-colors">
                      sales@calusynthetics.com
                    </a>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-industrial-400">Phone</p>
                    <p className="text-base font-bold text-industrial-950 tracking-tight">+66 95 952 1908</p>
                    <p className="text-xs text-metallic-500 font-medium">Mon–Fri 08:00–18:00 ICT</p>
                  </div>
                </div>
              </div>

              {/* Trust Badge / Decorative */}
              <div className="rounded-[2.5rem] bg-industrial-950 p-8 text-white relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="text-sm font-black uppercase tracking-[0.3em] text-cyan-400 mb-4">Certified Quality</h4>
                  <p className="text-xs text-industrial-300 leading-relaxed font-medium">
                    All industrial inquiries are processed through our ISO 9001:2015 compliant laboratory standards.
                  </p>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl group-hover:bg-cyan-500/20 transition-colors"></div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-metallic-50 flex items-center justify-center"><div className="animate-pulse text-industrial-600 font-black">LOADING PORTAL...</div></div>}>
      <ContactContent />
    </Suspense>
  );
}
