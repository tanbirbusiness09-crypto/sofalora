import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useShop } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';

interface TrackOrderFormProps {
  initialOrderNumber?: string;
  /** Navigate to the order details page after a successful lookup (default true). */
  openOnSuccess?: boolean;
  className?: string;
}

/** Guest order lookup: POST /storefront/orders/track with order number + phone. */
export const TrackOrderForm: React.FC<TrackOrderFormProps> = ({
  initialOrderNumber = '',
  openOnSuccess = true,
  className = ''
}) => {
  const { trackOrderByNumber, language } = useShop();
  const { navigate } = useRouter();
  const isAr = language === 'ar';
  const [orderNumber, setOrderNumber] = useState(initialOrderNumber);
  const [phone, setPhone] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim() || !phone.trim()) {
      setError(isAr ? 'أدخل رقم الطلب ورقم الجوال' : 'Enter your order number and mobile number.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const order = await trackOrderByNumber(orderNumber, phone);
      if (!order) {
        setError(isAr ? 'لم يتم العثور على طلب بهذه البيانات.' : 'No order matches that number and mobile.');
      } else if (openOnSuccess) {
        navigate(`/orders/${encodeURIComponent(order.id)}`);
      }
    } catch {
      setError(isAr ? 'تعذر تتبع الطلب الآن. حاول لاحقاً.' : 'Could not look up the order right now. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      id="track-order-form"
      onSubmit={submit}
      className={`bg-white rounded-2xl border border-[#E8E2D6] p-4 sm:p-5 shadow-xs ${className}`}
    >
      <h2 className="text-sm font-bold text-[#101828] mb-1">{isAr ? 'تتبع طلب' : 'Track an order'}</h2>
      <p className="text-[11px] text-[#667085] mb-3">
        {isAr
          ? 'أدخل رقم الطلب ورقم الجوال المستخدم عند الطلب.'
          : 'Enter the order number and the mobile number used at checkout.'}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-2">
        <input
          id="track-order-number"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          placeholder={isAr ? 'رقم الطلب' : 'Order number'}
          dir="ltr"
          className="bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs font-mono"
        />
        <input
          id="track-order-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={isAr ? 'رقم الجوال' : 'Mobile number'}
          dir="ltr"
          className="bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs font-mono"
        />
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center justify-center gap-1.5 bg-[#0B2345] hover:bg-[#071A35] disabled:opacity-60 text-white px-4 py-2 rounded-lg text-xs font-bold"
        >
          {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
          <span>{isAr ? 'تتبع' : 'Track'}</span>
        </button>
      </div>
      {error && <p className="mt-2 text-[11px] font-semibold text-red-600">{error}</p>}
    </form>
  );
};
