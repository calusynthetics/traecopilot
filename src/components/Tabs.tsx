"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export type TabItem<T extends string> = {
  id: T;
  label: string;
  content: ReactNode;
};

type TabsProps<T extends string> = {
  items: TabItem<T>[];
  activeId: T;
  onChange: (id: T) => void;
  className?: string;
};

export default function Tabs<T extends string>({ items, activeId, onChange, className }: TabsProps<T>) {
  const active = items.find((item) => item.id === activeId) ?? items[0];

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2 border border-metallic-200 bg-white rounded-2xl p-2">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={`relative px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-colors ${
                isActive ? "text-industrial-950" : "text-metallic-600 hover:text-industrial-900"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="tabs-indicator"
                  className="absolute inset-0 rounded-xl bg-metallic-100 border border-metallic-200"
                  transition={{ type: "spring", stiffness: 520, damping: 40 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6">{active?.content}</div>
    </div>
  );
}

