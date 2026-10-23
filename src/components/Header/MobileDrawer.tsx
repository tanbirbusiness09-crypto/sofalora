import React, { useState } from 'react';
import { useShop } from '../../context/LanguageContext';
import {
  X,
  Globe,
  Scissors,
  ChevronDown,
  ShoppingBag,
  Heart,
  PackageCheck,
  Sparkles,
  MessageCircle,
  Armchair
} from 'lucide-react';
import { Link } from '../../context/RouterContext';
import { BrandLogo } from '../UI/BrandLogo';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const { language, direction, setLanguage, t, openConsultation, wishlistCount } = useShop();

  const [expandedSection, setExpandedSection] = useState<string | null>('sofas');

  if (!isOpen) return null;

  const toggleSection = (sec: string) => {
    setExpandedSection((prev) => (prev === sec ? null : sec));
  };

  const isRtl = direction === 'rtl';
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
        } max-w-sm w-full bg-[#FBF8F3] shadow-2xl flex flex-col z-50 transform transition-transform duration-300 animate-in ${
          isRtl ? 'slide-in-from-right' : 'slide-in-from-left'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-[#E8DCCD] flex items-center justify-between bg-white shrink-0">
          <Link href="/" onClick={onClose} className="group">
            <BrandLogo size="sm" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="w-11 h-11 rounded-full text-[#747B72] hover:bg-[#F4EDE4] flex items-center justify-center transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language Bar */}
        <div className="brand-gradient-dark text-[#FBF8F3] px-4 py-2.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs font-medium">
            <Globe className="w-4 h-4 text-[#E6A56C]" />
            <span>{isAr ? 'اللغة / Language' : 'Language / اللغة'}</span>
          </div>
          <div className="flex items-center gap-1 bg-white/10 p-0.5 rounded-full border border-white/15">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
                language === 'en' ? 'bg-[#E6A56C] text-[#101713] font-bold shadow-xs' : 'text-[#D5CCC0]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('ar')}
              className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
                language === 'ar' ? 'bg-[#E6A56C] text-[#101713] font-bold shadow-xs' : 'text-[#D5CCC0]'
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
              className="min-h-[44px] flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-[#E7DACB] text-xs font-bold text-[#1B211D] hover:border-[#8F3E24] transition-colors shadow-2xs"
            >
              <PackageCheck className="w-4 h-4 text-[#8F3E24]" />
              <span>{isAr ? 'طلباتي' : 'My Orders'}</span>
            </Link>

            <Link
              href="/wishlist"
              onClick={onClose}
              className="min-h-[44px] flex items-center justify-between px-3 py-2.5 rounded-xl bg-white border border-[#E7DACB] text-xs font-bold text-[#1B211D] hover:border-[#8F3E24] transition-colors shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#8F3E24]" />
                <span>{isAr ? 'المفضلة' : 'Wishlist'}</span>
              </div>
              {wishlistCount > 0 && (
                <span className="w-5 h-5 rounded-full brand-gradient text-white text-[10px] flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </div>

          {/* All Products Shop Link */}
          <Link
            href="/shop"
            onClick={onClose}
            className="min-h-[48px] flex items-center justify-between py-3 px-4 rounded-xl font-bold text-white brand-gradient hover:brightness-105 transition-all shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4" />
              <span>{isAr ? 'استعراض الكنب والستائر' : 'Shop Sofas & Curtains'}</span>
            </div>
            <span className="text-xs text-white/80">
              {isAr ? 'الكتالوج الكامل' : 'Full Catalog'}
            </span>
          </Link>

          {/* Accordion 1: Sofas */}
          <div className="bg-white rounded-xl border border-[#E8DCCD] overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('sofas')}
              className="w-full min-h-[48px] px-4 py-3 flex items-center justify-between text-start font-bold text-sm text-[#1B211D]"
            >
              <div className="flex items-center gap-2.5">
                <Armchair className="w-4 h-4 text-[#8F3E24]" />
                <span>{t('navSofas')}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-[#85796D] transition-transform duration-200 ${
                  expandedSection === 'sofas' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedSection === 'sofas' && (
              <div className="px-4 pb-3 pt-1 space-y-1 border-t border-[#F5EFEA] text-xs font-medium text-[#3D3730]">
                {sofaLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="min-h-[40px] flex items-center justify-between py-2 px-2.5 rounded-lg hover:bg-[#FBF8F3] hover:text-[#8F3E24]"
                  >
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Accordion 2: Curtains */}
          <div className="bg-white rounded-xl border border-[#E8DCCD] overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('curtains')}
              className="w-full min-h-[48px] px-4 py-3 flex items-center justify-between text-start font-bold text-sm text-[#1B211D]"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#8F3E24]" />
                <span>{t('navCurtains')}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-[#85796D] transition-transform duration-200 ${
                  expandedSection === 'curtains' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedSection === 'curtains' && (
              <div className="px-4 pb-3 pt-1 space-y-1 border-t border-[#F5EFEA] text-xs font-medium text-[#3D3730]">
                {curtainLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="min-h-[40px] flex items-center justify-between py-2 px-2.5 rounded-lg hover:bg-[#FBF8F3] hover:text-[#8F3E24]"
                  >
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Atelier CTA Card */}
          <div className="brand-gradient-soft border border-[#E8DEC9] rounded-2xl p-4 text-start">
            <div className="flex items-center gap-2 text-xs font-bold text-[#8F3E24] uppercase tracking-wider mb-1">
              <Scissors className="w-4 h-4" />
              <span>{isAr ? 'أتيليه سوفالورا' : 'Sofalora Atelier'}</span>
            </div>
            <p className="text-xs text-[#5D5348] mb-3 leading-relaxed">
              {isAr
                ? 'استشارة وقياس مجاني في منزلك بالرياض مع عينات أقمشة الكنب والستائر.'
                : 'Free in-home consultation and measurement with fabric swatches across Riyadh.'}
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                openConsultation();
              }}
              className="w-full min-h-[44px] py-2.5 brand-gradient text-white rounded-xl text-xs font-bold transition-all shadow-2xs"
            >
              {isAr ? 'احجز استشارة مجانية' : 'Book Free Consultation'}
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
              <span>{isAr ? 'محادثة فورية مع المستشار' : 'Chat with Atelier Concierge'}</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
