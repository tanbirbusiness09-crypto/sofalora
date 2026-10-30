import React, { useState } from 'react';
import { useShop } from '../context/LanguageContext';
import { useRouter, Link } from '../context/RouterContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Truck,
  Sparkles,
  Tag,
  Check,
  AlertCircle,
  HelpCircle,
  Clock,
  MapPin,
  CheckCircle2,
  Lock,
  Heart,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { DeliveryMethodId } from '../types';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
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
    freeShippingThreshold,
    paymentMethods,
    language,
    direction,
    formatPrice,
    toggleWishlist,
    wishlist
  } = useShop();
  const { navigate } = useRouter();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ message: string; type: 'success' | 'warning' | 'error' } | null>(null);

  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;
  const ChevronIcon = direction === 'rtl' ? ChevronLeft : ChevronRight;

  // Free-delivery meter only when the admin set a threshold and a delivery fee.
  const FREE_SHIPPING_THRESHOLD = freeShippingThreshold;
  const showFreeShippingMeter = FREE_SHIPPING_THRESHOLD > 0 && (shippingFee > 0 || cartSubtotal - promoDiscount >= FREE_SHIPPING_THRESHOLD);
  const [couponBusy, setCouponBusy] = useState(false);
  const currentSubtotalAfterDiscount = Math.max(0, cartSubtotal - promoDiscount);
  const progressPercent = FREE_SHIPPING_THRESHOLD > 0 ? Math.min(100, Math.round((currentSubtotalAfterDiscount / FREE_SHIPPING_THRESHOLD) * 100)) : 100;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - currentSubtotalAfterDiscount);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim() || couponBusy) return;
    setCouponBusy(true);
    const res = await applyPromoCode(couponInput);
    setCouponBusy(false);
    setCouponFeedback({ message: res.message, type: res.type });
    if (res.success) {
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-[#F7F7F5] min-h-[75vh] py-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full text-center bg-white border border-neutral-200 rounded-2xl p-8 sm:p-12 shadow-xs">
          <div className="w-20 h-20 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="text-xl font-bold text-neutral-900 mb-2">
            {language === 'ar' ? 'سلة التسوق فارغة' : 'Your Shopping Cart is Empty'}
          </h1>
          <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
            {language === 'ar'
              ? 'لم تقم بإضافة أي قطعة بعد. تصفح مجموعة الكنب والستائر واختر الأنسب لمنزلك.'
              : 'You have no items in your cart. Explore our curated sofas and curtain collections.'}
          </p>
          <div className="space-y-2.5">
            <Link
              href="/shop"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#0B2345] hover:bg-[#071A35] text-white py-3 px-6 rounded-lg font-bold text-xs tracking-wide transition-all shadow-xs"
            >
              <span>{language === 'ar' ? 'ابدأ التسوق الآن' : 'START SHOPPING NOW'}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totalItemsCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="bg-[#F7F7F5] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cart Top Bar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
              {language === 'ar' ? 'سلة التسوق' : 'Cart'}
            </h1>
            <span className="text-xs font-bold bg-[#FAF9F6] text-[#0B2345] border border-[#E6E2D9] px-2.5 py-0.5 rounded-full">
              {totalItemsCount} {language === 'ar' ? 'منتجات' : 'items'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={clearCart}
              className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-rose-600 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'حذف الكل' : 'Clear All'}</span>
            </button>
            <Link
              href="/shop"
              className="text-xs font-bold text-[#0B2345] hover:text-[#071A35] hover:underline hidden sm:inline-block"
            >
              {language === 'ar' ? 'متابعة التسوق' : 'Continue Shopping'}
            </Link>
          </div>
        </div>

        {/* Free Delivery Meter Banner */}
        {showFreeShippingMeter && (
        <div className="mb-6 p-4 rounded-xl bg-white border border-neutral-200 shadow-2xs">
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>
                {currentSubtotalAfterDiscount >= FREE_SHIPPING_THRESHOLD ? (
                  <span className="text-emerald-700">
                    {language === 'ar'
                      ? 'طلبك مؤهل للتوصيل المجاني.'
                      : 'Your order qualifies for free delivery.'}
                  </span>
                ) : (
                  <span>
                    {language === 'ar'
                      ? `أضف ${formatPrice(remainingForFreeShipping)} للحصول على توصيل مجاني`
                      : `Add ${formatPrice(remainingForFreeShipping)} more for free delivery`}
                  </span>
                )}
              </span>
            </div>
            <span className="text-xs font-bold text-emerald-700">
              {progressPercent}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                currentSubtotalAfterDiscount >= FREE_SHIPPING_THRESHOLD ? 'bg-emerald-600' : 'bg-[#0B2345]'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        )}

        {/* 2-Column Layout: Shipment / Items (8 cols) + Order Summary (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Shipment Box */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Shipment Group Card */}
            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-2xs">
              {/* Shipment Header Banner with Atelier Express Badge */}
              <div className="p-3.5 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-neutral-900">
                    {language === 'ar' ? 'الشحنة ١ من ١' : 'Shipment 1 of 1'}
                  </span>
                  <span className="text-xs text-neutral-400">|</span>
                  <span className="text-xs text-neutral-600">
                    {totalItemsCount} {language === 'ar' ? 'عناصر' : 'items'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-neutral-800">
                    {language === 'ar' ? 'توصيل وتركيب داخل الرياض' : 'Delivery & installation in Riyadh'}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-neutral-100">
                {cart.map((item) => {
                  const isItemWishlisted = wishlist.includes(item.product.id);
                  const itemPrice = item.customDimensions?.estimatedTotal || (item.product.price + (item.selectedSize?.priceModifier || 0));
                  // Real was-price only (admin sale price); custom-size quotes never show one.
                  const itemOriginal = !item.customDimensions?.estimatedTotal && item.product.oldPrice
                    ? item.product.oldPrice + (item.selectedSize?.priceModifier || 0)
                    : itemPrice;

                  return (
                    <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start">
                      {/* Thumbnail with Quantity Tag */}
                      <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name[language]}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 end-1 bg-neutral-900/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                          x{item.quantity}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/product/${item.product.slug || item.product.id}`}
                            className="text-sm font-bold text-neutral-900 hover:text-[#0B2345] transition-colors leading-snug line-clamp-2"
                          >
                            {item.product.name[language]}
                          </Link>
                          <div className="text-end shrink-0">
                            <div className="text-sm sm:text-base font-bold text-neutral-900">
                              {formatPrice(itemPrice * item.quantity)}
                            </div>
                            {itemOriginal > itemPrice && (
                              <div className="text-xs text-neutral-400 line-through">
                                {formatPrice(itemOriginal * item.quantity)}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Specs Chips */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-600">
                          {item.selectedColor && (
                            <span className="inline-flex items-center gap-1.5 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200">
                              <span
                                className="w-2.5 h-2.5 rounded-full border border-black/10"
                                style={{ backgroundColor: item.selectedColor.hex }}
                              />
                              <span>{item.selectedColor.name[language]}</span>
                            </span>
                          )}

                          {item.customDimensions ? (
                            <span className="bg-[#FAF9F6] text-[#0B2345] px-2 py-0.5 rounded border border-[#E6E2D9] font-semibold">
                              {language === 'ar' ? 'تفصيل مخصص:' : 'Custom:'} {item.customDimensions.width}m × {item.customDimensions.height}m
                            </span>
                          ) : item.selectedSize ? (
                            <span className="bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200">
                              {item.selectedSize.label[language]} ({item.selectedSize.dimensions})
                            </span>
                          ) : null}
                        </div>

                        {/* Actions Row */}
                        <div className="pt-3 flex items-center justify-between flex-wrap gap-2">
                          {/* Stepper matching Noon */}
                          <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-neutral-50">
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 hover:bg-neutral-200 text-neutral-700 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-neutral-900">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 hover:bg-neutral-200 text-neutral-700 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-4 text-xs font-semibold">
                            <button
                              type="button"
                              onClick={() => toggleWishlist(item.product.id)}
                              className="text-neutral-500 hover:text-neutral-800 flex items-center gap-1 transition-colors"
                            >
                              <Heart className={`w-3.5 h-3.5 ${isItemWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                              <span>{language === 'ar' ? 'حفظ للمفضلة' : 'Move to Wishlist'}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="text-neutral-500 hover:text-rose-600 flex items-center gap-1 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>{language === 'ar' ? 'حذف' : 'Remove'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* In-Home Fitting Service Guarantee */}
            <div className="p-4 bg-white border border-neutral-200 rounded-xl flex items-center justify-between gap-3 text-xs shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-neutral-900">
                    {language === 'ar' ? 'خدمة القياس والتركيب في الرياض' : 'Measurement & Fitting Service in Riyadh'}
                  </div>
                  <div className="text-neutral-500 text-[11px]">
                    {language === 'ar'
                      ? 'تواصل مع فريقنا لتنسيق القياس والتركيب بعد الطلب.'
                      : 'Our team will coordinate measurement and installation after you order.'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Order Summary matching Noon & Amazon (4 cols) */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-4">
            <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-4 shadow-2xs">
              <h2 className="text-sm font-bold text-neutral-900 pb-2 border-b border-neutral-100 flex items-center justify-between">
                <span>{language === 'ar' ? 'ملخص الطلب' : 'Order Summary'}</span>
                <span className="text-xs font-normal text-neutral-500">
                  {totalItemsCount} {language === 'ar' ? 'منتجات' : 'items'}
                </span>
              </h2>

              {/* Subtotal & Shipping breakdown */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>{language === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}</span>
                  <span className="font-bold text-neutral-900">{formatPrice(cartSubtotal)}</span>
                </div>

                {promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>
                      {language === 'ar' ? 'خصم الكوبون' : 'Coupon Discount'} ({appliedPromo?.code})
                    </span>
                    <span>-{formatPrice(promoDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-600">
                  <span>{language === 'ar' ? 'رسوم التوصيل والتركيب' : 'Delivery & Installation'}</span>
                  <span className="font-bold text-emerald-700">
                    {shippingFee === 0 ? (
                      <span className="flex items-center gap-1">
                        <span>{language === 'ar' ? 'مجاناً' : 'FREE'}</span>
                      </span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-neutral-500 text-[11px]">
                  <span>{language === 'ar' ? 'ضريبة القيمة المضافة (١٥٪ مشمولة)' : 'Estimated VAT (15% included)'}</span>
                  <span>{formatPrice(vatAmount)}</span>
                </div>
              </div>

              {/* Total Amount */}
              <div className="pt-3 border-t border-neutral-200 flex items-baseline justify-between">
                <span className="text-sm font-bold text-neutral-900">
                  {language === 'ar' ? 'المجموع الكلي' : 'Total'}
                </span>
                <div className="text-end">
                  <span className="text-xl font-black text-neutral-900">
                    {formatPrice(grandTotal)}
                  </span>
                  <div className="text-[10px] text-neutral-400">
                    {language === 'ar' ? 'شامل ضريبة القيمة المضافة' : 'VAT included'}
                  </div>
                </div>
              </div>

              {/* Coupon Code Input */}
              <div className="pt-2 border-t border-neutral-100">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder={language === 'ar' ? 'أدخل كود الخصم' : 'Coupon code'}
                    className="flex-1 bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2 text-xs uppercase font-mono text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2345] focus:border-[#0B2345]"
                  />
                  <button
                    type="submit"
                    disabled={couponBusy}
                    className="px-3.5 py-2 disabled:opacity-60 bg-[#0B2345] hover:bg-[#071A35] text-white rounded-lg text-xs font-bold transition-all"
                  >
                    {language === 'ar' ? 'تطبيق' : 'Apply'}
                  </button>
                </form>

                {couponFeedback && (
                  <div className={`mt-2 text-[11px] p-2 rounded-lg font-medium ${
                    couponFeedback.type === 'success'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-rose-50 text-rose-700'
                  }`}>
                    {couponFeedback.message}
                  </div>
                )}

              </div>

              {/* Big High-Contrast Checkout CTA Button */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={() => navigate('/checkout')}
                  className="w-full py-3.5 px-4 bg-[#0B2345] hover:bg-[#071A35] active:bg-[#071A35] text-white rounded-lg font-bold text-sm tracking-wide transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>{language === 'ar' ? 'إتمام الطلب بأمان' : 'CHECKOUT'}</span>
                </button>
              </div>


              {/* Assurances Checklist */}
              <div className="pt-2 border-t border-neutral-100 space-y-1.5 text-[11px] text-neutral-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
                  <span>{language === 'ar' ? 'حرفية مفحوصة بعناية' : 'Quality-checked craftsmanship'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-neutral-700" />
                  <span>{paymentMethods.includes('cod')
                    ? (language === 'ar' ? 'الدفع عند الاستلام' : 'Cash on Delivery available')
                    : (language === 'ar' ? 'دفع آمن' : 'Secure checkout')}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
