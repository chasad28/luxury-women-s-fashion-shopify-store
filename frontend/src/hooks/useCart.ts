import { useState, useCallback, useEffect } from 'react';
import { Product } from '../backend';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

const CART_STORAGE_KEY = 'maison_elite_cart';

function loadCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return [];
}

function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

let cartListeners: Array<() => void> = [];
let cartState: CartItem[] = loadCart();

function notifyListeners() {
  cartListeners.forEach(fn => fn());
}

export function useCart() {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const listener = () => forceUpdate(n => n + 1);
    cartListeners.push(listener);
    return () => {
      cartListeners = cartListeners.filter(l => l !== listener);
    };
  }, []);

  const addItem = useCallback((product: Product, quantity = 1, selectedColor?: string) => {
    const existing = cartState.find(
      item => item.product.id === product.id && item.selectedColor === selectedColor
    );
    if (existing) {
      cartState = cartState.map(item =>
        item.product.id === product.id && item.selectedColor === selectedColor
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      cartState = [...cartState, { product, quantity, selectedColor }];
    }
    saveCart(cartState);
    notifyListeners();
  }, []);

  const removeItem = useCallback((productId: bigint, selectedColor?: string) => {
    cartState = cartState.filter(
      item => !(item.product.id === productId && item.selectedColor === selectedColor)
    );
    saveCart(cartState);
    notifyListeners();
  }, []);

  const updateQuantity = useCallback((productId: bigint, quantity: number, selectedColor?: string) => {
    if (quantity <= 0) {
      removeItem(productId, selectedColor);
      return;
    }
    cartState = cartState.map(item =>
      item.product.id === productId && item.selectedColor === selectedColor
        ? { ...item, quantity }
        : item
    );
    saveCart(cartState);
    notifyListeners();
  }, [removeItem]);

  const clearCart = useCallback(() => {
    cartState = [];
    saveCart(cartState);
    notifyListeners();
  }, []);

  const subtotal = cartState.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const itemCount = cartState.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items: cartState,
    itemCount,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
}
