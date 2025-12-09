import React from "react";
import type { Product } from "../../types/product";
import { ShoppingCart } from "lucide-react";
import { formatCurrency } from "../../utils/formatters";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <Link to={`/produto/${product.id}`} className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.discount && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
            -{product.discount}%
          </span>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link to={`/produto/${product.id}`}>
          <h3 className="font-semibold text-gray-800 mb-2 hover:text-primary-600 transition">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-3 flex-1">
          {product.description}
        </p>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              {product.oldPrice && (
                <span className="text-sm text-gray-400 line-through mr-2">
                  {formatCurrency(product.oldPrice)}
                </span>
              )}
              <span className="text-xl font-bold text-primary-600">
                {formatCurrency(product.price)}
              </span>
            </div>
          </div>

          <button
            onClick={() => addItem(product)}
            className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center justify-center space-x-2"
          >
            <ShoppingCart size={20} />
            <span>Adicionar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
