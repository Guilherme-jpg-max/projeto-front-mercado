import api from "./api";

// TIPOS
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  category: string;
  imageUrl: string;
  stock: number;
  isActive: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface DeliveryAddress {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Order {
  id: number;
  items: Array<{
    id: number;
    productName: string;
    price: number;
    quantity: number;
    subtotal: number;
    imageUrl?: string;
  }>;
  total: number;
  paymentMethod: string;
  deliveryAddress: DeliveryAddress;
  status: string;
  createdAt: string;
}

export interface CreateOrderData {
  items: CartItem[];
  total: number;
  paymentMethod: string;
  deliveryAddress: DeliveryAddress;
}

// AUTENTICAÇÃO
export const authService = {
  register: async (data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }): Promise<LoginResponse> => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  getMe: async (): Promise<User> => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};

// PRODUTOS
export const productService = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
  }): Promise<{
    products: Product[];
    total: number;
    page: number;
    totalPages: number;
  }> => {
    const response = await api.get("/products", { params });
    return response.data;
  },

  search: async (
    query: string
  ): Promise<{ products: Product[]; total: number }> => {
    const response = await api.get("/products/search", {
      params: { q: query },
    });
    return response.data;
  },

  getById: async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  getByCategory: async (
    category: string
  ): Promise<{ products: Product[]; total: number }> => {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  },

  getFeatured: async (): Promise<{ products: Product[] }> => {
    const response = await api.get("/products/featured");
    return response.data;
  },
};

// CATEGORIAS
export const categoryService = {
  getAll: async (): Promise<{ categories: Category[] }> => {
    const response = await api.get("/categories");
    return response.data;
  },
};

// ============================================
// PEDIDOS
// ============================================
export const orderService = {
  create: async (data: CreateOrderData): Promise<{ order: Order }> => {
    const response = await api.post("/orders", data);
    return response.data;
  },

  getMyOrders: async (params?: {
    page?: number;
    limit?: number;
  }): Promise<{
    orders: Order[];
    total: number;
    page: number;
    totalPages: number;
  }> => {
    const response = await api.get("/orders/my-orders", { params });
    return response.data;
  },

  getById: async (id: number): Promise<Order> => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
};

// CONTATO
export const contactService = {
  sendMessage: async (data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }): Promise<{ message: string }> => {
    const response = await api.post("/contact", data);
    return response.data;
  },
};

// EXPORTAR TUDO
export const apiService = {
  auth: authService,
  products: productService,
  categories: categoryService,
  orders: orderService,
  contact: contactService,
};

export default apiService;
