import React, { useRef } from 'react';
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useShop } from '../../context/LanguageContext';
import { Link } from '../../context/RouterContext';
import { useSectionCms, pickText, cmsImage } from '../../context/WebsiteContext';
import { PremiumHeader } from './PremiumHeader';

type Item = { image?: string; title_en?: string; title_ar?: string; subtitle_en?: string; subtitle_ar?: string; value?: string; url?: string };

/** Fallback only — admin items (section `shop_by_room`) replace these once saved. */
const DEFAULTS: Item[] = [
  { title_en: 'Living Room', title_ar: 'غرفة المعيشة', subtitle_en: 'Sofas and sheer curtains', subtitle_ar: 'كنب وستائر شفافة', url: '/shop?category=sofas' },
  { title_en: 'Formal Majlis', title_ar: 'المجلس الرسمي', subtitle_en: 'Majlis seating and heavy drapes', subtitle_ar: 'جلسات مجلس وستائر ثقيلة', url: '/shop?category=sofas' },
  { title_en: 'Bedroom', title_ar: 'غرفة النوم', subtitle_en: 'Loveseats and blackout curtains', subtitle_ar: 'كنب صغير وستائر معتمة', url: '/shop?category=curtains' },
  { title_en: 'Dining Room', title_ar: 'غرفة الطعام', subtitle_en: 'Light sheers for soft daylight', subtitle_ar: 'ستائر شفافة لضوء ناعم', url: '/shop?category=curtains' },
  { title_en: 'Villa Hall', title_ar: 'صالة الفيلا', subtitle_en: 'Sectionals and tall curtains', subtitle_ar: 'كنب زاوية وستائر طويلة', url: '/shop?category=sofas' },
  { title_en: 'Home Office', title_ar: 'المكتب المنزلي', subtitle_en: 'Roller and roman blinds', subtitle_ar: 'بلايندز رول وروماني', url: '/shop?category=blinds' },
];

export const ShopByRoom: React.FC = () => {
  const { language, direction, t } = useShop();
  const cms = useSectionCms();
  const isAr = language === 'ar';
  const track = useRef<HTMLUListElement>(null);
  const Arrow = direction === 'rtl' ? ArrowLeft : ArrowRight;
  const saved = Array.isArray(cms.section?.items) ? (cms.section!.items as Item[]).filter((i) => i && (i.image || i.title_en)) : [];
  const items = saved.length ? saved : DEFAULTS;
  const scroll = (d: 1 | -1) => track.current?.scrollBy({ left: track.current.clientWidth * 0.8 * d * (direction === 'rtl' ? -1 : 1), behavior: 'smooth' });
  const nav = 'flex h-9 w-9 items-center justify-center rounded-full border border-[#E2E4E8] bg-white text-[#0B2345] shadow-sm transition-colors hover:bg-[#0B2345] hover:text-white lg:hidden';

  return (
    <section id="shop-by-room" dir={direction} aria-label={cms.title(t('roomTitle'))}>
      <PremiumHeader
        eyebrow={isAr ? 'تسوق حسب الغرفة' : 'Shop by room'}
        title={cms.title(t('roomTitle'))}
        subtitle={cms.subtitle(isAr ? 'أفكار تنسيق للكنب والستائر لكل مساحة في منزلك' : 'Sofa and window pairings for every space in your home')}
        href="/shop"
        viewAll={isAr ? 'عرض الكل' : 'View all'}
        right={<>
          <button type="button" onClick={() => scroll(-1)} aria-label={isAr ? 'السابق' : 'Previous'} className={nav}><ChevronLeft className="h-4 w-4 rtl:rotate-180" /></button>
          <button type="button" onClick={() => scroll(1)} aria-label={isAr ? 'التالي' : 'Next'} className={nav}><ChevronRight className="h-4 w-4 rtl:rotate-180" /></button>
        </>}
      />
      <ul ref={track} className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-3 pt-1 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
        {items.map((it, i) => {
          const title = pickText(language, it.title_en, it.title_ar, '');
          const sub = pickText(language, it.subtitle_en, it.subtitle_ar, '');
          return (
            <li key={i} className="w-[80%] shrink-0 snap-start sm:w-[46%] lg:w-auto">
              <Link
                href={(it.url ?? '').trim() || '/shop'}
                aria-label={title}
                className="sf-prem-card group relative block aspect-[4/3] overflow-hidden rounded-[18px] bg-[#E9E2D6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D4F] focus-visible:ring-offset-2"
              >
                <img src={cmsImage(it.image, '')} alt="" loading="lazy" decoding="async" className="sf-prem-img absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A35]/90 via-[#071A35]/25 via-45% to-transparent" />
                <span className="absolute start-4 top-4 rounded-full bg-white/15 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md ring-1 ring-white/25 rtl:tracking-normal">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                  <div className="min-w-0">
                    <h3 className="truncate text-[20px] font-extrabold leading-tight tracking-[-0.01em] text-white">{title}</h3>
                    {sub && <p className="mt-1 truncate text-[13px] text-white/80">{sub}</p>}
                  </div>
                  <span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/95 text-[#0B2345] shadow-md transition-colors duration-300 group-hover:bg-[#D8B25E] group-hover:text-white">
                    <Arrow className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
