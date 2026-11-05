'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { CartItem, PerfumeProduct } from '@/types/perfume';

interface AtelierStoreContextValue {
  cart: CartItem[];
  favorites: string[];
  isHydrated: boolean;
  addToCart: (
    product: PerfumeProduct,
    volumeMl: number,
    quantity?: number
  ) => void;
  removeFromCart: (productId: string, volumeMl: number) => void;
  updateQuantity: (
    productId: string,
    volumeMl: number,
    quantity: number
  ) => void;
  changeItemVolume: (
    product: PerfumeProduct,
    oldVolumeMl: number,
    newVolumeMl: number
  ) => void;
  clearCart: () => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  totalItemsCount: number;
  totalAmountKzt: number;
}

const CART_STORAGE_KEY = 'inhype_atelier_cart_v1';
const FAVORITES_STORAGE_KEY = 'inhype_atelier_favorites_v1';

const AtelierStoreContext = createContext<AtelierStoreContextValue | undefined>(
  undefined
);

export function AtelierStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      }
      const savedFavorites = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (savedFavorites) {
        const parsedFavs = JSON.parse(savedFavorites);
        if (Array.isArray(parsedFavs)) {
          setFavorites(parsedFavs);
        }
      }
    } catch {
      // Ignore storage access errors in restricted browsing modes
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore quota errors
    }
  }, [cart, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(favorites)
      );
    } catch {
      // Ignore quota errors
    }
  }, [favorites, isHydrated]);

  const addToCart = useCallback(
    (product: PerfumeProduct, volumeMl: number, quantity = 1) => {
      const selectedVol =
        product.volumes.find((v) => v.volumeMl === volumeMl) ||
        product.volumes[0];
      if (!selectedVol || !selectedVol.inStock) return;

      setCart((prev) => {
        const existingIndex = prev.findIndex(
          (item) =>
            item.productId === product.id &&
            item.volumeMl === selectedVol.volumeMl
        );

        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: Math.min(20, updated[existingIndex].quantity + quantity),
          };
          return updated;
        }

        return [
          ...prev,
          {
            productId: product.id,
            slug: product.slug,
            brand: product.brand,
            name: product.name,
            image: product.images[0] || '/images/hero-campaign.svg',
            volumeMl: selectedVol.volumeMl,
            priceKzt: selectedVol.priceKzt,
            quantity: Math.max(1, Math.min(20, quantity)),
          },
        ];
      });
    },
    []
  );

  const removeFromCart = useCallback((productId: string, volumeMl: number) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.volumeMl === volumeMl)
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, volumeMl: number, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId, volumeMl);
        return;
      }
      setCart((prev) =>
        prev.map((item) =>
          item.productId === productId && item.volumeMl === volumeMl
            ? { ...item, quantity: Math.min(20, quantity) }
            : item
        )
      );
    },
    [removeFromCart]
  );

  const changeItemVolume = useCallback(
    (product: PerfumeProduct, oldVolumeMl: number, newVolumeMl: number) => {
      if (oldVolumeMl === newVolumeMl) return;
      const targetVol = product.volumes.find(
        (v) => v.volumeMl === newVolumeMl && v.inStock
      );
      if (!targetVol) return;

      setCart((prev) => {
        const currentItem = prev.find(
          (i) => i.productId === product.id && i.volumeMl === oldVolumeMl
        );
        if (!currentItem) return prev;

        const filtered = prev.filter(
          (i) => !(i.productId === product.id && i.volumeMl === oldVolumeMl)
        );
        const existingTargetIdx = filtered.findIndex(
          (i) => i.productId === product.id && i.volumeMl === newVolumeMl
        );

        if (existingTargetIdx > -1) {
          filtered[existingTargetIdx] = {
            ...filtered[existingTargetIdx],
            quantity: Math.min(
              20,
              filtered[existingTargetIdx].quantity + currentItem.quantity
            ),
          };
          return [...filtered];
        }

        return [
          ...filtered,
          {
            ...currentItem,
            volumeMl: targetVol.volumeMl,
            priceKzt: targetVol.priceKzt,
          },
        ];
      });
    },
    []
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const isFavorite = useCallback(
    (productId: string) => favorites.includes(productId),
    [favorites]
  );

  const totalItemsCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const totalAmountKzt = useMemo(
    () => cart.reduce((sum, item) => sum + item.priceKzt * item.quantity, 0),
    [cart]
  );

  const value = useMemo(
    () => ({
      cart,
      favorites,
      isHydrated,
      addToCart,
      removeFromCart,
      updateQuantity,
      changeItemVolume,
      clearCart,
      toggleFavorite,
      isFavorite,
      totalItemsCount,
      totalAmountKzt,
    }),
    [
      cart,
      favorites,
      isHydrated,
      addToCart,
      removeFromCart,
      updateQuantity,
      changeItemVolume,
      clearCart,
      toggleFavorite,
      isFavorite,
      totalItemsCount,
      totalAmountKzt,
    ]
  );

  return (
    <AtelierStoreContext.Provider value={value}>
      {children}
    </AtelierStoreContext.Provider>
  );
}

export function useAtelierStore(): AtelierStoreContextValue {
  const ctx = useContext(AtelierStoreContext);
  if (!ctx) {
    throw new Error(
      'useAtelierStore must be used within an AtelierStoreProvider'
    );
  }
  return ctx;
}
