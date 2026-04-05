import { db } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import { Product } from "@prisma/client";

export default async function HomePage() {
  const products = await db.product.findMany();

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-8">My Store</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}