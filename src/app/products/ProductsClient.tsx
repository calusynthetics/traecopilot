"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { products, Product } from "@/lib/mock-data";
import { getAssignedStockStatus, getStatusLabel } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { Filter, Search, ChevronDown, CheckCircle, Boxes, Truck, Handshake, Scale, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageCtas from "@/components/PageCtas";

export default function ProductsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToCart } = useCart();
  const pageSize = 10;
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState<"Any" | Product["stockStatus"]>("Any");
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [wholesaleVolume, setWholesaleVolume] = useState<number>(0);
  const filterRef = useRef<HTMLDivElement>(null);

  const getActiveTier = () => {
    if (wholesaleVolume >= 2000) return 3;
    if (wholesaleVolume >= 500) return 2;
    if (wholesaleVolume >= 100) return 1;
    return 0;
  };

  const activeTier = getActiveTier();

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const productsWithStatus = useMemo(() => {
    return products.map((product, index) => ({
      ...product,
      displayStatus: getAssignedStockStatus(index, products.length),
    }));
  }, []);

  const filteredProducts = productsWithStatus.filter((p) => {
    const query = search.trim().toLowerCase();
    const matchesSearch =
      query.length === 0 ||
      p.name.toLowerCase().includes(query) ||
      p.casNumber.toLowerCase().includes(query);
    const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;
    const matchesStatus = statusFilter === "Any" || p.displayStatus === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const setQueryParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams.toString());
    if (key !== "page") next.delete("page");
    if (!value || value.length === 0) next.delete(key);
    else next.set(key, value);
    const query = next.toString();
    router.replace(query.length ? `/products?${query}` : "/products");
  };

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const currentPage = useMemo(() => {
    const raw = searchParams.get("page");
    const parsed = raw ? Number.parseInt(raw, 10) : 1;
    if (!Number.isFinite(parsed) || parsed < 1) return 1;
    return Math.min(parsed, totalPages);
  }, [searchParams, totalPages]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    setQueryParam("page", null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    const urlCategory = searchParams.get("category");
    if (urlCategory && categories.includes(urlCategory)) setCategoryFilter(urlCategory);
    if (!urlCategory) setCategoryFilter("All");

    const urlStatus = searchParams.get("status");
    if (urlStatus === "IN_STOCK" || urlStatus === "LOW_STOCK" || urlStatus === "CONTACT") {
      setStatusFilter(urlStatus);
    } else {
      setStatusFilter("Any");
    }
  }, [searchParams, categories]);

  const getStockBadge = (status: Product["stockStatus"]) => {
    const label = getStatusLabel(status);
    switch (status) {
      case "IN_STOCK":
        return (
          <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full border border-green-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            {label}
          </span>
        );
      case "LOW_STOCK":
        return (
          <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full border border-orange-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            {label}
          </span>
        );
      case "CONTACT":
        return (
          <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full border border-red-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            {label}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-metallic-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-industrial-950 mb-4">Product Catalogue</h1>
          <p className="text-metallic-600">
            A structured listing of available products, specifications, and commercial status.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Category Filter Dropdown */}
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`h-14 px-5 rounded-xl border flex items-center gap-2 font-black uppercase tracking-widest text-[10px] transition-all ${
                  isFilterOpen || categoryFilter !== "All"
                    ? "bg-industrial-900 text-white border-industrial-900 shadow-lg"
                    : "bg-white text-industrial-950 border-metallic-200 hover:bg-metallic-50"
                }`}
              >
                <Filter size={18} />
                <span className="hidden sm:inline">
                  {categoryFilter === "All" ? "Filter" : categoryFilter}
                </span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isFilterOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute left-0 mt-2 w-64 bg-white border border-metallic-200 rounded-2xl shadow-2xl z-[100] overflow-hidden"
                  >
                    <div className="p-2">
                      <p className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-metallic-400 border-b border-metallic-100 mb-2">
                        Categories
                      </p>
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setQueryParam("category", cat === "All" ? null : cat);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-xs font-bold rounded-lg transition-all flex items-center justify-between group ${
                            categoryFilter === cat
                              ? "bg-industrial-900 text-white"
                              : "text-industrial-700 hover:bg-industrial-50"
                          }`}
                        >
                          {cat}
                          {categoryFilter === cat && <CheckCircle size={14} className="text-cyan-400" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative w-full md:w-96 group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-metallic-400 group-focus-within:text-industrial-600 transition-colors">
                <Search size={20} strokeWidth={2.5} />
              </div>
              <input
                type="text"
                placeholder="Search by product name or CAS..."
                className="industrial-input pl-12 h-14"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full md:w-64">
            <select
              className="industrial-select h-14"
              value={statusFilter}
              onChange={(e) => setQueryParam("status", e.target.value === "Any" ? null : e.target.value)}
              aria-label="Filter by availability"
            >
              <option value="Any">Any availability</option>
              <option value="IN_STOCK">In Stock</option>
              <option value="LOW_STOCK">Low Stock</option>
              <option value="CONTACT">Contact for Lead Time</option>
            </select>
          </div>
        </div>

        {/* Product Table */}
	        <div className="metallic-card rounded-2xl border border-metallic-100 overflow-hidden shadow-lg">
	          <div className="px-5 py-4 bg-white border-b border-metallic-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
	            <div>
	              <h2 className="text-xl font-black text-industrial-950 tracking-tight">Products</h2>
	            </div>
		            <div className="text-xs text-metallic-600 font-bold">
		              {filteredProducts.length === 0 ? (
		                <>
		                  Showing <span className="font-black text-industrial-900">0</span> of{" "}
		                  <span className="font-black text-industrial-900">0</span>
		                </>
		              ) : (
		                <>
		                  Showing{" "}
		                  <span className="font-black text-industrial-900">
		                    {(currentPage - 1) * pageSize + 1}
		                    {"-"}
		                    {Math.min(currentPage * pageSize, filteredProducts.length)}
		                  </span>{" "}
		                  of <span className="font-black text-industrial-900">{filteredProducts.length}</span>
		                </>
		              )}
		            </div>
		          </div>

	          <div className="overflow-x-auto">
	            <table className="min-w-[980px] w-full text-left">
              <thead className="bg-metallic-50 border-b border-metallic-100 sticky top-0">
                <tr>
                  <th className="px-3 py-3 text-[10px] font-black uppercase tracking-[0.25em] text-industrial-600 w-[6ch] min-w-[6ch]">
                    #
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.25em] text-industrial-600 min-w-[240px]">
                    Product
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.25em] text-industrial-600 min-w-[150px]">
                    Category
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.25em] text-industrial-600 min-w-[130px]">
                    CAS
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.25em] text-industrial-600 min-w-[340px]">
                    Description
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.25em] text-industrial-600 min-w-[180px]">
                    Availability
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.25em] text-industrial-600 text-right min-w-[140px]">
                    Price
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.25em] text-industrial-600 text-right min-w-[160px]">
                    Actions
                  </th>
                </tr>
	              </thead>
	              <tbody className="bg-white">
	                {paginatedProducts.map((product, index) => (
	                  <tr
	                    key={product.id}
	                    className="border-b border-metallic-100 hover:bg-metallic-50/60 transition-colors"
	                  >
	                    <td className="px-3 py-4 align-top">
	                      <span className="text-xs font-black text-metallic-500">
	                        {(currentPage - 1) * pageSize + index + 1}
	                      </span>
	                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-black text-industrial-950">{product.name}</p>
                        {product.minOrder && (
                          <p className="text-[10px] font-bold text-metallic-500 uppercase tracking-widest">
                            Min order: <span className="font-mono">{product.minOrder}</span>
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-metallic-50 border border-metallic-100 text-[11px] font-bold text-metallic-700">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <span className="inline-flex px-3 py-1 rounded-lg bg-white border border-metallic-100 text-xs font-mono font-bold text-industrial-900">
                        {product.casNumber}
                      </span>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <p className="text-sm text-metallic-600 leading-relaxed max-w-[640px]">
                        {product.description}
                      </p>
                    </td>
                    <td className="px-4 py-4 align-top">{getStockBadge(product.displayStatus)}</td>
                    <td className="px-4 py-4 align-top text-right">
                      <p className="text-sm font-black text-industrial-900">${product.price?.toLocaleString()}</p>
                      <p className="text-[10px] text-metallic-500 font-bold uppercase tracking-widest">Starting</p>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/products/${product.id}`}
                          className="w-11 h-11 inline-flex items-center justify-center rounded-xl bg-white border border-metallic-100 text-industrial-900 hover:bg-metallic-50 transition-colors"
                          title="View details"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </Link>
                        <button
                          onClick={() => {
                            addToCart(product);
                            setAddedProductId(product.id);
                            window.setTimeout(() => setAddedProductId(null), 1500);
                          }}
                          className="w-11 h-11 inline-flex items-center justify-center rounded-xl bg-industrial-600 hover:bg-industrial-700 text-white shadow-lg shadow-industrial-900/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-default"
                          disabled={addedProductId === product.id}
                          title={addedProductId === product.id ? "Added" : "Add to cart"}
                        >
                          {addedProductId === product.id ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13L17 13M7 13h10M10 21a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    </td>
	                  </tr>
	                ))}
	              </tbody>
	            </table>
	          </div>

	          {filteredProducts.length > pageSize && (
	            <div className="px-5 py-4 bg-white border-t border-metallic-100 flex flex-col sm:flex-row items-center justify-between gap-4">
	              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-metallic-500">
	                Page {currentPage} of {totalPages}
	              </div>
	              <div className="flex items-center gap-2">
	                <button
	                  type="button"
	                  onClick={() => setQueryParam("page", String(Math.max(1, currentPage - 1)))}
	                  disabled={currentPage <= 1}
	                  className="px-4 py-2 rounded-xl border border-metallic-200 bg-white text-industrial-900 font-black text-xs uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed hover:bg-metallic-50 transition-colors"
	                >
	                  Prev
	                </button>
	                <button
	                  type="button"
	                  onClick={() => setQueryParam("page", String(Math.min(totalPages, currentPage + 1)))}
	                  disabled={currentPage >= totalPages}
	                  className="px-4 py-2 rounded-xl border border-metallic-200 bg-white text-industrial-900 font-black text-xs uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed hover:bg-metallic-50 transition-colors"
	                >
	                  Next
	                </button>
	              </div>
	            </div>
	          )}
	        </div>

        {filteredProducts.length === 0 && (
          <div className="industrial-error max-w-md mx-auto mt-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="industrial-error-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p>No products found matching your criteria. Please refine your filters.</p>
          </div>
        )}

        {/* Industrial Supply Portal - Refactored from Home page */}
        <section id="wholesale" className="mt-24 py-24 bg-industrial-950 text-white rounded-[3rem] relative overflow-hidden shadow-2xl">
          {/* Background Image Overlay */}
          <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
            <Image 
              src="/New stuff/Public Compressed/bulk logistiscs.png" 
              alt="Industrial Background" 
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-industrial-950/60"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <p className="text-sm font-black uppercase tracking-[0.4em] text-cyan-400 mb-4">Industrial Supply Portal</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-8">
                Wholesale Authority & <span className="text-cyan-300">Volume Supply</span>
              </h2>
              
              {/* Volume-Based Tier Selector Input */}
              <div className="max-w-md mx-auto mb-12 relative">
                <label htmlFor="volume-input" className="block text-[10px] font-black uppercase tracking-[0.2em] text-industrial-400 mb-3">
                  Input Required Volume (Liters)
                </label>
                <div className="relative group">
                  <input
                    id="volume-input"
                    type="number"
                    min="0"
                    placeholder="e.g. 1000"
                    className="w-full bg-white/5 border border-white/20 rounded-2xl px-6 py-5 text-2xl font-black text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all placeholder:text-white/20"
                    value={wholesaleVolume || ''}
                    onChange={(e) => setWholesaleVolume(Number(e.target.value))}
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-cyan-400 font-black text-xl">L</div>
                </div>
              </div>
            </div>

            {/* 3-Column Volume Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  id: 1,
                  title: "Standard Bulk",
                  volume: "100L – 499L",
                  features: ["LCL Sea Freight", "Standard UN-Rated Jerry Cans"],
                  positioning: "Market-competitive entry bulk.",
                  icon: <Boxes className="w-8 h-8" />
                },
                {
                  id: 2,
                  title: "Enterprise Supply",
                  volume: "500L – 1,999L",
                  features: ["FCL/LCL Logistics", "200L High-Density Steel Drums"],
                  positioning: "15% Volume Discount",
                  highlight: "Most Popular",
                  icon: <Truck className="w-8 h-8" />
                },
                {
                  id: 3,
                  title: "Strategic Partnership",
                  volume: "2,000L+",
                  features: ["Dedicated 1,000L IBC Totes", "Global Contract Logistics"],
                  positioning: "Direct Factory Pricing & Custom Lead-Times",
                  icon: <Handshake className="w-8 h-8" />
                }
              ].map((tier) => (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: tier.id * 0.1 }}
                  className={`relative p-8 rounded-[2rem] border transition-all duration-500 flex flex-col h-full ${
                    activeTier === tier.id 
                      ? "bg-white/10 border-cyan-500 ring-2 ring-cyan-500 scale-105 z-20 shadow-[0_0_50px_rgba(34,211,238,0.2)]" 
                      : "bg-white/5 border-white/10 scale-100 z-10"
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-industrial-950 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                      {tier.highlight}
                    </div>
                  )}
                  
                  <div className="mb-8">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                      activeTier === tier.id ? "bg-cyan-500 text-industrial-950" : "bg-white/10 text-cyan-400"
                    }`}>
                      {tier.icon}
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight mb-2">Tier {tier.id}: {tier.title}</h3>
                    <p className="text-2xl font-black text-white mb-4">{tier.volume}</p>
                    <p className={`text-sm font-bold ${activeTier === tier.id ? "text-cyan-300" : "text-industrial-400"}`}>
                      {tier.positioning}
                    </p>
                  </div>

                  <ul className="space-y-4 mb-10 flex-grow">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-sm text-industrial-200">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link 
                    href={wholesaleVolume > 0 && activeTier === tier.id 
                      ? `/contact?subject=Bulk %26 Wholesale Quote&message=I would like to request a quote for ${wholesaleVolume} Liters of Caluanie Muelear Oxidize (Tier ${tier.id}: ${tier.title}).` 
                      : "/contact?subject=Bulk %26 Wholesale Quote"} 
                    className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all text-center hover:scale-105 ${
                      activeTier === tier.id 
                        ? "bg-cyan-500 text-industrial-950 shadow-lg shadow-cyan-500/20" 
                        : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                    }`}
                  >
                    {wholesaleVolume > 0 && activeTier === tier.id 
                      ? `Request Quote for ${wholesaleVolume} Liters` 
                      : "Request Volume Quote"}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Industrial Verification Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-white/10">
              {[
                { icon: <Scale className="w-6 h-6" />, title: "Batch-Specific COA", desc: "Every shipment includes a signed Certificate of Analysis (COA) for purity verification." },
                { icon: <ShieldCheck className="w-6 h-6" />, title: "DG Logistics", desc: "IATA and IMDG certified dangerous goods handling and documentation." },
                { icon: <Boxes className="w-6 h-6" />, title: "Ready-Stock", desc: "Current Factory Inventory: 15,000L ready for immediate dispatch." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-cyan-400">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-widest text-white mb-2">{item.title}</h4>
                    <p className="text-xs text-industrial-400 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
