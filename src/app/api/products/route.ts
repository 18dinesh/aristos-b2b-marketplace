import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { categories, products, searchProducts } from "@/lib/data";
import { apiError, created } from "@/lib/api";
import { requireRole } from "@/lib/auth";

const productSchema = z.object({
  title: z.string().min(3),
  category: z.string().refine((slug) => categories.some((category) => category.slug === slug), "Unknown category"),
  minPrice: z.number().positive(),
  maxPrice: z.number().positive(),
  moq: z.number().int().positive(),
  unit: z.string().min(1)
});

export async function GET(request: NextRequest) {
  return NextResponse.json({ data: searchProducts(request.nextUrl.searchParams), total: products.length });
}

export async function POST(request: NextRequest) {
  const forbidden = requireRole(request, ["SUPPLIER", "ADMIN", "SUPER_ADMIN"]);
  if (forbidden) return forbidden;
  try {
    const input = productSchema.parse(await request.json());
    return created({ id: "prod-new", ...input, status: "PENDING_MODERATION" });
  } catch (error) {
    return apiError(error);
  }
}
