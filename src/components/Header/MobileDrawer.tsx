import React, { useState } from 'react';
import { useShop } from '../../context/LanguageContext';
import {
  X,
  Globe,
  Phone,
  Scissors,
  ChevronDown,
  ShoppingBag,
  Heart,
  PackageCheck,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { Link } from '../../context/RouterContext';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const { language, direction, setLanguage, t, openConsultation, wishlistCount, cartCount } = useShop();

  const [expandedSection, setExpandedSection] = useState<string | null>('curtains');

  if (!isOpen) return null;

  const toggleSection = (sec: string) => {
    setExpandedSection((prev) => (prev === sec ? null : sec));
  };

  const isRtl = direction === 'rtl';

  return (
    <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      />

      {/* Drawer Panel */}
      <div
        className={`fixed inset-y-0 ${
          isRtl ? 'end-0' : 'start-0'
        } max-w-sm w-full bg-[#FAF8F5] shadow-2xl flex flex-col z-50 transform transition-transform duration-300 animate-in ${
          isRtl ? 'slide-in-from-right' : 'slide-in-from-left'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-[#EBE3D8] flex items-center justify-between bg-white shrink-0">
          <Link href="/" onClick={onClose} className="group">
            <h3 className="text-lg font-bold text-[#1C1A17] font-serif-luxury group-hover:text-[#A9803C] transition-colors">
              {language === 'ar' ? 'ستائر محمد' : 'MOHAMMAD CURTAINS'}
            </h3>
            <span className="text-[10px] text-[#8C7A6B] uppercase tracking-wider block font-sans">
              {language === 'ar' ? 'الرياض • تفصيل وديكور النوافذ الفاخرة' : 'RIYADH • BESPOKE WINDOW COUTURE'}
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="w-11 h-11 rounded-full text-[#7A6F64] hover:bg-[#F4EFEA] flex items-center justify-center transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language & Quick Currency Bar */}
        <div className="bg-[#1C1A17] text-[#FAF8F5] px-4 py-2.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs font-medium">
            <Globe className="w-4 h-4 text-[#C9A96E]" />
            <span>{language === 'ar' ? 'اللغة / Language' : 'Language / اللغة'}</span>
          </div>
          <div className="flex items-center gap-1 bg-[#2C2824] p-0.5 rounded-full border border-[#443F39]">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
                language === 'en' ? 'bg-[#C9A96E] text-[#1C1A17] font-bold shadow-xs' : 'text-[#D5CCC0]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('ar')}
              className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
                language === 'ar' ? 'bg-[#C9A96E] text-[#1C1A17] font-bold shadow-xs' : 'text-[#D5CCC0]'
              }`}
            >
              عربي
            </button>
          </div>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          
          {/* Quick Direct Links */}
          <div className="grid grid-cols-2 gap-2 pb-2">
            <Link
              href="/orders"
              onClick={onClose}
              className="min-h-[44px] flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-[#EAE3D8] text-xs font-bold text-[#1C1A17] hover:border-[#A9803C] transition-colors shadow-2xs"
            >
              <PackageCheck className="w-4 h-4 text-[#A9803C]" />
              <span>{language === 'ar' ? 'طلباتي' : 'My Orders'}</span>
            </Link>

            <Link
              href="/wishlist"
              onClick={onClose}
              className="min-h-[44px] flex items-center justify-between px-3 py-2.5 rounded-xl bg-white border border-[#EAE3D8] text-xs font-bold text-[#1C1A17] hover:border-[#A9803C] transition-colors shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#A9803C]" />
                <span>{language === 'ar' ? 'المفضلة' : 'Wishlist'}</span>
              </div>
              {wishlistCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#A9803C] text-white text-[10px] flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </div>

          {/* All Products Shop Link */}
          <Link
            href="/shop"
            onClick={onClose}
            className="min-h-[48px] flex items-center justify-between py-3 px-4 rounded-xl font-bold text-white bg-[#1C1A17] hover:bg-[#A9803C] transition-colors shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-[#D8BD88]" />
              <span>{language === 'ar' ? 'استعراض كافة المنتجات' : 'Browse All Products'}</span>
            </div>
            <span className="text-xs text-[#D8BD88]">
              {language === 'ar' ? 'جميع الكتالوجات' : 'Full Catalog'}
            </span>
          </Link>

          {/* Accordion 1: Curtains */}
          <div className="bg-white rounded-xl border border-[#EBE3D8] overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('curtains')}
              className="w-full min-h-[48px] px-4 py-3 flex items-center justify-between text-start font-bold text-sm text-[#1C1A17]"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#A9803C]" />
                <span>{t('navCurtains')}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-[#8C7A6B] transition-transform duration-200 ${
                  expandedSection === 'curtains' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedSection === 'curtains' && (
              <div className="px-4 pb-3 pt-1 space-y-1 border-t border-[#F5EFEA] text-xs font-medium text-[#3D3730]">
                <Link
                  href="/category/curtains"
                  onClick={onClose}
                  className="min-h-[40px] flex items-center justify-between py-2 px-2.5 rounded-lg hover:bg-[#FAF8F5] hover:text-[#A9803C]"
                >
                  <span>{t('catCurtains')}</span>
                  <span className="text-[11px] text-[#9B8F83]">42</span>
                </Link>
                <Link
                  href="/category/blackout-curtains"
                  onClick={onClose}
                  className="min-h-[40px] flex items-center justify-between py-2 px-2.5 rounded-lg hover:bg-[#FAF8F5] hover:text-[#A9803C]"
                >
                  <span>{t('catBlackout')}</span>
                  <span className="text-[11px] text-[#9B8F83]">28</span>
                </Link>
                <Link
                  href="/category/sheer-curtains"
                  onClick={onClose}
                  className="min-h-[40px] flex items-center justify-between py-2 px-2.5 rounded-lg hover:bg-[#FAF8F5] hover:text-[#A9803C]"
                >
                  <span>{t('catSheer')}</span>
                  <span className="text-[11px] text-[#9B8F83]">35</span>
                </Link>
                <Link
                  href="/category/custom-curtains"
                  onClick={onClose}
                  className="min-h-[40px] flex items-center justify-between py-2 px-2.5 rounded-lg hover:bg-[#FAF8F5] hover:text-[#A9803C] text-[#A9803C] font-bold"
                >
                  <span>{t('catCustom')}</span>
                  <span className="text-[10px] bg-[#A9803C]/10 text-[#A9803C] px-1.5 py-0.5 rounded-md">
                    {language === 'ar' ? 'تفصيل ليزري' : 'Laser Fit'}
                  </span>
                </Link>
              </div>
            )}
          </div>

          {/* Accordion 2: Blinds */}
          <div className="bg-white rounded-xl border border-[#EBE3D8] overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('blinds')}
              className="w-full min-h-[48px] px-4 py-3 flex items-center justify-between text-start font-bold text-sm text-[#1C1A17]"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 rounded-xs border-2 border-[#A9803C] flex items-center justify-center text-[10px] font-bold text-[#A9803C]">
                  ||
                </span>
                <span>{t('navBlinds')}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-[#8C7A6B] transition-transform duration-200 ${
                  expandedSection === 'blinds' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedSection === 'blinds' && (
              <div className="px-4 pb-3 pt-1 space-y-1 border-t border-[#F5EFEA] text-xs font-medium text-[#3D3730]">
                <Link
                  href="/category/roller-blinds"
                  onClick={onClose}
                  className="min-h-[40px] flex items-center justify-between py-2 px-2.5 rounded-lg hover:bg-[#FAF8F5] hover:text-[#A9803C]"
                >
                  <span>{language === 'ar' ? 'ستائر رول عازلة للشمس' : 'Roller Blinds'}</span>
                  <span className="text-[11px] text-[#9B8F83]">22</span>
                </Link>
                <Link
                  href="/category/roller-blinds"
                  onClick={onClose}
                  className="min-h-[40px] flex items-center justify-between py-2 px-2.5 rounded-lg hover:bg-[#FAF8F5] hover:text-[#A9803C]"
                >
                  <span>{language === 'ar' ? 'ستائر زيبرا ثنائية' : 'Zebra Blinds'}</span>
                  <span className="text-[11px] text-[#9B8F83]">16</span>
                </Link>
                <Link
                  href="/category/roller-blinds"
                  onClick={onClose}
                  className="min-h-[40px] flex items-center justify-between py-2 px-2.5 rounded-lg hover:bg-[#FAF8F5] hover:text-[#A9803C]"
                >
                  <span>{language === 'ar' ? 'ستائر رومانية طيات' : 'Roman Blinds'}</span>
                  <span className="text-[11px] text-[#9B8F83]">14</span>
                </Link>
              </div>
            )}
          </div>

          {/* In-Home Measure & Custom Tailoring CTA Card */}
          <div className="bg-[#FAF4EB] border border-[#E8DEC9] rounded-2xl p-4 text-start">
            <div className="flex items-center gap-2 text-xs font-bold text-[#A9803C] uppercase tracking-wider mb-1">
              <Scissors className="w-4 h-4" />
              <span>{language === 'ar' ? 'خدمة التفصيل والمقايسة' : 'Custom Measurement'}</span>
            </div>
            <p className="text-xs text-[#5D5348] mb-3 leading-relaxed">
              {language === 'ar'
                ? 'مهندس متخصص يزور منزلك في الرياض بأحدث أجهزة الليزر وكتالوجات الأقمشة مجاناً.'
                : 'Free in-home laser measurement with fabric swatches across Riyadh.'}
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                openConsultation();
              }}
              className="w-full min-h-[44px] py-2.5 bg-[#A9803C] hover:bg-[#8C6527] text-white rounded-xl text-xs font-bold transition-colors shadow-2xs"
            >
              {language === 'ar' ? 'احجز موعد مقايسة مجانية' : 'Book Free Measurement'}
            </button>
          </div>

          {/* Quick Support & WhatsApp */}
          <div className="pt-2">
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[44px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 font-bold text-xs transition-colors border border-[#25D366]/30"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366] fill-current" />
              <span>{language === 'ar' ? 'محادثة فورية مع المستشار' : 'Chat with Atelier Concierge'}</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
