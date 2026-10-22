import React, { useState } from 'react';
import { useShop } from '../../context/LanguageContext';
import { ChevronDown, Sparkles, Tag, Scissors, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from '../../context/RouterContext';

export const Navigation: React.FC = () => {
  const { language, direction, t, openConsultation } = useShop();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;
  const isAr = language === 'ar';

  const sofaLinks = [
    { href: '/category/sofas', label: t('catSofas') },
    { href: '/category/sectional-sofas', label: t('catSectionals') },
    { href: '/category/majlis-sofas', label: t('catMajlis') },
    { href: '/category/accent-chairs', label: t('catArmchairs') },
    { href: '/category/sofa-beds', label: t('catSofaBeds') },
  ];

  const curtainLinks = [
    { href: '/category/curtains', label: t('catCurtains') },
    { href: '/category/blackout-curtains', label: t('catBlackout') },
    { href: '/category/sheer-curtains', label: t('catSheer') },
    { href: '/category/custom-curtains', label: t('catCustom') },
    { href: '/category/ready-made-curtains', label: t('catReady') },
  ];

  return (
    <nav className="hidden lg:block bg-[#FBF8F3] border-b border-[#E7DACB] relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center justify-between gap-1 xl:gap-2 text-[13px] font-medium text-[#292623] py-0">

          {/* Home */}
          <li>
            <Link
              href="/"
              className="inline-flex items-center py-3.5 px-2.5 text-[#8F3E24] font-semibold border-b-2 border-[#8F3E24] transition-colors"
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
              className={`inline-flex items-center gap-1 py-3.5 px-2.5 hover:text-[#8F3E24] transition-colors ${
                activeMenu === 'sofas' ? 'text-[#8F3E24] font-semibold' : ''
              }`}
            >
              <span>{t('navSofas')}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60 transition-transform duration-200" style={{ transform: activeMenu === 'sofas' ? 'rotate(180deg)' : 'none' }} />
            </Link>

            {activeMenu === 'sofas' && (
              <div
                onKeyDown={(e) => e.key === 'Escape' && setActiveMenu(null)}
                className="absolute top-full start-0 w-[780px] bg-white rounded-2xl shadow-2xl border border-[#E4D6C7] p-6 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-200 z-50"
              >
                <div>
                  <h4 className="text-xs font-bold text-[#85796D] uppercase tracking-wider mb-3">
                    {isAr ? 'تشكيلة الكنب' : 'Sofa Collection'}
                  </h4>
                  <ul className="space-y-2 text-sm text-[#38332E]">
                    {sofaLinks.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setActiveMenu(null)}
                          className="hover:text-[#8F3E24] transition-colors flex items-center justify-between"
                        >
                          <span>{item.label}</span>
                          <ArrowIcon className="w-3 h-3 opacity-40" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#85796D] uppercase tracking-wider mb-3">
                    {isAr ? 'تسوق حسب الغرفة' : 'Shop by Room'}
                  </h4>
                  <ul className="space-y-2 text-sm text-[#38332E]">
                    <li>
                      <Link href="/category/majlis-sofas" onClick={() => setActiveMenu(null)} className="hover:text-[#8F3E24] block">
                        {t('roomLivingRoom')}
                      </Link>
                    </li>
                    <li>
                      <Link href="/category/sofa-beds" onClick={() => setActiveMenu(null)} className="hover:text-[#8F3E24] block">
                        {t('roomBedroom')}
                      </Link>
                    </li>
                    <li>
                      <Link href="/category/accent-chairs" onClick={() => setActiveMenu(null)} className="hover:text-[#8F3E24] block">
                        {t('roomDiningRoom')}
                      </Link>
                    </li>
                    <li>
                      <Link href="/category/sectional-sofas" onClick={() => setActiveMenu(null)} className="hover:text-[#8F3E24] block">
                        {isAr ? 'صالة الفيلا' : 'Villa Lounge'}
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="brand-gradient-dark rounded-xl p-4 text-white flex flex-col justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E6A56C] uppercase tracking-wider mb-1">
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
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#E6A56C] hover:text-white transition-colors"
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
              className="py-3.5 px-2 hover:text-[#8F3E24] transition-colors"
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
              className={`inline-flex items-center gap-1 py-3.5 px-2.5 hover:text-[#8F3E24] transition-colors ${
                activeMenu === 'curtains' ? 'text-[#8F3E24] font-semibold' : ''
              }`}
            >
              <span>{t('navCurtains')}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60 transition-transform duration-200" style={{ transform: activeMenu === 'curtains' ? 'rotate(180deg)' : 'none' }} />
            </Link>

            {activeMenu === 'curtains' && (
              <div
                onKeyDown={(e) => e.key === 'Escape' && setActiveMenu(null)}
                className="absolute top-full end-0 w-[780px] bg-white rounded-2xl shadow-2xl border border-[#E4D6C7] p-6 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-200 z-50"
              >
                <div>
                  <h4 className="text-xs font-bold text-[#85796D] uppercase tracking-wider mb-3">
                    {isAr ? 'تشكيلة الستائر' : 'Curtain Collection'}
                  </h4>
                  <ul className="space-y-2 text-sm text-[#38332E]">
                    {curtainLinks.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setActiveMenu(null)}
                          className="hover:text-[#8F3E24] transition-colors flex items-center justify-between"
                        >
                          <span>{item.label}</span>
                          <ArrowIcon className="w-3 h-3 opacity-40" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#85796D] uppercase tracking-wider mb-3">
                    {isAr ? 'الأنماط والخدمات' : 'Styles & Services'}
                  </h4>
                  <ul className="space-y-2 text-sm text-[#38332E]">
                    <li>
                      <Link href="/category/custom-curtains" onClick={() => setActiveMenu(null)} className="hover:text-[#8F3E24] block">
                        {isAr ? 'طيات ويف S-Wave' : 'Ripple S-Wave Pleat'}
                      </Link>
                    </li>
                    <li>
                      <Link href="/category/custom-curtains" onClick={() => setActiveMenu(null)} className="hover:text-[#8F3E24] block">
                        {isAr ? 'طيات فرنسية ثلاثية' : 'Triple Pinch Pleat'}
                      </Link>
                    </li>
                    <li>
                      <Link href="/category/blackout-curtains" onClick={() => setActiveMenu(null)} className="hover:text-[#8F3E24] block">
                        {isAr ? 'ستائر معتمة حرارية' : 'Thermal Blackout Panels'}
                      </Link>
                    </li>
                    <li>
                      <button type="button" onClick={openConsultation} className="hover:text-[#8F3E24] text-start w-full cursor-pointer">
                        {isAr ? 'قياس مجاني في الرياض' : 'Free Riyadh Measurement'}
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="brand-gradient-dark rounded-xl p-4 text-white flex flex-col justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E6A56C] uppercase tracking-wider mb-1">
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
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#E6A56C] hover:text-white transition-colors"
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
              className="py-3.5 px-2 hover:text-[#8F3E24] transition-colors"
            >
              {t('navPairings')}
            </Link>
          </li>

          {/* Atelier */}
          <li>
            <Link
              href="/category/custom-curtains"
              className="inline-flex items-center gap-1.5 py-3.5 px-2.5 font-semibold text-[#1B211D] hover:text-[#8F3E24] transition-colors"
            >
              <Scissors className="w-3.5 h-3.5 text-[#B85C3A]" />
              <span>{t('navCustom')}</span>
            </Link>
          </li>

          {/* New Arrivals */}
          <li>
            <Link
              href="/new-arrivals"
              className="py-3.5 px-2 hover:text-[#8F3E24] transition-colors"
            >
              {t('navNewArrivals')}
            </Link>
          </li>

          {/* Offers */}
          <li>
            <Link
              href="/offers"
              className="inline-flex items-center gap-1 py-3.5 px-2 text-[#8F3E24] font-semibold hover:text-[#B85C3A] transition-colors"
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
