import React from 'react';
import { useShop } from '../../context/LanguageContext';
import { useSectionCms } from '../../context/WebsiteContext';
import { Sparkles, Ruler, Wrench, Truck, MessageSquare, ShieldCheck } from 'lucide-react';

export const WhyMohammadCurtains: React.FC = () => {
  const { language, t } = useShop();
  const cms = useSectionCms();

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
    <section id="why-us" className="py-16 sm:py-24 bg-[#FAF9F6] border-t border-[#E6E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold text-[#071A35] uppercase tracking-widest block mb-2">
            {language === 'ar' ? 'معايير الإتقان والفخامة' : 'Commitment To Perfection'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2345] font-serif-luxury tracking-tight">
            {cms.title(t('whyTitle'))}
          </h2>
          <p className="text-sm sm:text-base text-[#667085] mt-2">
            {cms.subtitle(t('whySubtitle'))}
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, idx) => {
            const Icon = item.icon;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E2DED4] shadow-2xs hover:shadow-lg transition-all duration-300 flex items-start gap-4.5 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F3F1EB] group-hover:bg-[#B59460] group-hover:text-white text-[#0B2345] border border-[#E5E1D8] flex items-center justify-center shrink-0 transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex-1">
                  <h3 className="text-base font-bold text-[#101828] group-hover:text-[#0B2345] transition-colors mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
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
