import React from 'react';
import { PackageOpen, RefreshCw, WifiOff } from 'lucide-react';
import { useShop } from '../../context/LanguageContext';
import { useCatalog } from '../../context/CatalogContext';
import { Link } from '../../context/RouterContext';

interface CatalogStateProps {
  compact?: boolean;
  className?: string;
}

/** Shown when the store has no products at all yet. */
export const CatalogEmptyState: React.FC<CatalogStateProps> = ({ compact = false, className = '' }) => {
  const { language } = useShop();
  const isAr = language === 'ar';

  return (
    <div
      className={`bg-white rounded-2xl border border-[#EAE6DE] text-center mx-auto ${
        compact ? 'p-6 sm:p-8' : 'p-10 sm:p-16 max-w-2xl my-8'
      } ${className}`}
    >
      <div className="w-14 h-14 rounded-full bg-[#FAF8F3] text-[#0B2345] flex items-center justify-center mx-auto mb-4">
        <PackageOpen className="w-7 h-7" />
      </div>
      <h3 className={`${compact ? 'text-lg' : 'text-xl sm:text-2xl'} font-serif font-bold text-[#101828] mb-2`}>
        {isAr ? 'لا توجد منتجات بعد' : 'No products yet'}
      </h3>
      <p className="text-sm text-[#475467] max-w-md mx-auto leading-relaxed">
        {isAr
          ? 'نعمل على تجهيز تشكيلتنا. يرجى العودة قريباً.'
          : 'Our collection is being prepared. Please check back soon.'}
      </p>
      {!compact && (
        <Link
          href="/"
          className="inline-block mt-6 px-5 py-2.5 bg-[#F7F5F0] hover:bg-[#EEEAE2] text-[#475467] text-xs font-semibold rounded-xl transition-colors"
        >
          {isAr ? 'العودة للرئيسية' : 'Back to Home'}
        </Link>
      )}
    </div>
  );
};

/** Shown when the commerce API cannot be reached. */
export const CatalogErrorState: React.FC<CatalogStateProps> = ({ compact = false, className = '' }) => {
  const { language } = useShop();
  const { reload } = useCatalog();
  const isAr = language === 'ar';

  return (
    <div
      className={`bg-white rounded-2xl border border-[#EAE6DE] text-center mx-auto ${
        compact ? 'p-6 sm:p-8' : 'p-10 sm:p-16 max-w-2xl my-8'
      } ${className}`}
    >
      <div className="w-14 h-14 rounded-full bg-[#FDF2F2] text-[#B59460] flex items-center justify-center mx-auto mb-4">
        <WifiOff className="w-7 h-7" />
      </div>
      <h3 className={`${compact ? 'text-lg' : 'text-xl sm:text-2xl'} font-serif font-bold text-[#101828] mb-2`}>
        {isAr ? 'تعذر تحميل المنتجات' : "We couldn't load products"}
      </h3>
      <p className="text-sm text-[#475467] max-w-md mx-auto leading-relaxed mb-5">
        {isAr ? 'يرجى التحقق من الاتصال والمحاولة مرة أخرى.' : 'Please check your connection and try again.'}
      </p>
      <button
        type="button"
        onClick={reload}
        className="px-5 py-2.5 bg-[#0B2345] hover:bg-[#071A35] text-white text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-2 shadow-sm"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>{isAr ? 'إعادة المحاولة' : 'Try again'}</span>
      </button>
    </div>
  );
};
