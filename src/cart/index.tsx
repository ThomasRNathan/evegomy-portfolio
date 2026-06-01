import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { objects, type WorkItem } from "@/data/objects";

const STORAGE_KEY = "evegomy-cart-v1";

export type CartLine = {
  productId: string;
  quantity: number;
};

export type EnrichedLine = CartLine & {
  item: WorkItem;
  lineCents: number;
};

type Ctx = {
  lines: CartLine[];
  enriched: EnrichedLine[];
  subtotalCents: number;
  itemCount: number;
  isOpen: boolean;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<Ctx | null>(null);

function loadInitial(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l): l is CartLine =>
        l && typeof l.productId === "string" && typeof l.quantity === "number"
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(loadInitial);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore quota issues */
    }
  }, [lines]);

  const addItem = useCallback((productId: string, quantity = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => l.productId === productId);
      if (found) {
        return prev.map((l) =>
          l.productId === productId
            ? { ...l, quantity: Math.min(5, l.quantity + quantity) }
            : l
        );
      }
      return [...prev, { productId, quantity }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setLines((prev) => {
      if (quantity <= 0) return prev.filter((l) => l.productId !== productId);
      return prev.map((l) =>
        l.productId === productId
          ? { ...l, quantity: Math.min(5, quantity) }
          : l
      );
    });
  }, []);

  const clear = useCallback(() => setLines([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<Ctx>(() => {
    const enriched: EnrichedLine[] = lines
      .map((line) => {
        const item = objects.find((o) => o.id === line.productId);
        if (!item || !item.priceCents) return null;
        return {
          ...line,
          item,
          lineCents: item.priceCents * line.quantity,
        };
      })
      .filter((x): x is EnrichedLine => x !== null);

    const subtotalCents = enriched.reduce((sum, l) => sum + l.lineCents, 0);
    const itemCount = enriched.reduce((sum, l) => sum + l.quantity, 0);

    return {
      lines,
      enriched,
      subtotalCents,
      itemCount,
      isOpen,
      addItem,
      removeItem,
      updateQuantity,
      clear,
      openCart,
      closeCart,
    };
  }, [lines, isOpen, addItem, removeItem, updateQuantity, clear, openCart, closeCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): Ctx {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
