import { OnboardingStatus, PrismaClient, ProductApprovalStatus, ProductCatalogMode, ProductVisibility, SupplierType, UserRole, VerificationStatus } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { categories, customerOnboardingRequests, orders, products, productApprovalRequests, rfqs, suppliers, vendorOnboardingRequests } from "../src/lib/data";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/aristos_b2b?schema=public"
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await bcrypt.hash("AristosDemo#2026", 12);

  await prisma.promotion.deleteMany();
  await prisma.banner.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.review.deleteMany();
  await prisma.dispute.deleteMany();
  await prisma.shipment.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.message.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.quotation.deleteMany();
  await prisma.rFQ.deleteMany();
  await prisma.productSpecification.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.favoriteProduct.deleteMany();
  await prisma.favoriteSupplier.deleteMany();
  await prisma.product.deleteMany();
  await prisma.verificationRequest.deleteMany();
  await prisma.customerOnboardingRequest.deleteMany();
  await prisma.vendorOnboardingRequest.deleteMany();
  await prisma.supplierProfile.deleteMany();
  await prisma.buyerProfile.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const categoryRecords = new Map<string, string>();
  for (const category of categories) {
    const record = await prisma.category.create({
      data: {
        name: category.name,
        slug: category.slug,
        imageUrl: category.image,
        featured: category.featured,
        icon: category.name.slice(0, 2).toUpperCase()
      }
    });
    categoryRecords.set(category.slug, record.id);
  }

  const buyerUsers = await Promise.all(
    Array.from({ length: 5 }).map((_, index) =>
      prisma.user.create({
        data: {
          name: ["Metro Retail Sourcing", "Orion Hospitality Group", "BrightCart Imports", "Atlas Procurement", "Nexa Wholesale"][index],
          email: `buyer${index + 1}@aristos.demo`,
          phone: `+1-555-018${index}`,
          passwordHash,
          role: UserRole.BUYER,
          verificationStatus: VerificationStatus.APPROVED,
          buyerProfile: {
            create: {
              companyName: ["Metro Retail Sourcing", "Orion Hospitality Group", "BrightCart Imports", "Atlas Procurement", "Nexa Wholesale"][index],
              businessType: ["Retail chain", "Hospitality", "Importer", "Distributor", "Online wholesale"][index],
              country: ["United States", "Spain", "India", "Canada", "UAE"][index],
              procurementFor: ["Packaging", "Furniture", "Electronics"]
            }
          }
        }
      })
    )
  );

  const supplierProfiles = new Map<string, { userId: string; profileId: string }>();
  for (const supplier of suppliers) {
    const user = await prisma.user.create({
      data: {
        name: supplier.name,
        email: `${supplier.slug}@aristos.demo`,
        phone: `+91-90000-${supplier.id.replace("sup-", "").padStart(4, "0")}`,
        passwordHash,
        role: UserRole.SUPPLIER,
        verificationStatus: supplier.verified ? VerificationStatus.APPROVED : VerificationStatus.PENDING,
        supplierProfile: {
          create: {
            companyName: supplier.name,
            slug: supplier.slug,
            logoUrl: supplier.logo,
            bannerUrl: supplier.banner,
            type: supplier.type.toUpperCase().replaceAll(" ", "_") as SupplierType,
            yearsInBusiness: supplier.years,
            country: supplier.country,
            region: supplier.region,
            mainProducts: supplier.mainProducts,
            productionCapacity: supplier.capacity,
            certifications: supplier.certifications,
            factoryPhotos: [supplier.banner],
            responseRate: supplier.responseRate,
            onTimeDeliveryRate: supplier.onTimeDelivery,
            secureTradeEligible: supplier.secureTrade,
            companyIntro: supplier.intro
          }
        }
      },
      include: { supplierProfile: true }
    });
    supplierProfiles.set(supplier.id, { userId: user.id, profileId: user.supplierProfile!.id });
  }

  for (const request of vendorOnboardingRequests) {
    await prisma.vendorOnboardingRequest.create({
      data: {
        companyName: request.companyName,
        contactName: request.contactName,
        email: request.email,
        phone: request.phone,
        country: request.country,
        businessType: request.businessType,
        categories: request.categories,
        bannerUrl: request.bannerUrl,
        documentUrls: ["/uploads/demo-company-profile.pdf"],
        productCatalogMode: request.productCatalogMode as ProductCatalogMode,
        requestedProducts: request.requestedProducts,
        companyProfile: "Demo vendor profile for service-request marketplace onboarding.",
        adminNote: request.adminNote,
        status: request.status as OnboardingStatus
      }
    });
  }

  for (const request of customerOnboardingRequests) {
    await prisma.customerOnboardingRequest.create({
      data: {
        companyName: request.companyName,
        contactName: request.contactName,
        email: request.email,
        phone: request.phone,
        country: request.country,
        buyerType: request.buyerType,
        sourcingCategories: request.sourcingCategories,
        expectedMonthlyVolume: request.expectedMonthlyVolume,
        documentUrls: ["/uploads/demo-customer-profile.pdf"],
        adminNote: request.adminNote,
        status: request.status as OnboardingStatus
      }
    });
  }

  const productRecords = new Map<string, string>();
  for (const product of products) {
    const supplier = supplierProfiles.get(product.supplierId)!;
    const approval = productApprovalRequests.find((request) => request.productTitle === product.title);
    const record = await prisma.product.create({
      data: {
        supplierId: supplier.profileId,
        categoryId: categoryRecords.get(product.category)!,
        title: product.title,
        slug: product.slug,
        description: product.description,
        minPrice: product.minPrice,
        maxPrice: product.maxPrice,
        currency: product.currency,
        minimumOrderQuantity: product.moq,
        unitType: product.unit,
        stock: product.stock,
        productionCapacity: product.capacity,
        leadTimeDays: product.leadTime,
        customizationAvailable: product.customizable,
        sampleAvailable: product.sampleAvailable,
        readyToShip: product.readyToShip,
        tradeProtected: product.tradeProtected,
        approvalStatus: (approval?.status === "APPROVED" ? "APPROVED" : product.tradeProtected ? "APPROVED" : "PENDING_SUPER_ADMIN") as ProductApprovalStatus,
        visibility: (approval?.visibility ?? (product.tradeProtected ? "PUBLIC" : "HIDDEN")) as ProductVisibility,
        approvedBy: product.tradeProtected ? "super-admin-demo" : undefined,
        approvedAt: product.tradeProtected ? new Date() : undefined,
        popularityScore: product.popularity,
        country: product.country,
        shippingOptions: product.shipping,
        images: { create: product.gallery.map((url, sortOrder) => ({ url, alt: product.title, sortOrder })) },
        specifications: { create: Object.entries(product.specs).map(([name, value]) => ({ name, value })) }
      }
    });
    productRecords.set(product.id, record.id);
  }

  for (const rfq of rfqs) {
    const record = await prisma.rFQ.create({
      data: {
        buyerId: buyerUsers[0].id,
        categoryId: categoryRecords.get(rfq.category)!,
        productName: rfq.productName,
        quantity: rfq.quantity,
        unit: rfq.unit,
        targetPrice: rfq.targetPrice.includes("$") ? Number(rfq.targetPrice.match(/[0-9.]+/)?.[0] ?? 1) : undefined,
        destinationCountry: rfq.destinationCountry,
        specifications: "Buyer requests supplier quote with product specification sheet and export-ready packaging.",
        deadline: new Date(rfq.deadline)
      }
    });
    const supplier = supplierProfiles.get("sup-4")!;
    await prisma.quotation.create({
      data: {
        rfqId: record.id,
        supplierId: supplier.profileId,
        userId: supplier.userId,
        price: 2.85,
        moq: 1000,
        leadTimeDays: 21,
        shippingTerms: "FOB",
        message: "Quotation includes production sample, carton marks, and inspection window."
      }
    });
  }

  const firstProduct = products[0];
  for (const order of orders) {
    const supplier = supplierProfiles.get(order.supplierId)!;
    const created = await prisma.order.create({
      data: {
        orderNumber: order.number,
        buyerId: buyerUsers[0].id,
        supplierId: supplier.userId,
        status: order.status.toUpperCase().replaceAll(" ", "_") as never,
        paymentStatus: order.paymentStatus.includes("Paid") ? "PAID" : "AUTHORIZED",
        subtotal: order.total,
        total: order.total,
        currency: order.currency,
        productionLeadTime: order.leadTime,
        deliveryAddress: order.destination,
        secureTradeEligible: order.secureTrade,
        qualityAgreement: "Protection eligibility subject to platform terms. Quality scope must be agreed in the order contract.",
        shipmentDeadline: new Date("2026-08-20"),
        items: {
          create: [{
            productId: productRecords.get(firstProduct.id)!,
            title: firstProduct.title,
            quantity: firstProduct.moq,
            unitPrice: firstProduct.minPrice,
            total: firstProduct.minPrice * firstProduct.moq
          }]
        },
        payment: {
          create: {
            provider: "mock",
            status: order.paymentStatus.includes("Paid") ? "PAID" : "AUTHORIZED",
            protectedPayment: order.secureTrade,
            amount: order.total,
            currency: order.currency
          }
        },
        shipment: {
          create: {
            method: "Sea freight",
            incoterm: "FOB",
            destinationCountry: order.destination.split(", ").at(-1) ?? order.destination,
            status: "BOOKED",
            timeline: order.timeline
          }
        }
      }
    });

    await prisma.review.create({
      data: {
        orderId: created.id,
        productId: productRecords.get(firstProduct.id),
        userId: buyerUsers[0].id,
        supplierRating: 4,
        productRating: 4,
        onTimeDeliveryRating: 4,
        communicationRating: 5,
        qualityRating: 4,
        comment: "Responsive supplier with clear production updates. Final quality review placeholder for demo data.",
        moderated: true
      }
    });
  }

  await prisma.banner.create({
    data: {
      title: "Verified export suppliers for contract buying teams",
      placement: "homepage-hero",
      imageUrl: "/assets/hero-marketplace.png",
      active: true
    }
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
