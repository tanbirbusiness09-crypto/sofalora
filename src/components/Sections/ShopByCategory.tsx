import React from 'react';
import { useShop } from '../../context/LanguageContext';
import { useSectionCms } from '../../context/WebsiteContext';
import { useCatalog } from '../../context/CatalogContext';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export const ShopByCategory: React.FC = () => {
  const { language, direction, t } = useShop();
  const cms = useSectionCms();
  // Categories from the commerce API (admin Categories).
  const { categories, categoryTree } = useCatalog();
  const topSlugs = new Set(categoryTree.map((c) => c.slug));
  const topCategories = categories.filter((c) => topSlugs.has(c.slug)).slice(0, 8);
  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section id="categories" className="py-14 sm:py-20 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2345] font-serif-luxury tracking-tight">
              {cms.title(t('categoriesTitle'))}
            </h2>
            <p className="text-sm sm:text-base text-[#667085] mt-2 max-w-xl">
              {cms.subtitle(t('categoriesSubtitle'))}
            </p>
          </div>

          <a
            href="#bestsellers"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#071A35] hover:text-[#8A6A2F] transition-colors group self-start sm:self-auto"
          >
            <span>{language === 'ar' ? 'عرض كافة التشكيلات' : 'View All Collections'}</span>
            <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 8 Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {topCategories.map((category) => (
            <a
              key={category.id}
              href={`/category/${category.slug}`}
              className="group relative rounded-2xl overflow-hidden bg-white border border-[#E2DED4] shadow-2xs hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              {/* Image Container with Zoom */}
              <div className="relative aspect-4/3 sm:aspect-square overflow-hidden bg-[#E5E1D8]">
                <img
                  src={category.image}
                  alt={category.title[language]}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                
                {/* Gentle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Designs Count Pill */}
                <span className="absolute top-3 end-3 bg-white/90 backdrop-blur-xs text-[#101828] text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs">
                  {category.itemCount} {t('itemsCount')}
                </span>
              </div>

              {/* Card Meta Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#101828] group-hover:text-[#0B2345] transition-colors">
                    {category.title[language]}
                  </h3>
                  <p className="text-xs text-[#667085] mt-1 line-clamp-1">
                    {category.subtitle[language]}
                  </p>
                </div>

                {/* Explore Link with Directional Arrow */}
                <div className="mt-3.5 pt-3 border-t border-[#F3F1EB] flex items-center justify-between text-xs font-bold text-[#0B2345] group-hover:text-[#8A6A2F]">
                  <span>{t('exploreCategory')}</span>
                  <div className="w-6 h-6 rounded-full bg-[#FAF9F6] group-hover:bg-[#B59460] group-hover:text-white flex items-center justify-center transition-all duration-300">
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
