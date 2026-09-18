import React from 'react';
import { useShop } from '../../context/LanguageContext';
import { ROOM_CATEGORIES } from '../../data/products';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

export const ShopByRoom: React.FC = () => {
  const { language, direction, t } = useShop();
  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section id="shop-by-room" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-[#8C6B32] uppercase tracking-widest block mb-2">
              {language === 'ar' ? 'حلول مخصصة لكل فراغ معماري' : 'Tailored For Every Living Space'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#191715] font-serif-luxury tracking-tight">
              {t('roomTitle')}
            </h2>
            <p className="text-sm sm:text-base text-[#6E645A] mt-2">
              {t('roomSubtitle')}
            </p>
          </div>

          <a
            href="#custom-service"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#8C6B32] hover:text-[#5E441B] transition-colors group"
          >
            <span>{t('customEyebrow')}</span>
            <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 6 Room Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {ROOM_CATEGORIES.map((room) => (
            <a
              key={room.id}
              href="#bestsellers"
              className="group relative rounded-3xl overflow-hidden bg-white border border-[#E7DFD5] shadow-2xs hover:shadow-xl transition-all duration-500 flex flex-col aspect-4/3 sm:aspect-16/11"
            >
              {/* Background Room Photo */}
              <img
                src={room.image}
                alt={room.title[language]}
                loading="lazy"
                className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Dark Gradient Overlay for optimal text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 transition-opacity duration-300" />

              {/* Top Tag: Recommended Treatment */}
              <div className="absolute top-4 start-4 end-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 bg-black/50 backdrop-blur-md border border-white/20 text-white/90 text-[11px] font-medium px-3 py-1 rounded-full">
                  <Sparkles className="w-3 h-3 text-[#C49E5D]" />
                  <span>{room.recommendedType[language]}</span>
                </span>
              </div>

              {/* Bottom Room Meta */}
              <div className="absolute bottom-0 inset-x-0 p-5 text-white flex items-end justify-between gap-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-serif-luxury tracking-tight leading-snug text-white group-hover:text-[#D8BD88] transition-colors">
                    {room.title[language]}
                  </h3>
                  <p className="text-xs text-white/75 mt-1 line-clamp-1">
                    {room.subtitle[language]}
                  </p>
                </div>

                <div className="w-9 h-9 rounded-full bg-white/20 group-hover:bg-[#C49E5D] text-white flex items-center justify-center transition-all duration-300 shrink-0">
                  <ArrowIcon className="w-4 h-4" />
                </div>
              </div>

            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
