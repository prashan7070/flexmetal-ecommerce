import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useSettings } from '../../context/SettingsContext';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { settings } = useSettings();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'SERVICES', path: '/services' },
    { name: 'PRODUCTS', path: '/products' },
    { name: 'PROJECTS', path: '/projects' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080B10]/95 backdrop-blur-md border-b border-[#29323D]/60 py-3.5 shadow-2xl'
          : 'bg-gradient-to-b from-[#080B10]/80 via-[#080B10]/40 to-transparent border-b border-white/10 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Wordmark (FLEX in white, METAL in electric blue) */}
        <Link
          to="/"
          className="flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A8F0] rounded"
          aria-label="FLEXMETAL Home"
        >
          <span className="font-display font-bold text-2xl tracking-tight text-white">
            FLEX<span className="text-[#00A8F0]">METAL</span>
          </span>
        </Link>

        {/* Center / Right Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-[12px] font-semibold tracking-wider text-[#9099A6]">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`transition-colors duration-200 hover:text-white relative py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00A8F0] ${
                  isActive ? 'text-white' : ''
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00A8F0]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Far Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative p-2 text-[#9099A6] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A8F0] rounded"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#00A8F0] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Admin link shortcut */}
          <Link
            to="/admin"
            className="text-[11px] font-semibold tracking-wider text-[#9099A6] hover:text-white transition-colors uppercase px-2 py-1"
            title="Management Portal"
          >
            PORTAL
          </Link>

          {/* Bright Cyan Blue Quote Button */}
          <Link
            to="/quote"
            className="bg-[#00A8F0] hover:bg-[#008FCF] text-white text-[12px] font-bold tracking-widest uppercase px-5 py-2.5 rounded transition-all duration-200 shadow-md hover:shadow-[#00A8F0]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#00A8F0] whitespace-nowrap"
          >
            REQUEST A QUOTE
          </Link>
        </div>

        {/* Mobile Menu & Cart Icon */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link
            to="/cart"
            className="relative p-2 text-[#9099A6] hover:text-white transition-colors"
            aria-label="Shopping cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#00A8F0] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-[#00A8F0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A8F0] rounded"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080B10] border-b border-[#29323D] px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-semibold tracking-wider py-2 border-b border-white/5 ${
                    isActive ? 'text-[#00A8F0]' : 'text-[#9099A6] hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              to="/admin"
              className="text-sm font-semibold tracking-wider py-2 text-[#9099A6] hover:text-white border-b border-white/5"
            >
              ADMIN PORTAL
            </Link>
          </nav>
          <div className="pt-2">
            <Link
              to="/quote"
              className="block text-center w-full bg-[#00A8F0] hover:bg-[#008FCF] text-white text-xs font-bold tracking-widest uppercase py-3 rounded transition-colors"
            >
              REQUEST A QUOTE
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
