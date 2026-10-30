import React from 'react';
import { useShop } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';
import { WhatsAppIcon } from './WhatsAppIcon';

export const WhatsAppButton: React.FC = () => {
  const { language } = useShop();
  const { pathname } = useRouter();
    const isProductPage = pathname.toLowerCase().startsWith('/product/');

  const phoneNumber = '+966559821100';
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    language === 'ar'
      ? 'السلام عليكم، أود حجز استشارة منزلية لمعاينة أقمشة الكنب والستائر.'
      : 'Hello Sofalora, I would like to book an in-home consultation for sofas and curtains.'
  )}`;

  return (
    <div className={`group/wa fixed end-5 sm:end-6 z-40 flex items-center gap-2 ${isProductPage ? 'bottom-[142px] sm:bottom-6' : 'bottom-[76px] sm:bottom-6'}`}>
      {/* Label appears on hover/focus only, so it never covers content */}
      <span className="pointer-events-none hidden md:block order-first whitespace-nowrap rounded-full bg-[#0B2345] px-3.5 py-2 text-xs font-medium text-white shadow-lg opacity-0 translate-x-2 rtl:-translate-x-2 transition-all duration-300 group-hover/wa:opacity-100 group-hover/wa:translate-x-0 group-focus-within/wa:opacity-100 group-focus-within/wa:translate-x-0">
        {language === 'ar' ? 'مستشار سوفالورا عبر واتساب' : 'Sofalora Concierge on WhatsApp'}
      </span>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={language === 'ar' ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
        className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-[#25D366]/50"
      >
        <WhatsAppIcon className="w-6 h-6 fill-current transition-transform duration-300 group-hover:rotate-6" />
      </a>
    </div>
  );
};
