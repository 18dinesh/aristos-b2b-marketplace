import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { products, suppliers } from "@/lib/data";

const catalogUpdateSchema = z.object({
  type: z.enum(["PRODUCT", "SUPPLIER", "CURRENCY_SETTINGS"]),
  id: z.string().min(1),
  payload: z.record(z.string(), z.unknown())
});

export async function GET() {
  return NextResponse.json({
    data: {
      products,
      suppliers,
      defaultCurrency: "INR",
      editableFields: {
        product: ["title", "category", "subcategory", "image", "gallery", "minPrice", "maxPrice", "currency", "moq", "unit", "description", "specs", "approvalStatus", "visibility"],
        supplier: ["name", "type", "country", "region", "banner", "logo", "mainProducts", "certifications", "capacity", "intro", "verified"]
      }
    }
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = catalogUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid admin catalog payload", details: parsed.error.flatten() }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    mode: "demo",
    message: "Catalog update accepted by the demo API. Connect this endpoint to Prisma/PostgreSQL to persist admin edits.",
    request: parsed.data
  });
}
