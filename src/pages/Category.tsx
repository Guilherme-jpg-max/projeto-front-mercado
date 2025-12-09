import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productService } from "../services/mockApi";
import type { Product } from "../types/product";
import { ProductGrid } from "../components/products/ProductGrid";
import { LoadingSpinner } from "../components/common/LoadingSpinner";

const Category: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [slug]);

  const loadProducts = async () => {
    if (!slug) return;
    setLoading(true);
    try {
      const data = await productService.getByCategory(getCategoryName(slug));
      setProducts(data);
    } catch (error) {
      console.error("Erro ao carregar produtos", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (slug: string): string => {
    const categories: Record<string, string> = {
      hortifruti: "Hortifruti",
      bebidas: "Bebidas",
      acougue: "Açougue",
      laticinios: "Laticínios",
      graos: "Grãos",
      padaria: "Padaria",
    };
    return categories[slug] || slug;
  };

  const categoryName = slug ? getCategoryName(slug) : "";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {categoryName}
        </h1>
        <p className="text-gray-600">
          {loading
            ? "Carregando..."
            : `${products.length} produtos encontrados`}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
};

export default Category;
