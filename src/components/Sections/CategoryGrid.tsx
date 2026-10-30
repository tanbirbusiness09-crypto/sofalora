import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useShop } from '../../context/LanguageContext';
import { Link } from '../../context/RouterContext';
import { useCatalog } from '../../context/CatalogContext';
import { useSectionCms, useWebsite, pickText, cmsImage } from '../../context/WebsiteContext';

interface Tile {
  slug: string;
  href: string;
  eyebrow: { en: string; ar: string };
  title: { en: string; ar: string };
  cta?: { en: string; ar: string };
  body?: { en: string; ar: string };
  image: string;
  /** pageBanners key that can override this tile (admin cards). */
  cardKey?: string;
}

const TILES: Tile[] = [
  {
    slug: 'sofas',
    href: '/category/sofas',
    eyebrow: { en: 'Sofas', ar: 'الكنب' },
    title: { en: 'Where Comfort Meets Character', ar: 'حيث تلتقي الراحة بالشخصية' },
    image: '/images/home/cat-sofas.webp',
  },
  {
    slug: 'curtains',
    href: '/category/curtains',
    eyebrow: { en: 'Curtains', ar: 'الستائر' },
    title: { en: 'Beautiful Light, Better Living', ar: 'ضوء جميل، حياة أفضل' },
    cta: { en: 'Shop Curtains', ar: 'تسوق الستائر' },
    image: '/images/home/cat-curtains.webp',
    cardKey: 'hero_card_curtains',
  },
  {
    slug: 'custom-curtains',
    href: '/category/custom-curtains',
    eyebrow: { en: 'Custom Atelier', ar: 'الأتيليه' },
    title: { en: 'Made for Your Home', ar: 'مصمم لمنزلك' },
    body: { en: 'Bespoke sofas, curtains and complete interior solutions.', ar: 'كنب وستائر مفصلة وحلول داخلية متكاملة.' },
    cta: { en: 'Start Your Custom Design', ar: 'ابدأ تصميمك الخاص' },
    image: '/images/home/cat-atelier.webp',
  },
  {
    slug: 'armchairs',
    href: '/category/armchairs',
    eyebrow: { en: 'Armchairs', ar: 'الكراسي' },
    title: { en: 'Statement Pieces', ar: 'قطع مميزة' },
    image: '/images/home/cat-armchairs.webp',
  },
  {
    slug: 'sectional-sofas',
    href: '/category/sectional-sofas',
    eyebrow: { en: 'Sectionals', ar: 'الكنب المقسم' },
    title: { en: 'For Every Gathering', ar: 'لكل تجمع' },
    image: '/images/home/cat-sectionals.webp',
    cardKey: 'hero_card_majlis',
  },
];

/**
 * Asymmetric editorial category grid (home section key `category_grid`).
 * Admin section items 0-4 override tile title/subtitle/image/url in order.
 */
export const CategoryGrid: React.FC = () => {
  const { language, direction } = useShop();
  const cms = useSectionCms('category_grid');
  const { card } = useWebsite();
  const { categoryTree } = useCatalog();
  const isAr = language === 'ar';
  const Arrow = direction === 'rtl' ? ArrowLeft : ArrowRight;

  const tiles = TILES.map((tile, i) => {
    const it = cms.item(i);
    const c = tile.cardKey ? card(tile.cardKey) ?? {} : {};
    const apiCat = categoryTree.find((x) => x.slug === tile.slug);
    return {
      ...tile,
      eyebrowText: pickText(language, it.subtitle_en, it.subtitle_ar, apiCat ? (isAr ? apiCat.name_ar || apiCat.name : apiCat.name) : tile.eyebrow[language]),
      titleText: pickText(language, it.title_en, it.title_ar, tile.title[language]),
      href: (it.url ?? '').trim() || tile.href,
      img: cmsImage(it.image, cmsImage((c as { image?: string }).image, cmsImage(apiCat?.image ?? '', tile.image))),
    };
  });

  const [sofas, curtains, atelier, armchairs, sectionals] = tiles;

  const ImageTile: React.FC<{ t: typeof tiles[number]; big?: boolean; className?: string }> = ({ t, big, className = '' }) => (
    <Link
      href={t.href}
      className={`group relative block min-h-0 overflow-hidden rounded-[8px] bg-[#EFE8DC] ${className}`}
      aria-label={`${t.eyebrowText} — ${t.titleText}`}
    >
      <div className="absolute inset-0 rtl:-scale-x-100">
        <img
          src={t.img}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-right transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
        />
      </div>
      <div className={`absolute inset-0 ${big ? 'bg-gradient-to-r rtl:bg-gradient-to-l from-black/30 via-transparent to-transparent' : 'bg-gradient-to-r rtl:bg-gradient-to-l from-[#F6F1E8]/85 via-[#F6F1E8]/35 via-40% to-transparent to-65%'}`} />
      <div className={`relative flex h-full flex-col ${big ? 'p-6 lg:p-[6%] text-white' : 'p-4 lg:px-[6%] lg:py-[5%] text-[#0B2345]'}`}>
        <span className={`sf-eyebrow ${big ? 'text-white/90 !text-[11px] !tracking-[0.3em]' : 'text-[#6E5A3C] !text-[9.5px]'}`}>{t.eyebrowText}</span>
        <h3 className={`font-serif-luxury !font-bold mt-1.5 leading-[1.05] ${big ? 'text-[30px] lg:text-[clamp(26px,2.4vw,42px)] max-w-[310px]' : 'text-[20px] lg:text-[clamp(17px,1.45vw,26px)] max-w-[140px]'}`}>
          {t.titleText}
        </h3>
        {t.cta && !big && (
          <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold underline underline-offset-4 decoration-[#0B2345]/30 group-hover:decoration-[#0B2345]">
            {t.cta[language]} <Arrow className="h-3 w-3" />
          </span>
        )}
        <span
          className={`mt-auto shrink-0 self-start sf-round-btn ${big ? 'h-10 w-10 bg-white text-[#0B2345]' : 'h-7 w-7 bg-white text-[#0B2345] shadow-sm'} group-hover:bg-[#0B2345] group-hover:text-white`}
          aria-hidden
        >
          <Arrow className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );

  return (
    <section id="categories" aria-label={isAr ? 'تسوق حسب الفئة' : 'Shop by category'} className="px-3 mt-3">
      <div className="grid grid-cols-1 lg:grid-cols-[45%_1fr] lg:grid-rows-[minmax(0,1fr)] gap-3 lg:h-[clamp(230px,17.8vw,400px)]">
        <ImageTile t={sofas} big className="h-[300px] sm:h-[360px] lg:h-auto" />
        <div className="grid grid-cols-2 grid-rows-[minmax(0,1fr)_minmax(0,1fr)] gap-3 h-[400px] sm:h-[420px] lg:h-auto min-h-0">
          <ImageTile t={curtains} />
          <Link href={atelier.href} className="group relative block overflow-hidden rounded-[8px] bg-[#0B2345] text-white">
            <div className="absolute inset-0 rtl:-scale-x-100">
              <img src={atelier.img} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover object-right transition-transform duration-[1200ms] group-hover:scale-[1.05]" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-[#0B2345] from-25% via-[#0B2345]/80 via-50% to-transparent" />
            <div className="relative flex h-full flex-col p-4 lg:px-[6%] lg:py-[5%]">
              <span className="sf-eyebrow !text-[9.5px] text-[#D9C29A]">{atelier.eyebrowText}</span>
              <h3 className="font-serif-luxury !font-bold mt-1.5 text-[20px] lg:text-[clamp(17px,1.45vw,26px)] leading-[1.05] max-w-[160px]">{atelier.titleText}</h3>
              {atelier.body && <p className="mt-1.5 hidden sm:block text-[10.5px] leading-snug text-white/75 max-w-[180px]">{atelier.body[language]}</p>}
              {atelier.cta && (
                <span className="mt-auto inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/90 group-hover:text-[#D9C29A] transition-colors">
                  {atelier.cta[language]} <Arrow className="h-3 w-3" />
                </span>
              )}
            </div>
          </Link>
          <ImageTile t={armchairs} />
          <ImageTile t={sectionals} />
        </div>
      </div>
    </section>
  );
};
