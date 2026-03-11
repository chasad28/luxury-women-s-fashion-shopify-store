import { useState, useCallback, useEffect } from 'react';
import { Product } from '../backend';

const WISHLIST_STORAGE_KEY = 'maison_elite_wishlist';

function loadWishlist(): Product[] {
  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return [];
}

function saveWishlist(items: Product[]) {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

let wishlistListeners: Array<() => void> = [];
let wishlistState: Product[] = loadWishlist();

function notifyListeners() {
  wishlistListeners.forEach(fn => fn());
}

export function useWishlist() {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const listener = () => forceUpdate(n => n + 1);
    wishlistListeners.push(listener);
    return () => {
      wishlistListeners = wishlistListeners.filter(l => l !== listener);
    };
  }, []);

  const addToWishlist = useCallback((product: Product) => {
    if (!wishlistState.find(p => p.id === product.id)) {
      wishlistState = [...wishlistState, product];
      saveWishlist(wishlistState);
      notifyListeners();
    }
  }, []);

  const removeFromWishlist = useCallback((productId: bigint) => {
    wishlistState = wishlistState.filter(p => p.id !== productId);
    saveWishlist(wishlistState);
    notifyListeners();
  }, []);

  const toggleWishlist = useCallback((product: Product) => {
    if (wishlistState.find(p => p.id === product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }, [addToWishlist, removeFromWishlist]);

  const isInWishlist = useCallback((productId: bigint) => {
    return wishlistState.some(p => p.id === productId);
  }, []);

  return {
    items: wishlistState,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
  };
}
