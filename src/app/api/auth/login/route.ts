import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { apiError } from "@/lib/api";

const schema = z.object({ email: z.string().email(), password: z.string().min(1) });

export async function POST(request: NextRequest) {
  try {
    const input = schema.parse(await request.json());
    const role = input.email.includes("superadmin") ? "SUPER_ADMIN" : input.email.includes("admin") ? "ADMIN" : input.email.includes("vendor") || input.email.includes("supplier") ? "SUPPLIER" : "BUYER";
    const vendorApproved = role === "SUPPLIER" && input.email.includes("approved");
    const customerApproved = role === "BUYER" && input.email.includes("approved");
    return NextResponse.json({
      token: "demo-jwt-token-placeholder",
      role,
      vendorApprovalStatus: role === "SUPPLIER" ? (vendorApproved ? "APPROVED" : "PENDING") : undefined,
      customerApprovalStatus: role === "BUYER" ? (customerApproved ? "APPROVED" : "PENDING") : undefined,
      redirectTo:
        role === "SUPER_ADMIN" || role === "ADMIN"
          ? "/operations/admin"
          : role === "SUPPLIER" && vendorApproved
            ? "/supplier/dashboard"
            : role === "SUPPLIER"
              ? "/vendor/onboarding/status"
              : customerApproved
                ? "/buyer/dashboard"
                : "/customer/onboarding"
    });
  } catch (error) {
    return apiError(error);
  }
}
