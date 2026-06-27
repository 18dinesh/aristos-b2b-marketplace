import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { conversations } from "@/lib/data";
import { apiError, created } from "@/lib/api";

const schema = z.object({ conversationId: z.string(), body: z.string().min(1), attachmentUrl: z.string().optional() });

export async function GET() {
  return NextResponse.json({ data: conversations });
}

export async function POST(request: NextRequest) {
  try {
    return created({ id: "msg-new", read: false, createdAt: new Date().toISOString(), ...schema.parse(await request.json()) });
  } catch (error) {
    return apiError(error);
  }
}
