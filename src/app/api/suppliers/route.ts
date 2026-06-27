import { NextResponse } from "next/server";
import { suppliers } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ data: suppliers });
}
