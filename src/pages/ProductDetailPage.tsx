import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Shield,
  Check,
  ArrowRight,
  Maximize2,
  X,
  FileText,
  HelpCircle,
  Truck,
  Layers,
  ShoppingBag,
} from 'lucide-react';
import { StorageService } from '../services/storage';
import { useCart } from '../context/CartContext';
import { formatCurrency, calculateAreaSquareMeters, estimateShutterPrice } from '../utils/quote';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = StorageService.getProductBySlug(slug || '');
  const allProducts = StorageService.getProducts();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedFinish, setSelectedFinish] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'finishes' | 'installation' | 'faq'>('overview');

  // Custom size configurator state for shutters
  const [customWidth, setCustomWidth] = useState(3000);
  const [customHeight, setCustomHeight] = useState(2600);
  const [isMotorizedChecked, setIsMotorizedChecked] = useState(true);
  const [addedToast, setAddedToast] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#080B10] pt-32 pb-24 text-center px-4">
        <h1 className="font-display font-bold text-2xl text-white mb-4">Product Not Found</h1>
        <p className="text-xs text-[#9099A6] mb-6">The requested shutter system or accessory does not exist.</p>
        <Link
          to="/products"
          className="inline-block bg-[#00A8F0] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-sm"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const related = allProducts.filter((p) => p.id !== product.id).slice(0, 3);
  const isPurchasable = product.purchasable && product.price;
  const configuredArea = calculateAreaSquareMeters(customWidth, customHeight);
  const estimatedEstimate = estimateShutterPrice(customWidth, customHeight, 16500, isMotorizedChecked);

  const handleAddToCart = () => {
    if (!product.price) return;
    addToCart({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0],
      customOptions: {
        Finish: product.finishOptions[selectedFinish]?.name || 'Standard',
      },
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleProceedToQuote = () => {
    navigate(
      `/quote?product=${product.id}&w=${customWidth}&h=${customHeight}&op=${
        isMotorizedChecked ? 'motorized' : 'manual'
      }&finish=${encodeURIComponent(product.finishOptions[selectedFinish]?.name || '')}`
    );
  };

  return (
    <div className="min-h-screen bg-[#080B10] pt-28 pb-24 text-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Trail */}
        <div className="flex items-center gap-2 text-xs text-[#9099A6] mb-6">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-white transition-colors">Products</Link>
          <span>/</span>
          <span className="text-[#00A8F0] truncate max-w-xs">{product.name}</span>
        </div>

        {/* Top Product Section: Gallery (Left) & Configurator/Details (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#29323D]">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-sm overflow-hidden border border-[#29323D] bg-[#11161D] h-[380px] sm:h-[460px] group">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover cursor-zoom-in transition-transform duration-500 group-hover:scale-105"
                onClick={() => setIsLightboxOpen(true)}
              />
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute top-4 right-4 p-2 bg-[#080B10]/80 text-[#9099A6] hover:text-white border border-[#29323D] rounded-sm transition-colors"
                title="Enlarge Image"
                aria-label="Enlarge Image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-sm overflow-hidden border transition-all shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-[#00A8F0] ring-1 ring-[#00A8F0]'
                        : 'border-[#29323D] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information, Swatches & Configurator */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#00A8F0] uppercase block mb-1">
                {product.applicationTypes.join(' · ')} SYSTEM
              </span>
              <h1 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#F5F7FA] tracking-tight uppercase">
                {product.name}
              </h1>
              <p className="text-xs text-[#9099A6] mt-2 leading-relaxed">
                {product.shortDescription}
              </p>
            </div>

            {/* Price or Custom Quote Badge */}
            <div className="p-4 bg-[#11161D] border border-[#29323D] rounded-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#9099A6] block">
                  Commercial Structure
                </span>
                <span className="font-display font-bold text-xl text-[#00A8F0]">
                  {isPurchasable
                    ? formatCurrency(product.price!, product.currency)
                    : 'Custom Manufactured / Price on Request'}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-[#F5F7FA] bg-[#171E27] px-2.5 py-1 rounded border border-[#29323D]">
                {product.operationType.toUpperCase()}
              </span>
            </div>

            {/* Finish Selection Swatches */}
            {product.finishOptions.length > 0 && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#9099A6]">
                    Finish Specification
                  </span>
                  <span className="text-xs text-[#F5F7FA] font-medium">
                    {product.finishOptions[selectedFinish]?.name}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {product.finishOptions.map((finish, idx) => (
                    <button
                      key={finish.id}
                      onClick={() => setSelectedFinish(idx)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-sm border text-xs transition-all ${
                        selectedFinish === idx
                          ? 'border-[#00A8F0] bg-[#171E27] text-white ring-1 ring-[#00A8F0]'
                          : 'border-[#29323D] text-[#9099A6] hover:text-white'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/30"
                        style={{ backgroundColor: finish.colorCode }}
                      />
                      <span>{finish.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Aperture Dimension Configurator (for roller shutter products) */}
            {!isPurchasable && (
              <div className="p-5 bg-[#11161D] border border-[#29323D] rounded-sm space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-white block">
                  Aperture Sizing Simulator (mm)
                </span>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-[#9099A6] block mb-1">Clear Width (mm)</label>
                    <input
                      type="number"
                      step="50"
                      min="800"
                      max="15000"
                      value={customWidth}
                      onChange={(e) => setCustomWidth(Number(e.target.value))}
                      className="w-full bg-[#171E27] border border-[#29323D] focus:border-[#00A8F0] text-xs text-white p-2.5 rounded-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#9099A6] block mb-1">Clear Height (mm)</label>
                    <input
                      type="number"
                      step="50"
                      min="800"
                      max="12000"
                      value={customHeight}
                      onChange={(e) => setCustomHeight(Number(e.target.value))}
                      className="w-full bg-[#171E27] border border-[#29323D] focus:border-[#00A8F0] text-xs text-white p-2.5 rounded-sm outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#9099A6] pt-1">
                  <span>Calculated Area: <strong className="text-white">{configuredArea} m²</strong></span>
                  <label className="flex items-center gap-2 cursor-pointer text-white">
                    <input
                      type="checkbox"
                      checked={isMotorizedChecked}
                      onChange={(e) => setIsMotorizedChecked(e.target.checked)}
                      className="accent-[#00A8F0]"
                    />
                    <span>Include Motor Automation</span>
                  </label>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-[#29323D]/60 text-xs">
                  <span className="text-[#9099A6]">Engineering Baseline Estimate:</span>
                  <span className="font-display font-bold text-sm text-[#00A8F0]">
                    {formatCurrency(estimatedEstimate, 'LKR')} *
                  </span>
                </div>
                <p className="text-[10px] text-[#9099A6] italic leading-tight">
                  * Final quote subject to wind pressure certification, lintel depth, and on-site structural audit.
                </p>
              </div>
            )}

            {/* Purchasing / Quote Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {isPurchasable ? (
                <>
                  <div className="flex items-center border border-[#29323D] bg-[#11161D] rounded-sm">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-[#9099A6] hover:text-white"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-xs font-bold text-white min-w-[32px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-2 text-[#9099A6] hover:text-white"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#00A8F0] hover:bg-[#008FCF] text-white text-xs font-bold tracking-widest uppercase py-3.5 px-6 rounded-sm transition-colors shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO ORDER INQUIRY</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={handleProceedToQuote}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#00A8F0] hover:bg-[#008FCF] text-white text-xs font-bold tracking-widest uppercase py-4 px-8 rounded-sm transition-all duration-200 shadow-lg hover:shadow-[#00A8F0]/30"
                >
                  <span>TRANSFER SPECS TO QUOTE BUILDER</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {addedToast && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs rounded-sm flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Added to cart successfully. Review your order in the cart.</span>
              </div>
            )}
          </div>
        </div>

        {/* Technical Tabs Section */}
        <div className="py-16">
          <div className="flex items-center gap-2 border-b border-[#29323D] pb-3 overflow-x-auto text-xs font-bold uppercase tracking-wider">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'specs', label: 'Technical Specifications' },
              { id: 'finishes', label: 'Finishes & Profiles' },
              { id: 'installation', label: 'Installation Information' },
              { id: 'faq', label: 'Engineering FAQ' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#171E27] text-[#00A8F0] border-b-2 border-[#00A8F0]'
                    : 'text-[#9099A6] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="py-8 text-xs sm:text-sm text-[#9099A6] leading-relaxed">
            {activeTab === 'overview' && (
              <div className="space-y-4 max-w-3xl">
                <p>{product.description}</p>
                <div className="p-5 bg-[#11161D] border border-[#29323D] rounded-sm space-y-2 text-xs">
                  <span className="font-bold text-[#F5F7FA] uppercase block">Material Construction:</span>
                  <p>{product.material}</p>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-3xl overflow-hidden border border-[#29323D] rounded-sm bg-[#11161D]">
                <table className="w-full text-left text-xs">
                  <tbody className="divide-y divide-[#29323D]">
                    <tr className="p-3">
                      <td className="p-3.5 font-semibold text-[#F5F7FA] w-1/3">Max Clear Width</td>
                      <td className="p-3.5 text-[#9099A6]">{product.specifications.maxOpeningWidth}</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-[#F5F7FA]">Max Clear Height</td>
                      <td className="p-3.5 text-[#9099A6]">{product.specifications.maxOpeningHeight}</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-[#F5F7FA]">Slat Profile</td>
                      <td className="p-3.5 text-[#9099A6]">{product.specifications.slatProfile}</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-[#F5F7FA]">Gauge / Thickness</td>
                      <td className="p-3.5 text-[#9099A6]">{product.specifications.gaugeThickness}</td>
                    </tr>
                    {product.specifications.windLoadRating && (
                      <tr>
                        <td className="p-3.5 font-semibold text-[#F5F7FA]">Wind Load Rating</td>
                        <td className="p-3.5 text-[#9099A6]">{product.specifications.windLoadRating}</td>
                      </tr>
                    )}
                    {product.specifications.motorType && (
                      <tr>
                        <td className="p-3.5 font-semibold text-[#F5F7FA]">Motor Drive Specs</td>
                        <td className="p-3.5 text-[#9099A6]">{product.specifications.motorType}</td>
                      </tr>
                    )}
                    <tr>
                      <td className="p-3.5 font-semibold text-[#F5F7FA]">Warranty Coverage</td>
                      <td className="p-3.5 text-[#9099A6]">{product.specifications.warranty}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'finishes' && (
              <div className="space-y-4 max-w-3xl">
                <p>
                  All profiles undergo multi-stage chemical pretreatment followed by electrostatically applied polyester architectural powder or sulfuric acid bath anodization for marine air resistance.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {product.finishOptions.map((f) => (
                    <div key={f.id} className="p-4 bg-[#11161D] border border-[#29323D] rounded-sm flex items-center gap-3">
                      <span className="w-6 h-6 rounded border border-black/40" style={{ backgroundColor: f.colorCode }} />
                      <div>
                        <span className="font-bold text-white block">{f.name}</span>
                        <span className="text-[10px] text-[#9099A6]">Code: {f.code}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'installation' && (
              <div className="space-y-4 max-w-3xl">
                <p>
                  Installation is performed by certified FLEXMETAL structural technicians across all Sri Lankan districts. Structural anchors, endplates, and safety drop-brakes are calibrated on-site.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Structural lintel and side jamb checks prior to fabrication.</li>
                  <li>Overhead barrel and coil hood enclosure alignment.</li>
                  <li>Obstacle sensing photocell and manual emergency chain installation.</li>
                  <li>Official handover certification and client maintenance briefing.</li>
                </ul>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-4 max-w-3xl">
                <div className="p-4 bg-[#11161D] border border-[#29323D] rounded-sm">
                  <h4 className="font-bold text-white mb-1">What happens during a power failure?</h4>
                  <p className="text-xs text-[#9099A6]">
                    Every motorized shutter includes an emergency manual override (hand crank, continuous hand chain, or battery backup UPS system) to allow manual opening and closing during grid power interruptions.
                  </p>
                </div>
                <div className="p-4 bg-[#11161D] border border-[#29323D] rounded-sm">
                  <h4 className="font-bold text-white mb-1">Can I integrate this shutter into a centralized building management system?</h4>
                  <p className="text-xs text-[#9099A6]">
                    Yes, our digital control boxes feature volt-free dry contact relays compatible with smart home controllers, BMS, and fire alarm tripping circuits.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Carousel */}
        <div className="pt-8 border-t border-[#29323D]">
          <h2 className="font-display font-bold text-xl text-white uppercase tracking-tight mb-6">
            Complementary Architectural Systems
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((rel) => (
              <Link
                key={rel.id}
                to={`/products/${rel.slug}`}
                className="group p-4 bg-[#11161D] border border-[#29323D] hover:border-[#00A8F0]/60 rounded-sm transition-all"
              >
                <div className="h-40 overflow-hidden rounded-sm bg-[#171E27] mb-3">
                  <img src={rel.images[0]} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <span className="text-[10px] font-bold text-[#00A8F0] uppercase tracking-wider">{rel.applicationTypes[0]}</span>
                <h3 className="font-display font-bold text-sm text-white group-hover:text-[#00A8F0] transition-colors">{rel.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-2 text-white hover:text-[#00A8F0]"
            aria-label="Close Lightbox"
          >
            <X className="w-7 h-7" />
          </button>
          <img
            src={product.images[activeImageIndex]}
            alt={product.name}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-sm"
          />
        </div>
      )}
    </div>
  );
};
