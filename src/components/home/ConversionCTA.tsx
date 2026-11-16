import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, PhoneCall } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const ConversionCTA: React.FC = () => {
  const { settings } = useSettings();

  return (
    <section className="relative py-28 bg-[#080B10] overflow-hidden border-b border-[#29323D]">
      {/* Background Subtle Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,168,240,0.15),rgba(8,11,16,0))] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-5 h-[2px] bg-[#00A8F0]" />
          <span className="text-xs font-bold tracking-[0.2em] text-[#00A8F0] uppercase">
            NEXT STEPS
          </span>
          <span className="w-5 h-[2px] bg-[#00A8F0]" />
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F7FA] tracking-tight max-w-3xl mx-auto leading-tight mb-6">
          Ready to Engineer an Uncompromising Access Barrier?
        </h2>

        <p className="text-sm sm:text-base text-[#9099A6] max-w-xl mx-auto mb-10 leading-relaxed">
          Tell us your aperture dimensions and site realities. Our structural team will calculate wind deflection, specify direct-drive motor requirements, and generate an itemized technical proposal.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/quote"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#00A8F0] hover:bg-[#0094d4] text-[#080B10] hover:text-black text-sm font-bold tracking-wider px-8 py-4 rounded-full transition-all duration-200 shadow-xl hover:shadow-[#00A8F0]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A8F0] group"
          >
            <span>Let&apos;s Build Your Solution</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#171E27] hover:bg-[#202936] text-[#F5F7FA] hover:text-[#00A8F0] border border-[#29323D] hover:border-[#00A8F0]/50 text-sm font-semibold px-8 py-4 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A8F0]"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Speak with an Engineer</span>
          </Link>
        </div>

        {/* Quick direct phone / WhatsApp line */}
        <div className="mt-8 text-xs text-[#9099A6]">
          Direct Inquiry Hotline:{' '}
          <a
            href={`tel:${settings.phone.replace(/\s+/g, '')}`}
            className="text-[#F5F7FA] hover:text-[#00A8F0] font-semibold underline underline-offset-4"
          >
            {settings.phone}
          </a>
        </div>
      </div>
    </section>
  );
};
