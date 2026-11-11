import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';

export const AboutPreview: React.FC = () => {
  return (
    <section className="py-24 bg-[#080B10] border-b border-[#29323D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Architectural Warehouse Image */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-sm border border-[#29323D] bg-[#11161D]">
              <img
                src="/assets/aistudio/project-modern-commercial-warehouse_aa05adc9.webp"
                alt="Modern commercial warehouse shutter installation"
                className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080B10]/80 via-transparent to-transparent" />
            </div>

            {/* Overlapping small detail badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#171E27] border border-[#29323D] p-5 shadow-2xl rounded-sm max-w-[260px] hidden sm:block">
              <span className="text-[11px] font-bold text-[#00A8F0] uppercase tracking-widest block mb-1">
                ENGINEERING STANDARD
              </span>
              <p className="text-xs text-[#F5F7FA] font-medium leading-snug">
                Precision cold-rolled interlocking slats engineered for high-cycle structural stability.
              </p>
            </div>
          </div>

          {/* Right: Editorial Storytelling */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-5 h-[2px] bg-[#00A8F0]" />
              <span className="text-xs font-bold tracking-[0.2em] text-[#00A8F0] uppercase">
                ABOUT FLEXMETAL
              </span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#F5F7FA] tracking-tight leading-tight uppercase">
              PROTECTION BUILT WITH PRECISION.
            </h2>

            <p className="text-sm sm:text-base text-[#9099A6] leading-relaxed">
              At FLEXMETAL, we engineer high-performance rolling shutters and automated gate systems that safeguard enterprise infrastructure, commercial storefronts, and premium residences without compromising architectural elegance.
            </p>

            <p className="text-sm sm:text-base text-[#9099A6] leading-relaxed">
              Every shutter is manufactured with rigorous tolerance checks, utilizing heavy-gauge structural alloys, precision wind-lock endclips, and industrial-grade motorized actuators calibrated for seamless daily operation.
            </p>

            {/* Three concise feature points */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#00A8F0]/10 border border-[#00A8F0]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#00A8F0]" />
                </div>
                <span className="text-sm text-[#F5F7FA]">
                  Automated CNC roll-forming with consistent gauge thickness.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#00A8F0]/10 border border-[#00A8F0]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#00A8F0]" />
                </div>
                <span className="text-sm text-[#F5F7FA]">
                  Severe weather wind-lock systems tested up to Class 4 ratings.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#00A8F0]/10 border border-[#00A8F0]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#00A8F0]" />
                </div>
                <span className="text-sm text-[#F5F7FA]">
                  Turnkey service from site measurement to certified commissioning.
                </span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-[#171E27] hover:bg-[#1f2937] text-white hover:text-[#00A8F0] border border-[#29323D] hover:border-[#00A8F0]/50 text-xs font-bold tracking-widest uppercase px-6 py-3.5 rounded-sm transition-all duration-200"
              >
                <span>EXPLORE OUR COMPANY</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
