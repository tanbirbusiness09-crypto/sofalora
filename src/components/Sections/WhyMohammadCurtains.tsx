import React from 'react';
import { useShop } from '../../context/LanguageContext';
import { Sparkles, Ruler, Wrench, Truck, MessageSquare, ShieldCheck } from 'lucide-react';

export const WhyMohammadCurtains: React.FC = () => {
  const { language, t } = useShop();

  const reasons = [
    {
      icon: Sparkles,
      title: t('why1Title'),
      desc: t('why1Desc')
    },
    {
      icon: Ruler,
      title: t('why2Title'),
      desc: t('why2Desc')
    },
    {
      icon: Wrench,
      title: t('why3Title'),
      desc: t('why3Desc')
    },
    {
      icon: Truck,
      title: t('why4Title'),
      desc: t('why4Desc')
    },
    {
      icon: MessageSquare,
      title: t('why5Title'),
      desc: t('why5Desc')
    },
    {
      icon: ShieldCheck,
      title: t('why6Title'),
      desc: t('why6Desc')
    }
  ];

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-[#FBF8F3] border-t border-[#E8DCCD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold text-[#7A351F] uppercase tracking-widest block mb-2">
            {language === 'ar' ? 'معايير الإتقان والفخامة' : 'Commitment To Perfection'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#161B18] font-serif-luxury tracking-tight">
            {t('whyTitle')}
          </h2>
          <p className="text-sm sm:text-base text-[#687168] mt-2">
            {t('whySubtitle')}
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, idx) => {
            const Icon = item.icon;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E4D6C7] shadow-2xs hover:shadow-lg transition-all duration-300 flex items-start gap-4.5 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F4EDE4] group-hover:bg-[#B85C3A] group-hover:text-white text-[#8F3E24] border border-[#E7DACB] flex items-center justify-center shrink-0 transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex-1">
                  <h3 className="text-base font-bold text-[#1B211D] group-hover:text-[#8F3E24] transition-colors mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#747B72] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
