import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/LanguageContext';
import { Link } from '../../context/RouterContext';
import { useCatalog } from '../../context/CatalogContext';
import { useSectionCms, cmsImage } from '../../context/WebsiteContext';

type Bi = { en: string; ar: string };
interface Tile { slug: string; label: Bi; image: string }
interface Row { slug: string; title: Bi; tiles: Tile[] }


/** Site images used when a category has no image in the admin. */
const CAT_SLUGS = ['sofas', 'sectional-sofas', 'majlis-sofas', 'sofa-beds', 'armchairs', 'curtains', 'blackout-curtains', 'sheer-curtains', 'custom-curtains', 'blinds'];
/** Studio-style tile images on the beige tile background (public/images/categories). */
const IMAGES: Record<string, string> = Object.fromEntries(CAT_SLUGS.map((s) => [s, `/images/categories/${s}.webp`]));
const FALLBACK_IMG = '/images/home/hero-riyadh-living.webp';

/** Built-in structure (site navigation) used when the admin API has no matching categories. */
const FALLBACK_ROWS: Row[] = [
  {
    slug: 'sofas',
    title: { en: 'Sofas', ar: 'الكنب' },
    tiles: [
      { slug: 'sofas', label: { en: 'All Sofas', ar: 'كل الكنب' }, image: '' },
      { slug: 'sectional-sofas', label: { en: 'Corner & Sectional', ar: 'كنب زاوية ومقسم' }, image: '' },
      { slug: 'majlis-sofas', label: { en: 'Majlis Sofas', ar: 'كنب المجالس' }, image: '' },
      { slug: 'sofa-beds', label: { en: 'Sofa Beds', ar: 'كنب سرير' }, image: '' },
      { slug: 'armchairs', label: { en: 'Armchairs', ar: 'الكراسي' }, image: '' },
    ],
  },
  {
    slug: 'curtains',
    title: { en: 'Curtains & Blinds', ar: 'الستائر والبلايند' },
    tiles: [
      { slug: 'curtains', label: { en: 'All Curtains', ar: 'كل الستائر' }, image: '' },
      { slug: 'blackout-curtains', label: { en: 'Blackout', ar: 'ستائر معتمة' }, image: '' },
      { slug: 'sheer-curtains', label: { en: 'Sheer', ar: 'ستائر شفافة' }, image: '' },
      { slug: 'custom-curtains', label: { en: 'Custom Made', ar: 'حسب الطلب' }, image: '' },
      { slug: 'blinds', label: { en: 'Blinds', ar: 'البلايند' }, image: '' },
    ],
  },
];

/**
 * noon-style category rows (home section key `category_rows`): one row per
 * top-level category, tiles = its sub-categories. Admin API categories (with
 * their images) win; the site navigation structure fills the gaps.
 * Admin section items i override row i's title (title_en/title_ar) and VIEW ALL url.
 */
export const CategoryRows: React.FC = () => {
  const { language, direction } = useShop();
  const { categoryTree } = useCatalog();
  const cms = useSectionCms('category_rows');
  const isAr = language === 'ar';

  const apiBySlug = new Map(categoryTree.map((c) => [c.slug, c]));
  const rows: Row[] = FALLBACK_ROWS.map((row) => {
    const api = apiBySlug.get(row.slug);
    if (!api) return row;
    const apiTiles: Tile[] = (api.children ?? []).map((c) => ({
      slug: c.slug,
      label: { en: c.name, ar: c.name_ar || c.name },
      image: c.image ?? '',
    }));
    const known = new Set(apiTiles.map((t) => t.slug));
    const tiles = apiTiles.length ? [...apiTiles, ...row.tiles.filter((t) => !known.has(t.slug) && t.slug !== row.slug)] : row.tiles;
    return {
      slug: row.slug,
      title: row.title,
      tiles: tiles.map((t) => (t.slug === row.slug && api.image ? { ...t, image: api.image } : t)),
    };
  });
  // Extra top-level API categories that have sub-categories get their own row.
  for (const c of categoryTree) {
    if (FALLBACK_ROWS.some((r) => r.slug === c.slug) || !(c.children ?? []).length) continue;
    rows.push({
      slug: c.slug,
      title: { en: c.name, ar: c.name_ar || c.name },
      tiles: (c.children ?? []).map((ch) => ({ slug: ch.slug, label: { en: ch.name, ar: ch.name_ar || ch.name }, image: ch.image ?? '' })),
    });
  }

  // One single line combining every row's tiles (deduplicated).
  const seen = new Set<string>();
  const tiles = rows.flatMap((r) => r.tiles).filter((t) => (seen.has(t.slug) ? false : (seen.add(t.slug), true)));
  const title = cms.title(isAr ? 'تسوق حسب الفئة' : 'Shop by Category');
  const viewAll = '/shop';
  const track = useRef<HTMLUListElement>(null);
  const [paused, setPaused] = useState(false);
  const loop = tiles.length > 7;

  // Slow continuous marquee: the list is rendered twice and wraps seamlessly.
  useEffect(() => {
    const el = track.current;
    if (!el || !loop || paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const sign = direction === 'rtl' ? -1 : 1;
    let raf = 0;
    let last = performance.now();
    let pos = Math.abs(el.scrollLeft);
    const speed = 22; // px per second
    const step = (now: number) => {
      const half = el.scrollWidth / 2;
      pos += (speed * (now - last)) / 1000;
      last = now;
      if (pos >= half) pos -= half;
      el.scrollLeft = sign * pos;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [loop, paused, direction, tiles.length]);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    let pos = Math.abs(el.scrollLeft) + dir * 133 * 3;
    if (loop) pos = ((pos % half) + half) % half;
    el.scrollTo({ left: (direction === 'rtl' ? -1 : 1) * pos, behavior: 'smooth' });
  };
  const Prev = direction === 'rtl' ? ChevronRight : ChevronLeft;
  const Next = direction === 'rtl' ? ChevronLeft : ChevronRight;
  const shown = loop ? [...tiles, ...tiles] : tiles;

  return (
    <section aria-label={title} className="pt-3 pb-3 pe-3 max-lg:ps-3" dir={direction}>
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <h2 className="truncate text-[18px] sm:text-[20px] font-bold leading-tight text-[#0B2345]">{title}</h2>
          <Link
            href={viewAll}
            className="group inline-flex shrink-0 items-center gap-1 rounded-full border border-[#0B2345]/80 px-3 py-[5px] text-[12px] font-semibold leading-none text-[#0B2345] transition-colors duration-200 hover:bg-[#0B2345] hover:text-white"
          >
            {isAr ? 'عرض الكل' : 'View all'}
            <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
          </Link>
        </div>
        {loop && (
          <div className="flex shrink-0 items-center gap-2">
            <button type="button" onClick={() => scroll(-1)} aria-label={isAr ? 'السابق' : 'Previous'} className="sf-round-btn h-8 w-8 border border-[#DCD5C8] bg-white text-[#0B2345] hover:border-[#0B2345]">
              <Prev className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label={isAr ? 'التالي' : 'Next'} className="sf-round-btn h-8 w-8 bg-[#0B2345] text-white hover:bg-[#12305C]">
              <Next className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
      <div className="sf-row-mask overflow-hidden">
      <ul
        ref={track}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setTimeout(() => setPaused(false), 2500)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="no-scrollbar flex gap-3 overflow-x-auto px-2"
      >
        {shown.map((t, i) => (
          <li key={`${t.slug}-${i}`} className="w-[104px] shrink-0 sm:w-[112px] lg:w-[121px]" aria-hidden={i >= tiles.length || undefined}>
            <Link href={`/category/${t.slug}`} className="group block" tabIndex={i >= tiles.length ? -1 : undefined}>
              <div className="aspect-square overflow-hidden rounded-[14px] bg-[#F3EEE6]">
                <img
                  src={cmsImage(t.image, IMAGES[t.slug] ?? FALLBACK_IMG)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
              </div>
              <p className="mt-1.5 truncate text-center text-[13px] font-semibold leading-tight text-[#0B2345] transition-colors group-hover:text-[#8A7350]">
                {t.label[language]}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      </div>
    </section>
  );
};
