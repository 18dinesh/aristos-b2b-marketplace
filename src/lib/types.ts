export type Role = "BUYER" | "SUPPLIER" | "ADMIN" | "SUPER_ADMIN";

export type Category = {
  id: string;
  name: string;
  slug: string;
  image: string;
  featured: boolean;
  subcategories: string[];
};

export type Supplier = {
  id: string;
  name: string;
  slug: string;
  type: string;
  country: string;
  region: string;
  years: number;
  responseRate: number;
  onTimeDelivery: number;
  verified: boolean;
  secureTrade: boolean;
  mainProducts: string[];
  certifications: string[];
  capacity: string;
  intro: string;
  banner: string;
  logo: string;
};

export type Product = {
  id: string;
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  supplierId: string;
  image: string;
  gallery: string[];
  minPrice: number;
  maxPrice: number;
  currency: "USD" | "INR" | "EUR";
  moq: number;
  unit: string;
  stock: number;
  capacity: string;
  leadTime: number;
  customizable: boolean;
  sampleAvailable: boolean;
  readyToShip: boolean;
  tradeProtected: boolean;
  country: string;
  shipping: string[];
  popularity: number;
  description: string;
  specs: Record<string, string>;
};

export type RFQ = {
  id: string;
  productName: string;
  category: string;
  quantity: number;
  unit: string;
  targetPrice: string;
  destinationCountry: string;
  deadline: string;
  status: "OPEN" | "QUOTED" | "ACCEPTED" | "CLOSED";
  quotes: number;
};

export type OrderStatus =
  | "Draft"
  | "Pending supplier confirmation"
  | "Pending payment"
  | "In production"
  | "Ready to ship"
  | "Shipped"
  | "Delivered"
  | "Completed"
  | "Cancelled"
  | "Disputed";

export type Order = {
  id: string;
  number: string;
  buyer: string;
  supplierId: string;
  status: OrderStatus;
  paymentStatus: string;
  total: number;
  currency: "USD" | "INR" | "EUR";
  leadTime: number;
  destination: string;
  secureTrade: boolean;
  timeline: string[];
};

export type VendorOnboardingRequest = {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  businessType: string;
  categories: string[];
  bannerUrl: string;
  productCatalogMode: "REQUEST_MODEL" | "INQUIRY_MODEL" | "BOTH";
  requestedProducts: string[];
  status: "PENDING" | "APPROVED" | "REJECTED";
  submittedAt: string;
  adminNote: string;
};

export type CustomerOnboardingRequest = {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  buyerType: string;
  sourcingCategories: string[];
  expectedMonthlyVolume: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  submittedAt: string;
  adminNote: string;
};

export type ProductApprovalRequest = {
  id: string;
  productTitle: string;
  supplierName: string;
  category: string;
  submittedBy: string;
  model: "REQUEST_MODEL" | "INQUIRY_MODEL";
  status: "DRAFT" | "PENDING_SUPER_ADMIN" | "APPROVED" | "REJECTED";
  visibility: "HIDDEN" | "PUBLIC";
  submittedAt: string;
  superAdminNote: string;
};

export type AccessRule = {
  role: "SUPER_ADMIN" | "ADMIN" | "CUSTOMER" | "VENDOR";
  canAccess: string;
  approvalRequired: string;
  blockedUntil: string;
};
