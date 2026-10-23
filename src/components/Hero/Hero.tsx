import React, { useEffect, useState } from 'react';
import { useShop } from '../../context/LanguageContext';
import { Link } from '../../context/RouterContext';
import {
  Sparkles,
  ShieldCheck,
  Truck,
  Ruler,
  Home,
} from 'lucide-react';

interface HeroSliderProps {
  images: string[];
  alt: string;
  className?: string;
  interval?: number;
}

const HERO_SLIDE_INTERVAL = 4500;

export const HeroSlider: React.FC<HeroSliderProps> = ({
  images,
  alt,
  className = '',
  interval = HERO_SLIDE_INTERVAL,
}) => {
  const [idx, setIdx] = useState(0);
  const [touchX, setTouchX] = useState<number | null>(null);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(
      () => setIdx((i) => (i + 1) % images.length),
      interval
    );
    return () => clearInterval(id);
  }, [images.length, interval]);

  const onSwipe = (dx: number) => {
    if (Math.abs(dx) < 40) return;
    setIdx((i) =>
      dx < 0 ? (i + 1) % images.length : (i + images.length - 1) % images.length
    );
  };

  return (
    <div
      dir="ltr"
      className={`relative overflow-hidden ${className}`}
      onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX == null) return;
        onSwipe(e.changedTouches[0].clientX - touchX);
        setTouchX(null);
      }}
    >
      <div
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${idx * 100}%)` }}
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={i === idx ? alt : ''}
            className="w-full h-full object-cover shrink-0"
            loading={i === 0 ? 'eager' : 'lazy'}
            draggable={false}
          />
        ))}
      </div>

      {/* Slider Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-1.5 pointer-events-none">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === idx ? 'w-6 bg-white shadow-sm' : 'w-1.5 bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const Hero: React.FC = () => {
  const { language, t } = useShop();

  return (
    <section
      id="hero-ecommerce"
      className="bg-white border-b border-[#E5E1D8]"
      aria-label="Featured Showcase"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 lg:py-10">

        {/* ============================================================ */}
        {/* CLEAN SPLIT HERO: LEFT COPY + RIGHT IMAGE CARDS              */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* ---------------------------------------------------------- */}
          {/* LEFT: FULL-HEIGHT IMAGE (no visible text)                  */}
          {/* ---------------------------------------------------------- */}
          <div className="lg:col-span-6 order-1">
            {/* Screen-reader-only heading keeps document outline intact */}
            <h1 className="sr-only">{t('heroHeading')}</h1>

            <Link
              href="/category/sofas"
              aria-label={t('heroExploreCollection')}
              className="relative block h-[220px] sm:h-[330px] lg:h-[calc(100svh-552px)] lg:min-h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E5E1D8] shadow-sm group"
            >
              <HeroSlider
                className="absolute inset-0"
                alt={t('heroExploreCollection')}
                images={[
                  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1400&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1400&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1400&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400&auto=format&fit=crop',
                ]}
              />
            </Link>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* RIGHT: IMAGE CARDS COLLAGE                                 */}
          {/* ---------------------------------------------------------- */}
          <div className="lg:col-span-6 order-2">
            <div className="grid grid-cols-3 grid-rows-2 gap-2 sm:gap-2.5 h-[230px] sm:h-[330px] lg:h-[calc(100svh-552px)] lg:min-h-[380px]">
              {/* Main Sofa Image */}
              <div className="relative col-span-2 row-span-2 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E5E1D8] shadow-sm group">
                <HeroSlider
                  className="absolute inset-0"
                  alt={t('heroExploreCollection')}
                  images={[
                    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1200&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1200&auto=format&fit=crop',
                  ]}
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

