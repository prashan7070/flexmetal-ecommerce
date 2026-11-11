import React from 'react';
import { ArrowRight } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Consultation',
      description: 'We assess site aperture dimensions, structural lintels, wind load parameters, and frequency of cyclic operation.',
    },
    {
      number: '02',
      title: 'Design & Measurement',
      description: 'Precision on-site laser measurements and CAD shop drawings ensure millimeter clearance with overhead guide tracks.',
    },
    {
      number: '03',
      title: 'Manufacturing',
      description: 'In-house roll-forming, profile slitting, powder-coat curing, and pre-assembly testing under strict quality checkpoints.',
    },
    {
      number: '04',
      title: 'Installation & Support',
      description: 'Factory-trained technicians perform structural anchorage, motor limit calibration, handover testing, and routine maintenance.',
    },
  ];

  return (
    <section className="py-24 bg-[#080B10] border-b border-[#29323D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-5 h-[2px] bg-[#00A8F0]" />
            <span className="text-xs font-bold tracking-[0.2em] text-[#00A8F0] uppercase">
              METHODOLOGY
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#F5F7FA] tracking-tight uppercase">
            OUR ENGINEERING WORKFLOW.
          </h2>
          <p className="text-sm text-[#9099A6] mt-2">
            A systematic four-phase delivery model ensuring structural accuracy, seamless motor integration, and zero site surprises.
          </p>
        </div>

        {/* 4-Step Grid with Connecting Track */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="relative flex flex-col p-6 bg-[#11161D] border border-[#29323D] rounded-sm group hover:border-[#00A8F0]/50 transition-colors"
            >
              {/* Step Number Top */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-display font-black text-3xl text-[#00A8F0] tracking-tighter">
                  {step.number}
                </span>
                <span className="text-[10px] font-bold tracking-widest text-[#9099A6] uppercase">
                  PHASE {step.number}
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-[#F5F7FA] mb-2 group-hover:text-[#00A8F0] transition-colors">
                {step.title}
              </h3>

              <p className="text-xs text-[#9099A6] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
