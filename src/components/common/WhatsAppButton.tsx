import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const WhatsAppButton: React.FC = () => {
  const { settings } = useSettings();
  const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const message = encodeURIComponent(
    `Hello FLEXMETAL Team, I am contacting you regarding rolling shutter systems and quote inquiries.`
  );
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:shadow-[#25D366]/40 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
      aria-label="Contact FLEXMETAL on WhatsApp"
    >
      <MessageCircle className="w-5 h-5 fill-current" />
      <span className="hidden sm:inline-block text-xs font-bold tracking-wider uppercase">
        WhatsApp Us
      </span>
    </a>
  );
};
