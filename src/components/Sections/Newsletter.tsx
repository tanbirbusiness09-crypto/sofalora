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
    <section className="py-14 sm:py-20 bg-[#F3F1EB] border-t border-[#E2DDD2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="w-12 h-12 rounded-2xl bg-[#E5E1D8] text-[#0A2A5E] flex items-center justify-center mx-auto mb-4 border border-[#D5CEC0]">
          <Mail className="w-6 h-6" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A2A5E] font-serif-luxury tracking-tight">
          {t('newsletterTitle')}
        </h2>

        <p className="text-sm sm:text-base text-[#667085] mt-2 max-w-lg mx-auto">
          {t('newsletterSubtitle')}
        </p>

        {/* Subscription Form */}
        <div className="mt-8 max-w-md mx-auto">
          {isSubmitted ? (
            <div className="bg-[#0A2A5E] text-[#FAFAF8] p-4 rounded-2xl flex items-center justify-center gap-2.5 shadow-md">
              <div className="w-6 h-6 rounded-full bg-[#C8102E] text-[#101828] flex items-center justify-center font-bold text-xs">
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
                  className="w-full bg-white text-[#101828] placeholder-[#667085] text-sm rounded-full py-3.5 ps-11 pe-5 border border-[#CFC8BA] focus:outline-hidden focus:border-[#C8102E] focus:ring-2 focus:ring-[#C8102E]/20 shadow-2xs transition-all"
                />
                <Mail className="w-4 h-4 text-[#667085] absolute start-4 top-4 pointer-events-none" />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0A2A5E] hover:bg-[#061C3F] text-[#FAFAF8] px-6 py-3.5 rounded-full text-sm font-bold shrink-0 shadow-xs transition-colors group"
              >
                <span>{t('subscribe')}</span>
                <ArrowIcon className="w-4 h-4 text-[#C6A15B] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </button>
            </form>
          )}

          <p className="text-[11px] text-[#667085] mt-3">
            {t('privacyNote')}
          </p>
        </div>

      </div>
    </section>
  );
};
