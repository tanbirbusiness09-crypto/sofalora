import React from 'react';
import { Ruler, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { Category } from '../../types';
import { useShop } from '../../context/LanguageContext';
import { Link } from '../../context/RouterContext';

interface CategoryHeroProps {
  category?: Category;
  customTitle?: { en: string; ar: string };
  customSubtitle?: { en: string; ar: string };
  customImage?: string;
  itemCount?: number;
  subcategories?: { slug: string; name: { en: string; ar: string } }[];
  activeSubcategory?: string;
  onSubcategorySelect?: (slug: string) => void;
}

export const CategoryHero: React.FC<CategoryHeroProps> = ({
  category,
  customTitle,
  customSubtitle,
  customImage,
  itemCount,
  subcategories,
  activeSubcategory,
  onSubcategorySelect
}) => {
  const { language } = useShop();

  const title = customTitle || category?.title || { en: 'Our Collection', ar: 'مجموعتنا الفاخرة' };
  const subtitle = customSubtitle || category?.subtitle || {
    en: 'Engineered for exceptional Saudi interiors, climate resilience, and timeless elegance.',
    ar: 'مختارة بعناية للبيوت السعودية الفاخرة، لعزل حراري فائق وأناقة تدوم طويلاً.'
  };
  const image =
    customImage ||
    category?.image ||
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop';
  const count = itemCount !== undefined ? itemCount : category?.itemCount;

  return (
    <div className="relative rounded-2xl overflow-hidden bg-[#0A2A5E] text-white mb-8 shadow-md">
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={title[language]}
          className="w-full h-full object-cover object-center opacity-35 scale-105 filter blur-[0.5px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061C3F] via-[#101828]/85 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 p-6 sm:p-10 md:p-12 max-w-3xl">
        {/* Top Tag & Count */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A2A5E]/25 text-[#E3C98F] text-xs font-semibold uppercase tracking-wider backdrop-blur-sm border border-[#0A2A5E]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#E3C98F]" />
            <span>Sofalora • Riyadh</span>
          </span>
          {count !== undefined && (
            <span className="text-xs text-[#B8B2A8]">
              ({count} {language === 'ar' ? 'تصميم متاح' : 'designs'})
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-3 tracking-tight leading-tight">
          {title[language]}
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm md:text-base text-[#D2CCC1] mb-6 leading-relaxed max-w-2xl">
          {subtitle[language]}
        </p>

        {/* Key Guarantees Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/15 text-xs text-[#DFDACF]">
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4 text-[#C6A15B] shrink-0" />
            <span>{language === 'ar' ? 'رفع مقاسات مجاني بالرياض' : 'Free In-Home Measurement'}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C6A15B] shrink-0" />
            <span>{language === 'ar' ? 'ضمان ٥ سنوات على الأقمشة' : '5-Year Fabric Guarantee'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#C6A15B] shrink-0" />
            <span>{language === 'ar' ? 'تركيب احترافي معتمد' : 'Certified Expert Installers'}</span>
          </div>
        </div>

        {/* Subcategory Pills (if provided) */}
        {subcategories && subcategories.length > 0 && (
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              type="button"
              onClick={() => onSubcategorySelect && onSubcategorySelect('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                !activeSubcategory || activeSubcategory === 'all'
                  ? 'bg-[#0A2A5E] text-white'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              {language === 'ar' ? 'جميع التصاميم' : 'All Designs'}
            </button>
            {subcategories.map((sub) => (
              <button
                key={sub.slug}
                type="button"
                onClick={() => onSubcategorySelect && onSubcategorySelect(sub.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeSubcategory === sub.slug
                    ? 'bg-[#0A2A5E] text-white'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {sub.name[language]}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
