import type { Product } from "./types";

const INR_RATES: Record<Product["currency"], number> = {
  INR: 1,
  USD: 83,
  EUR: 90
};

export const platformCurrency = {
  code: "INR",
  label: "Indian Rupee",
  adminEditable: true,
  supported: ["INR", "USD", "EUR"]
} as const;

export function toInr(amount: number, currency: Product["currency"]) {
  return Math.round(amount * INR_RATES[currency]);
}

export function formatInr(amount: number, currency: Product["currency"] = "INR") {
  return `INR ${toInr(amount, currency).toLocaleString("en-IN")}`;
}

export function formatProductRange(product: Pick<Product, "currency" | "minPrice" | "maxPrice">) {
  return `${formatInr(product.minPrice, product.currency)} - ${formatInr(product.maxPrice, product.currency)}`;
}
