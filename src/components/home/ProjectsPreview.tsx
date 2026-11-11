import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, MapPin } from 'lucide-react';
import { Project } from '../../types';

interface ProjectsPreviewProps {
  projects: Project[];
}

export const ProjectsPreview: React.FC<ProjectsPreviewProps> = ({ projects }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category.toLowerCase() === activeFilter.toLowerCase());

  const categories = ['All', 'Industrial', 'Commercial', 'Residential'];

  return (
    <section className="py-24 bg-[#11161D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-5 h-[2px] bg-[#00A8F0]" />
              <span className="text-xs font-bold tracking-[0.2em] text-[#00A8F0] uppercase">
                PORTFOLIO SHOWCASE
              </span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#F5F7FA] tracking-tight uppercase">
              PRECISION IN EVERY INSTALLATION.
            </h2>
            <p className="text-sm text-[#9099A6] mt-2 max-w-xl">
              Engineered rolling systems executed across logistics centers, commercial retail flagships, and architectural estates.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1 bg-[#171E27] border border-[#29323D] rounded-sm self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00A8F0] ${
                  activeFilter === cat
                    ? 'bg-[#00A8F0] text-white shadow-sm'
                    : 'text-[#9099A6] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid: 1 Featured Large + 2 Adjacent + Grid Below */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.slice(0, 6).map((project, idx) => {
            const isMarquee = idx === 0 && activeFilter === 'All';

            return (
              <Link
                key={project.id}
                to={`/projects/${project.slug}`}
                className={`group relative rounded-sm overflow-hidden border border-[#29323D] bg-[#080B10] block ${
                  isMarquee ? 'lg:col-span-2 lg:row-span-2' : ''
                }`}
              >
                <div className={`relative overflow-hidden ${isMarquee ? 'h-[440px] lg:h-[520px]' : 'h-[250px]'}`}>
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080B10] via-[#080B10]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[11px] font-bold text-white bg-[#080B10]/80 backdrop-blur-sm border border-[#29323D] px-2.5 py-1 tracking-wider uppercase rounded-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Floating Action Arrow */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-sm bg-[#171E27]/80 group-hover:bg-[#00A8F0] text-[#9099A6] group-hover:text-white border border-[#29323D] group-hover:border-transparent flex items-center justify-center transition-all duration-200">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  {/* Bottom Information */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transition-transform duration-300">
                    <div className="flex items-center gap-2 text-xs text-[#00A8F0] mb-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{project.location}</span>
                    </div>

                    <h3
                      className={`font-display font-bold text-[#F5F7FA] group-hover:text-[#00A8F0] transition-colors leading-snug uppercase ${
                        isMarquee ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
                      }`}
                    >
                      {project.title}
                    </h3>

                    {isMarquee && (
                      <p className="text-xs text-[#9099A6] mt-2 line-clamp-2 max-w-lg leading-relaxed">
                        {project.description}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 bg-[#171E27] hover:bg-[#202936] text-[#F5F7FA] hover:text-[#00A8F0] border border-[#29323D] hover:border-[#00A8F0]/40 text-xs font-bold tracking-widest uppercase px-8 py-3.5 rounded-sm transition-all duration-200"
          >
            <span>VIEW FULL INSTALLATION ARCHIVE</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
