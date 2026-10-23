import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useShop } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';

export const WhatsAppButton: React.FC = () => {
  const { language } = useShop();
  const { pathname } = useRouter();
  const [showTooltip, setShowTooltip] = useState(true);
  const isProductPage = pathname.toLowerCase().startsWith('/product/');

  const phoneNumber = '+966559821100';
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    language === 'ar'
      ? 'السلام عليكم، أود حجز استشارة منزلية لمعاينة أقمشة الكنب والستائر.'
      : 'Hello Sofalora, I would like to book an in-home consultation for sofas and curtains.'
  )}`;

  return (
    <div className={`fixed end-5 sm:end-6 z-40 flex items-center gap-2 ${isProductPage ? 'bottom-[142px] sm:bottom-6' : 'bottom-[76px] sm:bottom-6'}`}>
      {/* Concierge Tooltip */}
      {showTooltip && (
        <div className="hidden md:flex items-center gap-2 bg-[#0A2A5E] text-white text-xs px-3.5 py-2 rounded-xl shadow-xl border border-[#0A2A5E]/30 animate-in fade-in slide-in-from-end-2 duration-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-medium text-stone-200">
            {language === 'ar' ? 'مستشار سوفالورا عبر واتساب' : 'Sofalora Concierge on WhatsApp'}
          </span>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-neutral-400 hover:text-white ms-1 p-0.5"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={language === 'ar' ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
        className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-[#25D366]/50"
      >
        <MessageCircle className="w-6 h-6 fill-current transition-transform duration-300 group-hover:rotate-6" />
      </a>
    </div>
  );
};
