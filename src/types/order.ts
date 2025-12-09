import type { CartItem } from "./cart";
import type { Address } from "./user";

export type PaymentMethod = "credit_card" | "debit_card" | "pix" | "cash";

export interface Order {
  id: number;
  items: CartItem[];
  total: number;
  paymentMethod: PaymentMethod;
  deliveryAddress: Address;
  status: string;
  createdAt: string;
}

export interface CheckoutData {
  paymentMethod: PaymentMethod;
  deliveryAddress: Address;
}
