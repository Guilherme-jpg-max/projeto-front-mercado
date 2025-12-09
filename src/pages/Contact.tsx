import React, { useState } from "react";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import toast from "react-hot-toast";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast.success(
        "Mensagem enviada com sucesso! Entraremos em contato em breve."
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Fale Conosco</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Estamos aqui para ajudar! Entre em contato conosco
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="bg-primary-100 p-3 rounded-lg">
                <Phone className="text-primary-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Telefone</h3>
                <p className="text-gray-600">(88) 99999-9999</p>
                <p className="text-sm text-gray-500">Seg a Sex, 8h às 18h</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 mb-6">
              <div className="bg-primary-100 p-3 rounded-lg">
                <Mail className="text-primary-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">E-mail</h3>
                <p className="text-gray-600">contato@supermercado.com</p>
                <p className="text-sm text-gray-500">Respondemos em 24h</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 mb-6">
              <div className="bg-primary-100 p-3 rounded-lg">
                <MapPin className="text-primary-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Endereço</h3>
                <p className="text-gray-600">
                  Av. José Alves de Figueredo, 1144.
                  <br />
                  Crato, CE.
                  <br />
                  CEP: 63114000
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-100 p-3 rounded-lg">
                <Clock className="text-primary-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Horário</h3>
                <p className="text-gray-600">
                  Segunda a Sexta: 8h - 18h
                  <br />
                  Sábado: 8h - 14h
                  <br />
                  Domingo: Fechado
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Envie sua Mensagem
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Nome Completo"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Seu nome"
                />
                <Input
                  label="E-mail"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="seu@email.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Telefone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="(11) 99999-9999"
                />
                <Input
                  label="Assunto"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="Assunto da mensagem"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensagem *
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={6}
                  placeholder="Digite sua mensagem aqui..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon={Send}
                disabled={loading}
                className="w-full"
              >
                {loading ? "Enviando..." : "Enviar Mensagem"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Perguntas Frequentes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-gray-800 mb-2">
              Qual o prazo de entrega?
            </h3>
            <p className="text-gray-600">
              Trabalhamos com entrega expressa em até 24h para a cidade de São
              Paulo e região metropolitana.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-gray-800 mb-2">
              Qual o valor do frete?
            </h3>
            <p className="text-gray-600">
              Frete grátis para compras acima de R$ 100,00. Abaixo desse valor,
              cobramos apenas R$ 9,90.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-gray-800 mb-2">Como posso pagar?</h3>
            <p className="text-gray-600">
              Aceitamos cartão de crédito, débito, PIX e dinheiro na entrega.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-gray-800 mb-2">
              Posso trocar produtos?
            </h3>
            <p className="text-gray-600">
              Sim! Você tem até 7 dias para trocar produtos não perecíveis em
              caso de defeito ou insatisfação.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
