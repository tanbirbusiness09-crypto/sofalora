import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  Direction,
  Product,
  CartItem,
  Order,
  CreateOrderInput,
  DeliveryMethodId,
  PromoCode
} from '../types';
import { translations } from '../data/translations';
import { DEMO_ORDERS } from '../data/demoOrders';
import { PROMO_CODES, VALID_DELIVERY_METHODS } from '../data/promoCodes';

export interface ToastInfo {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

export interface ShopContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: keyof typeof translations['en']) => string;
  formatPrice: (amount: number) => string;

  // Cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (
    product: Product,
    selectedColor?: Product['colors'][0],
    selectedSize?: Product['sizes'][0],
    quantity?: number,
    customDimensions?: CartItem['customDimensions']
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  updateCartQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;

  // Promo Code
  appliedPromo: PromoCode | null;
  promoDiscount: number;
  applyPromoCode: (code: string) => { success: boolean; message: string; type: 'success' | 'warning' | 'error' };
  removePromoCode: () => void;

  // Delivery & VAT
  selectedDeliveryMethod: DeliveryMethodId;
  setSelectedDeliveryMethod: (method: DeliveryMethodId) => void;
  shippingFee: number;
  vatRate: number;
  vatAmount: number;
  grandTotal: number;

  // Wishlist
  wishlist: string[]; // product ids
  wishlistCount: number;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  openWishlist: () => void;
  closeWishlist: () => void;
  toggleWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Recently Viewed
  recentlyViewed: string[];
  addRecentlyViewed: (productId: string) => void;

  // Orders
  orders: Order[];
  createOrder: (orderInput: CreateOrderInput) => Order;
  getOrderById: (orderId: string) => Order | undefined;

  // Quick View
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Consultation Modal
  isConsultationOpen: boolean;
  openConsultation: () => void;
  closeConsultation: () => void;

  // Toasts
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;

  // Active Filter / Search scroll helper
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const STORAGE_KEY_LANG = 'mohammad_curtains_lang';
const STORAGE_KEY_CART = 'mohammad_curtains_cart';
const STORAGE_KEY_WISHLIST = 'mohammad_curtains_wishlist';
const STORAGE_KEY_ORDERS = 'mohammad_curtains_orders';
const STORAGE_KEY_RECENT = 'mohammad_curtains_recent';
const STORAGE_KEY_PROMO = 'mohammad_curtains_promo';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize language from localStorage or default to 'en'
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LANG);
      if (saved === 'ar' || saved === 'en') return saved;
    } catch {
      // fallback
    }
    return 'en';
  });

  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  // Synchronize document dir and lang attributes
  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
    try {
      localStorage.setItem(STORAGE_KEY_LANG, language);
    } catch {
      // ignore
    }
  }, [language, direction]);

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  // Translation helper
  const t = (key: keyof typeof translations['en']): string => {
    return translations[language][key] || translations['en'][key] || String(key);
  };

  // Price formatting
  const formatPrice = (amount: number): string => {
    if (language === 'ar') {
      return `${amount} ر.س`;
    }
    return `SAR ${amount}`;
  };

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CART);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WISHLIST);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['prod-1', 'prod-3']; // initial demo favorites
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_WISHLIST, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Quick View State
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Consultation Modal
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Cart Handlers
  const addToCart = (
    product: Product,
    selectedColor = product.colors?.[0],
    selectedSize = product.sizes?.[0],
    quantity = 1,
    customDimensions?: CartItem['customDimensions']
  ) => {
    const isCustom = !!customDimensions;
    const unitPrice = isCustom
      ? customDimensions.estimatedTotal
      : product.price + (selectedSize?.priceModifier || 0);

    const instanceId = isCustom
      ? `${product.id}-custom-${customDimensions.width}x${customDimensions.height}-${selectedColor?.id || 'default'}`
      : `${product.id}-${selectedColor?.id || 'default'}-${selectedSize?.id || 'default'}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === instanceId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: instanceId,
            productId: product.id,
            product,
            selectedColor,
            selectedSize: isCustom
              ? {
                  id: 'custom',
                  label: { en: 'Custom Tailored Size', ar: 'تفصيل خاص بالمقاس' },
                  dimensions: `${customDimensions.width}m × ${customDimensions.height}m`,
                  priceModifier: 0
                }
              : selectedSize,
            customDimensions,
            quantity,
            unitPrice
          }
        ];
      }
    });

    const productName = language === 'ar' ? product.name.ar : product.name.en;
    const msg =
      language === 'ar'
        ? `تمت إضافة "${productName}" إلى سلة التسوق.`
        : `"${productName}" added to your shopping bag.`;
    showToast(msg, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  // Promo Code State
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROMO);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });

  useEffect(() => {
    try {
      if (appliedPromo) {
        localStorage.setItem(STORAGE_KEY_PROMO, JSON.stringify(appliedPromo));
      } else {
        localStorage.removeItem(STORAGE_KEY_PROMO);
      }
    } catch {
      // ignore
    }
  }, [appliedPromo]);

  // Delivery Method Selection
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<DeliveryMethodId>('standard');

  // Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const promoDiscount = appliedPromo
    ? Math.round((cartSubtotal * appliedPromo.discountPercent) / 100)
    : 0;

  const subtotalAfterDiscount = Math.max(0, cartSubtotal - promoDiscount);

  // Saudi shipping calculation
  const shippingFee = (() => {
    if (cart.length === 0) return 0;
    if (selectedDeliveryMethod === 'pickup') return 0;
    if (selectedDeliveryMethod === 'express') return 45;
    // Standard: Free if subtotal >= 500 SAR, otherwise 25 SAR
    return subtotalAfterDiscount >= 500 ? 0 : 25;
  })();

  const vatRate = 0.15;
  const vatAmount = Math.round((subtotalAfterDiscount + shippingFee) * vatRate * 100) / 100;
  const grandTotal = Math.round((subtotalAfterDiscount + shippingFee + vatAmount) * 100) / 100;

  const applyPromoCode = (inputCode: string) => {
    const clean = inputCode.trim().toUpperCase();
    if (!clean) {
      return {
        success: false,
        message: language === 'ar' ? 'يرجى إدخال رمز الكوبون' : 'Please enter a promo code.',
        type: 'warning' as const
      };
    }

    const found = PROMO_CODES.find((p) => p.code.toUpperCase() === clean);
    if (!found) {
      return {
        success: false,
        message: language === 'ar' ? 'رمز القسيمة غير صالح' : 'Invalid promotional code.',
        type: 'error' as const
      };
    }

    if (found.isExpired) {
      return {
        success: false,
        message: language === 'ar' ? 'عذراً، هذا الكوبون منتهي الصلاحية' : 'This promo code has expired.',
        type: 'warning' as const
      };
    }

    if (found.minOrder && cartSubtotal < found.minOrder) {
      return {
        success: false,
        message:
          language === 'ar'
            ? `يتطلب هذا الكوبون طلباً بقيمة ${found.minOrder} ر.س كحد أدنى`
            : `This coupon requires a minimum order of SAR ${found.minOrder}.`,
        type: 'warning' as const
      };
    }

    setAppliedPromo(found);
    return {
      success: true,
      message:
        language === 'ar'
          ? `تم تطبيق الكوبون! خصم ${found.discountPercent}٪ (${found.description.ar})`
          : `Coupon applied! ${found.discountPercent}% discount (${found.description.en})`,
      type: 'success' as const
    };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast(language === 'ar' ? 'تمت إزالة الكوبون' : 'Promo code removed', 'info');
  };

  // Wishlist Handlers
  const toggleWishlist = (productId: string) => {
    const exists = wishlist.includes(productId);
    if (exists) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      showToast(language === 'ar' ? 'تمت الإزالة من قائمة المفضلة' : 'Removed from wishlist', 'info');
    } else {
      setWishlist((prev) => [...prev, productId]);
      showToast(language === 'ar' ? 'تم الحفظ في قائمة المفضلة' : 'Saved to your wishlist', 'success');
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);
  const wishlistCount = wishlist.length;

  // Recently Viewed State
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RECENT);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['curtain-1', 'curtain-2', 'curtain-3'];
  });

  const addRecentlyViewed = (productId: string) => {
    setRecentlyViewed((prev) => {
      const next = [productId, ...prev.filter((id) => id !== productId)].slice(0, 6);
      try {
        localStorage.setItem(STORAGE_KEY_RECENT, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return DEMO_ORDERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const createOrder = (orderInput: CreateOrderInput): Order => {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newId = `MC-${dateStr}-${randomSuffix}`;
    const estDate = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString();

    const orderDeliveryMethod = typeof orderInput.deliveryMethod === 'object'
      ? orderInput.deliveryMethod
      : (VALID_DELIVERY_METHODS.find(
          (m) => m.id === (orderInput.deliveryMethod || selectedDeliveryMethod)
        ) || VALID_DELIVERY_METHODS[0]);

    const orderSubtotal = orderInput.subtotal ?? cartSubtotal;
    const orderDiscount = orderInput.discount ?? orderInput.promoDiscount ?? promoDiscount;
    const orderShippingFee = orderInput.shippingFee ?? shippingFee;
    const orderVat = orderInput.vatAmount ?? vatAmount;
    const orderTotal = orderInput.total ?? orderInput.grandTotal ?? grandTotal;

    const newOrder: Order = {
      id: newId,
      createdAt: now.toISOString(),
      estimatedDeliveryDate: estDate,
      status: 'order_placed',
      customer: orderInput.customer,
      deliveryAddress: orderInput.deliveryAddress,
      deliveryMethod: orderDeliveryMethod,
      paymentMethod: orderInput.paymentMethod,
      items: orderInput.items || [...cart],
      subtotal: orderSubtotal,
      discount: orderDiscount,
      promoDiscount: orderDiscount,
      promoCode: orderInput.promoCode || appliedPromo?.code,
      appliedPromo: orderInput.appliedPromo || appliedPromo || undefined,
      shippingFee: orderShippingFee,
      vatAmount: orderVat,
      total: orderTotal,
      grandTotal: orderTotal,
      notes: orderInput.notes
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find((o) => o.id.toLowerCase() === orderId.toLowerCase());
  };

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const openConsultation = () => setIsConsultationOpen(true);
  const closeConsultation = () => setIsConsultationOpen(false);

  return (
    <ShopContext.Provider
      value={{
        language,
        direction,
        setLanguage,
        toggleLanguage,
        t,
        formatPrice,
        cart,
        cartCount,
        cartSubtotal,
        cartTotal: grandTotal,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        addToCart,
        removeFromCart,
        updateQuantity,
        updateCartQuantity: updateQuantity,
        clearCart,
        appliedPromo,
        promoDiscount,
        applyPromoCode,
        removePromoCode,
        selectedDeliveryMethod,
        setSelectedDeliveryMethod,
        shippingFee,
        vatRate,
        vatAmount,
        grandTotal,
        wishlist,
        wishlistCount,
        isWishlistOpen,
        setIsWishlistOpen,
        openWishlist: () => setIsWishlistOpen(true),
        closeWishlist: () => setIsWishlistOpen(false),
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
        recentlyViewed,
        addRecentlyViewed,
        orders,
        createOrder,
        getOrderById,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        isConsultationOpen,
        openConsultation,
        closeConsultation,
        toasts,
        showToast,
        removeToast,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const LanguageProvider = ShopProvider;

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
