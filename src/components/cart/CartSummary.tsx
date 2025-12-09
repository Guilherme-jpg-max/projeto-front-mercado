import React from "react";
import { formatCurrency } from "../../utils/formatters";
import { useCart } from "../../context/CartContext";
import { Button } from "../common/Button";
import { useNavigate } from "react-router-dom";

export const CartSummary: React.FC = () => {
  const { getTotalPrice, getTotalItems } = useCart();
  const navigate = useNavigate();
  const deliveryFee = 5.0;
  const total = getTotalPrice() + deliveryFee;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Resumo do Pedido</h3>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({getTotalItems()} itens)</span>
          <span>{formatCurrency(getTotalPrice())}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Taxa de entrega</span>
          <span>{formatCurrency(deliveryFee)}</span>
        </div>
        <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-800">
          <span>Total</span>
          <span className="text-primary-600">{formatCurrency(total)}</span>
        </div>
      </div>

      <Button
        onClick={() => navigate("/checkout")}
        className="w-full"
        disabled={getTotalItems() === 0}
      >
        Finalizar Compra
      </Button>

      <p className="text-xs text-gray-500 text-center mt-4">
        Frete calculado no checkout
      </p>
    </div>
  );
};
