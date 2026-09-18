import React from 'react';
import { useShop } from '../../context/LanguageContext';
import { ArrowRight, ArrowLeft, CheckCircle2, Sparkles, Scissors, Wrench } from 'lucide-react';

export const FeaturedCollection: React.FC = () => {
  const { language, direction, t, openConsultation } = useShop();
  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section className="py-16 sm:py-24 bg-[#191715] text-[#FAF8F5] relative overflow-hidden">
      {/* Warm Ambient Gold Glow in Background */}
      <div className="absolute -top-32 end-0 w-[500px] h-[500px] bg-[#C49E5D]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 start-0 w-[500px] h-[500px] bg-[#C49E5D]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Lifestyle Visual Container (Starts left in LTR, right in RTL) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#3A352F] aspect-4/3 sm:aspect-16/11 group">
              <img
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop"
                alt="Designed for Beautiful Living by Mohammad Curtains"
                loading="lazy"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Floating Material Spec Pill */}
              <div className="absolute bottom-5 start-5 end-5 bg-black/60 backdrop-blur-md border border-white/15 p-3.5 rounded-2xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#C49E5D] font-bold block text-[11px] uppercase tracking-wider">
                    {language === 'ar' ? 'أقمشة مختارة خصيصاً للمملكة' : 'Specially Curated For Saudi Climate'}
                  </span>
                  <span className="text-white/90 text-xs">
                    {language === 'ar' ? 'حرير، مخمل معزول، وكتان نقي فائق الجودة' : 'Cashmere Silks, Thermal Velvets & Pure Linen'}
                  </span>
                </div>
                <span className="w-8 h-8 rounded-full bg-[#C49E5D] text-[#191715] flex items-center justify-center font-bold shrink-0 ms-2">
                  ✦
                </span>
              </div>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-start">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2C2722] border border-[#443D36] text-[#D8BD88] text-xs font-bold tracking-widest uppercase">
              <Sparkles className="w-3 h-3 text-[#C49E5D]" />
              <span>{t('featuredEyebrow')}</span>
            </div>

            {/* Titles */}
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif-luxury tracking-tight leading-tight">
                {t('featuredTitle')}
              </h2>
              <p className="text-lg sm:text-xl font-medium text-[#C49E5D]">
                {t('featuredCollectionName')}
              </p>
            </div>

            {/* Description */}
            <p className="text-[#B5A99B] text-sm sm:text-base leading-relaxed">
              {t('featuredDescription')}
            </p>

            {/* 3 Pillars */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#282420] border border-[#3D3730] flex items-center justify-center text-[#C49E5D] shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {t('feature1Title')}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#94887A] mt-0.5">
                    {t('feature1Desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#282420] border border-[#3D3730] flex items-center justify-center text-[#C49E5D] shrink-0 mt-0.5">
                  <Scissors className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {t('feature2Title')}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#94887A] mt-0.5">
                    {t('feature2Desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#282420] border border-[#3D3730] flex items-center justify-center text-[#C49E5D] shrink-0 mt-0.5">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {t('feature3Title')}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#94887A] mt-0.5">
                    {t('feature3Desc')}
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <a
                href="#bestsellers"
                className="inline-flex items-center gap-2 bg-[#C49E5D] hover:bg-[#D8BD88] text-[#191715] px-7 py-3.5 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <span>{t('featuredCTA')}</span>
                <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </a>

              <button
                onClick={openConsultation}
                className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 text-white border border-[#524A40] px-6 py-3.5 rounded-full text-sm font-semibold transition-all duration-300"
              >
                <span>{t('scheduleConsultationCTA')}</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
