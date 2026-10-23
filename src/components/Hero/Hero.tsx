import React from 'react';
import { useShop } from '../../context/LanguageContext';
import { Link } from '../../context/RouterContext';
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Truck,
  Ruler,
  Home,
} from 'lucide-react';

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

export const Hero: React.FC = () => {
  const { language, direction, t, openConsultation } = useShop();

  const isRtl = direction === 'rtl';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

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
      id="hero-ecommerce"
      className="bg-white border-b border-[#E5E1D8]"
      aria-label="Featured Showcase"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-14">

        {/* ============================================================ */}
        {/* CLEAN SPLIT HERO: LEFT COPY + RIGHT IMAGE CARDS              */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* ---------------------------------------------------------- */}
          {/* LEFT: COPY & CTA BLOCK                                     */}
          {/* ---------------------------------------------------------- */}
          <div className="lg:col-span-6 order-1 text-start">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3F1EB] border border-[#E5E1D8] text-[#061C3F] text-[11px] sm:text-xs font-bold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
              <span>{t('heroEyebrow')}</span>
            </div>

            {/* Heading */}
            <h1 className="mt-4 sm:mt-5 font-serif-luxury text-[28px] sm:text-4xl lg:text-[44px] xl:text-[50px] font-extrabold text-[#0A2A5E] leading-[1.12] tracking-tight whitespace-pre-line">
              {t('heroHeading')}
            </h1>

            {/* Description */}
            <p className="mt-3.5 sm:mt-4 text-sm sm:text-base lg:text-lg text-[#4B5563] leading-relaxed max-w-lg">
              {t('heroDescription')}
            </p>

            {/* CTA Row */}
            <div className="mt-5 sm:mt-7 flex flex-wrap items-center gap-2.5 sm:gap-3.5">
              <Link
                href="/category/sofas"
                className="brand-gradient inline-flex items-center justify-center gap-2.5 text-white px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl text-sm sm:text-base font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group/cta"
              >
                <span>{t('heroExploreCollection')}</span>
                <ArrowIcon className="w-4 h-4 transition-transform duration-200 group-hover/cta:translate-x-1 rtl:group-hover/cta:-translate-x-1" />
              </Link>

              <Link
                href="/category/curtains"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl text-sm sm:text-base font-bold text-[#0A2A5E] bg-white border-2 border-[#0A2A5E]/15 hover:border-[#0A2A5E] hover:bg-[#F3F1EB] transition-all duration-200"
              >
                {t('heroShopCurtains')}
              </Link>

              <button
                type="button"
                onClick={openConsultation}
                className="inline-flex items-center gap-1.5 px-1 py-2 text-sm font-semibold text-[#061C3F] hover:text-[#C8102E] underline decoration-[#C8102E]/40 decoration-2 underline-offset-4 hover:decoration-[#C8102E] transition-colors cursor-pointer"
              >
                {t('heroCustomSize')}
              </button>
            </div>

            {/* Stats Row */}
            <div className="mt-6 sm:mt-8 pt-5 border-t border-[#EDE9E2] flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-xl sm:text-2xl font-extrabold text-[#0A2A5E] font-serif-luxury leading-none">
                    {t('heroStat1Val')}
                  </p>
                  <p className="mt-1 text-[11px] sm:text-xs text-[#667085] font-medium">
                    {t('heroStat1Label')}
                  </p>
                </div>
              </div>

              <div className="hidden sm:block w-px h-9 bg-[#E5E1D8]" />

              <div className="flex items-center gap-3">
                <div>
                  <p className="text-xl sm:text-2xl font-extrabold text-[#0A2A5E] font-serif-luxury leading-none">
                    {t('heroStat2Val')}
                  </p>
                  <p className="mt-1 text-[11px] sm:text-xs text-[#667085] font-medium">
                    {t('heroStat2Label')}
                  </p>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3F1EB] border border-[#E5E1D8] text-[11px] font-bold text-[#061C3F]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C8102E]" />
                  {t('heroBadge1')}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3F1EB] border border-[#E5E1D8] text-[11px] font-bold text-[#061C3F]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
                  {t('heroBadge2')}
                </span>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* RIGHT: IMAGE CARDS COLLAGE                                 */}
          {/* ---------------------------------------------------------- */}
          <div className="lg:col-span-6 order-2">
            <div className="grid grid-cols-3 grid-rows-2 gap-2 sm:gap-2.5 h-[300px] sm:h-[400px] lg:h-[500px]">
              {/* Main Sofa Image */}
              <div className="relative col-span-2 row-span-2 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E5E1D8] shadow-sm group">
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop"
                  alt={t('heroExploreCollection')}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  loading="eager"
                />
                {/* Floating Stat Card on Main Image */}
                <div className="absolute bottom-3 start-3 sm:bottom-5 sm:start-5 inline-flex items-center gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white/90 backdrop-blur-md border border-white/50 shadow-lg">
                  <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#0A2A5E] flex items-center justify-center shrink-0">
                    <Home className="w-4 h-4 sm:w-5 sm:h-5 text-[#E3C98F]" />
                  </span>
                  <span>
                    <span className="block text-sm sm:text-base font-extrabold text-[#0A2A5E] leading-none">
                      {t('heroStat1Val')}
                    </span>
                    <span className="block mt-1 text-[10px] sm:text-xs text-[#4B5563] font-medium leading-none">
                      {t('heroStat1Label')}
                    </span>
                  </span>
                </div>
              </div>

              {/* Curtain Image Card */}
              <Link
                href="/category/curtains"
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E5E1D8] shadow-xs group block"
                aria-label={t('heroShopCurtains')}
              >
                <img
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop"
                  alt={t('heroPromo2Title')}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 start-2.5 end-2.5">
                  <p className="text-[11px] sm:text-xs font-bold text-white font-serif-luxury truncate">
                    {t('heroPromo2Title')}
                  </p>
                  <p className="text-[9px] sm:text-[11px] text-white/80 font-medium truncate">
                    {t('heroPromo2Subtitle')}
                  </p>
                </div>
              </Link>

              {/* Majlis Image Card */}
              <Link
                href="/category/majlis-sofas"
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E5E1D8] shadow-xs group block"
                aria-label={t('navMajlis')}
              >
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop"
                  alt={t('navMajlis')}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 start-2.5 end-2.5">
                  <p className="text-[11px] sm:text-xs font-bold text-white font-serif-luxury truncate">
                    {t('navMajlis')}
                  </p>
                  <p className="text-[9px] sm:text-[11px] text-white/80 font-medium truncate">
                    {t('heroPromo1Subtitle')}
                  </p>
                </div>
              </Link>
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* QUICK CATEGORY NAVIGATION BAR (Directly Below Hero)          */}
        {/* ============================================================ */}
        <div
          className="mt-6 sm:mt-8 lg:mt-10 bg-[#FAFAF8] border border-[#E3DED4] rounded-2xl p-2.5 sm:p-3.5 shadow-xs"
          id="hero-quick-categories"
        >
          {/* Header Label / Micro Bar for Context */}
          <div className="flex items-center justify-between px-2 pb-2 mb-1 border-b border-[#EDE9E2]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C8102E]" />
              <span className="text-xs font-bold text-[#475467] uppercase tracking-wider">
                {language === 'ar' ? 'تصفح سريع للفئات' : 'Quick Category Browser'}
              </span>
            </div>
            <a
              href="#categories"
              className="text-xs font-bold text-[#061C3F] hover:text-[#8A6A2F] flex items-center gap-1 transition-colors"
            >
              <span>{t('viewAll')}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Quick Categories Horizontal Strip */}
          <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-1.5 pt-1 scrollbar-none snap-x">
            {quickCategories.map((cat) => {
              const isCustom = cat.isCustomAction;

              const content = (
                <div className="flex flex-col items-center gap-2 text-center group cursor-pointer shrink-0 w-[84px] sm:w-[94px] md:w-[102px] lg:flex-1 p-1.5 rounded-xl hover:bg-[#EFEBE3] transition-all duration-200 snap-start">

                  {/* Category Thumbnail Container with Badge */}
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#D6D0C4] group-hover:border-[#C8102E] group-hover:shadow-md transition-all duration-200 bg-[#E2DDD2]">
                    <img
                      src={cat.image}
                      alt={t(cat.nameKey)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    {cat.badgeKey && (
                      <span className="absolute -bottom-0.5 inset-x-0 brand-gradient text-white text-[9px] font-extrabold py-0.2 leading-tight uppercase">
                        {t(cat.badgeKey)}
                      </span>
                    )}
                  </div>

                  {/* Category Name Label */}
                  <span className="text-xs sm:text-[13px] font-semibold text-[#1F2937] group-hover:text-[#061C3F] transition-colors leading-tight line-clamp-1">
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

        {/* ============================================================ */}
        {/* SAUDI VALUE PILLARS STRIP (Compact Ecommerce Confidence Bar) */}
        {/* ============================================================ */}
        <div className="mt-3 sm:mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 text-start">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#FAFAF8] border border-[#E6E2D8] text-[#4B5563]">
            <Truck className="w-4 h-4 text-[#C8102E] shrink-0" />
            <span className="text-xs font-semibold">
              {language === 'ar' ? 'توصيل مجاني في الرياض' : 'Free Delivery in Riyadh'}
            </span>
          </div>

          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#FAFAF8] border border-[#E6E2D8] text-[#4B5563]">
            <Ruler className="w-4 h-4 text-[#C8102E] shrink-0" />
            <span className="text-xs font-semibold">
              {language === 'ar' ? 'رفع مقاسات ليزر دقيق' : 'Precision Laser Measurement'}
            </span>
          </div>

          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#FAFAF8] border border-[#E6E2D8] text-[#4B5563]">
            <ShieldCheck className="w-4 h-4 text-[#C8102E] shrink-0" />
            <span className="text-xs font-semibold">
              {language === 'ar' ? 'ضمان ٥ سنوات على الهيكل والأقمشة' : '5-Year Frame & Fabric Guarantee'}
            </span>
          </div>

          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#FAFAF8] border border-[#E6E2D8] text-[#4B5563]">
            <Sparkles className="w-4 h-4 text-[#C8102E] shrink-0" />
            <span className="text-xs font-semibold">
              {language === 'ar' ? 'تشطيب مخصص بتوقيع سوفالورا' : 'Signature Bespoke Finishing'}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
