import React from 'react';
import { useShop } from '../../context/LanguageContext';
import { useSectionCms, cmsImage } from '../../context/WebsiteContext';
import { Link } from '../../context/RouterContext';
import { RiyalSign } from '../UI/RiyalSign';

const DEFAULT_BANDS: Array<{ max: number; image: string }> = [
  { max: 999, image: '/images/price-bands/curtains.webp' },
  { max: 1999, image: '/images/price-bands/armchair.webp' },
  { max: 2999, image: '/images/price-bands/sofa-bed.webp' },
  { max: 3999, image: '/images/price-bands/sofa-corner.webp' },
  { max: 4999, image: '/images/price-bands/majlis.webp' },
  { max: 6999, image: '/images/price-bands/sectional.webp' },
];

const fmt = (n: number) => n.toLocaleString('en-US');

/**
 * "Under X" price-band tiles (home section key `price_bands`).
 * Admin items override per tile: `value` = max price (SAR), `image` = photo,
 * `url` = custom link (default /shop?maxPrice=X).
 */
export const PriceBands: React.FC = () => {
  const { language, direction } = useShop();
  const cms = useSectionCms('price_bands');
  const isAr = language === 'ar';
  const title = cms.title('');

  const bands = DEFAULT_BANDS.map((d, i) => {
    const it = cms.item(i);
    const v = Number(String(it.value ?? '').replace(/[^\d.]/g, ''));
    const max = Number.isFinite(v) && v > 0 ? v : d.max;
    return { max, image: cmsImage(it.image, d.image), href: (it.url || '').trim() || `/shop?maxPrice=${max}` };
  });

  return (
    <section aria-label={title || (isAr ? 'تسوق حسب السعر' : 'Shop by price')} className="pt-3 pb-1 pe-3 max-lg:ps-3" dir={direction}>
      {title && <h2 className="mb-2.5 text-[20px] sm:text-[22px] font-bold leading-tight text-[#0B2345]">{title}</h2>}
      <ul className="no-scrollbar grid auto-cols-[42%] grid-flow-col gap-2.5 overflow-x-auto snap-x snap-mandatory sm:auto-cols-[28%] lg:grid-flow-row lg:grid-cols-6 lg:overflow-visible">
        {bands.map((b, i) => (
          <li key={i} className="snap-start">
            <Link href={b.href} className="group relative block aspect-[20/21] overflow-hidden rounded-[12px] bg-[#F3EEE6]">
              <img src={b.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
              <span className="absolute bottom-2.5 left-1/2 flex min-w-[64%] -translate-x-1/2 flex-col items-center rounded-[10px] bg-[#B08A55] px-3 pb-1 pt-1.5 text-white shadow-[0_6px_16px_-6px_rgba(11,35,69,0.45)] transition-colors group-hover:bg-[#A8834F]">
                <span className="text-[12px] font-extrabold uppercase leading-none tracking-[0.04em] sm:text-[13px]">{isAr ? 'أقل من' : 'Under'}</span>
                <span dir="ltr" className="flex items-center gap-1 text-[24px] font-extrabold leading-[1.15] sm:text-[28px]">
                  <RiyalSign />
                  {fmt(b.max)}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
