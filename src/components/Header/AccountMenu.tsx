import React, { useEffect, useRef, useState } from 'react';
import { User, ChevronDown, LogOut, Package, UserCircle, Heart, PackageSearch } from 'lucide-react';
import { useShop } from '../../context/LanguageContext';
import { useAuth, useSignInHref } from '../../context/AuthContext';
import { Link, useRouter } from '../../context/RouterContext';
import { localSaudiPhone } from '../../lib/customerAuth';

/**
 * Desktop header account entry (Amazon/Noon style): "Hello, sign in / Account & orders".
 * Logged out: Sign in button + Create account + Track an order.
 * Logged in: name, My Account, My Orders, Wishlist, Sign out.
 * When customer login is disabled by the admin it stays a plain link to /account.
 */
export const AccountMenu: React.FC = () => {
  const { language, showToast } = useShop();
  const auth = useAuth();
  const { navigate, pathname } = useRouter();
  const signInHref = useSignInHref('/login');
  const registerHref = useSignInHref('/register');
  const isAr = language === 'ar';
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const signedIn = auth.status === 'authenticated' && auth.customer !== null;
  const firstName = signedIn ? auth.customer!.name.trim().split(/\s+/)[0] : '';

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  // Login switched off (or settings still loading with no session): plain account link.
  if (!signedIn && (!auth.loginEnabled || auth.status === 'loading')) {
    return (
      <Link
        id="header-account-link"
        href="/account"
        className="hidden lg:flex items-center gap-1.5 p-2 group rounded-full hover:bg-white/10 text-[#EDE3D1] hover:text-[#D9C29A] transition-colors"
        aria-label={isAr ? 'حسابي' : 'Account'}
      >
        <User className="w-5 h-5" />
        <span className="text-xs font-medium hidden xl:inline-block">{isAr ? 'الحساب والطلبات' : 'Account & Orders'}</span>
      </Link>
    );
  }

  const openNow = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 180);
  };

  const signOut = async () => {
    setSigningOut(true);
    try {
      await auth.logout();
      showToast(isAr ? 'تم تسجيل الخروج' : 'You have been signed out', 'info');
      setOpen(false);
      const p = pathname.toLowerCase();
      if (p === '/account' || p.startsWith('/orders')) navigate('/');
    } finally {
      setSigningOut(false);
    }
  };

  const itemClass =
    'flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-[#344054] hover:bg-[#F3F1EB] hover:text-[#0B2345] focus:bg-[#F3F1EB] focus:outline-none transition-colors';

  return (
    <div
      ref={wrapRef}
      className="relative hidden lg:block"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
    >
      <button
        type="button"
        id="header-account-link"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="header-account-menu"
        data-signed-in={signedIn ? 'true' : 'false'}
        className="flex items-center gap-1.5 px-2 py-1.5 group rounded-full hover:bg-white/10 text-[#EDE3D1] hover:text-[#D9C29A] transition-colors"
      >
        <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${signedIn ? 'bg-[#B59460] text-[#0B2345] text-xs font-bold' : ''}`}>
          {signedIn ? (firstName.charAt(0).toUpperCase() || <User className="w-4 h-4" />) : <User className="w-5 h-5 text-[#EDE3D1] group-hover:text-[#D9C29A]" />}
        </span>
        <span className="hidden xl:flex flex-col items-start leading-tight text-start">
          <span className="text-[10px] text-[#C9B892]/80 max-w-[7rem] truncate">
            {signedIn ? (isAr ? `مرحباً، ${firstName}` : `Hello, ${firstName}`) : (isAr ? 'مرحباً، سجّل الدخول' : 'Hello, sign in')}
          </span>
          <span className="text-xs font-bold text-white group-hover:text-[#D9C29A]">{isAr ? 'الحساب والطلبات' : 'Account & Orders'}</span>
        </span>
        <ChevronDown className={`hidden xl:block w-3.5 h-3.5 text-[#C9B892] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          id="header-account-menu"
          role="menu"
          aria-labelledby="header-account-link"
          className="absolute end-0 top-full pt-2 z-50 w-64 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          <div className="bg-white rounded-2xl border border-[#E5E1D8] shadow-xl p-2">
            {signedIn ? (
              <>
                <div className="px-3 py-2.5 border-b border-[#F0EDE6] mb-1">
                  <p className="text-sm font-bold text-[#101828] truncate">{auth.customer!.name}</p>
                  <p className="text-[11px] text-[#667085] truncate" dir="ltr">{auth.customer!.email || localSaudiPhone(auth.customer!.phone)}</p>
                </div>
                <Link href="/account" role="menuitem" id="header-menu-account" className={itemClass}>
                  <UserCircle className="w-4 h-4" /> {isAr ? 'حسابي' : 'My Account'}
                </Link>
                <Link href="/orders" role="menuitem" id="header-menu-orders" className={itemClass}>
                  <Package className="w-4 h-4" /> {isAr ? 'طلباتي' : 'My Orders'}
                </Link>
                <Link href="/wishlist" role="menuitem" className={itemClass}>
                  <Heart className="w-4 h-4" /> {isAr ? 'المفضلة' : 'Wishlist'}
                </Link>
                <div className="border-t border-[#F0EDE6] mt-1 pt-1">
                  <button type="button" role="menuitem" id="header-menu-logout" disabled={signingOut} onClick={signOut} className={`${itemClass} w-full text-[#B59460] hover:text-[#B59460] disabled:opacity-60`}>
                    <LogOut className="w-4 h-4" /> {isAr ? 'تسجيل الخروج' : 'Sign out'}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="p-2">
                  <Link href={signInHref} role="menuitem" id="header-menu-signin" className="w-full inline-flex justify-center bg-[#0B2345] hover:bg-[#071A35] text-white py-2.5 rounded-xl text-sm font-bold transition-colors">
                    {isAr ? 'تسجيل الدخول' : 'Sign in'}
                  </Link>
                  {auth.registrationEnabled && (
                    <p className="mt-2.5 text-center text-xs text-[#667085]">
                      {isAr ? 'عميل جديد؟ ' : 'New customer? '}
                      <Link href={registerHref} role="menuitem" id="header-menu-register" className="font-bold text-[#0B2345] hover:text-[#B59460] hover:underline">
                        {isAr ? 'أنشئ حساباً' : 'Create an account'}
                      </Link>
                    </p>
                  )}
                </div>
                <div className="border-t border-[#F0EDE6] mt-1 pt-1">
                  <Link href="/orders" role="menuitem" className={itemClass}>
                    <PackageSearch className="w-4 h-4" /> {isAr ? 'تتبع طلب' : 'Track an order'}
                  </Link>
                  <Link href="/wishlist" role="menuitem" className={itemClass}>
                    <Heart className="w-4 h-4" /> {isAr ? 'المفضلة' : 'Wishlist'}
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
