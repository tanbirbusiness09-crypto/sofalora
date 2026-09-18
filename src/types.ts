export type Language = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

export interface BilingualText {
  en: string;
  ar: string;
}

export interface ProductColor {
  id: string;
  name: BilingualText;
  hex: string;
}

export interface ProductSize {
  id: string;
  label: BilingualText;
  dimensions: string;
  priceModifier: number;
}

export interface Product {
  id: string;
  slug?: string;
  name: BilingualText;
  category: BilingualText;
  categorySlug: string;
  subcategory?: BilingualText;
  subcategorySlug?: string;
  description: BilingualText;
  price: number;
  oldPrice?: number;
  comparePrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  reviewCount?: number;
  badge?: BilingualText;
  image: string;
  secondaryImage: string;
  images?: string[];
  fabric: BilingualText;
  pattern?: BilingualText;
  lightControl?: 'blackout' | 'room-darkening' | 'light-filtering' | 'sheer';
  colors: ProductColor[];
  sizes: ProductSize[];
  room: BilingualText;
  features: BilingualText[];
  inStock: boolean;
  stock?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isSale?: boolean;
  collection?: string;
}

export interface FilterState {
  categories: string[];
  subcategories: string[];
  collections: string[];
  priceRange: [number, number];
  colors: string[];
  fabrics: string[];
  patterns: string[];
  lightControls: string[];
  rooms: string[];
  inStockOnly: boolean;
  onSaleOnly?: boolean;
}

export type SortOption =
  | 'recommended'
  | 'featured'
  | 'newest'
  | 'price-low'
  | 'price-high'
  | 'price-asc'
  | 'price-desc'
  | 'best-selling'
  | 'bestsellers'
  | 'highest-rated'
  | 'rating';

export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  product: Product;
  selectedColor?: {
    id: string;
    name: BilingualText;
    hex: string;
  };
  selectedSize?: {
    id: string;
    label: BilingualText;
    dimensions: string;
    priceModifier: number;
  };
  customDimensions?: {
    width: number;
    height: number;
    unit?: string;
    pricePerSqm: number;
    estimatedTotal: number;
  };
  quantity: number;
  unitPrice: number;
}

export type OrderStatus =
  | 'order_placed'
  | 'confirmed'
  | 'preparing'
  | 'ready_for_delivery'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface DeliveryAddress {
  building: string;
  street: string;
  district: string;
  city: string;
  postalCode?: string;
  additionalInstructions?: string;
}

export type DeliveryMethodId = 'standard' | 'express' | 'pickup';

export interface DeliveryMethodOption {
  id: DeliveryMethodId;
  name: BilingualText;
  description: BilingualText;
  price: number;
  freeThreshold?: number | null;
  estimatedTime: BilingualText;
}

export type PaymentMethodType = 'card' | 'apple_pay' | 'cod';

export interface Order {
  id: string; // e.g. MC-20260918-1042
  createdAt: string; // ISO date string
  estimatedDeliveryDate: string;
  status: OrderStatus;
  customer: CustomerInfo;
  deliveryAddress: DeliveryAddress;
  deliveryMethod: DeliveryMethodOption;
  paymentMethod: PaymentMethodType;
  items: CartItem[];
  subtotal: number;
  discount: number;
  promoDiscount?: number;
  promoCode?: string;
  appliedPromo?: PromoCode;
  shippingFee: number;
  vatAmount: number; // 15% VAT
  total: number;
  grandTotal?: number;
  notes?: string;
}

export interface CreateOrderInput {
  customer: CustomerInfo;
  deliveryAddress: DeliveryAddress;
  deliveryMethod?: DeliveryMethodOption | DeliveryMethodId | string;
  paymentMethod: PaymentMethodType;
  items?: CartItem[];
  subtotal?: number;
  discount?: number;
  promoDiscount?: number;
  promoCode?: string;
  appliedPromo?: PromoCode;
  shippingFee?: number;
  vatAmount?: number;
  total?: number;
  grandTotal?: number;
  notes?: string;
}

export interface PromoCode {
  code: string;
  discountPercent: number;
  description: BilingualText;
  minOrder?: number;
  isExpired?: boolean;
}

export interface Category {
  id: string;
  slug: string;
  title: BilingualText;
  subtitle: BilingualText;
  itemCount: number;
  image: string;
}

export interface Testimonial {
  id: string;
  name: BilingualText;
  location: BilingualText;
  role: BilingualText;
  rating: number;
  comment: BilingualText;
  verified: boolean;
  avatar: string;
  curtainInstalled: BilingualText;
}

export interface RoomCategory {
  id: string;
  title: BilingualText;
  subtitle: BilingualText;
  image: string;
  recommendedType: BilingualText;
}

export interface InspirationItem {
  id: string;
  title: BilingualText;
  room: BilingualText;
  style: BilingualText;
  image: string;
  curtainModel: BilingualText;
}
