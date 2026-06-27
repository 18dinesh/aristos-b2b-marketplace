import { NextResponse } from "next/server";
import { ZodError, z } from "zod";

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(24)
});

export function apiError(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json({ error: "Validation failed", details: error.flatten() }, { status: 400 });
  }
  return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
}

export function created<T>(data: T) {
  return NextResponse.json(data, { status: 201 });
}
