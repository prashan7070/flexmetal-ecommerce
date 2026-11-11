import React from 'react';
import { Link } from 'react-router-dom';
import { Factory, Wrench, Cpu, RefreshCw, ArrowRight } from 'lucide-react';

export const CoreServices: React.FC = () => {
  const services = [
    {
      index: '01',
      icon: Factory,
      title: 'Custom Manufacturing',
      description: 'Computer-aided roll-forming and CNC cutting of steel, aluminium, and perforated slats tailored to exact opening dimensions.',
      link: '/services#manufacturing',
    },
    {
      index: '02',
      icon: Wrench,
      title: 'Professional Installation',
      description: 'Factory-trained structural installers providing end-to-end mounting, motor calibration, and safety compliance testing.',
      link: '/services#installation',
    },
    {
      index: '03',
      icon: Cpu,
      title: 'Automation & Motorization',
      description: 'Retrofitting existing manual shutters with direct-drive tubular motors, remote rolling codes, and safety photocell sensors.',
      link: '/services#automation',
    },
    {
      index: '04',
      icon: RefreshCw,
      title: 'Repair & Maintenance',
      description: 'Preventive service contracts, spring re-tensioning, slat replacement, and emergency technician dispatch for high-frequency gates.',
      link: '/services#repair',
    },
  ];

  return (
    <section className="py-24 bg-[#11161D] border-y border-[#29323D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-5 h-[2px] bg-[#00A8F0]" />
            <span className="text-xs font-bold tracking-[0.2em] text-[#00A8F0] uppercase">
              CAPABILITIES & SERVICES
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#F5F7FA] tracking-tight uppercase">
            COMPLETE SHUTTER SOLUTIONS.
          </h2>
          <p className="text-sm text-[#9099A6] mt-2">
            From initial site consultation and precision engineering to turnkey commissioning and lifetime maintenance.
          </p>
        </div>

        {/* 4-Card Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.index}
                className="group relative bg-[#080B10] border border-[#29323D] hover:border-[#00A8F0] p-8 rounded-sm transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Header row: Index & Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-display font-bold text-2xl text-[#9099A6]/40 group-hover:text-[#00A8F0] transition-colors">
                      {service.index}
                    </span>
                    <div className="w-10 h-10 rounded-sm bg-[#171E27] border border-[#29323D] group-hover:border-[#00A8F0]/40 flex items-center justify-center text-[#00A8F0] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-lg text-[#F5F7FA] group-hover:text-[#00A8F0] transition-colors mb-3">
                    {service.title}
                  </h3>

                  <p className="text-xs text-[#9099A6] leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <Link
                  to={service.link}
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#F5F7FA] group-hover:text-[#00A8F0] uppercase transition-colors pt-4 border-t border-[#29323D]/60"
                >
                  <span>EXPLORE SERVICE</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
