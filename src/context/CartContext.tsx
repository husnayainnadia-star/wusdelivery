'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { Cart, CartItem, Product } from '@/types';

interface CartContextType {
  cart: Cart;
  addItem: (product: Product, restaurantId: string, restaurantName: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const EMPTY_CART: Cart = { items: [], restaurantId: null, restaurantName: null };

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; restaurantId: string; restaurantName: string } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'UPDATE_QTY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: Cart };

function cartReducer(state: Cart, action: CartAction): Cart {
  switch (action.type) {
    case 'LOAD_CART':
      return action.payload;

    case 'ADD_ITEM': {
      const { product, restaurantId, restaurantName } = action.payload;
      // Different restaurant → clear cart first
      if (state.restaurantId && state.restaurantId !== restaurantId) {
        return {
          restaurantId,
          restaurantName,
          items: [{ product, quantity: 1, restaurantId, restaurantName }],
        };
      }
      const existing = state.items.find(i => i.product.id === product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        restaurantId,
        restaurantName,
        items: [...state.items, { product, quantity: 1, restaurantId, restaurantName }],
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(i => i.product.id !== action.payload.productId),
        restaurantId: state.items.length <= 1 ? null : state.restaurantId,
        restaurantName: state.items.length <= 1 ? null : state.restaurantName,
      };

    case 'UPDATE_QTY': {
      if (action.payload.quantity <= 0) {
        const items = state.items.filter(i => i.product.id !== action.payload.productId);
        return { ...state, items, restaurantId: items.length === 0 ? null : state.restaurantId, restaurantName: items.length === 0 ? null : state.restaurantName };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.product.id === action.payload.productId ? { ...i, quantity: action.payload.quantity } : i
        ),
      };
    }

    case 'CLEAR_CART':
      return EMPTY_CART;

    default:
      return state;
  }
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, EMPTY_CART);

  // Load from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('wus_cart');
      if (saved) dispatch({ type: 'LOAD_CART', payload: JSON.parse(saved) });
    } catch {}
  }, []);

  // Save to sessionStorage on change
  useEffect(() => {
    try {
      sessionStorage.setItem('wus_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const addItem = (product: Product, restaurantId: string, restaurantName: string) =>
    dispatch({ type: 'ADD_ITEM', payload: { product, restaurantId, restaurantName } });

  const removeItem = (productId: string) =>
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });

  const updateQuantity = (productId: string, quantity: number) =>
    dispatch({ type: 'UPDATE_QTY', payload: { productId, quantity } });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const totalItems = cart.items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = cart.items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
