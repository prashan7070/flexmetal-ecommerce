import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Building, CheckCircle2, ArrowRight } from 'lucide-react';
import { StorageService } from '../services/storage';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = StorageService.getProjectBySlug(slug || '');
  const allProjects = StorageService.getProjects();

  if (!project) {
    return (
      <div className="min-h-screen bg-[#080B10] pt-32 pb-24 text-center px-4">
        <h1 className="font-display font-bold text-2xl text-white mb-4">Project Not Found</h1>
        <p className="text-xs text-[#9099A6] mb-6">The specified installation case study does not exist.</p>
        <Link
          to="/projects"
          className="inline-block bg-[#00A8F0] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-sm"
        >
          Return to Projects
        </Link>
      </div>
    );
  }

  const related = allProjects.filter((p) => p.id !== project.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#080B10] pt-28 pb-24 text-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Trail */}
        <div className="flex items-center gap-2 text-xs text-[#9099A6] mb-6">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/projects" className="hover:text-white transition-colors">Projects</Link>
          <span>/</span>
          <span className="text-[#00A8F0] truncate max-w-xs">{project.title}</span>
        </div>

        {/* Project Hero Header */}
        <div className="relative rounded-sm overflow-hidden border border-[#29323D] bg-[#11161D] h-[400px] sm:h-[500px] mb-12">
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080B10] via-[#080B10]/50 to-transparent" />

          <div className="absolute bottom-8 left-6 sm:left-10 right-6 sm:right-10 max-w-3xl">
            <span className="text-xs font-bold tracking-widest text-[#00A8F0] uppercase block mb-2">
              {project.category} CASE STUDY
            </span>
            <h1 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl uppercase text-white leading-tight mb-4">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-xs text-[#9099A6]">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#00A8F0]" />
                <span className="text-white">{project.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#00A8F0]" />
                <span className="text-white">{project.completedDate}</span>
              </div>
              {project.clientSector && (
                <div className="flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-[#00A8F0]" />
                  <span className="text-white">{project.clientSector}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Project Story & Specs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#29323D]">
          {/* Main Case Study Text */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <h2 className="font-display font-bold text-xl uppercase text-white mb-4">
                Project Overview & Scope
              </h2>
              <p className="text-sm text-[#9099A6] leading-relaxed">
                {project.description}
              </p>
            </div>

            <div>
              <h3 className="font-display font-bold text-lg uppercase text-white mb-3">
                Engineering Challenges & Technical Solutions
              </h3>
              <p className="text-xs sm:text-sm text-[#9099A6] leading-relaxed mb-4">
                The installation required calculating localized wind uplift coefficients while maintaining minimal head-clearance underneath existing HVAC and structural steel purlins. FLEXMETAL designed custom low-headroom coil hoods and installed storm-proof wind locks.
              </p>
            </div>

            {/* Gallery Images if any */}
            {project.images.length > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {project.images.slice(1).map((img, i) => (
                  <div key={i} className="h-64 rounded-sm overflow-hidden border border-[#29323D] bg-[#11161D]">
                    <img src={img} alt={`${project.title} detail ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Technical Highlights & CTA */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-[#11161D] border border-[#29323D] rounded-sm space-y-4">
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white border-b border-[#29323D]/60 pb-2">
                Technical Highlights
              </h3>
              <ul className="space-y-3 text-xs text-[#9099A6]">
                {(project.technicalHighlights || [
                  'Class 4 wind load engineering',
                  'High-speed cycle motors with soft start/stop',
                  'Integrated security central monitoring',
                ]).map((hl, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00A8F0] shrink-0 mt-0.5" />
                    <span className="text-white">{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 bg-[#171E27] border border-[#29323D] rounded-sm text-center space-y-4">
              <h4 className="font-display font-bold text-base uppercase text-white">
                Require a Similar Solution?
              </h4>
              <p className="text-xs text-[#9099A6] leading-relaxed">
                Our design engineers can adapt these exact aperture specifications to your facility or commercial property.
              </p>
              <Link
                to="/quote"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#00A8F0] hover:bg-[#008FCF] text-white text-xs font-bold uppercase tracking-widest py-3 px-4 rounded-sm transition-colors"
              >
                <span>REQUEST SIMILAR QUOTE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        <div className="pt-12">
          <h2 className="font-display font-bold text-xl uppercase text-white mb-6">
            Related Installations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {related.map((rel) => (
              <Link
                key={rel.id}
                to={`/projects/${rel.slug}`}
                className="group p-5 bg-[#11161D] border border-[#29323D] hover:border-[#00A8F0]/60 rounded-sm flex items-center gap-4 transition-all"
              >
                <div className="w-24 h-24 rounded-sm overflow-hidden bg-[#171E27] shrink-0">
                  <img src={rel.images[0]} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#00A8F0] uppercase">{rel.category}</span>
                  <h4 className="font-display font-bold text-sm text-white group-hover:text-[#00A8F0] transition-colors">{rel.title}</h4>
                  <p className="text-[11px] text-[#9099A6]">{rel.location}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
