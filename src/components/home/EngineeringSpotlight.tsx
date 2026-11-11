import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sliders, Shield, Zap, Sparkles } from 'lucide-react';

export const EngineeringSpotlight: React.FC = () => {
  const specs = [
    {
      title: 'Structural Finishes',
      detail: 'Electrostatically bonded polyester powder coatings (RAL 7016, 9005, 9010) or 20-micron architectural anodization.',
    },
    {
      title: 'Drive Mechanisms',
      detail: 'Direct-drive heavy flange gear motors (415V/3-phase) or whisper-quiet tubular drives with integrated soft start/stop.',
    },
    {
      title: 'Material Integrity',
      detail: '0.9mm to 1.4mm cold-rolled galvanized structural steel or 6063-T6 high-tensile tempered extruded aluminium.',
    },
    {
      title: 'Aperture Geometry',
      detail: 'Custom fabricated spans from 1,000 mm up to 15,000 mm width with certified wind-resistance endlock clips.',
    },
  ];

  return (
    <section className="py-24 bg-[#080B10] border-b border-[#29323D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bold Typography & Technical Grid */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-5 h-[2px] bg-[#00A8F0]" />
                <span className="text-xs font-bold tracking-[0.2em] text-[#00A8F0] uppercase">
                  ENGINEERING SPOTLIGHT
                </span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#F5F7FA] tracking-tight uppercase leading-[1.1]">
                DESIGNED FOR STRENGTH.
                <br />
                BUILT FOR PERFORMANCE.
              </h2>
              <p className="text-sm text-[#9099A6] mt-4 leading-relaxed max-w-xl">
                Every component is engineered to eliminate weak points. From high-stress axle shafts and counter-balancing helical springs to vibration-dampened guide channels.
              </p>
            </div>

            {/* 2x2 Technical Specification Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {specs.map((item) => (
                <div
                  key={item.title}
                  className="bg-[#11161D] border border-[#29323D] p-5 rounded-sm"
                >
                  <h3 className="font-display font-bold text-sm text-[#F5F7FA] mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#00A8F0] rounded-full" />
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#9099A6] leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-[#00A8F0] hover:bg-[#008FCF] text-white text-xs font-bold tracking-widest uppercase px-7 py-3.5 rounded-sm transition-all duration-200 shadow-md hover:shadow-[#00A8F0]/30"
              >
                <span>EXPLORE TECHNICAL CATALOG</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Industrial Close-up Shutter Photography */}
          <div className="lg:col-span-5">
            <div className="relative rounded-sm overflow-hidden border border-[#29323D] bg-[#11161D] group">
              <img
                src="/src/assets/images/shutter_perforated_detail_1794361322601.jpg"
                alt="Close-up perforated industrial roller shutter slat profile"
                className="w-full h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080B10] via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#00A8F0] block mb-1">
                  AERO-MICRO DETAIL
                </span>
                <p className="text-sm font-semibold text-[#F5F7FA]">
                  Precision 3mm CNC punched perforations ensuring structural resistance with uniform illumination.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
