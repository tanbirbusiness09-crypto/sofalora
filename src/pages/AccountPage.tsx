import React, { useState, useMemo } from 'react';
import { useShop } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { PRODUCTS } from '../data/products';
import {
  Package,
  Heart,
  ShoppingBag,
  Truck,
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
  Gift,
  LogOut,
  Bell,
  RotateCcw,
  Lock,
  BadgeCheck
} from 'lucide-react';
import { Order } from '../types';

interface Profile {
  name: string;
  phone: string;
  email: string;
  city: string;
  street: string;
  notes: string;
}

interface NotifPrefs {
  orderUpdates: boolean;
  offers: boolean;
  whatsapp: boolean;
  email: boolean;
}

const PROFILE_KEY = 'sofalora_profile';
const NOTIF_KEY = 'sofalora_notif';

const EMPTY_PROFILE: Profile = {
  name: '',
  phone: '',
  email: '',
  city: '',
  street: '',
  notes: ''
};

const DEFAULT_NOTIF: NotifPrefs = {
  orderUpdates: true,
  offers: true,
  whatsapp: true,
  email: false
};

export const AccountPage: React.FC = () => {
  const { orders, cart, wishlist, language, direction, formatPrice, setLanguage, openConsultation } = useShop();
  const { navigate } = useRouter();

  const isAr = language === 'ar';
  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;
  const ChevronIcon = direction === 'rtl' ? ChevronLeft : ChevronRight;

  const [profile, setProfile] = useState<Profile>(() => {
    try {
      const saved = localStorage.getItem(PROFILE_KEY);
      if (saved) return { ...EMPTY_PROFILE, ...JSON.parse(saved) };
    } catch {
      // ignore
    }
    return EMPTY_PROFILE;
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [draft, setDraft] = useState<Profile>(profile);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressDraft, setAddressDraft] = useState({ city: profile.city, street: profile.street, notes: profile.notes });
  const [notif, setNotif] = useState<NotifPrefs>(() => {
    try {
      const saved = localStorage.getItem(NOTIF_KEY);
      if (saved) return { ...DEFAULT_NOTIF, ...JSON.parse(saved) };
    } catch {
      // ignore
    }
    return DEFAULT_NOTIF;
  });

  const toggleNotif = (key: keyof NotifPrefs) => {
    const next = { ...notif, [key]: !notif[key] };
    setNotif(next);
    try {
      localStorage.setItem(NOTIF_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const signOut = () => {
    saveProfile(EMPTY_PROFILE);
    setDraft(EMPTY_PROFILE);
    try {
      localStorage.removeItem(NOTIF_KEY);
    } catch {
      // ignore
    }
    setNotif(DEFAULT_NOTIF);
    setIsEditingProfile(false);
  };

  const saveProfile = (next: Profile) => {
    setProfile(next);
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const displayName = profile.name.trim() || (isAr ? 'ضيفنا العزيز' : 'Guest');
  const initial = (profile.name.trim()[0] || (isAr ? 'ض' : 'S')).toUpperCase();

  const stat = useMemo(() => {
    const active = orders.filter((o: Order) => o.status !== 'delivered').length;
    const delivered = orders.filter((o: Order) => o.status === 'delivered').length;
    const cartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const lastOrder = orders[0] ?? null;
    return { active, delivered, cartItems, lastOrder, total: orders.length };
  }, [orders, cart]);

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
      label: isAr ? 'استشارة التصميم' : 'Free Design Visit',
      desc: isAr ? 'احجز زيارة منزلية مجانية' : 'Book a free home visit',
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
      value: isAr ? 'رد فوري' : 'Instant reply',
      action: () => window.open('https://wa.me/966559821100?text=' + encodeURIComponent(isAr ? 'مرحباً، أحتاج مساعدة' : 'Hello, I need help'), '_blank')
    },
    {
      id: 'rewards',
      icon: Gift,
      label: isAr ? 'مكافآت الكوبونات' : 'Offers & Coupons',
      value: isAr ? 'وفّر 30%' : 'Save up to 30%',
      action: () => navigate('/offers')
    },
    {
      id: 'returns',
      icon: RotateCcw,
      label: isAr ? 'الإرجاع والاستبدال' : 'Returns & Exchanges',
      value: isAr ? 'خلال 14 يوم' : 'Within 14 days',
      action: () => navigate('/orders')
    },
    {
      id: 'password',
      icon: Lock,
      label: isAr ? 'تغيير كلمة المرور' : 'Change Password',
      value: isAr ? 'آخر تحديث' : 'Last updated',
      action: () => {}
    }
  ];

  return (
    <div className="bg-[#FDFCFA] min-h-screen py-6 sm:py-10 pb-28 md:pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Profile Hero Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0A2A5E] via-[#0A2344] to-[#061C3F] text-white p-6 sm:p-8 mb-6">
          <div className="absolute -end-10 -top-10 w-48 h-48 rounded-full bg-[#C6A15B]/10 blur-2xl" />
          <div className="flex items-start sm:items-center gap-4 sm:gap-5 flex-col sm:flex-row">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#C6A15B]/20 border-2 border-[#C6A15B]/50 flex items-center justify-center text-2xl sm:text-3xl font-extrabold text-[#E3C98F] shrink-0">
              {initial}
            </div>
            <div className="flex-1">
              {isEditingProfile ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-xl">
                  <input
                    value={draft.name}
                    onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                    placeholder={isAr ? 'الاسم الكامل' : 'Full name'}
                    className="bg-white/10 border border-white/25 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/50 outline-none focus:border-[#E3C98F]"
                  />
                  <input
                    value={draft.phone}
                    onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                    placeholder={isAr ? 'رقم الجوال (05...)' : 'Phone (05...)'}
                    className="bg-white/10 border border-white/25 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/50 outline-none focus:border-[#E3C98F]"
                  />
                  <input
                    value={draft.email}
                    onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                    placeholder={isAr ? 'البريد الإلكتروني' : 'Email address'}
                    className="bg-white/10 border border-white/25 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/50 outline-none focus:border-[#E3C98F] sm:col-span-2"
                  />
                  <div className="flex items-center gap-2 sm:col-span-2">
                    <button
                      type="button"
                      onClick={() => {
                        saveProfile(draft);
                        setIsEditingProfile(false);
                      }}
                      className="brand-gradient inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{isAr ? 'حفظ' : 'Save'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDraft(profile);
                        setIsEditingProfile(false);
                      }}
                      className="px-4 py-2 rounded-full text-xs font-bold text-white/80 hover:text-white cursor-pointer"
                    >
                      {isAr ? 'إلغاء' : 'Cancel'}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl sm:text-2xl font-extrabold">{displayName}</h1>
                    {profile.phone && (
                      <BadgeCheck className="w-5 h-5 text-[#E3C98F]" />
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setDraft(profile);
                        setIsEditingProfile(true);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E3C98F] hover:text-white transition-colors cursor-pointer"
                    >
                      <Pencil className="w-3 h-3" />
                      <span>{isAr ? 'تعديل الملف' : 'Edit profile'}</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-4 mt-1.5 text-xs text-white/70">
                    {profile.phone && (
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" /> {profile.phone}
                      </span>
                    )}
                    {profile.email && (
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" /> {profile.email}
                      </span>
                    )}
                    {!profile.phone && !profile.email && (
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        {isAr ? 'أضف بياناتك لتحديث أسرع' : 'Add your info for faster ordering'}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats Strip */}
          <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-white/10">
            <div>
              <div className="text-lg sm:text-2xl font-extrabold text-[#E3C98F]">{stat.active}</div>
              <div className="text-[11px] sm:text-xs text-white/70">{isAr ? 'طلب جارٍ' : 'Active orders'}</div>
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-extrabold text-[#E3C98F]">{wishlist.length}</div>
              <div className="text-[11px] sm:text-xs text-white/70">{isAr ? 'المفضلة' : 'Wishlist items'}</div>
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-extrabold text-[#E3C98F]">{stat.cartItems}</div>
              <div className="text-[11px] sm:text-xs text-white/70">{isAr ? 'في السلة' : 'Items in cart'}</div>
            </div>
          </div>
        </div>

        {/* Quick Menu Grid (noon style boxes) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={item.action}
                className="group bg-white rounded-2xl border border-[#E5E1D8] p-4 sm:p-5 text-start hover:border-[#0A2A5E]/40 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#F3F1EB] group-hover:bg-[#0A2A5E] group-hover:text-white flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5 text-[#0A2A5E] group-hover:text-white transition-colors" />
                  </span>
                  <ChevronIcon className="w-4 h-4 text-[#98A2B3] group-hover:text-[#0A2A5E] transition-colors" />
                </div>
                <div className="text-sm sm:text-base font-bold text-[#101828]">{item.label}</div>
                <div className="text-[11px] sm:text-xs text-[#667085] mt-0.5 line-clamp-1">{item.desc}</div>
                {item.count !== null && (
                  <div className="mt-2 inline-flex items-center rounded-full bg-[#F3F1EB] text-[#0A2A5E] text-[10px] font-extrabold px-2 py-0.5">
                    {item.count}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Order Tracker */}
        {stat.lastOrder && (
          <div className="bg-white rounded-2xl border border-[#E5E1D8] p-5 sm:p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl bg-[#F3F1EB] flex items-center justify-center">
                  <Truck className="w-5 h-5 text-[#0A2A5E]" />
                </span>
                <div>
                  <div className="text-sm font-bold text-[#101828]">
                    {stat.lastOrder.status === 'delivered'
                      ? (isAr ? 'آخر طلب — تم التوصيل' : 'Latest order — Delivered')
                      : (isAr ? 'جارٍ تجهيز آخر طلب' : 'Latest order in progress')}
                  </div>
                  <div className="text-xs text-[#667085]">
                    #{stat.lastOrder.id} • {formatPrice(stat.lastOrder.grandTotal ?? stat.lastOrder.total)}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate(`/orders/${stat.lastOrder.id}`)}
                className="inline-flex items-center justify-center gap-1.5 bg-[#0A2A5E] text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-[#061C3F] transition-colors cursor-pointer"
              >
                <span>{isAr ? 'تتبع الطلب' : 'Track order'}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Address Book */}
          <div className="bg-white rounded-2xl border border-[#E5E1D8] p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base sm:text-lg font-extrabold text-[#101828] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#C8102E]" />
                {isAr ? 'دفتر العناوين' : 'Address Book'}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setAddressDraft({ city: profile.city, street: profile.street, notes: profile.notes });
                  setIsEditingAddress(!isEditingAddress);
                }}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#0A2A5E] hover:text-[#C8102E] transition-colors cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>{isEditingAddress ? (isAr ? 'إلغاء' : 'Cancel') : (profile.street ? (isAr ? 'تعديل' : 'Edit') : (isAr ? 'إضافة' : 'Add'))}</span>
              </button>
            </div>

            {isEditingAddress ? (
              <div className="space-y-2.5">
                <input
                  value={addressDraft.city}
                  onChange={(e) => setAddressDraft({ ...addressDraft, city: e.target.value })}
                  placeholder={isAr ? 'المدينة — الرياض...' : 'City — Riyadh, Jeddah...'}
                  className="w-full bg-[#FDFCFA] border border-[#E5E1D8] rounded-xl px-3.5 py-2.5 text-sm text-[#101828] outline-none focus:border-[#0A2A5E]"
                />
                <input
                  value={addressDraft.street}
                  onChange={(e) => setAddressDraft({ ...addressDraft, street: e.target.value })}
                  placeholder={isAr ? 'الحي والشارع' : 'District & street'}
                  className="w-full bg-[#FDFCFA] border border-[#E5E1D8] rounded-xl px-3.5 py-2.5 text-sm text-[#101828] outline-none focus:border-[#0A2A5E]"
                />
                <input
                  value={addressDraft.notes}
                  onChange={(e) => setAddressDraft({ ...addressDraft, notes: e.target.value })}
                  placeholder={isAr ? 'ملاحظات للسائق' : 'Delivery notes (optional)'}
                  className="w-full bg-[#FDFCFA] border border-[#E5E1D8] rounded-xl px-3.5 py-2.5 text-sm text-[#101828] outline-none focus:border-[#0A2A5E]"
                />
                <button
                  type="button"
                  onClick={() => {
                    const next = { ...profile, ...addressDraft };
                    saveProfile(next);
                    setIsEditingAddress(false);
                  }}
                  className="brand-gradient inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold text-white cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{isAr ? 'حفظ العنوان' : 'Save address'}</span>
                </button>
              </div>
            ) : profile.street ? (
              <div className="text-sm text-[#101828] space-y-1">
                <div className="font-bold">{profile.name || (isAr ? 'العنوان الرئيسي' : 'Default address')}</div>
                <div className="text-[#667085] text-xs sm:text-sm leading-relaxed">
                  {profile.city && <span>{profile.city}, </span>}{profile.street}
                </div>
                {profile.notes && <div className="text-xs text-[#98A2B3]">{profile.notes}</div>}
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-[#667085]">
                {isAr ? 'احفظ عنوانك ليتم توصيل الكنب والستائر بسرعة.' : 'Save your address for faster sofa & curtain delivery.'}
              </p>
            )}
          </div>

          {/* Settings & Support */}
          <div className="bg-white rounded-2xl border border-[#E5E1D8] p-5 sm:p-6">
            <h2 className="text-base sm:text-lg font-extrabold text-[#101828] flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-[#C8102E]" />
              {isAr ? 'الإعدادات والدعم' : 'Settings & Support'}
            </h2>
            <div className="divide-y divide-[#F0EDE6]">
              {settingsItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={item.action}
                    className="w-full flex items-center gap-3 py-3.5 text-start hover:bg-[#FDFCFA] transition-colors cursor-pointer group"
                  >
                    <span className="w-9 h-9 rounded-xl bg-[#F3F1EB] flex items-center justify-center shrink-0">
                      <Icon className="w-4.5 h-4.5 text-[#0A2A5E]" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-bold text-[#101828]">{item.label}</span>
                      <span className="block text-[11px] text-[#667085]">{item.value}</span>
                    </span>
                    <ChevronIcon className="w-4 h-4 text-[#98A2B3] group-hover:text-[#0A2A5E] transition-colors shrink-0" />
                  </button>
                );
              })}
            </div>

            {/* Notification Preferences */}
            <div className="mt-5 pt-4 border-t border-[#F0EDE6]">
              <div className="flex items-center gap-2 mb-3">
                <Bell className="w-4 h-4 text-[#0A2A5E]" />
                <h3 className="text-sm font-extrabold text-[#101828]">
                  {isAr ? 'تفضيلات الإشعارات' : 'Notification Preferences'}
                </h3>
              </div>
              <div className="space-y-1">
                {[
                  { key: 'orderUpdates' as const, label: isAr ? 'تحديثات حالة الطلب' : 'Order status updates' },
                  { key: 'offers' as const, label: isAr ? 'العروض والتخفيضات' : 'Offers & promotions' },
                  { key: 'whatsapp' as const, label: isAr ? 'تنبيهات واتساب' : 'WhatsApp alerts' },
                  { key: 'email' as const, label: isAr ? 'النشرة البريدية' : 'Email newsletter' }
                ].map((row) => (
                  <div key={row.key} className="flex items-center justify-between py-2">
                    <span className="text-xs sm:text-sm text-[#344054]">{row.label}</span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={notif[row.key]}
                      onClick={() => toggleNotif(row.key)}
                      className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer shrink-0 ${
                        notif[row.key] ? 'bg-[#0A2A5E]' : 'bg-[#D6D0C4]'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${
                          notif[row.key] ? 'start-5.5' : 'start-0.5'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Sign Out */}
            <button
              type="button"
              onClick={signOut}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 border border-[#E5E1D8] rounded-xl px-4 py-3 text-sm font-bold text-[#C8102E] hover:bg-[#FEF2F2] hover:border-[#C8102E]/40 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>{isAr ? 'تسجيل الخروج' : 'Sign Out'}</span>
            </button>
            <p className="mt-2 text-[11px] text-[#98A2B3] text-center">
              {isAr ? 'سيتم حذف بياناتك من هذا الجهاز' : 'This clears your data from this device'}
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0A2A5E] hover:text-[#C8102E] transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>{isAr ? 'متابعة التسوق' : 'Continue shopping'}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
