import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  Language,
  Direction,
  Product,
  CartItem,
  Order,
  CreateOrderInput,
  DeliveryMethodId,
  DeliveryMethodOption,
  PromoCode
} from '../types';
import { translations } from '../data/translations';
import {
  CommerceApiError,
  fetchCheckoutSettings,
  isCommerceApiConfigured,
  placeOrder,
  trackOrder,
  validateCoupon,
  type CheckoutSettings
} from '../lib/api';
import { apiOrderToOrder, deliveryClaimText, includedVat, shippingFor, standardDelivery, SAUDI_VAT_RATE } from '../lib/orders';
import { getCustomerToken } from '../lib/customerAuth';
import type { ApiOrder } from '../lib/api';

type PromoResult = { success: boolean; message: string; type: 'success' | 'warning' | 'error' };

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
  /** Validates against POST /storefront/coupon/validate. */
  applyPromoCode: (code: string) => Promise<PromoResult>;
  removePromoCode: () => void;

  // Checkout settings (GET /storefront/checkout-settings)
  checkoutSettings: CheckoutSettings | null;
  checkoutSettingsStatus: 'loading' | 'ready' | 'error';
  /** Payment method ids the API accepts (e.g. ['cod']). */
  paymentMethods: string[];
  deliveryMethods: DeliveryMethodOption[];
  /** 0 = no free-shipping threshold. */
  freeShippingThreshold: number;

  // Delivery & VAT (prices are VAT-inclusive; vatAmount is the included share)
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
  /** Places the order via POST /storefront/checkout (guest, Idempotency-Key). */
  createOrder: (orderInput: CreateOrderInput) => Promise<Order>;
  getOrderById: (orderId: string) => Order | undefined;
  /** POST /storefront/orders/track; saves/updates the order in this browser. Null if not found. */
  trackOrderByNumber: (orderNumber: string, phone: string) => Promise<Order | null>;
  /** Refresh every saved order's status from the API. */
  refreshOrders: () => Promise<void>;
  /** Save orders loaded from the signed-in customer's account (GET /customer/orders). */
  mergeAccountOrders: (apiOrders: ApiOrder[]) => void;
  /** Remove account orders from this browser (on sign-out). */
  forgetAccountOrders: () => void;
  /** Honest delivery line from checkout settings (null when delivery is not free). */
  deliveryClaim: string | null;

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

const STORAGE_KEY_LANG = 'sofalora_lang';
const STORAGE_KEY_CART = 'sofalora_cart';
const STORAGE_KEY_WISHLIST = 'sofalora_wishlist';
const STORAGE_KEY_ORDERS = 'sofalora_orders';
const STORAGE_KEY_RECENT = 'sofalora_recent';
const STORAGE_KEY_PROMO = 'sofalora_promo';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize language from localStorage or default to 'en'
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LANG);
      if (saved === 'ar' || saved === 'en') return saved;
    } catch {
      // fallback
    }
    if (typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('ar')) {
      return 'ar';
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
      return `${amount} ⃁`;
    }
    return `⃁ ${amount}`;
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
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_WISHLIST, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

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

  // Checkout settings from the commerce API (shipping + accepted payment methods)
  const [checkoutSettings, setCheckoutSettings] = useState<CheckoutSettings | null>(null);
  const [checkoutSettingsStatus, setCheckoutSettingsStatus] = useState<'loading' | 'ready' | 'error'>(
    isCommerceApiConfigured ? 'loading' : 'error'
  );

  useEffect(() => {
    if (!isCommerceApiConfigured) return;
    const ctrl = new AbortController();
    fetchCheckoutSettings(ctrl.signal)
      .then((data) => {
        setCheckoutSettings(data);
        setCheckoutSettingsStatus('ready');
      })
      .catch((err) => {
        if ((err as Error)?.name === 'AbortError') return;
        console.warn('[checkout] settings unavailable:', err);
        setCheckoutSettingsStatus('error');
      });
    return () => ctrl.abort();
  }, []);

  const deliveryMethods: DeliveryMethodOption[] = [standardDelivery(checkoutSettings)];
  const paymentMethods = checkoutSettings?.payment_methods ?? [];
  const freeShippingThreshold = checkoutSettings?.free_shipping_threshold ?? 0;

  // Only standard delivery exists on the API; keep the setter for compatibility.
  const [selectedDeliveryMethod, setSelectedDeliveryMethodState] = useState<DeliveryMethodId>('standard');
  const setSelectedDeliveryMethod = (method: DeliveryMethodId) =>
    setSelectedDeliveryMethodState(deliveryMethods.some((m) => m.id === method) ? method : 'standard');

  // Calculations (mirror the admin CheckoutService; the server total is authoritative)
  const round2 = (n: number) => Math.round(n * 100) / 100;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = round2(cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0));

  const promoDiscount = (() => {
    if (!appliedPromo || cartSubtotal <= 0) return 0;
    if (appliedPromo.validatedSubtotal === cartSubtotal && appliedPromo.discountAmount != null) {
      return Math.min(cartSubtotal, appliedPromo.discountAmount);
    }
    const raw =
      appliedPromo.discountType === 'fixed'
        ? appliedPromo.discountValue ?? 0
        : (cartSubtotal * (appliedPromo.discountValue ?? appliedPromo.discountPercent)) / 100;
    return Math.max(0, Math.min(cartSubtotal, round2(raw)));
  })();

  const subtotalAfterDiscount = Math.max(0, round2(cartSubtotal - promoDiscount));
  const shippingFee = shippingFor(checkoutSettings, subtotalAfterDiscount, cart.length > 0);

  // Prices are VAT-inclusive (the API adds no tax); show the included 15% share.
  const vatRate = SAUDI_VAT_RATE;
  const grandTotal = round2(subtotalAfterDiscount + shippingFee);
  const vatAmount = includedVat(grandTotal);

  const promoFromValidation = (data: { code: string; discount_amount: number; discount_type: string; discount_value: number }, subtotal: number): PromoCode => {
    const type = data.discount_type === 'fixed' ? 'fixed' : 'percentage';
    const value = Number(data.discount_value) || 0;
    return {
      code: data.code,
      discountPercent: type === 'percentage' ? value : 0,
      discountType: type,
      discountValue: value,
      discountAmount: Number(data.discount_amount) || 0,
      validatedSubtotal: subtotal,
      description: type === 'percentage' ? { en: `${value}% off`, ar: `خصم ${value}٪` } : { en: `⃁ ${value} off`, ar: `خصم ${value} ⃁` }
    };
  };

  const applyPromoCode = async (inputCode: string): Promise<PromoResult> => {
    const clean = inputCode.trim().toUpperCase();
    if (!clean) {
      return {
        success: false,
        message: language === 'ar' ? 'يرجى إدخال رمز الكوبون' : 'Please enter a promo code.',
        type: 'warning'
      };
    }
    if (cartSubtotal <= 0) {
      return {
        success: false,
        message: language === 'ar' ? 'سلة التسوق فارغة' : 'Your bag is empty.',
        type: 'warning'
      };
    }
    try {
      const data = await validateCoupon(clean, cartSubtotal);
      const promo = promoFromValidation(data, cartSubtotal);
      setAppliedPromo(promo);
      return {
        success: true,
        message:
          language === 'ar'
            ? `تم تطبيق الكوبون ${promo.code}: ${promo.description.ar}`
            : `Coupon ${promo.code} applied: ${promo.description.en}`,
        type: 'success'
      };
    } catch (err) {
      const message =
        err instanceof CommerceApiError && err.status !== 0 && err.status < 500
          ? err.message
          : language === 'ar'
            ? 'تعذر التحقق من الكوبون الآن. حاول مرة أخرى.'
            : 'Could not check the coupon right now. Please try again.';
      return { success: false, message, type: 'error' };
    }
  };

  // Re-validate an applied coupon when the bag total changes (minimums, caps).
  useEffect(() => {
    if (!appliedPromo || cartSubtotal <= 0 || appliedPromo.validatedSubtotal === cartSubtotal) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      validateCoupon(appliedPromo.code, cartSubtotal)
        .then((data) => {
          if (!cancelled) setAppliedPromo(promoFromValidation(data, cartSubtotal));
        })
        .catch((err) => {
          if (cancelled) return;
          if (err instanceof CommerceApiError && err.status === 422) {
            setAppliedPromo(null);
            showToast(err.message, 'warning');
          }
        });
    }, 400);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartSubtotal, appliedPromo?.code, appliedPromo?.validatedSubtotal]);

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
    return [];
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

  // Orders placed or tracked in this browser (order number + phone; details from the API)
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Drop legacy local/demo orders; only API orders are real.
        if (Array.isArray(parsed)) return parsed.filter((o: Order) => o && o.source === 'api');
      }
    } catch {
      // ignore
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const ordersRef = useRef(orders);
  ordersRef.current = orders;

  const upsertOrder = (order: Order) =>
    setOrders((prev) => [order, ...prev.filter((o) => o.id.toLowerCase() !== order.id.toLowerCase())]
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)));

  const createOrder = async (orderInput: CreateOrderInput): Promise<Order> => {
    const items = orderInput.items || [...cart];
    if (items.length === 0) throw new Error(language === 'ar' ? 'سلة التسوق فارغة' : 'Your bag is empty.');
    const deliveryMethod = deliveryMethods.find((m) => m.id === orderInput.deliveryMethod) ?? deliveryMethods[0];
    const { customer, deliveryAddress } = orderInput;
    const idempotencyKey = orderInput.idempotencyKey ||
      (typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `sofalora-${Date.now()}-${Math.random().toString(36).slice(2)}`);

    const api = await placeOrder(
      {
        customer_name: `${customer.firstName} ${customer.lastName}`.trim(),
        customer_phone: customer.phone,
        customer_email: customer.email || undefined,
        shipping_address: {
          name: `${customer.firstName} ${customer.lastName}`.trim(),
          phone: customer.phone,
          building: deliveryAddress.building,
          street: deliveryAddress.street,
          district: deliveryAddress.district,
          city: deliveryAddress.city,
          ...(deliveryAddress.postalCode ? { postal_code: deliveryAddress.postalCode } : {}),
          ...(deliveryAddress.additionalInstructions ? { notes: deliveryAddress.additionalInstructions } : {}),
          country: 'SA'
        },
        payment_method: orderInput.paymentMethod,
        coupon_code: orderInput.promoCode ?? appliedPromo?.code ?? undefined,
        notes: orderInput.notes || undefined,
        items: items.map((item) => ({
          product_id: Number(item.productId),
          quantity: item.quantity,
          ...(item.selectedSize && item.selectedSize.id !== 'default'
            ? { selected_size: item.customDimensions ? item.selectedSize.dimensions : item.selectedSize.label.en }
            : {})
        }))
      },
      idempotencyKey,
      getCustomerToken()
    );

    const order = apiOrderToOrder(api, undefined, {
      items,
      customer,
      deliveryAddress,
      deliveryMethod,
      notes: orderInput.notes
    });
    if (getCustomerToken()) order.accountOrder = true;
    upsertOrder(order);
    clearCart();
    return order;
  };

  const mergeAccountOrders = useCallback((apiOrders: ApiOrder[]) => {
    if (!apiOrders.length) return;
    setOrders((prev) => {
      const byId = new Map(prev.map((o) => [o.id.toLowerCase(), o] as const));
      apiOrders.forEach((api) => {
        const key = api.order_number.toLowerCase();
        const order = apiOrderToOrder(api, byId.get(key));
        order.accountOrder = true;
        byId.set(key, order);
      });
      return [...byId.values()].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    });
  }, []);

  const forgetAccountOrders = useCallback(() => {
    setOrders((prev) => prev.filter((o) => !o.accountOrder));
  }, []);

  const deliveryClaim = deliveryClaimText(checkoutSettings, language, formatPrice);

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find((o) => o.id.toLowerCase() === orderId.toLowerCase());
  };

  const trackOrderByNumber = useCallback(async (orderNumber: string, phone: string): Promise<Order | null> => {
    const api = await trackOrder(orderNumber.trim(), phone.trim());
    if (!api) return null;
    const previous = ordersRef.current.find((o) => o.id.toLowerCase() === api.order_number.toLowerCase());
    const order = apiOrderToOrder(api, previous);
    // Tracking does not echo the phone; keep the one the customer entered.
    if (!order.customer.phone) order.customer = { ...order.customer, phone: phone.trim() };
    upsertOrder(order);
    return order;
  }, []);

  const refreshOrders = useCallback(async () => {
    const list = ordersRef.current;
    await Promise.all(
      list
        .filter((o) => o.customer?.phone)
        .map((o) => trackOrderByNumber(o.orderNumber || o.id, o.customer.phone).catch(() => null))
    );
  }, [trackOrderByNumber]);

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
        checkoutSettings,
        checkoutSettingsStatus,
        paymentMethods,
        deliveryMethods,
        freeShippingThreshold,
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
        trackOrderByNumber,
        refreshOrders,
        mergeAccountOrders,
        forgetAccountOrders,
        deliveryClaim,
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
