import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { StorageService } from '../services/storage';

export const ContactPage: React.FC = () => {
  const { settings } = useSettings();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('New Project Shutter Inquiry');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please provide your full name';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email is required';
    if (!phone.trim()) errs.phone = 'Valid phone number is required';
    if (!message.trim() || message.trim().length < 10) errs.message = 'Please provide details (minimum 10 characters)';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    StorageService.saveInquiry({
      id: `inq-${Date.now()}`,
      name,
      email,
      phone,
      subject,
      message,
      status: 'new',
      createdAt: new Date().toISOString(),
    });

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#080B10] pt-28 pb-24 text-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs text-[#9099A6] mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#00A8F0]">Contact Team</span>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <span className="w-5 h-[2px] bg-[#00A8F0]" />
            <span className="text-xs font-bold tracking-[0.2em] text-[#00A8F0] uppercase">
              GET IN TOUCH
            </span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white mb-4">
            CONSULT OUR SHUTTER SPECIALISTS.
          </h1>

          <p className="text-xs sm:text-sm text-[#9099A6] leading-relaxed">
            Need site measurements, technical CAD specifications, or emergency maintenance? Contact our engineering office directly or submit an inquiry below.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Company Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 bg-[#11161D] border border-[#29323D] rounded-sm space-y-6">
              <h2 className="font-display font-bold text-lg uppercase text-white border-b border-[#29323D]/60 pb-3">
                Headquarters & Factory
              </h2>

              <ul className="space-y-4 text-xs">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#00A8F0] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Showroom & Works:</strong>
                    <span className="text-[#9099A6] leading-relaxed">{settings.address}</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#00A8F0] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Direct Line:</strong>
                    <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="text-[#00A8F0] hover:underline">
                      {settings.phone}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#00A8F0] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Engineering Inquiries:</strong>
                    <a href={`mailto:${settings.email}`} className="text-[#00A8F0] hover:underline">
                      {settings.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#00A8F0] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Operating Hours:</strong>
                    <span className="text-[#9099A6]">{settings.businessHours}</span>
                  </div>
                </li>
              </ul>

              {/* Direct WhatsApp Action */}
              <div className="pt-4 border-t border-[#29323D]/60">
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider py-3 rounded-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Chat on WhatsApp (+94)</span>
                </a>
              </div>
            </div>

            {/* Quick Note Card */}
            <div className="p-6 bg-[#171E27] border border-[#29323D] rounded-sm text-xs text-[#9099A6] leading-relaxed space-y-2">
              <strong className="text-white uppercase tracking-wider block">Rapid Site Surveys:</strong>
              <p>
                Our mobile field estimators conduct on-site laser surveys across Greater Colombo, Gampaha, Kalutara, and Kandy within 24 to 48 hours of initial inquiry.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 bg-[#11161D] border border-[#29323D] rounded-sm">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-950/60 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-bold text-2xl uppercase text-white">
                    Inquiry Received
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9099A6] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{name}</strong>. Your message has been logged into our support console. An engineer will follow up shortly via email or phone.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="inline-block bg-[#00A8F0] hover:bg-[#008FCF] text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-sm transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="font-display font-bold text-lg uppercase text-white border-b border-[#29323D]/60 pb-3">
                    Transmit Project Inquiry
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Priyantha Silva"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#171E27] border border-[#29323D] text-xs text-white p-3 rounded-sm outline-none focus:border-[#00A8F0]"
                      />
                      {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. p.silva@buildtech.lk"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#171E27] border border-[#29323D] text-xs text-white p-3 rounded-sm outline-none focus:border-[#00A8F0]"
                      />
                      {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block mb-1">
                        Phone Number (+94) *
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +94 77 333 4455"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#171E27] border border-[#29323D] text-xs text-white p-3 rounded-sm outline-none focus:border-[#00A8F0]"
                      />
                      {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block mb-1">
                        Inquiry Subject
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-[#171E27] border border-[#29323D] text-xs text-white p-3 rounded-sm outline-none"
                      >
                        <option value="New Project Shutter Inquiry">New Project Shutter Inquiry</option>
                        <option value="Storefront Retail Shutter System">Storefront Retail Shutter System</option>
                        <option value="Industrial Warehouse Bay Aperture">Industrial Warehouse Bay Aperture</option>
                        <option value="Motorized Drive Replacement / Retrofit">Motorized Drive Replacement / Retrofit</option>
                        <option value="Emergency Shutter Repair Service">Emergency Shutter Repair Service</option>
                        <option value="Architectural Partnership / Specification">Architectural Partnership / Specification</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block mb-1">
                      Project Details, Aperture Sizes or Questions *
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Please specify estimated dimensions, site location, timeline or mechanical questions..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#171E27] border border-[#29323D] text-xs text-white p-3 rounded-sm outline-none focus:border-[#00A8F0]"
                    />
                    {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#00A8F0] hover:bg-[#008FCF] text-white text-xs font-bold uppercase tracking-widest py-3.5 px-6 rounded-sm transition-colors shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
