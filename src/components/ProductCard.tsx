import { Product } from "@prisma/client";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group border rounded-lg p-4 bg-white shadow-sm">
      <div className="aspect-square w-full bg-gray-100 rounded-md flex items-center justify-center">
        <span className="text-gray-400">No Image</span>
      </div>
      <div className="mt-4">
        <h3 className="font-bold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
        <p className="mt-2 font-semibold text-lg">${product.price.toString()}</p>
      </div>
      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
        Add to Cart
      </button>
    </div>
  );
}