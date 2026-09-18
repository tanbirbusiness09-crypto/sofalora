import React from 'react';
import { useShop } from '../../context/LanguageContext';
import { Link } from '../../context/RouterContext';
import { Truck, Phone, MapPin, PackageCheck, Globe } from 'lucide-react';

export const UtilityBar: React.FC = () => {
  const { language, setLanguage, t } = useShop();

  return (
    <div className="bg-[#1C1A17] text-[#EDE7DE] text-xs border-b border-[#2C2824] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Free Delivery Announcement */}
        <div className="flex items-center gap-2 font-medium tracking-wide">
          <Truck className="w-3.5 h-3.5 text-[#C9A96E] shrink-0" />
          <span>{t('freeDelivery')}</span>
          <span className="hidden md:inline-block text-[#6D655C]">•</span>
          <span className="hidden md:inline-block text-[#A99F93]">{t('riyadhShowroom')}</span>
        </div>

        {/* Right: Quick Links & Language Switcher */}
        <div className="flex items-center gap-5 sm:gap-6 ms-auto">
          <a
            href="#consultation"
            className="hidden sm:flex items-center gap-1.5 text-[#C4B9AA] hover:text-[#C9A96E] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span>{t('contactUs')}</span>
          </a>

          <Link
            href="/orders"
            className="hidden sm:flex items-center gap-1.5 text-[#C4B9AA] hover:text-[#C9A96E] transition-colors"
          >
            <PackageCheck className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span>{t('trackOrder')}</span>
          </Link>

          <a
            href="#footer"
            className="hidden md:flex items-center gap-1.5 text-[#C4B9AA] hover:text-[#C9A96E] transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span>{t('storeLocator')}</span>
          </a>

          {/* Permanent Global Language Switcher */}
          <div className="flex items-center gap-1 bg-[#282521] px-2 py-0.5 rounded-full border border-[#3A352F]">
            <Globe className="w-3 h-3 text-[#C9A96E] shrink-0" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 text-[11px] font-medium rounded transition-all ${
                language === 'en'
                  ? 'bg-[#C9A96E] text-[#1C1A17] font-bold shadow-xs'
                  : 'text-[#B8AEA0] hover:text-white'
              }`}
              aria-label="Switch to English"
            >
              EN
            </button>
            <span className="text-[#4D453C]">|</span>
            <button
              onClick={() => setLanguage('ar')}
              className={`px-1.5 py-0.5 text-[11px] font-medium rounded transition-all ${
                language === 'ar'
                  ? 'bg-[#C9A96E] text-[#1C1A17] font-bold shadow-xs'
                  : 'text-[#B8AEA0] hover:text-white'
              }`}
              aria-label="التبديل إلى العربية"
            >
              العربية
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
