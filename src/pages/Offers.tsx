import React, { useEffect, useState } from "react";
import { productService } from "../services/mockApi";
import type { Product } from "../types/product";
import { ProductGrid } from "../components/products/ProductGrid";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { Tag } from "lucide-react";

const Offers: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    setLoading(true);
    try {
      const allProducts = await productService.getAll();
      const offers = allProducts.filter((p) => p.discount);
      setProducts(offers);
    } catch (error) {
      console.error("Erro ao carregar ofertas", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg p-8 mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Tag size={48} />
          <h1 className="text-5xl font-bold">Ofertas Especiais</h1>
        </div>
        <p className="text-center text-xl">
          Aproveite os melhores preços e descontos imperdíveis!
        </p>
      </div>

      <div className="mb-8">
        <p className="text-gray-600 text-lg">
          {loading
            ? "Carregando ofertas..."
            : `${products.length} produtos em oferta`}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <Tag size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Nenhuma oferta disponível
          </h2>
          <p className="text-gray-600">
            Volte em breve para conferir nossas promoções
          </p>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
};

export default Offers;
