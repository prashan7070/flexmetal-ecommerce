import React from 'react';
import { Link } from 'react-router-dom';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080B10] pt-28 pb-24 text-[#F5F7FA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <Link to="/" className="text-xs text-[#00A8F0] hover:underline">← Return to Homepage</Link>
          <h1 className="font-display font-bold text-3xl uppercase text-white mt-4">Commercial Terms & Warranty Protocol</h1>
          <p className="text-xs text-[#9099A6] mt-1">Last updated: March 2026</p>
        </div>

        <div className="p-8 bg-[#11161D] border border-[#29323D] rounded-sm space-y-6 text-xs sm:text-sm text-[#9099A6] leading-relaxed">
          <section>
            <h2 className="font-display font-bold text-base uppercase text-white mb-2">1. Custom Fabrication & Tolerances</h2>
            <p>
              Rolling shutters and automated gate systems are engineered and roll-formed to specific millimeter aperture clearances. Baseline quotes generated via our online portal serve as budgetary estimates subject to final on-site physical survey and structural anchor verification.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-base uppercase text-white mb-2">2. Warranty Coverage</h2>
            <p>
              FLEXMETAL provides a 5-year structural warranty on steel and aluminium slat profiles against structural failure under rated cyclic operations, and a 2-year warranty on electronic motor drive units and control logic boards.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-base uppercase text-white mb-2">3. Payment & Pro-Forma Process</h2>
            <p>
              All online hardware purchases and custom installation commitments proceed through official pro-forma documentation. Standard corporate payment milestones are 50% upon CAD drawing approval, 40% upon dispatch, and 10% upon testing and handover.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
