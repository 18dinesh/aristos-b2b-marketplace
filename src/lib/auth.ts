import { NextRequest, NextResponse } from "next/server";
import type { Role } from "./types";

export function getRequestRole(request: NextRequest): Role {
  const role = request.headers.get("x-user-role")?.toUpperCase();
  if (role === "SUPPLIER" || role === "ADMIN" || role === "SUPER_ADMIN") return role;
  return "BUYER";
}

export function requireRole(request: NextRequest, allowed: Role[]) {
  const role = getRequestRole(request);
  if (!allowed.includes(role)) {
    return NextResponse.json({ error: "You do not have permission to perform this action." }, { status: 403 });
  }
  return null;
}
