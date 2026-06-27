import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { products } from "@/lib/data";
import { apiError, created } from "@/lib/api";

const schema = z.object({ productId: z.string(), quantity: z.number().int().positive(), savedForLater: z.boolean().default(false) });

export async function GET() {
  return NextResponse.json({ data: products.slice(0, 4).map((product) => ({ product, quantity: product.moq, valid: true })) });
}

export async function POST(request: NextRequest) {
  try {
    const input = schema.parse(await request.json());
    const product = products.find((item) => item.id === input.productId);
    return created({ ...input, moqValid: product ? input.quantity >= product.moq : false });
  } catch (error) {
    return apiError(error);
  }
}
