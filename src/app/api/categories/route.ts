import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { categories } from "@/lib/data";
import { apiError, created } from "@/lib/api";
import { requireRole } from "@/lib/auth";

const schema = z.object({ name: z.string().min(2), slug: z.string().min(2), featured: z.boolean().default(false) });

export async function GET() {
  return NextResponse.json({ data: categories });
}

export async function POST(request: NextRequest) {
  const forbidden = requireRole(request, ["ADMIN", "SUPER_ADMIN"]);
  if (forbidden) return forbidden;
  try {
    return created({ id: "cat-new", ...schema.parse(await request.json()) });
  } catch (error) {
    return apiError(error);
  }
}
