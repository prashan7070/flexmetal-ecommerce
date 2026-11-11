import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Factory, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export const AboutPage: React.FC = () => {
  const { settings } = useSettings();

  return (
    <div className="min-h-screen bg-[#080B10] pt-28 pb-24 text-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs text-[#9099A6] mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#00A8F0]">About Company</span>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <span className="w-5 h-[2px] bg-[#00A8F0]" />
            <span className="text-xs font-bold tracking-[0.2em] text-[#00A8F0] uppercase">
              COMPANY PROFILE & ENGINEERING HERITAGE
            </span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white mb-6">
            ENGINEERING EXCELLENCE IN ROLLING CLOSURES.
          </h1>

          <p className="text-sm sm:text-base text-[#9099A6] leading-relaxed">
            FLEXMETAL manufactures and installs high-performance roller shutters, industrial access doors, and motorized security gates. Our mission is to combine rigorous structural strength with architectural finesse.
          </p>
        </div>

        {/* Split Section: Story & Factory Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-20 border-b border-[#29323D]">
          <div className="space-y-6">
            <h2 className="font-display font-bold text-2xl sm:text-3xl uppercase text-white">
              Manufactured with Industrial Precision
            </h2>
            <p className="text-xs sm:text-sm text-[#9099A6] leading-relaxed">
              Operating out of our Colombo facility, FLEXMETAL utilizes automated CNC roll-forming lines, automated punching machines, and modern curing ovens. We avoid generic lightweight imports; every slat profile is calibrated for thickness and tensile resistance.
            </p>
            <p className="text-xs sm:text-sm text-[#9099A6] leading-relaxed">
              Whether deploying high-speed insulated shutters for pharmaceutical warehouses in Biyagama or perforated architectural barriers along Galle Road retail frontages, our structural engineers prioritize longevity and safety.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#11161D] border border-[#29323D] rounded-sm">
                <span className="font-display font-bold text-2xl text-[#00A8F0] block mb-1">0.9–1.4mm</span>
                <span className="text-xs text-[#9099A6]">Heavy structural steel & aluminium gauges</span>
              </div>
              <div className="p-4 bg-[#11161D] border border-[#29323D] rounded-sm">
                <span className="font-display font-bold text-2xl text-[#00A8F0] block mb-1">15,000mm</span>
                <span className="text-xs text-[#9099A6]">Single span structural aperture capability</span>
              </div>
            </div>
          </div>

          <div className="h-[400px] sm:h-[480px] rounded-sm overflow-hidden border border-[#29323D] bg-[#11161D]">
            <img
              src="/src/assets/images/industrial_logistics_doors_1794361324062.jpg"
              alt="FLEXMETAL automated logistics bay installation"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Quality Philosophy & Capabilities */}
        <div className="py-20 border-b border-[#29323D]">
          <div className="max-w-2xl mb-12">
            <h2 className="font-display font-bold text-2xl sm:text-3xl uppercase text-white mb-3">
              Core Manufacturing Principles
            </h2>
            <p className="text-xs sm:text-sm text-[#9099A6]">
              Four non-negotiable principles that govern every product manufactured in our Colombo plant.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'High-Tensile Raw Material',
                desc: 'We procure cold-rolled structural steel coils and architectural 6063-T6 aluminium with uniform metallurgy.',
              },
              {
                title: 'Tight Roll-Forming Tolerances',
                desc: 'Computerized multi-pass forming ensures smooth interlocking articulation and eliminates slat binding.',
              },
              {
                title: 'Marine Atmospheric Protection',
                desc: 'Heavy zinc galvanization and multi-stage powder curing resist high coastal humidity across Sri Lanka.',
              },
              {
                title: 'Certified In-House Crews',
                desc: 'Every installation is executed by our own salaried technicians, never outsourced to third-party general laborers.',
              },
            ].map((p, idx) => (
              <div key={idx} className="p-6 bg-[#11161D] border border-[#29323D] rounded-sm">
                <span className="text-xs font-bold text-[#00A8F0] uppercase tracking-wider block mb-2">
                  Principle 0{idx + 1}
                </span>
                <h3 className="font-display font-bold text-base text-white mb-2">{p.title}</h3>
                <p className="text-xs text-[#9099A6] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Facility Location Callout */}
        <div className="py-16 text-center max-w-2xl mx-auto space-y-6">
          <h2 className="font-display font-bold text-2xl uppercase text-white">
            Visit Our Showroom & Production Facility
          </h2>
          <p className="text-xs sm:text-sm text-[#9099A6]">
            Architects, contractors, and project developers are welcome to inspect working slat mockups and motorized controllers at our Colombo demonstration gallery.
          </p>
          <div className="p-4 bg-[#11161D] border border-[#29323D] rounded-sm text-xs text-[#F5F7FA]">
            {settings.address} · Phone: {settings.phone}
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#00A8F0] hover:bg-[#008FCF] text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-sm transition-colors"
          >
            <span>Arrange Facility Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
