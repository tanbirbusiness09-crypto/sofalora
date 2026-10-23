import React from 'react';
import { Home, LayoutGrid, Heart, ShoppingBag, User } from 'lucide-react';
import { Link, useRouter } from '../../context/RouterContext';
import { useShop } from '../../context/LanguageContext';

export const BottomTabBar: React.FC = () => {
  const { language, t, cartCount, wishlistCount, openCart } = useShop();
  const { pathname } = useRouter();
  const p = pathname.toLowerCase();
  const isAr = language === 'ar';

  const shopPrefixes = [
    '/shop',
    '/products',
    '/category/',
    '/product/',
    '/search',
    '/new-arrivals',
    '/best-sellers',
    '/offers',
    '/sale',
    '/collection/',
  ];
  const activeKey = p === '/' || p === ''
    ? 'home'
    : shopPrefixes.some((prefix) => p.startsWith(prefix))
      ? 'shop'
      : p === '/wishlist'
        ? 'wishlist'
        : p === '/cart'
          ? 'cart'
          : p === '/orders' || p.startsWith('/orders/')
            ? 'account'
            : null;

  // Hide the tab bar on checkout (app-like focused flow)
  const isHidden = p === '/checkout' || p === '/order-confirmation';
  if (isHidden) return null;

  const badge = (count: number) =>
    count > 0 ? (
      <span className="absolute -top-1.5 -end-2 min-w-[16px] h-4 px-1 rounded-full bg-[#C8102E] text-white text-[9px] font-extrabold flex items-center justify-center shadow-sm">
        {count > 99 ? '99+' : count}
      </span>
    ) : null;

  const tabClass = (key: string) => {
    const active = activeKey === key;
    const color = active ? 'text-[#0A2A5E]' : 'text-[#98A2B3]';
    return `relative flex-1 flex flex-col items-center gap-1 py-2 ${color} active:text-[#0A2A5E] transition-colors`;
  };
  const tabLabel = (label: string, active: boolean) => (
    <span className={`text-[10px] leading-none font-semibold ${active ? 'font-bold' : ''}`}>
      {label}
    </span>
  );

  return (
    <>
      {/* Spacer so footer content is not hidden behind the fixed bar */}
      <div className="h-[62px] md:hidden" aria-hidden="true" />

      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5E1D8] shadow-[0_-4px_16px_rgba(16,24,40,0.06)]"
        style={{ paddingBottom: 'calc(2px + env(safe-area-inset-bottom))' }}
        aria-label={isAr ? 'التنقل السفلي' : 'Bottom navigation'}
      >
        {/* Top accent line */}
        <span className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C8102E]/60 to-transparent" />

        <div className="flex items-stretch px-1 max-w-lg mx-auto">
          {/* Home */}
          <Link href="/" className={tabClass('home')} aria-label={t('navHome')} aria-current={activeKey === 'home' ? 'page' : undefined}>
            <Home className={`w-5 h-5 ${activeKey === 'home' ? 'stroke-[2]' : 'stroke-[1.8]'}`} />
            {tabLabel(t('navHome'), activeKey === 'home')}
            {activeKey === 'home' && <span className="absolute bottom-0.5 w-4 h-0.5 rounded-full bg-[#C8102E]" />}
          </Link>

          {/* Shop */}
          <Link href="/shop" className={tabClass('shop')} aria-label={isAr ? 'تسوق' : 'Shop'} aria-current={activeKey === 'shop' ? 'page' : undefined}>
            <LayoutGrid className={`w-5 h-5 ${activeKey === 'shop' ? 'stroke-[2]' : 'stroke-[1.8]'}`} />
            {tabLabel(isAr ? 'تسوق' : 'Shop', activeKey === 'shop')}
            {activeKey === 'shop' && <span className="absolute bottom-0.5 w-4 h-0.5 rounded-full bg-[#C8102E]" />}
          </Link>

          {/* Wishlist */}
          <Link href="/wishlist" className={tabClass('wishlist')} aria-label={t('wishlist')} aria-current={activeKey === 'wishlist' ? 'page' : undefined}>
            <span className="relative">
              <Heart className={`w-5 h-5 ${activeKey === 'wishlist' ? 'stroke-[2] fill-[#0A2A5E]/10' : 'stroke-[1.8]'}`} />
              {badge(wishlistCount)}
            </span>
            {tabLabel(t('wishlist'), activeKey === 'wishlist')}
            {activeKey === 'wishlist' && <span className="absolute bottom-0.5 w-4 h-0.5 rounded-full bg-[#C8102E]" />}
          </Link>

          {/* Cart (opens drawer) */}
          <button
            type="button"
            onClick={openCart}
            className={tabClass('cart')}
            aria-label={t('cart')}
          >
            <span className="relative">
              <ShoppingBag className={`w-5 h-5 ${activeKey === 'cart' ? 'stroke-[2]' : 'stroke-[1.8]'}`} />
              {badge(cartCount)}
            </span>
            {tabLabel(t('cart'), activeKey === 'cart')}
            {activeKey === 'cart' && <span className="absolute bottom-0.5 w-4 h-0.5 rounded-full bg-[#C8102E]" />}
          </button>

          {/* Account / Orders */}
          <Link href="/orders" className={tabClass('account')} aria-label={t('account')} aria-current={activeKey === 'account' ? 'page' : undefined}>
            <User className={`w-5 h-5 ${activeKey === 'account' ? 'stroke-[2]' : 'stroke-[1.8]'}`} />
            {tabLabel(t('account'), activeKey === 'account')}
            {activeKey === 'account' && <span className="absolute bottom-0.5 w-4 h-0.5 rounded-full bg-[#C8102E]" />}
          </Link>
        </div>
      </nav>
    </>
  );
};
