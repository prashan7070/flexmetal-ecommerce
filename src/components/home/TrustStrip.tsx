import React from 'react';
import { Shield, Wrench, Layers, Headphones } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const capabilities = [
    {
      icon: Shield,
      title: 'Engineered for Durability',
      description: 'High-tensile cold-rolled steel and architectural alloys tested to withstand heavy cyclic loads and weather exposure.',
    },
    {
      icon: Wrench,
      title: 'Precision Installation',
      description: 'In-house certified technical crews ensuring millimeter-exact alignment, structural anchoring, and calibration.',
    },
    {
      icon: Layers,
      title: 'Custom Manufacturing',
      description: 'Bespoke profile roll-forming and tailored fabrication built to project-specific aperture dimensions.',
    },
    {
      icon: Headphones,
      title: 'Reliable Support',
      description: 'Scheduled preventive maintenance, emergency motorized servicing, and readily stocked replacement components.',
    },
  ];

  return (
    <div className="bg-[#11161D] border-y border-[#29323D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#29323D]/60">
          {capabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`flex flex-col ${idx !== 0 ? 'pt-6 md:pt-0 md:pl-8' : ''}`}
              >
                <div className="w-10 h-10 rounded bg-[#171E27] border border-[#29323D] flex items-center justify-center mb-4 text-[#00A8F0]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-base text-[#F5F7FA] mb-2 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-[#9099A6] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
