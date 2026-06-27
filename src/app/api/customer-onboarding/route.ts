import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { apiError, created } from "@/lib/api";
import { requireRole } from "@/lib/auth";
import { customerOnboardingRequests } from "@/lib/data";

const customerOnboardingSchema = z.object({
  companyName: z.string().min(2),
  contactName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  country: z.string().min(2),
  buyerType: z.string().min(2),
  sourcingCategories: z.array(z.string()).min(1),
  expectedMonthlyVolume: z.string().min(2),
  notes: z.string().optional()
});

export async function GET() {
  return NextResponse.json({ data: customerOnboardingRequests });
}

export async function POST(request: NextRequest) {
  try {
    const input = customerOnboardingSchema.parse(await request.json());
    return created({
      id: "con-new",
      status: "PENDING",
      message: "Customer onboarding request submitted. Full buyer access remains limited until admin approval.",
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
    return created({ message: "Customer onboarding decision recorded.", ...schema.parse(await request.json()) });
  } catch (error) {
    return apiError(error);
  }
}
