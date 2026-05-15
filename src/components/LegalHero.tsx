"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type LegalHeroProps = {
  kicker: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  badges?: ReactNode[];
};

export default function LegalHero({
  kicker,
  title,
  subtitle,
  imageSrc,
  imageAlt,
  badges = [],
}: LegalHeroProps) {
  return (
    <section className="relative overflow-hidden bg-industrial-950 text-white min-h-[40vh] md:min-h-[50vh] flex flex-col justify-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-industrial-950 via-industrial-950/70 to-industrial-900/30" />
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-industrial-500/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-28 -right-16 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/80 text-[10px] font-black tracking-[0.25em] uppercase mb-6 mx-auto lg:mx-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300/80 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300"></span>
              </span>
              {kicker}
            </div>
            <h1 className="text-3xl md:text-6xl font-black tracking-tight leading-none mb-6">
              {title}
            </h1>
            <p className="text-industrial-200 text-sm md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              {subtitle}
            </p>

            {badges.length > 0 && (
              <div className="mt-8 md:mt-10 flex flex-wrap gap-2 justify-center lg:justify-start">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className="px-3 py-1.5 md:px-4 md:py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] md:text-xs font-bold text-industrial-100"
                  >
                    {badge}
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative rounded-2xl md:rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden shadow-2xl mx-auto max-w-[320px] md:max-w-none">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="relative h-56 md:h-96 w-full"
              >
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-contain p-8 md:p-12"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

