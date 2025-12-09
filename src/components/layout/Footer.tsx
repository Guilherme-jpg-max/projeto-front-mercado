import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">SuperMercado</h3>
            <p className="text-sm">
              Seu supermercado online com os melhores produtos e preços. Entrega
              rápida e segura na sua casa.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/produtos" className="hover:text-white transition">
                  Produtos
                </Link>
              </li>
              <li>
                <Link to="/ofertas" className="hover:text-white transition">
                  Ofertas
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="hover:text-white transition">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contato" className="hover:text-white transition">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <span>(88) 99999-9999</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span>contato@supermercado.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>Crato, CE</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-white transition">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-white transition">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 SuperMercado.</p>
        </div>
      </div>
    </footer>
  );
};
