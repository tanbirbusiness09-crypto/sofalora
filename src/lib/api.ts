/**
 * Commerce API client for the headless admin backend (Laravel, /api/v1).
 *
 * Base URL comes from VITE_COMMERCE_API_URL (e.g. http://localhost:8000).
 * Only public storefront endpoints are used here; they need no auth.
 */
import type { BilingualText, Category, Product } from '../types';

const RAW_BASE = (import.meta.env.VITE_COMMERCE_API_URL as string | undefined) ?? '';

export const COMMERCE_API_URL = RAW_BASE.replace(/\/+$/, '');
export const isCommerceApiConfigured = COMMERCE_API_URL.length > 0;

// ---------------------------------------------------------------------------
// Admin API response shapes (see admin app/Http/Resources/Api/v1/*)
// ---------------------------------------------------------------------------

export interface ApiEnvelope<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface ApiCategoryRef {
  id: number;
  name: string;
  name_ar: string | null;
  slug: string;
}

export interface ApiCategory extends ApiCategoryRef {
  icon: string | null;
  image: string | null;
  description: string | null;
  status: 'active' | 'inactive';
  order_index: number;
  products_count: number;
  children?: ApiCategory[];
}

export interface ApiVariant {
  id: number;
  sku: string;
  price: number;
  sale_price: number | null;
  stock_status: string;
  in_stock: boolean;
  attributes: Record<string, string> | null;
  image: string | null;
  status: string;
}

export interface ApiProduct {
  id: number;
  name: string;
  name_ar: string | null;
  slug: string;
  sku: string | null;
  type: 'simple' | 'variable' | 'digital';
  price: number;
  sale_price: number | null;
  stock_status: 'in_stock' | 'out_of_stock' | 'on_backorder';
  in_stock: boolean;
  stock_quantity: number;
  badge: string | null;
  image: string | null;
  gallery_images: string[] | null;
  short_description: string | null;
  short_description_ar: string | null;
  description: string | null;
  description_ar: string | null;
  featured: boolean;
  status: string;
  specifications: Record<string, unknown> | unknown[] | null;
  category?: ApiCategoryRef | null;
  brand?: { id: number; name: string; slug: string } | null;
  variants?: ApiVariant[];
  created_at: string | null;
  updated_at: string | null;
}

export interface ApiPagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export interface ApiProductPage {
  items: ApiProduct[];
  pagination: ApiPagination;
}

// ---------------------------------------------------------------------------
// HTTP
// ---------------------------------------------------------------------------

export class CommerceApiError extends Error {
  status: number;
  /** Machine-readable code from the API (e.g. invalid_credentials, phone_taken). */
  code?: string;
  /** First validation error per field. */
  fieldErrors: Record<string, string>;
  constructor(message: string, status: number, code?: string, fieldErrors: Record<string, string> = {}) {
    super(message);
    this.name = 'CommerceApiError';
    this.status = status;
    this.code = code;
    this.fieldErrors = fieldErrors;
  }
}

async function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
  if (!isCommerceApiConfigured) {
    throw new CommerceApiError('VITE_COMMERCE_API_URL is not set', 0);
  }
  const res = await fetch(`${COMMERCE_API_URL}/api/v1${path}`, {
    headers: { Accept: 'application/json' },
    signal,
  });
  let body: ApiEnvelope<T> | null = null;
  try {
    body = (await res.json()) as ApiEnvelope<T>;
  } catch {
    body = null;
  }
  if (!res.ok || !body || body.success === false) {
    throw new CommerceApiError(body?.message || `Request failed (${res.status})`, res.status);
  }
  return body.data;
}

/** Fetch every active product (walks all pages, 100 per page). */
export async function fetchAllProducts(signal?: AbortSignal): Promise<ApiProduct[]> {
  const all: ApiProduct[] = [];
  let page = 1;
  let lastPage = 1;
  do {
    const data = await apiGet<ApiProductPage>(`/storefront/products?per_page=100&page=${page}`, signal);
    all.push(...(data.items ?? []));
    lastPage = data.pagination?.last_page ?? 1;
    page += 1;
  } while (page <= lastPage && page <= 50);
  return all;
}

/** Fetch one product by slug. Returns null on 404. */
export async function fetchProductBySlug(slug: string, signal?: AbortSignal): Promise<ApiProduct | null> {
  try {
    return await apiGet<ApiProduct>(`/storefront/products/${encodeURIComponent(slug)}`, signal);
  } catch (err) {
    if (err instanceof CommerceApiError && err.status === 404) return null;
    throw err;
  }
}

/** Active top-level categories with their active children. */
export async function fetchCategories(signal?: AbortSignal): Promise<ApiCategory[]> {
  const data = await apiGet<ApiCategory[]>('/storefront/categories', signal);
  return Array.isArray(data) ? data : [];
}

// ---------------------------------------------------------------------------
// Mapping: admin API shapes -> sofalora types
// ---------------------------------------------------------------------------

const EMPTY_TEXT: BilingualText = { en: '', ar: '' };

/** English text with Arabic fallback to English when no Arabic value exists. */
export function bilingual(en: string | null | undefined, ar: string | null | undefined): BilingualText {
  const enText = (en ?? '').trim();
  const arText = (ar ?? '').trim();
  return { en: enText || arText, ar: arText || enText };
}

/** Make relative media paths absolute against the API host. */
export function absoluteMediaUrl(url: string | null | undefined): string {
  if (!url) return '';
  if (/^(https?:)?\/\//i.test(url) || url.startsWith('data:')) return url;
  return `${COMMERCE_API_URL}/${url.replace(/^\/+/, '')}`;
}

const NEW_PRODUCT_DAYS = 30;

export function mapApiProduct(p: ApiProduct, categoryParents?: Map<string, ApiCategoryRef>): Product {
  const images = [p.image, ...(p.gallery_images ?? [])]
    .map((u) => absoluteMediaUrl(u))
    .filter((u, i, arr) => u && arr.indexOf(u) === i);

  const regular = Number(p.price) || 0;
  const sale = p.sale_price != null ? Number(p.sale_price) : null;
  const onSale = sale != null && sale > 0 && sale < regular;
  const price = onSale ? (sale as number) : regular;
  const discount = onSale ? Math.round(((regular - price) / regular) * 100) : undefined;

  const cat = p.category ?? null;
  const parent = cat ? categoryParents?.get(cat.slug) : undefined;
  // Products in a child category: categorySlug = parent, subcategory = child,
  // so parent category pages and the sub-category pills both work.
  const topCat = parent ?? cat;
  const category = topCat ? bilingual(topCat.name, topCat.name_ar) : EMPTY_TEXT;

  const createdAt = p.created_at ? Date.parse(p.created_at) : NaN;
  const isNew = Number.isFinite(createdAt) && Date.now() - createdAt < NEW_PRODUCT_DAYS * 86400000;
  const badgeText = (p.badge ?? '').trim();

  return {
    id: String(p.id),
    slug: p.slug,
    name: bilingual(p.name, p.name_ar),
    category,
    categorySlug: topCat?.slug ?? '',
    subcategory: parent && cat ? bilingual(cat.name, cat.name_ar) : undefined,
    subcategorySlug: parent && cat ? cat.slug : undefined,
    description: bilingual(p.description || p.short_description, p.description_ar || p.short_description_ar),
    price,
    oldPrice: onSale ? regular : undefined,
    comparePrice: onSale ? regular : undefined,
    discount,
    rating: 0,
    reviews: 0,
    reviewCount: 0,
    badge: badgeText ? { en: badgeText, ar: badgeText } : undefined,
    image: images[0] ?? '',
    secondaryImage: images[1] ?? '',
    images,
    fabric: { ...EMPTY_TEXT },
    colors: [],
    sizes: [],
    room: { ...EMPTY_TEXT },
    features: [],
    inStock: p.in_stock,
    stock: p.stock_quantity,
    isNew,
    isBestSeller: Boolean(p.featured) || /best/i.test(badgeText),
    isSale: onSale,
  };
}

/** Flatten the category tree into sofalora Category cards (parents first). */
export function mapApiCategories(tree: ApiCategory[]): Category[] {
  const out: Category[] = [];
  const visit = (c: ApiCategory) => {
    const childCount = (c.children ?? []).reduce((n, ch) => n + (ch.products_count || 0), 0);
    out.push({
      id: String(c.id),
      slug: c.slug,
      title: bilingual(c.name, c.name_ar),
      subtitle: bilingual(c.description, null),
      itemCount: (c.products_count || 0) + childCount,
      image: absoluteMediaUrl(c.image),
    });
    (c.children ?? []).forEach((ch) => visit(ch));
  };
  tree.forEach((c) => visit(c));
  return out;
}

/** child slug -> parent category ref, for mapping products. */
export function buildCategoryParentIndex(tree: ApiCategory[]): Map<string, ApiCategoryRef> {
  const index = new Map<string, ApiCategoryRef>();
  tree.forEach((parent) => {
    (parent.children ?? []).forEach((child) => {
      index.set(child.slug, { id: parent.id, name: parent.name, name_ar: parent.name_ar, slug: parent.slug });
    });
  });
  return index;
}

// ---------------------------------------------------------------------------
// Website CMS (home page sections, banners, brand)
// ---------------------------------------------------------------------------

export interface CmsItem {
  title_en?: string;
  title_ar?: string;
  subtitle_en?: string;
  subtitle_ar?: string;
  value?: string;
  url?: string;
  image?: string;
}

export interface CmsSection {
  key: string;
  active?: boolean;
  order?: number;
  name?: string;
  title_en?: string;
  title_ar?: string;
  subtitle_en?: string;
  subtitle_ar?: string;
  items?: Array<CmsItem | null>;
  [extra: string]: unknown;
}

export interface CmsBanner {
  image?: string;
  title_en?: string;
  title_ar?: string;
  sub_en?: string;
  sub_ar?: string;
  btn_text?: string;
  btn_text_ar?: string;
  btn_url?: string;
  active?: boolean;
  show_text?: boolean;
}

export interface CmsCard {
  image?: string;
  title_en?: string;
  title_ar?: string;
  subtitle_en?: string;
  subtitle_ar?: string;
  btn_url?: string;
}

export interface CmsBrandConfig {
  nameEn?: string;
  nameAr?: string;
  taglineEn?: string;
  taglineAr?: string;
  logoUrl?: string;
  logoWidth?: number;
  phone?: string;
  whatsapp?: string;
  email?: string;
  addressEn?: string;
  addressAr?: string;
  hoursEn?: string;
  hoursAr?: string;
}

export interface WebsiteContent {
  banners: CmsBanner[];
  pageBanners: Record<string, CmsCard>;
  homeSections: CmsSection[];
  brandConfig: CmsBrandConfig;
}

const asRecord = (v: unknown): Record<string, unknown> =>
  v && typeof v === 'object' && !Array.isArray(v) ? (v as Record<string, unknown>) : {};

/** GET /storefront/website. An empty config ([] or {}) yields empty lists. */
export async function fetchWebsiteContent(signal?: AbortSignal): Promise<WebsiteContent> {
  const raw = asRecord(await apiGet<unknown>('/storefront/website', signal));
  const sections = Array.isArray(raw.homeSections) ? raw.homeSections : [];
  return {
    banners: Array.isArray(raw.banners) ? (raw.banners as CmsBanner[]).filter(Boolean) : [],
    pageBanners: asRecord(raw.pageBanners) as Record<string, CmsCard>,
    homeSections: sections.filter(
      (s): s is CmsSection => !!s && typeof s === 'object' && typeof (s as CmsSection).key === 'string'
    ),
    brandConfig: asRecord(raw.brandConfig) as CmsBrandConfig,
  };
}

// ---------------------------------------------------------------------------
// Checkout, coupons, orders (guest; no customer auth)
// ---------------------------------------------------------------------------

async function apiRequest<T>(
  method: 'GET' | 'POST' | 'PUT',
  path: string,
  payload?: unknown,
  headers: Record<string, string> = {}
): Promise<T> {
  if (!isCommerceApiConfigured) {
    throw new CommerceApiError('VITE_COMMERCE_API_URL is not set', 0);
  }
  const res = await fetch(`${COMMERCE_API_URL}/api/v1${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      ...(payload !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    ...(payload !== undefined ? { body: JSON.stringify(payload) } : {}),
  });
  let body: (ApiEnvelope<T> & { errors?: Record<string, string[]>; code?: string }) | null = null;
  try {
    body = await res.json();
  } catch {
    body = null;
  }
  if (!res.ok || !body || body.success === false) {
    const fieldErrors: Record<string, string> = {};
    Object.entries(body?.errors ?? {}).forEach(([k, v]) => {
      if (Array.isArray(v) && v[0]) fieldErrors[k] = String(v[0]);
    });
    const firstError = Object.values(fieldErrors)[0];
    throw new CommerceApiError(firstError || body?.message || `Request failed (${res.status})`, res.status, body?.code, fieldErrors);
  }
  return body.data;
}

function apiPost<T>(path: string, payload: unknown, headers: Record<string, string> = {}): Promise<T> {
  return apiRequest<T>('POST', path, payload, headers);
}

const bearer = (token?: string | null): Record<string, string> =>
  token ? { Authorization: `Bearer ${token}` } : {};

export interface CustomerAccountsConfig {
  login_enabled: boolean;
  registration_enabled: boolean;
}

export interface CheckoutSettings {
  flat_shipping_rate: number;
  free_shipping_threshold: number;
  currency: string;
  payment_methods: string[];
  customer_accounts: CustomerAccountsConfig;
}

export async function fetchCheckoutSettings(signal?: AbortSignal): Promise<CheckoutSettings> {
  const d = await apiGet<Partial<CheckoutSettings>>('/storefront/checkout-settings', signal);
  return {
    flat_shipping_rate: Number(d.flat_shipping_rate) || 0,
    free_shipping_threshold: Number(d.free_shipping_threshold) || 0,
    currency: d.currency || 'SAR',
    payment_methods: Array.isArray(d.payment_methods) ? d.payment_methods : [],
    customer_accounts: {
      login_enabled: d.customer_accounts?.login_enabled === true,
      registration_enabled: d.customer_accounts?.registration_enabled === true,
    },
  };
}

export interface CouponValidation {
  code: string;
  discount_amount: number;
  discount_type: 'percentage' | 'fixed' | string;
  discount_value: number;
}

export function validateCoupon(code: string, subtotal: number): Promise<CouponValidation> {
  return apiPost<CouponValidation>('/storefront/coupon/validate', { code, subtotal });
}

export interface CheckoutPayload {
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  shipping_address: Record<string, string>;
  payment_method: string;
  coupon_code?: string;
  notes?: string;
  items: Array<{ product_id: number; variant_id?: number; selected_size?: string; quantity: number }>;
}

export interface ApiOrderItem {
  product_id?: number | null;
  product_name: string;
  image?: string | null;
  sku?: string | null;
  price: number;
  quantity: number;
  subtotal: number;
  options?: Record<string, unknown> | null;
}

export interface ApiOrder {
  id?: number;
  order_number: string;
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string | null;
  shipping_address?: Record<string, string> | null;
  status: string;
  payment_method?: string;
  payment_status?: string;
  currency?: string;
  subtotal: number;
  discount_amount?: number;
  coupon_code?: string | null;
  shipping_cost?: number;
  tax_amount?: number;
  grand_total: number;
  notes?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  items?: ApiOrderItem[];
}

/**
 * POST /storefront/checkout. The Idempotency-Key makes retries safe.
 * With a customer token the order is linked to that account; without one it is a guest order.
 */
export function placeOrder(payload: CheckoutPayload, idempotencyKey: string, customerToken?: string | null): Promise<ApiOrder> {
  return apiPost<ApiOrder>('/storefront/checkout', payload, {
    'Idempotency-Key': idempotencyKey,
    ...bearer(customerToken),
  });
}

/** POST /storefront/orders/track. Returns null when no order matches. */
export async function trackOrder(orderNumber: string, phone: string): Promise<ApiOrder | null> {
  try {
    return await apiPost<ApiOrder>('/storefront/orders/track', { order_number: orderNumber, phone });
  } catch (err) {
    if (err instanceof CommerceApiError && err.status === 404) return null;
    throw err;
  }
}

// ── Customer accounts (/storefront/customer/*) ──

export interface CustomerAddress {
  label?: string;
  city?: string;
  district?: string;
  street?: string;
  building?: string;
  notes?: string;
  is_default?: boolean;
}

export interface CustomerProfile {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  addresses: CustomerAddress[];
  registered_at?: string | null;
}

export interface CustomerSession {
  token: string;
  expires_at?: string | null;
  customer: CustomerProfile;
}

export function registerCustomer(input: {
  name: string;
  phone: string;
  email?: string;
  password: string;
  password_confirmation: string;
}): Promise<CustomerSession> {
  return apiPost<CustomerSession>('/storefront/customer/register', input);
}

export function loginCustomer(login: string, password: string): Promise<CustomerSession> {
  return apiPost<CustomerSession>('/storefront/customer/login', { login, password });
}

export function logoutCustomer(token: string): Promise<null> {
  return apiPost<null>('/storefront/customer/logout', {}, bearer(token));
}

export function fetchCustomerMe(token: string): Promise<CustomerProfile> {
  return apiRequest<CustomerProfile>('GET', '/storefront/customer/me', undefined, bearer(token));
}

export function updateCustomerMe(
  token: string,
  patch: { name?: string; email?: string | null; addresses?: CustomerAddress[] }
): Promise<CustomerProfile> {
  return apiRequest<CustomerProfile>('PUT', '/storefront/customer/me', patch, bearer(token));
}

export function changeCustomerPassword(
  token: string,
  input: { current_password: string; password: string; password_confirmation: string }
): Promise<null> {
  return apiRequest<null>('PUT', '/storefront/customer/password', input, bearer(token));
}

export function fetchCustomerOrders(token: string): Promise<ApiOrder[]> {
  return apiRequest<ApiOrder[]>('GET', '/storefront/customer/orders', undefined, bearer(token));
}
