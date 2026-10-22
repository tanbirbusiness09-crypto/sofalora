import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useShop } from '../../context/LanguageContext';
import { Link } from '../../context/RouterContext';
import {
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Flame,
  Tag,
  ShieldCheck,
  Truck,
  Ruler,
  CheckCircle2,
  Percent,
} from 'lucide-react';

interface HeroSlide {
  id: string;
  labelKey: 'heroSlide1Label' | 'heroSlide2Label' | 'heroSlide3Label';
  titleKey: 'heroSlide1Title' | 'heroSlide2Title' | 'heroSlide3Title';
  descKey: 'heroSlide1Desc' | 'heroSlide2Desc' | 'heroSlide3Desc';
  ctaKey: 'heroSlide1Cta' | 'heroSlide2Cta' | 'heroSlide3Cta';
  secondaryKey: 'heroSlide1Secondary' | 'heroSlide2Secondary' | 'heroSlide3Secondary';
  badgeKey: 'heroSlide1Badge' | 'heroSlide2Badge' | 'heroSlide3Badge';
  image: string;
  link: string;
  isCustomAction?: boolean;
}

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
  const PrevIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  // Carousel Slides Configuration
  const slides: HeroSlide[] = [
    {
      id: 'slide-sofas',
      labelKey: 'heroSlide1Label',
      titleKey: 'heroSlide1Title',
      descKey: 'heroSlide1Desc',
      ctaKey: 'heroSlide1Cta',
      secondaryKey: 'heroSlide1Secondary',
      badgeKey: 'heroSlide1Badge',
      image:
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1600&auto=format&fit=crop',
      link: '/category/sofas',
    },
    {
      id: 'slide-curtains',
      labelKey: 'heroSlide2Label',
      titleKey: 'heroSlide2Title',
      descKey: 'heroSlide2Desc',
      ctaKey: 'heroSlide2Cta',
      secondaryKey: 'heroSlide2Secondary',
      badgeKey: 'heroSlide2Badge',
      image:
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop',
      link: '/category/curtains',
    },
    {
      id: 'slide-pairing',
      labelKey: 'heroSlide3Label',
      titleKey: 'heroSlide3Title',
      descKey: 'heroSlide3Desc',
      ctaKey: 'heroSlide3Cta',
      secondaryKey: 'heroSlide3Secondary',
      badgeKey: 'heroSlide3Badge',
      image:
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop',
      link: '#custom',
      isCustomAction: true,
    },
  ];

  // Quick Categories Bar Data
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

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  // Mobile Touch Swipe Handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const SLIDE_DURATION = 5000; // 5 seconds
  const PROGRESS_TICK = 50; // 50ms update

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  // Autoplay Timer with Progress Tracking
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + (PROGRESS_TICK / SLIDE_DURATION) * 100;
      });
    }, PROGRESS_TICK);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 45;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        // Swiped left
        if (isRtl) prevSlide();
        else nextSlide();
      } else {
        // Swiped right
        if (isRtl) nextSlide();
        else prevSlide();
      }
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section
      id="hero-ecommerce"
      className="bg-[#F6F2EC] pt-3 sm:pt-4 lg:pt-6 pb-6 sm:pb-8 lg:pb-10 border-b border-[#E5D8C9]"
      aria-label="Promotional Showcase"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* ============================================================ */}
        {/* TOP ECOMMERCE HERO CONTAINER: MAIN CAROUSEL + PROMO CARDS */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-5">
          
          {/* ---------------------------------------------------------- */}
          {/* MAIN PROMOTIONAL CAROUSEL (Desktop: 8 Cols, Mobile: Full)  */}
          {/* ---------------------------------------------------------- */}
          <div
            className="lg:col-span-8 relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-[#1A1816] group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            role="region"
            aria-roledescription="carousel"
            aria-label="Promotional Offers"
          >
            {/* Aspect Ratio Container for Responsive Height */}
            <div className="relative w-full h-[400px] sm:h-[430px] md:h-[460px] lg:h-[480px] xl:h-[500px]">
              
              {/* Slides */}
              {slides.map((slide, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      isActive
                        ? 'opacity-100 z-10 pointer-events-auto'
                        : 'opacity-0 z-0 pointer-events-none'
                    }`}
                    aria-hidden={!isActive}
                  >
                    {/* Background Image with subtle zoom on active */}
                    <img
                      src={slide.image}
                      alt={t(slide.titleKey)}
                      className={`w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out ${
                        isActive ? 'scale-100' : 'scale-105'
                      }`}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                    />

                    {/* LTR/RTL Adaptive Dark Gradient Overlay for Maximum Text Contrast */}
                    <div
                      className={`absolute inset-0 pointer-events-none ${
                        isRtl
                          ? 'bg-gradient-to-l from-black/85 via-black/55 to-transparent/20'
                          : 'bg-gradient-to-r from-black/85 via-black/55 to-transparent/20'
                      }`}
                    />
                    {/* Bottom Vignette for Pill & Controls Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                    {/* Slide Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-7 md:p-9 lg:p-10 z-20">
                      
                      {/* Top Row: Promotional Eyebrow Badge & Discount Tag */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[#E6C687] text-xs sm:text-sm font-bold tracking-wider uppercase">
                          <Sparkles className="w-3.5 h-3.5 text-[#E6C687]" />
                          <span>{t(slide.labelKey)}</span>
                        </div>

                        {slide.badgeKey && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B85C3A] text-[#1A1816] text-xs sm:text-sm font-extrabold shadow-sm tracking-wide">
                            <Tag className="w-3.5 h-3.5" />
                            <span>{t(slide.badgeKey)}</span>
                          </div>
                        )}
                      </div>

                      {/* Center/Lower: Main Heading, Description, CTA, and Secondary Text */}
                      <div className="max-w-xl text-start space-y-3 sm:space-y-4">
                        
                        {/* Heading */}
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-white leading-[1.2] font-serif-luxury tracking-tight drop-shadow-sm">
                          {t(slide.titleKey)}
                        </h2>

                        {/* Description */}
                        <p className="text-[#E2D9CE] text-sm sm:text-base md:text-lg leading-relaxed line-clamp-2 sm:line-clamp-3 font-normal max-w-lg">
                          {t(slide.descKey)}
                        </p>

                        {/* CTA Row with Price/Value Cue */}
                        <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                          {slide.isCustomAction ? (
                            <button
                              type="button"
                              onClick={openConsultation}
                              className="brand-gradient inline-flex items-center justify-center gap-2.5 text-white px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl text-sm sm:text-base font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group/btn cursor-pointer"
                            >
                              <span>{t(slide.ctaKey)}</span>
                              <ArrowIcon className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1" />
                            </button>
                          ) : (
                            <Link
                              href={slide.link}
                              className="brand-gradient inline-flex items-center justify-center gap-2.5 text-white px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl text-sm sm:text-base font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group/btn cursor-pointer"
                            >
                              <span>{t(slide.ctaKey)}</span>
                              <ArrowIcon className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1" />
                            </Link>
                          )}

                          {/* Secondary Text / Price Indicator */}
                          {slide.secondaryKey && (
                            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-black/40 backdrop-blur-sm border border-white/15 text-white/90 text-xs sm:text-sm font-semibold">
                              <CheckCircle2 className="w-4 h-4 text-[#B85C3A]" />
                              <span>{t(slide.secondaryKey)}</span>
                            </div>
                          )}
                        </div>

                      </div>

                      {/* Bottom Controls Bar */}
                      <div className="pt-2 flex items-center justify-between gap-4">
                        
                        {/* Slide Dots / Indicators */}
                        <div className="flex items-center gap-2">
                          {slides.map((_, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => goToSlide(i)}
                              className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                                i === currentSlide
                                  ? 'w-7 sm:w-8 bg-[#B85C3A]'
                                  : 'w-2 sm:w-2.5 bg-white/40 hover:bg-white/70'
                              }`}
                              aria-label={`Go to slide ${i + 1}`}
                            />
                          ))}
                        </div>

                        {/* Prev & Next Arrow Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={prevSlide}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 backdrop-blur-md text-white flex items-center justify-center transition-all duration-200 cursor-pointer border border-white/20"
                            aria-label="Previous Slide"
                          >
                            <PrevIcon className="w-5 h-5" />
                          </button>
                          <button
                            type="button"
                            onClick={nextSlide}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 backdrop-blur-md text-white flex items-center justify-center transition-all duration-200 cursor-pointer border border-white/20"
                            aria-label="Next Slide"
                          >
                            <NextIcon className="w-5 h-5" />
                          </button>
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })}

              {/* Live Progress Bar at Top of Carousel */}
              <div className="absolute top-0 inset-x-0 h-1 bg-white/15 z-30 pointer-events-none">
                <div
                  className="h-full bg-[#B85C3A] transition-all ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>

            </div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* RIGHT-SIDE PROMOTIONAL CARDS (Desktop: 4 Cols Stacked)     */}
          {/* ---------------------------------------------------------- */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4 lg:gap-4">
            
            {/* PROMO CARD 1: Blackout Collection Up to 30% Off */}
            <Link
              href="/category/sofas"
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-md border border-[#E4DCD1] bg-[#1F1C19] group block h-[190px] sm:h-[205px] lg:h-[232px] xl:h-[242px] transition-all duration-300"
              id="hero-promo-card-1"
            >
              {/* Background Image */}
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop"
                alt={t('heroPromo1Title')}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Gradient Overlay for Readability */}
              <div
                className={`absolute inset-0 ${
                  isRtl
                    ? 'bg-gradient-to-l from-black/85 via-black/55 to-transparent'
                    : 'bg-gradient-to-r from-black/85 via-black/55 to-transparent'
                }`}
              />

              {/* Badge */}
              <div className="absolute top-3.5 end-3.5 z-10">
                <span className="inline-flex items-center gap-1 bg-[#B85C3A] text-[#161B18] text-[11px] font-black px-2.5 py-1 rounded-full shadow-sm">
                  <Percent className="w-3 h-3" />
                  <span>{t('heroPromo1Badge')}</span>
                </span>
              </div>

              {/* Card Content */}
              <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end text-start z-10">
                <span className="text-xs font-semibold text-[#E5C687] uppercase tracking-wider mb-1">
                  {language === 'ar' ? 'تشكيلة مختارة' : 'Featured Collection'}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white font-serif-luxury leading-snug">
                  {t('heroPromo1Title')}
                </h3>
                <p className="text-sm font-medium text-[#E0D7CD] mb-3">
                  {t('heroPromo1Subtitle')}
                </p>

                {/* Micro Action Button */}
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FBF8F3] bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-lg w-fit transition-all duration-200 group-hover:bg-[#B85C3A] group-hover:text-white group-hover:border-[#B85C3A]">
                  <span>{t('heroPromo1Cta')}</span>
                  <ArrowIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </div>
              </div>
            </Link>

            {/* PROMO CARD 2: Curtain Atelier */}
            <Link
              href="/category/curtains"
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-md border border-[#E4DCD1] bg-[#1F1C19] group block h-[190px] sm:h-[205px] lg:h-[232px] xl:h-[242px] transition-all duration-300"
              id="hero-promo-card-2"
            >
              {/* Background Image */}
              <img
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop"
                alt={t('heroPromo2Title')}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Gradient Overlay for Readability */}
              <div
                className={`absolute inset-0 ${
                  isRtl
                    ? 'bg-gradient-to-l from-black/85 via-black/55 to-transparent'
                    : 'bg-gradient-to-r from-black/85 via-black/55 to-transparent'
                }`}
              />

              {/* Badge */}
              <div className="absolute top-3.5 end-3.5 z-10">
                <span className="inline-flex items-center gap-1 bg-white/90 text-[#161B18] text-[11px] font-black px-2.5 py-1 rounded-full shadow-sm">
                  <Flame className="w-3 h-3 text-[#B85C3A]" />
                  <span>{t('heroPromo2Badge')}</span>
                </span>
              </div>

              {/* Card Content */}
              <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end text-start z-10">
                <span className="text-xs font-semibold text-[#E5C687] uppercase tracking-wider mb-1">
                  {language === 'ar' ? 'أتيليه الستائر' : 'Curtain Atelier'}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white font-serif-luxury leading-snug">
                  {t('heroPromo2Title')}
                </h3>
                <p className="text-sm font-medium text-[#E0D7CD] mb-3">
                  {t('heroPromo2Subtitle')}
                </p>

                {/* Micro Action Button */}
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FBF8F3] bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-lg w-fit transition-all duration-200 group-hover:bg-[#B85C3A] group-hover:text-white group-hover:border-[#B85C3A]">
                  <span>{t('heroPromo2Cta')}</span>
                  <ArrowIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </div>
              </div>
            </Link>

          </div>

        </div>

        {/* ============================================================ */}
        {/* QUICK CATEGORY NAVIGATION BAR (Directly Below Hero)          */}
        {/* ============================================================ */}
        <div
          className="mt-4 sm:mt-5 lg:mt-6 bg-[#FBF8F3] border border-[#E5DDD2] rounded-2xl p-2.5 sm:p-3.5 shadow-xs"
          id="hero-quick-categories"
        >
          {/* Header Label / Micro Bar for Context */}
          <div className="flex items-center justify-between px-2 pb-2 mb-1 border-b border-[#EDE6DC]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B85C3A]" />
              <span className="text-xs font-bold text-[#635A50] uppercase tracking-wider">
                {language === 'ar' ? 'تصفح سريع للفئات' : 'Quick Category Browser'}
              </span>
            </div>
            <a
              href="#categories"
              className="text-xs font-bold text-[#7A351F] hover:text-[#5E441B] flex items-center gap-1 transition-colors"
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
                <div className="flex flex-col items-center gap-2 text-center group cursor-pointer shrink-0 w-[84px] sm:w-[94px] md:w-[102px] lg:flex-1 p-1.5 rounded-xl hover:bg-[#F0EAE1] transition-all duration-200 snap-start">
                  
                  {/* Category Thumbnail Container with Badge */}
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#D8CDBF] group-hover:border-[#B85C3A] group-hover:shadow-md transition-all duration-200 bg-[#E5D8C9]">
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
                  <span className="text-xs sm:text-[13px] font-semibold text-[#302B26] group-hover:text-[#7A351F] transition-colors leading-tight line-clamp-1">
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
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/70 border border-[#E7DFD4] text-[#4A423A]">
            <Truck className="w-4 h-4 text-[#B85C3A] shrink-0" />
            <span className="text-xs font-semibold">
              {language === 'ar' ? 'توصيل مجاني في الرياض' : 'Free Delivery in Riyadh'}
            </span>
          </div>

          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/70 border border-[#E7DFD4] text-[#4A423A]">
            <Ruler className="w-4 h-4 text-[#B85C3A] shrink-0" />
            <span className="text-xs font-semibold">
              {language === 'ar' ? 'رفع مقاسات ليزر دقيق' : 'Precision Laser Measurement'}
            </span>
          </div>

          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/70 border border-[#E7DFD4] text-[#4A423A]">
            <ShieldCheck className="w-4 h-4 text-[#B85C3A] shrink-0" />
            <span className="text-xs font-semibold">
              {language === 'ar' ? 'ضمان ٥ سنوات على الهيكل والأقمشة' : '5-Year Frame & Fabric Guarantee'}
            </span>
          </div>

          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/70 border border-[#E7DFD4] text-[#4A423A]">
            <Sparkles className="w-4 h-4 text-[#B85C3A] shrink-0" />
            <span className="text-xs font-semibold">
              {language === 'ar' ? 'تشطيب مخصص بتوقيع سوفالورا' : 'Signature Bespoke Finishing'}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
