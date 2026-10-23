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
      <div className="max-w-xl w-full bg-white rounded-3xl border border-[#E5E1D8] p-8 sm:p-12 shadow-sm text-center">
        {/* Decorative Badge */}
        <div className="w-20 h-20 rounded-full bg-[#FAF8F3] text-[#0A2A5E] flex items-center justify-center mx-auto mb-6 shadow-inner">
          <Compass className="w-10 h-10 animate-pulse" />
        </div>

        <span className="text-xs font-bold text-[#0A2A5E] tracking-widest uppercase">
          {language === 'ar' ? 'خطأ ٤٠٤ • الصفحة غير موجودة' : 'Error 404 • Page Not Found'}
        </span>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#101828] mt-2 mb-3">
          {language === 'ar'
            ? 'عذراً، لم نتمكن من العثور على هذه الصفحة'
            : 'We Couldn’t Find the Page You’re Looking For'}
        </h1>

        <p className="text-sm text-[#667085] leading-relaxed mb-8 max-w-md mx-auto">
          {language === 'ar'
            ? 'ربما تم نقل الرابط أو حذفه أو كتابة العنوان بشكل غير دقيق. يمكنك البحث أدناه أو العودة لتصفح الكنب والستائر.'
            : 'The link might have moved or the address was typed incorrectly. You can search below or explore our sofas and curtains.'}
        </p>

        {/* Quick Search */}
        <form onSubmit={handleSearchSubmit} className="relative max-w-md mx-auto mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'ar' ? 'ابحث عن كنب، مجلس، ستائر...' : 'Search sofas, majlis, curtains...'}
            className="w-full bg-[#FDFCFA] border border-[#D8D2C6] rounded-full py-3 ps-11 pe-24 text-sm text-[#101828] placeholder-[#667085] focus:outline-none focus:border-[#0A2A5E] focus:ring-2 focus:ring-[#0A2A5E]/20 shadow-2xs"
          />
          <Search className="w-4 h-4 text-[#667085] absolute start-4 top-3.5" />
          <button
            type="submit"
            className="absolute end-1.5 top-1.5 bottom-1.5 px-4 rounded-full bg-[#0A2A5E] text-white text-xs font-semibold hover:bg-[#061C3F] transition-colors"
          >
            {language === 'ar' ? 'بحث' : 'Search'}
          </button>
        </form>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#0A2A5E] hover:bg-[#061C3F] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 active:scale-95"
          >
            <Home className="w-4 h-4 text-[#E3C98F]" />
            <span>{language === 'ar' ? 'الرئيسية' : 'Home'}</span>
          </Link>

          <Link
            href="/shop"
            className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#F7F5F0] hover:bg-[#EEEAE2] text-[#475467] text-xs font-bold transition-all border border-[#D8D2C6] flex items-center gap-2 active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-[#0A2A5E]" />
            <span>{language === 'ar' ? 'تصفح المتجر' : 'Browse Shop'}</span>
          </Link>

          <a
            href="#consultation"
            className="min-h-[44px] px-6 py-2.5 rounded-xl bg-white hover:bg-neutral-50 text-[#101828] text-xs font-bold transition-all border border-[#D8D2C6] flex items-center gap-2 active:scale-95"
          >
            <PhoneCall className="w-4 h-4 text-[#0A2A5E]" />
            <span>{language === 'ar' ? 'طلب استشارة' : 'Free Consultation'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
