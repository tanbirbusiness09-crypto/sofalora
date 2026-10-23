import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/LanguageContext';
import { ArrowRight, ArrowLeft, Clock, Tag, Sparkles, Gift } from 'lucide-react';

export const PromotionalOffer: React.FC = () => {
  const { language, direction, t } = useShop();

  // Functional live countdown timer (e.g., 2 days, 14 hours, 36 mins, 18 secs)
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 36,
    seconds: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);
  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section id="promo" className="py-14 sm:py-20 bg-[#F3F1EB] relative overflow-hidden border-y border-[#E2DED4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Banner Box */}
        <div className="relative rounded-3xl bg-[#0A2A5E] text-white p-6 sm:p-10 lg:p-14 overflow-hidden shadow-2xl border border-[#344054]">
          
          {/* Subtle Ambient Gold Accents */}
          <div className="absolute top-0 end-0 w-96 h-96 bg-[#C8102E]/15 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute bottom-0 start-0 w-80 h-80 bg-[#C8102E]/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left/Start: Offer Details */}
            <div className="lg:col-span-7 space-y-4 text-start">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F2937] border border-[#4B5563] text-[#E3C98F] text-xs font-bold uppercase tracking-wider">
                <Tag className="w-3.5 h-3.5 text-[#C8102E]" />
                <span>{t('promoEyebrow')}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif-luxury tracking-tight text-white leading-tight">
                {t('promoTitle')}
              </h2>

              <p className="text-xl sm:text-2xl font-semibold text-[#C8102E]">
                {t('promoSubtitle')}
              </p>

              <p className="text-sm sm:text-base text-[#A8A29A] max-w-xl leading-relaxed">
                {t('promoDesc')}
              </p>

              {/* Promo Code Pill */}
              <div className="inline-flex items-center gap-2 bg-[#1F2937] border border-[#4B5563] px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#E8D9B6]">
                <Gift className="w-3.5 h-3.5 text-[#C8102E]" />
                <span>{t('promoCode')}</span>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <a
                  href="#bestsellers"
                  className="inline-flex items-center gap-2 bg-[#C8102E] hover:bg-[#E3C98F] text-[#0A2A5E] px-7 py-3.5 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <span>{t('promoCTA')}</span>
                  <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </a>
              </div>

            </div>

            {/* Right/End: Elegant Live Countdown Clock */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
              <div className="bg-[#0A2344] border border-[#344054] rounded-2xl p-5 sm:p-6 shadow-xl w-full max-w-md">
                
                <div className="flex items-center justify-between gap-2 border-b border-[#344054] pb-3 mb-4 text-xs font-semibold text-[#A8A29A]">
                  <div className="flex items-center gap-1.5 text-[#E3C98F]">
                    <Clock className="w-4 h-4" />
                    <span>{language === 'ar' ? 'ينتهي العرض الخاص خلال:' : 'Special offer concludes in:'}</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-ping" />
                </div>

                {/* Countdown Digit Boxes */}
                <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center" dir="ltr">
                  
                  {/* Days */}
                  <div className="bg-[#0A2A5E] rounded-xl p-2.5 sm:p-3 border border-[#344054]">
                    <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                      {formatNumber(timeLeft.days)}
                    </div>
                    <div className="text-[10px] sm:text-xs font-medium text-[#667085] uppercase tracking-wider mt-1">
                      {t('days')}
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="bg-[#0A2A5E] rounded-xl p-2.5 sm:p-3 border border-[#344054]">
                    <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                      {formatNumber(timeLeft.hours)}
                    </div>
                    <div className="text-[10px] sm:text-xs font-medium text-[#667085] uppercase tracking-wider mt-1">
                      {t('hours')}
                    </div>
                  </div>

                  {/* Minutes */}
                  <div className="bg-[#0A2A5E] rounded-xl p-2.5 sm:p-3 border border-[#344054]">
                    <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                      {formatNumber(timeLeft.minutes)}
                    </div>
                    <div className="text-[10px] sm:text-xs font-medium text-[#667085] uppercase tracking-wider mt-1">
                      {t('minutes')}
                    </div>
                  </div>

                  {/* Seconds */}
                  <div className="bg-[#0A2A5E] rounded-xl p-2.5 sm:p-3 border border-[#344054]">
                    <div className="text-2xl sm:text-3xl font-black text-[#C8102E] font-mono">
                      {formatNumber(timeLeft.seconds)}
                    </div>
                    <div className="text-[10px] sm:text-xs font-medium text-[#667085] uppercase tracking-wider mt-1">
                      {t('seconds')}
                    </div>
                  </div>

                </div>

                <div className="mt-4 text-center text-[11px] text-[#667085]">
                  {language === 'ar'
                    ? 'يشمل العرض التركيب المجاني والقياس المنزلي في كافة أحياء الرياض'
                    : 'Includes complimentary white-glove installation across Riyadh'}
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
