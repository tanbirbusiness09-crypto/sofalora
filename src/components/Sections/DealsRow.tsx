import React, { useMemo } from 'react';
import { Plus } from 'lucide-react';
import { useShop } from '../../context/LanguageContext';
import { useCatalog } from '../../context/CatalogContext';
import { useSectionCms, pickText, cmsImage } from '../../context/WebsiteContext';
import { Link } from '../../context/RouterContext';
import { NoonProductCard } from '../UI/NoonProductCard';
import { RiyalSign } from '../UI/RiyalSign';
import type { Product } from '../../types';

const fmt = (n: number) => Math.round(n).toLocaleString('en-US');
/** Only real sale prices from the catalog: original (old/compare) price above the selling price. */
export const originalPrice = (p: Product): number | null => {
  const o = Number(p.oldPrice ?? p.comparePrice ?? 0);
  return o > p.price ? o : null;
};

/** "Deals you don't want to miss" band (home section key `deals_row`). Hidden when no product is on sale. */
export const DealsRow: React.FC = () => {
  const { language, direction, addToCart } = useShop();
  const { products } = useCatalog();
  const cms = useSectionCms('deals_row');
  const isAr = language === 'ar';

  const deals = useMemo(() => products.filter((p) => p.inStock !== false && originalPrice(p) !== null).slice(0, 3), [products]);
  if (deals.length === 0) return null;

  const title = cms.title(isAr ? 'عروض لا تفوّتها' : "Deals you don't want to miss");
  const sub = cms.subtitle(isAr ? 'عروض اليوم' : 'Daily deals');
  const T = (i: number, en: string, ar: string, f: 'title' | 'subtitle' = 'title') => {
    const it = cms.item(i);
    return f === 'title' ? pickText(language, it.title_en, it.title_ar, isAr ? ar : en) : pickText(language, it.subtitle_en, it.subtitle_ar, isAr ? ar : en);
  };
  // Admin items: 0 = lifestyle banner, 1..2 = category tiles that fill the row when there are few real deals.
  const banner = {
    title: T(0, 'Deals of the Day', 'عروض اليوم'),
    subtitle: T(0, 'Real savings on selected pieces', 'توفير حقيقي على قطع مختارة', 'subtitle'),
    image: cmsImage(cms.item(0).image, '/images/deals/deals_banner.webp'),
    url: cms.item(0).url || '/shop?onSale=1',
  };
  const tileDefs = [
    { i: 1, slug: 'sofas', en: 'Explore Sofas', ar: 'تصفّح الكنب', img: '/images/deals/deals_sofas.webp' },
    { i: 2, slug: 'curtains', en: 'Explore Curtains', ar: 'تصفّح الستائر', img: '/images/deals/deals_curtains.webp' },
  ];
  const tiles = tileDefs.slice(0, Math.max(0, 3 - deals.length)).map((d) => {
    const it = cms.item(d.i);
    const prices = products.filter((p) => p.categorySlug === d.slug && p.price > 0).map((p) => p.price);
    return {
      title: T(d.i, d.en, d.ar),
      image: cmsImage(it.image, d.img),
      url: it.url || `/shop?category=${d.slug}`,
      from: prices.length ? Math.min(...prices) : null, // real lowest price in the category
    };
  });
  const cell = 'snap-start overflow-hidden rounded-[12px] bg-white shadow-[0_1px_0_rgba(11,35,69,0.04)] transition-shadow hover:shadow-[0_12px_26px_-14px_rgba(11,35,69,0.35)]';

  return (
    <section aria-label={title} dir={direction}>
      <div className="rounded-[16px] bg-gradient-to-br from-[#EFE4CF] via-[#E9DCC3] to-[#E2D2B4] p-3 sm:p-4">
        <div className="mb-3 flex items-end justify-between gap-3">
          <h2 className="text-[20px] sm:text-[22px] font-bold leading-tight text-[#0B2345]">{title}</h2>
          <Link href="/shop?onSale=1" className="inline-flex h-8 items-center rounded-full border-[1.5px] border-[#0B2345] px-3.5 text-[12px] font-semibold text-[#0B2345] transition-colors hover:bg-[#0B2345] hover:text-white">
            {isAr ? 'عرض الكل' : 'View all'} <span aria-hidden className="ms-1 inline-block rtl:rotate-180">→</span>
          </Link>
        </div>
        <ul className="no-scrollbar grid auto-cols-[62%] grid-flow-col gap-3 overflow-x-auto snap-x snap-mandatory sm:auto-cols-[40%] lg:grid-flow-row lg:grid-cols-4 lg:overflow-visible">
          <li className="snap-start overflow-hidden rounded-[12px] bg-[#0B2345]">
            <Link href={banner.url} className="group relative block h-full min-h-[300px]">
              <img src={banner.image} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0B2345]/90 via-[#0B2345]/30 to-transparent" />
              <div className="relative p-4">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#D9BE8C] rtl:tracking-normal">{sub}</span>
                <h3 className="mt-1 font-display-serif text-[26px] leading-[1.1] text-[#F4EBDB]">{banner.title}</h3>
                <p className="mt-1.5 text-[13px] text-[#E8DCC6]/90">{banner.subtitle}</p>
                <span className="mt-3 inline-flex h-8 items-center rounded-full bg-[#C9A96E] px-3.5 text-[12px] font-bold text-[#0B2345]">{isAr ? 'تسوّق العروض' : 'Shop deals'}</span>
              </div>
            </Link>
          </li>
          {deals.map((p, i) => (
            <li key={p.id} className="snap-start">
              <NoonProductCard product={p} index={i} showCategory />
            </li>
          ))}
          {tiles.map((t) => (
            <li key={t.url} className={cell}>
              <Link href={t.url} className="group block">
                <div className="aspect-square overflow-hidden bg-[#F7F3EC]">
                  <img src={t.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <div className="px-3 pb-3 pt-2">
                  <p className="text-[14px] font-semibold text-[#0B2345]">{t.title} <span aria-hidden className="inline-block rtl:rotate-180">→</span></p>
                  {t.from !== null && (
                    <p dir="ltr" className={`mt-1 flex items-center gap-1 text-[12.5px] text-[#6B6F76] ${isAr ? 'justify-end' : ''}`}>
                      {isAr ? '' : 'From '}<span className="flex items-center gap-0.5 font-bold text-[#0B2345]"><RiyalSign />{fmt(t.from)}</span>{isAr ? ' ابتداءً من' : ''}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
