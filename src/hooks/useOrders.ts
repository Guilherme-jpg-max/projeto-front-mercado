import { useState, useEffect } from "react";
import { orderService, type Order } from "../services/apiService";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderService.getMyOrders();
      setOrders(response.orders);
    } catch (err) {
      console.error("Erro ao carregar pedidos:", err);
      setError("Erro ao carregar pedidos");
    } finally {
      setLoading(false);
    }
  };

  return { orders, loading, error, refetch: loadOrders };
};

export const useOrder = (id: number) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadOrder();
    }
  }, [id]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderService.getById(id);
      setOrder(data);
    } catch (err) {
      console.error("Erro ao carregar pedido:", err);
      setError("Pedido não encontrado");
    } finally {
      setLoading(false);
    }
  };

  return { order, loading, error, refetch: loadOrder };
};
