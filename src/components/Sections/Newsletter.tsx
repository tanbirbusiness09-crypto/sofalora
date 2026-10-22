import React, { useState } from 'react';
import { useShop } from '../../context/LanguageContext';
import { Mail, Check, ArrowRight, ArrowLeft } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const { language, direction, t, showToast } = useShop();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmitted(true);
    showToast(t('subscribedSuccess'), 'success');
  };

  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section className="py-14 sm:py-20 bg-[#F4EDE4] border-t border-[#E5D8C9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="w-12 h-12 rounded-2xl bg-[#E7DACB] text-[#8F3E24] flex items-center justify-center mx-auto mb-4 border border-[#D8C8B6]">
          <Mail className="w-6 h-6" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#161B18] font-serif-luxury tracking-tight">
          {t('newsletterTitle')}
        </h2>

        <p className="text-sm sm:text-base text-[#687168] mt-2 max-w-lg mx-auto">
          {t('newsletterSubtitle')}
        </p>

        {/* Subscription Form */}
        <div className="mt-8 max-w-md mx-auto">
          {isSubmitted ? (
            <div className="bg-[#1B211D] text-[#FBF8F3] p-4 rounded-2xl flex items-center justify-center gap-2.5 shadow-md">
              <div className="w-6 h-6 rounded-full bg-[#B85C3A] text-[#1B211D] flex items-center justify-center font-bold text-xs">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs sm:text-sm font-semibold">
                {t('subscribedSuccess')}
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2.5">
              <div className="relative w-full">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('emailPlaceholder')}
                  className="w-full bg-white text-[#1B211D] placeholder-[#837A70] text-sm rounded-full py-3.5 ps-11 pe-5 border border-[#D3C3B1] focus:outline-hidden focus:border-[#B85C3A] focus:ring-2 focus:ring-[#B85C3A]/20 shadow-2xs transition-all"
                />
                <Mail className="w-4 h-4 text-[#837A70] absolute start-4 top-4 pointer-events-none" />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1B211D] hover:bg-[#29302B] text-[#FBF8F3] px-6 py-3.5 rounded-full text-sm font-bold shrink-0 shadow-xs transition-colors group"
              >
                <span>{t('subscribe')}</span>
                <ArrowIcon className="w-4 h-4 text-[#CC9063] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </button>
            </form>
          )}

          <p className="text-[11px] text-[#8C7E70] mt-3">
            {t('privacyNote')}
          </p>
        </div>

      </div>
    </section>
  );
};
