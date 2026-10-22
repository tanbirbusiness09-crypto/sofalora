import React from 'react';
import { useShop } from '../../context/LanguageContext';
import { CATEGORIES } from '../../data/products';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export const ShopByCategory: React.FC = () => {
  const { language, direction, t } = useShop();
  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section id="categories" className="py-14 sm:py-20 bg-[#FBF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#161B18] font-serif-luxury tracking-tight">
              {t('categoriesTitle')}
            </h2>
            <p className="text-sm sm:text-base text-[#687168] mt-2 max-w-xl">
              {t('categoriesSubtitle')}
            </p>
          </div>

          <a
            href="#bestsellers"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#7A351F] hover:text-[#5E441B] transition-colors group self-start sm:self-auto"
          >
            <span>{language === 'ar' ? 'عرض كافة التشكيلات' : 'View All Collections'}</span>
            <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 8 Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((category) => (
            <a
              key={category.id}
              href="#bestsellers"
              className="group relative rounded-2xl overflow-hidden bg-white border border-[#E4D6C7] shadow-2xs hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              {/* Image Container with Zoom */}
              <div className="relative aspect-4/3 sm:aspect-square overflow-hidden bg-[#E7DACB]">
                <img
                  src={category.image}
                  alt={category.title[language]}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                
                {/* Gentle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Designs Count Pill */}
                <span className="absolute top-3 end-3 bg-white/90 backdrop-blur-xs text-[#1B211D] text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs">
                  {category.itemCount} {t('itemsCount')}
                </span>
              </div>

              {/* Card Meta Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#1B211D] group-hover:text-[#8F3E24] transition-colors">
                    {category.title[language]}
                  </h3>
                  <p className="text-xs text-[#747B72] mt-1 line-clamp-1">
                    {category.subtitle[language]}
                  </p>
                </div>

                {/* Explore Link with Directional Arrow */}
                <div className="mt-3.5 pt-3 border-t border-[#F4EDE4] flex items-center justify-between text-xs font-bold text-[#8F3E24] group-hover:text-[#7A5A24]">
                  <span>{t('exploreCategory')}</span>
                  <div className="w-6 h-6 rounded-full bg-[#FBF8F3] group-hover:bg-[#B85C3A] group-hover:text-white flex items-center justify-center transition-all duration-300">
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
