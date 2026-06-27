import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { apiError, created } from "@/lib/api";
import { requireRole } from "@/lib/auth";
import { productApprovalRequests } from "@/lib/data";

const productProposalSchema = z.object({
  productTitle: z.string().min(3),
  supplierName: z.string().min(2),
  category: z.string().min(2),
  model: z.enum(["REQUEST_MODEL", "INQUIRY_MODEL"]),
  notes: z.string().optional()
});

export async function GET() {
  return NextResponse.json({ data: productApprovalRequests });
}

export async function POST(request: NextRequest) {
  const forbidden = requireRole(request, ["SUPPLIER", "ADMIN", "SUPER_ADMIN"]);
  if (forbidden) return forbidden;

  try {
    const input = productProposalSchema.parse(await request.json());
    return created({
      id: "par-new",
      status: "PENDING_SUPER_ADMIN",
      visibility: "HIDDEN",
      message: "Product proposal submitted. It will not display publicly until super admin approval.",
      ...input
    });
  } catch (error) {
    return apiError(error);
  }
}

export async function PATCH(request: NextRequest) {
  const forbidden = requireRole(request, ["SUPER_ADMIN"]);
  if (forbidden) return forbidden;

  try {
    const schema = z.object({
      requestId: z.string(),
      status: z.enum(["APPROVED", "REJECTED"]),
      superAdminNote: z.string().optional()
    });
    const input = schema.parse(await request.json());
    return created({
      ...input,
      visibility: input.status === "APPROVED" ? "PUBLIC" : "HIDDEN",
      message: "Super admin product display decision recorded."
    });
  } catch (error) {
    return apiError(error);
  }
}
