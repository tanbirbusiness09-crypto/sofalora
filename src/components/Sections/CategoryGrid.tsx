import React, { useMemo, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useShop } from '../../context/LanguageContext';
import { Link } from '../../context/RouterContext';
import { useCatalog } from '../../context/CatalogContext';
import { useSectionCms, pickText, cmsImage } from '../../context/WebsiteContext';

type Item = { image?: string; title_en?: string; title_ar?: string; subtitle_en?: string; subtitle_ar?: string; badge_en?: string; badge_ar?: string; url?: string };

const U = 'http://localhost:8000/storage/uploads/';
/** Defaults (admin items override completely once saved). Empty badge = real "From ⃁ X" for the linked category. */
export const COLLECTION_DEFAULTS: Item[] = [
  { title_en: 'Sofas', title_ar: 'الكنب', subtitle_en: 'Three-seaters, loveseats & more', subtitle_ar: 'كنب ثلاثي ومزدوج والمزيد', image: U + '28128b26-19aa-4613-9925-83485bde04c3.webp', url: '/shop?category=sofas' },
  { title_en: 'Curtains', title_ar: 'الستائر', subtitle_en: 'Blackout, sheer & velvet', subtitle_ar: 'معتمة وشفافة ومخملية', image: U + '3cd55731-f31f-404c-8e24-e206017ec9e6.webp', url: '/shop?category=curtains' },
  { title_en: 'Blinds', title_ar: 'البلايندز', subtitle_en: 'Roller, zebra & roman', subtitle_ar: 'رول وزيبرا وروماني', image: U + 'bc306a82-dba0-44ae-9190-9751d8a02fa9.webp', url: '/shop?category=blinds' },
  { title_en: 'Accessories', title_ar: 'الإكسسوارات', subtitle_en: 'Cushions, rods & tiebacks', subtitle_ar: 'وسائد وأعمدة وربطات', image: U + '81bc2ce3-bc8b-4b7d-92db-944a123bd0e9.webp', url: '/shop?category=accessories' },
  { title_en: 'Sectionals & Majlis', title_ar: 'الكنب الزاوية والمجالس', subtitle_en: 'Room for every gathering', subtitle_ar: 'مساحة لكل تجمع', badge_en: 'NEW', badge_ar: 'جديد', image: U + '768b427c-e48a-4f47-8c7a-190d20d444d8.webp', url: '/shop?category=sofas' },
  { title_en: 'New Arrivals', title_ar: 'وصل حديثاً', subtitle_en: 'The latest designs', subtitle_ar: 'أحدث التصاميم', badge_en: 'NEW', badge_ar: 'جديد', image: U + 'b820504c-d4c9-4f72-a37c-c65d687b3ebe.webp', url: '/shop?sort=newest' },
];

/** noon "Maximize your savings"-style collection row (home section key `category_grid`). */
export const CategoryGrid: React.FC = () => {
  const { language, direction } = useShop();
  const cms = useSectionCms('category_grid');
  const { products } = useCatalog();
  const track = useRef<HTMLUListElement>(null);
  const isAr = language === 'ar';
  const saved = Array.isArray(cms.section?.items) && cms.section!.items!.length ? (cms.section!.items as Item[]) : null;
  const items = saved ?? COLLECTION_DEFAULTS;

  const minByCat = useMemo(() => {
    const m: Record<string, number> = {};
    for (const p of products) {
      if (p.inStock === false) continue;
      const slug = p.categorySlug;
      if (slug && p.price > 0) m[slug] = Math.min(m[slug] ?? Infinity, p.price);
    }
    return m;
  }, [products]);

  const title = cms.title(isAr ? 'تسوق حسب المجموعة' : 'Shop by Collection');
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: el.clientWidth * 0.75 * dir * (direction === 'rtl' ? -1 : 1), behavior: 'smooth' });
  };
  const arrow = 'absolute top-[38%] z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0B2345] shadow-[0_4px_14px_rgba(11,35,69,0.18)] transition-transform hover:scale-105 active:scale-95 md:flex';

  return (
    <section id="categories" aria-label={title} dir={direction} className="mt-3">
      <h2 className="mb-3 text-[22px] font-extrabold leading-tight text-[#0B2345] sm:text-[24px]">{title}</h2>
      <div className="relative">
        {items.length > 4 && (
          <>
            <button type="button" onClick={() => scroll(-1)} aria-label={isAr ? 'السابق' : 'Previous'} className={`${arrow} -start-3`}><ChevronLeft className="h-5 w-5 rtl:rotate-180" /></button>
            <button type="button" onClick={() => scroll(1)} aria-label={isAr ? 'التالي' : 'Next'} className={`${arrow} -end-3`}><ChevronRight className="h-5 w-5 rtl:rotate-180" /></button>
          </>
        )}
        <ul ref={track} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pt-1">
          {items.map((it, i) => {
            const url = (it.url ?? '').trim() || '/shop';
            const cat = /[?&]category=([^&]+)/.exec(url)?.[1];
            const from = cat && minByCat[cat] !== undefined && Number.isFinite(minByCat[cat]) ? minByCat[cat] : undefined;
            const badge = pickText(language, it.badge_en, it.badge_ar, from !== undefined ? `${isAr ? 'ابتداءً من' : 'From'} ⃁ ${Math.round(from).toLocaleString('en-US')}` : '');
            const name = pickText(language, it.title_en, it.title_ar, '');
            const sub = pickText(language, it.subtitle_en, it.subtitle_ar, '');
            return (
              <li key={i} className="w-[62%] shrink-0 snap-start sm:w-[40%] md:w-[calc((100%-48px)/4)]">
                <Link href={url} className="group block rounded-[22px] transition-transform duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none" aria-label={name}>
                  <div className="relative">
                    <div className="aspect-[4/3] overflow-hidden rounded-[20px] bg-[#F2F3F5] transition-shadow duration-300 group-hover:shadow-[0_14px_28px_-16px_rgba(11,35,69,0.4)]">
                      <img src={cmsImage(it.image, '')} alt="" loading="lazy" decoding="async" className="h-full w-full object-contain p-[7%] mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.05] motion-reduce:transform-none" />
                    </div>
                    {badge && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 whitespace-nowrap rounded-full bg-[#0B2345] px-4 py-1.5 text-[12.5px] font-bold text-[#D8B25E] shadow-[0_4px_10px_rgba(11,35,69,0.25)]">{badge}</span>
                    )}
                  </div>
                  <div className="px-2 pt-6 text-center">
                    <p className="truncate text-[15px] font-extrabold text-[#0B2345]">{name}</p>
                    {sub && <p className="mt-0.5 truncate text-[12.5px] text-[#6B7280]">{sub}</p>}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
