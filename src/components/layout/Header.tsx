import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, LogOut } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { getTotalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/produtos?search=${searchTerm}`);
      setSearchTerm("");
    }
  };

  return (
    <header className="bg-primary-600 text-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-white text-primary-600 px-3 py-2 rounded-lg font-bold text-xl">
              SuperMercado
            </div>
          </Link>

          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-2xl mx-8"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
              <button
                type="submit"
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/minha-conta"
                  className="flex items-center space-x-2 hover:bg-primary-700 px-3 py-2 rounded-lg transition"
                >
                  <User size={20} />
                  <span className="text-sm">{user?.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 hover:bg-primary-700 px-3 py-2 rounded-lg transition"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center space-x-2 hover:bg-primary-700 px-3 py-2 rounded-lg transition"
              >
                <User size={20} />
                <span>Entrar</span>
              </Link>
            )}

            <Link
              to="/carrinho"
              className="relative hover:bg-primary-700 px-3 py-2 rounded-lg transition"
            >
              <ShoppingCart size={24} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <form onSubmit={handleSearch} className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
            <button
              type="submit"
              className="absolute right-3 top-2.5 text-gray-500"
            >
              <Search size={20} />
            </button>
          </div>
        </form>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-primary-500 pt-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/minha-conta"
                  className="flex items-center space-x-2 w-full hover:bg-primary-700 px-3 py-2 rounded-lg transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User size={20} />
                  <span>{user?.name}</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full hover:bg-primary-700 px-3 py-2 rounded-lg transition"
                >
                  <LogOut size={20} />
                  <span>Sair</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 w-full hover:bg-primary-700 px-3 py-2 rounded-lg transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User size={20} />
                <span>Entrar / Cadastrar</span>
              </Link>
            )}
          </div>
        )}

        <nav className="hidden md:flex space-x-6 py-3 border-t border-primary-500">
          <Link to="/" className="hover:text-primary-200 transition">
            Home
          </Link>
          <Link to="/produtos" className="hover:text-primary-200 transition">
            Produtos
          </Link>
          <Link to="/ofertas" className="hover:text-primary-200 transition">
            Ofertas
          </Link>
          <Link
            to="/categorias/hortifruti"
            className="hover:text-primary-200 transition"
          >
            Hortifruti
          </Link>
          <Link
            to="/categorias/bebidas"
            className="hover:text-primary-200 transition"
          >
            Bebidas
          </Link>
          <Link
            to="/categorias/acougue"
            className="hover:text-primary-200 transition"
          >
            Açougue
          </Link>
        </nav>
      </div>
    </header>
  );
};
