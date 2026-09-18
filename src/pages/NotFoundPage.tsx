import React from 'react';
import { useShop } from '../context/LanguageContext';
import { Link, useRouter } from '../context/RouterContext';
import { Compass, ArrowRight, ArrowLeft, Home, ShoppingBag, PhoneCall, Search } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { language, direction } = useShop();
  const { navigate } = useRouter();
  const [searchQuery, setSearchQuery] = React.useState('');

  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white rounded-3xl border border-[#EAE3D8] p-8 sm:p-12 shadow-sm text-center">
        {/* Decorative Badge */}
        <div className="w-20 h-20 rounded-full bg-[#FAF5EE] text-[#A9803C] flex items-center justify-center mx-auto mb-6 shadow-inner">
          <Compass className="w-10 h-10 animate-pulse" />
        </div>

        <span className="text-xs font-bold text-[#A9803C] tracking-widest uppercase">
          {language === 'ar' ? 'خطأ ٤٠٤ • الصفحة غير موجودة' : 'Error 404 • Page Not Found'}
        </span>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1A17] mt-2 mb-3">
          {language === 'ar'
            ? 'عذراً، لم نتمكن من العثور على هذه الصفحة'
            : 'We Couldn’t Find the Page You’re Looking For'}
        </h1>

        <p className="text-sm text-[#7A6F64] leading-relaxed mb-8 max-w-md mx-auto">
          {language === 'ar'
            ? 'ربما تم نقل الرابط أو حذفه أو كتابة العنوان بشكل غير دقيق. يمكنك البحث أدناه أو العودة لتصفح أفخم تشكيلات الستائر.'
            : 'The link might have moved or the address was typed incorrectly. You can search below or explore our bespoke curtain atelier.'}
        </p>

        {/* Quick Search */}
        <form onSubmit={handleSearchSubmit} className="relative max-w-md mx-auto mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'ar' ? 'ابحث عن ستائر، بلاك أوت، شيفون...' : 'Search curtains, blackout, sheer...'}
            className="w-full bg-[#FAF7F2] border border-[#DCD4C7] rounded-full py-3 ps-11 pe-24 text-sm text-[#1C1A17] placeholder-[#8A8075] focus:outline-none focus:border-[#A9803C] focus:ring-2 focus:ring-[#A9803C]/20 shadow-2xs"
          />
          <Search className="w-4 h-4 text-[#8A8075] absolute start-4 top-3.5" />
          <button
            type="submit"
            className="absolute end-1.5 top-1.5 bottom-1.5 px-4 rounded-full bg-[#1C1A17] text-white text-xs font-semibold hover:bg-[#A9803C] transition-colors"
          >
            {language === 'ar' ? 'بحث' : 'Search'}
          </button>
        </form>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#1C1A17] hover:bg-[#A9803C] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 active:scale-95"
          >
            <Home className="w-4 h-4 text-[#D8BD88]" />
            <span>{language === 'ar' ? 'الرئيسية' : 'Home'}</span>
          </Link>

          <Link
            href="/shop"
            className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#FAF6F0] hover:bg-[#EFE7DB] text-[#4A4237] text-xs font-bold transition-all border border-[#DCD4C7] flex items-center gap-2 active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-[#A9803C]" />
            <span>{language === 'ar' ? 'تصفح المتجر' : 'Browse Shop'}</span>
          </Link>

          <a
            href="#consultation"
            className="min-h-[44px] px-6 py-2.5 rounded-xl bg-white hover:bg-neutral-50 text-[#1C1A17] text-xs font-bold transition-all border border-[#DCD4C7] flex items-center gap-2 active:scale-95"
          >
            <PhoneCall className="w-4 h-4 text-[#A9803C]" />
            <span>{language === 'ar' ? 'طلب استشارة' : 'Free Consultation'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
