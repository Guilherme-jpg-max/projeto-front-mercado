import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { orderService } from "../services/apiService";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { formatCurrency } from "../utils/formatters";
import {
  CreditCard,
  Smartphone,
  DollarSign,
  CheckCircle,
  MapPin,
} from "lucide-react";
import type { PaymentMethod } from "../types/order";
import toast from "react-hot-toast";

const Checkout: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"address" | "payment" | "success">(
    "address"
  );

  const [address, setAddress] = useState({
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("credit_card");

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await orderService.create({
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl,
        })),
        total: getTotalPrice(),
        paymentMethod: paymentMethod,
        deliveryAddress: address,
      });

      clearCart();
      setStep("success");
      toast.success("Pedido realizado com sucesso!");
    } catch (error: any) {
      console.error("Erro ao processar pedido:", error);
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Erro ao processar pedido");
      }
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && step !== "success") {
    navigate("/carrinho");
    return null;
  }

  if (step === "success") {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle size={80} className="mx-auto text-green-500 mb-6" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Pedido Realizado!
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Obrigado pela sua compra, {user?.name}!<br />
            Você receberá um e-mail com os detalhes do pedido.
          </p>
          <div className="space-x-4">
            <Button
              onClick={() => navigate("/produtos")}
              variant="primary"
              size="lg"
            >
              Continuar Comprando
            </Button>
            <Button
              onClick={() => navigate("/minha-conta")}
              variant="outline"
              size="lg"
            >
              Meus Pedidos
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Finalizar Compra
      </h1>

      <div className="mb-8 flex items-center justify-center space-x-4">
        <div
          className={`flex items-center space-x-2 ${
            step === "address" ? "text-primary-600" : "text-gray-400"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === "address"
                ? "bg-primary-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            1
          </div>
          <span className="font-medium">Endereço</span>
        </div>

        <div className="w-16 h-1 bg-gray-300"></div>

        <div
          className={`flex items-center space-x-2 ${
            step === "payment" ? "text-primary-600" : "text-gray-400"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === "payment"
                ? "bg-primary-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            2
          </div>
          <span className="font-medium">Pagamento</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === "address" ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-2 mb-6">
                <MapPin className="text-primary-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">
                  Endereço de Entrega
                </h2>
              </div>

              <form onSubmit={handleAddressSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-3">
                    <Input
                      label="Rua"
                      required
                      value={address.street}
                      onChange={(e) =>
                        setAddress({ ...address, street: e.target.value })
                      }
                      placeholder="Nome da rua"
                    />
                  </div>
                  <Input
                    label="Número"
                    required
                    value={address.number}
                    onChange={(e) =>
                      setAddress({ ...address, number: e.target.value })
                    }
                    placeholder="123"
                  />
                </div>

                <Input
                  label="Complemento (opcional)"
                  value={address.complement}
                  onChange={(e) =>
                    setAddress({ ...address, complement: e.target.value })
                  }
                  placeholder="Apto, bloco, etc"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Bairro"
                    required
                    value={address.neighborhood}
                    onChange={(e) =>
                      setAddress({ ...address, neighborhood: e.target.value })
                    }
                    placeholder="Centro"
                  />
                  <Input
                    label="CEP"
                    required
                    value={address.zipCode}
                    onChange={(e) =>
                      setAddress({ ...address, zipCode: e.target.value })
                    }
                    placeholder="00000-000"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Cidade"
                    required
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    placeholder="São Paulo"
                  />
                  <Input
                    label="Estado"
                    required
                    maxLength={2}
                    value={address.state}
                    onChange={(e) =>
                      setAddress({ ...address, state: e.target.value })
                    }
                    placeholder="CE"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  Continuar para Pagamento
                </Button>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-2 mb-6">
                <CreditCard className="text-primary-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">
                  Forma de Pagamento
                </h2>
              </div>

              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="payment"
                      value="credit_card"
                      checked={paymentMethod === "credit_card"}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value as PaymentMethod)
                      }
                      className="w-5 h-5"
                    />
                    <CreditCard size={24} className="text-gray-600" />
                    <span className="font-medium">Cartão de Crédito</span>
                  </label>

                  <label className="flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="payment"
                      value="debit_card"
                      checked={paymentMethod === "debit_card"}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value as PaymentMethod)
                      }
                      className="w-5 h-5"
                    />
                    <CreditCard size={24} className="text-gray-600" />
                    <span className="font-medium">Cartão de Débito</span>
                  </label>

                  <label className="flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="payment"
                      value="pix"
                      checked={paymentMethod === "pix"}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value as PaymentMethod)
                      }
                      className="w-5 h-5"
                    />
                    <Smartphone size={24} className="text-gray-600" />
                    <span className="font-medium">PIX</span>
                  </label>

                  <label className="flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === "cash"}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value as PaymentMethod)
                      }
                      className="w-5 h-5"
                    />
                    <DollarSign size={24} className="text-gray-600" />
                    <span className="font-medium">Dinheiro na Entrega</span>
                  </label>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button
                    type="button"
                    onClick={() => setStep("address")}
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    Voltar
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="flex-1"
                    disabled={loading}
                  >
                    {loading ? "Processando..." : "Finalizar Pedido"}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Resumo do Pedido
            </h3>

            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="font-medium">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatCurrency(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Entrega</span>
                <span className="text-green-600 font-medium">Grátis</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t">
                <span>Total</span>
                <span className="text-primary-600">
                  {formatCurrency(getTotalPrice())}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
