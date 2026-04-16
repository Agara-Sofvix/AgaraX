'use client';

import { motion } from "motion/react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gemini-light">
      <div className="relative">
        {/* Main loader circle */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-16 h-16 border-4 border-[#4F46E5]/10 border-t-[#4F46E5] rounded-full"
        />
        
        {/* Inner glowing dot */}
        <motion.div
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 m-auto w-3 h-3 bg-[#4F46E5] rounded-full shadow-[0_0_15px_rgba(249,115,22,0.3)]"
        />

        {/* Brand progress text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap"
        >
          <span className="text-[#4F46E5] text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">
            Loading Agara
          </span>
        </motion.div>
      </div>
    </div>
  );
}
