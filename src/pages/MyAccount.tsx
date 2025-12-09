import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { orderService } from "../services/mockApi";
import type { Order } from "../types/order";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { formatCurrency, formatDate } from "../utils/formatters";
import { User, Package, MapPin, CreditCard, LogOut } from "lucide-react";

const MyAccount: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    loadOrders();
  }, [isAuthenticated]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await orderService.getMyOrders();
      setOrders(data);
    } catch (error) {
      console.error("Erro ao carregar pedidos", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };

    const labels = {
      pending: "Pendente",
      processing: "Em Processamento",
      delivered: "Entregue",
      cancelled: "Cancelado",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          styles[status as keyof typeof styles] || styles.pending
        }`}
      >
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  const getPaymentMethodLabel = (method: string) => {
    const labels = {
      credit_card: "Cartão de Crédito",
      debit_card: "Cartão de Débito",
      pix: "PIX",
      cash: "Dinheiro",
    };
    return labels[method as keyof typeof labels] || method;
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Minha Conta</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4 mb-6 pb-6 border-b">
              <div className="bg-primary-100 p-4 rounded-full">
                <User size={32} className="text-primary-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {user?.name}
                </h2>
                <p className="text-gray-600 text-sm">{user?.email}</p>
              </div>
            </div>

            <nav className="space-y-2">
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-primary-50 text-primary-600 font-medium">
                <Package size={20} />
                <span>Meus Pedidos</span>
              </button>
              <button
                onClick={logout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 transition"
              >
                <LogOut size={20} />
                <span>Sair</span>
              </button>
            </nav>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Meus Pedidos
            </h2>

            {loading ? (
              <LoadingSpinner />
            ) : orders.length === 0 ? (
              <div className="text-center py-12">
                <Package size={64} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600 text-lg mb-4">
                  Você ainda não fez nenhum pedido
                </p>
                <button
                  onClick={() => navigate("/produtos")}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Começar a comprar
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border rounded-lg p-6 hover:shadow-md transition"
                  >
                    <div className="flex flex-wrap items-center justify-between mb-4 pb-4 border-b">
                      <div>
                        <h3 className="font-bold text-gray-800">
                          Pedido #{order.id}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>

                    <div className="space-y-2 mb-4">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-gray-600">
                            {item.quantity}x {item.name}
                          </span>
                          <span className="font-medium">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                      <div className="flex items-start space-x-2 text-sm">
                        <MapPin size={18} className="text-gray-400 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-700">Entrega:</p>
                          <p className="text-gray-600">
                            {order.deliveryAddress.street},{" "}
                            {order.deliveryAddress.number}
                            <br />
                            {order.deliveryAddress.neighborhood},{" "}
                            {order.deliveryAddress.city} -{" "}
                            {order.deliveryAddress.state}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2 text-sm">
                        <CreditCard
                          size={18}
                          className="text-gray-400 mt-0.5"
                        />
                        <div>
                          <p className="font-medium text-gray-700">
                            Pagamento:
                          </p>
                          <p className="text-gray-600">
                            {getPaymentMethodLabel(order.paymentMethod)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 mt-4 border-t">
                      <span className="font-bold text-gray-700">Total:</span>
                      <span className="text-2xl font-bold text-primary-600">
                        {formatCurrency(order.total)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
