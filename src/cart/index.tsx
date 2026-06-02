import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { objects, type WorkItem, type Variant } from "@/data/objects";

const STORAGE_KEY = "evegomy-cart-v2";

export type CartLine = {
  productId: string;
  variantId?: string;
  quantity: number;
};

export type EnrichedLine = CartLine & {
  item: WorkItem;
  variant: Variant | null;
  lineCents: number;
};

type Ctx = {
  lines: CartLine[];
  enriched: EnrichedLine[];
  subtotalCents: number;
  itemCount: number;
  isOpen: boolean;
  addItem: (productId: string, variantId?: string, quantity?: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<Ctx | null>(null);

const sameLine = (a: CartLine, productId: string, variantId?: string) =>
  a.productId === productId && (a.variantId ?? null) === (variantId ?? null);

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

  const addItem = useCallback((productId: string, variantId?: string, quantity = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => sameLine(l, productId, variantId));
      if (found) {
        return prev.map((l) =>
          sameLine(l, productId, variantId)
            ? { ...l, quantity: Math.min(5, l.quantity + quantity) }
            : l
        );
      }
      return [...prev, { productId, variantId, quantity }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string, variantId?: string) => {
    setLines((prev) => prev.filter((l) => !sameLine(l, productId, variantId)));
  }, []);

  const updateQuantity = useCallback(
    (productId: string, variantId: string | undefined, quantity: number) => {
      setLines((prev) => {
        if (quantity <= 0) return prev.filter((l) => !sameLine(l, productId, variantId));
        return prev.map((l) =>
          sameLine(l, productId, variantId)
            ? { ...l, quantity: Math.min(5, quantity) }
            : l
        );
      });
    },
    []
  );

  const clear = useCallback(() => setLines([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<Ctx>(() => {
    const enriched: EnrichedLine[] = lines
      .map((line) => {
        const item = objects.find((o) => o.id === line.productId);
        if (!item || !item.priceCents) return null;
        const variant =
          line.variantId && item.variants
            ? item.variants.find((v) => v.id === line.variantId) ?? null
            : null;
        return {
          ...line,
          item,
          variant,
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
