import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useShop } from '../context/LanguageContext';
import { useRouter, Link } from '../context/RouterContext';
import { useAuth, authErrorText } from '../context/AuthContext';
import { CommerceApiError } from '../lib/api';
import { AuthLayout } from '../components/Auth/AuthLayout';
import { Eye, EyeOff, Loader2, PackageSearch, ShoppingBag, AlertCircle, Check, Info } from 'lucide-react';

/** Only allow in-site redirects after sign-in. */
const safeNext = (value: string | null): string =>
  value && value.startsWith('/') && !value.startsWith('//') ? value : '/account';

const PHONE_RE = /^(?:\+?966|0)?5\d{8}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Mode = 'login' | 'register';
type FieldKey = 'login' | 'name' | 'phone' | 'email' | 'password' | 'password_confirmation';

const TXT = {
  en: {
    signIn: 'Sign in',
    createAccount: 'Create account',
    loginTitle: 'Sign in to your account',
    loginSub: 'Welcome back! Track your orders and check out faster.',
    registerTitle: 'Create your account',
    registerSub: 'Save your details and keep your order history in one place.',
    loginId: 'Mobile number or email',
    loginIdHint: 'Use the mobile number you registered with, e.g. 05XXXXXXXX',
    password: 'Password',
    forgot: 'Forgot password?',
    remember: 'Keep me signed in',
    rememberHint: 'Uncheck on shared or public devices.',
    show: 'Show password',
    hide: 'Hide password',
    signingIn: 'Signing in…',
    creating: 'Creating account…',
    name: 'Full name',
    phone: 'Mobile number',
    phoneHint: 'Saudi mobile number, used to sign in',
    email: 'Email',
    optional: '(optional)',
    newPassword: 'Create a password',
    confirm: 'Confirm password',
    pwHint: 'At least 8 characters. Mix letters, numbers and symbols for a stronger password.',
    strength: ['Too short', 'Weak', 'Fair', 'Good', 'Strong'],
    strengthLabel: 'Password strength',
    match: 'Passwords match',
    or: 'or',
    noAccount: 'New to Sofalora?',
    haveAccount: 'Already have an account?',
    guest: 'Continue as guest',
    guestNote: 'Checking out? Sign in to use your saved details, or continue as a guest — no account needed.',
    guestNoteRegister: 'Checking out? Create an account to save this order to it, or continue as a guest — no account needed.',
    guestFooter: 'You can always check out as a guest — no account needed.',
    track: 'Track an order',
    loginOff: 'Sign-in is not available right now. You can still order as a guest and track orders by order number.',
    registerOff: 'New account registration is not available right now.',
    haveAccountSignIn: 'Have an account? Sign in',
    signInInstead: 'Sign in instead',
    tabs: 'Sign in or create an account',
    err: {
      login: 'Please enter your mobile number or email.',
      password: 'Please enter your password.',
      name: 'Please enter your name.',
      phone: 'Enter a valid Saudi mobile number, e.g. 05XXXXXXXX.',
      email: 'Please enter a valid email address.',
      newPassword: 'Password must be at least 8 characters.',
      confirm: 'The passwords do not match.',
    },
    welcomeBack: (n: string) => `Welcome back, ${n}`,
    welcomeNew: (n: string) => `Welcome, ${n}! Your account is ready.`,
  },
  ar: {
    signIn: 'تسجيل الدخول',
    createAccount: 'إنشاء حساب',
    loginTitle: 'تسجيل الدخول إلى حسابك',
    loginSub: 'أهلاً بعودتك! تابع طلباتك وأكمل الشراء بسرعة.',
    registerTitle: 'إنشاء حساب جديد',
    registerSub: 'احفظ بياناتك وتابع سجل طلباتك في مكان واحد.',
    loginId: 'رقم الجوال أو البريد الإلكتروني',
    loginIdHint: 'استخدم رقم الجوال المسجّل، مثل 05XXXXXXXX',
    password: 'كلمة المرور',
    forgot: 'نسيت كلمة المرور؟',
    remember: 'تذكرني',
    rememberHint: 'ألغِ التحديد على الأجهزة المشتركة أو العامة.',
    show: 'إظهار كلمة المرور',
    hide: 'إخفاء كلمة المرور',
    signingIn: 'جارٍ تسجيل الدخول…',
    creating: 'جارٍ إنشاء الحساب…',
    name: 'الاسم الكامل',
    phone: 'رقم الجوال',
    phoneHint: 'رقم جوال سعودي، يُستخدم لتسجيل الدخول',
    email: 'البريد الإلكتروني',
    optional: '(اختياري)',
    newPassword: 'أنشئ كلمة مرور',
    confirm: 'تأكيد كلمة المرور',
    pwHint: '٨ أحرف على الأقل. استخدم حروفاً وأرقاماً ورموزاً لكلمة مرور أقوى.',
    strength: ['قصيرة جداً', 'ضعيفة', 'متوسطة', 'جيدة', 'قوية'],
    strengthLabel: 'قوة كلمة المرور',
    match: 'كلمتا المرور متطابقتان',
    or: 'أو',
    noAccount: 'جديد في سوفالورا؟',
    haveAccount: 'لديك حساب بالفعل؟',
    guest: 'المتابعة كضيف',
    guestNote: 'تريد إتمام الطلب؟ سجّل الدخول لاستخدام بياناتك المحفوظة، أو تابع كضيف بدون حساب.',
    guestNoteRegister: 'تريد إتمام الطلب؟ أنشئ حساباً ليُحفظ طلبك فيه، أو تابع كضيف بدون حساب.',
    guestFooter: 'يمكنك دائماً إتمام الطلب كضيف بدون حساب.',
    track: 'تتبع طلب',
    loginOff: 'تسجيل الدخول غير متاح حالياً. يمكنك الطلب كضيف وتتبع طلبك برقم الطلب.',
    registerOff: 'إنشاء الحسابات غير متاح حالياً.',
    haveAccountSignIn: 'لديك حساب؟ سجّل الدخول',
    signInInstead: 'سجّل الدخول بدلاً من ذلك',
    tabs: 'تسجيل الدخول أو إنشاء حساب',
    err: {
      login: 'أدخل رقم الجوال أو البريد الإلكتروني',
      password: 'أدخل كلمة المرور',
      name: 'يرجى إدخال الاسم',
      phone: 'أدخل رقم جوال سعودي صحيح، مثل 05XXXXXXXX.',
      email: 'البريد الإلكتروني غير صالح',
      newPassword: 'كلمة المرور ٨ أحرف على الأقل',
      confirm: 'كلمتا المرور غير متطابقتين',
    },
    welcomeBack: (n: string) => `أهلاً بعودتك ${n}`,
    welcomeNew: (n: string) => `مرحباً ${n}! تم إنشاء حسابك.`,
  },
};

/** 0 = too short, 1..4 = weak..strong. */
function passwordScore(pw: string): number {
  if (pw.length < 8) return 0;
  let score = 1;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw) && /[^\d]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw) || pw.length >= 12) score++;
  return Math.min(score, 4);
}
const STRENGTH_COLORS = ['bg-[#B59460]', 'bg-[#B59460]', 'bg-[#D97706]', 'bg-[#2A7531]', 'bg-[#2A7531]'];

const inputBase =
  'w-full bg-white border rounded-xl px-3.5 py-3 text-sm text-[#101828] placeholder-[#98A2B3] outline-none transition focus:ring-4';
const inputOk = 'border-[#D0D5DD] focus:border-[#0B2345] focus:ring-[#0B2345]/10';
const inputBad = 'border-[#B59460] focus:border-[#B59460] focus:ring-[#B59460]/10';

export const AuthPage: React.FC<{ mode: Mode }> = ({ mode }) => {
  const { language, showToast } = useShop();
  const { navigate, searchParams } = useRouter();
  const auth = useAuth();
  const isAr = language === 'ar';
  const L = TXT[language === 'ar' ? 'ar' : 'en'];
  const next = safeNext(searchParams.get('next'));
  const nextQuery = next !== '/account' ? `?next=${encodeURIComponent(next)}` : '';
  const fromCheckout = next.startsWith('/checkout');

  const [loginId, setLoginId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [errorCode, setErrorCode] = useState<string | undefined>();
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (auth.status === 'authenticated') navigate(next, { replace: true });
  }, [auth.status, next, navigate]);

  useEffect(() => {
    setError('');
    setErrorCode(undefined);
    setServerErrors({});
    setTouched({});
    setSubmitted(false);
    setPassword('');
    setPassword2('');
  }, [mode]);

  const clientErrors = useMemo(() => {
    const errs: Partial<Record<FieldKey, string>> = {};
    if (mode === 'register') {
      if (!name.trim()) errs.name = L.err.name;
      if (!PHONE_RE.test(phone.replace(/[\s-]/g, ''))) errs.phone = L.err.phone;
      if (email.trim() && !EMAIL_RE.test(email.trim())) errs.email = L.err.email;
      if (password.length < 8) errs.password = L.err.newPassword;
      if (password !== password2 || !password2) errs.password_confirmation = L.err.confirm;
    } else {
      if (!loginId.trim()) errs.login = L.err.login;
      if (!password) errs.password = L.err.password;
    }
    return errs;
  }, [mode, name, phone, email, password, password2, loginId, L]);

  const errorFor = (key: FieldKey): string | undefined =>
    serverErrors[key] || ((submitted || touched[key]) ? clientErrors[key] : undefined);

  const touch = (key: FieldKey) => () => setTouched((t) => ({ ...t, [key]: true }));
  const edit = (key: FieldKey, setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    if (serverErrors[key]) setServerErrors(({ [key]: _drop, ...rest }) => rest);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setSubmitted(true);
    setError('');
    setErrorCode(undefined);
    setServerErrors({});
    const firstBad = (Object.keys(clientErrors) as FieldKey[])[0];
    if (firstBad) {
      const el = formRef.current?.querySelector<HTMLInputElement>(`[data-field="${firstBad}"]`);
      el?.focus();
      return;
    }

    setBusy(true);
    try {
      if (mode === 'register') {
        const me = await auth.register({ name, phone, email, password, passwordConfirmation: password2 });
        showToast(L.welcomeNew(me.name), 'success');
      } else {
        const me = await auth.login(loginId, password, { remember });
        showToast(L.welcomeBack(me.name), 'success');
      }
      navigate(next, { replace: true });
    } catch (err) {
      setError(authErrorText(err, language));
      if (err instanceof CommerceApiError) {
        setErrorCode(err.code);
        // The API answers in English; show its per-field messages inline for EN only.
        if (Object.keys(err.fieldErrors).length && language === 'en') setServerErrors(err.fieldErrors);
      }
    } finally {
      setBusy(false);
    }
  };

  const unavailable = auth.settingsReady && (mode === 'login' ? !auth.loginEnabled : !auth.registrationEnabled);
  const score = passwordScore(password);

  const fieldProps = (key: FieldKey, id: string, hintId?: string) => {
    const err = errorFor(key);
    return {
      id,
      'data-field': key,
      onBlur: touch(key),
      'aria-invalid': err ? true : undefined,
      'aria-describedby': [err ? `${id}-error` : '', hintId ?? ''].filter(Boolean).join(' ') || undefined,
      className: `${inputBase} ${err ? inputBad : inputOk}`,
    } as const;
  };

  const FieldError: React.FC<{ k: FieldKey; id: string }> = ({ k, id }) => {
    const err = errorFor(k);
    return err ? (
      <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1 text-xs text-[#B59460]">
        <AlertCircle className="w-3.5 h-3.5 mt-px shrink-0" />
        <span>{err}</span>
      </p>
    ) : null;
  };

  const labelClass = 'block text-[13px] font-semibold text-[#344054] mb-1.5';
  const ltrInput = isAr ? 'text-end' : '';

  const PasswordToggle = (
    <button
      type="button"
      onClick={() => setShowPassword((v) => !v)}
      className="absolute inset-y-0 end-0 px-3.5 text-[#667085] hover:text-[#0B2345]"
      aria-label={showPassword ? L.hide : L.show}
      aria-pressed={showPassword}
    >
      {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
    </button>
  );

  const tabClass = (active: boolean) =>
    `flex-1 text-center py-2.5 rounded-lg text-sm font-bold transition-colors ${
      active ? 'bg-white text-[#0B2345] shadow-sm' : 'text-[#667085] hover:text-[#0B2345]'
    }`;

  return (
    <AuthLayout>
      <div className="max-w-[400px] mx-auto">
        {/* Sign in / Create account switch */}
        {auth.settingsReady && auth.loginEnabled && auth.registrationEnabled && (
          <nav aria-label={L.tabs} className="flex gap-1 p-1 bg-[#F3F1EB] rounded-xl mb-7">
            <Link id="auth-tab-login" href={`/login${nextQuery}`} replace scroll={false} className={tabClass(mode === 'login')} aria-current={mode === 'login' ? 'page' : undefined}>
              {L.signIn}
            </Link>
            <Link id="auth-tab-register" href={`/register${nextQuery}`} replace scroll={false} className={tabClass(mode === 'register')} aria-current={mode === 'register' ? 'page' : undefined}>
              {L.createAccount}
            </Link>
          </nav>
        )}

        <h1 id="auth-title" className="text-2xl sm:text-[1.7rem] font-extrabold font-serif-luxury text-[#0B2345]">
          {mode === 'login' ? L.loginTitle : L.registerTitle}
        </h1>
        <p className="text-sm text-[#667085] mt-1.5 mb-6">{mode === 'login' ? L.loginSub : L.registerSub}</p>

        {fromCheckout && !unavailable && (
          <div id="auth-checkout-note" className="mb-5 flex items-start gap-2.5 text-xs text-[#0B2345] bg-[#EEF2F8] border border-[#0B2345]/15 rounded-xl px-3.5 py-3">
            <Info className="w-4 h-4 shrink-0 mt-px" />
            <span>{mode === 'login' ? L.guestNote : L.guestNoteRegister}</span>
          </div>
        )}

        {!auth.settingsReady ? (
          <div className="flex items-center justify-center py-16 text-[#667085]" role="status" aria-live="polite">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : unavailable ? (
          <div id="auth-unavailable" className="space-y-4 py-2">
            <p className="text-sm text-[#475467]">{mode === 'login' ? L.loginOff : L.registerOff}</p>
            <div className="flex flex-col gap-2">
              {mode === 'register' && auth.loginEnabled && (
                <Link href={`/login${nextQuery}`} className="inline-flex justify-center items-center gap-2 bg-[#0B2345] text-white px-5 py-3 rounded-xl text-sm font-bold">
                  {L.haveAccountSignIn}
                </Link>
              )}
              {fromCheckout && (
                <Link href={next} className="inline-flex justify-center items-center gap-2 bg-[#0B2345] text-white px-5 py-3 rounded-xl text-sm font-bold">
                  <ShoppingBag className="w-4 h-4" />
                  {L.guest}
                </Link>
              )}
              <Link href="/orders" className="inline-flex justify-center items-center gap-2 border border-[#D0D5DD] px-5 py-3 rounded-xl text-sm font-bold text-[#0B2345]">
                <PackageSearch className="w-4 h-4" />
                {L.track}
              </Link>
            </div>
          </div>
        ) : (
          <form ref={formRef} id={mode === 'login' ? 'login-form' : 'register-form'} onSubmit={submit} noValidate className="space-y-4" aria-labelledby="auth-title">
            {mode === 'register' ? (
              <>
                <div>
                  <label htmlFor="register-name" className={labelClass}>{L.name}</label>
                  <input {...fieldProps('name', 'register-name')} autoComplete="name" value={name} onChange={edit('name', setName)} />
                  <FieldError k="name" id="register-name" />
                </div>
                <div>
                  <label htmlFor="register-phone" className={labelClass}>{L.phone}</label>
                  <input {...fieldProps('phone', 'register-phone', 'register-phone-hint')} type="tel" inputMode="tel" dir="ltr" autoComplete="tel" placeholder="05XXXXXXXX" value={phone} onChange={edit('phone', setPhone)} className={`${fieldProps('phone', 'register-phone').className} ${ltrInput}`} />
                  {errorFor('phone') ? <FieldError k="phone" id="register-phone" /> : <p id="register-phone-hint" className="mt-1.5 text-xs text-[#667085]">{L.phoneHint}</p>}
                </div>
                <div>
                  <label htmlFor="register-email" className={labelClass}>
                    {L.email} <span className="font-normal text-[#98A2B3]">{L.optional}</span>
                  </label>
                  <input {...fieldProps('email', 'register-email')} type="email" inputMode="email" dir="ltr" autoComplete="email" placeholder="name@example.com" value={email} onChange={edit('email', setEmail)} className={`${fieldProps('email', 'register-email').className} ${ltrInput}`} />
                  <FieldError k="email" id="register-email" />
                </div>
              </>
            ) : (
              <div>
                <label htmlFor="login-id" className={labelClass}>{L.loginId}</label>
                <input {...fieldProps('login', 'login-id', 'login-id-hint')} dir="ltr" autoComplete="username" placeholder="05XXXXXXXX" value={loginId} onChange={edit('login', setLoginId)} className={`${fieldProps('login', 'login-id').className} ${ltrInput}`} autoFocus />
                {errorFor('login') ? <FieldError k="login" id="login-id" /> : <p id="login-id-hint" className="mt-1.5 text-xs text-[#667085]">{L.loginIdHint}</p>}
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="auth-password" className="text-[13px] font-semibold text-[#344054]">
                  {mode === 'login' ? L.password : L.newPassword}
                </label>
                {mode === 'login' && (
                  <Link id="auth-forgot-link" href={`/forgot-password${nextQuery}`} className="text-xs font-semibold text-[#0B2345] hover:text-[#B59460] hover:underline">
                    {L.forgot}
                  </Link>
                )}
              </div>
              <div className="relative">
                <input
                  {...fieldProps('password', 'auth-password', mode === 'register' ? 'auth-password-hint' : undefined)}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  value={password}
                  onChange={edit('password', setPassword)}
                  className={`${fieldProps('password', 'auth-password').className} pe-12`}
                />
                {PasswordToggle}
              </div>
              <FieldError k="password" id="auth-password" />
              {mode === 'register' && (
                <div id="auth-password-hint" className="mt-2">
                  {password && (
                    <div className="flex items-center gap-2 mb-1" aria-live="polite">
                      <div className="flex-1 grid grid-cols-4 gap-1" aria-hidden="true">
                        {[1, 2, 3, 4].map((i) => (
                          <span key={i} className={`h-1.5 rounded-full ${score >= i ? STRENGTH_COLORS[score] : 'bg-[#E5E1D8]'}`} />
                        ))}
                      </div>
                      <span id="auth-password-strength" className="text-[11px] font-semibold text-[#475467] min-w-[4.5rem] text-end">
                        <span className="sr-only">{L.strengthLabel}: </span>
                        {L.strength[score]}
                      </span>
                    </div>
                  )}
                  <p className="text-xs text-[#667085]">{L.pwHint}</p>
                </div>
              )}
            </div>

            {mode === 'register' && (
              <div>
                <label htmlFor="auth-password-confirm" className={labelClass}>{L.confirm}</label>
                <input
                  {...fieldProps('password_confirmation', 'auth-password-confirm')}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={password2}
                  onChange={edit('password_confirmation', setPassword2)}
                />
                <FieldError k="password_confirmation" id="auth-password-confirm" />
                {!errorFor('password_confirmation') && password2 && password2 === password && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-[#2A7531]">
                    <Check className="w-3.5 h-3.5" /> {L.match}
                  </p>
                )}
              </div>
            )}

            {mode === 'login' && (
              <label htmlFor="auth-remember" className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  id="auth-remember"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-[#D0D5DD] accent-[#0B2345]"
                  aria-describedby="auth-remember-hint"
                />
                <span>
                  <span className="block text-sm text-[#344054]">{L.remember}</span>
                  <span id="auth-remember-hint" className="block text-[11px] text-[#98A2B3]">{L.rememberHint}</span>
                </span>
              </label>
            )}

            {error && (
              <div id="auth-error" role="alert" className="flex items-start gap-2 text-sm text-[#B42318] bg-[#FEF3F2] border border-[#FDA29B] rounded-xl px-3.5 py-3">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  <p>{error}</p>
                  {mode === 'register' && errorCode === 'phone_taken' && (
                    <Link href={`/login${nextQuery}`} className="mt-1 inline-block font-bold underline">{L.signInInstead}</Link>
                  )}
                </div>
              </div>
            )}

            <button
              id="auth-submit"
              type="submit"
              disabled={busy}
              aria-busy={busy}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#0B2345] hover:bg-[#071A35] disabled:opacity-70 disabled:cursor-wait text-white py-3.5 rounded-xl text-sm font-bold shadow-md transition-all active:scale-[0.99]"
            >
              {busy && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{busy ? (mode === 'login' ? L.signingIn : L.creating) : mode === 'login' ? L.signIn : L.createAccount}</span>
            </button>

            {(fromCheckout || (mode === 'login' ? auth.registrationEnabled : true)) && (
              <div className="flex items-center gap-3 py-1" aria-hidden="true">
                <span className="flex-1 h-px bg-[#E5E1D8]" />
                <span className="text-[11px] uppercase tracking-wider text-[#98A2B3]">{L.or}</span>
                <span className="flex-1 h-px bg-[#E5E1D8]" />
              </div>
            )}

            {fromCheckout && (
              <Link id="auth-guest" href={next} className="w-full inline-flex items-center justify-center gap-2 border border-[#0B2345] text-[#0B2345] hover:bg-[#F3F1EB] py-3 rounded-xl text-sm font-bold transition-colors">
                <ShoppingBag className="w-4 h-4" />
                {L.guest}
              </Link>
            )}

            <p className="text-center text-sm text-[#667085]">
              {mode === 'login' ? (
                auth.registrationEnabled && (
                  <>
                    {L.noAccount}{' '}
                    <Link id="auth-switch" href={`/register${nextQuery}`} replace scroll={false} className="font-bold text-[#0B2345] hover:text-[#B59460]">
                      {L.createAccount}
                    </Link>
                  </>
                )
              ) : (
                <>
                  {L.haveAccount}{' '}
                  <Link id="auth-switch" href={`/login${nextQuery}`} replace scroll={false} className="font-bold text-[#0B2345] hover:text-[#B59460]">
                    {L.signIn}
                  </Link>
                </>
              )}
            </p>
          </form>
        )}

        {!fromCheckout && (
          <p className="mt-6 pt-5 border-t border-[#F0EDE6] text-center text-xs text-[#667085]">{L.guestFooter}</p>
        )}
      </div>
    </AuthLayout>
  );
};
