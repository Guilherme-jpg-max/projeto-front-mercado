import type { Product } from "../types/product";
import type { Order, CheckoutData } from "../types/order";
import { mockProducts, mockCategories } from "./mockData";

const delay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// In-memory storage
let currentUser: any = null;
let userToken: string | null = null;

// ============================================
// PRODUTOS
// ============================================
export const productService = {
  getAll: async (): Promise<Product[]> => {
    await delay();
    return mockProducts.filter((p) => p.isActive);
  },

  getById: async (id: number): Promise<Product | undefined> => {
    await delay(300);
    return mockProducts.find((p) => p.id === id && p.isActive);
  },

  getByCategory: async (category: string): Promise<Product[]> => {
    await delay();
    return mockProducts.filter((p) => p.category === category && p.isActive);
  },

  search: async (query: string): Promise<Product[]> => {
    await delay(400);
    return mockProducts.filter(
      (p) => p.isActive && p.name.toLowerCase().includes(query.toLowerCase())
    );
  },

  getFeatured: async (): Promise<Product[]> => {
    await delay();
    return mockProducts.filter((p) => p.isActive && p.discount).slice(0, 4);
  },
};


export const categoryService = {
  getAll: async () => {
    await delay(300);
    return mockCategories;
  },
};


let orderIdCounter = 1000;

export const orderService = {
  create: async (
    data: CheckoutData,
    items: any[],
    total: number
  ): Promise<Order> => {
    await delay(1000);

    const newOrder: Order = {
      id: orderIdCounter++,
      items,
      total,
      paymentMethod: data.paymentMethod,
      deliveryAddress: data.deliveryAddress,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    return newOrder;
  },

  getMyOrders: async (): Promise<Order[]> => {
    await delay();
    return [];
  },
};


export const authService = {
  login: async (email: string, password: string) => {
    await delay(800);

    // Mock - aceita qualquer credencial
    const mockUser = {
      id: 1,
      name: "Cliente Teste",
      email: email,
    };

    // Armazena em memória
    currentUser = mockUser;
    userToken = "mock_user_token_123";

    return mockUser;
  },

  register: async (data: any) => {
    await delay(1000);

    const mockUser = {
      id: Date.now(),
      name: data.name,
      email: data.email,
    };

    // Armazena em memória
    currentUser = mockUser;
    userToken = "mock_user_token_123";

    return mockUser;
  },

  logout: () => {
    currentUser = null;
    userToken = null;
  },

  getCurrentUser: () => {
    return currentUser;
  },

  isAuthenticated: () => {
    return !!userToken;
  },
};
