import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowUpRight, Search, X } from 'lucide-react';
import { StorageService } from '../services/storage';

export const ProjectsPage: React.FC = () => {
  const projects = StorageService.getProjects();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Industrial', 'Commercial', 'Residential', 'Warehouse'];

  const filtered = projects.filter((p) => {
    if (activeCategory !== 'All' && p.category.toLowerCase() !== activeCategory.toLowerCase()) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#080B10] pt-28 pb-24 text-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs text-[#9099A6] mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#00A8F0]">Portfolio of Projects</span>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <span className="w-5 h-[2px] bg-[#00A8F0]" />
            <span className="text-xs font-bold tracking-[0.2em] text-[#00A8F0] uppercase">
              INSTALLATION ARCHIVE
            </span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white mb-4">
            PRECISION ENGINEERING IN THE FIELD.
          </h1>

          <p className="text-xs sm:text-sm text-[#9099A6] leading-relaxed">
            Explore installed roller shutter and motorized barrier installations across logistics terminals, commercial retail flagships, and high-end residences in Sri Lanka.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-[#11161D] border border-[#29323D] rounded-sm mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#00A8F0] text-white shadow-sm'
                    : 'text-[#9099A6] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-[#9099A6] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#171E27] border border-[#29323D] focus:border-[#00A8F0] text-xs text-white pl-8 pr-3 py-2 rounded-sm outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9099A6] hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-[#11161D] border border-[#29323D] rounded-sm">
            <p className="font-bold text-white mb-2">No projects found</p>
            <p className="text-xs text-[#9099A6]">Try adjusting your search query or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((proj) => (
              <Link
                key={proj.id}
                to={`/projects/${proj.slug}`}
                className="group flex flex-col bg-[#11161D] border border-[#29323D] hover:border-[#00A8F0]/60 rounded-sm overflow-hidden transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden bg-[#171E27]">
                  <img
                    src={proj.images[0]}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11161D] via-transparent to-transparent opacity-60" />

                  <span className="absolute top-3 left-3 bg-[#080B10]/80 backdrop-blur-sm border border-[#29323D] px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider rounded-sm">
                    {proj.category}
                  </span>

                  <div className="absolute top-3 right-3 w-8 h-8 rounded-sm bg-[#171E27]/80 text-[#9099A6] group-hover:bg-[#00A8F0] group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#00A8F0] mb-2 font-medium">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{proj.location}</span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white group-hover:text-[#00A8F0] transition-colors leading-snug mb-3">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-[#9099A6] leading-relaxed line-clamp-3 mb-4">
                    {proj.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-[#29323D]/60 flex items-center justify-between text-[11px] text-[#9099A6]">
                    <span>Completed: <strong className="text-white">{proj.completedDate}</strong></span>
                    <span className="text-[#00A8F0] font-bold group-hover:underline">View Case Study →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
