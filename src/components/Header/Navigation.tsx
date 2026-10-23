import React, { useState } from 'react';
import { useShop } from '../../context/LanguageContext';
import { ChevronDown, Sparkles, Tag, Scissors, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from '../../context/RouterContext';
import { CATEGORIES } from '../../data/products';

export const Navigation: React.FC = () => {
  const { language, direction, t, openConsultation } = useShop();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;
  const isAr = language === 'ar';

  const getCategoryImage = (slug: string) =>
    CATEGORIES.find((category) => category.slug === slug)?.image || '';

  const sofaLinks = [
    { href: '/category/sofas', label: t('catSofas'), slug: 'sofas' },
    { href: '/category/sectional-sofas', label: t('catSectionals'), slug: 'sectional-sofas' },
    { href: '/category/majlis-sofas', label: t('catMajlis'), slug: 'majlis-sofas' },
    { href: '/category/sofa-beds', label: t('catSofaBeds'), slug: 'sofa-beds' },
  ];

  const curtainLinks = [
    { href: '/category/curtains', label: t('catCurtains'), slug: 'curtains' },
    { href: '/category/blackout-curtains', label: t('catBlackout'), slug: 'blackout-curtains' },
    { href: '/category/sheer-curtains', label: t('catSheer'), slug: 'sheer-curtains' },
    { href: '/category/custom-curtains', label: t('catCustom'), slug: 'custom-curtains' },
  ];

  return (
    <nav className="hidden lg:block bg-[#FAFAF8] border-b border-[#E5E1D8] relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center justify-between gap-1 xl:gap-2 text-[13px] font-medium text-[#1F2937] py-0">

          {/* Home */}
          <li>
            <Link
              href="/"
              className="inline-flex items-center py-3.5 px-2.5 text-[#0A2A5E] font-semibold border-b-2 border-[#C8102E] transition-colors"
            >
              {t('navHome')}
            </Link>
          </li>

          {/* Sofas Mega Menu */}
          <li
            className="relative"
            onMouseEnter={() => setActiveMenu('sofas')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <Link
              href="/category/sofas"
              onClick={() => setActiveMenu(null)}
              className={`inline-flex items-center gap-1 py-3.5 px-2.5 hover:text-[#0A2A5E] transition-colors ${
                activeMenu === 'sofas' ? 'text-[#0A2A5E] font-semibold' : ''
              }`}
            >
              <span>{t('navSofas')}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60 transition-transform duration-200" style={{ transform: activeMenu === 'sofas' ? 'rotate(180deg)' : 'none' }} />
            </Link>

            {activeMenu === 'sofas' && (
              <div
                onKeyDown={(e) => e.key === 'Escape' && setActiveMenu(null)}
                className="absolute top-full start-0 w-[780px] bg-white rounded-2xl shadow-2xl border border-[#E2DED4] p-6 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-200 z-50"
              >
                <div>
                  <h4 className="text-xs font-bold text-[#667085] uppercase tracking-wider mb-3">
                    {isAr ? 'تشكيلة الكنب' : 'Sofa Collection'}
                  </h4>
                  <div className="grid grid-cols-2 gap-2.5">
                    {sofaLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setActiveMenu(null)}
                        className="group flex items-center gap-2.5 p-2 rounded-xl bg-[#FAFAF8] border border-[#E6E1D6] hover:border-[#0A2A5E] hover:shadow-xs transition-all"
                      >
                        <img
                          src={getCategoryImage(item.slug)}
                          alt={item.label}
                          className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg object-cover shrink-0 border border-[#E5E1D8]"
                        />
                        <span className="text-[11px] font-semibold text-[#101828] leading-tight line-clamp-2">
                          {item.label}
                        </span>
                        <ArrowIcon className="w-3 h-3 text-[#0A2A5E] opacity-30 group-hover:opacity-70 transition-opacity shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#667085] uppercase tracking-wider mb-3">
                    {isAr ? 'تسوق حسب الغرفة' : 'Shop by Room'}
                  </h4>
                  <ul className="space-y-2 text-sm text-[#344054]">
                    <li>
                      <Link href="/category/majlis-sofas" onClick={() => setActiveMenu(null)} className="hover:text-[#0A2A5E] block">
                        {t('roomLivingRoom')}
                      </Link>
                    </li>
                    <li>
                      <Link href="/category/sofa-beds" onClick={() => setActiveMenu(null)} className="hover:text-[#0A2A5E] block">
                        {t('roomBedroom')}
                      </Link>
                    </li>
                    <li>
                      <Link href="/category/accent-chairs" onClick={() => setActiveMenu(null)} className="hover:text-[#0A2A5E] block">
                        {t('roomDiningRoom')}
                      </Link>
                    </li>
                    <li>
                      <Link href="/category/sectional-sofas" onClick={() => setActiveMenu(null)} className="hover:text-[#0A2A5E] block">
                        {isAr ? 'صالة الفيلا' : 'Villa Lounge'}
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="brand-gradient-dark rounded-xl p-4 text-white flex flex-col justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C6A15B] uppercase tracking-wider mb-1">
                      <Sparkles className="w-3 h-3" />
                      {t('featuredStyle')}
                    </span>
                    <h5 className="text-sm font-bold mb-1">
                      {isAr ? 'كنبة سحابة الرياض' : 'Riyadh Cloud Sofa'}
                    </h5>
                    <p className="text-xs text-white/70 leading-relaxed">
                      {isAr
                        ? 'بوكليه إيطالي بحشوة ناعمة ووسائد تدعم الجلسات الطويلة.'
                        : 'Italian bouclé with deep feather-down comfort for long majlis evenings.'}
                    </p>
                  </div>
                  <Link
                    href="/category/sofas"
                    onClick={() => setActiveMenu(null)}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#C6A15B] hover:text-white transition-colors"
                  >
                    <span>{isAr ? 'استكشف الكنب' : 'Explore Sofas'}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </li>

          {/* Majlis */}
          <li>
            <Link
              href="/category/majlis-sofas"
              className="py-3.5 px-2 hover:text-[#0A2A5E] transition-colors"
            >
              {t('navMajlis')}
            </Link>
          </li>

          {/* Curtains Mega Menu */}
          <li
            className="relative"
            onMouseEnter={() => setActiveMenu('curtains')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <Link
              href="/category/curtains"
              onClick={() => setActiveMenu(null)}
              className={`inline-flex items-center gap-1 py-3.5 px-2.5 hover:text-[#0A2A5E] transition-colors ${
                activeMenu === 'curtains' ? 'text-[#0A2A5E] font-semibold' : ''
              }`}
            >
              <span>{t('navCurtains')}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60 transition-transform duration-200" style={{ transform: activeMenu === 'curtains' ? 'rotate(180deg)' : 'none' }} />
            </Link>

            {activeMenu === 'curtains' && (
              <div
                onKeyDown={(e) => e.key === 'Escape' && setActiveMenu(null)}
                className="absolute top-full end-0 w-[780px] bg-white rounded-2xl shadow-2xl border border-[#E2DED4] p-6 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-200 z-50"
              >
                <div>
                  <h4 className="text-xs font-bold text-[#667085] uppercase tracking-wider mb-3">
                    {isAr ? 'تشكيلة الستائر' : 'Curtain Collection'}
                  </h4>
                  <div className="grid grid-cols-2 gap-2.5">
                    {curtainLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setActiveMenu(null)}
                        className="group flex items-center gap-2.5 p-2 rounded-xl bg-[#FAFAF8] border border-[#E6E1D6] hover:border-[#0A2A5E] hover:shadow-xs transition-all"
                      >
                        <img
                          src={getCategoryImage(item.slug)}
                          alt={item.label}
                          className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg object-cover shrink-0 border border-[#E5E1D8]"
                        />
                        <span className="text-[11px] font-semibold text-[#101828] leading-tight line-clamp-2">
                          {item.label}
                        </span>
                        <ArrowIcon className="w-3 h-3 text-[#0A2A5E] opacity-30 group-hover:opacity-70 transition-opacity shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#667085] uppercase tracking-wider mb-3">
                    {isAr ? 'الأنماط والخدمات' : 'Styles & Services'}
                  </h4>
                  <ul className="space-y-2 text-sm text-[#344054]">
                    <li>
                      <Link href="/category/custom-curtains" onClick={() => setActiveMenu(null)} className="hover:text-[#0A2A5E] block">
                        {isAr ? 'طيات ويف S-Wave' : 'Ripple S-Wave Pleat'}
                      </Link>
                    </li>
                    <li>
                      <Link href="/category/custom-curtains" onClick={() => setActiveMenu(null)} className="hover:text-[#0A2A5E] block">
                        {isAr ? 'طيات فرنسية ثلاثية' : 'Triple Pinch Pleat'}
                      </Link>
                    </li>
                    <li>
                      <Link href="/category/blackout-curtains" onClick={() => setActiveMenu(null)} className="hover:text-[#0A2A5E] block">
                        {isAr ? 'ستائر معتمة حرارية' : 'Thermal Blackout Panels'}
                      </Link>
                    </li>
                    <li>
                      <button type="button" onClick={openConsultation} className="hover:text-[#0A2A5E] text-start w-full cursor-pointer">
                        {isAr ? 'قياس مجاني في الرياض' : 'Free Riyadh Measurement'}
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="brand-gradient-dark rounded-xl p-4 text-white flex flex-col justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C6A15B] uppercase tracking-wider mb-1">
                      <Sparkles className="w-3 h-3" />
                      {isAr ? 'أتيليه الستائر' : 'Curtain Atelier'}
                    </span>
                    <h5 className="text-sm font-bold mb-1">
                      {isAr ? 'ستارة الحرمين المعتمة' : 'Haramain Blackout Panel'}
                    </h5>
                    <p className="text-xs text-white/70 leading-relaxed">
                      {isAr
                        ? 'قماش ثلاثي الطبقات يحجب الضوء والحرارة ويحافظ على البرودة.'
                        : 'Triple-weave fabric that blocks light and heat while keeping rooms cool.'}
                    </p>
                  </div>
                  <Link
                    href="/category/blackout-curtains"
                    onClick={() => setActiveMenu(null)}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#C6A15B] hover:text-white transition-colors"
                  >
                    <span>{isAr ? 'استكشف الستائر' : 'Explore Curtains'}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </li>

          {/* Pairings */}
          <li>
            <Link
              href="/shop"
              className="py-3.5 px-2 hover:text-[#0A2A5E] transition-colors"
            >
              {t('navPairings')}
            </Link>
          </li>

          {/* Atelier */}
          <li>
            <Link
              href="/category/custom-curtains"
              className="inline-flex items-center gap-1.5 py-3.5 px-2.5 font-semibold text-[#101828] hover:text-[#0A2A5E] transition-colors"
            >
              <Scissors className="w-3.5 h-3.5 text-[#C8102E]" />
              <span>{t('navCustom')}</span>
            </Link>
          </li>

          {/* New Arrivals */}
          <li>
            <Link
              href="/new-arrivals"
              className="py-3.5 px-2 hover:text-[#0A2A5E] transition-colors"
            >
              {t('navNewArrivals')}
            </Link>
          </li>

          {/* Offers */}
          <li>
            <Link
              href="/offers"
              className="inline-flex items-center gap-1 py-3.5 px-2 text-[#0A2A5E] font-semibold hover:text-[#C8102E] transition-colors"
            >
              <Tag className="w-3.5 h-3.5" />
              <span>{t('navOffers')}</span>
            </Link>
          </li>

          {/* Free Design Consultation */}
          <li>
            <button
              onClick={openConsultation}
              className="brand-gradient inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-full text-xs font-semibold text-white transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('navServices')}</span>
            </button>
          </li>

        </ul>
      </div>
    </nav>
  );
};
