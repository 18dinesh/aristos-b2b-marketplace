import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { apiError, created } from "@/lib/api";

const schema = z.object({
  orderId: z.string(),
  supplierRating: z.number().int().min(1).max(5),
  productRating: z.number().int().min(1).max(5),
  onTimeDeliveryRating: z.number().int().min(1).max(5),
  communicationRating: z.number().int().min(1).max(5),
  qualityRating: z.number().int().min(1).max(5),
  comment: z.string().min(5)
});

export async function GET() {
  return NextResponse.json({ data: [{ id: "rev-1", rating: 4.4, moderated: true, comment: "Responsive supplier and clear documentation." }] });
}

export async function POST(request: NextRequest) {
  try {
    return created({ id: "rev-new", moderated: false, ...schema.parse(await request.json()) });
  } catch (error) {
    return apiError(error);
  }
}
