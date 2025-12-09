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
