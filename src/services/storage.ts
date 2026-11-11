import { initialCategories, initialProducts, initialProjects } from '../data/seedData';
import { defaultSiteSettings } from '../config/siteSettings';
import {
  Product,
  Category,
  Project,
  QuoteRequest,
  ContactInquiry,
  Order,
  CartItem,
  SiteSettings,
} from '../types';

const STORAGE_KEYS = {
  PRODUCTS: 'fxm_products_v1',
  CATEGORIES: 'fxm_categories_v1',
  PROJECTS: 'fxm_projects_v1',
  QUOTES: 'fxm_quotes_v1',
  INQUIRIES: 'fxm_inquiries_v1',
  ORDERS: 'fxm_orders_v1',
  CART: 'fxm_cart_v1',
  SETTINGS: 'fxm_settings_v1',
  ADMIN_AUTH: 'fxm_admin_session_v1',
};

// Initial sample quotes so the admin dashboard is immediately inspectable and testable
const initialQuotes: QuoteRequest[] = [
  {
    id: 'quote-sample-01',
    referenceNumber: 'FXM-2026-1042',
    customerName: 'Roshan Samarasekera',
    email: 'roshan.s@dilmah.lk',
    phone: '+94 77 345 6789',
    company: 'Ceylon Tea Logistics',
    productId: 'prod-ind-01',
    productName: 'Apex-900 Industrial Heavy Duty Shutter',
    applicationType: 'industrial',
    operationType: 'motorized',
    dimensions: {
      widthMm: 4500,
      heightMm: 3800,
      squareMeters: 17.1,
    },
    quantity: 3,
    materialPreference: 'Galvanized Structural Steel',
    finishPreference: 'Anthracite Dark Matte',
    installationRequired: true,
    district: 'Colombo',
    siteType: 'New Warehouse Construction',
    notes: 'Require motorized integration with centralized access card reader system.',
    estimatedTotal: 785000,
    status: 'Reviewing',
    createdAt: '2026-03-09T09:15:00Z',
    updatedAt: '2026-03-09T10:30:00Z',
    adminNotes: 'Site engineer inspected drawing. Slat guide reinforcement recommended.',
  },
  {
    id: 'quote-sample-02',
    referenceNumber: 'FXM-2026-1043',
    customerName: 'Ananya Perera',
    email: 'ananya@pereradesign.com',
    phone: '+94 71 889 2233',
    company: 'Studio Perera Architects',
    productId: 'prod-perf-02',
    productName: 'Aero-Micro Perforated Security Shutter',
    applicationType: 'commercial',
    operationType: 'motorized',
    dimensions: {
      widthMm: 3200,
      heightMm: 2800,
      squareMeters: 8.96,
    },
    quantity: 1,
    materialPreference: 'Architectural Aluminium',
    finishPreference: 'Anodized Natural Silver',
    installationRequired: true,
    district: 'Galle',
    siteType: 'High-Street Boutique Renovation',
    notes: 'Looking for 35% perforation ratio and whisper-quiet motor operation.',
    estimatedTotal: 340000,
    status: 'Quoted',
    createdAt: '2026-03-08T14:20:00Z',
    updatedAt: '2026-03-08T16:00:00Z',
    adminNotes: 'Formal quote sent with anodized spec sheet.',
  },
];

const initialInquiries: ContactInquiry[] = [
  {
    id: 'inq-sample-01',
    name: 'Kavinda Jayawardene',
    email: 'kavinda.j@gmail.com',
    phone: '+94 77 444 1122',
    subject: 'Emergency Shutter Motor Repair - Colombo 03',
    message: 'Our storefront roller shutter motor seems stuck halfway since yesterday evening. Do you provide same-day diagnostic technicians?',
    status: 'new',
    createdAt: '2026-03-10T08:00:00Z',
  },
];

// Helper to safe parse LocalStorage
function safeGet<T>(key: string, fallback: T): T {
  try {
    const val = localStorage.getItem(key);
    if (!val) return fallback;
    return JSON.parse(val) as T;
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return fallback;
  }
}

function safeSet<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error saving ${key} to storage:`, err);
  }
}

export const StorageService = {
  // Products
  getProducts(): Product[] {
    return safeGet<Product[]>(STORAGE_KEYS.PRODUCTS, initialProducts);
  },
  getProductBySlug(slug: string): Product | undefined {
    return this.getProducts().find((p) => p.slug === slug);
  },
  saveProduct(product: Product): void {
    const current = this.getProducts();
    const index = current.findIndex((p) => p.id === product.id);
    if (index >= 0) {
      current[index] = { ...product, updatedAt: new Date().toISOString() };
    } else {
      current.unshift({ ...product, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    safeSet(STORAGE_KEYS.PRODUCTS, current);
  },
  deleteProduct(id: string): void {
    const current = this.getProducts().filter((p) => p.id !== id);
    safeSet(STORAGE_KEYS.PRODUCTS, current);
  },

  // Categories
  getCategories(): Category[] {
    return safeGet<Category[]>(STORAGE_KEYS.CATEGORIES, initialCategories);
  },

  // Projects
  getProjects(): Project[] {
    return safeGet<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);
  },
  getProjectBySlug(slug: string): Project | undefined {
    return this.getProjects().find((p) => p.slug === slug);
  },
  saveProject(project: Project): void {
    const current = this.getProjects();
    const index = current.findIndex((p) => p.id === project.id);
    if (index >= 0) {
      current[index] = project;
    } else {
      current.unshift(project);
    }
    safeSet(STORAGE_KEYS.PROJECTS, current);
  },
  deleteProject(id: string): void {
    const current = this.getProjects().filter((p) => p.id !== id);
    safeSet(STORAGE_KEYS.PROJECTS, current);
  },

  // Quotes
  getQuotes(): QuoteRequest[] {
    return safeGet<QuoteRequest[]>(STORAGE_KEYS.QUOTES, initialQuotes);
  },
  getQuoteByReference(ref: string): QuoteRequest | undefined {
    return this.getQuotes().find((q) => q.referenceNumber === ref);
  },
  saveQuote(quote: QuoteRequest): void {
    const current = this.getQuotes();
    const index = current.findIndex((q) => q.id === quote.id);
    if (index >= 0) {
      current[index] = { ...quote, updatedAt: new Date().toISOString() };
    } else {
      current.unshift(quote);
    }
    safeSet(STORAGE_KEYS.QUOTES, current);
  },
  updateQuoteStatus(id: string, status: QuoteRequest['status'], adminNotes?: string): void {
    const current = this.getQuotes();
    const index = current.findIndex((q) => q.id === id);
    if (index >= 0) {
      current[index].status = status;
      if (adminNotes !== undefined) {
        current[index].adminNotes = adminNotes;
      }
      current[index].updatedAt = new Date().toISOString();
      safeSet(STORAGE_KEYS.QUOTES, current);
    }
  },

  // Inquiries
  getInquiries(): ContactInquiry[] {
    return safeGet<ContactInquiry[]>(STORAGE_KEYS.INQUIRIES, initialInquiries);
  },
  saveInquiry(inquiry: ContactInquiry): void {
    const current = this.getInquiries();
    current.unshift(inquiry);
    safeSet(STORAGE_KEYS.INQUIRIES, current);
  },
  updateInquiryStatus(id: string, status: ContactInquiry['status']): void {
    const current = this.getInquiries();
    const inq = current.find((i) => i.id === id);
    if (inq) {
      inq.status = status;
      safeSet(STORAGE_KEYS.INQUIRIES, current);
    }
  },

  // Cart
  getCart(): CartItem[] {
    return safeGet<CartItem[]>(STORAGE_KEYS.CART, []);
  },
  saveCart(items: CartItem[]): void {
    safeSet(STORAGE_KEYS.CART, items);
  },
  addToCart(item: CartItem): CartItem[] {
    const current = this.getCart();
    const existingIndex = current.findIndex((i) => i.productId === item.productId);
    if (existingIndex >= 0) {
      current[existingIndex].quantity += item.quantity;
    } else {
      current.push(item);
    }
    this.saveCart(current);
    return current;
  },
  removeFromCart(id: string): CartItem[] {
    const current = this.getCart().filter((i) => i.id !== id);
    this.saveCart(current);
    return current;
  },
  updateCartQuantity(id: string, quantity: number): CartItem[] {
    let current = this.getCart();
    if (quantity <= 0) {
      current = current.filter((i) => i.id !== id);
    } else {
      const item = current.find((i) => i.id === id);
      if (item) item.quantity = quantity;
    }
    this.saveCart(current);
    return current;
  },
  clearCart(): void {
    safeSet(STORAGE_KEYS.CART, []);
  },

  // Orders
  getOrders(): Order[] {
    return safeGet<Order[]>(STORAGE_KEYS.ORDERS, []);
  },
  saveOrder(order: Order): void {
    const current = this.getOrders();
    current.unshift(order);
    safeSet(STORAGE_KEYS.ORDERS, current);
  },
  updateOrderStatus(id: string, fulfillmentStatus: Order['fulfillmentStatus']): void {
    const current = this.getOrders();
    const ord = current.find((o) => o.id === id);
    if (ord) {
      ord.fulfillmentStatus = fulfillmentStatus;
      safeSet(STORAGE_KEYS.ORDERS, current);
    }
  },

  // Site Settings
  getSiteSettings(): SiteSettings {
    return safeGet<SiteSettings>(STORAGE_KEYS.SETTINGS, defaultSiteSettings);
  },
  saveSiteSettings(settings: SiteSettings): void {
    safeSet(STORAGE_KEYS.SETTINGS, settings);
  },

  // Admin Session
  isAdminLoggedIn(): boolean {
    return safeGet<boolean>(STORAGE_KEYS.ADMIN_AUTH, false);
  },
  setAdminLoggedIn(val: boolean): void {
    safeSet(STORAGE_KEYS.ADMIN_AUTH, val);
  },
};
