import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useShop } from '../../context/LanguageContext';
import { Link } from '../../context/RouterContext';
import { useSectionCms, pickText, cmsImage } from '../../context/WebsiteContext';
import { PremiumHeader } from './PremiumHeader';

type Item = { image?: string; title_en?: string; title_ar?: string; subtitle_en?: string; subtitle_ar?: string; url?: string };

const DEFAULTS: Item[] = [
  { title_en: 'Navy velvet modular', title_ar: 'كنب مودولار مخملي كحلي', subtitle_en: 'With an ivory zebra blind', subtitle_ar: 'مع بلايند زيبرا عاجي', url: '/shop?category=sofas' },
  { title_en: 'Velvet & leather', title_ar: 'مخمل وجلد', subtitle_en: 'Emerald drapes, rope tiebacks', subtitle_ar: 'ستائر زمردية وربطات حبل', url: '/shop?category=curtains' },
  { title_en: 'A sunny reading nook', title_ar: 'ركن قراءة مشمس', subtitle_en: 'Linen roman blind', subtitle_ar: 'بلايند روماني كتان', url: '/shop?category=blinds' },
  { title_en: 'Layered windows', title_ar: 'نوافذ بطبقتين', subtitle_en: 'Sheer and linen drapes', subtitle_ar: 'ستائر شفافة وكتان', url: '/shop?category=curtains' },
  { title_en: 'Warm minimal living', title_ar: 'معيشة دافئة وبسيطة', subtitle_en: 'Linen three-seater', subtitle_ar: 'كنبة ثلاثية كتان', url: '/shop?category=sofas' },
];

export const InspirationGallery: React.FC = () => {
  const { language, direction, t } = useShop();
  const cms = useSectionCms();
  const isAr = language === 'ar';
  const [open, setOpen] = useState<number | null>(null);
  const saved = Array.isArray(cms.section?.items) ? (cms.section!.items as Item[]).filter((i) => i && (i.image || i.title_en)) : [];
  const items = (saved.length ? saved : DEFAULTS).slice(0, 5);
  const sel = open !== null ? items[open] : null;

  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open]);

  return (
    <section dir={direction} aria-label={cms.title(t('inspirationTitle'))}>
      <PremiumHeader
        eyebrow={isAr ? 'أفكار للتنسيق' : 'Style ideas'}
        title={cms.title(t('inspirationTitle'))}
        subtitle={cms.subtitle(isAr ? 'إطلالات مستوحاة من تشكيلتنا من الكنب والستائر والبلايندز' : 'Looks inspired by our sofas, curtains and blinds')}
        href="/shop"
        viewAll={isAr ? 'تسوق التشكيلة' : 'Shop the collection'}
      />
      <ul className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-3 pt-1 md:mx-0 md:grid md:h-[520px] md:grid-cols-4 md:grid-rows-2 md:overflow-visible md:px-0">
        {items.map((it, i) => {
          const title = pickText(language, it.title_en, it.title_ar, '');
          const sub = pickText(language, it.subtitle_en, it.subtitle_ar, '');
          const big = i === 0;
          return (
            <li key={i} className={`w-[78%] shrink-0 snap-start md:w-auto ${big ? 'md:col-span-2 md:row-span-2' : ''}`}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={title}
                className="sf-prem-card group relative block aspect-square h-full w-full overflow-hidden rounded-[18px] bg-[#E9E2D6] text-start md:aspect-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D4F] focus-visible:ring-offset-2"
              >
                <img src={cmsImage(it.image, '')} alt="" loading="lazy" decoding="async" className="sf-prem-img absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A35]/85 via-[#071A35]/10 via-50% to-transparent" />
                <div className={`absolute inset-x-0 bottom-0 ${big ? 'p-6' : 'p-4'}`}>
                  {sub && <span className="block text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#E2C68C] rtl:tracking-normal">{sub}</span>}
                  <h3 className={`mt-1 font-extrabold leading-tight tracking-[-0.01em] text-white ${big ? 'text-[26px]' : 'text-[16px]'}`}>{title}</h3>
                  {big && <span className="mt-3 inline-flex h-9 items-center rounded-full bg-white px-4 text-[12.5px] font-semibold text-[#0B2345] transition-colors group-hover:bg-[#D8B25E] group-hover:text-white">{isAr ? 'شاهد الإطلالة' : 'View the look'}</span>}
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {sel && createPortal(
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={pickText(language, sel.title_en, sel.title_ar, '')} dir={direction}>
          <div className="sf-fade absolute inset-0 bg-[#071A35]/70 backdrop-blur-sm" onClick={() => setOpen(null)} />
          <div className="sf-pop relative w-full max-w-3xl overflow-hidden rounded-[20px] bg-white shadow-2xl">
            <button type="button" onClick={() => setOpen(null)} aria-label={isAr ? 'إغلاق' : 'Close'} className="absolute end-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#0B2345] shadow">
              <X className="h-4 w-4" />
            </button>
            <img src={cmsImage(sel.image, '')} alt="" className="aspect-[16/10] w-full object-cover" />
            <div className="flex flex-wrap items-center justify-between gap-4 p-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B08D4F] rtl:tracking-normal">{pickText(language, sel.subtitle_en, sel.subtitle_ar, '')}</span>
                <h3 className="mt-1 text-[22px] font-extrabold tracking-[-0.01em] text-[#0B2345]">{pickText(language, sel.title_en, sel.title_ar, '')}</h3>
              </div>
              <Link href={(sel.url ?? '').trim() || '/shop'} onClick={() => setOpen(null)} className="inline-flex h-10 items-center rounded-full bg-[#0B2345] px-5 text-[13px] font-semibold text-white hover:bg-[#12305C]">
                {isAr ? 'تسوق هذه الإطلالة' : 'Shop this look'}
              </Link>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
