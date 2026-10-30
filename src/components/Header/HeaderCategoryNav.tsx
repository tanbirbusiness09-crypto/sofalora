import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { useShop } from '../../context/LanguageContext';
import { useCatalog } from '../../context/CatalogContext';
import { useWebsite, cmsImage } from '../../context/WebsiteContext';
import { Link } from '../../context/RouterContext';
import { RiyalSign } from '../UI/RiyalSign';
import { BrandLogo } from '../UI/BrandLogo';
import type { ApiCategory } from '../../lib/api';
import type { Product } from '../../types';

export type NavStyle = 'header' | 'sidebar';
/** Admin setting brandConfig.navigationStyle; defaults to the header menu. */
export const useNavStyle = (): NavStyle => {
  const { brand } = useWebsite();
  return brand?.navigationStyle === 'sidebar' ? 'sidebar' : 'header';
};

const fmt = (n: number) => Math.round(n).toLocaleString('en-US');

interface MenuCat {
  slug: string;
  name: string;
  image: string;
  from?: number;
  count: number;
  line: string;
  products: Product[];
}

const useMenuCats = (): MenuCat[] => {
  const { language } = useShop();
  const { categoryTree, products } = useCatalog();
  const isAr = language === 'ar';
  return useMemo(() => {
    return [...categoryTree]
      .filter((c: ApiCategory) => c.status !== 'inactive')
      .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0))
      .map((c) => {
        const ps = products.filter((p) => p.categorySlug === c.slug && p.inStock !== false);
        const from = ps.length ? Math.min(...ps.map((p) => p.price)) : undefined;
        const count = ps.length;
        const desc = (c.description ?? '').trim();
        const line = !isAr && desc ? desc : isAr ? `${count} تصميم متوفر` : `${count} designs available`;
        return {
          slug: c.slug,
          name: isAr ? c.name_ar || c.name : c.name,
          image: cmsImage(c.menu_image || c.image || ''),
          from,
          count,
          line,
          products: [...ps].sort((a, b) => (Date.parse(b.createdAt ?? '') || 0) - (Date.parse(a.createdAt ?? '') || 0)).slice(0, 4),
        };
      });
  }, [categoryTree, products, isAr]);
};

/** Desktop inline category menu with mega-menu panels (header navigation mode). */
export const HeaderCategoryNav: React.FC = () => {
  const { language } = useShop();
  const isAr = language === 'ar';
  const cats = useMenuCats();
  const [open, setOpen] = useState<string | null>(null);
  const closeT = useRef<number | undefined>(undefined);
  const rootRef = useRef<HTMLDivElement>(null);

  const show = (slug: string) => { window.clearTimeout(closeT.current); setOpen(slug); };
  const hide = () => { window.clearTimeout(closeT.current); closeT.current = window.setTimeout(() => setOpen(null), 140); };

  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);

  const item = 'relative inline-flex h-9 items-center gap-1 rounded-full px-3 text-[13.5px] font-bold text-white/90 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8B25E]';
  const current = cats.find((c) => c.slug === open);

  return (
    <div
      ref={rootRef}
      className="hidden lg:flex items-center"
      onMouseLeave={hide}
      onBlur={(e) => { if (!rootRef.current?.contains(e.relatedTarget as Node)) hide(); }}
    >
      <nav aria-label={isAr ? 'الفئات' : 'Categories'}>
        <ul className="flex items-center gap-0.5">
          {cats.map((c) => (
            <li key={c.slug} onMouseEnter={() => show(c.slug)}>
              <Link
                href={`/shop?category=${c.slug}`}
                className={`${item} ${open === c.slug ? 'bg-white/10 text-white' : ''}`}
                aria-haspopup="true"
                aria-expanded={open === c.slug}
                onFocus={() => show(c.slug)}
                onClick={() => setOpen(null)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    show(c.slug);
                    window.setTimeout(() => rootRef.current?.querySelector<HTMLAnchorElement>('[data-mega] a')?.focus(), 30);
                  }
                }}
              >
                {c.name}
                <ChevronDown className={`h-3.5 w-3.5 opacity-70 transition-transform duration-200 ${open === c.slug ? 'rotate-180' : ''}`} />
                {open === c.slug && <span className="absolute inset-x-3 -bottom-[13px] h-[3px] rounded-full bg-[#D8B25E]" />}
              </Link>
            </li>
          ))}
          <li onMouseEnter={() => setOpen(null)}>
            <Link href="/shop" className={item}>{isAr ? 'تسوق الكل' : 'Shop All'}</Link>
          </li>
        </ul>
      </nav>

      <div
        data-mega
        onMouseEnter={() => window.clearTimeout(closeT.current)}
        className={`absolute inset-x-0 top-full z-50 px-4 pt-2 transition-all duration-200 ease-out lg:px-6 ${current ? 'visible translate-y-0 opacity-100' : 'invisible pointer-events-none -translate-y-1 opacity-0'}`}
      >
        {current && (
          <div role="region" aria-label={current.name} className="mx-auto max-w-[1180px] overflow-hidden rounded-[20px] border border-[#E9E4DA] bg-white text-[#0B2345] shadow-[0_28px_60px_-28px_rgba(7,26,53,0.55)]">
            <div className="grid grid-cols-[300px_1fr]">
              <div className="relative flex flex-col justify-between bg-gradient-to-br from-[#F6F1E8] to-[#EDE5D6] p-6">
                <div>
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-[#B08D4F] rtl:tracking-normal">{isAr ? 'الفئة' : 'Category'}</span>
                  <h3 className="mt-1 text-[24px] font-extrabold leading-tight tracking-[-0.02em]">{current.name}</h3>
                  {current.from !== undefined && (
                    <p className="mt-1 flex items-center gap-1 text-[14px] font-bold text-[#0B2345]" dir="ltr">
                      <span className="font-semibold text-[#6B7280]">{isAr ? 'ابتداءً من' : 'From'}</span> <RiyalSign />{fmt(current.from)}
                    </p>
                  )}
                  <p className="mt-1.5 line-clamp-2 text-[13px] text-[#6B7280]">{current.line}</p>
                </div>
                {current.image && <img src={current.image} alt="" className="sf-mega-img mx-auto my-3 h-[150px] w-full object-contain drop-shadow-[0_14px_18px_rgba(11,35,69,0.22)]" />}
                <Link href={`/shop?category=${current.slug}`} onClick={() => setOpen(null)} className="inline-flex h-10 w-fit items-center gap-1.5 rounded-full bg-[#0B2345] px-5 text-[13px] font-bold text-white transition-colors hover:bg-[#D8B25E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8B25E] focus-visible:ring-offset-2">
                  {isAr ? `عرض كل ${current.name}` : `View all ${current.name}`} <span aria-hidden className="rtl:rotate-180">→</span>
                </Link>
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#0B2345] rtl:tracking-normal">{isAr ? 'الأحدث' : 'Newest in'} {current.name}</p>
                  <span className="text-[12px] text-[#6B7280]">{isAr ? `${current.count} منتج` : `${current.count} products`}</span>
                </div>
                <ul className="grid grid-cols-4 gap-4">
                  {current.products.map((p) => (
                    <li key={p.id}>
                      <Link href={`/product/${p.slug || p.id}`} onClick={() => setOpen(null)} className="group block rounded-[14px] p-1.5 transition-colors hover:bg-[#F7F4EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D4F]">
                        <div className="aspect-square overflow-hidden rounded-[12px] bg-[#EFE9DF]">
                          <img src={p.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                        <p className="mt-2 line-clamp-2 text-[13px] font-bold leading-snug text-[#0B2345]">{p.name[language]}</p>
                        <p className="mt-0.5 flex items-center gap-1 text-[13px] font-extrabold" dir="ltr"><RiyalSign />{fmt(p.price)}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/** Mobile/tablet slide-in drawer with categories (header navigation mode). */
export const HeaderMenuDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { language, setLanguage } = useShop();
  const isAr = language === 'ar';
  const cats = useMenuCats();
  const Chev = isAr ? ChevronLeft : ChevronRight;
  useEffect(() => {
    if (!isOpen) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label={isAr ? 'القائمة' : 'Menu'}>
      <div onClick={onClose} className="sf-fade absolute inset-0 bg-[#071A35]/60 backdrop-blur-[2px]" />
      <div className="sf-drawer absolute inset-y-0 start-0 flex w-[86%] max-w-[360px] flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between bg-[#0B2345] px-4 py-4">
          <Link href="/" onClick={onClose} aria-label="Sofalora"><BrandLogo size="sm" variant="light" /></Link>
          <button type="button" onClick={onClose} aria-label={isAr ? 'إغلاق' : 'Close menu'} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"><X className="h-4 w-4" /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <p className="px-2 pb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#B08D4F] rtl:tracking-normal">{isAr ? 'تسوق حسب الفئة' : 'Shop by category'}</p>
          <ul className="space-y-1.5">
            {cats.map((c) => (
              <li key={c.slug}>
                <Link href={`/shop?category=${c.slug}`} onClick={onClose} className="flex items-center gap-3 rounded-[14px] p-2 transition-colors hover:bg-[#F6F1E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D4F]">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[12px] bg-[#F3EEE5]">
                    {c.image && <img src={c.image} alt="" className="h-11 w-11 object-contain" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-extrabold text-[#0B2345]">{c.name}</span>
                    {c.from !== undefined && <span className="flex items-center gap-1 text-[12px] text-[#6B7280]" dir="ltr">{isAr ? 'ابتداءً من' : 'From'} <RiyalSign />{fmt(c.from)}</span>}
                  </span>
                  <Chev className="h-4 w-4 text-[#9AA0A8]" />
                </Link>
              </li>
            ))}
            <li>
              <Link href="/shop" onClick={onClose} className="flex items-center justify-between rounded-[14px] bg-[#0B2345] px-4 py-3 text-[14px] font-bold text-white">
                {isAr ? 'تسوق الكل' : 'Shop All'} <Chev className="h-4 w-4" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="border-t border-[#EEE] p-3">
          <button type="button" onClick={() => setLanguage(isAr ? 'en' : 'ar')} className="w-full rounded-full border border-[#0B2345] py-2.5 text-[13px] font-bold text-[#0B2345]">
            {isAr ? 'English' : 'العربية'}
          </button>
        </div>
      </div>
    </div>
  );
};
