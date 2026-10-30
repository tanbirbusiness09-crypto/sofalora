import React, { useMemo, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NoonProductCard } from '../UI/NoonProductCard';
import { useShop } from '../../context/LanguageContext';
import { useCatalog } from '../../context/CatalogContext';
import { useSectionCms } from '../../context/WebsiteContext';
import { Link } from '../../context/RouterContext';


/**
 * noon-style "New Arrivals" product row (home section key `new_products_row`).
 * Newest products first (admin created_at). Admin: title EN/AR, productLimit (1-24, default 12).
 * Only real data: "New" tag from the API's isNew, sale price/% only with a real compare price,
 * rating row only when the product has reviews.
 */
export const NewProductsRow: React.FC = () => {
  const { language, direction } = useShop();
  const { products } = useCatalog();
  const cms = useSectionCms('new_products_row');
  const track = useRef<HTMLUListElement>(null);
  const isAr = language === 'ar';
  const limit = Math.min(24, Math.max(1, Number(cms.section?.productLimit) || 12));

  const list = useMemo(
    () =>
      [...products]
        .filter((p) => p.inStock !== false)
        .sort((a, b) => (Date.parse(b.createdAt ?? '') || 0) - (Date.parse(a.createdAt ?? '') || 0))
        .slice(0, limit),
    [products, limit]
  );
  if (list.length === 0) return null;

  const title = cms.title(isAr ? 'وصل حديثاً' : 'New Arrivals');
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const step = el.clientWidth * 0.8 * dir * (direction === 'rtl' ? -1 : 1);
    el.scrollBy({ left: step, behavior: 'smooth' });
  };
  const arrow = 'flex h-9 w-9 items-center justify-center rounded-full border border-[#E2E4E8] bg-white text-[#0B2345] shadow-sm transition-colors hover:bg-[#0B2345] hover:text-white';

  return (
    <section aria-label={title} dir={direction}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-[22px] sm:text-[24px] font-extrabold leading-tight text-[#0B2345]">{title}</h2>
          <Link href="/shop?sort=newest" className="inline-flex h-8 items-center rounded-full border-[1.5px] border-[#0B2345] px-3.5 text-[12px] font-semibold text-[#0B2345] transition-colors hover:bg-[#0B2345] hover:text-white">
            {isAr ? 'عرض الكل' : 'View all'} <span aria-hidden className="ms-1 inline-block rtl:rotate-180">→</span>
          </Link>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button type="button" onClick={() => scroll(-1)} aria-label={isAr ? 'السابق' : 'Previous'} className={arrow}><ChevronLeft className="h-4 w-4 rtl:rotate-180" /></button>
          <button type="button" onClick={() => scroll(1)} aria-label={isAr ? 'التالي' : 'Next'} className={arrow}><ChevronRight className="h-4 w-4 rtl:rotate-180" /></button>
        </div>
      </div>
      <ul ref={track} className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 pt-1">
        {list.map((p, i) => (
          <li key={p.id} className="w-[46%] shrink-0 snap-start pt-1 sm:w-[30%] md:w-[23%] lg:w-[calc((100%-60px)/6)]">
            <NoonProductCard product={p} index={i} />
          </li>
        ))}
      </ul>
    </section>
  );
};
