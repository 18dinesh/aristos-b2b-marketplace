import Image from "next/image";
import Link from "next/link";
import { Heart, MessageSquare, ShoppingCart } from "lucide-react";
import { getSupplier } from "@/lib/data";
import { formatProductRange } from "@/lib/currency";
import type { Product } from "@/lib/types";
import { Badge } from "./Badge";

export function ProductCard({ product }: { product: Product }) {
  const supplier = getSupplier(product.supplierId);

  return (
    <article className="card group overflow-hidden">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <Image src={product.image} alt={product.title} fill className="object-cover transition duration-300 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 25vw" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-1">
            {product.readyToShip ? <Badge tone="blue" icon="ready">Ready</Badge> : null}
            {product.tradeProtected ? <Badge tone="green" icon="protection">Protected</Badge> : null}
          </div>
        </div>
      </Link>
      <div className="space-y-3 p-4">
        <Link href={`/products/${product.slug}`} className="line-clamp-2 min-h-10 font-bold text-slate-950 hover:text-teal-700">
          {product.title}
        </Link>
        <div>
          <div className="text-lg font-black text-slate-950">
            {formatProductRange(product)}
          </div>
          <div className="text-sm text-slate-500">MOQ {product.moq.toLocaleString()} {product.unit}</div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {supplier?.verified ? <Badge tone="green" icon="verified">Verified</Badge> : null}
          {product.customizable ? <Badge tone="amber">Customizable</Badge> : null}
          {product.sampleAvailable ? <Badge>Sample</Badge> : null}
        </div>
        <div className="border-t border-slate-100 pt-3 text-sm text-slate-600">
          <Link href={`/suppliers/${supplier?.slug}`} className="font-semibold text-slate-800 hover:text-teal-700">{supplier?.name}</Link>
          <div>{product.country} · {supplier?.responseRate}% response</div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button className="small-icon-button" aria-label="Add to cart"><ShoppingCart className="h-4 w-4" /></button>
          <button className="small-icon-button" aria-label="Message supplier"><MessageSquare className="h-4 w-4" /></button>
          <button className="small-icon-button" aria-label="Favorite product"><Heart className="h-4 w-4" /></button>
        </div>
      </div>
    </article>
  );
}
