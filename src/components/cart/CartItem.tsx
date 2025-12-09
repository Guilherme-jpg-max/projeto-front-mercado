import React from "react";
import type { CartItem as CartItemType } from "../../types/cart";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatCurrency } from "../../utils/formatters";
import { useCart } from "../../context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center space-x-4 p-4 border rounded-lg">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-20 h-20 object-cover rounded"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-600">{item.description}</p>
        <p className="text-lg font-bold text-primary-600 mt-1">
          {formatCurrency(item.price)}
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="p-1 rounded-lg border hover:bg-gray-100 transition"
        >
          <Minus size={16} />
        </button>
        <span className="w-12 text-center font-semibold">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="p-1 rounded-lg border hover:bg-gray-100 transition"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="text-right">
        <p className="font-bold text-gray-800">
          {formatCurrency(item.price * item.quantity)}
        </p>
        <button
          onClick={() => removeItem(item.id)}
          className="text-red-600 hover:text-red-800 mt-2"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};
