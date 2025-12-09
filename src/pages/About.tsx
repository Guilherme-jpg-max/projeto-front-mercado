import React from "react";
import { Heart, Users, Award, Truck } from "lucide-react";

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Sobre o SuperMercado
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Levando qualidade e economia até você desde 2020
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Nossa História
          </h2>
          <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
            <p>
              O SuperMercado nasceu com o objetivo de revolucionar a forma como
              as pessoas fazem suas compras. Acreditamos que todos merecem
              acesso a produtos de qualidade com preços justos, entregues com
              rapidez e segurança.
            </p>
            <p>
              Com uma equipe dedicada e apaixonada pelo que faz, trabalhamos
              todos os dias para oferecer a melhor experiência de compra online,
              selecionando cuidadosamente cada produto em nosso catálogo.
            </p>
            <p>
              Hoje, atendemos milhares de famílias, sempre com o compromisso de
              qualidade, economia e respeito ao cliente.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Nossos Valores
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-primary-600" size={40} />
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-2">
              Paixão pelo Cliente
            </h3>
            <p className="text-gray-600">
              Colocamos nossos clientes em primeiro lugar em tudo que fazemos
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="text-primary-600" size={40} />
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-2">Qualidade</h3>
            <p className="text-gray-600">
              Selecionamos apenas os melhores produtos para você
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="text-primary-600" size={40} />
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-2">Agilidade</h3>
            <p className="text-gray-600">
              Entrega rápida e eficiente direto na sua casa
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-primary-600" size={40} />
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-2">Comunidade</h3>
            <p className="text-gray-600">
              Construímos relacionamentos duradouros com nossos clientes
            </p>
          </div>
        </div>
      </div>

      <div className="bg-primary-600 text-white rounded-lg p-12">
        <h2 className="text-3xl font-bold text-center mb-12">
          SuperMercado em Números
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold mb-2">10k+</div>
            <div className="text-primary-100">Clientes Satisfeitos</div>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">500+</div>
            <div className="text-primary-100">Produtos</div>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">50k+</div>
            <div className="text-primary-100">Entregas Realizadas</div>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">4.8★</div>
            <div className="text-primary-100">Avaliação Média</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
