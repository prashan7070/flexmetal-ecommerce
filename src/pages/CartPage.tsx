import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/quote';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartSubtotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#080B10] pt-32 pb-24 text-[#F5F7FA]">
        <div className="max-w-xl mx-auto px-4 text-center py-16 bg-[#11161D] border border-[#29323D] rounded-sm">
          <div className="w-16 h-16 rounded-full bg-[#171E27] border border-[#29323D] text-[#9099A6] flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="font-display font-bold text-2xl text-white uppercase mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-xs text-[#9099A6] max-w-sm mx-auto mb-6">
            You haven't added any accessories or fixed-price automation kits yet. Browse our catalog to configure solutions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/products"
              className="bg-[#00A8F0] hover:bg-[#008FCF] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-sm transition-colors"
            >
              Browse Products
            </Link>
            <Link
              to="/quote"
              className="bg-[#171E27] hover:bg-[#202936] text-[#F5F7FA] border border-[#29323D] text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-sm transition-colors"
            >
              Request Custom Quote
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080B10] pt-28 pb-24 text-[#F5F7FA]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Trail */}
        <div className="flex items-center gap-2 text-xs text-[#9099A6] mb-6">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-white transition-colors">Products</Link>
          <span>/</span>
          <span className="text-[#00A8F0]">Order Inquiries Cart</span>
        </div>

        <div className="flex items-center justify-between pb-6 border-b border-[#29323D] mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl uppercase tracking-tight text-white">
              Shopping Cart & Order Inquiries
            </h1>
            <p className="text-xs text-[#9099A6] mt-1">
              Review selected automation drives, sensors, and hardware accessories.
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-[#9099A6] hover:text-red-400 underline"
          >
            Clear All Items
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-5 bg-[#11161D] border border-[#29323D] rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-[#171E27] border border-[#29323D] rounded-sm overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-white">{item.name}</h3>
                    <div className="text-xs text-[#00A8F0] font-semibold mt-1">
                      {formatCurrency(item.price, 'LKR')} each
                    </div>
                    {item.customOptions && (
                      <div className="text-[11px] text-[#9099A6] mt-0.5">
                        {Object.entries(item.customOptions).map(([k, v]) => `${k}: ${v}`).join(' · ')}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#29323D]/60">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#29323D] bg-[#171E27] rounded-sm text-xs">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1.5 text-[#9099A6] hover:text-white"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 font-bold text-white min-w-[28px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2.5 py-1.5 text-[#9099A6] hover:text-white"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="font-display font-bold text-sm text-white min-w-[90px] text-right">
                    {formatCurrency(item.price * item.quantity, 'LKR')}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-[#9099A6] hover:text-red-400 transition-colors"
                    title="Remove item"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#00A8F0] hover:text-white uppercase tracking-wider"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Continue Shopping Systems</span>
              </Link>
            </div>
          </div>

          {/* Cart Summary & Order Action */}
          <div className="lg:col-span-4">
            <div className="p-6 bg-[#11161D] border border-[#29323D] rounded-sm space-y-5">
              <h2 className="font-display font-bold text-base uppercase text-white border-b border-[#29323D]/60 pb-3">
                Order Inquiry Summary
              </h2>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-[#9099A6]">
                  <span>Subtotal:</span>
                  <span className="text-white font-medium">{formatCurrency(cartSubtotal, 'LKR')}</span>
                </div>
                <div className="flex justify-between text-[#9099A6]">
                  <span>Estimated Delivery / Dispatch:</span>
                  <span className="text-white font-medium">Calculated at Checkout</span>
                </div>
                <div className="pt-3 border-t border-[#29323D]/60 flex justify-between text-sm">
                  <span className="font-bold text-white uppercase">Total Amount:</span>
                  <span className="font-display font-bold text-[#00A8F0]">{formatCurrency(cartSubtotal, 'LKR')}</span>
                </div>
              </div>

              <div className="p-3 bg-[#171E27] border border-[#29323D] rounded-sm text-[11px] text-[#9099A6] leading-relaxed">
                Orders are processed as direct corporate purchase requests. Verified pro-forma invoices are generated upon checkout.
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#00A8F0] hover:bg-[#008FCF] text-white text-xs font-bold uppercase tracking-widest py-3.5 px-6 rounded-sm transition-colors shadow-md"
              >
                <span>PROCEED TO ORDER INQUIRY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
