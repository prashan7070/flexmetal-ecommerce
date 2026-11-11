import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
  FileCheck,
  Send,
  Sliders,
  Calendar,
  Building,
  MapPin,
} from 'lucide-react';
import { StorageService } from '../services/storage';
import { ApplicationType, OperationType, QuoteRequest } from '../types';
import {
  calculateAreaSquareMeters,
  generateReferenceNumber,
  formatCurrency,
  validateQuoteDimensions,
  estimateShutterPrice,
} from '../utils/quote';

const SRI_LANKA_DISTRICTS = [
  'Colombo',
  'Gampaha',
  'Kalutara',
  'Kandy',
  'Matale',
  'Nuwara Eliya',
  'Galle',
  'Matara',
  'Hambantota',
  'Jaffna',
  'Kilinochchi',
  'Mannar',
  'Vavuniya',
  'Mullaitivu',
  'Batticaloa',
  'Ampara',
  'Trincomalee',
  'Kurunegala',
  'Puttalam',
  'Anuradhapura',
  'Polonnaruwa',
  'Badulla',
  'Monaragala',
  'Ratnapura',
  'Kegalle',
];

export const QuotePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const products = StorageService.getProducts();

  const [step, setStep] = useState<number>(1);
  const [submittedQuote, setSubmittedQuote] = useState<QuoteRequest | null>(null);

  // Form fields
  const [selectedProductId, setSelectedProductId] = useState<string>(() => {
    return searchParams.get('product') || products[0]?.id || '';
  });
  const [applicationType, setApplicationType] = useState<ApplicationType>('industrial');
  const [operationType, setOperationType] = useState<OperationType>(() => {
    return (searchParams.get('op') as OperationType) || 'motorized';
  });

  // Specifications
  const [widthMm, setWidthMm] = useState<number>(() => {
    return Number(searchParams.get('w')) || 3200;
  });
  const [heightMm, setHeightMm] = useState<number>(() => {
    return Number(searchParams.get('h')) || 2800;
  });
  const [quantity, setQuantity] = useState<number>(1);
  const [materialPreference, setMaterialPreference] = useState<string>('Galvanized Structural Steel');
  const [finishPreference, setFinishPreference] = useState<string>(() => {
    return searchParams.get('finish') || 'Anthracite Dark Matte (RAL 7016)';
  });
  const [includePhotocells, setIncludePhotocells] = useState<boolean>(true);
  const [includeRemoteControls, setIncludeRemoteControls] = useState<boolean>(true);

  // Installation
  const [installationRequired, setInstallationRequired] = useState<boolean>(true);
  const [siteType, setSiteType] = useState<string>('New Construction');
  const [district, setDistrict] = useState<string>('Colombo');
  const [preferredDate, setPreferredDate] = useState<string>('');

  // Customer Details
  const [customerName, setCustomerName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedProduct = products.find((p) => p.id === selectedProductId);
  const squareMeters = calculateAreaSquareMeters(widthMm, heightMm);
  const estimatedUnitPrice = estimateShutterPrice(widthMm, heightMm, 16500, operationType === 'motorized');
  const estimatedTotal = (estimatedUnitPrice + (includePhotocells ? 14500 : 0)) * quantity;

  // Step 1 validation
  const validateStep1 = () => {
    if (!selectedProductId) {
      setErrors({ product: 'Please select a product model' });
      return false;
    }
    setErrors({});
    return true;
  };

  // Step 2 validation
  const validateStep2 = () => {
    const dimCheck = validateQuoteDimensions(widthMm, heightMm);
    if (!dimCheck.valid) {
      setErrors({ dimensions: dimCheck.error || 'Invalid dimensions' });
      return false;
    }
    if (quantity < 1) {
      setErrors({ quantity: 'Quantity must be at least 1' });
      return false;
    }
    setErrors({});
    return true;
  };

  // Step 3 validation
  const validateStep3 = () => {
    if (!district) {
      setErrors({ district: 'Please choose a district' });
      return false;
    }
    setErrors({});
    return true;
  };

  // Step 4 validation
  const validateStep4 = () => {
    const errs: Record<string, string> = {};
    if (!customerName.trim()) errs.name = 'Full name is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email address is required';
    if (!phone.trim() || phone.trim().length < 8) errs.phone = 'Valid phone number is required';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;
    if (step === 4 && !validateStep4()) return;
    setStep((s) => s + 1);
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep4()) {
      setStep(4);
      return;
    }

    const newQuote: QuoteRequest = {
      id: `quote-${Date.now()}`,
      referenceNumber: generateReferenceNumber('FXM'),
      customerName,
      email,
      phone,
      company: company || undefined,
      productId: selectedProductId,
      productName: selectedProduct?.name || 'Custom Engineered Shutter',
      applicationType,
      operationType,
      dimensions: {
        widthMm,
        heightMm,
        squareMeters,
      },
      quantity,
      materialPreference,
      finishPreference,
      installationRequired,
      district,
      siteType,
      preferredDate: preferredDate || undefined,
      notes: notes || undefined,
      estimatedTotal,
      status: 'New',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    StorageService.saveQuote(newQuote);
    setSubmittedQuote(newQuote);
  };

  if (submittedQuote) {
    return (
      <div className="min-h-screen bg-[#080B10] pt-32 pb-24 text-[#F5F7FA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-[#11161D] border border-[#29323D] p-8 sm:p-12 rounded-sm text-center">
            <div className="w-16 h-16 rounded-full bg-[#00A8F0]/10 border border-[#00A8F0] text-[#00A8F0] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold tracking-widest text-[#00A8F0] uppercase block mb-1">
              QUOTE REQUEST LOGGED IN SYSTEM
            </span>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase mb-2">
              QUOTATION SUBMISSION CONFIRMED
            </h1>

            <p className="text-xs sm:text-sm text-[#9099A6] max-w-xl mx-auto mb-6">
              Thank you, <strong className="text-white">{submittedQuote.customerName}</strong>. Our engineering estimators have received your specifications and will review aperture wind requirements.
            </p>

            <div className="bg-[#080B10] border border-[#29323D] p-6 rounded-sm max-w-md mx-auto text-left mb-8 space-y-2 text-xs">
              <div className="flex justify-between border-b border-[#29323D]/60 pb-2">
                <span className="text-[#9099A6]">Reference Number:</span>
                <span className="font-display font-bold text-[#00A8F0]">{submittedQuote.referenceNumber}</span>
              </div>
              <div className="flex justify-between border-b border-[#29323D]/60 pb-2">
                <span className="text-[#9099A6]">System:</span>
                <span className="text-white font-medium truncate max-w-[200px]">{submittedQuote.productName}</span>
              </div>
              <div className="flex justify-between border-b border-[#29323D]/60 pb-2">
                <span className="text-[#9099A6]">Aperture Size:</span>
                <span className="text-white font-medium">{submittedQuote.dimensions.widthMm} x {submittedQuote.dimensions.heightMm} mm ({submittedQuote.dimensions.squareMeters} m²)</span>
              </div>
              <div className="flex justify-between border-b border-[#29323D]/60 pb-2">
                <span className="text-[#9099A6]">Location District:</span>
                <span className="text-white font-medium">{submittedQuote.district}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#9099A6]">Baseline Budget Estimate:</span>
                <span className="font-display font-bold text-white">{formatCurrency(submittedQuote.estimatedTotal || 0, 'LKR')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/products"
                className="w-full sm:w-auto bg-[#00A8F0] hover:bg-[#008FCF] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-sm transition-colors"
              >
                Continue Browsing Catalog
              </Link>
              <Link
                to="/admin"
                className="w-full sm:w-auto bg-[#171E27] hover:bg-[#202936] text-[#F5F7FA] border border-[#29323D] text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-sm transition-colors"
              >
                Inspect in Management Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080B10] pt-28 pb-24 text-[#F5F7FA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-5 h-[2px] bg-[#00A8F0]" />
            <span className="text-xs font-bold tracking-[0.2em] text-[#00A8F0] uppercase">
              SPECIFICATION WIZARD
            </span>
            <span className="w-5 h-[2px] bg-[#00A8F0]" />
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl uppercase tracking-tight text-white">
            CUSTOM QUOTE BUILDER
          </h1>
          <p className="text-xs text-[#9099A6] mt-2">
            Configure tailored aperture measurements, drive motorization, and installation requirements in five guided steps.
          </p>
        </div>

        {/* Step Indicator Tracker */}
        <div className="flex items-center justify-between mb-10 border-b border-[#29323D] pb-5 overflow-x-auto">
          {[
            { num: 1, label: 'Product' },
            { num: 2, label: 'Specifications' },
            { num: 3, label: 'Installation' },
            { num: 4, label: 'Customer' },
            { num: 5, label: 'Review' },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2 px-2 shrink-0">
              <span
                className={`w-7 h-7 rounded-sm flex items-center justify-center text-xs font-bold ${
                  step === s.num
                    ? 'bg-[#00A8F0] text-white'
                    : step > s.num
                    ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-500/50'
                    : 'bg-[#171E27] text-[#9099A6] border border-[#29323D]'
                }`}
              >
                {step > s.num ? '✓' : s.num}
              </span>
              <span
                className={`text-xs uppercase font-semibold hidden sm:inline ${
                  step === s.num ? 'text-white' : 'text-[#9099A6]'
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Step Card Container */}
        <div className="bg-[#11161D] border border-[#29323D] p-6 sm:p-10 rounded-sm">
          {/* STEP 1: SELECT PRODUCT & APPLICATION */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="font-display font-bold text-lg text-white uppercase border-b border-[#29323D]/60 pb-3">
                Step 1 — Select Rolling System Model
              </h2>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block mb-2">
                  Target Product Category
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {products.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setSelectedProductId(p.id)}
                      className={`p-4 rounded-sm border cursor-pointer transition-all ${
                        selectedProductId === p.id
                          ? 'border-[#00A8F0] bg-[#171E27] ring-1 ring-[#00A8F0]'
                          : 'border-[#29323D] bg-[#080B10] hover:border-[#9099A6]'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-[#00A8F0] uppercase tracking-wider block mb-1">
                        {p.applicationTypes.join(' · ')}
                      </span>
                      <h3 className="font-display font-bold text-sm text-white mb-1">{p.name}</h3>
                      <p className="text-[11px] text-[#9099A6] line-clamp-2">{p.shortDescription}</p>
                    </div>
                  ))}
                </div>
                {errors.product && <p className="text-xs text-red-400 mt-2">{errors.product}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#29323D]/60">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block mb-2">
                    Application Environment
                  </label>
                  <select
                    value={applicationType}
                    onChange={(e) => setApplicationType(e.target.value as ApplicationType)}
                    className="w-full bg-[#171E27] border border-[#29323D] focus:border-[#00A8F0] text-xs text-white p-3 rounded-sm outline-none"
                  >
                    <option value="industrial">Heavy Industrial / Factory Facility</option>
                    <option value="commercial">Commercial Storefront / Retail Arcade</option>
                    <option value="residential">Residential Architectural Portal</option>
                    <option value="warehouse">Logistics Warehouse Bay</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block mb-2">
                    Drive Automation
                  </label>
                  <select
                    value={operationType}
                    onChange={(e) => setOperationType(e.target.value as OperationType)}
                    className="w-full bg-[#171E27] border border-[#29323D] focus:border-[#00A8F0] text-xs text-white p-3 rounded-sm outline-none"
                  >
                    <option value="motorized">Motorized / Automated (Remote & Push Button)</option>
                    <option value="manual">Manual Push-Up / Chain Hoist</option>
                    <option value="both">Dual (Motorized with Hand-Chain Backup)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SPECIFICATIONS & DIMENSIONS */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="font-display font-bold text-lg text-white uppercase border-b border-[#29323D]/60 pb-3">
                Step 2 — Aperture Dimensions & Material Specifications
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block mb-1">
                    Clear Opening Width (mm)
                  </label>
                  <input
                    type="number"
                    step="50"
                    min="500"
                    max="15000"
                    value={widthMm}
                    onChange={(e) => setWidthMm(Number(e.target.value))}
                    className="w-full bg-[#171E27] border border-[#29323D] focus:border-[#00A8F0] text-sm text-white p-3 rounded-sm outline-none font-bold"
                  />
                  <span className="text-[10px] text-[#9099A6] mt-1 block">e.g. 3200 mm</span>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block mb-1">
                    Clear Opening Height (mm)
                  </label>
                  <input
                    type="number"
                    step="50"
                    min="500"
                    max="12000"
                    value={heightMm}
                    onChange={(e) => setHeightMm(Number(e.target.value))}
                    className="w-full bg-[#171E27] border border-[#29323D] focus:border-[#00A8F0] text-sm text-white p-3 rounded-sm outline-none font-bold"
                  />
                  <span className="text-[10px] text-[#9099A6] mt-1 block">e.g. 2800 mm</span>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block mb-1">
                    Number of Shutter Units
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full bg-[#171E27] border border-[#29323D] focus:border-[#00A8F0] text-sm text-white p-3 rounded-sm outline-none font-bold"
                  />
                </div>
              </div>

              {errors.dimensions && <p className="text-xs text-red-400">{errors.dimensions}</p>}

              <div className="p-4 bg-[#080B10] border border-[#29323D] rounded-sm flex items-center justify-between text-xs">
                <span className="text-[#9099A6]">Calculated Surface Area:</span>
                <span className="font-display font-bold text-white text-sm">{squareMeters} m² per unit</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#29323D]/60">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block mb-2">
                    Profile Material Preference
                  </label>
                  <select
                    value={materialPreference}
                    onChange={(e) => setMaterialPreference(e.target.value)}
                    className="w-full bg-[#171E27] border border-[#29323D] text-xs text-white p-3 rounded-sm outline-none"
                  >
                    <option value="Galvanized Structural Steel">Heavy-Gauge Galvanized Cold-Rolled Steel</option>
                    <option value="Architectural Extruded Aluminium">Architectural Grade 6063-T6 Aluminium</option>
                    <option value="Aero Micro-Perforated Steel">Aero 3mm CNC Micro-Perforated Profile</option>
                    <option value="Thermo-Core Polyurethane Insulated">Thermo-Core Dual-Skin PU Insulated</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block mb-2">
                    Finish / Color Coating
                  </label>
                  <select
                    value={finishPreference}
                    onChange={(e) => setFinishPreference(e.target.value)}
                    className="w-full bg-[#171E27] border border-[#29323D] text-xs text-white p-3 rounded-sm outline-none"
                  >
                    <option value="Anthracite Dark Matte (RAL 7016)">Anthracite Dark Matte (RAL 7016)</option>
                    <option value="Jet Industrial Black (RAL 9005)">Jet Industrial Black (RAL 9005)</option>
                    <option value="Anodized Natural Silver">Anodized Natural Silver (20-Micron)</option>
                    <option value="Architectural Pure White (RAL 9010)">Architectural Pure White (RAL 9010)</option>
                    <option value="Natural Mill Galvanized">Raw Unpainted Galvanized Industrial</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block">
                  Additional Safety & Automation Accessories
                </span>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includePhotocells}
                      onChange={(e) => setIncludePhotocells(e.target.checked)}
                      className="accent-[#00A8F0]"
                    />
                    <span>Infra-Shield Optical Safety Photocell Beam Sensors (+LKR 14,500)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeRemoteControls}
                      onChange={(e) => setIncludeRemoteControls(e.target.checked)}
                      className="accent-[#00A8F0]"
                    />
                    <span>Extra Pair of 433MHz Encrypted Rolling-Code Remote Keyfobs</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: INSTALLATION & LOCATION */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="font-display font-bold text-lg text-white uppercase border-b border-[#29323D]/60 pb-3">
                Step 3 — Installation & Project Site Details
              </h2>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block mb-2">
                  Professional Installation Required?
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setInstallationRequired(true)}
                    className={`p-4 rounded-sm border text-left transition-all ${
                      installationRequired
                        ? 'border-[#00A8F0] bg-[#171E27] text-white font-bold'
                        : 'border-[#29323D] bg-[#080B10] text-[#9099A6]'
                    }`}
                  >
                    <span className="block font-bold text-sm mb-1">Yes, Full Installation</span>
                    <span className="text-[11px] block text-[#9099A6]">Includes site survey, mounting brackets & calibration.</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInstallationRequired(false)}
                    className={`p-4 rounded-sm border text-left transition-all ${
                      !installationRequired
                        ? 'border-[#00A8F0] bg-[#171E27] text-white font-bold'
                        : 'border-[#29323D] bg-[#080B10] text-[#9099A6]'
                    }`}
                  >
                    <span className="block font-bold text-sm mb-1">Supply Only (Self-Installed)</span>
                    <span className="text-[11px] block text-[#9099A6]">Factory crated components delivered to site or depot.</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#29323D]/60">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block mb-2">
                    Installation District (Sri Lanka)
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-[#171E27] border border-[#29323D] text-xs text-white p-3 rounded-sm outline-none"
                  >
                    {SRI_LANKA_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d} District
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block mb-2">
                    Site Condition / Construction Phase
                  </label>
                  <select
                    value={siteType}
                    onChange={(e) => setSiteType(e.target.value)}
                    className="w-full bg-[#171E27] border border-[#29323D] text-xs text-white p-3 rounded-sm outline-none"
                  >
                    <option value="New Construction">New Building / Structural Framework Ready</option>
                    <option value="Renovation">Existing Shutter Replacement / Retrofit</option>
                    <option value="Design Phase">Architectural Drawing & Planning Stage</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block mb-2">
                  Target Installation Timeline (Optional)
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full sm:w-1/2 bg-[#171E27] border border-[#29323D] text-xs text-white p-3 rounded-sm outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 4: CUSTOMER CONTACT DETAILS */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="font-display font-bold text-lg text-white uppercase border-b border-[#29323D]/60 pb-3">
                Step 4 — Customer & Project Contact Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Roshan Samarasekera"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#171E27] border border-[#29323D] text-xs text-white p-3 rounded-sm outline-none focus:border-[#00A8F0]"
                  />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. roshan@company.lk"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#171E27] border border-[#29323D] text-xs text-white p-3 rounded-sm outline-none focus:border-[#00A8F0]"
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block mb-1">
                    Contact Phone Number (+94) *
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +94 77 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#171E27] border border-[#29323D] text-xs text-white p-3 rounded-sm outline-none focus:border-[#00A8F0]"
                  />
                  {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block mb-1">
                    Company / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lanka Logistics Hub (Pvt) Ltd"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-[#171E27] border border-[#29323D] text-xs text-white p-3 rounded-sm outline-none focus:border-[#00A8F0]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block mb-1">
                  Project Notes, Lintel Clearances, or Specific Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Detail any site-specific constraints, structural steel requirements, or wind exposure factors..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#171E27] border border-[#29323D] text-xs text-white p-3 rounded-sm outline-none focus:border-[#00A8F0]"
                />
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW AND SUBMIT */}
          {step === 5 && (
            <div className="space-y-6">
              <h2 className="font-display font-bold text-lg text-white uppercase border-b border-[#29323D]/60 pb-3">
                Step 5 — Review Specification & Transmit Quote Request
              </h2>

              <div className="bg-[#080B10] border border-[#29323D] p-6 rounded-sm space-y-3 text-xs">
                <div className="flex justify-between border-b border-[#29323D]/60 pb-2">
                  <span className="text-[#9099A6]">Model:</span>
                  <span className="font-bold text-white">{selectedProduct?.name}</span>
                </div>
                <div className="flex justify-between border-b border-[#29323D]/60 pb-2">
                  <span className="text-[#9099A6]">Dimensions:</span>
                  <span className="text-white font-medium">{widthMm} mm width × {heightMm} mm height ({squareMeters} m²)</span>
                </div>
                <div className="flex justify-between border-b border-[#29323D]/60 pb-2">
                  <span className="text-[#9099A6]">Quantity:</span>
                  <span className="text-white font-medium">{quantity} unit(s)</span>
                </div>
                <div className="flex justify-between border-b border-[#29323D]/60 pb-2">
                  <span className="text-[#9099A6]">Material & Finish:</span>
                  <span className="text-white font-medium">{materialPreference} · {finishPreference}</span>
                </div>
                <div className="flex justify-between border-b border-[#29323D]/60 pb-2">
                  <span className="text-[#9099A6]">Installation:</span>
                  <span className="text-white font-medium">{installationRequired ? 'Yes — In-house installation in ' + district : 'Supply only'}</span>
                </div>
                <div className="flex justify-between border-b border-[#29323D]/60 pb-2">
                  <span className="text-[#9099A6]">Customer Contact:</span>
                  <span className="text-white font-medium">{customerName} ({email}, {phone})</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-[#9099A6]">Estimated Budget Baseline:</span>
                  <span className="font-display font-bold text-base text-[#00A8F0]">
                    {formatCurrency(estimatedTotal, 'LKR')}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-[#171E27] border border-[#29323D] rounded-sm text-[11px] text-[#9099A6] leading-relaxed">
                By submitting this request, your project parameters will be logged into our engineering database. An estimator will verify lintel depth, guide track anchoring, and provide a formal stamped pro-forma invoice.
              </div>
            </div>
          )}

          {/* Stepper Footer Controls */}
          <div className="flex items-center justify-between pt-8 border-t border-[#29323D]/60 mt-8">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#171E27] text-white hover:text-[#00A8F0] border border-[#29323D] text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-sm bg-[#00A8F0] hover:bg-[#008FCF] text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-md"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitQuote}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm bg-[#00A8F0] hover:bg-[#008FCF] text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-xl"
              >
                <Send className="w-4 h-4" />
                <span>Submit Official Quote Request</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
