import React from 'react';
import { ArrowLeft, ArrowRight, Globe, PackageSearch, MapPin, History, Banknote, Lock } from 'lucide-react';
import { useShop } from '../../context/LanguageContext';
import { Link } from '../../context/RouterContext';
import { useWebsite, pickText, cmsImage } from '../../context/WebsiteContext';
import { BrandLogo } from '../UI/BrandLogo';

/** Same fallback hero image the storefront home slider uses. */
const DEFAULT_AUTH_IMAGE =
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1400&auto=format&fit=crop';

/**
 * Store contact details: admin brandConfig (Website Builder > Logo & Brand) first,
 * then the same defaults the site footer shows.
 */
export function useStoreContact() {
  const { language, t } = useShop();
  const { brand } = useWebsite();
  const digits = (v: string) => v.replace(/[^\d+]/g, '');
  const phone = (brand.phone ?? '').trim();
  const whatsapp = (brand.whatsapp ?? '').trim();
  const email = (brand.email ?? '').trim();
  return {
    phoneLabel: phone || t('phoneDisplay'),
    phoneHref: `tel:${phone ? digits(phone) : '+966114829900'}`,
    whatsappLabel: whatsapp || t('whatsappDisplay'),
    whatsappHref: `https://wa.me/${whatsapp ? digits(whatsapp).replace(/^\+/, '') : '966559821100'}`,
    emailLabel: email || t('emailDisplay'),
    emailHref: `mailto:${email || 'concierge@sofalora.com'}`,
    hours: pickText(language, brand.hoursEn, brand.hoursAr, t('workingHours')),
  };
}

interface AuthLayoutProps {
  children: React.ReactNode;
  /** Show the brand image + account benefits panel on large screens. */
  showBrandPanel?: boolean;
}

/**
 * Focused layout for sign-in / register / forgot-password: no site header, mega menu,
 * footer, bottom tab bar or floating buttons. Minimal top bar + centered card + slim footer.
 */
export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, showBrandPanel = true }) => {
  const { language, direction, toggleLanguage, paymentMethods } = useShop();
  const { banners } = useWebsite();
  const contact = useStoreContact();
  const isAr = language === 'ar';
  const BackIcon = direction === 'rtl' ? ArrowRight : ArrowLeft;
  const image = cmsImage(banners[0]?.image, DEFAULT_AUTH_IMAGE);

  const benefits = [
    { icon: PackageSearch, en: 'Track every order in one place', ar: 'تابع جميع طلباتك من مكان واحد' },
    { icon: MapPin, en: 'Save your delivery details for a faster checkout', ar: 'احفظ بيانات التوصيل لإتمام الطلب بشكل أسرع' },
    { icon: History, en: 'See your full order history anytime', ar: 'اطّلع على سجل طلباتك في أي وقت' },
    ...(paymentMethods.includes('cod')
      ? [{ icon: Banknote, en: 'Pay cash on delivery', ar: 'الدفع نقداً عند الاستلام' }]
      : []),
  ];

  return (
    <div id="auth-layout" className="min-h-screen flex flex-col bg-[#F6F4EF] text-[#101828] antialiased">
      {/* Minimal top bar */}
      <header className="bg-white border-b border-[#E5E1D8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <Link href="/" id="auth-home-link" aria-label={isAr ? 'سوفالورا - الصفحة الرئيسية' : 'Sofalora home'} className="shrink-0">
            <BrandLogo size="md" hideTaglineOnMobile />
          </Link>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              id="auth-language-toggle"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-[#344054] hover:bg-[#F3F1EB] transition-colors"
              aria-label={isAr ? 'Switch to English' : 'التبديل إلى العربية'}
            >
              <Globe className="w-4 h-4" />
              <span>{isAr ? 'English' : 'العربية'}</span>
            </button>
            <Link
              href="/"
              id="auth-back-to-store"
              aria-label={isAr ? 'العودة للمتجر' : 'Back to store'}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-[#0B2345] hover:bg-[#F3F1EB] transition-colors"
            >
              <BackIcon className="w-4 h-4" />
              <span className="hidden sm:inline">{isAr ? 'العودة للمتجر' : 'Back to store'}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Centered card */}
      <main className="flex-1 flex items-start sm:items-center justify-center px-3 sm:px-6 py-6 sm:py-12">
        <div
          className={`w-full ${showBrandPanel ? 'max-w-[960px] lg:grid lg:grid-cols-[1fr_1.05fr]' : 'max-w-[480px]'} bg-white rounded-2xl sm:rounded-3xl border border-[#E5E1D8] shadow-[0_10px_40px_-12px_rgba(10,42,94,0.18)] overflow-hidden`}
        >
          {showBrandPanel && (
            <aside className="hidden lg:flex relative flex-col justify-end min-h-[600px] text-white">
              <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A35] via-[#071A35]/55 to-transparent" />
              <div className="relative p-10 space-y-6">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#D9C29A]">
                    {isAr ? 'حساب سوفالورا' : 'Your Sofalora account'}
                  </p>
                  <h2 className="mt-2 text-3xl font-extrabold font-serif-luxury leading-tight">
                    {isAr ? 'كل ما يخص طلباتك في مكان واحد' : 'Everything about your orders, in one place'}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {benefits.map((b) => (
                    <li key={b.en} className="flex items-center gap-3 text-sm text-white/90">
                      <span className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                        <b.icon className="w-4 h-4 text-[#D9C29A]" />
                      </span>
                      <span>{isAr ? b.ar : b.en}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}
          <section className="px-5 py-7 sm:px-10 sm:py-10">{children}</section>
        </div>
      </main>

      {/* Slim footer */}
      <footer className="border-t border-[#E5E1D8] bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#667085]">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#2A7531]" />
            <span>© {new Date().getFullYear()} {isAr ? 'سوفالورا' : 'Sofalora'}. {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</span>
          </div>
          <nav aria-label={isAr ? 'روابط المساعدة' : 'Help links'} className="flex items-center gap-4">
            <Link href="/orders" className="hover:text-[#0B2345]">{isAr ? 'تتبع طلب' : 'Track an order'}</Link>
            <Link href="/forgot-password" className="hover:text-[#0B2345]">{isAr ? 'مساعدة في تسجيل الدخول' : 'Sign-in help'}</Link>
            <a href={contact.phoneHref} dir="ltr" className="hover:text-[#0B2345]">{contact.phoneLabel}</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};
