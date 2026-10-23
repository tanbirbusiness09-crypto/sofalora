import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useShop } from '../../context/LanguageContext';

interface PromoSlide {
  id: string;
  eyebrow: { en: string; ar: string };
  title: { en: string; ar: string };
  subtitle: { en: string; ar: string };
  cta: { en: string; ar: string };
  href: string;
  image: string;
  theme: 'red' | 'navy' | 'gold';
}

const PROMO_SLIDES: PromoSlide[] = [
  {
    id: 'sofa-sale',
    eyebrow: { en: 'LIMITED TIME OFFER', ar: 'عرض لفترة محدودة' },
    title: { en: 'Sofa Sale', ar: 'عرض الكنب' },
    subtitle: { en: 'Up to 40% off premium sofas', ar: 'خصم يصل إلى ٤٠٪ على الكنب الفاخرة' },
    cta: { en: 'Shop Now', ar: 'اشتر الآن' },
    href: '/category/sofas',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop',
    theme: 'red',
  },
  {
    id: 'blackout-curtains',
    eyebrow: { en: 'CUSTOM TAILORING', ar: 'خياطة بالمقاس' },
    title: { en: '30% Off Blackout Curtains', ar: '٣٠٪ خصم على الستائر المعتمة' },
    subtitle: { en: 'Free measurement at your home in Riyadh', ar: 'قياس مجاني في منزل بالرياض' },
    cta: { en: 'Get Yours', ar: 'اطلب الآن' },
    href: '/category/blackout-curtains',
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
    theme: 'navy',
  },
  {
    id: 'majlis-drop',
    eyebrow: { en: 'NEW COLLECTION', ar: 'تشكيلة جديدة' },
    title: { en: 'Majlis Floor Seating', ar: 'جلسة المجالس' },
    subtitle: { en: 'Authentic Saudi majlis, made to order', ar: 'مجالس سعودية أصيلة مصنوعة بالطلب' },
    cta: { en: 'Explore', ar: 'تصفح الآن' },
    href: '/category/majlis-sofas',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
    theme: 'gold',
  },
];

const themeStyles: Record<PromoSlide['theme'], string> = {
  red: 'from-[#C8102E] via-[#a30c24] to-[#5c0714]',
  navy: 'from-[#0A2A5E] via-[#061C3F] to-[#040F22]',
  gold: 'from-[#8A6A2F] via-[#6E5222] to-[#3d2d13]',
};

const imgFadeFrom: Record<PromoSlide['theme'], string> = {
  red: 'from-[#C8102E]',
  navy: 'from-[#0A2A5E]',
  gold: 'from-[#8A6A2F]',
};

const PROMO_INTERVAL = 5000;

export const PromoSlider: React.FC = () => {
  const { language, direction } = useShop();
  const [idx, setIdx] = useState(0);
  const [touchX, setTouchX] = useState<number | null>(null);
  const isRTL = direction === 'rtl';

  useEffect(() => {
    const id = setInterval(
      () => setIdx((i) => (i + 1) % PROMO_SLIDES.length),
      PROMO_INTERVAL
    );
    return () => clearInterval(id);
  }, []);

  const go = (d: number) =>
    setIdx((i) => (i + d + PROMO_SLIDES.length) % PROMO_SLIDES.length);

  return (
    <section
      className="bg-white border-b border-[#E5E1D8]"
      aria-label={language === 'ar' ? 'عروض حصرية' : 'Featured Offers'}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div
          dir="ltr"
          className="relative h-[170px] sm:h-[230px] lg:h-[280px] rounded-2xl overflow-hidden border border-[#E5E1D8] shadow-sm"
          onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX == null) return;
            const dx = e.changedTouches[0].clientX - touchX;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            setTouchX(null);
          }}
        >
          {PROMO_SLIDES.map((slide, i) => {
            const active = i === idx;
            return (
              <div
                key={slide.id}
                dir={isRTL ? 'rtl' : 'ltr'}
                aria-hidden={!active}
                className={`absolute inset-0 bg-gradient-to-br ${themeStyles[slide.theme]} flex transition-opacity duration-500 ease-out ${
                  active ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
                }`}
              >
                {/* Copy Block */}
                <div className="relative z-10 flex-1 flex flex-col justify-center px-5 sm:px-10 lg:px-14 py-5">
                  <span className="text-[10px] sm:text-xs font-extrabold tracking-[0.2em] uppercase text-white/85">
                    {slide.eyebrow[language]}
                  </span>

                  <h2 className="mt-1.5 text-xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight">
                    {slide.title[language]}
                  </h2>

                  <p className="mt-1.5 text-xs sm:text-sm lg:text-base text-white/85 font-medium">
                    {slide.subtitle[language]}
                  </p>

                  <a
                    href={slide.href}
                    tabIndex={active ? 0 : -1}
                    className="mt-4 sm:mt-5 inline-flex items-center justify-center gap-1.5 w-fit px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white text-[#101828] hover:bg-[#F3F1EB] text-xs sm:text-sm font-extrabold uppercase tracking-wide shadow-md transition-colors"
                  >
                    <span>{slide.cta[language]}</span>
                    {isRTL ? (
                      <ArrowLeft className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </a>
                </div>

                {/* Animated Poster Image (Ken Burns) */}
                <div className="hidden sm:block w-[36%] lg:w-[32%] relative overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.title[language]}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[4000ms] ease-out ${
                      active ? 'scale-100' : 'scale-110'
                    }`}
                    loading="lazy"
                  />
                  <div
                    className={`absolute inset-y-0 start-0 w-24 sm:w-28 bg-gradient-to-r ${imgFadeFrom[slide.theme]} to-transparent`}
                  />
                </div>
              </div>
            );
          })}

          {/* Prev / Next Arrows */}
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous offer"
            className="hidden sm:flex absolute top-1/2 -translate-y-1/2 start-2.5 z-20 w-9 h-9 rounded-full bg-white/85 hover:bg-white backdrop-blur-xs items-center justify-center text-[#101828] shadow-md transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next offer"
            className="hidden sm:flex absolute top-1/2 -translate-y-1/2 end-2.5 z-20 w-9 h-9 rounded-full bg-white/85 hover:bg-white backdrop-blur-xs items-center justify-center text-[#101828] shadow-md transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1.5 z-20" dir="ltr">
            {PROMO_SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`Offer ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
