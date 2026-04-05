// src/app/products/page.tsx
import { db } from "@/lib/db";

export default async function ProductsPage() {
  const products = await db.product.findMany();
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}