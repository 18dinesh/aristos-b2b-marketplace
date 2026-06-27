# Aristos B2B Marketplace

Modern multi-vendor B2B wholesale marketplace inspired by large global sourcing platforms, with original branding, UI, copy, assets, and domain structure.

## Built Modules

- Public homepage with hero search, category navigation, demo category product imagery, request/inquiry sourcing CTAs, top suppliers, region sourcing, trust, app/workspace promotion, newsletter, and footer.
- Customer/buyer and supplier account surfaces, plus a separate operations admin URL outside the public ecommerce navigation.
- Product catalog with MOQ, price range, lead time, specifications, badges, supplier profile preview, related products, and cart/inquiry actions.
- Advanced search with product/supplier keyword support, category, country, verified supplier, ready-to-ship, customizable, trade protection, and sorting structure.
- Supplier storefronts with verification, business type, certifications, capacity, trust badges, response metrics, factory imagery, and catalog.
- RFQ workflow for buyer posting, supplier quotation, and admin review structure.
- Messaging center for product inquiries, RFQ quotes, order messages, attachments placeholder, unread status, and timestamps.
- Supplier-grouped B2B cart and inquiry cart with MOQ validation structure.
- Order management, payment abstraction, shipping timeline, protection module, dispute placeholders, inspection request, reviews, favorites, and notifications.
- Separate operations admin governance for vendor onboarding approvals, customer onboarding approvals, supplier records, product display approvals, categories, RFQs, orders, disputes, reviews, banners, reports, and settings.
- PostgreSQL Prisma schema for all requested core models.
- Seed script with 12 categories, 30 products, 8 suppliers, 5 buyers, RFQs, quotations, orders, and reviews.

## Tech Stack

- Next.js 16 App Router with TypeScript
- Tailwind CSS 4
- Prisma ORM with PostgreSQL schema
- Zod validation
- bcryptjs password hashing placeholder
- Payment abstraction ready for Stripe or Razorpay
- Local file storage folder with cloud-ready boundary

## Quick Start

```bash
pnpm install
cp .env.example .env
pnpm prisma:generate
pnpm prisma:migrate
pnpm prisma:seed
pnpm dev
```

Open `http://localhost:3000`.

## Demo Auth Behavior

The UI includes login/register screens and API placeholders. The login endpoint returns a role-based redirect:

- Emails containing `admin` redirect to `/operations/admin`
- Emails containing `superadmin` also redirect to `/operations/admin`
- Approved vendor/supplier emails redirect to `/supplier/dashboard`
- Pending supplier/vendor requests should remain on `/vendor/onboarding/status`
- Pending customer/buyer requests should remain on `/customer/onboarding`
- Other emails redirect to `/buyer/dashboard`

Legacy `/admin/dashboard` redirects to `/operations/admin`, keeping admin maintenance separate from the public marketplace UI.

## Core Access Rules

- Super admin can approve admins, customers, vendors, products, banners, categories, and marketplace settings.
- Admin can review and maintain vendor onboarding, customer onboarding, supplier records, customer details, RFQs, and support queues.
- Customers need onboarding approval before full RFQ, inquiry, quotation, order, and messaging access.
- Vendors need onboarding approval before supplier panel access.
- Vendor products stay hidden until super admin approves public display.

Seed password for generated users:

```text
AristosDemo#2026
```

## API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET|POST /api/products`
- `GET|POST /api/categories`
- `GET /api/suppliers`
- `GET|POST /api/rfqs`
- `GET|POST /api/quotations`
- `GET|POST /api/messages`
- `GET|POST /api/cart`
- `GET|POST /api/orders`
- `GET|POST /api/disputes`
- `GET|POST /api/reviews`
- `GET /api/notifications`
- `GET|POST /api/admin/moderation`
- `GET|POST|PATCH /api/vendor-onboarding`
- `GET|POST|PATCH /api/customer-onboarding`
- `GET|POST|PATCH /api/product-approvals`

Protected endpoints use the `x-user-role` request header in this demo. Replace this with session/JWT validation before production.

## Production Notes

- Replace placeholder auth with NextAuth/Auth.js or hardened JWT sessions.
- Connect API routes to Prisma queries and transactional writes.
- Move uploads from `public/uploads` to S3, R2, GCS, or another object store.
- Implement payment provider adapters for Stripe and Razorpay in `src/lib/integrations.ts`.
- Add Socket.io/WebSocket transport for live messaging.
- Add full audit logging for admin moderation, disputes, verification, and payments.
- Keep Secure Trade Protection copy terms-aware. Current UI uses: "Protection eligibility subject to platform terms."
