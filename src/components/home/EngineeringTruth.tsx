import React from 'react';
import { ArrowUpRight, ShieldCheck, Gauge, Clock, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EngineeringTruth: React.FC = () => {
  return (
    <section className="py-24 bg-[#080B10] border-b border-[#29323D]/70 relative overflow-hidden">
      {/* Subtle architectural grid background */}
      <div className="absolute inset-0 bg-perforated-metal opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Provocative Senior Architectural Copywriting */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-2 h-2 bg-[#00A8F0]" />
              <span className="text-xs font-semibold tracking-wider text-[#00A8F0] uppercase">
                The FLEXMETAL Engineering Principle
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#F5F7FA] tracking-tight leading-[1.15] mb-6"
              style={{ textWrap: 'balance' }}
            >
              We Don&apos;t Build &quot;Generic&quot; Shutters,
              <br className="hidden sm:block" />
              We Engineer Uninterrupted Access
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#9099A6] leading-relaxed mb-8 max-w-2xl font-normal">
              <p>
                Anyone can bend sheet metal and call it a roller shutter. Commodity catalogs can churn out generic slats in minutes. But here&apos;s what sets serious industrial facilities apart: <span className="text-[#F5F7FA] font-medium">we don&apos;t chase the illusion of cheapest price per square meter. We engineer for zero downtime.</span>
              </p>
              <p>
                As seasoned access specialists, we analyze where your facility actually hurts: monsoon gale wind deflection that bows guide tracks, high-speed forklift traffic requiring rapid-cycle motors, and salty coastal corrosion in Colombo and Hambantota.
              </p>
              <p className="text-[15px] text-[#9099A6]">
                Then we chart a clear, millimeter-exact path to build it: tailored cold-rolled steel gauges, whisper-quiet planetary gearboxes, certified wind-locks, and a guaranteed 2-hour emergency response team in Sri Lanka.
              </p>
            </div>

            {/* Senior Action CTA matching user's photo 2 */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 bg-[#00A8F0] hover:bg-[#0094d4] text-[#080B10] hover:text-black font-bold text-sm px-6 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-[#00A8F0]/20 hover:shadow-[#00A8F0]/35 group"
              >
                <span>Let&apos;s Connect</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 stroke-[2.5]" />
              </Link>

              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#F5F7FA] hover:text-[#00A8F0] px-5 py-3.5 border border-[#29323D] hover:border-[#00A8F0]/50 rounded-full transition-colors"
              >
                <span>Explore Technical Services</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Grounded Engineering Reality Cards */}
          <div className="lg:col-span-5 space-y-4 pt-2">
            <div className="bg-[#11161D] border border-[#29323D] p-6 rounded-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-[#171E27] border border-[#29323D] flex items-center justify-center shrink-0 text-[#00A8F0]">
                  <Gauge className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#00A8F0] uppercase tracking-wider mb-1">
                    01 · Heavy Duty Cycle Rating
                  </div>
                  <h3 className="text-base font-bold text-[#F5F7FA] mb-1.5">
                    50,000+ Continuous Cycles
                  </h3>
                  <p className="text-xs text-[#9099A6] leading-relaxed">
                    High-tensile oil-tempered helical counterbalance springs with direct-drive induction gearboxes calibrated to prevent thermal shutdown during peak shift changes.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#11161D] border border-[#29323D] p-6 rounded-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-[#171E27] border border-[#29323D] flex items-center justify-center shrink-0 text-[#00A8F0]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#00A8F0] uppercase tracking-wider mb-1">
                    02 · Monsoon Cyclone Defense
                  </div>
                  <h3 className="text-base font-bold text-[#F5F7FA] mb-1.5">
                    Class 4 Wind Load Tested (160 km/h)
                  </h3>
                  <p className="text-xs text-[#9099A6] leading-relaxed">
                    Structural interlocking endclips securely anchored inside reinforced 100mm heavy-channel vertical jambs to withstand tropical depressions without track blowouts.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#11161D] border border-[#29323D] p-6 rounded-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-[#171E27] border border-[#29323D] flex items-center justify-center shrink-0 text-[#00A8F0]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#00A8F0] uppercase tracking-wider mb-1">
                    03 · Commercial Uptime Guarantee
                  </div>
                  <h3 className="text-base font-bold text-[#F5F7FA] mb-1.5">
                    2-Hour On-Site Emergency Dispatch
                  </h3>
                  <p className="text-xs text-[#9099A6] leading-relaxed">
                    Dedicated mobile service crews stationed across Western, Central, and Southern provinces with readily available spare actuators, remotes, and slat replacements.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#171E27]/50 border border-[#29323D]/60 rounded-sm flex items-center justify-between text-xs text-[#9099A6]">
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#00A8F0]" />
                <span>100% In-House Roll Forming &amp; Precision CNC</span>
              </div>
              <span className="font-semibold text-[#F5F7FA]">ISO 9001 Certified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
