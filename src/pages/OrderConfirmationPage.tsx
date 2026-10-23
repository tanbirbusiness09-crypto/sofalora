import React, { useMemo } from 'react';
import { useShop } from '../context/LanguageContext';
import { useRouter, Link } from '../context/RouterContext';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Calendar,
  Phone,
  Printer,
  ShoppingBag,
  Clock,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Download,
  Share2
} from 'lucide-react';
import { Order } from '../types';

export const OrderConfirmationPage: React.FC = () => {
  const { orders, getOrderById, language, direction, formatPrice } = useShop();
  const { route, navigate } = useRouter();

  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

  // Retrieve order from URL query (?orderId=...) or latest order in state
  const order: Order | undefined = useMemo(() => {
    const queryOrderId = route.query?.orderId || route.params?.id;
    if (queryOrderId) {
      const found = getOrderById(queryOrderId);
      if (found) return found;
    }
    // fallback to most recent order
    return orders[0];
  }, [route, orders, getOrderById]);

  if (!order) {
    return (
      <div className="bg-[#FDFCFA] min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#E8DEC\-D] text-center shadow-xs">
          <div className="w-16 h-16 bg-[#F3F1EB] text-[#0A2A5E] rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold font-serif text-[#101828] mb-2">
            {language === 'ar' ? 'لا يوجد طلب للعرض' : 'No Order Found'}
          </h2>
          <p className="text-xs text-[#667085] mb-6">
            {language === 'ar'
              ? 'لم يتم العثور على تفاصيل الطلب المطلوب، أو لم تقم بإجراء طلب بعد.'
              : 'The requested order was not found in your session.'}
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 bg-[#0A2A5E] text-white px-6 py-3 rounded-full text-xs font-bold"
          >
            <span>{language === 'ar' ? 'الذهاب للتسوق' : 'Go Shopping'}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#FDFCFA] min-h-screen py-10 sm:py-16 print:bg-white print:py-0">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Celebration Header Card */}
        <div className="bg-white rounded-3xl border border-[#E8DEC\-D] p-6 sm:p-10 text-center shadow-xs mb-8 print:border-none print:shadow-none">
          <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-4 animate-bounce-short">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-[#0A2A5E]">
            {language === 'ar' ? 'تم استلام طلبك بنجاح' : 'Order Received & Verified'}
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#101828] mt-1 mb-2">
            {language === 'ar' ? 'شكراً لثقتكم بسوفالورا' : 'Thank You for Choosing Sofalora'}
          </h1>
          <p className="text-xs sm:text-sm text-[#667085] max-w-lg mx-auto leading-relaxed">
            {language === 'ar'
              ? `تم تسجيل طلبكم رقم #${order.id} بنجاح. سيقوم مستشار التصميم والتركيب بالتواصل معكم لتنسيق الزيارة ومطابقة ألوان الأقمشة في الفيلا.`
              : `Order #${order.id} has been logged. Our Riyadh fitting concierge will contact you shortly to arrange precision window installation.`}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6 pt-6 border-t border-[#F0EDE6] text-xs">
            <div className="flex items-center gap-2 bg-[#FDFCFA] px-3.5 py-1.5 rounded-full border border-[#E8DEC\-D] text-[#101828]">
              <span className="text-[#667085]">{language === 'ar' ? 'رقم الطلب:' : 'Order ID:'}</span>
              <strong className="font-mono font-bold text-[#0A2A5E]">#{order.id}</strong>
            </div>

            <div className="flex items-center gap-2 bg-[#FDFCFA] px-3.5 py-1.5 rounded-full border border-[#E8DEC\-D] text-[#101828]">
              <Calendar className="w-3.5 h-3.5 text-[#0A2A5E]" />
              <span>{new Date(order.createdAt).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}</span>
            </div>

            <div className="flex items-center gap-2 bg-[#FDFCFA] px-3.5 py-1.5 rounded-full border border-[#E8DEC\-D] text-[#101828]">
              <Truck className="w-3.5 h-3.5 text-[#0A2A5E]" />
              <span>{order.deliveryMethod.name[language]}</span>
            </div>
          </div>
        </div>

        {/* Riyadh Concierge Hotline Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0A2A5E] text-white flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3.5 text-center sm:text-start">
            <div className="w-10 h-10 rounded-full bg-[#0A2A5E]/20 border border-[#0A2A5E]/40 text-[#E3C98F] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold">
                {language === 'ar' ? 'خدمة كبار العملاء والتركيب بالرياض' : 'VIP Riyadh Concierge & Installation'}
              </h3>
              <p className="text-xs text-[#A8A29A] mt-0.5">
                {language === 'ar'
                  ? 'هل ترغب في تقديم موعد التركيب أو تعديل المقاس؟ اتصل بنا مباشرة.'
                  : 'Need to adjust dimensions or reschedule fitting appointment? Call us anytime.'}
              </p>
            </div>
          </div>
          <a
            href="tel:+966500000000"
            className="shrink-0 bg-[#0A2A5E] hover:bg-[#8A6A2F] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm"
          >
            +966 50 000 0000
          </a>
        </div>

        {/* Order Lifecycle Milestones */}
        <div className="bg-white rounded-3xl border border-[#E8DEC\-D] p-6 sm:p-8 shadow-xs mb-8">
          <h3 className="text-base font-bold text-[#101828] mb-6">
            {language === 'ar' ? 'مراحل تجهيز وتفصيل طلبك' : 'Tailoring & Delivery Lifecycle'}
          </h3>

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            {/* Step 1 */}
            <div className="flex items-center gap-3 sm:flex-col sm:text-center flex-1">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0 ring-4 ring-emerald-100">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#101828]">
                  {language === 'ar' ? 'تم استلام الطلب' : 'Order Placed'}
                </h4>
                <p className="text-[10px] text-[#667085] mt-0.5">
                  {language === 'ar' ? 'تم تسجيل البيانات بالنظام' : 'Logged & Confirmed'}
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-3 sm:flex-col sm:text-center flex-1">
              <div className="w-10 h-10 rounded-full bg-[#F7F5F0] text-[#0A2A5E] border-2 border-[#0A2A5E] flex items-center justify-center font-bold text-sm shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#101828]">
                  {language === 'ar' ? 'قص وتفصيل القماش' : 'Custom Tailoring'}
                </h4>
                <p className="text-[10px] text-[#667085] mt-0.5">
                  {language === 'ar' ? 'معمل سوفالورا بالرياض' : 'Riyadh Atelier'}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-3 sm:flex-col sm:text-center flex-1">
              <div className="w-10 h-10 rounded-full bg-[#FDFCFA] text-[#667085] border border-[#CFC8BA] flex items-center justify-center font-bold text-sm shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#667085]">
                  {language === 'ar' ? 'فحص الجودة والكي' : 'Steam & QA'}
                </h4>
                <p className="text-[10px] text-[#667085] mt-0.5">
                  {language === 'ar' ? 'فحص دقة الخياطة والطيّات' : 'Pleat & Drop Inspection'}
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-center gap-3 sm:flex-col sm:text-center flex-1">
              <div className="w-10 h-10 rounded-full bg-[#FDFCFA] text-[#667085] border border-[#CFC8BA] flex items-center justify-center font-bold text-sm shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#667085]">
                  {language === 'ar' ? 'التوصيل والتركيب الليزري' : 'Laser Installation'}
                </h4>
                <p className="text-[10px] text-[#667085] mt-0.5">
                  {language === 'ar' ? 'تركيب السكك والستائر بالفيلا' : 'In-Home White Glove'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Items & Invoice Breakdown */}
        <div className="bg-white rounded-3xl border border-[#E8DEC\-D] p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#F0EDE6] mb-6">
            <h3 className="text-base font-bold text-[#101828]">
              {language === 'ar' ? 'تفاصيل الفاتورة الرسمية' : 'Tax Invoice & Product Specification'}
            </h3>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A2A5E] hover:underline print:hidden"
            >
              <Printer className="w-4 h-4" />
              <span>{language === 'ar' ? 'طباعة الفاتورة' : 'Print Invoice'}</span>
            </button>
          </div>

          {/* Line items list */}
          <div className="divide-y divide-[#F3F1EB] mb-6">
            {order.items.map((item) => (
              <div key={item.id} className="py-4 first:pt-0 flex items-center gap-4">
                <div className="w-16 h-20 rounded-xl overflow-hidden bg-[#FDFCFA] shrink-0 border border-[#E8DEC\-D]">
                  <img
                    src={item.product.image}
                    alt={item.product.name[language]}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-[#101828] truncate">
                    {item.product.name[language]}
                  </h4>

                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#667085] mt-1">
                    {item.customDimensions ? (
                      <span className="bg-[#F7F5F0] text-[#0A2A5E] font-semibold px-2 py-0.5 rounded border border-[#DDD7CA]">
                        {language === 'ar' ? 'تفصيل خاص:' : 'Custom Dimensions:'}{' '}
                        {item.customDimensions.width}m × {item.customDimensions.height}m
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

                  <div className="text-[11px] text-[#667085] mt-1">
                    {item.quantity} × {formatPrice(item.unitPrice)}
                  </div>
                </div>

                <div className="text-end font-bold text-xs sm:text-sm text-[#101828]">
                  {formatPrice(item.unitPrice * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Address & Customer details card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 rounded-2xl bg-[#FDFCFA] border border-[#E8DEC\-D] mb-6 text-xs text-[#475467]">
            <div className="space-y-1.5">
              <h4 className="font-bold text-[#101828] flex items-center gap-1.5 text-xs">
                <MapPin className="w-3.5 h-3.5 text-[#0A2A5E]" />
                {language === 'ar' ? 'عنوان التركيب بالرياض' : 'Installation Address'}
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
              <p className="text-[11px] text-[#667085]">
                {order.customer.phone} • {order.customer.email}
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-[#101828] flex items-center gap-1.5 text-xs">
                <Truck className="w-3.5 h-3.5 text-[#0A2A5E]" />
                {language === 'ar' ? 'بيانات التوصيل والدفع' : 'Fulfillment & Payment'}
              </h4>
              <p>
                <strong>{language === 'ar' ? 'طريقة الاستلام:' : 'Method:'}</strong>{' '}
                {order.deliveryMethod.name[language]}
              </p>
              <p>
                <strong>{language === 'ar' ? 'طريقة الدفع:' : 'Payment:'}</strong>{' '}
                {order.paymentMethod === 'card'
                  ? 'Mada / Credit Card'
                  : order.paymentMethod === 'apple_pay'
                  ? 'Apple Pay'
                  : language === 'ar'
                  ? 'الدفع عند التركيب'
                  : 'Cash on Fitting'}
              </p>
              {order.deliveryAddress.additionalInstructions && (
                <p className="text-[11px] italic text-[#667085]">
                  "{order.deliveryAddress.additionalInstructions}"
                </p>
              )}
            </div>
          </div>

          {/* Pricing Totals */}
          <div className="space-y-2 pt-4 border-t border-[#F0EDE6] text-xs text-[#667085] max-w-xs ms-auto">
            <div className="flex justify-between">
              <span>{language === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}</span>
              <span className="font-semibold text-[#101828]">{formatPrice(order.subtotal)}</span>
            </div>

            {(order.promoDiscount ?? order.discount ?? 0) > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>
                  {language === 'ar' ? 'الخصم الترويجي' : 'Discount'}{' '}
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
                {language === 'ar' ? 'الإجمالي المدفوع' : 'Grand Total'}
              </span>
              <span className="text-xl font-serif font-bold text-[#0A2A5E]">
                {formatPrice(order.grandTotal ?? order.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
          <Link
            href="/orders"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FDFCFA] text-[#101828] px-6 py-3 rounded-full text-xs font-bold border border-[#CFC8BA] transition-all"
          >
            <Package className="w-4 h-4 text-[#0A2A5E]" />
            <span>{language === 'ar' ? 'عرض جميع طلباتي' : 'View All My Orders'}</span>
          </Link>

          <Link
            href="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0A2A5E] hover:bg-[#061C3F] text-white px-8 py-3.5 rounded-full text-xs font-bold transition-all shadow-md"
          >
            <span>{language === 'ar' ? 'متابعة التسوق' : 'Continue Shopping'}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
