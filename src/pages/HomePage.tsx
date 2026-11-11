import React from 'react';
import { HeroSection } from '../components/hero/HeroSection';
import { TrustStrip } from '../components/home/TrustStrip';
import { AboutPreview } from '../components/home/AboutPreview';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { CoreServices } from '../components/home/CoreServices';
import { EngineeringSpotlight } from '../components/home/EngineeringSpotlight';
import { ProjectsPreview } from '../components/home/ProjectsPreview';
import { ProcessSection } from '../components/home/ProcessSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { ConversionCTA } from '../components/home/ConversionCTA';
import { StorageService } from '../services/storage';

export const HomePage: React.FC = () => {
  const products = StorageService.getProducts();
  const projects = StorageService.getProjects();

  return (
    <div className="min-h-screen bg-[#080B10]">
      <HeroSection />
      <TrustStrip />
      <AboutPreview />
      <FeaturedProducts products={products} />
      <CoreServices />
      <EngineeringSpotlight />
      <ProjectsPreview projects={projects} />
      <ProcessSection />
      <TestimonialsSection />
      <ConversionCTA />
    </div>
  );
};
