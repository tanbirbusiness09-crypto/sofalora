import React, { useEffect, useRef, useState } from 'react';
import { Check, Heart, Plus, Star } from 'lucide-react';
import { Product } from '../../types';
import { useShop } from '../../context/LanguageContext';
import { Link } from '../../context/RouterContext';
import { RiyalSign } from './RiyalSign';

const fmt = (n: number) => Math.round(n).toLocaleString('en-US');

/** Shared noon-style product card: real stock, real reviews only, motion respects reduced-motion (index.css). */
export const NoonProductCard: React.FC<{ product: Product; index?: number; showCategory?: boolean; priorityImage?: boolean }> = ({
  product: p,
  index = 0,
  showCategory = false,
  priorityImage = false,
}) => {
  const { language, addToCart, wishlist, toggleWishlist } = useShop();
  const isAr = language === 'ar';
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [added, setAdded] = useState(false);
  const [pop, setPop] = useState(0);
  const wished = wishlist.includes(p.id);
  const href = `/product/${p.slug || p.id}`;

  const orig = p.oldPrice && p.oldPrice > p.price ? p.oldPrice : undefined;
  const pct = orig ? Math.round((1 - p.price / orig) * 100) : 0;
  const stock = typeof p.stock === 'number' ? p.stock : undefined;
  const out = p.inStock === false || (stock !== undefined && stock <= 0);
  const low = !out && stock !== undefined && stock <= 5;
  const reviewCount = p.reviewCount || p.reviews || 0;

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return setShown(true);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { rootMargin: '0px 0px -40px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onAdd = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (out || added) return;
    addToCart(p);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };
  const onWish = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setPop((n) => n + 1);
    toggleWishlist(p.id);
  };

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${(index % 6) * 70}ms` }}
      className={`sf-ncard group relative flex h-full flex-col rounded-[14px] border border-[#ECEEF2] bg-white p-2 ${shown ? 'sf-ncard-in' : 'sf-ncard-pre'}`}
    >
      <div className="relative aspect-square overflow-hidden rounded-[10px] bg-[#EFE9DF] [isolation:isolate]">
        <Link href={href} className="absolute inset-0 block rounded-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0B2345]" aria-label={p.name[language]}>
          <img
            src={p.image}
            alt={p.name[language]}
            loading={priorityImage ? 'eager' : 'lazy'}
            decoding="async"
            className="sf-ncard-img absolute inset-0 h-full w-full object-cover object-center"
          />
        </Link>
        {orig ? (
          <span className="absolute start-[10px] top-[10px] z-[2] inline-flex h-[22px] items-center rounded-full px-2.5 text-[11px] font-bold uppercase leading-none tracking-[0.08em] shadow-[0_1px_4px_rgba(0,0,0,0.18)] rtl:tracking-normal bg-[#C8102E] text-white">-{pct}%</span>
        ) : p.isNew ? (
          <span className="absolute start-[10px] top-[10px] z-[2] inline-flex h-[22px] items-center rounded-full px-2.5 text-[11px] font-bold uppercase leading-none tracking-[0.08em] shadow-[0_1px_4px_rgba(0,0,0,0.18)] rtl:tracking-normal bg-[#0B2345] text-[#D8B25E]">{isAr ? 'جديد' : 'New'}</span>
        ) : null}
        <button
          type="button"
          onClick={onWish}
          aria-label={wished ? (isAr ? 'إزالة من المفضلة' : 'Remove from wishlist') : (isAr ? 'أضف إلى المفضلة' : 'Add to wishlist')}
          title={wished ? (isAr ? 'إزالة من المفضلة' : 'Remove from wishlist') : (isAr ? 'أضف إلى المفضلة' : 'Add to wishlist')}
          aria-pressed={wished}
          className={`sf-nbtn absolute z-[2] flex h-9 w-9 items-center justify-center rounded-full border border-[#0B2345]/10 shadow-[0_2px_8px_rgba(11,35,69,0.16)] backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2345] focus-visible:ring-offset-2 end-[10px] top-[10px] ${wished ? 'bg-white text-[#E0263E]' : 'bg-white/90 text-[#0B2345] hover:text-[#E0263E]'}`}
        >
          <Heart key={pop} className={`h-[18px] w-[18px] translate-y-[0.5px] ${pop ? 'sf-heart-pop' : ''} ${wished ? 'fill-[#E0263E] text-[#E0263E]' : ''}`} strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={onAdd}
          disabled={out}
          aria-label={out ? (isAr ? 'غير متوفر' : 'Out of stock') : added ? (isAr ? 'تمت الإضافة' : 'Added to cart') : (isAr ? 'أضف إلى السلة' : 'Add to cart')}
          title={isAr ? 'أضف إلى السلة' : 'Add to cart'}
          className={`sf-nbtn absolute z-[2] flex h-9 w-9 items-center justify-center rounded-full border border-[#0B2345]/10 shadow-[0_2px_8px_rgba(11,35,69,0.16)] backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2345] focus-visible:ring-offset-2 sf-nplus bottom-[10px] end-[10px] disabled:cursor-not-allowed disabled:opacity-50 ${added ? 'bg-[#1E9E5A] text-white border-transparent' : 'bg-white/90 text-[#0B2345]'}`}
        >
          {added ? <Check key="c" className="sf-add-pop h-[18px] w-[18px]" strokeWidth={2} /> : <Plus key="p" className="h-[18px] w-[18px]" strokeWidth={2} />}
        </button>
      </div>

      <div className="flex flex-1 flex-col px-1 pb-1 pt-2.5">
        {showCategory && <span className="mb-0.5 truncate text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#8A7350] rtl:tracking-normal">{p.category[language]}</span>}
        <Link href={href} className="line-clamp-2 min-h-[2.7em] text-[14.5px] font-bold leading-[1.35] text-[#0B2345] hover:text-[#12305C]">
          {p.name[language]}
        </Link>
        {reviewCount > 0 && p.rating > 0 ? (
          <p className="mt-1 flex items-center gap-1 text-[12px] text-[#4B5563]">
            <span className="inline-flex items-center gap-0.5 rounded-[4px] bg-[#38AE04] px-1 py-px text-[11px] font-bold text-white">
              {p.rating.toFixed(1)}<Star className="h-2.5 w-2.5 fill-white" />
            </span>
            <span>({reviewCount})</span>
          </p>
        ) : (
          <p className="mt-1 text-[11.5px] text-[#9AA0A8]">{isAr ? 'لا توجد تقييمات بعد' : 'No reviews yet'}</p>
        )}
        <div dir="ltr" className={`mt-1.5 flex flex-wrap items-baseline gap-x-1.5 ${isAr ? 'justify-end' : ''}`}>
          <span className="flex items-center gap-1 text-[18px] font-extrabold leading-none text-[#0B2345]"><RiyalSign />{fmt(p.price)}</span>
          {orig && <span className="text-[12px] text-[#7B8088] line-through">{fmt(orig)}</span>}
          {orig && <span className="text-[12px] font-bold text-[#38AE04]">{pct}% {isAr ? 'خصم' : 'OFF'}</span>}
        </div>
        <p className={`mt-auto flex items-center gap-1.5 pt-2 text-[12px] font-semibold ${out ? 'text-[#8A9099]' : low ? 'text-[#B76E00]' : 'text-[#1E8E4F]'}`}>
          {out ? (
            <span className="h-2 w-2 rounded-full bg-[#B5BAC2]" />
          ) : low ? (
            <span className="h-2 w-2 rounded-full bg-[#F2A900]" />
          ) : (
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#1E9E5A]"><Check className="h-2.5 w-2.5 text-white" strokeWidth={3.5} /></span>
          )}
          {out ? (isAr ? 'نفدت الكمية' : 'Out of stock') : low ? (isAr ? `متبقي ${stock} فقط` : `Only ${stock} left`) : isAr ? 'متوفر' : 'In stock'}
        </p>
      </div>
    </div>
  );
};
