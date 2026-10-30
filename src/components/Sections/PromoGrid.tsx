import React, { useEffect, useMemo, useState } from 'react';
import { useShop } from '../../context/LanguageContext';
import { useCatalog } from '../../context/CatalogContext';
import { useSectionCms, useWebsite, pickText, cmsImage } from '../../context/WebsiteContext';
import { Link } from '../../context/RouterContext';

/**
 * noon-style promo grid above the hero (home section key `promo_grid`).
 * Admin items carry slot = main | side_top | side_bottom (style "luxury" = navy price card).
 * Main slot items slide as a looping track (3 visible); each side slot crossfades its own items.
 * Section settings intervalMain / intervalTop / intervalBottom (ms). value = background colour.
 */
type Slot = 'main' | 'side_top' | 'side_bottom';
type Def = { t: [string, string]; s: [string, string]; img: string; url: string; bg: string; slot: Slot; style?: 'luxury' };
const DEFAULTS: Def[] = [
  { slot: 'main', t: ['Made for Riyadh Homes', 'صُنع لمنازل الرياض'], s: ['Discover sofas crafted for modern Saudi living', 'اكتشف كنباً مصمماً للحياة السعودية العصرية'], img: '/images/promo-grid/pg1_sofa.webp', url: '/shop?category=sofas', bg: '#F3ECE0' },
  { slot: 'main', t: ['Custom Curtains', 'ستائر حسب الطلب'], s: ['Made to measure for every window', 'تفصيل على مقاس كل نافذة'], img: '/images/promo-grid/pg2_curtains.webp', url: '/shop?category=curtains', bg: '#E9DFCF' },
  { slot: 'main', style: 'luxury', t: ['Luxury Living', 'فخامة العيش'], s: ['LIKE NO OTHER', 'لا مثيل لها'], img: '/images/promo-grid/pg3_night.webp', url: '/shop', bg: '#0B2345' },
  { slot: 'side_top', t: ['Expert Design Consultation', 'استشارة تصميم متخصصة'], s: ['In-store or online', 'في المعرض أو عبر الإنترنت'], img: '/images/promo-grid/pg4a_consult.webp', url: '', bg: '#D8B25E' },
  { slot: 'side_bottom', t: ["Today's Top Deals", 'أفضل عروض اليوم'], s: ['Explore and save', 'تصفّح ووفّر'], img: '/images/promo-grid/pg4b_deals.webp', url: '/shop?onSale=1', bg: '#A9D9CC' },
  { slot: 'main', t: ['Motorized Blinds', 'ستائر رول كهربائية'], s: ['Smart light control', 'تحكّم ذكي بالإضاءة'], img: '/images/promo-grid/pg5_blinds.webp', url: '/shop?category=curtains', bg: '#E6DDD0' },
  { slot: 'main', t: ['New Arrivals', 'وصل حديثاً'], s: ['Fresh designs just in', 'تصاميم جديدة وصلت للتو'], img: '/images/promo-grid/pg6_new.webp', url: '/shop?sort=newest', bg: '#DCE3EA' },
  { slot: 'main', t: ['Majlis Collection', 'مجموعة المجالس'], s: ['Sofas for every gathering', 'كنب لكل لقاء'], img: '/images/promo-grid/pg7_majlis.webp', url: '/shop?category=sofas', bg: '#F1E6D2' },
  { slot: 'side_top', t: ['Visit Our Showroom', 'زوروا معرضنا'], s: ['Riyadh', 'الرياض'], img: '/images/promo-grid/pg8_showroom.webp', url: '/contact', bg: '#E4D6BE' },
  { slot: 'side_bottom', t: ['Under \u20C1 999', 'أقل من 999 \u20C1'], s: ['Shop pieces under 999', 'تسوّق قطعاً بأقل من 999'], img: '/images/promo-grid/pg9_under999.webp', url: '/shop?maxPrice=999', bg: '#F2B8A2' },
];
const LEGACY_SLOTS: Slot[] = ['main', 'main', 'main', 'side_top', 'side_bottom'];

/** Autoplay timer that pauses while hovered, hidden, or when motion is reduced. */
function useTicker(count: number, ms: number, paused: boolean, delay = 0) {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (count < 2 || paused || reduced || ms < 1000) return;
    let iv: number | undefined;
    const tick = () => { if (!document.hidden) setI((x) => x + 1); };
    const to = window.setTimeout(() => { tick(); iv = window.setInterval(tick, ms); }, ms + delay);
    return () => { window.clearTimeout(to); if (iv) window.clearInterval(iv); };
  }, [count, ms, paused, reduced, delay]);
  return [i, setI] as const;
}
function useReducedMotion() {
  const q = '(prefers-reduced-motion: reduce)';
  const [r, setR] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches);
  useEffect(() => { const m = window.matchMedia(q); const f = () => setR(m.matches); m.addEventListener('change', f); return () => m.removeEventListener('change', f); }, []);
  return r;
}
function useIsDesktop() {
  const q = '(min-width: 1024px)';
  const [d, setD] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches);
  useEffect(() => { const m = window.matchMedia(q); const f = () => setD(m.matches); m.addEventListener('change', f); return () => m.removeEventListener('change', f); }, []);
  return d;
}
const EASE = 'cubic-bezier(0.65, 0, 0.35, 1)';

type Card = { title: string; subtitle: string; image: string; href: string; bg: string; external: boolean; slot: Slot; luxury: boolean };

const CardLink: React.FC<{ c: Card; className: string; children: React.ReactNode; hidden?: boolean }> = ({ c, className, children, hidden }) =>
  c.external ? (
    <a href={c.href} target="_blank" rel="noopener noreferrer" className={className} style={{ backgroundColor: c.bg }} tabIndex={hidden ? -1 : undefined} aria-hidden={hidden || undefined}>
      {children}
    </a>
  ) : (
    <Link href={c.href} className={className} style={{ backgroundColor: c.bg }} tabIndex={hidden ? -1 : undefined} aria-hidden={hidden || undefined}>
      {children}
    </Link>
  );

const base = 'group relative block h-full overflow-hidden rounded-[16px] transition-shadow duration-300 hover:shadow-[0_14px_30px_-16px_rgba(11,35,69,0.45)]';
const imgCls = 'absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]';

export const PromoGrid: React.FC = () => {
  const { language, direction } = useShop();
  const { products } = useCatalog();
  const { brand } = useWebsite();
  const cms = useSectionCms('promo_grid');
  const isAr = language === 'ar';

  const wa = `https://wa.me/${((brand as { whatsapp?: string }).whatsapp ?? '').replace(/\D/g, '') || '966559821100'}?text=${encodeURIComponent(
    isAr ? 'مرحباً، أرغب في حجز استشارة تصميم.' : 'Hello Sofalora, I would like to book a design consultation.'
  )}`;

  const sec = cms.section as Record<string, unknown> | undefined;
  const saved = (Array.isArray(sec?.items) ? (sec!.items as Array<Record<string, string | undefined> | null>) : []).filter(Boolean) as Array<Record<string, string | undefined>>;
  const toCard = (it: Record<string, string | undefined>, d: Def | undefined, slot: Slot): Card => {
    const href = (it.url ?? '').trim() || d?.url || wa;
    const v = (it.value ?? '').trim();
    return {
      title: pickText(language, it.title_en, it.title_ar, d ? d.t[isAr ? 1 : 0] : ''),
      subtitle: pickText(language, it.subtitle_en, it.subtitle_ar, d ? d.s[isAr ? 1 : 0] : ''),
      image: cmsImage(it.image, d?.img ?? ''),
      href,
      bg: /^#[0-9a-f]{3,8}$/i.test(v) ? v : d?.bg ?? '#F3ECE0',
      external: /^https?:/i.test(href),
      slot,
      luxury: (it.style ?? d?.style) === 'luxury',
    };
  };
  // Admin items carry `slot`; older saves (no slot) map by index onto the first 5 defaults.
  const cards: Card[] = saved.length
    ? saved.map((it, i) => {
        const slot = (['main', 'side_top', 'side_bottom'].includes(it.slot ?? '') ? it.slot : LEGACY_SLOTS[i] ?? 'main') as Slot;
        return toCard(it, DEFAULTS[i], slot);
      })
    : DEFAULTS.map((d) => toCard({}, d, d.slot));
  const mains = cards.filter((c) => c.slot === 'main');
  const tops = cards.filter((c) => c.slot === 'side_top');
  const bottoms = cards.filter((c) => c.slot === 'side_bottom');
  const num = (k: string, d: number) => { const n = Number(sec?.[k]); return Number.isFinite(n) && n >= 1000 ? n : d; };
  const msMain = num('intervalMain', 4000), msTop = num('intervalTop', 5000), msBottom = num('intervalBottom', 6000);

  const isDesktop = useIsDesktop();
  const [hover, setHover] = useState(false);
  const loop = isDesktop && mains.length > 3;
  const [step, setStep] = useTicker(loop ? mains.length : 0, msMain, hover);
  const [snap, setSnap] = useState(false); // true while jumping back from the clones without a transition
  useEffect(() => { if (!snap) return; const r = requestAnimationFrame(() => setSnap(false)); return () => cancelAnimationFrame(r); }, [snap]);
  const [topI] = useTicker(tops.length, msTop, hover, 900);
  const [botI] = useTicker(bottoms.length, msBottom, hover, 2100);

  // Real lowest selling price from the catalog; hidden when there are no products.
  const minPrice = useMemo(() => {
    const prices = products.map((p) => p.price).filter((n) => Number.isFinite(n) && n > 0);
    return prices.length ? Math.min(...prices) : null;
  }, [products]);

  const heading = 'text-[20px] lg:text-[clamp(18px,1.6vw,24px)] font-extrabold leading-[1.15] text-[#0B2345]';
  const sub = 'mt-1.5 text-[13px] font-medium leading-snug text-[#0B2345]/75';

  const tall = (c: Card, hidden?: boolean) => (
    <CardLink c={c} className={base} hidden={hidden}>
      <img src={c.image} alt="" loading="eager" decoding="async" className={imgCls} />
      <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-[var(--pg-bg)] via-[var(--pg-bg)]/70 to-transparent" style={{ ['--pg-bg' as string]: c.bg }} />
      <div className="relative p-4 lg:p-5">
        <h3 className={heading}>{c.title}</h3>
        <p className={`${sub} max-w-[220px]`}>{c.subtitle}</p>
      </div>
    </CardLink>
  );

  const luxury = (c: Card, hidden?: boolean) => (
    <CardLink c={c} className={base} hidden={hidden}>
      <img src={c.image} alt="" loading="eager" decoding="async" className={`${imgCls} object-bottom`} />
      <div className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-[#0B2345] via-[#0B2345]/85 to-transparent" />
      <div className="relative flex flex-col items-center px-4 pt-5 text-center lg:pt-6">
        <h3 className="font-display-serif text-[30px] italic leading-none text-[#D9BE8C] lg:text-[clamp(26px,2.3vw,36px)]">{c.title}</h3>
        <p className="mt-1.5 font-display-serif text-[15px] tracking-[0.18em] text-[#E8DCC6] rtl:tracking-normal">{c.subtitle}</p>
        {minPrice !== null && (
          <div className="mt-3 w-[78%] max-w-[210px]">
            <div className="flex items-center gap-2 text-[9.5px] font-semibold tracking-[0.22em] text-[#C9A96E] rtl:tracking-normal">
              <span className="h-px flex-1 bg-[#C9A96E]/50" />
              {isAr ? 'ابتداءً من' : 'STARTING FROM'}
              <span className="h-px flex-1 bg-[#C9A96E]/50" />
            </div>
            <div dir="ltr" className="mt-1.5 border border-[#C9A96E]/70 px-3 py-1.5 text-[22px] font-semibold leading-none text-[#F4EBDB]">
              {'\u20C1'} {minPrice.toLocaleString('en-US')}
            </div>
          </div>
        )}
        <span className="mt-3 text-[13px] font-bold tracking-[0.3em] text-[#E8DCC6] rtl:tracking-normal">SOFALORA</span>
      </div>
    </CardLink>
  );
  const mainCard = (c: Card, hidden?: boolean) => (c.luxury ? luxury(c, hidden) : tall(c, hidden));
  const topCard = (c: Card, hidden?: boolean) => (
    <CardLink c={c} className={base} hidden={hidden}>
      <img src={c.image} alt="" loading="eager" decoding="async" className={`${imgCls} object-right`} />
      <div className="absolute inset-y-0 start-0 w-[70%] bg-gradient-to-r rtl:bg-gradient-to-l from-[var(--pg-bg)] via-[var(--pg-bg)]/80 to-transparent" style={{ ['--pg-bg' as string]: c.bg }} />
      <div className="relative flex h-full flex-col justify-center p-4 lg:px-5">
        <h3 className="max-w-[60%] text-[17px] lg:text-[clamp(15px,1.35vw,20px)] font-extrabold leading-[1.15] text-[#0B2345]">{c.title}</h3>
        <p className="mt-1 text-[12.5px] font-semibold text-[#0B2345]/80">{c.subtitle} <span aria-hidden className="inline-block rtl:rotate-180">→</span></p>
      </div>
    </CardLink>
  );
  const bottomCard = (c: Card, hidden?: boolean) => (
    <CardLink c={c} className={base} hidden={hidden}>
      <img src={c.image} alt="" loading="eager" decoding="async" className={imgCls} />
      <div className="absolute inset-y-0 start-0 w-[55%] bg-gradient-to-r rtl:bg-gradient-to-l from-[var(--pg-bg)]/90 to-transparent" style={{ ['--pg-bg' as string]: c.bg }} />
      <div className="relative p-4 lg:p-5">
        <h3 className={heading}>{c.title}</h3>
        <p className={sub}>{c.subtitle}</p>
      </div>
    </CardLink>
  );
  // Stacked layers: the active one slides up into place while the previous fades out.
  const rotator = (list: Card[], i: number, render: (c: Card, hidden?: boolean) => React.ReactNode) => {
    const active = list.length ? i % list.length : 0;
    return (
      <div className="relative h-full">
        {list.map((c, k) => (
          <div
            key={k}
            className="absolute inset-0"
            style={{
              opacity: k === active ? 1 : 0,
              transform: k === active ? 'translateY(0)' : 'translateY(10px)',
              transition: `opacity 700ms ${EASE}, transform 700ms ${EASE}`,
              zIndex: k === active ? 1 : 0,
              pointerEvents: k === active ? 'auto' : 'none',
            }}
          >
            {render(c, k !== active)}
          </div>
        ))}
      </div>
    );
  };

  // Main track: mains + 3 clones; after sliding onto the clones it jumps back to 0 invisibly.
  const n = mains.length;
  const pos = loop ? step % (n + 1) : 0;
  const track = loop ? [...mains, ...mains.slice(0, 3)] : mains;
  const sign = direction === 'rtl' ? 1 : -1;
  const onEnd = () => { if (loop && pos === n) { setSnap(true); setStep(0); } };

  const side = (
    <div className="flex h-[320px] w-[80%] shrink-0 snap-start flex-col gap-3 sm:w-[52%] lg:h-auto lg:w-auto">
      <div className="h-[36%] shrink-0">{rotator(tops, topI, topCard)}</div>
      <div className="min-h-0 flex-1">{rotator(bottoms, botI, bottomCard)}</div>
    </div>
  );

  return (
    <section aria-label={isAr ? 'عروض مميزة' : 'Featured promotions'} dir={direction} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onFocus={() => setHover(true)} onBlur={() => setHover(false)}>
      {isDesktop ? (
        <div className="grid h-[340px] grid-cols-[1fr_1fr_1fr_1.55fr] gap-3">
          <div className="col-span-3 overflow-hidden rounded-[16px]">
            <div
              className="flex h-full gap-3"
              onTransitionEnd={(e) => { if (e.target === e.currentTarget) onEnd(); }}
              style={{
                transform: `translateX(calc(${sign * pos} * (100% + 12px) / 3))`,
                transition: snap || !loop ? 'none' : `transform 800ms ${EASE}`,
              }}
            >
              {track.map((c, k) => (
                <div key={k} className="h-full w-[calc((100%-24px)/3)] shrink-0">{mainCard(c, k >= pos + 3 || k < pos)}</div>
              ))}
            </div>
          </div>
          {side}
        </div>
      ) : (
        <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto">
          {mains.map((c, k) => (
            <div key={k} className="h-[320px] w-[72%] shrink-0 snap-start sm:w-[44%]">{mainCard(c)}</div>
          ))}
          {side}
        </div>
      )}
    </section>
  );
};
