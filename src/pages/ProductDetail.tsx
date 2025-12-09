import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { productService } from "../services/mockApi";
import type { Product } from "../types/product";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ShoppingCart, ArrowLeft, Package, Truck, Shield } from "lucide-react";
import { formatCurrency } from "../utils/formatters";
import { useCart } from "../context/CartContext";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await productService.getById(Number(id));
      setProduct(data || null);
    } catch (error) {
      console.error("Erro ao carregar produto", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <LoadingSpinner text="Carregando produto..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Produto não encontrado
        </h2>
        <Link
          to="/produtos"
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Voltar para produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/produtos"
        className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-6"
      >
        <ArrowLeft size={20} />
        <span>Voltar</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
          {product.discount && (
            <span className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg text-lg font-bold">
              -{product.discount}%
            </span>
          )}
        </div>

        <div>
          <div className="mb-2">
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>

          <p className="text-gray-600 text-lg mb-6">{product.description}</p>

          <div className="mb-6">
            {product.oldPrice && (
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-xl text-gray-400 line-through">
                  {formatCurrency(product.oldPrice)}
                </span>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
                  Economize {formatCurrency(product.oldPrice - product.price)}
                </span>
              </div>
            )}
            <div className="text-5xl font-bold text-primary-600">
              {formatCurrency(product.price)}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-2 text-green-600">
              <Package size={20} />
              <span className="font-medium">
                {product.stock > 0
                  ? `${product.stock} unidades disponíveis`
                  : "Produto esgotado"}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantidade
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition"
              >
                -
              </button>
              <span className="text-xl font-semibold w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full bg-primary-600 text-white py-4 rounded-lg hover:bg-primary-700 transition font-semibold text-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            <ShoppingCart size={24} />
            <span>Adicionar ao Carrinho</span>
          </button>

          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center space-x-3 text-gray-600">
              <Truck size={24} className="text-primary-600" />
              <div>
                <p className="font-semibold">Entrega Rápida</p>
                <p className="text-sm">Receba em até 24h</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Shield size={24} className="text-primary-600" />
              <div>
                <p className="font-semibold">Compra Segura</p>
                <p className="text-sm">Seus dados protegidos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
