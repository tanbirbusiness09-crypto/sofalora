import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useShop } from '../../context/LanguageContext';
import { useWebsite, cmsImage } from '../../context/WebsiteContext';
import type { CmsBanner } from '../../lib/api';

interface PromoSlide {
  id: string;
  eyebrow: { en: string; ar: string };
  title: { en: string; ar: string };
  subtitle: { en: string; ar: string };
  cta: { en: string; ar: string };
  href: string;
  image: string;
  theme: 'red' | 'navy' | 'gold';
  showText?: boolean;
}

const PROMO_SLIDES: PromoSlide[] = [
  {
    id: 'sofa-sale',
    eyebrow: { en: 'SOFA COLLECTION', ar: 'تشكيلة الكنب' },
    title: { en: 'Sofas for Every Room', ar: 'كنب لكل غرفة' },
    subtitle: { en: 'Premium sofas and sectionals for living and majlis', ar: 'كنب وزوايا فاخرة للمعيشة والمجالس' },
    cta: { en: 'Shop Now', ar: 'اشتر الآن' },
    href: '/shop?category=sofas',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop',
    theme: 'red',
  },
  {
    id: 'blackout-curtains',
    eyebrow: { en: 'CUSTOM TAILORING', ar: 'خياطة بالمقاس' },
    title: { en: 'Blackout Curtains', ar: 'الستائر المعتمة' },
    subtitle: { en: 'Made to measure for your windows in Riyadh', ar: 'مفصلة على مقاس نوافذك في الرياض' },
    cta: { en: 'Get Yours', ar: 'اطلب الآن' },
    href: '/shop?category=curtains',
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
    theme: 'navy',
  },
  {
    id: 'majlis-drop',
    eyebrow: { en: 'NEW COLLECTION', ar: 'تشكيلة جديدة' },
    title: { en: 'Majlis Floor Seating', ar: 'جلسة المجالس' },
    subtitle: { en: 'Floor seating sets for traditional gatherings', ar: 'جلسات أرضية للتجمعات التقليدية' },
    cta: { en: 'Explore', ar: 'تصفح الآن' },
    href: '/shop?category=sofas',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
    theme: 'gold',
  },
];

const PROMO_INTERVAL = 5000;
const THEMES: PromoSlide['theme'][] = ['red', 'navy', 'gold'];

/** Admin "Hero Slides" (website.banners) -> promo slides. */
function bannerToSlide(b: CmsBanner, i: number): PromoSlide {
  const en = (v?: string) => (v ?? '').trim();
  const both = (e?: string, a?: string) => ({ en: en(e) || en(a), ar: en(a) || en(e) });
  return {
    id: `cms-${i}`,
    eyebrow: { en: '', ar: '' },
    title: both(b.title_en, b.title_ar),
    subtitle: both(b.sub_en, b.sub_ar),
    cta: both(b.btn_text, b.btn_text_ar),
    href: en(b.btn_url) || '/shop',
    image: cmsImage(b.image),
    theme: THEMES[i % THEMES.length],
    showText: b.show_text !== false,
  };
}

export const PromoSlider: React.FC = () => {
  const { language, direction } = useShop();
  const { banners } = useWebsite();
  const slides: PromoSlide[] = banners.length ? banners.map(bannerToSlide) : PROMO_SLIDES;
  const count = slides.length;
  const [idx, setIdx] = useState(0);
  const [touchX, setTouchX] = useState<number | null>(null);
  const isRTL = direction === 'rtl';

  useEffect(() => {
    setIdx((i) => (i < count ? i : 0));
    if (count < 2) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % count), PROMO_INTERVAL);
    return () => clearInterval(id);
  }, [count]);

  const go = (d: number) => setIdx((i) => (i + d + count) % count);

  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  return (
    <section aria-label={language === 'ar' ? 'عروض مميزة' : 'Featured collections'}>
      <div
        dir="ltr"
        className="group/promo relative h-[220px] overflow-hidden rounded-[20px] bg-[#0B2345] shadow-[0_18px_40px_-26px_rgba(11,35,69,0.6)] sm:h-[280px] lg:h-[320px]"
        onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX == null) return;
          const dx = e.changedTouches[0].clientX - touchX;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          setTouchX(null);
        }}
      >
        {slides.map((slide, i) => {
          const active = i === idx;
          return (
            <div
              key={slide.id}
              dir={isRTL ? 'rtl' : 'ltr'}
              aria-hidden={!active}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${active ? 'z-10 opacity-100' : 'pointer-events-none opacity-0'}`}
            >
              <img
                src={slide.image}
                alt=""
                loading={i === 0 ? 'eager' : 'lazy'}
                className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[6000ms] ease-out motion-reduce:transition-none ${active ? 'scale-105' : 'scale-100'}`}
              />
              {slide.showText !== false && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#071A35]/95 via-[#071A35]/70 via-40% to-transparent to-75% rtl:bg-gradient-to-l" />
                  <div className="relative z-10 flex h-full max-w-[560px] flex-col justify-center px-6 sm:px-10 lg:px-14">
                    <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#D8B25E] rtl:tracking-normal">
                      {slide.eyebrow[language] || `${String(i + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}`}
                    </span>
                    <h2 className="mt-2 text-[26px] font-extrabold leading-[1.1] tracking-[-0.02em] text-white sm:text-[34px] lg:text-[40px] rtl:tracking-normal">
                      {slide.title[language]}
                    </h2>
                    {slide.subtitle[language] && <p className="mt-2 line-clamp-2 text-[13px] text-white/80 sm:text-[15px]">{slide.subtitle[language]}</p>}
                    {slide.cta[language] && (
                      <a
                        href={slide.href}
                        tabIndex={active ? 0 : -1}
                        className="mt-5 inline-flex h-10 w-fit items-center gap-2 rounded-full bg-white px-5 text-[13px] font-bold text-[#0B2345] shadow-md transition-colors hover:bg-[#D8B25E] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8B25E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B2345]"
                      >
                        {slide.cta[language]} <Arrow className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}

        {count > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label={language === 'ar' ? 'السابق' : 'Previous'} className="absolute start-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-md transition hover:bg-white hover:text-[#0B2345] sm:flex sm:opacity-0 sm:group-hover/promo:opacity-100">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label={language === 'ar' ? 'التالي' : 'Next'} className="absolute end-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-md transition hover:bg-white hover:text-[#0B2345] sm:flex sm:opacity-0 sm:group-hover/promo:opacity-100">
              <ArrowRight className="h-4 w-4" />
            </button>
            <div className="absolute bottom-4 start-6 z-20 flex items-center gap-2 sm:start-10 lg:start-14">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setIdx(i)}
                  aria-label={`${language === 'ar' ? 'شريحة' : 'Slide'} ${i + 1}`}
                  aria-current={i === idx}
                  className={`h-[3px] rounded-full transition-all duration-500 ${i === idx ? 'w-10 bg-[#D8B25E]' : 'w-5 bg-white/40 hover:bg-white/70'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
