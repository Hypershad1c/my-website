import { db } from "@/lib/db";
import ProductCard from "@/components/ProductCard";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL)

  const products = await db.product.findMany();

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-8">My Store</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}