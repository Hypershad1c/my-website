import { db } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { UserCog } from "lucide-react";
import CategoryNav from "@/components/CategoryNav"; // Import our new component

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // Fetch both products and categories
  const [products, categories] = await Promise.all([
    db.product.findMany(),
    db.category.findMany()
  ]);

  return (
    <main className="p-10">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-10 border-b pb-6">
        
        {/* Left Side: Icon + Title */}
        <div className="flex items-center gap-4">
          <CategoryNav categories={categories} />
          <h1 className="text-3xl font-bold">My Store</h1>
        </div>
        
        {/* Right Side: Admin Icon */}
        <Link 
          href="/admin" 
          title="Admin Dashboard"
          className="text-gray-500 hover:text-blue-600 transition p-2 rounded-full hover:bg-blue-50"
        >
          <UserCog size={24} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}