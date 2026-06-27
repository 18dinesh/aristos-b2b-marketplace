import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { apiError, created } from "@/lib/api";

const schema = z.object({ orderId: z.string(), reason: z.string().min(10), requestedRefund: z.number().optional(), evidenceUrl: z.string().optional() });

export async function GET() {
  return NextResponse.json({ data: [{ id: "disp-1", orderId: "order-3", status: "MEDIATION", reason: "Shipment quality evidence under review" }] });
}

export async function POST(request: NextRequest) {
  try {
    return created({ id: "disp-new", status: "OPEN", ...schema.parse(await request.json()) });
  } catch (error) {
    return apiError(error);
  }
}
