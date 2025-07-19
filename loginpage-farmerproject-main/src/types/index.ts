export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'farmer' | 'buyer';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  image: string;
  farmerId: string;
  isActive: boolean;
}

export interface Warehouse {
  id: string;
  name: string;
  description: string;
  location: string;
  capacity: string;
  pricePerMonth: number;
  image: string;
  isAvailable: boolean;
}

export interface Seed {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  description: string;
}

export type TabType = 'overview' | 'sell' | 'seeds' | 'warehouse' | 'my-products' | 'my-warehouses';