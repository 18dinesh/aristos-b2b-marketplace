import { NextRequest } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { apiError, created } from "@/lib/api";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(10),
  role: z.enum(["BUYER", "SUPPLIER"]),
  companyName: z.string().min(2),
  country: z.string().min(2)
});

export async function POST(request: NextRequest) {
  try {
    const input = schema.parse(await request.json());
    const passwordHash = await bcrypt.hash(input.password, 12);
    return created({ id: "user-new", verificationStatus: "PENDING", ...input, password: undefined, passwordHashPreview: `${passwordHash.slice(0, 8)}...` });
  } catch (error) {
    return apiError(error);
  }
}
