import React from 'react';
import { useShop } from '../../context/LanguageContext';
import { Scissors, Palette, Ruler, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

export const CustomCurtainService: React.FC = () => {
  const { language, direction, t, openConsultation } = useShop();
  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

  const steps = [
    {
      num: '01',
      icon: Scissors,
      title: t('step1Title'),
      desc: t('step1Desc')
    },
    {
      num: '02',
      icon: Palette,
      title: t('step2Title'),
      desc: t('step2Desc')
    },
    {
      num: '03',
      icon: Ruler,
      title: t('step3Title'),
      desc: t('step3Desc')
    },
    {
      num: '04',
      icon: CheckCircle2,
      title: t('step4Title'),
      desc: t('step4Desc')
    }
  ];

  return (
    <section id="custom-service" className="py-16 sm:py-24 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold text-[#8C6B32] uppercase tracking-widest block mb-2">
            {t('customEyebrow')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#191715] font-serif-luxury tracking-tight">
            {t('customTitle')}
          </h2>
          <p className="text-sm sm:text-base text-[#6E645A] mt-3 leading-relaxed">
            {t('customDescription')}
          </p>
        </div>

        {/* 4 Process Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;

            return (
              <div
                key={idx}
                className="relative bg-white rounded-2xl p-6 sm:p-7 border border-[#E7DFD5] shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Step Number & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] group-hover:bg-[#C49E5D] group-hover:text-white text-[#A9803C] border border-[#EAE3D8] flex items-center justify-center transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-black text-[#E8DFD3] font-mono group-hover:text-[#C49E5D]/40 transition-colors">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#1C1A17] mb-2 group-hover:text-[#A9803C] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#7A6F64] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#F7F3EE] text-[11px] font-semibold text-[#8C7A6B]">
                  {language === 'ar' ? 'خدمة متكاملة في الرياض' : 'Riyadh Concierge Included'}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Bar */}
        <div className="mt-12 text-center">
          <button
            onClick={openConsultation}
            className="inline-flex items-center gap-2.5 bg-[#1C1A17] hover:bg-[#2C2824] text-[#FAF8F5] px-8 py-4 rounded-full text-sm font-bold shadow-md hover:shadow-xl transition-all duration-300 group"
          >
            <Scissors className="w-4 h-4 text-[#C49E5D]" />
            <span>{t('requestCustomCTA')}</span>
            <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform text-[#C49E5D]" />
          </button>
          
          <p className="text-xs text-[#8C7A6B] mt-3">
            {language === 'ar'
              ? 'زيارة منزلية مجانية مع إحضار كامل كتالوجات الأقمشة وعينات السكك'
              : 'Free in-home measurement with full fabric swatches and track samples in Riyadh'}
          </p>
        </div>

      </div>
    </section>
  );
};
