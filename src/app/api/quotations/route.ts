import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { apiError, created } from "@/lib/api";
import { requireRole } from "@/lib/auth";

const quotationSchema = z.object({
  rfqId: z.string(),
  price: z.number().positive(),
  moq: z.number().int().positive(),
  leadTimeDays: z.number().int().positive(),
  shippingTerms: z.enum(["EXW", "FOB", "CIF", "DDP"]),
  message: z.string().min(5)
});

export async function GET() {
  return NextResponse.json({
    data: [
      { id: "quote-1", rfqId: "rfq-1", supplier: "TerraPack Exporters", price: 0.18, moq: 50000, status: "SENT" }
    ]
  });
}

export async function POST(request: NextRequest) {
  const forbidden = requireRole(request, ["SUPPLIER", "ADMIN", "SUPER_ADMIN"]);
  if (forbidden) return forbidden;
  try {
    return created({ id: "quote-new", status: "SENT", ...quotationSchema.parse(await request.json()) });
  } catch (error) {
    return apiError(error);
  }
}
