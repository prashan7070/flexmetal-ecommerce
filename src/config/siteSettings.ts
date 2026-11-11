import { SiteSettings } from '../types';

export const defaultSiteSettings: SiteSettings = {
  brandName: 'FLEXMETAL',
  tagline: 'INNOVATION THAT PROTECTS YOUR PROGRESS.',
  phone: '+94 11 289 4400',
  whatsappNumber: '+94771234567', // Standard +94 WhatsApp format
  email: 'info@flexmetal.lk',
  address: 'No. 142/B, Baseline Industrial Zone, Colombo 09, Sri Lanka',
  businessHours: 'Monday – Friday: 8:30 AM – 5:30 PM | Saturday: 9:00 AM – 1:30 PM',
  currency: 'LKR',
  ecommerceEnabled: true,
  paymentEnabled: false, // Manual payment / order quote workflow per specification
  socialLinks: {
    linkedin: 'https://linkedin.com/company/flexmetal',
    facebook: 'https://facebook.com/flexmetal.shutters',
    instagram: 'https://instagram.com/flexmetal.solutions',
  },
};
