import React, { useState, useEffect } from 'react';
import {
  FileText,
  Package,
  Layers,
  Inbox,
  ShoppingBag,
  CheckCircle,
  Clock,
  Edit,
  Trash2,
  Plus,
  Save,
  LogOut,
  Lock,
  Eye,
  Check,
  X,
} from 'lucide-react';
import { StorageService } from '../services/storage';
import { QuoteRequest, Product, Project, ContactInquiry, Order, QuoteStatus } from '../types';
import { formatCurrency } from '../utils/quote';

export const AdminPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => StorageService.isAdminLoggedIn());
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'quotes' | 'products' | 'projects' | 'orders' | 'inquiries'>('quotes');

  // Stored state
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);

  // Selected quote modal/detail
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');

  // Product edit modal
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const refreshData = () => {
    setQuotes(StorageService.getQuotes());
    setProducts(StorageService.getProducts());
    setProjects(StorageService.getProjects());
    setOrders(StorageService.getOrders());
    setInquiries(StorageService.getInquiries());
  };

  useEffect(() => {
    if (isLoggedIn) {
      refreshData();
    }
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default engineering portal password or 'flexmetal2026'
    if (adminPassword === 'flexmetal2026' || adminPassword === 'admin') {
      StorageService.setAdminLoggedIn(true);
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid administrator credentials. (Hint: flexmetal2026)');
    }
  };

  const handleLogout = () => {
    StorageService.setAdminLoggedIn(false);
    setIsLoggedIn(false);
  };

  const handleUpdateQuoteStatus = (id: string, status: QuoteStatus) => {
    StorageService.updateQuoteStatus(id, status, adminNoteInput);
    refreshData();
    if (selectedQuote && selectedQuote.id === id) {
      setSelectedQuote((prev) => (prev ? { ...prev, status, adminNotes: adminNoteInput } : null));
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    StorageService.saveProduct(editingProduct);
    setEditingProduct(null);
    refreshData();
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      StorageService.deleteProduct(id);
      refreshData();
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#080B10] pt-32 pb-24 text-[#F5F7FA] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-[#11161D] border border-[#29323D] p-8 rounded-sm shadow-2xl space-y-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-[#171E27] border border-[#29323D] text-[#00A8F0] rounded-sm flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-display font-bold text-xl uppercase tracking-tight text-white">
              FLEXMETAL Management Portal
            </h1>
            <p className="text-xs text-[#9099A6] mt-1">
              Authorized personnel access to quotation pipeline and inventory.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#9099A6] block mb-1">
                Portal Security Key
              </label>
              <input
                type="password"
                placeholder="Enter password (e.g. flexmetal2026)"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full bg-[#171E27] border border-[#29323D] text-xs text-white p-3 rounded-sm outline-none focus:border-[#00A8F0]"
              />
            </div>

            {loginError && <p className="text-xs text-red-400">{loginError}</p>}

            <button
              type="submit"
              className="w-full bg-[#00A8F0] hover:bg-[#008FCF] text-white text-xs font-bold uppercase tracking-widest py-3 rounded-sm transition-colors"
            >
              Authenticate & Enter
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-[11px] text-[#9099A6]">
              Demo credentials: <code className="text-[#00A8F0] font-mono">flexmetal2026</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080B10] pt-24 pb-24 text-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#29323D] mb-8">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#00A8F0]">
              ADMINISTRATIVE CONSOLE
            </div>
            <h1 className="font-display font-bold text-2xl uppercase tracking-tight text-white">
              Operations & Quotations Management
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#171E27] hover:bg-red-950/40 text-xs font-bold text-[#9099A6] hover:text-red-400 border border-[#29323D] rounded-sm transition-colors self-start sm:self-auto"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Real Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="p-4 bg-[#11161D] border border-[#29323D] rounded-sm">
            <span className="text-[10px] uppercase font-bold text-[#9099A6] block mb-1">Total Quotes</span>
            <span className="font-display font-bold text-2xl text-white">{quotes.length}</span>
            <span className="text-[10px] text-[#00A8F0] block mt-1">
              {quotes.filter((q) => q.status === 'New').length} pending review
            </span>
          </div>

          <div className="p-4 bg-[#11161D] border border-[#29323D] rounded-sm">
            <span className="text-[10px] uppercase font-bold text-[#9099A6] block mb-1">Catalog Systems</span>
            <span className="font-display font-bold text-2xl text-white">{products.length}</span>
            <span className="text-[10px] text-emerald-400 block mt-1">Active inventory</span>
          </div>

          <div className="p-4 bg-[#11161D] border border-[#29323D] rounded-sm">
            <span className="text-[10px] uppercase font-bold text-[#9099A6] block mb-1">Order Inquiries</span>
            <span className="font-display font-bold text-2xl text-white">{orders.length}</span>
            <span className="text-[10px] text-[#9099A6] block mt-1">Hardware requests</span>
          </div>

          <div className="p-4 bg-[#11161D] border border-[#29323D] rounded-sm">
            <span className="text-[10px] uppercase font-bold text-[#9099A6] block mb-1">Portfolio Cases</span>
            <span className="font-display font-bold text-2xl text-white">{projects.length}</span>
            <span className="text-[10px] text-[#9099A6] block mt-1">Published sites</span>
          </div>

          <div className="p-4 bg-[#11161D] border border-[#29323D] rounded-sm col-span-2 md:col-span-1">
            <span className="text-[10px] uppercase font-bold text-[#9099A6] block mb-1">Direct Inquiries</span>
            <span className="font-display font-bold text-2xl text-white">{inquiries.length}</span>
            <span className="text-[10px] text-amber-400 block mt-1">Support messages</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-[#29323D] pb-3 mb-6 overflow-x-auto text-xs font-bold uppercase tracking-wider">
          {[
            { id: 'quotes', label: `Quotes (${quotes.length})`, icon: FileText },
            { id: 'products', label: `Products (${products.length})`, icon: Package },
            { id: 'projects', label: `Projects (${projects.length})`, icon: Layers },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'inquiries', label: `Inquiries (${inquiries.length})`, icon: Inbox },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#171E27] text-[#00A8F0] border-b-2 border-[#00A8F0]'
                    : 'text-[#9099A6] hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: QUOTES MANAGEMENT */}
        {activeTab === 'quotes' && (
          <div className="bg-[#11161D] border border-[#29323D] rounded-sm overflow-hidden">
            <div className="p-4 border-b border-[#29323D] flex items-center justify-between">
              <span className="font-display font-bold text-sm text-white uppercase">Submitted Quotations</span>
              <span className="text-xs text-[#9099A6]">{quotes.length} total records</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#171E27] text-[#9099A6] uppercase text-[10px] tracking-wider border-b border-[#29323D]">
                  <tr>
                    <th className="p-3.5">Reference</th>
                    <th className="p-3.5">Customer & District</th>
                    <th className="p-3.5">Model & Aperture</th>
                    <th className="p-3.5">Budget</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#29323D]">
                  {quotes.map((q) => (
                    <tr key={q.id} className="hover:bg-[#171E27]/50 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-[#00A8F0]">{q.referenceNumber}</td>
                      <td className="p-3.5">
                        <strong className="text-white block">{q.customerName}</strong>
                        <span className="text-[#9099A6]">{q.district} · {q.phone}</span>
                      </td>
                      <td className="p-3.5">
                        <span className="text-white block font-medium truncate max-w-[200px]">{q.productName}</span>
                        <span className="text-[#9099A6]">{q.dimensions.widthMm} x {q.dimensions.heightMm} mm ({q.dimensions.squareMeters} m²)</span>
                      </td>
                      <td className="p-3.5 font-display font-bold text-white">
                        {formatCurrency(q.estimatedTotal || 0, 'LKR')}
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            q.status === 'New'
                              ? 'bg-amber-950/60 text-amber-400 border border-amber-500/40'
                              : q.status === 'Quoted'
                              ? 'bg-blue-950/60 text-blue-400 border border-blue-500/40'
                              : q.status === 'Approved'
                              ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {q.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => {
                            setSelectedQuote(q);
                            setAdminNoteInput(q.adminNotes || '');
                          }}
                          className="px-3 py-1 bg-[#171E27] hover:bg-[#00A8F0] hover:text-white border border-[#29323D] rounded text-[11px] font-semibold transition-colors"
                        >
                          Inspect / Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-display font-bold text-sm text-white uppercase">Product Catalog</span>
              <button
                onClick={() => {
                  setEditingProduct({
                    id: `prod-${Date.now()}`,
                    slug: `new-shutter-${Date.now()}`,
                    name: 'New Engineered Shutter Model',
                    categoryId: 'cat-industrial',
                    description: 'Technical shutter description...',
                    shortDescription: 'Short specification description.',
                    images: ['/assets/aistudio/project-modern-commercial-warehouse_aa05adc9.webp'],
                    specifications: {
                      maxOpeningWidth: '8,000 mm',
                      maxOpeningHeight: '5,000 mm',
                      slatProfile: '76mm Curved Slat',
                      gaugeThickness: '1.0 mm Galvanized',
                      warranty: '5 Years',
                    },
                    material: 'Cold-Rolled Steel',
                    finishOptions: [{ id: 'f-def', name: 'Anthracite', colorCode: '#29323D', code: 'RAL7016' }],
                    operationType: 'motorized',
                    applicationTypes: ['industrial'],
                    currency: 'LKR',
                    priceOnRequest: true,
                    purchasable: false,
                    featured: true,
                    status: 'active',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                  });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00A8F0] hover:bg-[#008FCF] text-white text-xs font-bold uppercase rounded-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="bg-[#11161D] border border-[#29323D] rounded-sm overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#171E27] text-[#9099A6] uppercase text-[10px] tracking-wider border-b border-[#29323D]">
                  <tr>
                    <th className="p-3.5">Model</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Pricing</th>
                    <th className="p-3.5">Featured</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#29323D]">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#171E27]/50">
                      <td className="p-3.5">
                        <strong className="text-white block">{p.name}</strong>
                        <span className="text-[11px] text-[#9099A6]">{p.material}</span>
                      </td>
                      <td className="p-3.5 text-[#9099A6] uppercase">{p.categoryId}</td>
                      <td className="p-3.5 text-white">
                        {p.purchasable && p.price ? formatCurrency(p.price, p.currency) : 'Custom Quote'}
                      </td>
                      <td className="p-3.5">
                        <span className={`text-[10px] font-bold ${p.featured ? 'text-[#00A8F0]' : 'text-slate-500'}`}>
                          {p.featured ? 'YES' : 'NO'}
                        </span>
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => setEditingProduct(p)}
                          className="p-1.5 text-[#9099A6] hover:text-[#00A8F0]"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1.5 text-[#9099A6] hover:text-red-400"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div className="bg-[#11161D] border border-[#29323D] rounded-sm p-4 space-y-4">
            <span className="font-display font-bold text-sm text-white uppercase block">Portfolio Projects</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="p-4 bg-[#171E27] border border-[#29323D] rounded-sm flex items-center gap-3">
                  <div className="w-16 h-16 rounded overflow-hidden shrink-0 bg-black">
                    <img src={proj.images[0]} alt={proj.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#00A8F0] font-bold uppercase">{proj.category}</span>
                    <h4 className="font-bold text-white text-xs">{proj.title}</h4>
                    <p className="text-[11px] text-[#9099A6]">{proj.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="bg-[#11161D] border border-[#29323D] rounded-sm overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#171E27] text-[#9099A6] uppercase text-[10px] tracking-wider border-b border-[#29323D]">
                <tr>
                  <th className="p-3.5">Order Ref</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Total Amount</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#29323D]">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-[#9099A6]">
                      No order inquiries logged yet.
                    </td>
                  </tr>
                ) : (
                  orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#171E27]/50">
                      <td className="p-3.5 font-mono text-[#00A8F0]">{ord.referenceNumber}</td>
                      <td className="p-3.5 text-white">
                        {ord.customerDetails.name} ({ord.customerDetails.city})
                      </td>
                      <td className="p-3.5 font-bold text-white">{formatCurrency(ord.total, ord.currency)}</td>
                      <td className="p-3.5 font-semibold text-[#00A8F0]">{ord.fulfillmentStatus}</td>
                      <td className="p-3.5 text-right">
                        <select
                          value={ord.fulfillmentStatus}
                          onChange={(e) => {
                            StorageService.updateOrderStatus(ord.id, e.target.value as any);
                            refreshData();
                          }}
                          className="bg-[#171E27] border border-[#29323D] text-[11px] text-white p-1 rounded"
                        >
                          <option value="Pending Review">Pending Review</option>
                          <option value="Processing">Processing</option>
                          <option value="Ready for Dispatch">Ready for Dispatch</option>
                          <option value="Installed">Installed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 5: INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="bg-[#11161D] border border-[#29323D] rounded-sm p-4 space-y-4">
            <span className="font-display font-bold text-sm text-white uppercase block">
              Contact Form Inquiries ({inquiries.length})
            </span>
            <div className="space-y-3">
              {inquiries.map((inq) => (
                <div key={inq.id} className="p-4 bg-[#171E27] border border-[#29323D] rounded-sm space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <strong className="text-white text-sm">{inq.subject}</strong>
                    <span className="text-[10px] text-[#00A8F0] font-bold uppercase">{inq.status}</span>
                  </div>
                  <p className="text-[#9099A6] leading-relaxed">{inq.message}</p>
                  <div className="text-[11px] text-[#9099A6] pt-1 border-t border-[#29323D]/60 flex justify-between">
                    <span>From: {inq.name} ({inq.email} · {inq.phone})</span>
                    <span>Received: {new Date(inq.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quote Inspection Modal */}
        {selectedQuote && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-[#11161D] border border-[#29323D] p-6 max-w-2xl w-full rounded-sm space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b border-[#29323D] pb-3">
                <span className="font-display font-bold text-base text-white">
                  Quote Audit: {selectedQuote.referenceNumber}
                </span>
                <button onClick={() => setSelectedQuote(null)} className="text-[#9099A6] hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#9099A6] block">Customer Name:</span>
                  <strong className="text-white">{selectedQuote.customerName}</strong>
                </div>
                <div>
                  <span className="text-[#9099A6] block">Email & Phone:</span>
                  <span className="text-white">{selectedQuote.email} / {selectedQuote.phone}</span>
                </div>
                <div>
                  <span className="text-[#9099A6] block">Company:</span>
                  <span className="text-white">{selectedQuote.company || 'Private Client'}</span>
                </div>
                <div>
                  <span className="text-[#9099A6] block">District / Location:</span>
                  <span className="text-white">{selectedQuote.district}</span>
                </div>
                <div>
                  <span className="text-[#9099A6] block">Aperture Size:</span>
                  <span className="text-white">{selectedQuote.dimensions.widthMm} x {selectedQuote.dimensions.heightMm} mm ({selectedQuote.dimensions.squareMeters} m²)</span>
                </div>
                <div>
                  <span className="text-[#9099A6] block">Quantity:</span>
                  <span className="text-white">{selectedQuote.quantity} unit(s)</span>
                </div>
              </div>

              {selectedQuote.notes && (
                <div className="p-3 bg-[#171E27] border border-[#29323D] rounded text-xs text-[#9099A6]">
                  <strong className="text-white block mb-1">Customer Notes:</strong>
                  {selectedQuote.notes}
                </div>
              )}

              <div className="space-y-2 pt-2 border-t border-[#29323D]">
                <label className="text-xs font-bold uppercase text-[#9099A6] block">
                  Internal Engineering Notes
                </label>
                <textarea
                  rows={3}
                  value={adminNoteInput}
                  onChange={(e) => setAdminNoteInput(e.target.value)}
                  placeholder="Enter structural notes, wind calculations, or approved discount rate..."
                  className="w-full bg-[#171E27] border border-[#29323D] text-xs text-white p-2.5 rounded-sm outline-none"
                />
              </div>

              <div className="flex flex-wrap gap-2 pt-2 justify-end">
                <button
                  onClick={() => handleUpdateQuoteStatus(selectedQuote.id, 'Reviewing')}
                  className="px-3 py-1.5 bg-[#171E27] hover:bg-amber-900/60 text-amber-300 text-xs font-bold rounded"
                >
                  Mark Reviewing
                </button>
                <button
                  onClick={() => handleUpdateQuoteStatus(selectedQuote.id, 'Quoted')}
                  className="px-3 py-1.5 bg-[#171E27] hover:bg-blue-900/60 text-blue-300 text-xs font-bold rounded"
                >
                  Mark Quoted
                </button>
                <button
                  onClick={() => handleUpdateQuoteStatus(selectedQuote.id, 'Approved')}
                  className="px-4 py-1.5 bg-[#00A8F0] hover:bg-[#008FCF] text-white text-xs font-bold rounded"
                >
                  Approve Quote
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Edit Modal */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <form onSubmit={handleSaveProduct} className="bg-[#11161D] border border-[#29323D] p-6 max-w-lg w-full rounded-sm space-y-4 max-h-[90vh] overflow-y-auto text-xs">
              <div className="flex justify-between items-center border-b border-[#29323D] pb-3">
                <span className="font-display font-bold text-base text-white">Edit System Model</span>
                <button type="button" onClick={() => setEditingProduct(null)} className="text-[#9099A6] hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="text-[#9099A6] block mb-1">Model Name</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full bg-[#171E27] border border-[#29323D] text-white p-2 rounded"
                />
              </div>

              <div>
                <label className="text-[#9099A6] block mb-1">Short Description</label>
                <input
                  type="text"
                  value={editingProduct.shortDescription}
                  onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                  className="w-full bg-[#171E27] border border-[#29323D] text-white p-2 rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[#9099A6] block mb-1">Fixed Price (LKR, optional)</label>
                  <input
                    type="number"
                    value={editingProduct.price || ''}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: e.target.value ? Number(e.target.value) : undefined,
                        purchasable: Boolean(e.target.value),
                      })
                    }
                    className="w-full bg-[#171E27] border border-[#29323D] text-white p-2 rounded"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-white">
                    <input
                      type="checkbox"
                      checked={editingProduct.featured}
                      onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                      className="accent-[#00A8F0]"
                    />
                    <span>Mark as Featured</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#29323D]">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 bg-[#171E27] text-[#9099A6] rounded text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00A8F0] hover:bg-[#008FCF] text-white font-bold rounded text-xs"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
