import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Grid, List, X, ArrowUpRight, ArrowRight } from 'lucide-react';
import { StorageService } from '../services/storage';
import { formatCurrency } from '../utils/quote';
import { Product, ApplicationType, OperationType } from '../types';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const products = useMemo(() => StorageService.getProducts(), []);
  const categories = useMemo(() => StorageService.getCategories(), []);

  // Filter params from URL or state
  const selectedCategory = searchParams.get('category') || 'all';
  const selectedOperation = searchParams.get('operation') || 'all';
  const selectedApplication = searchParams.get('application') || 'all';
  const searchQuery = searchParams.get('q') || '';
  const sortBy = searchParams.get('sort') || 'featured';

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value === 'all' || !value) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchMaterial = p.material.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchMaterial) return false;
        }
        // Category
        if (selectedCategory !== 'all') {
          const cat = categories.find((c) => c.slug === selectedCategory);
          if (cat && p.categoryId !== cat.id) return false;
        }
        // Operation
        if (selectedOperation !== 'all') {
          if (selectedOperation === 'motorized' && p.operationType === 'manual') return false;
          if (selectedOperation === 'manual' && p.operationType === 'motorized') return false;
        }
        // Application
        if (selectedApplication !== 'all') {
          if (!p.applicationTypes.includes(selectedApplication as ApplicationType)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') {
          return (a.price || 9999999) - (b.price || 9999999);
        }
        if (sortBy === 'price-high') {
          return (b.price || 0) - (a.price || 0);
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        // Default featured
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, categories, selectedCategory, selectedOperation, selectedApplication, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#080B10] pt-28 pb-24 text-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-[#9099A6] mb-4">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#00A8F0]">Products & Systems</span>
        </div>

        {/* Page Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#29323D]">
          <div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#F5F7FA] uppercase tracking-tight">
              ENGINEERED SHUTTERS & ACCESS SOLUTIONS
            </h1>
            <p className="text-sm text-[#9099A6] mt-2 max-w-2xl">
              Browse precision cold-rolled industrial doors, architectural storefront shutters, and motorized gate systems.
            </p>
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#9099A6] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by model, material or spec..."
              value={searchQuery}
              onChange={(e) => updateParam('q', e.target.value)}
              className="w-full bg-[#11161D] border border-[#29323D] focus:border-[#00A8F0] focus:ring-1 focus:ring-[#00A8F0] text-xs text-[#F5F7FA] pl-9 pr-4 py-2.5 rounded-sm outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => updateParam('q', '')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9099A6] hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Main Catalog Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block space-y-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#29323D]">
              <span className="font-display font-bold text-sm tracking-widest uppercase text-[#F5F7FA]">
                Filter Catalog
              </span>
              <button
                onClick={clearAllFilters}
                className="text-[11px] text-[#00A8F0] hover:underline uppercase font-semibold"
              >
                Reset All
              </button>
            </div>

            {/* Categories */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block">
                Category
              </span>
              <div className="space-y-1">
                <button
                  onClick={() => updateParam('category', 'all')}
                  className={`w-full text-left px-3 py-1.5 rounded-sm text-xs transition-colors flex items-center justify-between ${
                    selectedCategory === 'all'
                      ? 'bg-[#171E27] text-[#00A8F0] font-bold border-l-2 border-[#00A8F0]'
                      : 'text-[#9099A6] hover:text-[#F5F7FA]'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[10px] text-[#9099A6]">{products.length}</span>
                </button>
                {categories.map((cat) => {
                  const count = products.filter((p) => p.categoryId === cat.id).length;
                  const isSelected = selectedCategory === cat.slug;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => updateParam('category', cat.slug)}
                      className={`w-full text-left px-3 py-1.5 rounded-sm text-xs transition-colors flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#171E27] text-[#00A8F0] font-bold border-l-2 border-[#00A8F0]'
                          : 'text-[#9099A6] hover:text-[#F5F7FA]'
                      }`}
                    >
                      <span className="truncate pr-2">{cat.name}</span>
                      <span className="text-[10px] text-[#9099A6]">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Application */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block">
                Application
              </span>
              <div className="space-y-1 text-xs">
                {['all', 'industrial', 'commercial', 'residential', 'warehouse'].map((app) => (
                  <button
                    key={app}
                    onClick={() => updateParam('application', app)}
                    className={`w-full text-left px-3 py-1.5 rounded-sm uppercase tracking-wider transition-colors ${
                      selectedApplication === app
                        ? 'bg-[#171E27] text-[#00A8F0] font-bold'
                        : 'text-[#9099A6] hover:text-white'
                    }`}
                  >
                    {app === 'all' ? 'All Applications' : app}
                  </button>
                ))}
              </div>
            </div>

            {/* Operation Type */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block">
                Drive Mechanism
              </span>
              <div className="space-y-1 text-xs">
                {[
                  { label: 'All Operations', val: 'all' },
                  { label: 'Motorized / Automated', val: 'motorized' },
                  { label: 'Manual Gear / Push', val: 'manual' },
                ].map((op) => (
                  <button
                    key={op.val}
                    onClick={() => updateParam('operation', op.val)}
                    className={`w-full text-left px-3 py-1.5 rounded-sm transition-colors ${
                      selectedOperation === op.val
                        ? 'bg-[#171E27] text-[#00A8F0] font-bold'
                        : 'text-[#9099A6] hover:text-white'
                    }`}
                  >
                    {op.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3">
            {/* Controls Bar: Count, Sort, Grid/List, Mobile Filter Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#11161D] border border-[#29323D] rounded-sm mb-6">
              <div className="text-xs text-[#9099A6]">
                Showing <span className="font-bold text-[#F5F7FA]">{filteredProducts.length}</span> engineered models
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Trigger */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden inline-flex items-center gap-2 px-3 py-1.5 bg-[#171E27] text-xs font-semibold text-[#F5F7FA] border border-[#29323D] rounded-sm"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Filters</span>
                </button>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => updateParam('sort', e.target.value)}
                  className="bg-[#171E27] border border-[#29323D] text-xs text-[#F5F7FA] px-3 py-1.5 rounded-sm outline-none focus:border-[#00A8F0]"
                  aria-label="Sort products by"
                >
                  <option value="featured">Featured First</option>
                  <option value="name">Model Name (A-Z)</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>

                {/* Grid / List View Toggle */}
                <div className="hidden sm:flex items-center bg-[#171E27] border border-[#29323D] rounded-sm p-0.5">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-sm transition-colors ${viewMode === 'grid' ? 'bg-[#00A8F0] text-white' : 'text-[#9099A6] hover:text-white'}`}
                    aria-label="Grid layout"
                  >
                    <Grid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-sm transition-colors ${viewMode === 'list' ? 'bg-[#00A8F0] text-white' : 'text-[#9099A6] hover:text-white'}`}
                    aria-label="List layout"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Listing */}
            {filteredProducts.length === 0 ? (
              <div className="bg-[#11161D] border border-[#29323D] p-12 text-center rounded-sm">
                <p className="font-display font-bold text-lg text-[#F5F7FA] mb-2">No systems match your filter criteria.</p>
                <p className="text-xs text-[#9099A6] mb-6">Try clearing filters or adjusting your search keywords.</p>
                <button
                  onClick={clearAllFilters}
                  className="bg-[#00A8F0] hover:bg-[#008FCF] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-sm transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const hasFixedPrice = product.purchasable && product.price;

                  return (
                    <div
                      key={product.id}
                      className="group flex flex-col bg-[#11161D] border border-[#29323D] hover:border-[#00A8F0]/60 transition-all duration-300 rounded-sm overflow-hidden"
                    >
                      <div className="relative h-56 overflow-hidden bg-[#171E27]">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute top-3 right-3 bg-[#080B10]/80 backdrop-blur-sm border border-[#29323D] px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider rounded-sm">
                          {product.operationType}
                        </div>
                      </div>

                      <div className="p-5 flex flex-col flex-1">
                        <span className="text-[10px] font-bold tracking-wider text-[#00A8F0] uppercase mb-1">
                          {product.applicationTypes.join(' · ')}
                        </span>

                        <Link
                          to={`/products/${product.slug}`}
                          className="font-display font-bold text-base text-[#F5F7FA] hover:text-[#00A8F0] transition-colors leading-snug mb-2 line-clamp-1"
                        >
                          {product.name}
                        </Link>

                        <p className="text-xs text-[#9099A6] line-clamp-2 mb-4 leading-relaxed">
                          {product.shortDescription}
                        </p>

                        <div className="mt-auto pt-3 border-t border-[#29323D]/60 space-y-1 text-[11px] text-[#9099A6]">
                          <div className="flex justify-between">
                            <span>Max Aperture:</span>
                            <span className="text-[#F5F7FA] font-medium">{product.specifications.maxOpeningWidth}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Thickness:</span>
                            <span className="text-[#F5F7FA] font-medium truncate max-w-[150px]">{product.specifications.gaugeThickness}</span>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#29323D]/60 flex items-center justify-between">
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-[#9099A6] block">Pricing</span>
                            <span className="font-display font-bold text-xs text-[#F5F7FA]">
                              {hasFixedPrice ? formatCurrency(product.price!, product.currency) : 'Custom Quote'}
                            </span>
                          </div>

                          <Link
                            to={`/products/${product.slug}`}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00A8F0] hover:text-white uppercase tracking-wider"
                          >
                            <span>Specs</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {filteredProducts.map((product) => {
                  const hasFixedPrice = product.purchasable && product.price;

                  return (
                    <div
                      key={product.id}
                      className="group flex flex-col sm:flex-row bg-[#11161D] border border-[#29323D] hover:border-[#00A8F0]/60 p-5 rounded-sm gap-6 items-center"
                    >
                      <div className="w-full sm:w-48 h-36 shrink-0 overflow-hidden rounded-sm bg-[#171E27]">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="flex-1">
                        <span className="text-[10px] font-bold tracking-wider text-[#00A8F0] uppercase">
                          {product.applicationTypes.join(' · ')}
                        </span>
                        <Link
                          to={`/products/${product.slug}`}
                          className="font-display font-bold text-lg text-[#F5F7FA] hover:text-[#00A8F0] block mb-1"
                        >
                          {product.name}
                        </Link>
                        <p className="text-xs text-[#9099A6] line-clamp-2 mb-3">
                          {product.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-xs text-[#9099A6]">
                          <span>Opening: <strong className="text-white">{product.specifications.maxOpeningWidth}</strong></span>
                          <span>Gauge: <strong className="text-white">{product.specifications.gaugeThickness}</strong></span>
                          <span>Drive: <strong className="text-white">{product.operationType}</strong></span>
                        </div>
                      </div>

                      <div className="sm:border-l sm:border-[#29323D] sm:pl-6 text-right sm:text-left flex sm:flex-col justify-between sm:justify-center items-center sm:items-start w-full sm:w-44 gap-3">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-[#9099A6] block">Pricing</span>
                          <span className="font-display font-bold text-sm text-[#F5F7FA]">
                            {hasFixedPrice ? formatCurrency(product.price!, product.currency) : 'Custom Quote'}
                          </span>
                        </div>
                        <Link
                          to={`/products/${product.slug}`}
                          className="bg-[#00A8F0] hover:bg-[#008FCF] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-sm text-center block w-full"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-[#080B10] border-l border-[#29323D] h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#29323D]">
              <span className="font-display font-bold text-sm uppercase text-white">Filter Catalog</span>
              <button onClick={() => setIsMobileFilterOpen(false)} className="text-[#9099A6] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="font-bold text-[#00A8F0] uppercase tracking-wider block mb-2">Category</span>
                <div className="space-y-1">
                  <button
                    onClick={() => { updateParam('category', 'all'); setIsMobileFilterOpen(false); }}
                    className="w-full text-left py-1 text-[#9099A6] hover:text-white"
                  >
                    All Categories
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => { updateParam('category', c.slug); setIsMobileFilterOpen(false); }}
                      className="w-full text-left py-1 text-[#9099A6] hover:text-white"
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
