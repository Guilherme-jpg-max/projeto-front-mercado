import React, { useEffect, useState } from "react";
import { ProductGrid } from "../components/products/ProductGrid";
import type { Product } from "../types/product";
import { productService } from "../services/apiService";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { Link } from "react-router-dom";
import { ArrowRight, Tag, Truck, CreditCard, Shield } from "lucide-react";
import toast from "react-hot-toast";

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const response = await productService.getFeatured();
      setFeaturedProducts(response.products);
    } catch (error: any) {
      console.error("Erro ao carregar produtos", error);
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Erro ao carregar produtos em destaque");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Bem-vindo ao SuperMercado</h1>
          <p className="text-xl mb-8">
            Os melhores produtos com os melhores preços!
          </p>
          <Link
            to="/produtos"
            className="inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            <span>Ver Todos os Produtos</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="text-primary-600" size={32} />
              </div>
              <h3 className="font-semibold mb-2">Entrega Rápida</h3>
              <p className="text-sm text-gray-600">Receba em até 24h</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tag className="text-primary-600" size={32} />
              </div>
              <h3 className="font-semibold mb-2">Melhores Preços</h3>
              <p className="text-sm text-gray-600">Ofertas imperdíveis</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="text-primary-600" size={32} />
              </div>
              <h3 className="font-semibold mb-2">Pagamento Seguro</h3>
              <p className="text-sm text-gray-600">
                Várias formas de pagamento
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-primary-600" size={32} />
              </div>
              <h3 className="font-semibold mb-2">Compra Segura</h3>
              <p className="text-sm text-gray-600">Seus dados protegidos</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Ofertas Especiais
            </h2>
            <Link
              to="/ofertas"
              className="text-primary-600 hover:text-primary-700 font-semibold flex items-center space-x-2"
            >
              <span>Ver todas</span>
              <ArrowRight size={20} />
            </Link>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <ProductGrid products={featuredProducts} />
          )}
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Categorias
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              {
                name: "Hortifruti",
                slug: "hortifruti",
                image:
                  "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300",
              },
              {
                name: "Bebidas",
                slug: "bebidas",
                image:
                  "https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=300",
              },
              {
                name: "Açougue",
                slug: "acougue",
                image:
                  "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300",
              },
              {
                name: "Laticínios",
                slug: "laticinios",
                image:
                  "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=300",
              },
              {
                name: "Grãos",
                slug: "graos",
                image:
                  "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300",
              },
              {
                name: "Padaria",
                slug: "padaria",
                image:
                  "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300",
              },
            ].map((category) => (
              <Link
                key={category.slug}
                to={`/categorias/${category.slug}`}
                className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition group"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-32 object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white font-bold text-lg">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
