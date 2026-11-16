import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { assetUrl } from '../../utils/assetUrl';

interface ClientItem {
  id: string;
  name: string;
  category: string;
  location: string;
  logoWhite: string;
  originalCrop: string;
  projectNote: string;
}

export const ClientMarquee: React.FC = () => {
  const clients: ClientItem[] = [
    {
      id: 'siba',
      name: 'SIBA Campus',
      category: 'Higher Education & Research',
      location: 'Kandy',
      logoWhite: '/assets/clients/logo-0-siba-crisp-white.png',
      originalCrop: '/assets/clients/logo-0-siba.png',
      projectNote: 'Perimeter motorization & access control',
    },
    {
      id: 'gov',
      name: 'Democratic Socialist Republic of Sri Lanka',
      category: 'State Infrastructure Facility',
      location: 'Colombo',
      logoWhite: '/assets/clients/logo-1-gov-crisp-white.png',
      originalCrop: '/assets/clients/logo-1-gov.png',
      projectNote: 'Heavy-duty security grilles & storm shutters',
    },
    {
      id: 'queens',
      name: "Queen's Hotel",
      category: 'Heritage Luxury Hospitality',
      location: 'Kandy (Est. 1865)',
      logoWhite: '/assets/clients/logo-2-queens-crisp-white.png',
      originalCrop: '/assets/clients/logo-2-queens.png',
      projectNote: 'Architectural custom-color acoustic roller gates',
    },
    {
      id: 'ekho-ella',
      name: 'EKHO Ella',
      category: 'Mountain Luxury Boutique Resort',
      location: 'Ella Highlands',
      logoWhite: '/assets/clients/logo-3-ekho-ella-crisp-white.png',
      originalCrop: '/assets/clients/logo-3-ekho-ella.png',
      projectNote: 'Weather-tight thermal cyclone shutter barriers',
    },
    {
      id: 'ekho-tissa',
      name: 'EKHO Safari',
      category: 'Wilderness Sanctuary Resort',
      location: 'Tissamaharama',
      logoWhite: '/assets/clients/logo-4-ekho-tissa-crisp-white.png',
      originalCrop: '/assets/clients/logo-4-ekho-tissa.png',
      projectNote: 'Heavy-cycle automated loading & perimeter shutters',
    },
    {
      id: 'ekho-lake',
      name: 'EKHO Lake House',
      category: 'Historic Lakeside Estate',
      location: 'Polonnaruwa',
      logoWhite: '/assets/clients/logo-5-ekho-lake-crisp-white.png',
      originalCrop: '/assets/clients/logo-5-ekho-lake.png',
      projectNote: 'Corrosion-resistant marine alloy shutter profiles',
    },
  ];

  // Repeat for continuous seamless horizontal ticker
  const marqueeItems = [...clients, ...clients, ...clients];

  return (
    <section className="py-16 sm:py-20 bg-[#0B0F15] border-y border-[#29323D]/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#29323D]/40">
          <div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-2 h-2 rounded-none bg-[#00A8F0]" />
              <span className="text-xs font-semibold tracking-wider text-[#00A8F0] uppercase">
                Proven On Critical Sri Lankan Perimeters
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA] tracking-tight">
              Trusted by National Heritage Landmarks, Luxury Resorts & Enterprise Facilities
            </h2>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9099A6] hover:text-[#00A8F0] transition-colors shrink-0 group"
          >
            <span>View installation case studies</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* Marquee viewport container with edge fade masks */}
      <div className="relative w-full overflow-hidden select-none">
        {/* Left & Right gradient masks for smooth fade-in/out */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#0B0F15] via-[#0B0F15]/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#0B0F15] via-[#0B0F15]/80 to-transparent z-10" />

        {/* Slow continuous moving animation */}
        <div className="animate-marquee-slow flex items-center gap-6 py-3 px-4">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="flex items-center gap-4 bg-[#11161D] hover:bg-[#151C26] border border-[#29323D] hover:border-[#00A8F0]/50 px-5 py-3.5 rounded-sm transition-all duration-300 shrink-0 min-w-[320px] max-w-[380px] group shadow-md"
            >
              {/* Logo graphic on dark metallic surface */}
              <div className="w-20 h-14 flex items-center justify-center shrink-0 bg-[#171E27] border border-[#29323D] rounded-xs p-2 group-hover:border-[#00A8F0]/40 transition-colors">
                <img
                  src={assetUrl(item.logoWhite)}
                  alt={item.name}
                  className="max-h-10 max-w-full object-contain brightness-125 opacity-90 group-hover:opacity-100 transition-all duration-200"
                  loading="lazy"
                />
              </div>

              {/* Text detail */}
              <div className="flex flex-col min-w-0 pr-2">
                <span className="text-sm font-bold text-[#F5F7FA] truncate group-hover:text-white transition-colors tracking-tight">
                  {item.name}
                </span>
                <span className="text-[11px] text-[#9099A6] truncate font-medium">
                  {item.category}
                </span>
                <span className="text-[11px] text-[#00A8F0] tracking-wide mt-0.5 truncate">
                  {item.location} · {item.projectNote}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Raw client banner lockup strip for full authenticity */}
      <div className="max-w-5xl mx-auto px-4 mt-8 pt-6 border-t border-[#29323D]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9099A6]">
        <span className="text-center sm:text-left">
          Official access and rolling shutter installations inspected to BS EN 13241-1 & SLS national industrial standards.
        </span>
        <div className="flex items-center gap-4 shrink-0 text-[11px] font-medium text-[#F5F7FA]">
          <span>50,000+ Cycles Tested</span>
          <span className="text-[#29323D]">|</span>
          <span>160 km/h Wind Rated</span>
          <span className="text-[#29323D]">|</span>
          <span>24/7 Rapid Response</span>
        </div>
      </div>
    </section>
  );
};
