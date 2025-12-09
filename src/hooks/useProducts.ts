import { useState, useEffect } from "react";
import { productService, type Product } from "../services/apiService";

export const useProducts = (category?: string, searchQuery?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, [category, searchQuery]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      let data;

      if (searchQuery) {
        // Busca
        const response = await productService.search(searchQuery);
        data = response.products;
      } else if (category) {
        // Por categoria
        const response = await productService.getByCategory(category);
        data = response.products;
      } else {
        // Todos os produtos
        const response = await productService.getAll();
        data = response.products;
      }

      setProducts(data);
    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
      setError("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, refetch: loadProducts };
};

export const useFeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productService.getFeatured();
      setProducts(response.products);
    } catch (err) {
      console.error("Erro ao carregar produtos em destaque:", err);
      setError("Erro ao carregar produtos em destaque");
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, refetch: loadFeaturedProducts };
};

export const useProduct = (id: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getById(id);
      setProduct(data);
    } catch (err) {
      console.error("Erro ao carregar produto:", err);
      setError("Produto não encontrado");
    } finally {
      setLoading(false);
    }
  };

  return { product, loading, error, refetch: loadProduct };
};
