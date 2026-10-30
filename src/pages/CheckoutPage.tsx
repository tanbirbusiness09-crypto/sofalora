import React, { useEffect, useRef, useState } from 'react';
import { useShop } from '../context/LanguageContext';
import { useRouter, Link } from '../context/RouterContext';
import {
  Lock,
  ArrowLeft,
  ArrowRight,
  Home,
  Phone,
  DoorClosed,
  Check,
  Banknote,
  CreditCard,
  AlertCircle,
  ShieldCheck,
  Truck,
  Loader2
} from 'lucide-react';
import { RIYADH_DISTRICTS } from '../data/riyadhDistricts';
import { BrandLogo } from '../components/UI/BrandLogo';
import { useAuth } from '../context/AuthContext';
import { localSaudiPhone } from '../lib/customerAuth';
import type { PaymentMethodType } from '../types';

const PROFILE_KEY = 'sofalora_profile';

interface SavedProfile {
  name?: string;
  phone?: string;
  email?: string;
  city?: string;
  street?: string;
}

const readProfile = (): SavedProfile => {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}') || {};
  } catch {
    return {};
  }
};

/** Labels for payment method ids returned by /storefront/checkout-settings. */
const PAYMENT_LABELS: Record<string, { en: string; ar: string; hintEn: string; hintAr: string }> = {
  cod: {
    en: 'Cash on Delivery',
    ar: 'الدفع عند الاستلام',
    hintEn: 'Pay in cash or by card to our delivery team.',
    hintAr: 'ادفع نقداً أو بالبطاقة لفريق التوصيل.'
  },
  bank_transfer: {
    en: 'Bank Transfer',
    ar: 'تحويل بنكي',
    hintEn: 'We will send transfer details after you order.',
    hintAr: 'سنرسل بيانات التحويل بعد الطلب.'
  },
  stripe: { en: 'Card Payment', ar: 'الدفع بالبطاقة', hintEn: '', hintAr: '' },
  paypal: { en: 'PayPal', ar: 'باي بال', hintEn: '', hintAr: '' }
};

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    appliedPromo,
    promoDiscount,
    selectedDeliveryMethod,
    deliveryMethods,
    shippingFee,
    vatAmount,
    grandTotal,
    paymentMethods,
    checkoutSettingsStatus,
    createOrder,
    language,
    direction,
    setLanguage,
    formatPrice
  } = useShop();
  const { navigate } = useRouter();
  const isAr = language === 'ar';

  const ArrowIcon = direction === 'rtl' ? ArrowRight : ArrowLeft;

  // Guest details start empty (prefilled only from the profile saved on this device).
  const [profile] = useState(readProfile);
  const [receiverName, setReceiverName] = useState(profile.name ?? '');
  const [receiverPhone, setReceiverPhone] = useState(profile.phone ?? '');
  const [receiverEmail, setReceiverEmail] = useState(profile.email ?? '');
  const [district, setDistrict] = useState('');
  const [street, setStreet] = useState(profile.street ?? '');
  const [building, setBuilding] = useState('');
  const [city, setCity] = useState(profile.city || (isAr ? 'الرياض' : 'Riyadh'));
  const [leaveAtDoor, setLeaveAtDoor] = useState(false);
  const [deliveryNotes, setDeliveryNotes] = useState('');

  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const payment = paymentMethods.includes(selectedPayment) ? selectedPayment : paymentMethods[0] ?? '';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  // One key per checkout attempt; reused on retry so the API never duplicates the order.
  const idempotencyKey = useRef<string>('');
  // Signed-in customers: prefill from the account (/customer/me) and link the order to it.
  const auth = useAuth();
  const prefilledFor = useRef<number | null>(null);
  useEffect(() => {
    const c = auth.customer;
    if (auth.status !== 'authenticated' || !c || prefilledFor.current === c.id) return;
    prefilledFor.current = c.id;
    setReceiverName((v) => v || c.name);
    setReceiverPhone((v) => v || localSaudiPhone(c.phone));
    setReceiverEmail((v) => v || c.email || '');
    const a = c.addresses?.find((x) => x.is_default) ?? c.addresses?.[0];
    if (a) {
      setStreet((v) => v || a.street || '');
      setBuilding((v) => v || a.building || '');
      if (a.city) setCity(a.city);
      const wanted = (a.district || '').trim().toLowerCase();
      const d = RIYADH_DISTRICTS.find(
        (x) => x.id === wanted || x.name.en.toLowerCase() === wanted || x.name.ar === (a.district || '').trim()
      );
      if (d) setDistrict((v) => v || d.id);
      if (a.notes) setDeliveryNotes((v) => v || a.notes || '');
    }
  }, [auth.status, auth.customer]);

  const [validationErrors, setValidationErrors] = useState<{
    receiverName?: string;
    receiverPhone?: string;
    receiverEmail?: string;
    address?: string;
  }>({});

  const deliveryMethod = deliveryMethods.find((m) => m.id === selectedDeliveryMethod) ?? deliveryMethods[0];

  if (cart.length === 0 && !isSubmitting) {
    return (
      <div className="bg-[#F7F7F5] min-h-[75vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-neutral-200 text-center shadow-xs">
          <div className="w-16 h-16 bg-neutral-100 text-neutral-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900 mb-2">
            {isAr ? 'سلة التسوق فارغة' : 'Your Cart is Empty'}
          </h2>
          <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
            {isAr
              ? 'يرجى اختيار قطع الكنب أو الستائر والمقاسات المفضلة أولاً.'
              : 'Please add your preferred sofas or curtains before proceeding to checkout.'}
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 bg-[#0B2345] hover:bg-[#071A35] text-white px-6 py-3 rounded-lg text-xs font-bold transition-all shadow-xs"
          >
            <span>{isAr ? 'استعراض الكنب والستائر' : 'Browse Sofas & Curtains'}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const totalItemsCount = cart.reduce((s, i) => s + i.quantity, 0);
  const checkoutUnavailable = checkoutSettingsStatus !== 'loading' && paymentMethods.length === 0;

  const handlePlaceOrder = async () => {
    const errors: typeof validationErrors = {};
    if (!receiverName.trim()) {
      errors.receiverName = isAr ? 'يرجى إدخال اسم المستلم' : 'Please enter the receiver name';
    }
    const cleanPhone = receiverPhone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 8) {
      errors.receiverPhone = isAr ? 'يرجى إدخال رقم هاتف صالح' : 'Please enter a valid phone number';
    }
    if (receiverEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(receiverEmail.trim())) {
      errors.receiverEmail = isAr ? 'البريد الإلكتروني غير صالح' : 'Please enter a valid email or leave it empty';
    }
    if (!street.trim() || !city.trim()) {
      errors.address = isAr ? 'يرجى إدخال عنوان التوصيل' : 'Please enter the delivery address';
    }
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      document
        .getElementById(errors.address ? 'checkout-address-section' : 'checkout-receiver-section')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (!payment) {
      setSubmitError(isAr ? 'الدفع غير متاح حالياً. حاول لاحقاً.' : 'Checkout is unavailable right now. Please try again later.');
      return;
    }

    setValidationErrors({});
    setSubmitError('');
    setIsSubmitting(true);
    if (!idempotencyKey.current) {
      idempotencyKey.current =
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `sofalora-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }

    const notes = [leaveAtDoor ? 'Leave at my door' : '', deliveryNotes.trim()].filter(Boolean).join(' | ');
    const districtObj = RIYADH_DISTRICTS.find((d) => d.id === district);
    const [firstName, ...rest] = receiverName.trim().split(/\s+/);

    try {
      const order = await createOrder({
        customer: {
          firstName,
          lastName: rest.join(' '),
          email: receiverEmail.trim(),
          phone: receiverPhone.trim()
        },
        deliveryAddress: {
          building: building.trim(),
          street: street.trim(),
          district: districtObj ? districtObj.name.en : '',
          city: city.trim(),
          additionalInstructions: notes
        },
        deliveryMethod: deliveryMethod?.id,
        paymentMethod: payment as PaymentMethodType,
        promoCode: appliedPromo?.code,
        notes,
        idempotencyKey: idempotencyKey.current
      });
      idempotencyKey.current = '';
      navigate(`/order-confirmation?orderId=${encodeURIComponent(order.id)}`);
    } catch (err) {
      setSubmitError(
        (err as Error)?.message ||
          (isAr ? 'تعذر إتمام الطلب. حاول مرة أخرى.' : 'We could not place your order. Please try again.')
      );
      setIsSubmitting(false);
    }
  };

  const inputClass = (hasError?: boolean) =>
    `w-full bg-white border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#0B2345] focus:border-[#0B2345] ${
      hasError ? 'border-red-400' : 'border-neutral-300'
    }`;

  return (
    <div className="bg-[#F7F7F5] min-h-screen pb-16 font-sans">
      {/* Secure Checkout Header Bar */}
      <div className="bg-[#FAF9F6] border-b border-[#E6E2D9] sticky top-0 z-30 shadow-xs backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <Link
            href="/cart"
            className="text-xs font-bold text-[#101828] hover:text-[#0B2345] flex items-center gap-1.5 transition-colors"
          >
            <ArrowIcon className="w-4 h-4 text-[#0B2345]" />
            <span>{isAr ? 'العودة إلى السلة' : 'Return to Cart'}</span>
          </Link>

          <div className="flex items-center gap-2 text-[#101828] font-bold text-xs sm:text-sm tracking-wide">
            <div className="w-6 h-6 rounded-full bg-[#F3F1EB] border border-[#DDD8CD] flex items-center justify-center text-[#0B2345]">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <span>{isAr ? 'إتمام الطلب' : 'Secure Checkout'}</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setLanguage(isAr ? 'en' : 'ar')}
              className="text-[11px] font-bold text-[#101828] border border-[#D5CEC0] rounded-md px-2.5 py-1 hover:bg-[#E6E2D9]/50 transition-colors"
            >
              {isAr ? 'English' : 'العربية'}
            </button>
            <Link href="/" className="group flex items-center" aria-label="Sofalora">
              <BrandLogo size="sm" hideTaglineOnMobile />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 space-y-4">
            {/* CARD 1: Receiver */}
            <div
              id="checkout-receiver-section"
              className={`bg-white rounded-xl border p-5 shadow-2xs space-y-3 ${
                validationErrors.receiverName || validationErrors.receiverPhone || validationErrors.receiverEmail
                  ? 'border-red-400'
                  : 'border-neutral-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <h2 className="text-sm font-bold text-neutral-900">
                  {isAr ? 'من سيستلم هذا الطلب؟' : 'Who will receive this order?'}
                </h2>
              </div>
              {auth.status === 'authenticated' && auth.customer ? (
                <p id="checkout-account-note" data-signed-in="true" className="text-[11px] text-[#2A7531] bg-[#ECFDF3] border border-[#2A7531]/20 rounded-lg px-3 py-2">
                  {isAr
                    ? `مسجّل الدخول باسم ${auth.customer.name} — سيُحفظ هذا الطلب في حسابك.`
                    : `Signed in as ${auth.customer.name} — this order will be saved to your account.`}
                </p>
              ) : auth.loginEnabled ? (
                <p id="checkout-account-note" data-signed-in="false" className="text-[11px] text-neutral-600 bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2">
                  {isAr ? 'لديك حساب؟ ' : 'Have an account? '}
                  <Link href="/login?next=%2Fcheckout" className="font-bold text-[#0B2345] hover:underline">
                    {isAr ? 'سجّل الدخول' : 'Sign in'}
                  </Link>
                  {isAr ? ' لتعبئة بياناتك وحفظ الطلب في حسابك، أو أكمل كضيف.' : ' to fill in your details and save this order to your account — or continue as a guest.'}
                </p>
              ) : null}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label className="block">
                  <span className="block text-[11px] text-neutral-600 mb-1">{isAr ? 'الاسم الكامل' : 'Full name'} *</span>
                  <input
                    id="checkout-name"
                    type="text"
                    autoComplete="name"
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                    className={inputClass(!!validationErrors.receiverName)}
                  />
                  {validationErrors.receiverName && (
                    <span className="text-[10px] text-red-600 font-semibold">{validationErrors.receiverName}</span>
                  )}
                </label>
                <label className="block">
                  <span className="block text-[11px] text-neutral-600 mb-1">{isAr ? 'رقم الجوال' : 'Mobile number'} *</span>
                  <input
                    id="checkout-phone"
                    type="tel"
                    dir="ltr"
                    autoComplete="tel"
                    placeholder="+966 5X XXX XXXX"
                    value={receiverPhone}
                    onChange={(e) => setReceiverPhone(e.target.value)}
                    className={`${inputClass(!!validationErrors.receiverPhone)} font-mono`}
                  />
                  {validationErrors.receiverPhone && (
                    <span className="text-[10px] text-red-600 font-semibold">{validationErrors.receiverPhone}</span>
                  )}
                </label>
                <label className="block sm:col-span-2">
                  <span className="block text-[11px] text-neutral-600 mb-1">
                    {isAr ? 'البريد الإلكتروني (اختياري)' : 'Email (optional)'}
                  </span>
                  <input
                    id="checkout-email"
                    type="email"
                    dir="ltr"
                    autoComplete="email"
                    value={receiverEmail}
                    onChange={(e) => setReceiverEmail(e.target.value)}
                    className={inputClass(!!validationErrors.receiverEmail)}
                  />
                  {validationErrors.receiverEmail && (
                    <span className="text-[10px] text-red-600 font-semibold">{validationErrors.receiverEmail}</span>
                  )}
                </label>
              </div>
              <p className="text-[11px] text-neutral-500">
                {isAr
                  ? 'سنستخدم رقم الجوال ورقم الطلب لتتبع طلبك.'
                  : 'Your mobile number and order number are used to track your order.'}
              </p>
            </div>

            {/* CARD 2: Address */}
            <div
              id="checkout-address-section"
              className={`bg-white rounded-xl border p-5 shadow-2xs space-y-3 ${
                validationErrors.address ? 'border-red-400' : 'border-neutral-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700 shrink-0">
                  <Home className="w-4 h-4" />
                </div>
                <h2 className="text-sm font-bold text-neutral-900">{isAr ? 'عنوان التوصيل' : 'Delivery address'}</h2>
              </div>
              {validationErrors.address && (
                <p className="text-[11px] text-red-600 font-semibold">{validationErrors.address}</p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label className="block">
                  <span className="block text-[11px] text-neutral-600 mb-1">{isAr ? 'المدينة' : 'City'} *</span>
                  <input id="checkout-city" type="text" value={city} onChange={(e) => setCity(e.target.value)} className={inputClass()} />
                </label>
                <label className="block">
                  <span className="block text-[11px] text-neutral-600 mb-1">{isAr ? 'الحي' : 'District'}</span>
                  <select id="checkout-district" value={district} onChange={(e) => setDistrict(e.target.value)} className={inputClass()}>
                    <option value="">{isAr ? 'اختر الحي' : 'Select district'}</option>
                    {RIYADH_DISTRICTS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name[language]}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="block text-[11px] text-neutral-600 mb-1">{isAr ? 'الشارع' : 'Street'} *</span>
                  <input
                    id="checkout-street"
                    type="text"
                    autoComplete="street-address"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className={inputClass(!!validationErrors.address && !street.trim())}
                  />
                </label>
                <label className="block">
                  <span className="block text-[11px] text-neutral-600 mb-1">{isAr ? 'رقم المبنى / الفيلا' : 'Building / villa no.'}</span>
                  <input id="checkout-building" type="text" value={building} onChange={(e) => setBuilding(e.target.value)} className={inputClass()} />
                </label>
                <label className="block sm:col-span-2">
                  <span className="block text-[11px] text-neutral-600 mb-1">{isAr ? 'ملاحظات التوصيل' : 'Delivery notes'}</span>
                  <textarea
                    id="checkout-notes"
                    rows={2}
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    className={inputClass()}
                  />
                </label>
              </div>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-800">
                <input
                  type="checkbox"
                  checked={leaveAtDoor}
                  onChange={(e) => setLeaveAtDoor(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0B2345] border-neutral-300 focus:ring-[#0B2345]"
                />
                <DoorClosed className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>{isAr ? 'اتركه عند الباب' : 'Leave at my door'}</span>
              </label>
            </div>

            {/* CARD 3: Shipment */}
            <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-2xs space-y-3">
              <div className="text-xs font-bold text-neutral-900">
                {isAr
                  ? `الشحنة (${totalItemsCount} عناصر)`
                  : `Shipment (${totalItemsCount} item${totalItemsCount > 1 ? 's' : ''})`}
              </div>
              <div className="space-y-3 divide-y divide-neutral-100">
                {cart.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3.5">
                    <div className="relative w-16 h-18 sm:w-20 sm:h-22 rounded-lg bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0">
                      {item.product.image && (
                        <img src={item.product.image} alt={item.product.name[language]} className="w-full h-full object-cover" />
                      )}
                      <span className="absolute bottom-1 end-1 bg-neutral-900/85 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        x{item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs sm:text-sm font-semibold text-neutral-900 line-clamp-2 leading-snug">
                        {item.product.name[language]}
                      </h3>
                      <div className="text-[11px] text-neutral-500 mt-0.5 flex items-center gap-2">
                        {item.selectedColor && <span>{item.selectedColor.name[language]}</span>}
                        {item.customDimensions ? (
                          <span>
                            • {item.customDimensions.width}m × {item.customDimensions.height}m
                          </span>
                        ) : item.selectedSize ? (
                          <span>• {item.selectedSize.label[language]}</span>
                        ) : null}
                      </div>
                      <div className="text-xs font-bold text-neutral-900 mt-1">{formatPrice(item.unitPrice * item.quantity)}</div>
                    </div>
                  </div>
                ))}
              </div>
              {deliveryMethod && (
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-neutral-700">
                    <Truck className="w-4 h-4 text-[#0B2345]" />
                    <span>{deliveryMethod.name[language]}</span>
                  </div>
                  <span className="text-neutral-500">{deliveryMethod.estimatedTime[language]}</span>
                </div>
              )}
            </div>

            {/* CARD 4: Payment (only methods the API accepts) */}
            <div id="checkout-payment-section" className="bg-white rounded-xl border border-neutral-200 p-5 shadow-2xs space-y-3">
              <h2 className="text-sm font-bold text-neutral-900">{isAr ? 'طريقة الدفع' : 'Pay with'}</h2>
              {checkoutSettingsStatus === 'loading' ? (
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isAr ? 'جاري تحميل طرق الدفع...' : 'Loading payment methods...'}</span>
                </div>
              ) : checkoutUnavailable ? (
                <div className="flex items-center gap-2 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>
                    {isAr
                      ? 'الدفع غير متاح حالياً. يرجى المحاولة لاحقاً.'
                      : 'Checkout is unavailable right now. Please try again later.'}
                  </span>
                </div>
              ) : (
                <div className="space-y-2">
                  {paymentMethods.map((id) => {
                    const label = PAYMENT_LABELS[id] ?? { en: id, ar: id, hintEn: '', hintAr: '' };
                    const active = payment === id;
                    const Icon = id === 'cod' ? Banknote : CreditCard;
                    return (
                      <button
                        key={id}
                        id={`checkout-pay-${id}`}
                        type="button"
                        onClick={() => setSelectedPayment(id)}
                        className={`w-full flex items-center justify-between gap-3 p-3.5 rounded-lg border text-start transition-colors ${
                          active ? 'border-[#0B2345] bg-[#F3F6FB]' : 'border-neutral-200 hover:bg-neutral-50'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-[#0B2345] shrink-0" />
                          <span>
                            <span className="block text-xs font-bold text-neutral-900">{isAr ? label.ar : label.en}</span>
                            {(isAr ? label.hintAr : label.hintEn) && (
                              <span className="block text-[11px] text-neutral-500">{isAr ? label.hintAr : label.hintEn}</span>
                            )}
                          </span>
                        </span>
                        <span
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            active ? 'bg-[#0B2345] border-[#0B2345] text-white' : 'border-neutral-300'
                          }`}
                        >
                          {active && <Check className="w-3 h-3" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Summary */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-16">
            <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <h2 className="text-sm font-bold text-neutral-900">{isAr ? 'ملخص الطلب' : 'Order summary'}</h2>
                <span className="text-xs text-neutral-500">
                  {totalItemsCount} {isAr ? 'عناصر' : 'item' + (totalItemsCount > 1 ? 's' : '')}
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-neutral-700">
                <div className="flex justify-between">
                  <span>{isAr ? 'المجموع الفرعي' : 'Subtotal'}</span>
                  <span id="checkout-subtotal" className="font-bold text-neutral-900">{formatPrice(cartSubtotal)}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>
                      {isAr ? 'خصم الكوبون' : 'Promo Discount'} ({appliedPromo?.code})
                    </span>
                    <span>-{formatPrice(promoDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>{isAr ? 'رسوم التوصيل' : 'Shipping'}</span>
                  <span id="checkout-shipping" className="font-bold text-emerald-700">
                    {shippingFee === 0 ? (isAr ? 'مجاناً' : 'FREE') : formatPrice(shippingFee)}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-200 flex items-baseline justify-between">
                <span className="text-sm font-bold text-neutral-900">{isAr ? 'الإجمالي' : 'Total'}</span>
                <span id="checkout-total" className="text-xl font-black text-neutral-900">{formatPrice(grandTotal)}</span>
              </div>
              <p className="text-[11px] text-neutral-500 -mt-2">
                {isAr
                  ? `شامل ضريبة القيمة المضافة (${formatPrice(vatAmount)})`
                  : `Includes VAT (${formatPrice(vatAmount)})`}
              </p>

              {submitError && (
                <div id="checkout-error" className="flex items-start gap-2 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="pt-1">
                <button
                  id="checkout-place-order"
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting || checkoutUnavailable || checkoutSettingsStatus === 'loading'}
                  className={`w-full py-3.5 px-4 rounded-lg font-bold text-sm tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 ${
                    isSubmitting || checkoutUnavailable || checkoutSettingsStatus === 'loading'
                      ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                      : 'bg-[#0B2345] hover:bg-[#071A35] active:bg-[#071A35] text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{isAr ? 'جاري تأكيد الطلب...' : 'Placing order...'}</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>{isAr ? 'تأكيد الطلب' : 'Place Order'}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-3 border-t border-neutral-100 space-y-2 text-[11px] text-neutral-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0B2345]" />
                  <span>{isAr ? 'لا حاجة لإنشاء حساب' : 'No account needed — guest checkout'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-[#0B2345]" />
                  <span>{isAr ? 'تتبع طلبك برقم الطلب ورقم الجوال' : 'Track with your order number and mobile'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
