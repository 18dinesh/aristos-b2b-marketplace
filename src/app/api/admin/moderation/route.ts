import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { apiError, created } from "@/lib/api";
import { requireRole } from "@/lib/auth";

const schema = z.object({
  entityType: z.enum(["USER", "CUSTOMER_ONBOARDING", "SUPPLIER", "VENDOR_ONBOARDING", "PRODUCT_APPROVAL", "PRODUCT", "RFQ", "REVIEW", "DISPUTE", "BANNER"]),
  entityId: z.string(),
  action: z.enum(["APPROVE", "REJECT", "REMOVE", "FEATURE", "RESOLVE", "PUBLISH", "HIDE"]),
  notes: z.string().optional()
});

export async function GET(request: NextRequest) {
  const forbidden = requireRole(request, ["ADMIN", "SUPER_ADMIN"]);
  if (forbidden) return forbidden;
  return NextResponse.json({ data: ["Supplier verification", "Product moderation", "RFQ spam review", "Review moderation", "Dispute mediation"] });
}

export async function POST(request: NextRequest) {
  const forbidden = requireRole(request, ["ADMIN", "SUPER_ADMIN"]);
  if (forbidden) return forbidden;
  try {
    return created({ status: "RECORDED", ...schema.parse(await request.json()) });
  } catch (error) {
    return apiError(error);
  }
}
