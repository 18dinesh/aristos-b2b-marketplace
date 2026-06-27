import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    data: [
      { id: "not-1", type: "QUOTE_RECEIVED", title: "New quote received", read: false },
      { id: "not-2", type: "ORDER_STATUS_CHANGED", title: "Order moved to production", read: false },
      { id: "not-3", type: "SUPPLIER_VERIFICATION_RESULT", title: "Verification approved", read: true }
    ]
  });
}
