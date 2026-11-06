// ============ USER ============
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
}

// ============ RESTAURANT ============
export interface Restaurant {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  image: string;
  coverImage: string;
  description: string;
  isOpen: boolean;
  tags: string[];
  discount?: number;
}

// ============ PRODUCT ============
export interface Product {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isAvailable: boolean;
  isBestSeller?: boolean;
}

// ============ CART ============
export interface CartItem {
  product: Product;
  quantity: number;
  restaurantId: string;
  restaurantName: string;
  note?: string;
}

export interface Cart {
  items: CartItem[];
  restaurantId: string | null;
  restaurantName: string | null;
}

// ============ ORDER ============
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'on_the_way'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  restaurantName: string;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  deliveryAddress: string;
  courierName?: string;
  courierPhone?: string;
  courierVehicle?: string;
  estimatedArrival?: string;
  createdAt: string;
  note?: string;
}

// ============ AUTH ============
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ============ NOTIFICATION ============
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'promo' | 'info';
  isRead: boolean;
  createdAt: string;
}

// ============ SERVICE ============
export interface WUSService {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  href: string;
}
