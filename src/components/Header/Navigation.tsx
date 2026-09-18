import React, { useState } from 'react';
import { useShop } from '../../context/LanguageContext';
import { ChevronDown, Sparkles, Tag, Scissors, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../../data/products';
import { Link } from '../../context/RouterContext';

export const Navigation: React.FC = () => {
  const { language, direction, t, openQuickView, openConsultation } = useShop();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <nav className="hidden lg:block bg-[#FAF8F5] border-b border-[#EAE3D8] relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center justify-between gap-1 xl:gap-2 text-[13px] font-medium text-[#292623] py-0">
          
          {/* Home */}
          <li>
            <Link
              href="/"
              className="inline-flex items-center py-3.5 px-2.5 text-[#A9803C] font-semibold border-b-2 border-[#A9803C] transition-colors"
            >
              {t('navHome')}
            </Link>
          </li>

          {/* All Curtains & Blinds (Shop) */}
          <li>
            <Link
              href="/shop"
              className="py-3.5 px-2 text-[#1C1A17] font-semibold hover:text-[#A9803C] transition-colors"
            >
              {language === 'ar' ? 'جميع المنتجات' : 'All Products'}
            </Link>
          </li>

          {/* Curtains (Mega Menu) */}
          <li
            className="relative"
            onMouseEnter={() => setActiveMenu('curtains')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <Link
              href="/category/curtains"
              onClick={() => setActiveMenu(null)}
              className={`inline-flex items-center gap-1 py-3.5 px-2.5 hover:text-[#A9803C] transition-colors ${
                activeMenu === 'curtains' ? 'text-[#A9803C] font-semibold' : ''
              }`}
            >
              <span>{t('navCurtains')}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60 transition-transform duration-200" style={{ transform: activeMenu === 'curtains' ? 'rotate(180deg)' : 'none' }} />
            </Link>

            {/* Mega Menu Dropdown */}
            {activeMenu === 'curtains' && (
              <div
                onKeyDown={(e) => e.key === 'Escape' && setActiveMenu(null)}
                className="absolute top-full start-0 w-[780px] bg-white rounded-2xl shadow-2xl border border-[#E7DFD5] p-6 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-200 z-50"
              >
                <div>
                  <h4 className="text-xs font-bold text-[#8C7A6B] uppercase tracking-wider mb-3">
                    {language === 'ar' ? 'أنواع الستائر' : 'Curtain Types'}
                  </h4>
                  <ul className="space-y-2 text-sm text-[#38332E]">
                    <li>
                      <Link
                        href="/category/curtains"
                        onClick={() => setActiveMenu(null)}
                        className="hover:text-[#A9803C] transition-colors flex items-center justify-between"
                      >
                        <span>{t('catCurtains')}</span>
                        <span className="text-xs text-[#9B8F83]">42</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/category/blackout-curtains"
                        onClick={() => setActiveMenu(null)}
                        className="hover:text-[#A9803C] transition-colors flex items-center justify-between"
                      >
                        <span>{t('catBlackout')}</span>
                        <span className="text-xs text-[#9B8F83]">28</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/category/sheer-curtains"
                        onClick={() => setActiveMenu(null)}
                        className="hover:text-[#A9803C] transition-colors flex items-center justify-between"
                      >
                        <span>{t('catSheer')}</span>
                        <span className="text-xs text-[#9B8F83]">35</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/category/custom-curtains"
                        onClick={() => setActiveMenu(null)}
                        className="hover:text-[#A9803C] transition-colors flex items-center justify-between"
                      >
                        <span>{t('catCustom')}</span>
                        <span className="text-xs text-[#C49E5D] font-bold">New</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#8C7A6B] uppercase tracking-wider mb-3">
                    {language === 'ar' ? 'أنماط الخياطة والسكك' : 'Header Styles'}
                  </h4>
                  <ul className="space-y-2 text-sm text-[#38332E]">
                    <li>
                      <Link
                        href="/category/custom-curtains"
                        onClick={() => setActiveMenu(null)}
                        className="hover:text-[#A9803C] block"
                      >
                        {language === 'ar' ? 'انسيابية ويف S-Wave' : 'Ripple S-Wave Pleat'}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/category/curtains"
                        onClick={() => setActiveMenu(null)}
                        className="hover:text-[#A9803C] block"
                      >
                        {language === 'ar' ? 'طيات فرنسية ثلاثية' : 'Triple Pinch Pleat'}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/category/accessories"
                        onClick={() => setActiveMenu(null)}
                        className="hover:text-[#A9803C] block"
                      >
                        {language === 'ar' ? 'سكك كهربائية ومخفية' : 'Motorized Smart Tracks'}
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Featured Highlight Card */}
                <div className="bg-[#FAF8F5] rounded-xl p-4 border border-[#EAE3D8] flex flex-col justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#A9803C] uppercase tracking-wider mb-1">
                      <Sparkles className="w-3 h-3" />
                      {t('featuredStyle')}
                    </span>
                    <h5 className="text-sm font-bold text-[#1C1A17] mb-1">
                      {language === 'ar' ? 'ستارة ويف المميزة' : 'Signature Wave Curtain'}
                    </h5>
                    <p className="text-xs text-[#7A6F64] leading-relaxed">
                      {language === 'ar'
                        ? 'انسيابية مستمرة من السقف حتى الأرض مصممة للمجالس والفلل الحديثة.'
                        : 'Continuous floor-to-ceiling waves tailored for modern Riyadh villas.'}
                    </p>
                  </div>
                  <Link
                    href="/category/custom-curtains"
                    onClick={() => setActiveMenu(null)}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#1C1A17] hover:text-[#A9803C] transition-colors"
                  >
                    <span>{language === 'ar' ? 'استكشف التشكيلة' : 'Explore Collection'}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </li>

          {/* Blinds (Mega Menu) */}
          <li
            className="relative"
            onMouseEnter={() => setActiveMenu('blinds')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <Link
              href="/category/roller-blinds"
              onClick={() => setActiveMenu(null)}
              className={`inline-flex items-center gap-1 py-3.5 px-2.5 hover:text-[#A9803C] transition-colors ${
                activeMenu === 'blinds' ? 'text-[#A9803C] font-semibold' : ''
              }`}
            >
              <span>{t('navBlinds')}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60 transition-transform duration-200" style={{ transform: activeMenu === 'blinds' ? 'rotate(180deg)' : 'none' }} />
            </Link>

            {/* Blinds Dropdown */}
            {activeMenu === 'blinds' && (
              <div
                onKeyDown={(e) => e.key === 'Escape' && setActiveMenu(null)}
                className="absolute top-full start-0 w-[540px] bg-white rounded-2xl shadow-2xl border border-[#E7DFD5] p-5 grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2 duration-200 z-50"
              >
                <div>
                  <h4 className="text-xs font-bold text-[#8C7A6B] uppercase tracking-wider mb-3">
                    {language === 'ar' ? 'تشكيلة المظلات والرول' : 'Blinds Collection'}
                  </h4>
                  <ul className="space-y-2.5 text-sm text-[#38332E]">
                    <li>
                      <Link
                        href="/category/roller-blinds"
                        onClick={() => setActiveMenu(null)}
                        className="hover:text-[#A9803C] transition-colors flex items-center justify-between"
                      >
                        <span>{t('catRoller')}</span>
                        <span className="text-xs text-[#9B8F83]">24</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/category/roman-blinds"
                        onClick={() => setActiveMenu(null)}
                        className="hover:text-[#A9803C] transition-colors flex items-center justify-between"
                      >
                        <span>{t('catRoman')}</span>
                        <span className="text-xs text-[#9B8F83]">19</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/category/zebra-blinds"
                        onClick={() => setActiveMenu(null)}
                        className="hover:text-[#A9803C] transition-colors flex items-center justify-between"
                      >
                        <span>{t('catZebra')}</span>
                        <span className="text-xs text-[#9B8F83]">16</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/category/accessories"
                        onClick={() => setActiveMenu(null)}
                        className="hover:text-[#A9803C] transition-colors flex items-center justify-between"
                      >
                        <span>{language === 'ar' ? 'محركات وريموتات ذكية' : 'Smart Remotes & Motors'}</span>
                        <span className="text-xs text-[#9B8F83]">12</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#FAF8F5] rounded-xl p-4 border border-[#EAE3D8]">
                  <h5 className="text-xs font-bold text-[#1C1A17] uppercase tracking-wider mb-2">
                    {language === 'ar' ? 'التحكم الذكي بالمحركات' : 'Smart Motorization'}
                  </h5>
                  <p className="text-xs text-[#7A6F64] leading-relaxed mb-3">
                    {language === 'ar'
                      ? 'ربط كامل مع أليكسا وجوجل هوم وتطبيق الجوال لفتح وإغلاق مجدول.'
                      : 'Seamless integration with smart home apps for scheduled day & night shading.'}
                  </p>
                  <Link
                    href="/category/roller-blinds"
                    onClick={() => setActiveMenu(null)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#A9803C] hover:underline"
                  >
                    <span>{language === 'ar' ? 'عرض السكك الذكية' : 'Smart Rail Promotion'}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </li>

          {/* Direct Category Links */}
          <li>
            <Link
              href="/category/blackout-curtains"
              className="py-3.5 px-2 hover:text-[#A9803C] transition-colors"
            >
              {t('navBlackout')}
            </Link>
          </li>
          <li>
            <Link
              href="/category/sheer-curtains"
              className="py-3.5 px-2 hover:text-[#A9803C] transition-colors"
            >
              {t('navSheer')}
            </Link>
          </li>
          <li>
            <Link
              href="/category/roller-blinds"
              className="py-3.5 px-2 hover:text-[#A9803C] transition-colors"
            >
              {t('navRoller')}
            </Link>
          </li>
          <li>
            <Link
              href="/new-arrivals"
              className="py-3.5 px-2 hover:text-[#A9803C] transition-colors"
            >
              {language === 'ar' ? 'وصل حديثاً' : 'New Arrivals'}
            </Link>
          </li>

          {/* Custom Curtains Link */}
          <li>
            <Link
              href="/category/custom-curtains"
              className="inline-flex items-center gap-1.5 py-3.5 px-2.5 font-semibold text-[#1C1A17] hover:text-[#A9803C] transition-colors"
            >
              <Scissors className="w-3.5 h-3.5 text-[#C49E5D]" />
              <span>{t('navCustom')}</span>
            </Link>
          </li>

          {/* Offers */}
          <li>
            <Link
              href="/offers"
              className="inline-flex items-center gap-1 py-3.5 px-2 text-[#A9803C] font-semibold hover:text-[#C49E5D] transition-colors"
            >
              <Tag className="w-3.5 h-3.5" />
              <span>{t('navOffers')}</span>
            </Link>
          </li>

          {/* Services / Free Consultation */}
          <li>
            <button
              onClick={openConsultation}
              className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-[#EAE3D8] hover:bg-[#DCD3C6] text-xs font-semibold text-[#1C1A17] transition-all cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#A9803C]" />
              <span>{t('navServices')}</span>
            </button>
          </li>

        </ul>
      </div>
    </nav>
  );
};
