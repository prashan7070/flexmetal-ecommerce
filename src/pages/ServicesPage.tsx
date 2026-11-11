import React from 'react';
import { Link } from 'react-router-dom';
import { Factory, Wrench, Cpu, RefreshCw, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080B10] pt-28 pb-24 text-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs text-[#9099A6] mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#00A8F0]">Engineering Services</span>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <span className="w-5 h-[2px] bg-[#00A8F0]" />
            <span className="text-xs font-bold tracking-[0.2em] text-[#00A8F0] uppercase">
              TURNKEY LIFECYCLE SOLUTIONS
            </span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white mb-6">
            ENGINEERING, FABRICATION & LIFETIME SUPPORT.
          </h1>

          <p className="text-sm sm:text-base text-[#9099A6] leading-relaxed">
            FLEXMETAL provides single-source accountability. From structural calculation and in-house CNC roll-forming to factory-certified on-site installation and preventive maintenance contracts.
          </p>
        </div>

        {/* Section 1: Manufacturing */}
        <div id="manufacturing" className="py-16 border-t border-[#29323D] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-display font-bold text-2xl text-[#00A8F0]">01</span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl uppercase text-white">
                Custom Shutter Manufacturing
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#9099A6] leading-relaxed">
              We operate dedicated roll-forming production lines capable of profiling high-tensile cold-rolled steel, structural architectural aluminium, and micro-perforated visual slats with tight tolerance controls.
            </p>
            <div className="space-y-2 text-xs text-[#F5F7FA]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00A8F0]" />
                <span>Single-span fabrication up to 15,000 mm opening width</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00A8F0]" />
                <span>Custom polyester architectural powder coating in standard RAL tones</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00A8F0]" />
                <span>Integrated interlocking wind-lock endclips for gale resistance</span>
              </div>
            </div>
            <div className="pt-2">
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 bg-[#00A8F0] hover:bg-[#008FCF] text-white text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-sm transition-colors"
              >
                <span>Request Custom Fabrication</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="h-[340px] sm:h-[400px] rounded-sm overflow-hidden border border-[#29323D] bg-[#11161D]">
            <img
              src="/src/assets/images/shutter_perforated_detail_1794361322601.jpg"
              alt="Custom manufacturing perforated shutter slats"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Section 2: Professional Installation */}
        <div id="installation" className="py-16 border-t border-[#29323D] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 h-[340px] sm:h-[400px] rounded-sm overflow-hidden border border-[#29323D] bg-[#11161D]">
            <img
              src="/assets/aistudio/project-modern-commercial-warehouse_aa05adc9.webp"
              alt="Installation on modern commercial warehouse"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-display font-bold text-2xl text-[#00A8F0]">02</span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl uppercase text-white">
                Turnkey Site Installation
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#9099A6] leading-relaxed">
              Proper structural mounting is the deciding factor in shutter longevity. Our certified technical crews handle lintel anchor calculations, barrel counter-balance tensioning, and electronic limit calibration across Sri Lanka.
            </p>
            <div className="space-y-2 text-xs text-[#F5F7FA]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00A8F0]" />
                <span>Heavy industrial anchorage to reinforced concrete or steel portals</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00A8F0]" />
                <span>Millimeter laser plumb and square leveling to prevent slat binding</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00A8F0]" />
                <span>Emergency manual hand chain & drop-brake safety audit</span>
              </div>
            </div>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-[#171E27] hover:bg-[#202936] text-white border border-[#29323D] text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-sm transition-colors"
              >
                <span>Schedule Site Survey</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Section 3: Automation & Motorization */}
        <div id="automation" className="py-16 border-t border-[#29323D] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-display font-bold text-2xl text-[#00A8F0]">03</span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl uppercase text-white">
                Motorization & Retrofit Automation
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#9099A6] leading-relaxed">
              Transform cumbersome manual shutters into modern automated access portals. We integrate three-phase direct drives, high-torque tubular motors, keyfobs, keypad access, and obstacle safety sensors.
            </p>
            <div className="space-y-2 text-xs text-[#F5F7FA]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00A8F0]" />
                <span>433MHz rolling code telemetry with 50-meter radio frequency range</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00A8F0]" />
                <span>Optical infrared safety beams with instantaneous reversal trigger</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00A8F0]" />
                <span>Seamless integration with building management systems (BMS)</span>
              </div>
            </div>
            <div className="pt-2">
              <Link
                to="/products?category=automation-accessories"
                className="inline-flex items-center gap-2 bg-[#00A8F0] hover:bg-[#008FCF] text-white text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-sm transition-colors"
              >
                <span>View Automation Kits</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="h-[340px] sm:h-[400px] rounded-sm overflow-hidden border border-[#29323D] bg-[#11161D]">
            <img
              src="/src/assets/images/storefront_security_shutter_1794361323169.jpg"
              alt="Automated storefront roller shutter motorization"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Section 4: Maintenance & Repair */}
        <div id="repair" className="py-16 border-t border-[#29323D] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 h-[340px] sm:h-[400px] rounded-sm overflow-hidden border border-[#29323D] bg-[#11161D]">
            <img
              src="/src/assets/images/industrial_logistics_doors_1794361324062.jpg"
              alt="Industrial maintenance and repair services"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-display font-bold text-2xl text-[#00A8F0]">04</span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl uppercase text-white">
                Preventive Maintenance & Repair
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#9099A6] leading-relaxed">
              Industrial shutters in high-traffic distribution centers require periodic mechanical lubrication, spring re-tensioning, and safety brake verification to prevent unbudgeted downtime.
            </p>
            <div className="space-y-2 text-xs text-[#F5F7FA]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00A8F0]" />
                <span>Annual and bi-annual comprehensive preventive service contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00A8F0]" />
                <span>Rapid response mobile technician teams for emergency gate jams</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00A8F0]" />
                <span>Extensive inventory of replacement slat profiles and motor drives</span>
              </div>
            </div>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-[#00A8F0] hover:bg-[#008FCF] text-white text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-sm transition-colors"
              >
                <span>Book Maintenance Service</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
