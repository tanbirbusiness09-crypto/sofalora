import React, { useMemo, useState } from 'react';
import { useShop } from '../context/LanguageContext';
import { useRouter, Link } from '../context/RouterContext';
import { useAuth, authErrorText } from '../context/AuthContext';
import { TrackOrderForm } from '../components/Orders/TrackOrderForm';
import { localSaudiPhone } from '../lib/customerAuth';
import type { CustomerAddress } from '../lib/api';
import { RIYADH_DISTRICTS } from '../data/riyadhDistricts';
import type { Order, OrderStatus } from '../types';
import {
  Package,
  Heart,
  ShoppingBag,
  MapPin,
  Languages,
  Headset,
  Scissors,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  Pencil,
  Check,
  User,
  Phone,
  Mail,
  Home,
  CreditCard,
  LogOut,
  LogIn,
  UserPlus,
  KeyRound,
  RotateCcw,
  Loader2,
  PackageSearch
} from 'lucide-react';

const STATUS_TEXT: Record<OrderStatus, { en: string; ar: string }> = {
  order_placed: { en: 'Order received', ar: 'تم استلام الطلب' },
  confirmed: { en: 'Confirmed', ar: 'تم التأكيد' },
  preparing: { en: 'Preparing', ar: 'قيد التجهيز' },
  ready_for_delivery: { en: 'Ready for delivery', ar: 'جاهز للتوصيل' },
  out_for_delivery: { en: 'Out for delivery', ar: 'في الطريق' },
  delivered: { en: 'Delivered', ar: 'تم التوصيل' },
  cancelled: { en: 'Cancelled', ar: 'ملغي' }
};

const field =
  'w-full bg-[#FDFCFA] border border-[#E5E1D8] rounded-xl px-3.5 py-2.5 text-sm text-[#101828] outline-none focus:border-[#0B2345]';
const heroField =
  'bg-white/10 border border-white/25 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/50 outline-none focus:border-[#D9C29A]';

export const AccountPage: React.FC = () => {
  const { orders, cart, wishlist, language, direction, formatPrice, setLanguage, openConsultation, showToast } = useShop();
  const auth = useAuth();
  const { navigate } = useRouter();

  const isAr = language === 'ar';
  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;
  const ChevronIcon = direction === 'rtl' ? ChevronLeft : ChevronRight;
  const signedIn = auth.status === 'authenticated' && auth.customer !== null;
  const customer = auth.customer;

  // Profile editing (name + email; phone is the sign-in id and is not editable here)
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [draftName, setDraftName] = useState('');
  const [draftEmail, setDraftEmail] = useState('');
  const [profileBusy, setProfileBusy] = useState(false);
  const [profileError, setProfileError] = useState('');

  // Default address (addresses[0] on the account)
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressDraft, setAddressDraft] = useState<CustomerAddress>({});
  const [addressBusy, setAddressBusy] = useState(false);

  // Change password
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [passwordBusy, setPasswordBusy] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  const accountOrders = useMemo(
    () => (signedIn ? orders.filter((o: Order) => o.accountOrder) : orders),
    [orders, signedIn]
  );
  const address = customer?.addresses?.find((a) => a.is_default) ?? customer?.addresses?.[0] ?? null;

  const stat = useMemo(() => {
    const active = accountOrders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled').length;
    const cartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    return { active, cartItems, total: accountOrders.length };
  }, [accountOrders, cart]);

  const startEditProfile = () => {
    setDraftName(customer?.name ?? '');
    setDraftEmail(customer?.email ?? '');
    setProfileError('');
    setIsEditingProfile(true);
  };

  const saveProfile = async () => {
    if (!draftName.trim()) {
      setProfileError(isAr ? 'يرجى إدخال الاسم' : 'Please enter your name.');
      return;
    }
    setProfileBusy(true);
    setProfileError('');
    try {
      await auth.updateProfile({ name: draftName.trim(), email: draftEmail.trim() || null });
      setIsEditingProfile(false);
      showToast(isAr ? 'تم حفظ بياناتك' : 'Profile saved', 'success');
    } catch (err) {
      setProfileError(authErrorText(err, language));
    } finally {
      setProfileBusy(false);
    }
  };

  const startEditAddress = () => {
    setAddressDraft({ label: '', city: isAr ? 'الرياض' : 'Riyadh', district: '', street: '', building: '', notes: '', ...(address ?? {}) });
    setIsEditingAddress(true);
  };

  const saveAddress = async () => {
    if (!addressDraft.street?.trim() || !addressDraft.city?.trim()) {
      showToast(isAr ? 'أدخل المدينة والشارع' : 'Enter the city and street', 'warning');
      return;
    }
    setAddressBusy(true);
    try {
      const others = (customer?.addresses ?? []).filter((a) => a !== address);
      await auth.updateProfile({ addresses: [{ ...addressDraft, is_default: true }, ...others.map((a) => ({ ...a, is_default: false }))] });
      setIsEditingAddress(false);
      showToast(isAr ? 'تم حفظ العنوان' : 'Address saved', 'success');
    } catch (err) {
      showToast(authErrorText(err, language), 'warning');
    } finally {
      setAddressBusy(false);
    }
  };

  const submitPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage(null);
    if (newPassword.length < 8) {
      setPasswordMessage({ type: 'error', text: isAr ? 'كلمة المرور الجديدة ٨ أحرف على الأقل' : 'New password must be at least 8 characters.' });
      return;
    }
    if (newPassword !== newPassword2) {
      setPasswordMessage({ type: 'error', text: isAr ? 'كلمتا المرور غير متطابقتين' : 'The new passwords do not match.' });
      return;
    }
    setPasswordBusy(true);
    try {
      await auth.changePassword(currentPassword, newPassword, newPassword2);
      setCurrentPassword('');
      setNewPassword('');
      setNewPassword2('');
      setPasswordMessage({ type: 'success', text: isAr ? 'تم تغيير كلمة المرور' : 'Password changed. Other devices were signed out.' });
    } catch (err) {
      setPasswordMessage({ type: 'error', text: authErrorText(err, language) });
    } finally {
      setPasswordBusy(false);
    }
  };

  const signOut = async () => {
    setSigningOut(true);
    await auth.logout();
    setSigningOut(false);
    showToast(isAr ? 'تم تسجيل الخروج' : 'Signed out', 'info');
  };

  const menuItems = [
    {
      id: 'orders',
      icon: Package,
      label: isAr ? 'طلباتي' : 'My Orders',
      desc: isAr ? 'تتبع حالة الطلب والتركيب' : 'Track order & installation status',
      count: stat.total,
      action: () => navigate('/orders')
    },
    {
      id: 'wishlist',
      icon: Heart,
      label: isAr ? 'المفضلة' : 'My Wishlist',
      desc: isAr ? 'المنتجات التي أعجبتك' : 'Products you love',
      count: wishlist.length,
      action: () => navigate('/wishlist')
    },
    {
      id: 'cart',
      icon: ShoppingBag,
      label: isAr ? 'سلة التسوق' : 'My Cart',
      desc: isAr ? 'أكمل عملية الشراء' : 'Complete your purchase',
      count: stat.cartItems,
      action: () => navigate('/cart')
    },
    {
      id: 'consultation',
      icon: Scissors,
      label: isAr ? 'استشارة التصميم' : 'Design Visit',
      desc: isAr ? 'احجز زيارة منزلية' : 'Book a home visit',
      count: null,
      action: openConsultation
    }
  ];

  const settingsItems = [
    {
      id: 'language',
      icon: Languages,
      label: isAr ? 'اللغة' : 'Language',
      value: isAr ? 'العربية' : 'English',
      action: () => setLanguage(isAr ? 'en' : 'ar')
    },
    {
      id: 'payment',
      icon: CreditCard,
      label: isAr ? 'طرق الدفع' : 'Payment Methods',
      value: isAr ? 'الدفع عند الاستلام' : 'Cash on Delivery',
      action: () => {}
    },
    {
      id: 'whatsapp',
      icon: Headset,
      label: isAr ? 'دعم واتساب' : 'WhatsApp Support',
      value: isAr ? 'تواصل معنا' : 'Chat with us',
      action: () => window.open('https://wa.me/966559821100?text=' + encodeURIComponent(isAr ? 'مرحباً، أحتاج مساعدة' : 'Hello, I need help'), '_blank')
    },
    {
      id: 'returns',
      icon: RotateCcw,
      label: isAr ? 'الإرجاع والاستبدال' : 'Returns & Exchanges',
      value: isAr ? 'عبر طلباتي' : 'From your orders',
      action: () => navigate('/orders')
    }
  ];

  const displayName = signedIn ? customer!.name : (isAr ? 'ضيفنا العزيز' : 'Welcome');
  const initial = (signedIn ? customer!.name.trim()[0] : '') || (isAr ? 'ض' : 'S');

  return (
    <div className="bg-[#FDFCFA] min-h-screen py-6 sm:py-10 pb-28 md:pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Profile Hero Card */}
        <div id="account-hero" data-signed-in={signedIn ? 'true' : 'false'} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B2345] via-[#0A2344] to-[#071A35] text-white p-6 sm:p-8 mb-6">
          <div className="absolute -end-10 -top-10 w-48 h-48 rounded-full bg-[#B59460]/10 blur-2xl" />
          <div className="relative flex items-start sm:items-center gap-4 sm:gap-5 flex-col sm:flex-row">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#B59460]/20 border-2 border-[#B59460]/50 flex items-center justify-center text-2xl sm:text-3xl font-extrabold text-[#D9C29A] shrink-0">
              {auth.status === 'loading' ? <Loader2 className="w-6 h-6 animate-spin" /> : initial.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              {signedIn && isEditingProfile ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-xl">
                  <input id="account-name" value={draftName} onChange={(e) => setDraftName(e.target.value)} placeholder={isAr ? 'الاسم الكامل' : 'Full name'} className={heroField} />
                  <input id="account-email" type="email" dir="ltr" value={draftEmail} onChange={(e) => setDraftEmail(e.target.value)} placeholder={isAr ? 'البريد الإلكتروني (اختياري)' : 'Email (optional)'} className={heroField} />
                  <p className="text-[11px] text-white/60 sm:col-span-2">
                    {isAr ? 'رقم الجوال هو معرّف تسجيل الدخول ولا يمكن تغييره هنا.' : 'Your mobile number is your sign-in ID and cannot be changed here.'}
                  </p>
                  {profileError && <p className="text-xs text-[#FCA5A5] sm:col-span-2">{profileError}</p>}
                  <div className="flex items-center gap-2 sm:col-span-2">
                    <button id="account-profile-save" type="button" disabled={profileBusy} onClick={saveProfile} className="brand-gradient inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white cursor-pointer disabled:opacity-60">
                      {profileBusy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                      <span>{isAr ? 'حفظ' : 'Save'}</span>
                    </button>
                    <button type="button" onClick={() => setIsEditingProfile(false)} className="px-4 py-2 rounded-full text-xs font-bold text-white/80 hover:text-white cursor-pointer">
                      {isAr ? 'إلغاء' : 'Cancel'}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 id="account-display-name" className="text-xl sm:text-2xl font-extrabold">{displayName}</h1>
                    {signedIn && (
                      <button type="button" id="account-edit-profile" onClick={startEditProfile} className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D9C29A] hover:text-white transition-colors cursor-pointer">
                        <Pencil className="w-3 h-3" />
                        <span>{isAr ? 'تعديل الملف' : 'Edit profile'}</span>
                      </button>
                    )}
                  </div>
                  {signedIn ? (
                    <div className="flex items-center gap-4 mt-1.5 text-xs text-white/70 flex-wrap">
                      <span id="account-phone" className="flex items-center gap-1.5" dir="ltr">
                        <Phone className="w-3.5 h-3.5" /> {localSaudiPhone(customer!.phone)}
                      </span>
                      {customer!.email && (
                        <span id="account-email-text" className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5" /> {customer!.email}
                        </span>
                      )}
                    </div>
                  ) : (
                    <p className="mt-1.5 text-xs text-white/70 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      {auth.loginEnabled
                        ? (isAr ? 'سجّل الدخول لعرض سجل طلباتك وحفظ عنوانك.' : 'Sign in to see your order history and save your address.')
                        : (isAr ? 'يمكنك الطلب كضيف وتتبع طلبك برقم الطلب.' : 'Order as a guest and track orders with your order number.')}
                    </p>
                  )}
                </div>
              )}
            </div>
            {!signedIn && auth.status !== 'loading' && auth.loginEnabled && (
              <div className="flex gap-2 flex-wrap">
                <Link id="account-login" href="/login" className="inline-flex items-center gap-1.5 bg-white text-[#0B2345] px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-[#F3F1EB]">
                  <LogIn className="w-4 h-4" />
                  {isAr ? 'تسجيل الدخول' : 'Sign in'}
                </Link>
                {auth.registrationEnabled && (
                  <Link id="account-register" href="/register" className="inline-flex items-center gap-1.5 border border-white/40 text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-white/10">
                    <UserPlus className="w-4 h-4" />
                    {isAr ? 'إنشاء حساب' : 'Create account'}
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Stats Strip */}
          <div className="relative grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-white/10">
            <div>
              <div className="text-lg sm:text-2xl font-extrabold text-[#D9C29A]">{stat.active}</div>
              <div className="text-[11px] sm:text-xs text-white/70">{isAr ? 'طلب جارٍ' : 'Active orders'}</div>
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-extrabold text-[#D9C29A]">{wishlist.length}</div>
              <div className="text-[11px] sm:text-xs text-white/70">{isAr ? 'المفضلة' : 'Wishlist items'}</div>
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-extrabold text-[#D9C29A]">{stat.cartItems}</div>
              <div className="text-[11px] sm:text-xs text-white/70">{isAr ? 'في السلة' : 'Items in cart'}</div>
            </div>
          </div>
        </div>

        {/* Quick Menu Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.id} type="button" onClick={item.action} className="group bg-white rounded-2xl border border-[#E5E1D8] p-4 sm:p-5 text-start hover:border-[#0B2345]/40 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#F3F1EB] group-hover:bg-[#0B2345] flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5 text-[#0B2345] group-hover:text-white transition-colors" />
                  </span>
                  <ChevronIcon className="w-4 h-4 text-[#98A2B3] group-hover:text-[#0B2345] transition-colors" />
                </div>
                <div className="text-sm sm:text-base font-bold text-[#101828]">{item.label}</div>
                <div className="text-[11px] sm:text-xs text-[#667085] mt-0.5 line-clamp-1">{item.desc}</div>
                {item.count !== null && (
                  <div className="mt-2 inline-flex items-center rounded-full bg-[#F3F1EB] text-[#0B2345] text-[10px] font-extrabold px-2 py-0.5">{item.count}</div>
                )}
              </button>
            );
          })}
        </div>

        {/* Order history (account) or guest tracking */}
        <div className="bg-white rounded-2xl border border-[#E5E1D8] p-5 sm:p-6 mb-6">
          <div className="flex items-center justify-between mb-4 gap-3">
            <h2 className="text-base sm:text-lg font-extrabold text-[#101828] flex items-center gap-2">
              <Package className="w-5 h-5 text-[#B59460]" />
              {signedIn ? (isAr ? 'سجل طلباتي' : 'Order history') : (isAr ? 'تتبع طلب' : 'Track an order')}
            </h2>
            {signedIn && auth.ordersStatus === 'loading' && <Loader2 className="w-4 h-4 animate-spin text-[#667085]" />}
          </div>
          {signedIn ? (
            accountOrders.length ? (
              <ul id="account-orders" className="divide-y divide-[#F0EDE6]">
                {accountOrders.map((o) => (
                  <li key={o.id}>
                    <button type="button" data-order-number={o.orderNumber || o.id} onClick={() => navigate(`/orders/${o.id}`)} className="w-full flex items-center justify-between gap-3 py-3 text-start hover:bg-[#FDFCFA] cursor-pointer">
                      <span className="min-w-0">
                        <span className="block text-sm font-bold text-[#0B2345]" dir="ltr">#{o.orderNumber || o.id}</span>
                        <span className="block text-[11px] text-[#667085]">
                          {new Date(o.createdAt).toLocaleDateString(isAr ? 'ar-SA' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          {' • '}
                          {o.items.reduce((n, i) => n + i.quantity, 0)} {isAr ? 'قطعة' : 'item(s)'}
                        </span>
                      </span>
                      <span className="text-end shrink-0">
                        <span className="block text-sm font-extrabold text-[#101828]">{formatPrice(o.grandTotal ?? o.total)}</span>
                        <span className={`inline-block mt-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${o.status === 'cancelled' ? 'bg-[#FEF2F2] text-[#B59460]' : o.status === 'delivered' ? 'bg-[#ECFDF3] text-[#2A7531]' : 'bg-[#F3F1EB] text-[#0B2345]'}`}>
                          {STATUS_TEXT[o.status]?.[language] ?? o.status}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div id="account-orders-empty" className="text-sm text-[#667085] flex items-center gap-3">
                <PackageSearch className="w-5 h-5 text-[#98A2B3]" />
                {auth.ordersStatus === 'error'
                  ? (isAr ? 'تعذر تحميل الطلبات. حاول لاحقاً.' : 'Could not load your orders. Please try again later.')
                  : (isAr ? 'لا توجد طلبات في حسابك بعد.' : 'No orders in your account yet.')}
              </div>
            )
          ) : (
            <>
              <p className="text-xs text-[#667085] mb-3">
                {isAr ? 'أدخل رقم الطلب ورقم الجوال المستخدم عند الطلب.' : 'Enter your order number and the mobile number used at checkout.'}
              </p>
              <TrackOrderForm />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Address Book (account only) */}
          {signedIn && (
            <div className="bg-white rounded-2xl border border-[#E5E1D8] p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base sm:text-lg font-extrabold text-[#101828] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#B59460]" />
                  {isAr ? 'عنوان التوصيل' : 'Delivery address'}
                </h2>
                <button id="account-edit-address" type="button" onClick={() => (isEditingAddress ? setIsEditingAddress(false) : startEditAddress())} className="inline-flex items-center gap-1 text-xs font-bold text-[#0B2345] hover:text-[#B59460] transition-colors cursor-pointer">
                  <Pencil className="w-3.5 h-3.5" />
                  <span>{isEditingAddress ? (isAr ? 'إلغاء' : 'Cancel') : address ? (isAr ? 'تعديل' : 'Edit') : (isAr ? 'إضافة' : 'Add')}</span>
                </button>
              </div>
              {isEditingAddress ? (
                <div className="space-y-2.5">
                  <div className="grid grid-cols-2 gap-2.5">
                    <input id="address-city" value={addressDraft.city ?? ''} onChange={(e) => setAddressDraft({ ...addressDraft, city: e.target.value })} placeholder={isAr ? 'المدينة' : 'City'} className={field} />
                    <select id="address-district" value={addressDraft.district ?? ''} onChange={(e) => setAddressDraft({ ...addressDraft, district: e.target.value })} className={field}>
                      <option value="">{isAr ? 'الحي' : 'District'}</option>
                      {RIYADH_DISTRICTS.map((d) => (
                        <option key={d.id} value={d.name.en}>{isAr ? d.name.ar : d.name.en}</option>
                      ))}
                    </select>
                  </div>
                  <input id="address-street" value={addressDraft.street ?? ''} onChange={(e) => setAddressDraft({ ...addressDraft, street: e.target.value })} placeholder={isAr ? 'الشارع' : 'Street'} className={field} />
                  <input id="address-building" value={addressDraft.building ?? ''} onChange={(e) => setAddressDraft({ ...addressDraft, building: e.target.value })} placeholder={isAr ? 'رقم المبنى / الشقة' : 'Building / apartment'} className={field} />
                  <input id="address-notes" value={addressDraft.notes ?? ''} onChange={(e) => setAddressDraft({ ...addressDraft, notes: e.target.value })} placeholder={isAr ? 'ملاحظات للسائق (اختياري)' : 'Delivery notes (optional)'} className={field} />
                  <button id="address-save" type="button" disabled={addressBusy} onClick={saveAddress} className="brand-gradient inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold text-white cursor-pointer disabled:opacity-60">
                    {addressBusy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                    <span>{isAr ? 'حفظ العنوان' : 'Save address'}</span>
                  </button>
                </div>
              ) : address ? (
                <div id="account-address" className="text-sm text-[#101828] space-y-1">
                  <div className="font-bold">{customer!.name}</div>
                  <div className="text-[#667085] text-xs sm:text-sm leading-relaxed">
                    {[address.building, address.street, address.district, address.city].filter(Boolean).join(', ')}
                  </div>
                  {address.notes && <div className="text-xs text-[#98A2B3]">{address.notes}</div>}
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-[#667085]">
                  {isAr ? 'احفظ عنوانك ليتم ملؤه تلقائياً عند الطلب.' : 'Save your address and it will be filled in at checkout.'}
                </p>
              )}

              {/* Change password */}
              <div className="mt-5 pt-4 border-t border-[#F0EDE6]">
                <button id="account-change-password" type="button" onClick={() => { setShowPasswordForm(!showPasswordForm); setPasswordMessage(null); }} className="inline-flex items-center gap-2 text-sm font-bold text-[#0B2345] hover:text-[#B59460] cursor-pointer">
                  <KeyRound className="w-4 h-4" />
                  {isAr ? 'تغيير كلمة المرور' : 'Change password'}
                </button>
                {showPasswordForm && (
                  <form id="password-form" onSubmit={submitPassword} className="mt-3 space-y-2.5" noValidate>
                    <input id="password-current" type="password" autoComplete="current-password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder={isAr ? 'كلمة المرور الحالية' : 'Current password'} className={field} />
                    <input id="password-new" type="password" autoComplete="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder={isAr ? 'كلمة المرور الجديدة (٨ أحرف على الأقل)' : 'New password (min 8 characters)'} className={field} />
                    <input id="password-new-confirm" type="password" autoComplete="new-password" value={newPassword2} onChange={(e) => setNewPassword2(e.target.value)} placeholder={isAr ? 'تأكيد كلمة المرور الجديدة' : 'Confirm new password'} className={field} />
                    {passwordMessage && (
                      <p id="password-message" className={`text-xs font-semibold ${passwordMessage.type === 'error' ? 'text-[#B59460]' : 'text-[#2A7531]'}`}>{passwordMessage.text}</p>
                    )}
                    <button id="password-save" type="submit" disabled={passwordBusy} className="inline-flex items-center gap-1.5 bg-[#0B2345] text-white px-4 py-2.5 rounded-xl text-xs font-bold disabled:opacity-60">
                      {passwordBusy && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                      {isAr ? 'حفظ كلمة المرور' : 'Update password'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* Settings & Support */}
          <div className={`bg-white rounded-2xl border border-[#E5E1D8] p-5 sm:p-6 ${signedIn ? '' : 'lg:col-span-2'}`}>
            <h2 className="text-base sm:text-lg font-extrabold text-[#101828] flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-[#B59460]" />
              {isAr ? 'الإعدادات والدعم' : 'Settings & Support'}
            </h2>
            <div className="divide-y divide-[#F0EDE6]">
              {settingsItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button key={item.id} type="button" onClick={item.action} className="w-full flex items-center gap-3 py-3.5 text-start hover:bg-[#FDFCFA] transition-colors cursor-pointer group">
                    <span className="w-9 h-9 rounded-xl bg-[#F3F1EB] flex items-center justify-center shrink-0">
                      <Icon className="w-4.5 h-4.5 text-[#0B2345]" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-bold text-[#101828]">{item.label}</span>
                      <span className="block text-[11px] text-[#667085]">{item.value}</span>
                    </span>
                    <ChevronIcon className="w-4 h-4 text-[#98A2B3] group-hover:text-[#0B2345] transition-colors shrink-0" />
                  </button>
                );
              })}
            </div>

            {signedIn && (
              <button id="account-sign-out" type="button" disabled={signingOut} onClick={signOut} className="mt-5 w-full inline-flex items-center justify-center gap-2 border border-[#E5E1D8] rounded-xl px-4 py-3 text-sm font-bold text-[#B59460] hover:bg-[#FEF2F2] hover:border-[#B59460]/40 transition-colors cursor-pointer disabled:opacity-60">
                {signingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
                <span>{isAr ? 'تسجيل الخروج' : 'Sign out'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 text-center">
          <button type="button" onClick={() => navigate('/shop')} className="inline-flex items-center gap-2 text-sm font-bold text-[#0B2345] hover:text-[#B59460] transition-colors cursor-pointer">
            <Home className="w-4 h-4" />
            <span>{isAr ? 'متابعة التسوق' : 'Continue shopping'}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
