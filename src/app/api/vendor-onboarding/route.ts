import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { apiError, created } from "@/lib/api";
import { vendorOnboardingRequests } from "@/lib/data";
import { requireRole } from "@/lib/auth";

const onboardingSchema = z.object({
  companyName: z.string().min(2),
  contactName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  country: z.string().min(2),
  businessType: z.string().min(2),
  categories: z.array(z.string()).min(1),
  bannerFileName: z.string().optional(),
  productCatalogMode: z.enum(["REQUEST_MODEL", "INQUIRY_MODEL", "BOTH"]),
  requestedProducts: z.array(z.string()).min(1),
  notes: z.string().optional()
});

export async function GET() {
  return NextResponse.json({ data: vendorOnboardingRequests });
}

export async function POST(request: NextRequest) {
  try {
    const input = onboardingSchema.parse(await request.json());
    return created({
      id: "von-new",
      status: "PENDING",
      message: "Vendor onboarding request submitted. Supplier panel access remains locked until admin approval.",
      ...input
    });
  } catch (error) {
    return apiError(error);
  }
}

export async function PATCH(request: NextRequest) {
  const forbidden = requireRole(request, ["ADMIN", "SUPER_ADMIN"]);
  if (forbidden) return forbidden;

  try {
    const schema = z.object({
      requestId: z.string(),
      status: z.enum(["APPROVED", "REJECTED"]),
      adminNote: z.string().optional()
    });
    return created({ message: "Vendor onboarding decision recorded. Supplier panel access changes after approval.", ...schema.parse(await request.json()) });
  } catch (error) {
    return apiError(error);
  }
}
