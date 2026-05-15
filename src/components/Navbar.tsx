"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import {
  ChevronDown,
  Globe,
  Menu,
  ShoppingCart,
  X,
} from "lucide-react";

type NavItem = {
  label: string;
  href?: string;
  children?: Array<{ label: string; href: string; description?: string }>;
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const { cartCount } = useCart();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const [openMobileSections, setOpenMobileSections] = useState<Record<string, boolean>>({});
  const pathname = usePathname();
  const closeTimerRef = useRef<number | null>(null);
  const desktopMenuRootRef = useRef<HTMLDivElement | null>(null);

  const navItems: NavItem[] = useMemo(() => {
    const productItems: NavItem = {
      label: "Products",
      children: [
        { label: "All Products", href: "/products", description: "Browse our full catalog" },
        { label: "Categories", href: "/categories", description: "Filter by product type" },
        { label: "Wholesale", href: "/#wholesale", description: "Bulk pricing & supply" },
      ],
    };

    const quickLinks: NavItem = {
      label: "Quick Links",
      children: [
        { label: "Product Offerings", href: "/products" },
        { label: "Categories", href: "/categories" },
        { label: "About Company", href: "/about" },
        { label: "Request Quote", href: "/contact" },
        { label: "Wholesale", href: "/#wholesale" },
      ],
    };

    const legalLinks: NavItem = {
      label: "Legal & Quality",
      children: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "ISO Certification", href: "/iso" },
        { label: "Shipping Policy", href: "/shipping" },
        { label: "Returns, Refunds & Cancellation", href: "/cancellation" },
      ],
    };

    return [
      { label: "Home", href: "/" },
      productItems,
      { label: "FAQ", href: "/faq" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      quickLinks,
      legalLinks,
    ];
  }, []);

  const desktopNavItems = useMemo(
    () =>
      navItems.filter(
        (item) => item.label !== "Quick Links" && item.label !== "Legal & Quality"
      ),
    [navItems]
  );

  const mobileNavItems = useMemo(
    () => navItems.filter((item) => item.label !== "Quick Links"),
    [navItems]
  );

  useEffect(() => {
    setIsMobileOpen(false);
    setOpenDesktopMenu(null);
    setOpenMobileSections({});
  }, [pathname]);

  useEffect(() => {
    if (!isMobileOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileOpen(false);
        setOpenDesktopMenu(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const root = desktopMenuRootRef.current;
      if (!root) return;
      if (openDesktopMenu && !root.contains(e.target as Node)) {
        setOpenDesktopMenu(null);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openDesktopMenu]);

  function requestCloseDesktopMenu() {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setOpenDesktopMenu(null);
    }, 90);
  }

  function cancelCloseDesktopMenu() {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  }

  return (
    <header className="industrial-header sticky top-0 z-[100]">
      <Link
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-industrial-950 focus:shadow-lg"
      >
        Skip to content
      </Link>

      <div className="bg-industrial-950/95 backdrop-blur py-2 text-[11px] md:text-xs text-industrial-200 border-b border-industrial-800/70">
        <div className="container mx-auto px-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Globe size={12} className="text-industrial-500" />
            <span className="hidden sm:inline">Bangkok, Thailand</span>
            <span className="text-industrial-600 hidden sm:inline">•</span>
            <span className="font-bold">Global Shipping</span>
          </div>
          <div />
        </div>
      </div>

      <nav className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 md:w-12 md:h-12 overflow-hidden rounded-xl bg-white p-1 shadow-inner ring-1 ring-black/5">
            <Image
              src="/images/logo.png"
              alt="Calu-Synthetics Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-black tracking-tight text-white leading-none">
              CALU-SYNTHETICS
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-industrial-300 font-bold">
              Industrial Chemical Supply
            </span>
          </div>
        </Link>

        <div ref={desktopMenuRootRef} className="hidden md:flex items-center gap-1">
          {desktopNavItems.map((item) => {
            if (item.children?.length) {
              const isOpen = openDesktopMenu === item.label;
              const isActive = item.children.some((c) => isActivePath(pathname, c.href));
              return (
                <div
                  key={item.label}
                  className="relative"
                >
                  <button
                    type="button"
                    className={clsx(
                      "flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-black uppercase tracking-wider transition-colors",
                      "focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400/20 focus-visible:ring-offset-2 focus-visible:ring-offset-industrial-900",
                      isActive ? "text-white" : "text-industrial-100 hover:text-white"
                    )}
                    onClick={() => setOpenDesktopMenu((cur) => (cur === item.label ? null : item.label))}
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                  >
                    <span>{item.label}</span>
                    <ChevronDown size={16} className={clsx("transition-transform", isOpen && "rotate-180")} />
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute left-3 right-3 -bottom-1 h-0.5 bg-cyan-400 rounded-full"
                        transition={{ type: "spring", stiffness: 500, damping: 36 }}
                      />
                    )}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ type: "tween", duration: 0.18 }}
                        className="absolute left-0 top-[calc(100%+10px)] w-[360px] rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 overflow-hidden"
                        role="menu"
                      >
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ type: "tween", duration: 0.22 }}
                          className="overflow-hidden"
                        >
                          <div className="p-2">
                            {item.children.map((child) => {
                              const active = isActivePath(pathname, child.href);
                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className={clsx(
                                    "block rounded-xl px-4 py-3 transition-colors",
                                    active ? "bg-industrial-50" : "hover:bg-industrial-50"
                                  )}
                                  onClick={() => setOpenDesktopMenu(null)}
                                >
                                  <div className="flex items-center justify-between gap-3">
                                    <div>
                                      <div className="text-sm font-black text-industrial-950">{child.label}</div>
                                      {child.description && (
                                        <div className="text-xs font-bold text-metallic-600">{child.description}</div>
                                      )}
                                    </div>
                                    <span className="text-xs font-black text-industrial-700">→</span>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            const href = item.href ?? "/";
            const active = isActivePath(pathname, href);
            return (
              <Link
                key={item.label}
                href={href}
                className={clsx(
                  "relative rounded-xl px-4 py-2 text-sm font-black uppercase tracking-wider transition-colors",
                  "focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400/20 focus-visible:ring-offset-2 focus-visible:ring-offset-industrial-900",
                  active ? "text-white" : "text-industrial-100 hover:text-white"
                )}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute left-3 right-3 -bottom-1 h-0.5 bg-cyan-400 rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 36 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <Link
            href="/cart"
            className={clsx(
              "relative inline-flex items-center justify-center rounded-xl p-2.5",
              "bg-industrial-800 hover:bg-industrial-700 transition-colors border border-industrial-700 shadow-lg",
              "focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400/20 focus-visible:ring-offset-2 focus-visible:ring-offset-industrial-900"
            )}
            aria-label="View Cart"
          >
            <ShoppingCart size={20} className="text-industrial-100" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-cyan-500 text-white text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full border-2 border-industrial-900 shadow-xl">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            className={clsx(
              "md:hidden inline-flex items-center justify-center rounded-xl p-2.5",
              "bg-industrial-800 text-white hover:bg-industrial-700 transition-colors border border-industrial-700 shadow-lg",
              "focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400/20 focus-visible:ring-offset-2 focus-visible:ring-offset-industrial-900"
            )}
            onClick={() => setIsMobileOpen((v) => !v)}
            aria-label={isMobileOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[150] md:hidden"
          >
            <button
              type="button"
              aria-label="Close menu overlay"
              className="absolute inset-0 bg-black/60"
              onClick={() => setIsMobileOpen(false)}
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="absolute right-0 top-0 h-full w-[min(92vw,420px)] bg-industrial-950 shadow-2xl border-l border-industrial-800 flex flex-col"
              aria-label="Mobile navigation"
            >
              <div className="p-5 border-b border-industrial-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-white p-1 ring-1 ring-black/5">
                    <Image src="/images/logo.png" alt="Calu-Synthetics Logo" fill className="object-contain" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-white tracking-tight">CALU-SYNTHETICS</div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-industrial-300">
                      Menu
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileOpen(false)}
                  className="rounded-xl p-2 text-white hover:bg-industrial-800 transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400/20"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-5 flex-1 overflow-auto">
                <div className="space-y-2">
                  {mobileNavItems.map((item) => {
                    if (item.children?.length) {
                      const isSectionOpen = Boolean(openMobileSections[item.label]);
                      return (
                        <div key={item.label} className="rounded-2xl border border-industrial-800 bg-industrial-900/20 overflow-hidden">
                          <button
                            type="button"
                            className="w-full px-4 py-3 text-xs font-black uppercase tracking-widest text-industrial-300 flex items-center justify-between hover:bg-industrial-900/30 transition-colors"
                            onClick={() =>
                              setOpenMobileSections((prev) => ({ ...prev, [item.label]: !prev[item.label] }))
                            }
                            aria-expanded={isSectionOpen}
                          >
                            <span>{item.label}</span>
                            <ChevronDown size={16} className={clsx("text-industrial-400 transition-transform", isSectionOpen && "rotate-180")} />
                          </button>

                          <AnimatePresence initial={false}>
                            {isSectionOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ type: "tween", duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-2 pb-2">
                                  {item.children.map((child) => (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      className={clsx(
                                        "block rounded-xl px-4 py-3 transition-colors",
                                        isActivePath(pathname, child.href)
                                          ? "bg-industrial-800 text-white"
                                          : "text-industrial-100 hover:bg-industrial-800 hover:text-white"
                                      )}
                                      onClick={() => setIsMobileOpen(false)}
                                    >
                                      <div className="text-base font-black">{child.label}</div>
                                      {child.description && (
                                        <div className="text-xs font-bold text-industrial-400">{child.description}</div>
                                      )}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    const href = item.href ?? "/";
                    const active = isActivePath(pathname, href);
                    return (
                      <Link
                        key={item.label}
                        href={href}
                        className={clsx(
                          "block rounded-2xl px-4 py-3 text-base font-black uppercase tracking-wide transition-colors border",
                          active
                            ? "bg-industrial-800 text-white border-industrial-700"
                            : "bg-industrial-900/20 text-industrial-100 border-industrial-800 hover:bg-industrial-800 hover:text-white hover:border-industrial-700"
                        )}
                        onClick={() => setIsMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileOpen(false)}
                    className="col-span-2 inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-black uppercase tracking-wider bg-cyan-500 text-industrial-950 hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
