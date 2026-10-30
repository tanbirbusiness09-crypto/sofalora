import React from 'react';
import { ArrowLeft, ArrowRight, KeyRound, Phone, Mail, Clock } from 'lucide-react';
import { useShop } from '../context/LanguageContext';
import { useRouter, Link } from '../context/RouterContext';
import { AuthLayout, useStoreContact } from '../components/Auth/AuthLayout';
import { WhatsAppIcon } from '../components/UI/WhatsAppIcon';

/**
 * Password reset is handled by the store team (admin-only), so this page explains that and
 * shows the store's contact details instead of a self-service reset form.
 */
export const ForgotPasswordPage: React.FC = () => {
  const { language, direction } = useShop();
  const { searchParams } = useRouter();
  const contact = useStoreContact();
  const isAr = language === 'ar';
  const BackIcon = direction === 'rtl' ? ArrowRight : ArrowLeft;
  const nextRaw = searchParams.get('next');
  const nextQuery = nextRaw && nextRaw.startsWith('/') && !nextRaw.startsWith('//') ? `?next=${encodeURIComponent(nextRaw)}` : '';

  const waText = encodeURIComponent(
    isAr
      ? 'مرحباً، أحتاج مساعدة في إعادة تعيين كلمة مرور حسابي في سوفالورا.'
      : 'Hello Sofalora, I need help resetting the password for my account.'
  );

  const rows = [
    { id: 'forgot-whatsapp', icon: <WhatsAppIcon className="w-4.5 h-4.5 fill-current text-[#25D366]" />, label: isAr ? 'واتساب' : 'WhatsApp', value: contact.whatsappLabel, href: `${contact.whatsappHref}?text=${waText}`, external: true },
    { id: 'forgot-phone', icon: <Phone className="w-4.5 h-4.5 text-[#0B2345]" />, label: isAr ? 'اتصل بنا' : 'Call us', value: contact.phoneLabel, href: contact.phoneHref, external: false },
    { id: 'forgot-email', icon: <Mail className="w-4.5 h-4.5 text-[#0B2345]" />, label: isAr ? 'البريد الإلكتروني' : 'Email', value: contact.emailLabel, href: contact.emailHref, external: false },
  ];

  return (
    <AuthLayout showBrandPanel={false}>
      <div id="forgot-password" className="max-w-[400px] mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-[#F3F1EB] flex items-center justify-center mb-4">
          <KeyRound className="w-6 h-6 text-[#0B2345]" />
        </div>
        <h1 className="text-2xl font-extrabold font-serif-luxury text-[#0B2345]">
          {isAr ? 'نسيت كلمة المرور؟' : 'Forgot your password?'}
        </h1>
        <p className="text-sm text-[#475467] mt-2 leading-relaxed">
          {isAr
            ? 'لحماية حسابك، تتم إعادة تعيين كلمة المرور من قِبل فريق خدمة العملاء. تواصل معنا من رقم الجوال المسجّل في حسابك وسنساعدك في استعادة الدخول.'
            : 'For your security, passwords are reset by our customer care team. Contact us from the mobile number registered on your account and we will help you get back in.'}
        </p>

        <ul className="mt-6 space-y-2.5">
          {rows.map((r) => (
            <li key={r.id}>
              <a
                id={r.id}
                href={r.href}
                {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex items-center gap-3 border border-[#E5E1D8] hover:border-[#0B2345]/40 hover:bg-[#FAF9F6] rounded-xl px-4 py-3 transition-colors"
              >
                <span className="w-9 h-9 rounded-full bg-[#F3F1EB] flex items-center justify-center shrink-0">{r.icon}</span>
                <span className="min-w-0">
                  <span className="block text-[11px] text-[#667085]">{r.label}</span>
                  <span className="block text-sm font-bold text-[#101828] truncate" dir="ltr">{r.value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-4 flex items-start gap-2 text-xs text-[#667085]">
          <Clock className="w-4 h-4 shrink-0 mt-px" />
          <span>{contact.hours}</span>
        </p>

        <Link
          id="forgot-back-to-login"
          href={`/login${nextQuery}`}
          className="mt-7 w-full inline-flex items-center justify-center gap-2 bg-[#0B2345] hover:bg-[#071A35] text-white py-3.5 rounded-xl text-sm font-bold shadow-md transition-colors"
        >
          <BackIcon className="w-4 h-4" />
          {isAr ? 'العودة لتسجيل الدخول' : 'Back to sign in'}
        </Link>
      </div>
    </AuthLayout>
  );
};
