import type { AccessRule, Category, CustomerOnboardingRequest, Order, Product, ProductApprovalRequest, RFQ, Supplier, VendorOnboardingRequest } from "./types";

export const categories: Category[] = [
  { id: "cat-1", name: "Consumer Electronics", slug: "consumer-electronics", image: "/assets/electronics.png", featured: true, subcategories: ["Smart devices", "Audio", "Computer accessories"] },
  { id: "cat-2", name: "Apparel & Fashion", slug: "apparel-fashion", image: "/assets/apparel.png", featured: true, subcategories: ["Uniforms", "Activewear", "Footwear"] },
  { id: "cat-3", name: "Home & Garden", slug: "home-garden", image: "/assets/garden.png", featured: true, subcategories: ["Kitchenware", "Storage", "Outdoor"] },
  { id: "cat-4", name: "Beauty & Personal Care", slug: "beauty-personal-care", image: "/assets/beauty.png", featured: false, subcategories: ["Skin care", "Packaging", "Salon supplies"] },
  { id: "cat-5", name: "Machinery", slug: "machinery", image: "/assets/machinery.png", featured: true, subcategories: ["Packaging machines", "CNC", "Textile machines"] },
  { id: "cat-6", name: "Industrial Supplies", slug: "industrial-supplies", image: "/assets/industrial.png", featured: false, subcategories: ["Safety", "Fasteners", "Electrical"] },
  { id: "cat-7", name: "Packaging & Printing", slug: "packaging-printing", image: "/assets/packaging.png", featured: true, subcategories: ["Boxes", "Labels", "Flexible packaging"] },
  { id: "cat-8", name: "Furniture", slug: "furniture", image: "/assets/furniture.png", featured: false, subcategories: ["Office", "Hospitality", "Outdoor"] },
  { id: "cat-9", name: "Auto Parts", slug: "auto-parts", image: "/assets/auto.png", featured: false, subcategories: ["EV parts", "Filters", "Lighting"] },
  { id: "cat-10", name: "Agriculture", slug: "agriculture", image: "/assets/agriculture.png", featured: false, subcategories: ["Irrigation", "Tools", "Inputs"] },
  { id: "cat-11", name: "Food & Beverage", slug: "food-beverage", image: "/assets/food.png", featured: false, subcategories: ["Ingredients", "Beverages", "Snacks"] },
  { id: "cat-12", name: "Sports & Entertainment", slug: "sports-entertainment", image: "/assets/sports.png", featured: false, subcategories: ["Fitness", "Outdoor sports", "Event supplies"] }
];

export const suppliers: Supplier[] = [
  {
    id: "sup-1",
    name: "NovaForge Manufacturing Co.",
    slug: "novaforge-manufacturing",
    type: "Manufacturer",
    country: "India",
    region: "Gujarat",
    years: 12,
    responseRate: 96,
    onTimeDelivery: 93,
    verified: true,
    secureTrade: true,
    mainProducts: ["Packaging machinery", "Industrial conveyors", "Batch coding systems"],
    certifications: ["ISO 9001", "CE Ready"],
    capacity: "180 machinery units/month",
    intro: "Precision manufacturing partner for exporters and brand owners needing configurable production lines.",
    banner: "/assets/machinery.png",
    logo: "NF"
  },
  {
    id: "sup-2",
    name: "BluePeak Global Trading",
    slug: "bluepeak-global-trading",
    type: "Trading Company",
    country: "Vietnam",
    region: "Ho Chi Minh City",
    years: 8,
    responseRate: 91,
    onTimeDelivery: 89,
    verified: true,
    secureTrade: true,
    mainProducts: ["Consumer electronics", "Smart accessories", "Chargers"],
    certifications: ["BSCI", "RoHS"],
    capacity: "450,000 accessories/month",
    intro: "Export-ready sourcing desk with consolidated inspection and multi-country shipping support.",
    banner: "/assets/electronics.png",
    logo: "BP"
  },
  {
    id: "sup-3",
    name: "Everloom Apparel Works",
    slug: "everloom-apparel-works",
    type: "Manufacturer",
    country: "Bangladesh",
    region: "Dhaka",
    years: 15,
    responseRate: 94,
    onTimeDelivery: 91,
    verified: true,
    secureTrade: false,
    mainProducts: ["Workwear", "Cotton basics", "Private-label activewear"],
    certifications: ["WRAP", "OEKO-TEX"],
    capacity: "1.2M garments/month",
    intro: "Cut-and-sew apparel manufacturer with fabric sourcing and compliance documentation.",
    banner: "/assets/apparel.png",
    logo: "EA"
  },
  {
    id: "sup-4",
    name: "TerraPack Exporters",
    slug: "terrapack-exporters",
    type: "Exporter",
    country: "Turkey",
    region: "Istanbul",
    years: 10,
    responseRate: 88,
    onTimeDelivery: 90,
    verified: true,
    secureTrade: true,
    mainProducts: ["Corrugated boxes", "Printed mailers", "Food-safe pouches"],
    certifications: ["FSC", "BRC Packaging"],
    capacity: "8M packaging units/month",
    intro: "Packaging exporter focused on retail, food, and ecommerce fulfillment programs.",
    banner: "/assets/packaging.png",
    logo: "TP"
  },
  {
    id: "sup-5",
    name: "SanaCare Personal Products",
    slug: "sanacare-personal-products",
    type: "Distributor",
    country: "UAE",
    region: "Dubai",
    years: 6,
    responseRate: 87,
    onTimeDelivery: 88,
    verified: false,
    secureTrade: false,
    mainProducts: ["Personal care kits", "Salon consumables", "Travel amenities"],
    certifications: ["GMP Partner"],
    capacity: "80,000 kits/month",
    intro: "Regional distributor for hospitality, clinics, retail bundles, and beauty wholesale buyers.",
    banner: "/assets/beauty.png",
    logo: "SC"
  },
  {
    id: "sup-6",
    name: "ArcWood Contract Furniture",
    slug: "arcwood-contract-furniture",
    type: "Manufacturer",
    country: "Poland",
    region: "Poznan",
    years: 18,
    responseRate: 92,
    onTimeDelivery: 95,
    verified: true,
    secureTrade: true,
    mainProducts: ["Office desks", "Hotel furniture", "Acoustic booths"],
    certifications: ["FSC", "ISO 14001"],
    capacity: "22,000 furniture units/month",
    intro: "Contract furniture factory serving hospitality, workplace, and institutional buyers.",
    banner: "/assets/furniture.png",
    logo: "AW"
  },
  {
    id: "sup-7",
    name: "AgriAxis Wholesale",
    slug: "agriaxis-wholesale",
    type: "Wholesaler",
    country: "Kenya",
    region: "Nairobi",
    years: 7,
    responseRate: 85,
    onTimeDelivery: 86,
    verified: false,
    secureTrade: false,
    mainProducts: ["Irrigation kits", "Farm tools", "Greenhouse supplies"],
    certifications: ["Local Export Board"],
    capacity: "65 container loads/quarter",
    intro: "Agriculture wholesale network supporting regional and cross-border farm supply procurement.",
    banner: "/assets/agriculture.png",
    logo: "AA"
  },
  {
    id: "sup-8",
    name: "MotionGrid Auto Components",
    slug: "motiongrid-auto-components",
    type: "Manufacturer",
    country: "Mexico",
    region: "Nuevo Leon",
    years: 11,
    responseRate: 90,
    onTimeDelivery: 87,
    verified: true,
    secureTrade: true,
    mainProducts: ["EV brackets", "Filters", "LED assemblies"],
    certifications: ["IATF 16949"],
    capacity: "310,000 components/month",
    intro: "Automotive component supplier with custom stamping, plastics, and assembly support.",
    banner: "/assets/auto.png",
    logo: "MG"
  }
];

const productTitles = [
  ["Smart POS Terminal with NFC", "consumer-electronics", "Smart devices", "electronics"],
  ["Wireless Barcode Scanner Kit", "consumer-electronics", "Computer accessories", "electronics"],
  ["Bulk USB-C Fast Charger 45W", "consumer-electronics", "Chargers", "electronics"],
  ["Rugged Warehouse Tablet", "consumer-electronics", "Smart devices", "electronics"],
  ["Custom Cotton Workwear Jacket", "apparel-fashion", "Uniforms", "apparel"],
  ["Private Label Performance T-Shirt", "apparel-fashion", "Activewear", "apparel"],
  ["Safety Footwear for Industrial Buyers", "apparel-fashion", "Footwear", "apparel"],
  ["Hotel Linen Procurement Pack", "apparel-fashion", "Uniforms", "apparel"],
  ["Stackable Storage Basket Set", "home-garden", "Storage", "garden"],
  ["Commercial Kitchen Utensil Bundle", "home-garden", "Kitchenware", "garden"],
  ["Outdoor Planter Wholesale Range", "home-garden", "Outdoor", "garden"],
  ["Salon Disposable Towel Roll", "beauty-personal-care", "Salon supplies", "beauty"],
  ["Travel Personal Care Amenity Kit", "beauty-personal-care", "Skin care", "beauty"],
  ["Automatic Carton Sealing Machine", "machinery", "Packaging machines", "machinery"],
  ["Modular Belt Conveyor Line", "machinery", "Packaging machines", "machinery"],
  ["Compact CNC Marking System", "machinery", "CNC", "machinery"],
  ["Industrial Safety Helmet Set", "industrial-supplies", "Safety", "industrial"],
  ["Stainless Fastener Assortment", "industrial-supplies", "Fasteners", "industrial"],
  ["Waterproof Electrical Junction Box", "industrial-supplies", "Electrical", "industrial"],
  ["Printed Corrugated Shipping Box", "packaging-printing", "Boxes", "packaging"],
  ["Compostable Stand-Up Pouch", "packaging-printing", "Flexible packaging", "packaging"],
  ["Custom Thermal Shipping Label", "packaging-printing", "Labels", "packaging"],
  ["Ergonomic Office Desk Series", "furniture", "Office", "furniture"],
  ["Hotel Room Furniture Package", "furniture", "Hospitality", "furniture"],
  ["EV Battery Mounting Bracket", "auto-parts", "EV parts", "auto"],
  ["Aftermarket Cabin Air Filter", "auto-parts", "Filters", "auto"],
  ["Drip Irrigation Starter Kit", "agriculture", "Irrigation", "agriculture"],
  ["Commercial Greenhouse Tool Set", "agriculture", "Tools", "agriculture"],
  ["Freeze-Dried Fruit Ingredient Pack", "food-beverage", "Ingredients", "food"],
  ["Commercial Fitness Resistance Band Set", "sports-entertainment", "Fitness", "sports"]
] as const;

export const products: Product[] = productTitles.map(([title, category, subcategory, imageSlug], index) => {
  const supplier = suppliers[index % suppliers.length];
  const basePrice = 1.8 + (index % 9) * 4.25;
  return {
    id: `prod-${index + 1}`,
    title,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    category,
    subcategory,
    supplierId: supplier.id,
    image: `/assets/${imageSlug}.png`,
    gallery: [`/assets/${imageSlug}.png`, supplier.banner],
    minPrice: Number(basePrice.toFixed(2)),
    maxPrice: Number((basePrice * 1.8 + 3).toFixed(2)),
    currency: index % 3 === 0 ? "USD" : index % 3 === 1 ? "INR" : "EUR",
    moq: [50, 100, 250, 500, 1000][index % 5],
    unit: ["pieces", "sets", "cartons", "units"][index % 4],
    stock: 1200 + index * 175,
    capacity: `${5 + (index % 8)} container loads/month`,
    leadTime: 7 + (index % 6) * 4,
    customizable: index % 2 === 0,
    sampleAvailable: index % 3 !== 0,
    readyToShip: index % 4 === 0,
    tradeProtected: supplier.secureTrade && index % 3 !== 1,
    country: supplier.country,
    shipping: ["Sea freight", "Air freight", "Land freight"].slice(0, 1 + (index % 3)),
    popularity: 60 + ((index * 7) % 38),
    description: `${title} for bulk procurement programs, private-label supply, and repeat wholesale purchasing. Supplier supports structured quotations, sample requests, negotiated contract notes, and export documentation placeholders.`,
    specs: {
      Material: ["ABS", "Cotton", "Steel", "Paperboard", "Wood composite"][index % 5],
      "Lead time": `${7 + (index % 6) * 4} days`,
      "Customization": index % 2 === 0 ? "Logo, packaging, size options" : "Packaging and carton marks",
      "Sample policy": index % 3 !== 0 ? "Available on request" : "Production sample after PO",
      "Shipping terms": ["EXW", "FOB", "CIF", "DDP"][index % 4]
    }
  };
});

export const rfqs: RFQ[] = [
  { id: "rfq-1", productName: "Custom printed mailer boxes", category: "packaging-printing", quantity: 50000, unit: "pieces", targetPrice: "Under $0.18/piece", destinationCountry: "United States", deadline: "2026-07-12", status: "OPEN", quotes: 7 },
  { id: "rfq-2", productName: "Workwear jackets with reflective tape", category: "apparel-fashion", quantity: 12000, unit: "pieces", targetPrice: "Under $9.50/piece", destinationCountry: "Germany", deadline: "2026-07-18", status: "QUOTED", quotes: 12 },
  { id: "rfq-3", productName: "Carton sealing line for food warehouse", category: "machinery", quantity: 4, unit: "sets", targetPrice: "Negotiable", destinationCountry: "India", deadline: "2026-08-01", status: "OPEN", quotes: 4 }
];

export const orders: Order[] = [
  { id: "order-1", number: "AB2B-2026-1001", buyer: "Metro Retail Sourcing", supplierId: "sup-4", status: "In production", paymentStatus: "Protected payment authorized", total: 18450, currency: "USD", leadTime: 24, destination: "Los Angeles, United States", secureTrade: true, timeline: ["Draft approved", "Supplier confirmed", "Payment authorized", "Production started"] },
  { id: "order-2", number: "AB2B-2026-1002", buyer: "Orion Hospitality Group", supplierId: "sup-6", status: "Ready to ship", paymentStatus: "Paid", total: 74200, currency: "EUR", leadTime: 35, destination: "Barcelona, Spain", secureTrade: true, timeline: ["PO created", "Inspection requested", "Inspection passed", "Ready to ship"] },
  { id: "order-3", number: "AB2B-2026-1003", buyer: "BrightCart Imports", supplierId: "sup-2", status: "Disputed", paymentStatus: "Refund request placeholder", total: 12990, currency: "USD", leadTime: 14, destination: "Mumbai, India", secureTrade: true, timeline: ["Shipped", "Buyer opened dispute", "Admin mediation started"] }
];

export const conversations = [
  { id: "conv-1", subject: "Inquiry: Printed corrugated box", supplier: "TerraPack Exporters", unread: 2, lastMessage: "We can hold the quoted rate for 10 days and include carton drop-test documentation.", time: "09:42" },
  { id: "conv-2", subject: "RFQ quote: Workwear jackets", supplier: "Everloom Apparel Works", unread: 0, lastMessage: "Please confirm GSM, zipper grade, and target delivery port.", time: "Yesterday" },
  { id: "conv-3", subject: "Order AB2B-2026-1001", supplier: "TerraPack Exporters", unread: 1, lastMessage: "Production samples are ready for review.", time: "Jun 25" }
];

export const vendorOnboardingRequests: VendorOnboardingRequest[] = [
  {
    id: "von-1",
    companyName: "Kairo MedSupply Manufacturing",
    contactName: "Aarav Mehta",
    email: "vendor.pending@aristos.demo",
    phone: "+91-90000-7711",
    country: "India",
    businessType: "Manufacturer",
    categories: ["Beauty & Personal Care", "Packaging & Printing"],
    bannerUrl: "/assets/beauty.png",
    productCatalogMode: "INQUIRY_MODEL",
    requestedProducts: ["Hospitality amenity kits", "Custom printed pouch packaging", "Salon disposable consumables"],
    status: "PENDING",
    submittedAt: "2026-06-24",
    adminNote: "Awaiting factory photos, GST certificate, and sample catalog approval."
  },
  {
    id: "von-2",
    companyName: "VectorLine Industrial Systems",
    contactName: "Mina Alvarez",
    email: "vendor.approved@aristos.demo",
    phone: "+52-555-0190",
    country: "Mexico",
    businessType: "Exporter",
    categories: ["Machinery", "Industrial Supplies"],
    bannerUrl: "/assets/industrial.png",
    productCatalogMode: "BOTH",
    requestedProducts: ["Conveyor spare parts", "Safety assemblies", "Packaging line upgrade kits"],
    status: "APPROVED",
    submittedAt: "2026-06-18",
    adminNote: "Approved for supplier panel after document review."
  },
  {
    id: "von-3",
    companyName: "NorthBridge Decor Exports",
    contactName: "Elena Novak",
    email: "vendor.review@aristos.demo",
    phone: "+48-555-0132",
    country: "Poland",
    businessType: "Trading Company",
    categories: ["Furniture", "Home & Garden"],
    bannerUrl: "/assets/furniture.png",
    productCatalogMode: "REQUEST_MODEL",
    requestedProducts: ["Hotel furniture packages", "Private-label decor", "Outdoor patio sets"],
    status: "PENDING",
    submittedAt: "2026-06-25",
    adminNote: "Commercial references requested before publishing storefront."
  }
];

export const customerOnboardingRequests: CustomerOnboardingRequest[] = [
  {
    id: "con-1",
    companyName: "Metro Retail Sourcing",
    contactName: "Priya Shah",
    email: "buyer.pending@aristos.demo",
    phone: "+91-90000-1188",
    country: "India",
    buyerType: "Retail chain",
    sourcingCategories: ["Packaging & Printing", "Consumer Electronics"],
    expectedMonthlyVolume: "20 purchase requests/month",
    status: "PENDING",
    submittedAt: "2026-06-25",
    adminNote: "Business GST and delivery address book pending review."
  },
  {
    id: "con-2",
    companyName: "Orion Hospitality Group",
    contactName: "Naveen Rao",
    email: "buyer.approved@aristos.demo",
    phone: "+91-90000-2288",
    country: "India",
    buyerType: "Hospitality procurement",
    sourcingCategories: ["Furniture", "Beauty & Personal Care"],
    expectedMonthlyVolume: "12 RFQs/month",
    status: "APPROVED",
    submittedAt: "2026-06-19",
    adminNote: "Approved for RFQ posting, messaging, samples, and order workflows."
  },
  {
    id: "con-3",
    companyName: "BrightCart Imports",
    contactName: "Ishaan Nair",
    email: "buyer.review@aristos.demo",
    phone: "+91-90000-3388",
    country: "India",
    buyerType: "Importer",
    sourcingCategories: ["Auto Parts", "Industrial Supplies"],
    expectedMonthlyVolume: "8 container inquiries/quarter",
    status: "PENDING",
    submittedAt: "2026-06-26",
    adminNote: "Import license and finance contact requested."
  }
];

export const productApprovalRequests: ProductApprovalRequest[] = [
  {
    id: "par-1",
    productTitle: "Custom printed hospital amenity kit",
    supplierName: "Kairo MedSupply Manufacturing",
    category: "Beauty & Personal Care",
    submittedBy: "Pending vendor",
    model: "INQUIRY_MODEL",
    status: "PENDING_SUPER_ADMIN",
    visibility: "HIDDEN",
    submittedAt: "2026-06-26",
    superAdminNote: "Requires company approval before product can be listed."
  },
  {
    id: "par-2",
    productTitle: "Conveyor spare part sourcing bundle",
    supplierName: "VectorLine Industrial Systems",
    category: "Industrial Supplies",
    submittedBy: "Approved vendor",
    model: "REQUEST_MODEL",
    status: "APPROVED",
    visibility: "PUBLIC",
    submittedAt: "2026-06-21",
    superAdminNote: "Approved by super admin for public catalog visibility."
  },
  {
    id: "par-3",
    productTitle: "Hotel room furniture package",
    supplierName: "NorthBridge Decor Exports",
    category: "Furniture",
    submittedBy: "Pending vendor",
    model: "REQUEST_MODEL",
    status: "PENDING_SUPER_ADMIN",
    visibility: "HIDDEN",
    submittedAt: "2026-06-25",
    superAdminNote: "Storefront documents pending."
  }
];

export const accessRules: AccessRule[] = [
  {
    role: "SUPER_ADMIN",
    canAccess: "Everything: vendor/customer onboarding, approvals, products, categories, orders, disputes, settings",
    approvalRequired: "No approval required",
    blockedUntil: "Never blocked"
  },
  {
    role: "ADMIN",
    canAccess: "Operations queues, vendor/customer review, support, category maintenance, RFQ monitoring",
    approvalRequired: "Created by super admin",
    blockedUntil: "Super admin assigns admin role"
  },
  {
    role: "CUSTOMER",
    canAccess: "Buyer dashboard, RFQs, inquiries, quotes, orders, favorites, messages",
    approvalRequired: "Customer onboarding approval for full buying access",
    blockedUntil: "Admin or super admin approves customer profile"
  },
  {
    role: "VENDOR",
    canAccess: "Vendor dashboard, RFQ leads, quotations, product proposal form, order updates",
    approvalRequired: "Vendor onboarding approval plus super admin product approval",
    blockedUntil: "Vendor approved and each product approved before display"
  }
];

export const productShowcase = categories.slice(0, 8).map((category, index) => {
  const sampleProducts = products.filter((product) => product.category === category.slug).slice(0, 3);
  return {
    category,
    image: category.image,
    title: sampleProducts[0]?.title ?? category.name,
    products: sampleProducts,
    sourcingMode: index % 2 === 0 ? "Inquiry-led sourcing" : "Request-led catalog onboarding"
  };
});

export function getSupplier(idOrSlug: string) {
  return suppliers.find((supplier) => supplier.id === idOrSlug || supplier.slug === idOrSlug);
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function searchProducts(params: URLSearchParams) {
  const q = params.get("q")?.toLowerCase() ?? "";
  const category = params.get("category") ?? "";
  const verified = params.get("verified") === "true";
  const ready = params.get("readyToShip") === "true";
  const trade = params.get("tradeProtected") === "true";
  const country = params.get("country") ?? "";
  const sort = params.get("sort") ?? "relevance";

  const filtered = products.filter((product) => {
    const supplier = getSupplier(product.supplierId);
    return (
      (!q || product.title.toLowerCase().includes(q) || supplier?.name.toLowerCase().includes(q)) &&
      (!category || product.category === category) &&
      (!country || product.country === country) &&
      (!verified || supplier?.verified) &&
      (!ready || product.readyToShip) &&
      (!trade || product.tradeProtected)
    );
  });

  return filtered.sort((a, b) => {
    if (sort === "price") return a.minPrice - b.minPrice;
    if (sort === "newest") return Number(b.id.split("-")[1]) - Number(a.id.split("-")[1]);
    if (sort === "popularity") return b.popularity - a.popularity;
    return b.popularity + Number(b.tradeProtected) * 10 - (a.popularity + Number(a.tradeProtected) * 10);
  });
}
