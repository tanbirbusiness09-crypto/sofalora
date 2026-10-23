import React, { useState } from 'react';
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
  CreditCard,
  Building,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Truck,
  Heart,
  Edit2,
  ChevronRight,
  ChevronLeft,
  X
} from 'lucide-react';
import { RIYADH_DISTRICTS } from '../data/riyadhDistricts';
import { BrandLogo } from '../components/UI/BrandLogo';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    appliedPromo,
    promoDiscount,
    selectedDeliveryMethod,
    shippingFee,
    vatAmount,
    grandTotal,
    createOrder,
    language,
    direction,
    setLanguage,
    formatPrice
  } = useShop();
  const { navigate } = useRouter();

  const ArrowIcon = direction === 'rtl' ? ArrowRight : ArrowLeft;
  const ChevronIcon = direction === 'rtl' ? ChevronLeft : ChevronRight;

  // Address & Receiver state matching Noon screenshot (Image 2)
  const [receiverName, setReceiverName] = useState('Tanbir Shuvo');
  const [receiverPhone, setReceiverPhone] = useState('+966-50-8702234');
  const [isEditingReceiver, setIsEditingReceiver] = useState(false);

  // Delivery Address
  const [addressLine, setAddressLine] = useState('As Suwaidi, 9112 - Al Radifa - As Suwaidi - Riyadh');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [tempStreet, setTempStreet] = useState('Al Radifa St, Villa 14');
  const [tempDistrict, setTempDistrict] = useState('as-suwaidi');

  // Delivery Instructions
  const [leaveAtDoor, setLeaveAtDoor] = useState(false);
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Payment Selection: 'saved_card' | 'new_card' | 'tabby' | 'tamara' | 'cod' | 'apple_pay'
  const [selectedPayment, setSelectedPayment] = useState<'saved_card' | 'new_card' | 'tabby' | 'tamara' | 'cod' | 'apple_pay'>('saved_card');
  const [savedCardCvv, setSavedCardCvv] = useState('');
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardExpiry, setNewCardExpiry] = useState('');
  const [newCardCvv, setNewCardCvv] = useState('');
  const [newCardHolder, setNewCardHolder] = useState('');

  // Donation to Sanad Children's Cancer Support Association (matching Noon Image 2)
  const [donationAmount, setDonationAmount] = useState<number>(0);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOrderSuccessModal, setShowOrderSuccessModal] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<{
    receiverName?: string;
    receiverPhone?: string;
    addressLine?: string;
    card?: string;
  }>({});

  if (cart.length === 0 && !showOrderSuccessModal) {
    return (
      <div className="bg-[#F7F7F7] min-h-[75vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-neutral-200 text-center shadow-xs">
          <div className="w-16 h-16 bg-neutral-100 text-neutral-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900 mb-2">
            {language === 'ar' ? 'سلة التسوق فارغة' : 'Your Cart is Empty'}
          </h2>
          <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
            {language === 'ar'
              ? 'يرجى اختيار قطع الكنب أو الستائر والمقاسات المفضلة أولاً.'
              : 'Please add your preferred sofas or curtains before proceeding to checkout.'}
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 bg-[#8F3E24] hover:bg-[#7A331D] text-white px-6 py-3 rounded-lg text-xs font-bold transition-all shadow-xs"
          >
            <span>{language === 'ar' ? 'استعراض الكنب والستائر' : 'Browse Sofas & Curtains'}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const finalTotal = grandTotal + donationAmount;
  const installmentAmount = Math.round((finalTotal / 4) * 100) / 100;
  const totalItemsCount = cart.reduce((s, i) => s + i.quantity, 0);

  const handlePlaceOrder = () => {
    const errors: {
      receiverName?: string;
      receiverPhone?: string;
      addressLine?: string;
      card?: string;
    } = {};

    if (!receiverName.trim()) {
      errors.receiverName = language === 'ar' ? 'يرجى إدخال اسم المستلم' : 'Please enter receiver name';
    }

    const cleanPhone = receiverPhone.replace(/[^0-9]/g, '');
    if (!receiverPhone.trim() || cleanPhone.length < 8) {
      errors.receiverPhone = language === 'ar' ? 'يرجى إدخال رقم هاتف سعودي صالح' : 'Please enter a valid phone number';
    }

    if (!addressLine.trim()) {
      errors.addressLine = language === 'ar' ? 'يرجى تحديد عنوان التوصيل' : 'Please enter delivery address';
    }

    if (selectedPayment === 'saved_card' && savedCardCvv.length < 3) {
      errors.card = language === 'ar' ? 'يرجى إدخال رمز الأمان CVV للبطاقة (3 أرقام)' : 'Please enter card CVV (3 digits)';
    } else if (selectedPayment === 'new_card') {
      if (newCardNumber.replace(/\s/g, '').length < 15 || newCardCvv.length < 3) {
        errors.card = language === 'ar' ? 'يرجى إكمال بيانات البطاقة بشكل صحيح' : 'Please complete card details correctly';
      }
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      // Smooth scroll to the first invalid field
      if (errors.addressLine) {
        document.getElementById('checkout-address-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (errors.receiverName || errors.receiverPhone) {
        document.getElementById('checkout-receiver-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setIsEditingReceiver(true);
      } else if (errors.card) {
        document.getElementById('checkout-payment-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setValidationErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const notes = [
        leaveAtDoor ? 'Leave at my door' : '',
        deliveryNotes,
        donationAmount > 0 ? `Sanad Children Charity Donation: SAR ${donationAmount}` : ''
      ].filter(Boolean).join(' | ');

      const order = createOrder({
        customer: {
          firstName: receiverName.split(' ')[0] || 'Customer',
          lastName: receiverName.split(' ').slice(1).join(' ') || 'Riyadh',
          email: 'customer@sofalora.com',
          phone: receiverPhone
        },
        deliveryAddress: {
          building: 'Villa 14',
          street: addressLine,
          district: tempDistrict,
          city: 'Riyadh',
          postalCode: '12384',
          additionalInstructions: notes
        },
        deliveryMethod: selectedDeliveryMethod,
        paymentMethod: selectedPayment === 'apple_pay' ? 'apple_pay' : selectedPayment === 'cod' ? 'cod' : 'card',
        notes
      });

      setConfirmedOrderId(order.id);
      setIsSubmitting(false);
      setShowOrderSuccessModal(true);
    }, 900);
  };

  const isCardReady =
    selectedPayment === 'saved_card'
      ? savedCardCvv.length >= 3
      : selectedPayment === 'new_card'
      ? newCardNumber.length >= 15 && newCardCvv.length >= 3
      : true;

  return (
    <div className="bg-[#F7F7F7] min-h-screen pb-16 font-sans">
      
      {/* 1. Atelier Luxury Secure Checkout Header Bar */}
      <div className="bg-[#FBF8F3] border-b border-[#E8DCCD] sticky top-0 z-30 shadow-xs backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          {/* Left: Return to Cart */}
          <Link
            href="/cart"
            className="text-xs font-bold text-[#1B211D] hover:text-[#8F3E24] flex items-center gap-1.5 transition-colors"
          >
            <ArrowIcon className="w-4 h-4 text-[#8F3E24]" />
            <span>{language === 'ar' ? 'العودة إلى السلة' : 'Return to Cart'}</span>
          </Link>

          {/* Center: Secure Checkout Lock */}
          <div className="flex items-center gap-2 text-[#1B211D] font-bold text-xs sm:text-sm tracking-wide">
            <div className="w-6 h-6 rounded-full bg-[#F4EDE4] border border-[#DFD2C2] flex items-center justify-center text-[#8F3E24]">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <span>{language === 'ar' ? 'بوابة الدفع الآمن والمشفر' : 'Secure & Encrypted Checkout'}</span>
          </div>

          {/* Right: Site Logo + Lang Switcher */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="text-[11px] font-bold text-[#1B211D] border border-[#D8C8B6] rounded-md px-2.5 py-1 hover:bg-[#E8DCCD]/50 transition-colors"
            >
              {language === 'ar' ? 'English' : 'العربية'}
            </button>
            <Link href="/" className="group flex items-center" aria-label="Sofalora">
              <BrandLogo size="sm" hideTaglineOnMobile />
            </Link>
          </div>

        </div>
      </div>

      {/* Main Body - 2 Columns (Image 2 layout) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* LEFT COLUMN: 5 Noon-Style Cards (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* CARD 1: Deliver to Home (Image 2) */}
            <div id="checkout-address-section" className={`bg-white rounded-xl border p-5 shadow-2xs transition-colors ${
              validationErrors.addressLine ? 'border-red-400 bg-red-50/20' : 'border-neutral-200'
            }`}>
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-neutral-100">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700 shrink-0 mt-0.5">
                    <Home className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-neutral-900">
                      {language === 'ar' ? 'التوصيل للمنزل' : 'Deliver to Home'}
                    </h2>
                    <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                      {addressLine}
                    </p>
                    {validationErrors.addressLine && (
                      <p className="text-[11px] text-red-600 font-semibold mt-1">
                        {validationErrors.addressLine}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEditingAddress(!isEditingAddress)}
                  className="text-xs font-bold text-[#8F3E24] hover:text-[#7A331D] hover:underline shrink-0"
                >
                  {language === 'ar' ? 'تعديل العنوان' : 'Edit Address'}
                </button>
              </div>

              {/* Inline Address Editor Modal / Drawer */}
              {isEditingAddress && (
                <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 mt-4 space-y-3 text-xs">
                  <div className="font-bold text-neutral-900">
                    {language === 'ar' ? 'تعديل العنوان الوطني بالرياض' : 'Update Riyadh National Address'}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-neutral-600 mb-1">
                        {language === 'ar' ? 'الحي' : 'District'}
                      </label>
                      <select
                        value={tempDistrict}
                        onChange={(e) => setTempDistrict(e.target.value)}
                        className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs"
                      >
                        {RIYADH_DISTRICTS.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name[language]} ({d.zone})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] text-neutral-600 mb-1">
                        {language === 'ar' ? 'الشارع ورقم المبنى' : 'Street & Building #'}
                      </label>
                      <input
                        type="text"
                        value={tempStreet}
                        onChange={(e) => setTempStreet(e.target.value)}
                        className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingAddress(false)}
                      className="px-3 py-1.5 bg-neutral-200 text-neutral-700 rounded-lg text-xs font-semibold"
                    >
                      {language === 'ar' ? 'إلغاء' : 'Cancel'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const distObj = RIYADH_DISTRICTS.find((d) => d.id === tempDistrict);
                        setAddressLine(`${distObj?.name[language] || 'Riyadh'}, ${tempStreet} - Riyadh, Saudi Arabia`);
                        setIsEditingAddress(false);
                      }}
                      className="px-4 py-1.5 bg-[#8F3E24] hover:bg-[#7A331D] text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      {language === 'ar' ? 'حفظ العنوان' : 'Save Address'}
                    </button>
                  </div>
                </div>
              )}

              {/* Subcards Grid: Receiver & Delivery Instructions (Image 2) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                
                {/* Receiver Info Subcard */}
                <div
                  id="checkout-receiver-section"
                  className={`p-3.5 bg-neutral-50 rounded-xl border space-y-2 text-xs transition-colors ${
                    validationErrors.receiverName || validationErrors.receiverPhone
                      ? 'border-red-400 bg-red-50/20'
                      : 'border-neutral-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-neutral-600">
                      {language === 'ar' ? 'من سيستلم هذا الطلب؟' : 'Who will receive this order?'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsEditingReceiver(!isEditingReceiver)}
                      className="text-[#8F3E24] hover:text-[#7A331D] font-bold text-[11px] hover:underline"
                    >
                      {language === 'ar' ? 'تغيير المستلم' : 'Change receiver'}
                    </button>
                  </div>

                  {validationErrors.receiverName && (
                    <p className="text-[10px] text-red-600 font-semibold">{validationErrors.receiverName}</p>
                  )}
                  {validationErrors.receiverPhone && (
                    <p className="text-[10px] text-red-600 font-semibold">{validationErrors.receiverPhone}</p>
                  )}

                  {isEditingReceiver ? (
                    <div className="space-y-2 pt-1">
                      <input
                        type="text"
                        value={receiverName}
                        onChange={(e) => setReceiverName(e.target.value)}
                        placeholder="Full Name"
                        className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs"
                      />
                      <input
                        type="text"
                        value={receiverPhone}
                        onChange={(e) => setReceiverPhone(e.target.value)}
                        placeholder="+966-50-XXXXXXX"
                        className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setIsEditingReceiver(false)}
                        className="px-3 py-1 bg-neutral-900 text-white rounded text-[11px] font-bold"
                      >
                        {language === 'ar' ? 'تأكيد' : 'Done'}
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2.5 text-neutral-800 pt-1">
                      <Phone className="w-4 h-4 text-neutral-500 shrink-0" />
                      <div>
                        <div className="font-bold">{receiverName}</div>
                        <div className="text-neutral-500 font-mono text-[11px]">{receiverPhone}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Delivery Instructions Subcard */}
                <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2 text-xs">
                  <div className="font-semibold text-neutral-600">
                    {language === 'ar' ? 'تعليمات التوصيل والتركيب' : 'Delivery Instructions'}
                  </div>
                  <label className="flex items-center justify-between cursor-pointer pt-1">
                    <div className="flex items-center gap-2 text-neutral-800">
                      <DoorClosed className="w-4 h-4 text-neutral-500 shrink-0" />
                      <span>{language === 'ar' ? 'اتركه عند باب الفيلا' : 'Leave at my door'}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={leaveAtDoor}
                      onChange={(e) => setLeaveAtDoor(e.target.checked)}
                      className="w-4 h-4 rounded text-[#8F3E24] border-neutral-300 focus:ring-[#8F3E24]"
                    />
                  </label>
                </div>

              </div>
            </div>

            {/* CARD 2: Shipment 1 (X items) (Image 2) */}
            <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-2xs space-y-3">
              <div className="text-xs font-bold text-neutral-900">
                {language === 'ar' ? `الشحنة الأولى (${totalItemsCount} عناصر)` : `Shipment 1 (${totalItemsCount} item${totalItemsCount > 1 ? 's' : ''})`}
              </div>

              {/* Items row matching Image 2 */}
              <div className="space-y-3 divide-y divide-neutral-100">
                {cart.map((item) => {
                  const itemPrice = item.customDimensions?.estimatedTotal || (item.product.price + (item.selectedSize?.priceModifier || 0));

                  return (
                    <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3.5">
                      {/* Image with x1 badge */}
                      <div className="relative w-16 h-18 sm:w-20 sm:h-22 rounded-lg bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name[language]}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 end-1 bg-neutral-900/85 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                          x{item.quantity}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs sm:text-sm font-semibold text-neutral-900 line-clamp-2 leading-snug">
                          {item.product.name[language]}
                        </h3>
                        <div className="text-[11px] text-neutral-500 mt-0.5 flex items-center gap-2">
                          {item.selectedColor && (
                            <span>{item.selectedColor.name[language]}</span>
                          )}
                          {item.customDimensions ? (
                            <span>• {item.customDimensions.width}m × {item.customDimensions.height}m</span>
                          ) : item.selectedSize ? (
                            <span>• {item.selectedSize.label[language]}</span>
                          ) : null}
                        </div>
                        <div className="text-xs font-bold text-neutral-900 mt-1">
                          {formatPrice(itemPrice * item.quantity)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Delivery Guarantee with atelier express badge */}
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <div className="text-neutral-700">
                  {language === 'ar' ? 'الاستلام بحلول ' : 'Get it by '}
                  <strong className="text-neutral-900">Sun, Sep 20</strong>
                </div>
                <span className="bg-[#8F3E24] text-white px-2.5 py-0.5 rounded-full font-bold text-[10px] tracking-wider uppercase shadow-2xs">
                  {language === 'ar' ? 'توصيل وتركيب سريع' : 'EXPRESS ATELIER'}
                </span>
              </div>
            </div>

            {/* CARD 3: Atelier Rewards & Partner points */}
            <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-2xs space-y-3">
              <div className="text-xs font-bold text-neutral-900">
                {language === 'ar' ? 'نقاط مكافآت الأتيليه والشراكات المصرفية' : 'Atelier Rewards & Partner Points'}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Qitaf Points */}
                <div className="p-3 bg-neutral-50 hover:bg-neutral-100 rounded-lg border border-neutral-200 flex items-center justify-between cursor-pointer transition-colors text-xs">
                  <div>
                    <div className="font-bold text-purple-900">Qitaf Points قطاف</div>
                    <div className="text-[11px] text-neutral-500">{language === 'ar' ? 'اربط حسابك واكسب' : 'Link your Qitaf ac...'}</div>
                  </div>
                  <ChevronIcon className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                </div>

                {/* Mokafaa Points */}
                <div className="p-3 bg-neutral-50 hover:bg-neutral-100 rounded-lg border border-neutral-200 flex items-center justify-between cursor-pointer transition-colors text-xs">
                  <div>
                    <div className="font-bold text-blue-900">Mokafaa مكافأة</div>
                    <div className="text-[11px] text-neutral-500">{language === 'ar' ? 'اربط بنك الراجحي' : 'Link your Mokafa...'}</div>
                  </div>
                  <ChevronIcon className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                </div>

                {/* Akthr Points */}
                <div className="p-3 bg-neutral-50 hover:bg-neutral-100 rounded-lg border border-neutral-200 flex items-center justify-between cursor-pointer transition-colors text-xs">
                  <div>
                    <div className="font-bold text-red-900">Akthr Points أكثر</div>
                    <div className="text-[11px] text-neutral-500">{language === 'ar' ? 'نقاط بنك الإنماء' : 'Link your Akthr ac...'}</div>
                  </div>
                  <ChevronIcon className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                </div>
              </div>

              {/* Quara Credit Promo */}
              <div className="p-2.5 bg-neutral-900 text-white rounded-lg flex items-center justify-between text-xs cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#8F3E24] flex items-center justify-center font-bold text-[10px]">
                    Q
                  </span>
                  <span className="font-semibold">
                    {language === 'ar' ? 'احصل على تمويل حتى ٢٠,٠٠٠ ر.س مع كوارا للتمويل' : 'Get up to SAR 20,000 credits with Quara'}
                  </span>
                </div>
                <ChevronIcon className="w-3.5 h-3.5 text-neutral-400" />
              </div>
            </div>

            {/* CARD 4: Pay with (Image 2 exact methods) */}
            <div
              id="checkout-payment-section"
              className={`bg-white rounded-xl border p-5 shadow-2xs space-y-3 transition-colors ${
                validationErrors.card ? 'border-red-400 bg-red-50/10' : 'border-neutral-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-neutral-900">
                  {language === 'ar' ? 'طريقة الدفع' : 'Pay with'}
                </div>
                {validationErrors.card && (
                  <span className="text-[11px] text-red-600 font-semibold">{validationErrors.card}</span>
                )}
              </div>

              <div className="space-y-2.5">
                {/* Method 1: Debit/Credit Card with Saved Card & CVV (Image 2) */}
                <div className={`p-4 rounded-xl border transition-all ${
                  selectedPayment === 'saved_card' || selectedPayment === 'new_card'
                    ? 'border-[#8F3E24] bg-[#FBF8F3] ring-1 ring-[#8F3E24]/30'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="checkout_payment"
                        checked={selectedPayment === 'saved_card' || selectedPayment === 'new_card'}
                        onChange={() => setSelectedPayment('saved_card')}
                        className="w-4 h-4 text-[#8F3E24] focus:ring-[#8F3E24]"
                      />
                      <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
                        <CreditCard className="w-4 h-4 text-neutral-700" />
                        <span>{language === 'ar' ? 'بطاقة مدى / البطاقة الائتمانية' : 'Debit/Credit Card'}</span>
                      </div>
                    </label>

                    <button
                      type="button"
                      onClick={() => setSelectedPayment(selectedPayment === 'new_card' ? 'saved_card' : 'new_card')}
                      className="text-xs font-bold text-[#8F3E24] hover:text-[#7A331D] hover:underline"
                    >
                      {selectedPayment === 'new_card' ? (language === 'ar' ? 'البطاقة المحفوظة' : 'Saved Card') : (language === 'ar' ? 'إضافة / تغيير' : 'Add/Change')}
                    </button>
                  </div>

                  {/* Saved Card Option (matching Image 2: green mada card •••• 4898 with CVV input) */}
                  {selectedPayment === 'saved_card' && (
                    <div className="mt-3 ps-7 flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2 py-1 bg-emerald-600 text-white rounded font-mono font-bold text-xs tracking-wider">
                          mada
                        </span>
                        <span className="font-mono text-xs font-bold text-neutral-800">
                          •••• 4898
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="text-[11px] text-neutral-500 font-semibold">CVV</label>
                        <input
                          type="password"
                          maxLength={4}
                          placeholder="CVV"
                          value={savedCardCvv}
                          onChange={(e) => setSavedCardCvv(e.target.value.replace(/\D/g, ''))}
                          className="w-20 bg-white border border-neutral-300 rounded px-2 py-1 text-xs text-center font-mono focus:outline-none focus:ring-1 focus:ring-[#8F3E24] focus:border-[#8F3E24]"
                        />
                      </div>
                    </div>
                  )}

                  {/* New Card Form */}
                  {selectedPayment === 'new_card' && (
                    <div className="mt-3 ps-7 space-y-2.5 text-xs">
                      <input
                        type="text"
                        placeholder="Card Number (XXXX XXXX XXXX XXXX)"
                        value={newCardNumber}
                        onChange={(e) => setNewCardNumber(e.target.value)}
                        className="w-full bg-white border border-neutral-300 rounded px-3 py-1.5 font-mono focus:outline-none focus:ring-1 focus:ring-[#8F3E24] focus:border-[#8F3E24]"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={newCardExpiry}
                          onChange={(e) => setNewCardExpiry(e.target.value)}
                          className="bg-white border border-neutral-300 rounded px-3 py-1.5 font-mono focus:outline-none focus:ring-1 focus:ring-[#8F3E24] focus:border-[#8F3E24]"
                        />
                        <input
                          type="password"
                          placeholder="CVV"
                          maxLength={4}
                          value={newCardCvv}
                          onChange={(e) => setNewCardCvv(e.target.value)}
                          className="bg-white border border-neutral-300 rounded px-3 py-1.5 font-mono focus:outline-none focus:ring-1 focus:ring-[#8F3E24] focus:border-[#8F3E24]"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Method 2: Tabby (Image 2) */}
                <label className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedPayment === 'tabby'
                    ? 'border-[#8F3E24] bg-[#FBF8F3] ring-1 ring-[#8F3E24]/30'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="checkout_payment"
                      checked={selectedPayment === 'tabby'}
                      onChange={() => setSelectedPayment('tabby')}
                      className="w-4 h-4 text-[#8F3E24] focus:ring-[#8F3E24]"
                    />
                    <span className="font-mono font-bold text-neutral-900 bg-neutral-200 px-2 py-0.5 rounded text-xs">
                      tabby
                    </span>
                    <div>
                      <div className="text-xs font-bold text-neutral-900">Tabby تابي</div>
                      <div className="text-[11px] text-neutral-500">
                        {language === 'ar'
                          ? `ادفع ٤ دفعات بقيمة ${formatPrice(installmentAmount)}`
                          : `Pay in 4 payments of ${formatPrice(installmentAmount)}`}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-semibold">0% Fees</span>
                </label>

                {/* Method 3: Tamara (Image 2) */}
                <label className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedPayment === 'tamara'
                    ? 'border-[#8F3E24] bg-[#FBF8F3] ring-1 ring-[#8F3E24]/30'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="checkout_payment"
                      checked={selectedPayment === 'tamara'}
                      onChange={() => setSelectedPayment('tamara')}
                      className="w-4 h-4 text-[#8F3E24] focus:ring-[#8F3E24]"
                    />
                    <span className="font-mono font-bold text-neutral-900 bg-amber-200 px-2 py-0.5 rounded text-xs">
                      tamara
                    </span>
                    <div>
                      <div className="text-xs font-bold text-neutral-900">Tamara تمارا</div>
                      <div className="text-[11px] text-neutral-500">
                        {language === 'ar'
                          ? `ادفع ٤ دفعات بقيمة ${formatPrice(installmentAmount)}`
                          : `Pay in 4 payments of ${formatPrice(installmentAmount)}`}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-semibold">0% Fees</span>
                </label>

                {/* Method 4: Cash On Delivery / Wireless POS (Image 2) */}
                <label className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedPayment === 'cod'
                    ? 'border-[#8F3E24] bg-[#FBF8F3] ring-1 ring-[#8F3E24]/30'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="checkout_payment"
                      checked={selectedPayment === 'cod'}
                      onChange={() => setSelectedPayment('cod')}
                      className="w-4 h-4 text-[#8F3E24] focus:ring-[#8F3E24]"
                    />
                    <div className="w-7 h-7 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                      💵
                    </div>
                    <div>
                      <div className="text-xs font-bold text-neutral-900">
                        {language === 'ar' ? 'الدفع عند الاستلام / جهاز نقاط البيع' : 'Cash On Delivery / Wireless POS'}
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        {language === 'ar' ? 'ادفع عبر بطاقة مدى مباشرة لفني التركيب' : 'Pay via Mada card upon in-home fitting'}
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* CARD 5: Donate to Sanad Children's Cancer Support (Image 2) */}
            <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-2xs space-y-3">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <h3 className="text-xs font-bold text-neutral-900">
                  {language === 'ar'
                    ? 'التبرع لجمعية سند لدعم الأطفال المرضى بالسرطان'
                    : 'Donate to Sanad Children’s Cancer Support Association'}
                </h3>
              </div>

              <p className="text-[11px] text-neutral-600 leading-relaxed">
                {language === 'ar'
                  ? 'ساهم مع جمعية سند لدعم أطفال السرطان في كفالة طفل مصاب بالسرطان وتوفير الاحتياجات الأساسية مثل الغذاء والكساء والإسكان. مساهمتك ترسم البسمة وتخفف الأعباء المالية عن أسرهم خلال رحلة العلاج. تصريح رقم: 2610050'
                  : 'Contribute with Sanad Children’s Cancer Support Association to sponsor a child with cancer and help provide essential needs such as food, clothing, and housing. Your contribution helps improve the child’s quality of life and ease the financial burden on their family during the treatment journey. Permit: 2610050'}
              </p>

              {/* Quick Donation Chips: 5, 10, 15, 25, 50, 100 */}
              <div className="flex items-center gap-2 flex-wrap pt-1">
                {[5, 10, 15, 25, 50, 100].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setDonationAmount(donationAmount === val ? 0 : val)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                      donationAmount === val
                        ? 'border-[#8F3E24] bg-[#8F3E24] text-white shadow-xs'
                        : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-800'
                    }`}
                  >
                    SAR {val}
                  </button>
                ))}
                {donationAmount > 0 && (
                  <button
                    type="button"
                    onClick={() => setDonationAmount(0)}
                    className="text-[11px] text-neutral-400 hover:text-neutral-700 underline ps-2"
                  >
                    {language === 'ar' ? 'إلغاء التبرع' : 'Clear'}
                  </button>
                )}
              </div>

              <div className="text-[10px] text-neutral-400">
                {language === 'ar'
                  ? '*سيتم إضافة مبلغ التبرع غير القابل للاسترداد إلى إجمالي طلبك.'
                  : '*Non-refundable donation will be added to your order total'}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky Payment Summary matching Noon Image 2 (4 cols) */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-16">
            <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-4 shadow-2xs">
              
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <h2 className="text-sm font-bold text-neutral-900">
                  {language === 'ar' ? 'ملخص الدفع' : 'Payment summary'}
                </h2>
                <span className="text-xs text-neutral-500">
                  {totalItemsCount} {language === 'ar' ? 'عناصر' : 'item' + (totalItemsCount > 1 ? 's' : '')}
                </span>
              </div>

              {/* Breakdown */}
              <div className="space-y-2.5 text-xs text-neutral-700">
                <div className="flex justify-between">
                  <span>{language === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}</span>
                  <span className="font-bold text-neutral-900">{formatPrice(cartSubtotal)}</span>
                </div>

                {promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>{language === 'ar' ? 'خصم الكوبون' : 'Promo Discount'}</span>
                    <span>-{formatPrice(promoDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>{language === 'ar' ? 'رسوم التوصيل والتركيب' : 'Shipping Fee'}</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <span className="line-through text-neutral-400 font-normal">13.00</span>
                    <span>{language === 'ar' ? 'مجاناً' : 'FREE'}</span>
                  </span>
                </div>

                {donationAmount > 0 && (
                  <div className="flex justify-between text-rose-600 font-semibold">
                    <span>{language === 'ar' ? 'تبرع جمعية سند' : 'Sanad Charity Donation'}</span>
                    <span>+{formatPrice(donationAmount)}</span>
                  </div>
                )}
              </div>

              {/* Total Row */}
              <div className="pt-3 border-t border-neutral-200 flex items-baseline justify-between">
                <span className="text-sm font-bold text-neutral-900">
                  {language === 'ar' ? 'الإجمالي' : 'Total'}
                </span>
                <span className="text-xl font-black text-neutral-900">
                  {formatPrice(finalTotal)}
                </span>
              </div>

              {/* Action Button: Enter CVV / Place Order */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className={`w-full py-3.5 px-4 rounded-lg font-bold text-sm tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                      : !isCardReady && selectedPayment === 'saved_card'
                      ? 'bg-neutral-200 hover:bg-neutral-300 text-neutral-700 cursor-pointer'
                      : 'bg-[#8F3E24] hover:bg-[#7A331D] active:bg-[#73531F] text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <span>{language === 'ar' ? 'جاري تأكيد الطلب...' : 'Processing Order...'}</span>
                  ) : !isCardReady && selectedPayment === 'saved_card' ? (
                    <span>{language === 'ar' ? 'أدخل رمز الأمان (CVV)' : 'Enter CVV'}</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>{language === 'ar' ? 'تأكيد الطلب الآن' : 'Place Order'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Security & Guarantees */}
              <div className="pt-3 border-t border-neutral-100 space-y-2 text-[11px] text-neutral-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8F3E24]" />
                  <span>{language === 'ar' ? 'دفع إلكتروني آمن ومشفر بنسبة ١٠٠٪' : '100% Encrypted & Secure Checkout'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-[#8F3E24]" />
                  <span>{language === 'ar' ? 'فريق تركيب مجهز بأجهزة ليزر لضبط الاستواء' : 'Laser In-Home Precision Measurement'}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Order Confirmation Success Modal */}
      {showOrderSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#FBF8F3] text-[#8F3E24] border border-[#DFD2C2] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="text-center space-y-2">
              <span className="bg-[#8F3E24] text-white px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider shadow-2xs">
                {language === 'ar' ? 'معتمد من أتيليه سوفالورا بالرياض' : 'SOFALORA ATELIER VERIFIED'}
              </span>
              <h2 className="text-xl font-bold text-neutral-900 pt-1">
                {language === 'ar' ? 'تم تأكيد طلبك بنجاح!' : 'Order Placed Successfully!'}
              </h2>
              <p className="text-xs text-neutral-500">
                {language === 'ar'
                  ? `رقم الطلب: #${confirmedOrderId} • تم إرسال رسالة SMS إلى ${receiverPhone}`
                  : `Order ID: #${confirmedOrderId} • Confirmation SMS sent to ${receiverPhone}`}
              </p>
            </div>

            <div className="my-5 p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">{language === 'ar' ? 'عنوان التركيب' : 'Installation Address'}</span>
                <span className="font-semibold text-neutral-900 text-end max-w-[220px] truncate">{addressLine}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">{language === 'ar' ? 'موعد الزيارة والتركيب' : 'Fitting Schedule'}</span>
                <span className="font-bold text-emerald-700">Sun, Sep 20 (9:00 AM - 1:00 PM)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">{language === 'ar' ? 'طريقة الدفع' : 'Payment'}</span>
                <span className="font-bold text-neutral-900 uppercase">{selectedPayment.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-neutral-200">
                <span className="font-bold text-neutral-900">{language === 'ar' ? 'المبلغ الإجمالي' : 'Total Paid'}</span>
                <span className="font-black text-sm text-[#8F3E24]">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Link
                href="/shop"
                className="w-full py-3 px-4 bg-[#8F3E24] hover:bg-[#7A331D] text-white rounded-lg font-bold text-xs flex items-center justify-center transition-all shadow-xs"
              >
                {language === 'ar' ? 'العودة للمتجر الرئيسي' : 'Return to Shop'}
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
