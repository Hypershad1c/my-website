import { Product } from "@prisma/client";

export default function ProductCard({ product }: { product: Product }) {
  // 1. Create a static Moroccan Dirham formatter
  const madFormatter = new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: 'MAD',
  });

  // 2. Format the price
  const priceInMAD = madFormatter.format(Number(product.price));

  const imageUrl = product.images && product.images.length > 0 ? product.images[0] : null;

  return (
    <div className="group border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
      <div className="aspect-square w-full bg-gray-100 rounded-md overflow-hidden flex items-center justify-center relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>

      <div className="mt-4">
        <h3 className="font-bold text-gray-900 truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 h-10">
          {product.description}
        </p>
        
        {/* DISPLAY MAD PRICE */}
        <p className="mt-2 font-semibold text-lg text-blue-600">
          {priceInMAD}
        </p>
      </div>

      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-medium">
        Add to Cart
      </button>
    </div>
  );
}