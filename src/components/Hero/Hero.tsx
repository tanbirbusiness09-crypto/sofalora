import React, { useCallback, useEffect, useState } from 'react';
import { useShop } from '../../context/LanguageContext';
import { Link } from '../../context/RouterContext';
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSectionCms, useWebsite, pickText, cmsImage } from '../../context/WebsiteContext';

const HERO_LEFT_IMAGES = [
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400&auto=format&fit=crop',
];

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
            key={`${i}-${src}`}
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


interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
}

const HERO_INTERVAL = 6500;
const HERO_DEFAULT_IMAGE = '/images/home/hero-riyadh-living.webp';

/**
 * Cinematic home hero. Slides come from the admin promo-slider banners
 * (Website Builder > Banners); hero section items/title override them; the
 * built-in Sofalora imagery is only a fallback when the CMS is empty.
 */
export const Hero: React.FC = () => {
  const { language, direction, t } = useShop();
  const cms = useSectionCms('hero');
  const { banners } = useWebsite();
  const isAr = language === 'ar';

  const defaultTitle = isAr ? 'منازل الرياض\nتستحق الاستثنائي' : 'Riyadh Homes\nDeserve Extraordinary';
  const defaultSub = isAr
    ? 'كنب وستائر وتصاميم داخلية مخصصة للحياة العصرية'
    : 'Premium sofas, curtains & custom interiors for modern living';
  const cta = isAr ? 'استكشف المجموعة' : 'Explore Collection';
  const heroTitle = cms.title('');
  const heroSubtitle = cms.subtitle('');

  const cmsItems = [0, 1, 2, 3, 4]
    .map((i) => cms.item(i))
    .filter((it) => (it.image ?? '').trim() !== '');

  const bannerSlides = (): HeroSlide[] =>
    banners.map((b) => {
      const showText = b.show_text !== false;
      return {
        image: cmsImage(b.image),
        title: heroTitle || (showText ? pickText(language, b.title_en, b.title_ar, defaultTitle) : defaultTitle),
        subtitle: heroSubtitle || (showText ? pickText(language, b.sub_en, b.sub_ar, defaultSub) : defaultSub),
        cta: pickText(language, b.btn_text, b.btn_text_ar, cta),
        href: (b.btn_url ?? '').trim() || '/shop',
      };
    });

  let slides: HeroSlide[];
  if (cmsItems.length > 0) {
    slides = cmsItems.map((it) => ({
      image: cmsImage(it.image),
      title: pickText(language, it.title_en, it.title_ar, heroTitle || defaultTitle),
      subtitle: pickText(language, it.subtitle_en, it.subtitle_ar, heroSubtitle || defaultSub),
      cta: pickText(language, (it as { btn_text?: string }).btn_text, (it as { btn_text_ar?: string }).btn_text_ar, cta),
      href: (it.url ?? '').trim() || '/shop',
    }));
    // Admin hero slides only; the older stock promo banners stay in the promo slider section.
    void bannerSlides;
  } else {
    // Default first slide: the Sofalora Riyadh living-room visual (public/images/home),
    // followed by the admin promo-slider banners.
    slides = [
      { image: HERO_DEFAULT_IMAGE, title: heroTitle || defaultTitle, subtitle: heroSubtitle || defaultSub, cta, href: '/shop' },
      ...banners.map((b) => {
      const showText = b.show_text !== false;
      return {
        image: cmsImage(b.image),
        title: heroTitle || (showText ? pickText(language, b.title_en, b.title_ar, defaultTitle) : defaultTitle),
        subtitle: heroSubtitle || (showText ? pickText(language, b.sub_en, b.sub_ar, defaultSub) : defaultSub),
        cta: pickText(language, b.btn_text, b.btn_text_ar, cta),
        href: (b.btn_url ?? '').trim() || '/shop',
      };
      }),
    ];
    if (slides.length === 1) {
      slides.push(
        ...HERO_LEFT_IMAGES.slice(0, 2).map((image) => ({ image, title: heroTitle || defaultTitle, subtitle: heroSubtitle || defaultSub, cta, href: '/shop' }))
      );
    }
  }

  const count = slides.length;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchX, setTouchX] = useState<number | null>(null);
  const current = slides[Math.min(idx, count - 1)];

  const go = useCallback((d: number) => setIdx((i) => (i + d + count) % count), [count]);

  useEffect(() => {
    if (count < 2 || paused) return;
    const id = setTimeout(() => go(1), HERO_INTERVAL);
    return () => clearTimeout(id);
  }, [idx, count, paused, go]);

  const Arrow = direction === 'rtl' ? ArrowLeft : ArrowRight;
  const Prev = direction === 'rtl' ? ChevronRight : ChevronLeft;
  const Next = direction === 'rtl' ? ChevronLeft : ChevronRight;
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section id="hero-ecommerce" aria-label={isAr ? 'العرض الرئيسي' : 'Featured showcase'}>
      <div
        className="relative h-[440px] sm:h-[440px] lg:h-[clamp(300px,24vw,460px)] overflow-hidden rounded-[16px] bg-[#0B2345]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX == null) return;
          const dx = e.changedTouches[0].clientX - touchX;
          if (Math.abs(dx) > 40) go((dx < 0) !== (direction === 'rtl') ? 1 : -1);
          setTouchX(null);
        }}
      >
        {slides.map((s, i) => (
          <div
            key={`${i}-${s.image}`}
            aria-hidden={i !== idx}
            className={`absolute inset-0 rtl:-scale-x-100 transition-opacity duration-[1200ms] ease-out ${i === idx ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={s.image}
              alt={i === idx ? s.title : ''}
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              decoding="async"
              draggable={false}
              className={`h-full w-full object-cover object-[28%_60%] ${i === idx ? 'sf-kenburns' : ''}`}
            />
          </div>
        ))}

        {/* Readability: deep navy wash on the copy side (end), bottom wash on mobile */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071A35]/95 via-[#0B2345]/65 via-40% to-transparent to-75% sm:bg-gradient-to-l rtl:sm:bg-gradient-to-r sm:from-[#071A35]/90 sm:from-0% sm:via-[#0B2345]/60 sm:via-35% sm:to-transparent sm:to-62%" />

        <div className="absolute inset-x-0 bottom-20 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 px-6 sm:px-10 lg:px-[4%] flex sm:justify-end">
          <div key={idx} className="max-w-[440px] sm:w-[44%] lg:w-[34%] text-start [text-shadow:0_2px_14px_rgba(4,14,30,0.55)]">
            <span className="sf-rise mb-3 block h-[2px] w-10 rounded-full bg-[#C9A96E]" aria-hidden />
            {(() => {
              const [first, ...rest] = current.title.split('\n');
              const body = (
                <>
                  <span className="text-[#FAF6EE]">{first}</span>
                  {rest.length > 0 && <span className="block text-[#D9BE8C]">{rest.join(' ')}</span>}
                </>
              );
              const cls = 'sf-rise font-display-serif text-[32px] leading-[1.08] sm:text-[36px] lg:text-[clamp(30px,2.8vw,48px)]';
              return heroTitle && idx === 0 ? <h1 className={cls}>{body}</h1> : <h2 className={cls}>{body}</h2>;
            })()}
            <p className="sf-rise sf-rise-1 mt-3 text-[13px] sm:text-[14px] font-medium leading-[1.6] text-[#EDE6D8]">{current.subtitle}</p>
            <Link
              href={current.href}
              className="sf-rise sf-rise-2 group mt-5 inline-flex items-center gap-3 rounded-[10px] bg-[#B59460] px-6 py-3 text-[14px] font-bold text-[#0B2345] [text-shadow:none] shadow-[0_14px_30px_-14px_rgba(0,0,0,0.6)] transition-all hover:bg-[#C9A96E] hover:gap-4"
            >
              <span>{current.cta}</span>
              <Arrow className="h-4 w-4" />
            </Link>
          </div>
        </div>
        {!heroTitle && <h1 className="sr-only">{t('heroHeading')}</h1>}

        {count > 1 && (
          <div className="absolute bottom-4 end-4 sm:end-6 flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-3 me-3 text-[11px] font-semibold tracking-[0.15em] text-white/90">
              <span>{pad(idx + 1)}</span>
              <span className="relative h-px w-20 bg-white/25 overflow-hidden">
                <span
                  key={`${idx}-${paused}`}
                  className="sf-progress absolute inset-0 bg-[#C9A96E]"
                  style={{ animationDuration: `${HERO_INTERVAL}ms`, animationPlayState: paused ? 'paused' : 'running' }}
                />
              </span>
              <span className="text-white/50">{pad(count)}</span>
            </div>
            <button type="button" onClick={() => go(-1)} aria-label={isAr ? 'السابق' : 'Previous slide'} className="sf-round-btn h-9 w-9 bg-white/85 text-[#0B2345] backdrop-blur hover:bg-white shadow-sm">
              <Prev className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label={isAr ? 'التالي' : 'Next slide'} className="sf-round-btn h-9 w-9 bg-[#0B2345] text-white hover:bg-[#12305C] shadow-sm">
              <Next className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
