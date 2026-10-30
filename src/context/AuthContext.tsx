import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useShop } from './LanguageContext';
import {
  CommerceApiError,
  changeCustomerPassword,
  fetchCustomerMe,
  fetchCustomerOrders,
  loginCustomer,
  logoutCustomer,
  registerCustomer,
  updateCustomerMe,
  type CustomerAddress,
  type CustomerProfile,
} from '../lib/api';
import { getCustomerToken, onCustomerTokenChange, setCustomerToken } from '../lib/customerAuth';
import { useRouter } from './RouterContext';

/**
 * Storefront customer accounts. The token lives in localStorage (lib/customerAuth) and is
 * attached to /storefront/customer/* calls and to checkout so orders link to the account.
 * Login/registration visibility follows the admin switches exposed by checkout-settings.
 */
export type AuthStatus = 'loading' | 'guest' | 'authenticated';

export interface RegisterInput {
  name: string;
  phone: string;
  email?: string;
  password: string;
  passwordConfirmation: string;
}

interface AuthContextValue {
  status: AuthStatus;
  customer: CustomerProfile | null;
  /** Admin switches (false until checkout settings load). */
  loginEnabled: boolean;
  registrationEnabled: boolean;
  settingsReady: boolean;
  /** `remember: false` keeps the session for this browser session only. */
  login: (login: string, password: string, options?: { remember?: boolean }) => Promise<CustomerProfile>;
  register: (input: RegisterInput) => Promise<CustomerProfile>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (patch: { name?: string; email?: string | null; addresses?: CustomerAddress[] }) => Promise<CustomerProfile>;
  changePassword: (current: string, next: string, confirmation: string) => Promise<void>;
  /** Reload the account order history from the API into the shared order list. */
  loadOrders: () => Promise<void>;
  ordersStatus: 'idle' | 'loading' | 'ready' | 'error';
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { checkoutSettings, checkoutSettingsStatus, mergeAccountOrders, forgetAccountOrders } = useShop();
  const [token, setToken] = useState<string | null>(() => getCustomerToken());
  const [customer, setCustomer] = useState<CustomerProfile | null>(null);
  const [status, setStatus] = useState<AuthStatus>(() => (getCustomerToken() ? 'loading' : 'guest'));
  const [ordersStatus, setOrdersStatus] = useState<AuthContextValue['ordersStatus']>('idle');
  const tokenRef = useRef(token);
  tokenRef.current = token;

  const loginEnabled = checkoutSettings?.customer_accounts.login_enabled === true;
  const registrationEnabled = loginEnabled && checkoutSettings?.customer_accounts.registration_enabled === true;

  useEffect(() => onCustomerTokenChange((t) => setToken(t)), []);

  const clearSession = useCallback(() => {
    setCustomerToken(null);
    setCustomer(null);
    setStatus('guest');
    setOrdersStatus('idle');
    forgetAccountOrders();
  }, [forgetAccountOrders]);

  /** Any 401/403 on a customer call means the session is over (expired, disabled, revoked). */
  const handleAuthError = useCallback(
    (err: unknown) => {
      if (err instanceof CommerceApiError && (err.status === 401 || err.status === 403)) clearSession();
    },
    [clearSession]
  );

  const loadOrders = useCallback(async () => {
    const t = tokenRef.current;
    if (!t) return;
    setOrdersStatus('loading');
    try {
      const list = await fetchCustomerOrders(t);
      mergeAccountOrders(list);
      setOrdersStatus('ready');
    } catch (err) {
      handleAuthError(err);
      setOrdersStatus('error');
    }
  }, [mergeAccountOrders, handleAuthError]);

  const refreshProfile = useCallback(async () => {
    const t = tokenRef.current;
    if (!t) {
      setStatus('guest');
      return;
    }
    try {
      const me = await fetchCustomerMe(t);
      setCustomer(me);
      setStatus('authenticated');
    } catch (err) {
      if (err instanceof CommerceApiError && (err.status === 401 || err.status === 403)) {
        clearSession();
      } else {
        // API unreachable: keep the token, show the guest UI for now.
        setStatus('guest');
      }
    }
  }, [clearSession]);

  // Restore the session on load.
  useEffect(() => {
    if (token) void refreshProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If the admin turns customer login off, end the local session quietly.
  useEffect(() => {
    if (checkoutSettingsStatus === 'ready' && !loginEnabled && tokenRef.current) clearSession();
  }, [checkoutSettingsStatus, loginEnabled, clearSession]);

  useEffect(() => {
    if (status === 'authenticated') void loadOrders();
  }, [status, loadOrders]);

  const startSession = useCallback((newToken: string, profile: CustomerProfile, remember = true) => {
    setCustomerToken(newToken, { remember });
    tokenRef.current = newToken;
    setCustomer(profile);
    setStatus('authenticated');
  }, []);

  const login = useCallback(
    async (loginId: string, password: string, options?: { remember?: boolean }) => {
      const session = await loginCustomer(loginId.trim(), password);
      startSession(session.token, session.customer, options?.remember !== false);
      return session.customer;
    },
    [startSession]
  );

  const register = useCallback(
    async (input: RegisterInput) => {
      const session = await registerCustomer({
        name: input.name.trim(),
        phone: input.phone.trim(),
        ...(input.email?.trim() ? { email: input.email.trim() } : {}),
        password: input.password,
        password_confirmation: input.passwordConfirmation,
      });
      startSession(session.token, session.customer);
      return session.customer;
    },
    [startSession]
  );

  const logout = useCallback(async () => {
    const t = tokenRef.current;
    if (t) {
      try {
        await logoutCustomer(t);
      } catch {
        // Token already invalid or API offline: still sign out locally.
      }
    }
    clearSession();
  }, [clearSession]);

  const updateProfile = useCallback(
    async (patch: { name?: string; email?: string | null; addresses?: CustomerAddress[] }) => {
      const t = tokenRef.current;
      if (!t) throw new CommerceApiError('Please sign in to your account.', 401, 'unauthenticated');
      try {
        const me = await updateCustomerMe(t, patch);
        setCustomer(me);
        return me;
      } catch (err) {
        handleAuthError(err);
        throw err;
      }
    },
    [handleAuthError]
  );

  const changePassword = useCallback(
    async (current: string, next: string, confirmation: string) => {
      const t = tokenRef.current;
      if (!t) throw new CommerceApiError('Please sign in to your account.', 401, 'unauthenticated');
      try {
        await changeCustomerPassword(t, { current_password: current, password: next, password_confirmation: confirmation });
      } catch (err) {
        if (!(err instanceof CommerceApiError && err.status === 422)) handleAuthError(err);
        throw err;
      }
    },
    [handleAuthError]
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      customer,
      loginEnabled,
      registrationEnabled,
      settingsReady: checkoutSettingsStatus !== 'loading',
      login,
      register,
      logout,
      refreshProfile,
      updateProfile,
      changePassword,
      loadOrders,
      ordersStatus,
    }),
    [status, customer, loginEnabled, registrationEnabled, checkoutSettingsStatus, login, register, logout, refreshProfile, updateProfile, changePassword, loadOrders, ordersStatus]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

/** Friendly EN/AR text for customer API errors (the API answers in English). */
export function authErrorText(err: unknown, lang: 'en' | 'ar'): string {
  const ar: Record<string, string> = {
    invalid_credentials: 'رقم الجوال/البريد أو كلمة المرور غير صحيحة.',
    phone_taken: 'يوجد حساب بهذا الرقم. يرجى تسجيل الدخول.',
    email_taken: 'هذا البريد مستخدم في حساب آخر.',
    invalid_phone: 'أدخل رقم جوال سعودي صحيح، مثل 05XXXXXXXX.',
    registration_disabled: 'إنشاء الحسابات متوقف حالياً.',
    login_disabled: 'تسجيل الدخول متوقف حالياً.',
    account_disabled: 'تم إيقاف هذا الحساب. يرجى التواصل مع خدمة العملاء.',
    too_many_attempts: 'محاولات كثيرة. يرجى الانتظار دقيقة ثم المحاولة مجدداً.',
    current_password: 'كلمة المرور الحالية غير صحيحة.',
    unauthenticated: 'يرجى تسجيل الدخول إلى حسابك.',
  };
  if (err instanceof CommerceApiError) {
    if (lang === 'ar') {
      if (err.code && ar[err.code]) return ar[err.code];
      if (err.status === 429) return ar.too_many_attempts;
      if (err.status === 0) return 'تعذر الاتصال بالخادم. حاول مرة أخرى.';
      return 'تعذر إكمال الطلب. تحقق من البيانات وحاول مجدداً.';
    }
    if (err.status === 429 && !err.code) return 'Too many attempts. Please wait a minute and try again.';
    return err.message;
  }
  return lang === 'ar' ? 'تعذر الاتصال بالخادم. حاول مرة أخرى.' : 'Could not reach the store. Please try again.';
}

/** Pages that should not be used as the "come back here after sign-in" target. */
const NO_RETURN = ['/login', '/register', '/forgot-password', '/account', '/order-confirmation'];

/** `/login?next=<current page>` so sign-in returns the customer to where they were. */
export function useSignInHref(target: '/login' | '/register' = '/login'): string {
  const { route } = useRouter();
  const path = route.path || '/';
  if (NO_RETURN.includes(path.toLowerCase())) return target;
  const qs = new URLSearchParams(route.query).toString();
  const here = path + (qs ? `?${qs}` : '');
  return `${target}?next=${encodeURIComponent(here)}`;
}

/** Where the account icon should go: the account page when signed in (or when login is off), else sign-in. */
export function useAccountLink(lang: 'en' | 'ar'): { href: string; label: string; signedIn: boolean } {
  const { status, customer, loginEnabled } = useAuth();
  const signInHref = useSignInHref('/login');
  const signedIn = status === 'authenticated' && customer !== null;
  if (signedIn) {
    const first = customer!.name.trim().split(/\s+/)[0] || (lang === 'ar' ? 'حسابي' : 'Account');
    return { href: '/account', label: first, signedIn };
  }
  if (loginEnabled && status !== 'loading') {
    return { href: signInHref, label: lang === 'ar' ? 'تسجيل الدخول' : 'Sign in', signedIn };
  }
  return { href: '/account', label: lang === 'ar' ? 'حسابي' : 'Account', signedIn };
}
