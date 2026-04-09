import { db } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CategoryNav from "@/components/CategoryNav";

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  // Fetch the specific category name and the products in that category
  const [category, products, allCategories] = await Promise.all([
    db.category.findUnique({ where: { id } }),
    db.product.findMany({ where: { categoryId: id } }),
    db.category.findMany()
  ]);

  if (!category) {
    return (
      <main className="p-10 bg-[#0a0a0a] min-h-screen text-white">
        <p>Category not found.</p>
        <Link href="/" className="text-blue-400">Return Home</Link>
      </main>
    );
  }

  return (
    <main className="p-10 bg-[#0a0a0a] min-h-screen text-white font-mono">
      {/* Header */}
      <div className="flex justify-between items-center mb-10 border-b border-[#222] pb-6">
        <div className="flex items-center gap-4">
          <CategoryNav categories={allCategories} />
          <h1 className="text-2xl font-bold uppercase tracking-tighter">
            {category.name}
          </h1>
        </div>
        
        <Link href="/" className="text-xs text-gray-500 hover:text-white flex items-center gap-2">
          <ArrowLeft size={14} /> BACK_TO_ALL
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center border border-dashed border-[#222]">
            <p className="text-gray-600 text-sm">NO_PRODUCTS_IN_THIS_CATEGORY</p>
          </div>
        )}
      </div>
    </main>
  );
}