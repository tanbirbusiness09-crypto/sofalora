import React from 'react';
import { useShop } from '../../context/LanguageContext';
import { Link } from '../../context/RouterContext';

interface QuickCategoryItem {
  id: string;
  nameKey:
    | 'quickCatSofas'
    | 'quickCatSectionals'
    | 'quickCatMajlis'
    | 'quickCatArmchairs'
    | 'quickCatSofaBeds'
    | 'quickCatPairings'
    | 'quickCatCurtains'
    | 'quickCatBlackout'
    | 'quickCatSheer'
    | 'quickCatCustom'
    | 'quickCatNew'
    | 'quickCatOffers';
  image: string;
  href: string;
  isCustomAction?: boolean;
  badgeKey?: 'badge30Off' | 'badgeNew' | 'badgePopular';
}

export const QuickCategoryBar: React.FC = () => {
  const { language, t, openConsultation } = useShop();

  const quickCategories: QuickCategoryItem[] = [
    {
      id: 'sofas',
      nameKey: 'quickCatSofas',
      image:
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=240&auto=format&fit=crop',
      href: '/category/sofas',
      badgeKey: 'badgePopular',
    },
    {
      id: 'sectionals',
      nameKey: 'quickCatSectionals',
      image:
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=240&auto=format&fit=crop',
      href: '/category/sectional-sofas',
    },
    {
      id: 'majlis',
      nameKey: 'quickCatMajlis',
      image:
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=240&auto=format&fit=crop',
      href: '/category/majlis-sofas',
    },
    {
      id: 'armchairs',
      nameKey: 'quickCatArmchairs',
      image:
        'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=240&auto=format&fit=crop',
      href: '/category/accent-chairs',
    },
    {
      id: 'sofa-beds',
      nameKey: 'quickCatSofaBeds',
      image:
        'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=240&auto=format&fit=crop',
      href: '/category/sofa-beds',
    },
    {
      id: 'pairings',
      nameKey: 'quickCatPairings',
      image:
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=240&auto=format&fit=crop',
      href: '#pairings',
      badgeKey: 'badgeNew',
    },
    {
      id: 'curtains',
      nameKey: 'quickCatCurtains',
      image:
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=240&auto=format&fit=crop',
      href: '/category/curtains',
    },
    {
      id: 'blackout',
      nameKey: 'quickCatBlackout',
      image:
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=240&auto=format&fit=crop',
      href: '/category/blackout-curtains',
      badgeKey: 'badge30Off',
    },
    {
      id: 'sheer',
      nameKey: 'quickCatSheer',
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=240&auto=format&fit=crop',
      href: '/category/sheer-curtains',
    },
    {
      id: 'custom',
      nameKey: 'quickCatCustom',
      image:
        'https://images.unsplash.com/photo-1616137466211-f939a420be84?q=80&w=240&auto=format&fit=crop',
      href: '#custom',
      isCustomAction: true,
      badgeKey: 'badgePopular',
    },
    {
      id: 'new',
      nameKey: 'quickCatNew',
      image:
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=240&auto=format&fit=crop',
      href: '/new-arrivals',
      badgeKey: 'badgeNew',
    },
    {
      id: 'offers',
      nameKey: 'quickCatOffers',
      image:
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=240&auto=format&fit=crop',
      href: '/offers',
      badgeKey: 'badge30Off',
    },
  ];

  return (
    <section
      className="bg-white border-b border-[#E5E1D8]"
      aria-label={language === 'ar' ? 'تصفح سريع للفئات' : 'Quick Category Browser'}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 pb-2">
        {/* Big Rounded-Square Category Tiles (noon style) */}
        <div className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-none snap-x">
          {quickCategories.map((cat) => {
            const isCustom = cat.isCustomAction;

            const content = (
              <div className="flex flex-col items-center gap-2.5 text-center group cursor-pointer shrink-0 w-[200px] sm:w-[224px] snap-start">

                {/* Category Image Tile */}
                <div className="relative w-full aspect-square rounded-3xl overflow-hidden border border-[#E5E1D8] group-hover:border-[#0A2A5E]/40 group-hover:shadow-lg transition-all duration-200 bg-[#F3F1EB]">
                  <img
                    src={cat.image}
                    alt={t(cat.nameKey)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {cat.badgeKey && (
                    <span className="absolute top-3 start-3 brand-gradient text-white text-[10px] sm:text-xs font-extrabold px-2.5 py-1 rounded-full uppercase shadow-sm">
                      {t(cat.badgeKey)}
                    </span>
                  )}
                </div>

                {/* Category Name Label */}
                <span className="text-sm sm:text-lg font-bold text-[#101828] group-hover:text-[#0A2A5E] transition-colors leading-tight line-clamp-1">
                  {t(cat.nameKey)}
                </span>
              </div>
            );

            return isCustom ? (
              <button
                key={cat.id}
                type="button"
                onClick={openConsultation}
                className="bg-transparent border-0 p-0 text-inherit cursor-pointer"
                id={`quick-cat-${cat.id}`}
              >
                {content}
              </button>
            ) : (
              <Link
                key={cat.id}
                href={cat.href}
                className="no-underline text-inherit"
                id={`quick-cat-${cat.id}`}
              >
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
