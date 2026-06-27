import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aristos B2B Marketplace",
  description: "Modern wholesale marketplace for buyers, suppliers, RFQs, bulk orders, logistics, and secure trade workflows."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
