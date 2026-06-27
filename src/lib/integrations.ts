export type PaymentIntentInput = {
  orderId: string;
  amount: number;
  currency: string;
  provider?: "stripe" | "razorpay" | "mock";
};

export async function createPaymentIntent(input: PaymentIntentInput) {
  return {
    provider: input.provider ?? process.env.PAYMENT_PROVIDER ?? "mock",
    status: "created",
    reference: `mock_${input.orderId}_${Date.now()}`,
    message: "Payment provider abstraction is ready for Stripe or Razorpay credentials."
  };
}

export function validateUploadPlaceholder(fileName: string) {
  const allowed = [".pdf", ".png", ".jpg", ".jpeg", ".webp", ".docx", ".xlsx"];
  return allowed.some((extension) => fileName.toLowerCase().endsWith(extension));
}

export function shippingQuotePlaceholder(destinationCountry: string, incoterm = "FOB") {
  return {
    destinationCountry,
    incoterm,
    options: ["Sea freight consolidation", "Air freight priority", "Land freight regional"],
    note: "Final freight rates require carrier integration and supplier pickup details."
  };
}
