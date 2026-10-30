import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';
import { useShop } from '../../context/LanguageContext';
import { Link } from '../../context/RouterContext';
import { useCatalog } from '../../context/CatalogContext';
import { useSectionCms } from '../../context/WebsiteContext';
import { ProductCard } from '../PLP/ProductCard';

type Bi = [string, string];
/** Built-in defaults per section key; admin settings (productCategory, productLimit, titles) override. */
export const CATEGORY_ROW_DEFAULTS: Record<string, { category: string; title: Bi; subtitle: Bi }> = {
  row_curtains: { category: 'curtains', title: ['Curtain Collection', 'مجموعة الستائر'], subtitle: ['Sheer, blackout and made-to-measure curtains', 'ستائر شفافة وتعتيم وتفصيل حسب المقاس'] },
  row_blinds: { category: 'blinds', title: ['Blinds & Shades', 'البلايندز والظلال'], subtitle: ['Roller, roman, venetian and motorized blinds', 'رول وروماني وفينيسي وكهربائي'] },
  row_sofas: { category: 'sofas', title: ['Sofas & Seating', 'الكنب والجلسات'], subtitle: ['Sectionals, sofa beds and majlis sets', 'كنب زاوية وكنب سرير وجلسات مجالس'] },
  row_accessories: { category: 'accessories', title: ['Finishing Touches', 'لمسات نهائية'], subtitle: ['Cushions, throws, rods and décor', 'وسائد وبطانيات وعصي ستائر وديكور'] },
};

/** Product carousel filtered by one category, same look as New Arrivals (home keys row_*). */
export const CategoryProductRow: React.FC<{ sectionKey: string }> = ({ sectionKey }) => {
  const { language, direction } = useShop();
  const { products, isLoading } = useCatalog();
  const cms = useSectionCms(sectionKey);
  const track = useRef<HTMLDivElement>(null);
  const isAr = language === 'ar';
  const d = CATEGORY_ROW_DEFAULTS[sectionKey];
  const sec = (cms.section ?? {}) as Record<string, unknown>;
  const category = String(sec.productCategory || '').trim() || d?.category || '';
  const limitN = Number(sec.productLimit);
  const limit = Number.isFinite(limitN) && limitN >= 1 ? Math.min(24, limitN) : 12;

  const list = products
    .filter((p) => p.categorySlug === category || p.subcategorySlug === category)
    .sort((a, b) => Number(b.inStock) - Number(a.inStock) || (Date.parse(b.createdAt ?? '') || 0) - (Date.parse(a.createdAt ?? '') || 0))
    .slice(0, limit);
  const title = cms.title(d ? d.title[isAr ? 1 : 0] : '');
  const subtitle = cms.subtitle(d ? d.subtitle[isAr ? 1 : 0] : '');
  const viewAll = `/shop?category=${encodeURIComponent(category)}`;

  if (!isLoading && list.length === 0) return null;

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.8 * dir * (direction === 'rtl' ? -1 : 1), behavior: 'smooth' });
  };
  const Prev = direction === 'rtl' ? ChevronRight : ChevronLeft;
  const Next = direction === 'rtl' ? ChevronLeft : ChevronRight;
  const Arrow = direction === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section aria-label={title} className="px-3 mt-6">
      <div className="flex items-end justify-between gap-4 mb-3">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h2 className="text-[22px] sm:text-[24px] font-bold leading-none text-[#0B2345]">{title}</h2>
          {subtitle && <p className="text-[12.5px] text-[#6B6F76]">{subtitle}</p>}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Link href={viewAll} className="hidden sm:inline-flex items-center gap-1.5 me-2 text-[12.5px] font-semibold text-[#0B2345] hover:text-[#B59460] transition-colors">
            {isAr ? 'عرض الكل' : 'View All'} <Arrow className="h-3.5 w-3.5" />
          </Link>
          <button type="button" onClick={() => scroll(-1)} aria-label={isAr ? 'السابق' : 'Previous'} className="sf-round-btn h-9 w-9 border border-[#DCD5C8] bg-white text-[#0B2345] hover:border-[#0B2345]">
            <Prev className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label={isAr ? 'التالي' : 'Next'} className="sf-round-btn h-9 w-9 bg-[#0B2345] text-white hover:bg-[#12305C]">
            <Next className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div ref={track} className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2 scroll-smooth">
        {isLoading && list.length === 0
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-[78%] sm:w-[46%] lg:w-[23.5%] xl:w-[18.6%] shrink-0 rounded-[18px] bg-[#EFE8DC] h-[380px] animate-pulse" />
            ))
          : list.map((p) => (
              <div key={p.id} className="w-[78%] sm:w-[46%] lg:w-[23.5%] xl:w-[18.6%] shrink-0 snap-start">
                <ProductCard product={p} />
              </div>
            ))}
      </div>
      <Link href={viewAll} className="sm:hidden mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#0B2345]">
        {isAr ? 'عرض الكل' : 'View All'} <Arrow className="h-3.5 w-3.5" />
      </Link>
    </section>
  );
};
