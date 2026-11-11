import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      quote:
        'FLEXMETAL delivered eight motorized industrial heavy-gauge shutters across our logistics transfer terminal ahead of schedule. The structural wind locks and automated traffic sensors have operated flawlessly throughout monsoon weather.',
      author: 'Suranga Dissanayake',
      role: 'Head of Facility Infrastructure',
      organization: 'Lanka Logistics & Warehousing Hub',
    },
    {
      id: 2,
      quote:
        'For our flagship storefront on Galle Road, we required maximum evening display visibility combined with high insurance-rated physical security. Their Aero-Micro perforated shutters provided exactly the refined architectural aesthetic our brand demands.',
      author: 'Tamara Senanayake',
      role: 'Principal Architectural Director',
      organization: 'Studio Senanayake Design Associates',
    },
    {
      id: 3,
      quote:
        'The engineering precision in fabricating custom spans for our residential concrete portal was remarkable. The flush double-wall aluminium rolling gate blends invisibly into our perimeter wall while operating with whisper quietness.',
      author: 'Dr. Rohan De Silva',
      role: 'Property Owner & Client',
      organization: 'Cinnamon Gardens Residential Project',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  };

  const next = () => {
    setCurrentIndex((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  };

  const active = testimonials[currentIndex];

  return (
    <section className="py-24 bg-[#11161D] border-b border-[#29323D]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-5 h-[2px] bg-[#00A8F0]" />
            <span className="text-xs font-bold tracking-[0.2em] text-[#00A8F0] uppercase">
              CLIENT TESTIMONIALS
            </span>
            <span className="w-5 h-[2px] bg-[#00A8F0]" />
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#F5F7FA] tracking-tight uppercase">
            TRUSTED BY INDUSTRY LEADERS.
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="relative bg-[#080B10] border border-[#29323D] p-8 sm:p-12 rounded-sm shadow-xl">
          <Quote className="w-10 h-10 text-[#00A8F0]/30 mb-6" />

          <p className="font-display text-lg sm:text-xl text-[#F5F7FA] leading-relaxed mb-8 italic">
            "{active.quote}"
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#29323D]/60">
            <div>
              <div className="font-display font-bold text-base text-[#F5F7FA]">
                {active.author}
              </div>
              <div className="text-xs text-[#9099A6]">
                {active.role} · <span className="text-[#00A8F0]">{active.organization}</span>
              </div>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-sm bg-[#171E27] hover:bg-[#00A8F0] text-[#9099A6] hover:text-white border border-[#29323D] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00A8F0]"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-sm bg-[#171E27] hover:bg-[#00A8F0] text-[#9099A6] hover:text-white border border-[#29323D] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00A8F0]"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
