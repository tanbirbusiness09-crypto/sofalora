import React from 'react';
import { useShop } from '../../context/LanguageContext';
import { useSectionCms, useWebsite, pickText, cmsImage } from '../../context/WebsiteContext';
import { Link } from '../../context/RouterContext';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop';

/**
 * Feature banner. No hard-coded discounts, coupon codes or countdowns: every text is
 * editable in the admin Website Builder (section title/subtitle + the "promotional_offer"
 * card: card title = small label, card subtitle = description, image, button link).
 * Real offers should come from coupons created in the admin.
 */
export const PromotionalOffer: React.FC = () => {
  const { language, direction, t } = useShop();
  const cms = useSectionCms();
  const { card } = useWebsite();
  const c = card('promotional_offer');
  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

  const eyebrow = pickText(language, c?.title_en, c?.title_ar, t('promoEyebrow'));
  const description = pickText(language, c?.subtitle_en, c?.subtitle_ar, t('promoDesc'));
  const href = c?.btn_url?.trim() || '/best-sellers';
  const image = cmsImage(c?.image, DEFAULT_IMAGE);

  return (
    <section id="promo" className="py-14 sm:py-20 bg-[#F3F1EB] relative overflow-hidden border-y border-[#E2DED4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#0B2345] text-white p-6 sm:p-10 lg:p-14 overflow-hidden shadow-2xl border border-[#344054]">
          <div className="absolute top-0 end-0 w-96 h-96 bg-[#B59460]/15 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute bottom-0 start-0 w-80 h-80 bg-[#B59460]/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-start">
              {eyebrow && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F2937] border border-[#4B5563] text-[#D9C29A] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#B59460]" />
                  <span>{eyebrow}</span>
                </div>
              )}

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif-luxury tracking-tight text-white leading-tight">
                {cms.title(t('promoTitle'))}
              </h2>

              <p className="text-xl sm:text-2xl font-semibold text-[#D9C29A]">
                {cms.subtitle(t('promoSubtitle'))}
              </p>

              {description && (
                <p className="text-sm sm:text-base text-[#A8A29A] max-w-xl leading-relaxed">{description}</p>
              )}

              <div className="pt-2">
                <Link
                  href={href}
                  className="inline-flex items-center gap-2 bg-[#B59460] hover:bg-[#D9C29A] text-white hover:text-[#0B2345] px-7 py-3.5 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <span>{t('promoCTA')}</span>
                  <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-[#344054] shadow-xl aspect-[4/3] bg-[#0A2344]">
                <img src={image} alt="" loading="lazy" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
