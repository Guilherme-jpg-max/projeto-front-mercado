import { useState, useEffect } from "react";
import { categoryService, type Category } from "../services/apiService";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await categoryService.getAll();
      setCategories(response.categories);
    } catch (err) {
      console.error("Erro ao carregar categorias:", err);
      setError("Erro ao carregar categorias");
    } finally {
      setLoading(false);
    }
  };

  return { categories, loading, error, refetch: loadCategories };
};
