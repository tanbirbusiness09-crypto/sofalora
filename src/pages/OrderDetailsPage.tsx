import React, { useMemo } from 'react';
import { useShop } from '../context/LanguageContext';
import { useRouter, Link } from '../context/RouterContext';
import {
  Package,
  Calendar,
  Truck,
  MapPin,
  Clock,
  Printer,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Phone,
  ShoppingBag,
  Info
} from 'lucide-react';
import { Order, OrderStatus } from '../types';

export const OrderDetailsPage: React.FC = () => {
  const { route, navigate } = useRouter();
  const { getOrderById, orders, addToCart, language, direction, formatPrice } = useShop();

  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

  const orderId = route.params.id;

  const order: Order | undefined = useMemo(() => {
    if (orderId) {
      const found = getOrderById(orderId);
      if (found) return found;
    }
    return orders[0];
  }, [orderId, orders, getOrderById]);

  if (!order) {
    return (
      <div className="bg-[#FDFCFA] min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#E8DEC\-D] text-center shadow-xs">
          <Package className="w-12 h-12 text-[#0A2A5E] mx-auto mb-4" />
          <h2 className="text-xl font-bold font-serif text-[#101828] mb-2">
            {language === 'ar' ? 'الطلب غير موجود' : 'Order Not Found'}
          </h2>
          <p className="text-xs text-[#667085] mb-6">
            {language === 'ar'
              ? 'لم يتم العثور على سجل لهذا الطلب.'
              : 'The requested order record was not found.'}
          </p>
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 bg-[#0A2A5E] text-white px-6 py-2.5 rounded-full text-xs font-bold"
          >
            <span>{language === 'ar' ? 'العودة لقائمة الطلبات' : 'Back to Orders'}</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleReorder = () => {
    order.items.forEach((item) => {
      addToCart(item.product, item.selectedColor, item.selectedSize, item.quantity, item.customDimensions);
    });
    navigate('/cart');
  };

  return (
    <div className="bg-[#FDFCFA] min-h-screen py-8 sm:py-12 print:bg-white print:py-0">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between gap-4 mb-6 print:hidden">
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#667085] hover:text-[#101828]"
          >
            <ArrowIcon className="w-4 h-4 rotate-180 rtl:rotate-0" />
            <span>{language === 'ar' ? 'الرجوع لكافة الطلبات' : 'Back to All Orders'}</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 bg-white text-[#101828] hover:bg-[#FDFCFA] px-3.5 py-2 rounded-xl text-xs font-bold border border-[#CFC8BA] transition-all"
            >
              <Printer className="w-3.5 h-3.5 text-[#0A2A5E]" />
              <span>{language === 'ar' ? 'طباعة الفاتورة' : 'Print Invoice'}</span>
            </button>
            <button
              type="button"
              onClick={handleReorder}
              className="inline-flex items-center gap-1.5 bg-[#0A2A5E] hover:bg-[#061C3F] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#E3C98F]" />
              <span>{language === 'ar' ? 'إعادة طلب نفس الستائر' : 'Re-order Items'}</span>
            </button>
          </div>
        </div>

        {/* Order Header Summary */}
        <div className="bg-white rounded-3xl border border-[#E8DEC\-D] p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F0EDE6]">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#101828]">
                  {language === 'ar' ? 'تفاصيل الطلب' : 'Order Details'} #{order.id}
                </span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200">
                  {order.status === 'delivered'
                    ? language === 'ar'
                      ? 'تم التوصيل والتركيب'
                      : 'Delivered & Installed'
                    : language === 'ar'
                    ? 'قيد التجهيز'
                    : 'In Progress'}
                </span>
              </div>
              <p className="text-xs text-[#667085] mt-1 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#0A2A5E]" />
                <span>
                  {language === 'ar' ? 'تاريخ التسجيل:' : 'Order Placed on:'}{' '}
                  {new Date(order.createdAt).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </p>
            </div>

            <div className="text-start sm:text-end">
              <div className="text-xs text-[#667085]">{language === 'ar' ? 'الإجمالي الكلي:' : 'Total Amount:'}</div>
              <div className="text-2xl font-serif font-bold text-[#0A2A5E]">
                {formatPrice(order.grandTotal ?? order.total)}
              </div>
            </div>
          </div>

          {/* Riyadh Villa Installation Address & Fulfillment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 text-xs text-[#475467]">
            <div className="p-4 rounded-xl bg-[#FDFCFA] border border-[#E8DEC\-D] space-y-1.5">
              <h4 className="font-bold text-[#101828] flex items-center gap-1.5 text-xs">
                <MapPin className="w-4 h-4 text-[#0A2A5E]" />
                <span>{language === 'ar' ? 'عنوان التركيب في الرياض' : 'Riyadh Installation Site'}</span>
              </h4>
              <p className="font-semibold text-[#101828]">
                {order.customer.firstName} {order.customer.lastName}
              </p>
              <p>
                {order.deliveryAddress.building}, {order.deliveryAddress.street}
              </p>
              <p>
                {order.deliveryAddress.district}, {order.deliveryAddress.city}
              </p>
              <p className="text-[#667085]">
                {order.customer.phone} • {order.customer.email}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FDFCFA] border border-[#E8DEC\-D] space-y-1.5">
              <h4 className="font-bold text-[#101828] flex items-center gap-1.5 text-xs">
                <Truck className="w-4 h-4 text-[#0A2A5E]" />
                <span>{language === 'ar' ? 'التسليم والدفع' : 'Fulfillment & Warranty'}</span>
              </h4>
              <p>
                <strong>{language === 'ar' ? 'طريقة الاستلام:' : 'Method:'}</strong>{' '}
                {order.deliveryMethod.name[language]}
              </p>
              <p>
                <strong>{language === 'ar' ? 'طريقة الدفع:' : 'Payment:'}</strong>{' '}
                {order.paymentMethod === 'card'
                  ? 'Mada / Visa'
                  : order.paymentMethod === 'apple_pay'
                  ? 'Apple Pay'
                  : language === 'ar'
                  ? 'عند التركيب'
                  : 'Cash on Delivery'}
              </p>
              <p className="text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'ضمان ٥ سنوات ساري المفعول' : '5-Year Active Warranty'}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Order Items Table */}
        <div className="bg-white rounded-3xl border border-[#E8DEC\-D] p-6 sm:p-8 shadow-xs mb-8">
          <h3 className="text-base font-bold text-[#101828] pb-4 border-b border-[#F0EDE6] mb-6">
            {language === 'ar' ? 'القطع والمواصفات المطلوبة' : 'Ordered Items & Specifications'}
          </h3>

          <div className="divide-y divide-[#F3F1EB]">
            {order.items.map((item) => (
              <div key={item.id} className="py-4 first:pt-0 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-20 rounded-xl overflow-hidden bg-[#FDFCFA] border border-[#E8DEC\-D] shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name[language]}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-[#101828]">
                      {item.product.name[language]}
                    </h4>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#667085] mt-1">
                      {item.customDimensions ? (
                        <span className="bg-[#F7F5F0] text-[#0A2A5E] font-semibold px-2 py-0.5 rounded border border-[#DDD7CA]">
                          {language === 'ar' ? 'تفصيل خاص:' : 'Custom:'} {item.customDimensions.width}m ×{' '}
                          {item.customDimensions.height}m
                        </span>
                      ) : item.selectedSize ? (
                        <span className="bg-[#FDFCFA] px-2 py-0.5 rounded border border-[#E8DEC\-D]">
                          {item.selectedSize.label[language]} ({item.selectedSize.dimensions})
                        </span>
                      ) : null}

                      {item.selectedColor && (
                        <span className="inline-flex items-center gap-1 bg-[#FDFCFA] px-2 py-0.5 rounded border border-[#E8DEC\-D]">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-[#CFC8BA]"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{item.selectedColor.name[language]}</span>
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-[#667085] mt-1">
                      {item.quantity} × {formatPrice(item.unitPrice)}
                    </div>
                  </div>
                </div>

                <div className="text-end font-bold text-sm text-[#101828]">
                  {formatPrice(item.unitPrice * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="pt-6 border-t border-[#F0EDE6] space-y-2 text-xs text-[#667085] max-w-xs ms-auto">
            <div className="flex justify-between">
              <span>{language === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}</span>
              <span className="font-semibold text-[#101828]">{formatPrice(order.subtotal)}</span>
            </div>

            {(order.promoDiscount ?? order.discount ?? 0) > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>
                  {language === 'ar' ? 'الخصم' : 'Discount'}{' '}
                  {order.appliedPromo?.code || order.promoCode ? `(${order.appliedPromo?.code || order.promoCode})` : ''}
                </span>
                <span>-{formatPrice(order.promoDiscount ?? order.discount)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>{language === 'ar' ? 'التوصيل والتركيب' : 'Delivery & Fitting'}</span>
              <span className={`font-semibold ${order.shippingFee === 0 ? 'text-[#2A7531]' : 'text-[#101828]'}`}>
                {order.shippingFee === 0 ? (language === 'ar' ? 'مجاناً' : 'FREE') : formatPrice(order.shippingFee)}
              </span>
            </div>

            <div className="flex justify-between text-[11px] text-[#667085]">
              <span>{language === 'ar' ? 'ضريبة القيمة المضافة (١٥٪)' : 'VAT (15%)'}</span>
              <span>{formatPrice(order.vatAmount)}</span>
            </div>

            <div className="pt-3 border-t border-[#F0EDE6] flex items-baseline justify-between">
              <span className="text-sm font-black text-[#101828]">
                {language === 'ar' ? 'الإجمالي النهائي' : 'Grand Total'}
              </span>
              <span className="text-xl font-serif font-bold text-[#0A2A5E]">
                {formatPrice(order.grandTotal ?? order.total)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
