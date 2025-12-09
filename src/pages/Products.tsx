import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Product } from "../types/product";
import { productService } from "../services/apiService";
import { ProductGrid } from "../components/products/ProductGrid";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import toast from "react-hot-toast";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  useEffect(() => {
    loadProducts();
  }, [searchQuery]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      let data: Product[];
      if (searchQuery) {
        const response = await productService.search(searchQuery);
        data = response.products;
      } else {
        const response = await productService.getAll();
        data = response.products;
      }
      setProducts(data);
    } catch (error: any) {
      console.error("Erro ao carregar produtos", error);
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Erro ao carregar produtos");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        {searchQuery ? `Resultados para "${searchQuery}"` : "Todos os Produtos"}
      </h1>

      <p className="text-gray-600 mb-8">
        {loading
          ? "Carregando..."
          : products.length > 0
          ? `${products.length} produtos encontrados`
          : "Nenhum produto encontrado"}
      </p>

      {loading ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-500 text-lg py-10">
          Nenhum produto corresponde à sua busca.
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
};

export default Products;
