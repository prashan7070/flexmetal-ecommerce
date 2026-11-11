import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, ArrowRight, Building, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { StorageService } from '../services/storage';
import { formatCurrency, generateReferenceNumber } from '../utils/quote';
import { Order } from '../types';

export const CheckoutPage: React.FC = () => {
  const { cart, cartSubtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('Colombo');
  const [installationRequested, setInstallationRequested] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedOrder, setSubmittedOrder] = useState<Order | null>(null);

  const shippingFee = district === 'Colombo' ? 3500 : 7500;
  const installationFee = installationRequested ? 18000 : 0;
  const orderTotal = cartSubtotal + shippingFee + installationFee;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email is required';
    if (!phone.trim()) errs.phone = 'Valid telephone is required';
    if (!address.trim()) errs.address = 'Delivery address is required';
    if (!city.trim()) errs.city = 'City/Town is required';
    if (!acceptedTerms) errs.terms = 'You must accept the terms of inquiry';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      referenceNumber: generateReferenceNumber('FXM-ORD'),
      items: [...cart],
      subtotal: cartSubtotal,
      shippingFee,
      total: orderTotal,
      currency: 'LKR',
      customerDetails: {
        name,
        email,
        phone,
        address,
        city,
        district,
        installationRequested,
      },
      fulfillmentStatus: 'Pending Review',
      paymentStatus: 'Payment on Confirmation',
      createdAt: new Date().toISOString(),
    };

    StorageService.saveOrder(newOrder);
    clearCart();
    setSubmittedOrder(newOrder);
  };

  if (submittedOrder) {
    return (
      <div className="min-h-screen bg-[#080B10] pt-32 pb-24 text-[#F5F7FA]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-[#11161D] border border-[#29323D] p-8 sm:p-12 rounded-sm space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold tracking-widest text-[#00A8F0] uppercase block">
              OFFICIAL ORDER INQUIRY REGISTERED
            </span>

            <h1 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase">
              ORDER REQUEST LOGGED
            </h1>

            <p className="text-xs sm:text-sm text-[#9099A6] leading-relaxed max-w-md mx-auto">
              Thank you, <strong className="text-white">{submittedOrder.customerDetails.name}</strong>. Your purchase request has been submitted to the FLEXMETAL fulfillment desk.
            </p>

            <div className="p-5 bg-[#080B10] border border-[#29323D] rounded-sm text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between border-b border-[#29323D]/60 pb-2">
                <span className="text-[#9099A6]">Order Reference:</span>
                <span className="font-display font-bold text-[#00A8F0]">{submittedOrder.referenceNumber}</span>
              </div>
              <div className="flex justify-between border-b border-[#29323D]/60 pb-2">
                <span className="text-[#9099A6]">Items Ordered:</span>
                <span className="text-white font-medium">{submittedOrder.items.length} line item(s)</span>
              </div>
              <div className="flex justify-between border-b border-[#29323D]/60 pb-2">
                <span className="text-[#9099A6]">Delivery District:</span>
                <span className="text-white font-medium">{submittedOrder.customerDetails.district}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#9099A6]">Total Budget:</span>
                <span className="font-display font-bold text-white">{formatCurrency(submittedOrder.total, 'LKR')}</span>
              </div>
            </div>

            <div className="p-4 bg-[#171E27] border border-[#29323D] rounded-sm text-[11px] text-[#9099A6] leading-relaxed text-left">
              <strong>Commercial Fulfillment Protocol:</strong> Our accounts coordinator will email your pro-forma VAT invoice along with corporate bank wire transfer instructions. Once confirmed, items are dispatched from our Colombo warehouse.
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/products"
                className="w-full sm:w-auto bg-[#00A8F0] hover:bg-[#008FCF] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-sm transition-colors"
              >
                Return to Catalog
              </Link>
              <Link
                to="/admin"
                className="w-full sm:w-auto bg-[#171E27] hover:bg-[#202936] text-white border border-[#29323D] text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-sm transition-colors"
              >
                Inspect in Management Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#080B10] pt-32 pb-24 text-center px-4 text-[#F5F7FA]">
        <h1 className="font-display font-bold text-2xl text-white mb-2">No Items in Checkout</h1>
        <p className="text-xs text-[#9099A6] mb-6">Your shopping cart is currently empty.</p>
        <Link
          to="/products"
          className="bg-[#00A8F0] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-sm"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080B10] pt-28 pb-24 text-[#F5F7FA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs text-[#9099A6] mb-3">
            <Link to="/cart" className="hover:text-white transition-colors">Cart</Link>
            <span>/</span>
            <span className="text-[#00A8F0]">Order Verification & Checkout</span>
          </div>
          <h1 className="font-display font-bold text-3xl uppercase tracking-tight text-white">
            Delivery Details & Order Review
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Customer & Delivery Form (Left) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 bg-[#11161D] border border-[#29323D] rounded-sm space-y-6">
              <h2 className="font-display font-bold text-base uppercase text-white border-b border-[#29323D]/60 pb-3">
                1. Customer & Corporate Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#171E27] border border-[#29323D] text-xs text-white p-3 rounded-sm outline-none focus:border-[#00A8F0]"
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block mb-1">
                    Telephone Number (+94) *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#171E27] border border-[#29323D] text-xs text-white p-3 rounded-sm outline-none focus:border-[#00A8F0]"
                  />
                  {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <h2 className="font-display font-bold text-base uppercase text-white border-b border-[#29323D]/60 pb-3 pt-4">
                2. Delivery & Installation Address
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block mb-1">
                    Street Address / Site Location *
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#171E27] border border-[#29323D] text-xs text-white p-3 rounded-sm outline-none focus:border-[#00A8F0]"
                  />
                  {errors.address && <p className="text-xs text-red-400 mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block mb-1">
                      City / Suburb *
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#171E27] border border-[#29323D] text-xs text-white p-3 rounded-sm outline-none focus:border-[#00A8F0]"
                    />
                    {errors.city && <p className="text-xs text-red-400 mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block mb-1">
                      District (Sri Lanka)
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full bg-[#171E27] border border-[#29323D] text-xs text-white p-3 rounded-sm outline-none"
                    >
                      <option value="Colombo">Colombo</option>
                      <option value="Gampaha">Gampaha</option>
                      <option value="Kalutara">Kalutara</option>
                      <option value="Kandy">Kandy</option>
                      <option value="Galle">Galle</option>
                      <option value="Kurunegala">Kurunegala</option>
                      <option value="Other">Other District</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2 text-xs text-white cursor-pointer p-3 bg-[#171E27] border border-[#29323D] rounded-sm">
                    <input
                      type="checkbox"
                      checked={installationRequested}
                      onChange={(e) => setInstallationRequested(e.target.checked)}
                      className="accent-[#00A8F0]"
                    />
                    <span>Request on-site mounting & technician commissioning (+LKR 18,000)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary & Terms (Right) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-[#11161D] border border-[#29323D] rounded-sm space-y-4">
              <h2 className="font-display font-bold text-base uppercase text-white border-b border-[#29323D]/60 pb-3">
                Order Review ({cart.length} items)
              </h2>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-xs">
                    <div>
                      <span className="font-semibold text-white block">{item.name}</span>
                      <span className="text-[11px] text-[#9099A6]">Qty: {item.quantity}</span>
                    </div>
                    <span className="font-display font-bold text-white">
                      {formatCurrency(item.price * item.quantity, 'LKR')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#29323D]/60 space-y-2 text-xs">
                <div className="flex justify-between text-[#9099A6]">
                  <span>Items Subtotal:</span>
                  <span className="text-white font-medium">{formatCurrency(cartSubtotal, 'LKR')}</span>
                </div>
                <div className="flex justify-between text-[#9099A6]">
                  <span>Logistics Transport ({district}):</span>
                  <span className="text-white font-medium">{formatCurrency(shippingFee, 'LKR')}</span>
                </div>
                {installationRequested && (
                  <div className="flex justify-between text-[#9099A6]">
                    <span>Installation Support:</span>
                    <span className="text-white font-medium">{formatCurrency(installationFee, 'LKR')}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-[#29323D]/60 flex justify-between text-base">
                  <span className="font-bold text-white uppercase">Total Payable:</span>
                  <span className="font-display font-bold text-[#00A8F0]">{formatCurrency(orderTotal, 'LKR')}</span>
                </div>
              </div>

              {/* Payment Mode Notice */}
              <div className="p-3 bg-[#171E27] border border-[#29323D] rounded-sm text-[11px] text-[#9099A6] space-y-1">
                <strong className="text-white block">Payment Terms:</strong>
                <span>Direct Bank Transfer upon Pro-Forma Invoice or Payment on Handover. No live card gateway required.</span>
              </div>

              {/* Terms Checkbox */}
              <div>
                <label className="flex items-start gap-2 text-xs text-[#9099A6] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="accent-[#00A8F0] mt-0.5"
                  />
                  <span>
                    I confirm the delivery details and accept standard manufacturing & delivery terms.
                  </span>
                </label>
                {errors.terms && <p className="text-xs text-red-400 mt-1">{errors.terms}</p>}
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#00A8F0] hover:bg-[#008FCF] text-white text-xs font-bold uppercase tracking-widest py-4 px-6 rounded-sm transition-colors shadow-lg"
              >
                <span>CONFIRM ORDER INQUIRY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
