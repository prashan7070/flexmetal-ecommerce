import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, ShieldCheck, Cog, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[92svh] lg:min-h-screen flex items-center bg-[#080B10] overflow-hidden pt-24 lg:pt-0">
      {/* Background Hero Shutter Image with Gradient Mask */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/aistudio/hero-industrial-shutter_5c442b6f.webp"
          alt="Precision industrial metallic rolling shutter slats"
          className="w-full h-full object-cover object-right lg:object-[80%_center] opacity-80"
          loading="eager"
        />
        {/* Layered deep dark gradient for high typography contrast on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080B10] via-[#080B10]/90 to-transparent lg:w-[70%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B10] via-transparent to-[#080B10]/50" />
        <div className="absolute inset-0 bg-[#080B10]/20" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
        <div className="max-w-2xl lg:max-w-xl">
          {/* Eyebrow Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="w-6 h-[2px] bg-[#00A8F0]" />
            <span className="text-[12px] font-bold tracking-[0.25em] text-[#00A8F0] uppercase">
              ENGINEERED ROLLING SHUTTER SOLUTIONS
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: 'easeOut' }}
            className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#F5F7FA] leading-[1.05] uppercase mb-6"
            style={{ textWrap: 'balance' }}
          >
            INNOVATION
            <br />
            THAT PROTECTS
            <br />
            YOUR <span className="text-[#00A8F0] drop-shadow-[0_0_20px_rgba(0,168,240,0.35)]">PROGRESS.</span>
          </motion.h1>

          {/* Supporting Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
            className="text-[15px] sm:text-[16px] text-[#9099A6] leading-relaxed max-w-md mb-8"
          >
            High-performance rolling shutters engineered for industrial, commercial, and residential environments.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            {/* Primary Button */}
            <Link
              to="/quote"
              className="inline-flex items-center justify-center bg-[#00A8F0] hover:bg-[#008FCF] text-white text-[12px] font-bold tracking-widest uppercase px-7 py-3.5 rounded-sm transition-all duration-200 shadow-lg hover:shadow-[#00A8F0]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A8F0] group"
            >
              <span>REQUEST A QUOTE</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Secondary Button */}
            <Link
              to="/products"
              className="inline-flex items-center justify-center bg-[#171E27]/80 hover:bg-[#171E27] text-white hover:text-[#00A8F0] border border-[#29323D] hover:border-[#00A8F0]/50 text-[12px] font-bold tracking-widest uppercase px-7 py-3.5 rounded-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A8F0]"
            >
              VIEW PRODUCTS
            </Link>
          </motion.div>

          {/* Technical Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 pt-6 border-t border-[#29323D]/60 flex flex-wrap items-center gap-6 text-xs text-[#9099A6]"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00A8F0]" />
              <span>Heavy Cold-Rolled Galvanized Profiles</span>
            </div>
            <div className="flex items-center gap-2">
              <Cog className="w-4 h-4 text-[#00A8F0]" />
              <span>Direct-Drive & Whisper Automation</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center text-[#9099A6] opacity-70 hover:opacity-100 transition-opacity">
        <span className="text-[10px] tracking-widest uppercase mb-1 font-semibold">Scroll</span>
        <div className="animate-bounce">
          <ChevronDown className="w-4 h-4 text-[#00A8F0]" />
        </div>
      </div>
    </section>
  );
};
