"use client";

import { motion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = MotionProps & {
  children: ReactNode;
  className?: string;
};

export default function Reveal({ children, className, ...motionProps }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

