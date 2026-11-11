import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const Footer: React.FC = () => {
  const { settings } = useSettings();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#080B10] border-t border-[#29323D] text-[#9099A6] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#29323D]/60">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block" aria-label="FLEXMETAL Home">
              <span className="font-display font-bold text-2xl tracking-tight text-white">
                FLEX<span className="text-[#00A8F0]">METAL</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-[#9099A6] leading-relaxed max-w-sm">
              High-performance rolling shutter solutions engineered for industrial, commercial, and residential spaces. Innovation that protects your progress.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#F5F7FA]">
              <ShieldCheck className="w-4 h-4 text-[#00A8F0]" />
              <span>Certified Structural Roll-Forming & Installation</span>
            </div>

            <div className="pt-2 flex items-center gap-3">
              {settings.socialLinks.linkedin && (
                <a
                  href={settings.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-sm bg-[#11161D] border border-[#29323D] hover:border-[#00A8F0] hover:text-[#00A8F0] flex items-center justify-center transition-colors text-xs font-bold"
                  aria-label="LinkedIn"
                >
                  IN
                </a>
              )}
              {settings.socialLinks.facebook && (
                <a
                  href={settings.socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-sm bg-[#11161D] border border-[#29323D] hover:border-[#00A8F0] hover:text-[#00A8F0] flex items-center justify-center transition-colors text-xs font-bold"
                  aria-label="Facebook"
                >
                  FB
                </a>
              )}
              {settings.socialLinks.instagram && (
                <a
                  href={settings.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-sm bg-[#11161D] border border-[#29323D] hover:border-[#00A8F0] hover:text-[#00A8F0] flex items-center justify-center transition-colors text-xs font-bold"
                  aria-label="Instagram"
                >
                  IG
                </a>
              )}
            </div>
          </div>

          {/* Quick Links / Company */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs tracking-widest text-[#F5F7FA] uppercase">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About FLEXMETAL
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-white transition-colors">
                  Completed Projects
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Engineering Services
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-[#00A8F0] transition-colors flex items-center gap-1">
                  <span>Portal Management</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs tracking-widest text-[#F5F7FA] uppercase">
              Systems
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products?category=industrial-roller-shutters" className="hover:text-white transition-colors">
                  Industrial Roller Shutters
                </Link>
              </li>
              <li>
                <Link to="/products?category=commercial-shutters" className="hover:text-white transition-colors">
                  Commercial Storefronts
                </Link>
              </li>
              <li>
                <Link to="/products?category=perforated-shutters" className="hover:text-white transition-colors">
                  Aero Perforated Systems
                </Link>
              </li>
              <li>
                <Link to="/products?category=motorized-roller-gates" className="hover:text-white transition-colors">
                  Motorized Rolling Gates
                </Link>
              </li>
              <li>
                <Link to="/products?category=insulated-shutters" className="hover:text-white transition-colors">
                  Insulated Acoustic Doors
                </Link>
              </li>
              <li>
                <Link to="/products?category=automation-accessories" className="hover:text-white transition-colors">
                  Motors & Automation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs tracking-widest text-[#F5F7FA] uppercase">
              Factory & Office
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#00A8F0] shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#00A8F0] shrink-0" />
                <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="hover:text-white">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#00A8F0] shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#00A8F0] shrink-0 mt-0.5" />
                <span>{settings.businessHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            © {currentYear} {settings.brandName} (Pvt) Ltd. All Rights Reserved. Engineered in Sri Lanka.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-white transition-colors">
              Support
            </Link>
            <span className="text-[#29323D]">|</span>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-[#29323D]">|</span>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
