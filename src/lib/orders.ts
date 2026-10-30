/**
 * Mapping between admin API orders and the storefront Order shape, plus the
 * delivery option derived from /storefront/checkout-settings.
 */
import type { CartItem, CustomerInfo, DeliveryAddress, DeliveryMethodOption, Order, OrderStatus, PaymentMethodType, Product } from '../types';
import { absoluteMediaUrl, type ApiOrder, type ApiOrderItem, type CheckoutSettings } from './api';

const round2 = (n: number) => Math.round(n * 100) / 100;

/** VAT (15%) already included in a VAT-inclusive amount. Informational only. */
export const SAUDI_VAT_RATE = 0.15;
export const includedVat = (amount: number) => round2((amount * SAUDI_VAT_RATE) / (1 + SAUDI_VAT_RATE));

export function standardDelivery(settings: CheckoutSettings | null): DeliveryMethodOption {
  const fee = settings?.flat_shipping_rate ?? 0;
  const threshold = settings?.free_shipping_threshold ?? 0;
  return {
    id: 'standard',
    name: { en: 'Standard Delivery & Installation', ar: 'توصيل وتركيب قياسي' },
    description: { en: 'Delivered and installed across Riyadh', ar: 'توصيل وتركيب داخل الرياض' },
    price: fee,
    freeThreshold: threshold > 0 ? threshold : null,
    estimatedTime: { en: '2-4 Days', ar: '٢-٤ أيام' },
  };
}

/**
 * Delivery promise derived from the admin's shipping settings, so the storefront never
 * claims free delivery that checkout would not honour. Null = no free-delivery claim.
 */
export function deliveryClaimText(
  settings: CheckoutSettings | null,
  lang: 'en' | 'ar',
  formatPrice: (n: number) => string
): string | null {
  if (!settings) return null;
  if (settings.flat_shipping_rate <= 0) {
    return lang === 'ar' ? 'توصيل مجاني داخل الرياض' : 'Free delivery in Riyadh';
  }
  if (settings.free_shipping_threshold > 0) {
    const amount = formatPrice(settings.free_shipping_threshold);
    return lang === 'ar' ? `توصيل مجاني للطلبات فوق ${amount}` : `Free delivery on orders over ${amount}`;
  }
  return null;
}

/** Same rule as the admin CheckoutService: flat rate unless the net subtotal reaches the threshold. */
export function shippingFor(settings: CheckoutSettings | null, netSubtotal: number, hasItems: boolean): number {
  if (!hasItems || !settings) return 0;
  const threshold = settings.free_shipping_threshold;
  if (threshold > 0 && netSubtotal >= threshold) return 0;
  return settings.flat_shipping_rate;
}

const STATUS_MAP: Record<string, OrderStatus> = {
  pending: 'order_placed',
  placed: 'order_placed',
  new: 'order_placed',
  confirmed: 'confirmed',
  processing: 'preparing',
  preparing: 'preparing',
  ready: 'ready_for_delivery',
  ready_for_delivery: 'ready_for_delivery',
  shipped: 'out_for_delivery',
  out_for_delivery: 'out_for_delivery',
  delivered: 'delivered',
  completed: 'delivered',
  cancelled: 'cancelled',
  canceled: 'cancelled',
  refunded: 'cancelled',
  failed: 'cancelled',
};

export const mapOrderStatus = (status: string | undefined): OrderStatus =>
  STATUS_MAP[(status ?? '').toLowerCase()] ?? 'order_placed';

/** Neutral tile for order lines that have no image (tracking omits images). */
const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" fill="#F3F1EB"/><path d="M20 46h40v10H20zM24 34h32v12H24z" fill="#D5CEC0"/></svg>');

const placeholderProduct = (item: ApiOrderItem, index: number): Product => {
  const name = { en: item.product_name, ar: item.product_name };
  const image = absoluteMediaUrl(item.image) || PLACEHOLDER_IMAGE;
  return {
    id: item.product_id != null ? String(item.product_id) : `order-item-${index}`,
    name,
    category: { en: '', ar: '' },
    categorySlug: '',
    description: { en: '', ar: '' },
    price: Number(item.price) || 0,
    rating: 0,
    reviews: 0,
    image,
    secondaryImage: '',
    images: image ? [image] : [],
    fabric: { en: '', ar: '' },
    colors: [],
    sizes: [],
    room: { en: '', ar: '' },
    features: [],
    inStock: true,
  };
};

/** Order lines from the API (used when the order was not placed in this browser). */
export function apiItemsToCartItems(items: ApiOrderItem[] | undefined): CartItem[] {
  return (items ?? []).map((item, i) => {
    const product = placeholderProduct(item, i);
    return {
      id: `${product.id}-${i}`,
      productId: product.id,
      product,
      quantity: Number(item.quantity) || 1,
      unitPrice: Number(item.price) || 0,
    };
  });
}

/** The checkout response uses "Y-m-d H:i:s" in UTC (app timezone); tracking uses ISO 8601. */
const toIso = (value: string | null | undefined): string | undefined => {
  if (!value) return undefined;
  const plain = /^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})$/.exec(value);
  return plain ? `${plain[1]}T${plain[2]}Z` : value;
};

const PAYMENT_TYPES: PaymentMethodType[] = ['card', 'apple_pay', 'cod'];

interface OrderContext {
  items?: CartItem[];
  customer?: CustomerInfo;
  deliveryAddress?: DeliveryAddress;
  deliveryMethod?: DeliveryMethodOption;
  notes?: string;
}

/** Build a storefront Order from an API order, keeping local details when known. */
export function apiOrderToOrder(api: ApiOrder, previous?: Order, ctx: OrderContext = {}): Order {
  const createdAt = toIso(api.created_at) || previous?.createdAt || new Date().toISOString();
  const grandTotal = Number(api.grand_total) || 0;
  const discount = Number(api.discount_amount) || 0;
  const items =
    ctx.items ??
    (previous?.items?.length ? previous.items : undefined) ??
    apiItemsToCartItems(api.items);
  const [firstName = '', ...rest] = (api.customer_name ?? '').trim().split(/\s+/);
  const payment = (api.payment_method ?? 'cod') as PaymentMethodType;

  return {
    id: api.order_number,
    orderNumber: api.order_number,
    source: 'api',
    createdAt,
    updatedAt: toIso(api.updated_at) ?? previous?.updatedAt,
    estimatedDeliveryDate:
      previous?.estimatedDeliveryDate ?? new Date(Date.parse(createdAt) + 4 * 86400000).toISOString(),
    status: mapOrderStatus(api.status),
    serverStatus: api.status,
    paymentStatus: api.payment_status ?? previous?.paymentStatus,
    currency: api.currency ?? previous?.currency ?? 'SAR',
    customer: ctx.customer ??
      previous?.customer ?? {
        firstName,
        lastName: rest.join(' '),
        email: api.customer_email ?? '',
        phone: api.customer_phone ?? '',
      },
    deliveryAddress: ctx.deliveryAddress ??
      previous?.deliveryAddress ?? {
        building: api.shipping_address?.building ?? '',
        street: api.shipping_address?.street ?? api.shipping_address?.address ?? '',
        district: api.shipping_address?.district ?? '',
        city: api.shipping_address?.city ?? '',
        additionalInstructions: api.shipping_address?.notes ?? '',
      },
    deliveryMethod: ctx.deliveryMethod ?? previous?.deliveryMethod ?? standardDelivery(null),
    paymentMethod: PAYMENT_TYPES.includes(payment) ? payment : 'cod',
    items,
    subtotal: Number(api.subtotal) || 0,
    discount,
    promoDiscount: discount,
    promoCode: api.coupon_code ?? previous?.promoCode ?? undefined,
    shippingFee: Number(api.shipping_cost) || 0,
    vatAmount: includedVat(grandTotal),
    total: grandTotal,
    grandTotal,
    notes: ctx.notes ?? api.notes ?? previous?.notes ?? undefined,
  };
}
