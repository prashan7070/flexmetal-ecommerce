import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Shield } from 'lucide-react';
import { Product } from '../../types';
import { formatCurrency } from '../../utils/quote';

interface FeaturedProductsProps {
  products: Product[];
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  const featuredList = products.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="py-24 bg-[#080B10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-5 h-[2px] bg-[#00A8F0]" />
              <span className="text-xs font-bold tracking-[0.2em] text-[#00A8F0] uppercase">
                FEATURED SYSTEMS
              </span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#F5F7FA] tracking-tight uppercase">
              ENGINEERED FOR EVERY ENVIRONMENT.
            </h2>
            <p className="text-sm text-[#9099A6] mt-2 max-w-xl">
              Discover our range of security shutters, high-speed doors, and automated access solutions.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00A8F0] hover:text-white uppercase transition-colors whitespace-nowrap self-start md:self-auto"
          >
            <span>VIEW ALL PRODUCTS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3-Column Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredList.map((product) => {
            const hasFixedPrice = product.purchasable && product.price;

            return (
              <div
                key={product.id}
                className="group flex flex-col bg-[#11161D] border border-[#29323D] hover:border-[#00A8F0]/60 transition-all duration-300 rounded-sm overflow-hidden"
              >
                {/* Product Image Area */}
                <div className="relative h-64 overflow-hidden bg-[#171E27]">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11161D] via-transparent to-transparent opacity-60" />

                  {/* Operation Tag */}
                  <div className="absolute top-3 right-3 bg-[#080B10]/80 backdrop-blur-sm border border-[#29323D] px-2.5 py-1 text-[10px] font-bold text-[#F5F7FA] uppercase tracking-wider rounded-sm">
                    {product.operationType}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-[11px] font-bold tracking-wider text-[#00A8F0] uppercase mb-1">
                    {product.applicationTypes.join(' · ')}
                  </div>

                  <Link
                    to={`/products/${product.slug}`}
                    className="font-display font-bold text-lg text-[#F5F7FA] hover:text-[#00A8F0] transition-colors tracking-tight mb-2 line-clamp-1"
                  >
                    {product.name}
                  </Link>

                  <p className="text-xs text-[#9099A6] leading-relaxed line-clamp-2 mb-4">
                    {product.shortDescription}
                  </p>

                  {/* Micro Specs */}
                  <div className="mt-auto pt-4 border-t border-[#29323D]/60 space-y-1.5 text-[11px] text-[#9099A6]">
                    <div className="flex justify-between">
                      <span>Max Aperture:</span>
                      <span className="text-[#F5F7FA] font-medium">{product.specifications.maxOpeningWidth}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Profile:</span>
                      <span className="text-[#F5F7FA] font-medium truncate max-w-[170px]">{product.specifications.slatProfile}</span>
                    </div>
                  </div>

                  {/* Pricing or Custom Quote Status */}
                  <div className="mt-4 pt-3 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] tracking-widest text-[#9099A6] uppercase block">
                        Commercial Terms
                      </span>
                      <span className="font-display font-bold text-sm text-[#F5F7FA]">
                        {hasFixedPrice
                          ? formatCurrency(product.price!, product.currency)
                          : 'Custom Quote / On Request'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/quote?product=${product.id}`}
                        className="p-2 bg-[#171E27] hover:bg-[#00A8F0] text-[#9099A6] hover:text-white border border-[#29323D] hover:border-transparent rounded-sm transition-colors"
                        title="Configure Quote"
                        aria-label={`Configure quote for ${product.name}`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Direct Link Action */}
                  <Link
                    to={`/products/${product.slug}`}
                    className="mt-4 w-full text-center bg-[#171E27] hover:bg-[#202936] text-[#F5F7FA] text-[11px] font-bold tracking-widest uppercase py-2.5 rounded-sm border border-[#29323D] transition-colors"
                  >
                    VIEW SPECIFICATIONS
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
