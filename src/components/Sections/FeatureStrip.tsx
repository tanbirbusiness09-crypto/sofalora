import React from 'react';
import { Truck, Gem, Ruler, Headset, ShieldCheck, Sparkles, type LucideIcon } from 'lucide-react';
import { useShop } from '../../context/LanguageContext';
import { useSectionCms, pickText } from '../../context/WebsiteContext';

const ICONS: Record<string, LucideIcon> = {
  truck: Truck,
  delivery: Truck,
  gem: Gem,
  design: Gem,
  ruler: Ruler,
  measure: Ruler,
  headset: Headset,
  consultation: Headset,
  shield: ShieldCheck,
  guarantee: ShieldCheck,
  sparkles: Sparkles,
};
const DEFAULT_ICONS: LucideIcon[] = [Truck, Gem, ShieldCheck, Ruler, Headset];

/**
 * Service strip under the hero (home section key `feature_strip`).
 * Admin section items override the defaults: title/subtitle per language and
 * `value` = icon name (truck, gem, ruler, headset, shield, sparkles).
 * Defaults only repeat services the site already describes; no free-delivery
 * or warranty-length claims unless the admin configures them.
 */
export const FeatureStrip: React.FC = () => {
  const { language, deliveryClaim } = useShop();
  const cms = useSectionCms('feature_strip');
  const isAr = language === 'ar';

  const defaults = [
    {
      // Uses the checkout-settings delivery text (e.g. free delivery) when configured.
      title: deliveryClaim ?? (isAr ? 'التوصيل في الرياض' : 'Delivery in Riyadh'),
      subtitle: isAr ? 'توصيل وتركيب' : 'Delivery & installation',
    },
    { title: isAr ? 'خدمة التصميم المخصص' : 'Custom Design Service', subtitle: isAr ? 'مفصّل لمساحتك' : 'Tailored to your space' },
    { title: isAr ? 'حرفية عالية الجودة' : 'Quality Craftsmanship', subtitle: isAr ? 'صُنع ليدوم' : 'Built to last' },
    { title: isAr ? 'رفع مقاسات دقيق' : 'Precision Measurement', subtitle: isAr ? 'لمقاس مثالي' : 'For a perfect fit' },
    { title: isAr ? 'استشارة تصميم متخصصة' : 'Expert Design Consultation', subtitle: isAr ? 'في المعرض أو عبر الإنترنت' : 'In-store or online' },
  ];

  const cmsItems = (cms.section?.items ?? []).filter(
    (it): it is NonNullable<typeof it> => !!it && ((it.title_en ?? '').trim() !== '' || (it.title_ar ?? '').trim() !== '')
  );

  const items = cmsItems.length
    ? cmsItems.map((it, i) => ({
        title: pickText(language, it.title_en, it.title_ar),
        subtitle: pickText(language, it.subtitle_en, it.subtitle_ar),
        Icon: ICONS[(it.value ?? '').toLowerCase().trim()] ?? DEFAULT_ICONS[i % DEFAULT_ICONS.length],
      }))
    : defaults.map((d, i) => ({ ...d, Icon: DEFAULT_ICONS[i] }));

  return (
    <section aria-label={isAr ? 'خدماتنا' : 'Our services'} className="bg-white border-b border-[#EEE9DF]">
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-flow-col lg:auto-cols-fr lg:grid-cols-none">
        {items.map(({ title, subtitle, Icon }, i) => (
          <li key={i} className="relative flex items-center justify-center gap-3 px-3 py-3.5 lg:py-2.5 after:absolute after:end-0 after:top-1/4 after:h-1/2 after:w-px after:bg-[#E6E0D4] last:after:hidden max-lg:after:hidden">
            <Icon strokeWidth={1.3} className="h-6 w-6 shrink-0 text-[#0B2345]" />
            <span className="min-w-0">
              <span className="block text-[12px] font-semibold text-[#0B2345] leading-tight">{title}</span>
              {subtitle && <span className="block text-[11px] text-[#7A7F87] mt-0.5 truncate">{subtitle}</span>}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};
