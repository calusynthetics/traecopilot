"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Globe, FileText, Handshake, Mail, User, MessageSquare, Send, Boxes, Truck, Scale, ShieldCheck } from "lucide-react";
import FeaturedProductsSlider from "@/components/FeaturedProductsSlider";
import ReviewsList from "@/components/ReviewsList";
import { getSiteReviews } from "@/lib/reviews";
import { useState, useEffect } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [selectedVariant, setSelectedVariant] = useState("Industrial coatings");
  const siteReviews = getSiteReviews();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your inquiry. Our team will contact you shortly.");
    setContactForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Sect 1 */}
      <section className="relative exact-section bg-industrial-950">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.png"
            alt="Industrial Background"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-industrial-950 via-industrial-900/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-50 flex-grow flex items-center py-6 md:py-0">
          <motion.div 
            initial={mounted ? { opacity: 0, y: 30 } : {}}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative z-50 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-industrial-500/20 border border-industrial-400/30 text-industrial-300 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4 md:mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-industrial-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-industrial-500"></span>
              </span>
              Global Industrial Supplier
            </div>
            
            <h1 className="text-3xl md:text-7xl font-extrabold text-white mb-4 md:mb-6 tracking-tight leading-tight">
              Industrial Chemical <span className="text-transparent bg-clip-text bg-gradient-to-r from-industrial-400 to-cyan-300">Manufacturers</span>
            </h1>
            
            <p className="text-base md:text-xl text-industrial-200 mb-8 md:mb-10 leading-relaxed max-w-lg font-medium">
              Trusted global supply of high-grade Caluanie Muelear Oxidize and industrial solutions for automotive, aerospace, and manufacturing sectors.
            </p>
            
            <div className="flex flex-wrap gap-3 md:gap-4 relative z-50">
              <Link href="/products" className="px-6 py-3 md:px-8 md:py-4 bg-industrial-600 hover:bg-industrial-500 text-white text-sm md:text-base font-bold rounded-lg shadow-lg shadow-industrial-900/40 transition-all transform hover:-translate-y-1">
                Browse Products
              </Link>
              <Link href="/contact" className="px-6 py-3 md:px-8 md:py-4 bg-white/10 hover:bg-white/20 text-white text-sm md:text-base font-bold rounded-lg backdrop-blur-sm border border-white/20 transition-all">
                Request Quote
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Floating Stats */}
        <div className="relative md:absolute md:bottom-0 right-0 left-0 bg-white/5 backdrop-blur-md border-t border-white/10 py-4 md:py-6 z-20">
          <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 md:gap-y-6">
            <div className="md:border-r border-white/10 text-center md:text-left">
              <p className="text-xl md:text-3xl font-bold text-white mb-1">ISO 9001</p>
              <p className="text-industrial-400 text-[10px] md:text-sm uppercase tracking-widest font-black">Certified Quality</p>
            </div>
            <div className="md:border-r border-white/10 text-center md:text-left">
              <p className="text-xl md:text-3xl font-bold text-white mb-1">98%</p>
              <p className="text-industrial-400 text-[10px] md:text-sm uppercase tracking-widest font-black">Global Reach</p>
            </div>
            <div className="md:border-r border-white/10 text-center md:text-left">
              <p className="text-xl md:text-3xl font-bold text-white mb-1">24/7</p>
              <p className="text-industrial-400 text-[10px] md:text-sm uppercase tracking-widest font-black">Technical Support</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-xl md:text-3xl font-bold text-white mb-1">Eco-Safe</p>
              <p className="text-industrial-400 text-[10px] md:text-sm uppercase tracking-widest font-black">Manufacturing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Established Excellence - Sect 2 */}
      <section className="established-excellence-section relative overflow-hidden flex items-center bg-white">
        <div 
          className="absolute inset-0 z-0 bg-fixed bg-center bg-cover opacity-60"
          style={{ backgroundImage: 'url("/New stuff/Public Compressed/Many Warehouse workers.png")' }}
        ></div>
        <div className="established-excellence-container container mx-auto px-6 py-32 max-w-[1023px] relative z-10">
          <motion.div 
            initial={mounted ? { opacity: 0, y: 40 } : {}}
            whileInView={mounted ? { opacity: 1, y: 0 } : {}}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-industrial-600 mb-6 md:mb-8">Established Excellence</h2>
            <p className="text-lg md:text-3xl font-black text-industrial-950 mb-8 md:mb-12 tracking-tight leading-tight px-2">
              Calu-Synthetics is a Bangkok-based manufacturer specializing in <span className="text-industrial-600">Caluanie Muelear Oxidize</span> and other industrial chemicals. 
              We are committed to reliability, sustainability, and long-term partnerships.
            </p>

            <Link 
              href="/about" 
              className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-3 bg-industrial-950 text-white text-[10px] md:text-sm font-black rounded-lg hover:bg-industrial-800 transition-all shadow-2xl uppercase tracking-widest"
            >
              Learn More
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
        {/* Enhanced Background Decorative Element */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-industrial-100/50 rounded-full translate-x-1/2 blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-100/30 rounded-full -translate-x-1/2 blur-[100px] pointer-events-none"></div>
      </section>

      {/* Featured Products Portfolio - Sect 3.5 */}
      <section className="lg:h-auto py-5 md:py-6 bg-white">
        <div className="container mx-auto px-2 md:px-4 max-w-[1600px]">
          <div className="mb-3 md:mb-4">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="text-[10px] md:text-sm font-black uppercase tracking-[0.3em] text-industrial-600 pt-[2px] mb-0 whitespace-nowrap">Precision Inventory</h2>
              <Link href="/products" className="text-industrial-600 text-[10px] md:text-xs font-bold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all group/catalog whitespace-nowrap uppercase tracking-[0.2em]">
                View Catalog
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 md:h-4 md:w-4 transform transition-transform group-hover/catalog:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="flex justify-center overflow-hidden">
              <h1 className="text-[6.5vw] sm:text-4xl md:text-6xl lg:text-7xl font-black text-industrial-950 tracking-tighter whitespace-nowrap leading-none text-center">
                Caluanie Muelear Oxidize
              </h1>
            </div>
          </div>
          <FeaturedProductsSlider />
        </div>
      </section>

      {/* Specialized Solutions - Sect 3 */}
      <section className="bg-metallic-50">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div>
              <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-industrial-600 mb-2">Specialized Solutions</h2>
              <h3 className="text-3xl md:text-4xl font-black text-industrial-950 tracking-tight">
                Industrial Formulations
              </h3>
            </div>
            <Link href="/products" className="text-industrial-600 text-xs md:text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all group/cta">
              Explore Industrial Grade
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform transition-transform group-hover/cta:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="bg-white border border-slate-200 shadow-xl shadow-slate-200/30 rounded-[2rem] overflow-hidden">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] p-6 lg:p-8">
              <div className="relative rounded-[1.5rem] overflow-hidden border border-slate-200 bg-slate-100">
                <Image
                  src="/New stuff/Public Compressed/Many Warehouse pruductss.png"
                  alt="Caluanie Muelear Oxidize product imagery"
                  width={720}
                  height={520}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              </div>

              <div className="flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="rounded-3xl bg-slate-50 border border-slate-200 p-5">
                    <p className="text-sm uppercase tracking-[0.25em] font-black text-slate-500">Product</p>
                    <h4 className="mt-3 text-3xl font-extrabold text-industrial-950 leading-tight">Caluanie Muelear Oxidize</h4>
                    <p className="mt-4 text-base leading-7 text-slate-600 font-light">
                      A premium industrial-grade oxidizer formulated for coatings, resin processing, and automotive applications with strict quality controls.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { label: "Industrial coatings", description: "High adhesion formulation for surface finishes." },
                      { label: "Resin breakdown", description: "Optimized stability in polymer processing." },
                      { label: "Automotive supply", description: "Designed for high-demand transport applications." },
                    ].map((variant) => (
                      <button
                        key={variant.label}
                        type="button"
                        onClick={() => setSelectedVariant(variant.label)}
                        className={`rounded-3xl border px-4 py-3 text-left transition ${
                          selectedVariant === variant.label
                            ? "border-blue-600 bg-blue-600/10 text-industrial-950"
                            : "border-slate-200 bg-white text-slate-700 hover:border-blue-400"
                        }`}
                      >
                        <p className="text-sm font-black uppercase tracking-[0.2em] mb-2">{variant.label}</p>
                        <p className="text-xs leading-5 text-slate-500">{variant.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500 font-black">Selected Variant</p>
                  <h5 className="mt-4 text-xl font-black text-industrial-950">{selectedVariant}</h5>
                  <p className="mt-3 text-sm leading-7 text-slate-600 font-light">
                    {selectedVariant === "Industrial coatings" && "Perfect for high-performance coating systems that demand consistency and surface durability."}
                    {selectedVariant === "Resin breakdown" && "Formulated to support controlled polymer breakdown and reliable processing in resin operations."}
                    {selectedVariant === "Automotive supply" && "Ideal for automotive supply chains requiring chemical reliability and compliant sourcing."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industrial Precision - Sect 4 (Desktop Screen Match) */}
      <section className="bg-white overflow-hidden">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">
            <motion.div
              initial={mounted ? { opacity: 0, x: -20 } : {}}
              whileInView={mounted ? { opacity: 1, x: 0 } : {}}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <h2 className="text-[10px] md:text-sm font-black uppercase tracking-[0.3em] text-industrial-600 mb-4 md:mb-6">Industrial Precision</h2>
              <h3 className="text-2xl md:text-5xl font-black text-industrial-950 mb-6 md:mb-8 tracking-tight leading-tight">
                Science at the Core of <span className="text-industrial-600">Synthetics</span>
              </h3>
              <p className="text-sm md:text-lg text-metallic-600 mb-6 md:mb-10 leading-relaxed">
                Our manufacturing processes adhere to the highest scientific standards, ensuring that every batch of Caluanie Muelear Oxidize meets the rigorous specifications required by global industries.
              </p>
              
              <motion.div 
                initial={mounted ? { opacity: 0, y: 20 } : {}}
                whileInView={mounted ? { opacity: 1, y: 0 } : {}}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="metallic-card rounded-2xl overflow-hidden border border-metallic-200 shadow-xl"
              >
                <table className="w-full text-left text-xs md:text-sm">
                  <thead>
                    <tr className="bg-industrial-950 text-white">
                      <th className="px-4 py-3 md:px-6 md:py-4 font-black uppercase tracking-widest text-[9px] md:text-[10px]">Property</th>
                      <th className="px-4 py-3 md:px-6 md:py-4 font-black uppercase tracking-widest text-[9px] md:text-[10px]">Specification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-metallic-200">
                    <tr className="hover:bg-metallic-50 transition-colors">
                      <td className="px-4 py-3 md:px-6 md:py-4 font-bold text-industrial-900">Density</td>
                      <td className="px-4 py-3 md:px-6 md:py-4 font-mono text-metallic-600">1.902 g/cm³</td>
                    </tr>
                    <tr className="hover:bg-metallic-50 transition-colors">
                      <td className="px-4 py-3 md:px-6 md:py-4 font-bold text-industrial-900">Molar Mass</td>
                      <td className="px-4 py-3 md:px-6 md:py-4 font-mono text-metallic-600">171.12 g/mol</td>
                    </tr>
                    <tr className="hover:bg-metallic-50 transition-colors">
                      <td className="px-4 py-3 md:px-6 md:py-4 font-bold text-industrial-900">Flash Point</td>
                      <td className="px-4 py-3 md:px-6 md:py-4 font-mono text-metallic-600">Non-flammable</td>
                    </tr>
                  </tbody>
                </table>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/3] md:aspect-square metallic-card rounded-2xl md:rounded-3xl p-6 md:p-12 bg-white flex items-center justify-center group overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-industrial-50 to-transparent opacity-50"></div>
              <Image 
                src="/New stuff/Public Compressed/Many Warehouse pruductss.png" 
                alt="Technical Excellence" 
                fill 
                className="object-cover opacity-20 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-industrial-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-2xl">
                  <Shield size={28} className="md:w-10 md:h-10" />
                </div>
                <h4 className="text-lg md:text-2xl font-black text-industrial-950 uppercase tracking-tighter">Certified Purity</h4>
                <p className="text-industrial-600 font-bold mt-1 md:mt-2 text-xs md:text-base">ISO 9001:2015 Compliant</p>
              </div>
              {/* Abstract decorative circles */}
              <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-industrial-100 rounded-full -mr-12 -mt-12 md:-mr-16 md:-mt-16 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 md:w-32 md:h-32 bg-industrial-100 rounded-full -ml-12 -mb-12 md:-ml-16 md:-mb-16 blur-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Strategic Advantage - Sect 6 (Desktop Screen Match) */}
      <section className="bg-industrial-950 text-white relative">
        <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
          <div className="text-center mb-12 lg:mb-20">
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-industrial-400 mb-6">Strategic Advantage</h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tight">Why Industry Leaders Choose Us</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Shield className="w-8 h-8" />, title: "Trusted Manufacturing", desc: "Rigorous quality control and ISO-certified production lines." },
              { icon: <Globe className="w-8 h-8" />, title: "Global Shipping", desc: "Strategic export logistics for secure worldwide delivery." },
              { icon: <FileText className="w-8 h-8" />, title: "Transparent Data", desc: "Complete technical specifications and SDS for every batch." },
              { icon: <Handshake className="w-8 h-8" />, title: "Long-Term Partners", desc: "Committed to sustainable business growth and reliability." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={mounted ? { opacity: 0, y: 20 } : {}}
                whileInView={mounted ? { opacity: 1, y: 0 } : {}}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 lg:p-10 rounded-3xl hover:bg-white/10 transition-all group flex flex-col items-center text-center"
              >
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-16 h-16 bg-industrial-500 rounded-2xl flex items-center justify-center mb-6 lg:mb-8 shadow-lg shadow-industrial-500/20 group-hover:bg-cyan-400 transition-colors mx-auto"
                >
                  {item.icon}
                </motion.div>
                <h4 className="text-xl font-black mb-4 uppercase tracking-tighter">{item.title}</h4>
                <p className="text-industrial-300 leading-relaxed text-sm font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(13,132,235,0.1),transparent_50%)]"></div>
      </section>

      {/* 5. Call-to-Action Strip */}
      <section className="py-16 bg-industrial-600 relative overflow-hidden">
        <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4 leading-tight">
                Ready to source premium industrial chemicals?
              </h2>
              <p className="text-industrial-100 text-lg font-medium opacity-90">
                Browse our full catalog or request a customized quote for your industrial needs today.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/products" 
                  className="px-10 py-5 bg-white text-industrial-900 font-black rounded-2xl shadow-2xl hover:bg-industrial-50 transition-all uppercase tracking-widest text-sm inline-block"
                >
                  Browse Products
                </Link>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                animate={mounted ? { scale: [1, 1.03, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Link 
                  href="/contact" 
                  className="px-10 py-5 border-2 border-white text-white font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-sm inline-block"
                >
                  Request Quote
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Contact Preview */}
      {/* 6. Reviews */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-6xl mx-auto">
            <ReviewsList items={siteReviews} />
          </div>
        </div>
      </section>

      {/* Integrated Wholesale Section - Restored to original version */}
      <section id="wholesale" className="py-24 bg-industrial-950 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="space-y-8">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.4em] text-cyan-400 mb-4">Wholesale Supply</p>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6">
                  Wholesale Caluanie Muelear Oxidize with <span className="text-cyan-300">Secure Global Payments</span>
                </h2>
                <p className="text-lg md:text-xl text-industrial-200 leading-relaxed max-w-2xl">
                  Take advantage of wholesale pricing on premium 99.99% pure Caluanie Muelear Oxidize. Calu-Synthetics supports bulk industrial orders with trusted logistics and Bitcoin-only payment processing.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-black uppercase tracking-widest text-white flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">1</span>
                    How It Works
                  </h3>
                  <ol className="space-y-4 text-sm text-industrial-300">
                    <li className="flex gap-3">
                      <span className="font-bold text-white">01.</span> Send order request via chat or form.
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-white">02.</span> Confirm volume and delivery location.
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-white">03.</span> Pay securely with Bitcoin only.
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-white">04.</span> Receive expedited global shipping.
                    </li>
                  </ol>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-xl font-black uppercase tracking-widest text-white flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">2</span>
                    Strategic Advantage
                  </h3>
                  <ul className="space-y-4 text-sm text-industrial-300">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                      High-volume discount pricing
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                      Secure, anonymous payments
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                      Dedicated wholesale support
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                      Global warehouse distribution
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/contact" className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-industrial-950 font-black rounded-xl shadow-lg transition-all uppercase tracking-widest text-xs">
                  Request Wholesale Quote
                </Link>
                <Link href="/products" className="px-8 py-4 bg-white/5 border border-white/20 text-white font-black rounded-xl hover:bg-white/10 transition-all uppercase tracking-widest text-xs">
                  Browse Products
                </Link>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-industrial-500/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-industrial-900 shadow-2xl">
                <div className="relative aspect-[4/5] lg:aspect-[3/4]">
                  <Image
                    src="/New stuff/Public Compressed/bulk logistiscs.png"
                    alt="Wholesale Caluanie Muelear Oxidize"
                    fill
                    className="object-cover brightness-75 group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-industrial-950 via-industrial-950/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                    <div className="inline-flex items-center gap-3 rounded-full bg-cyan-500/20 border border-cyan-400/30 px-4 py-2 text-[10px] uppercase tracking-[0.3em] font-black text-cyan-300 mb-6">
                      Bulk Access
                    </div>
                    <h3 className="text-3xl font-black tracking-tighter mb-4 leading-tight">Calu-Synthetics Bulk Logistics</h3>
                    <p className="text-industrial-300 text-sm leading-relaxed font-medium">
                      Optimized high-value chemical supply with secure global shipping from strategic hubs in the USA and Netherlands.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-industrial-500/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      </section>

      {/* 7. Contact Preview */}
      <section className="py-24 bg-metallic-50">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-5xl mx-auto bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-metallic-200 flex flex-col lg:flex-row">
            <div className="lg:w-1/2 bg-industrial-950 p-16 text-white flex flex-col justify-center relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-sm font-black uppercase tracking-[0.4em] text-industrial-400 mb-6">Connect With Us</h2>
                <h3 className="text-4xl font-black mb-8 tracking-tighter leading-none">
                  Have questions or need a quote? Reach out to us.
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-industrial-300">
                    <Mail size={20} className="text-industrial-500" />
                    <span className="font-bold">sales@calusynthetics.com</span>
                  </div>
                  <div className="flex items-center gap-4 text-industrial-300">
                    <Globe size={20} className="text-industrial-500" />
                    <span className="font-bold">Bangkok, Thailand</span>
                  </div>
                </div>
              </div>
              {/* Background pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-industrial-500/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            </div>

            <div className="lg:w-1/2 p-16 bg-white">
              <form onSubmit={handleContactSubmit} className="space-y-8">
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-metallic-400 group-focus-within:text-industrial-600 transition-colors">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    className="industrial-input pl-12"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  />
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-metallic-400 group-focus-within:text-industrial-600 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    className="industrial-input pl-12"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  />
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-6 text-metallic-400 group-focus-within:text-industrial-600 transition-colors">
                    <MessageSquare size={18} />
                  </div>
                  <textarea
                    required
                    placeholder="Your Message"
                    rows={4}
                    className="industrial-input pl-12 resize-none"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-5 bg-industrial-900 text-white font-black rounded-xl shadow-xl shadow-industrial-900/20 hover:bg-industrial-800 transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs"
                >
                  <Send size={16} />
                  Send Inquiry
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

