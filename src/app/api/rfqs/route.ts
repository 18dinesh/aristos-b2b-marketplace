import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rfqs } from "@/lib/data";
import { apiError, created } from "@/lib/api";
import { requireRole } from "@/lib/auth";

const rfqSchema = z.object({
  productName: z.string().min(3),
  category: z.string().min(2),
  quantity: z.number().int().positive(),
  unit: z.string().min(1),
  targetPrice: z.string().optional(),
  destinationCountry: z.string().min(2),
  specifications: z.string().min(10),
  deadline: z.string()
});

export async function GET() {
  return NextResponse.json({ data: rfqs });
}

export async function POST(request: NextRequest) {
  const forbidden = requireRole(request, ["BUYER", "ADMIN", "SUPER_ADMIN"]);
  if (forbidden) return forbidden;
  try {
    return created({ id: "rfq-new", status: "OPEN", ...rfqSchema.parse(await request.json()) });
  } catch (error) {
    return apiError(error);
  }
}
