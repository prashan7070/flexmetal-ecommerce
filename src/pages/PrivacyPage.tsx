import React from 'react';
import { Link } from 'react-router-dom';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080B10] pt-28 pb-24 text-[#F5F7FA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <Link to="/" className="text-xs text-[#00A8F0] hover:underline">← Return to Homepage</Link>
          <h1 className="font-display font-bold text-3xl uppercase text-white mt-4">Privacy & Data Governance Policy</h1>
          <p className="text-xs text-[#9099A6] mt-1">Last updated: March 2026</p>
        </div>

        <div className="p-8 bg-[#11161D] border border-[#29323D] rounded-sm space-y-6 text-xs sm:text-sm text-[#9099A6] leading-relaxed">
          <section>
            <h2 className="font-display font-bold text-base uppercase text-white mb-2">1. Information We Collect</h2>
            <p>
              FLEXMETAL collects information necessary to calculate structural tolerances, deliver itemized pro-forma quotes, and execute on-site installation. This includes project owner names, commercial entity titles, site district coordinates, and aperture measurements.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-base uppercase text-white mb-2">2. Engineering Data Usage</h2>
            <p>
              CAD blueprints and structural elevation photos provided during quote submissions are utilized exclusively by our roll-forming and installation teams to verify headroom clearance and motor selection. We do not sell or monetize client architectural specifications.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-base uppercase text-white mb-2">3. Direct Contact Channels</h2>
            <p>
              Phone and WhatsApp contact information provided are used solely to coordinate site surveys, transmission of pro-forma invoices, and technician dispatch.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
