export type OperationType = 'motorized' | 'manual' | 'both';
export type ApplicationType = 'industrial' | 'commercial' | 'residential' | 'warehouse';

export interface ProductSpecification {
  maxOpeningWidth: string;
  maxOpeningHeight: string;
  slatProfile: string;
  gaugeThickness: string;
  windLoadRating?: string;
  acousticRating?: string;
  fireRating?: string;
  motorType?: string;
  warranty: string;
}

export interface FinishOption {
  id: string;
  name: string;
  colorCode: string;
  code: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  description: string;
  shortDescription: string;
  images: string[];
  specifications: ProductSpecification;
  material: string;
  finishOptions: FinishOption[];
  operationType: OperationType;
  applicationTypes: ApplicationType[];
  price?: number; // In LKR, if purchasable/fixed
  currency: string;
  priceOnRequest: boolean;
  purchasable: boolean;
  stockQuantity?: number;
  featured: boolean;
  status: 'active' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image?: string;
  displayOrder: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Industrial' | 'Warehouse';
  description: string;
  images: string[];
  location: string;
  completedDate: string;
  relatedProductIds: string[];
  featured: boolean;
  published: boolean;
  technicalHighlights?: string[];
  clientSector?: string;
}

export type QuoteStatus = 'New' | 'Reviewing' | 'Quoted' | 'Approved' | 'Rejected' | 'Completed';

export interface QuoteRequest {
  id: string;
  referenceNumber: string;
  customerName: string;
  email: string;
  phone: string;
  company?: string;
  productId?: string;
  productName?: string;
  applicationType: ApplicationType;
  operationType: OperationType;
  dimensions: {
    widthMm: number;
    heightMm: number;
    squareMeters: number;
  };
  quantity: number;
  materialPreference?: string;
  finishPreference?: string;
  installationRequired: boolean;
  district: string;
  siteType?: string;
  preferredDate?: string;
  notes?: string;
  attachmentUrls?: string[];
  estimatedTotal?: number;
  status: QuoteStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customOptions?: Record<string, string>;
}

export interface Order {
  id: string;
  referenceNumber: string;
  customerId?: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  currency: string;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    installationRequested: boolean;
  };
  fulfillmentStatus: 'Pending Review' | 'Processing' | 'Ready for Dispatch' | 'Installed' | 'Cancelled';
  paymentStatus: 'Payment on Confirmation' | 'Bank Transfer Pending' | 'Verified';
  createdAt: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'replied' | 'archived';
  createdAt: string;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  businessHours: string;
  currency: string;
  ecommerceEnabled: boolean;
  paymentEnabled: boolean;
  socialLinks: {
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
  };
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'customer';
  createdAt: string;
}
