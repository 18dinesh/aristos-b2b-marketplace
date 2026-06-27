import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { orders } from "@/lib/data";
import { apiError, created } from "@/lib/api";
import { createPaymentIntent } from "@/lib/integrations";

const schema = z.object({
  supplierId: z.string(),
  items: z.array(z.object({ productId: z.string(), quantity: z.number().int().positive(), unitPrice: z.number().positive() })).min(1),
  deliveryAddress: z.string().min(5),
  contractNotes: z.string().optional()
});

export async function GET() {
  return NextResponse.json({ data: orders });
}

export async function POST(request: NextRequest) {
  try {
    const input = schema.parse(await request.json());
    const total = input.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const payment = await createPaymentIntent({ orderId: "order-new", amount: total, currency: "USD" });
    return created({ id: "order-new", status: "DRAFT", total, payment, ...input });
  } catch (error) {
    return apiError(error);
  }
}
