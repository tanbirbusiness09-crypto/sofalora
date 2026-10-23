import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { useShop } from '../../context/LanguageContext';
import { Link } from '../../context/RouterContext';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  viewMode?: 'grid' | 'list';
  onResetFilters?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading = false,
  viewMode = 'grid',
  onResetFilters
}) => {
  const { language } = useShop();

  // Loading skeleton
  if (isLoading) {
    return (
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'
            : 'space-y-4'
        }
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-[#EAE6DE] p-4 animate-pulse space-y-3"
          >
            <div className="aspect-[3/4] bg-[#EBE7DE] rounded-lg w-full" />
            <div className="h-3 bg-[#EBE7DE] rounded w-1/3" />
            <div className="h-4 bg-[#EBE7DE] rounded w-3/4" />
            <div className="h-3 bg-[#EBE7DE] rounded w-1/2" />
            <div className="h-6 bg-[#EBE7DE] rounded w-1/3 pt-2" />
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#EAE6DE] p-10 sm:p-16 text-center max-w-2xl mx-auto my-8">
        <div className="w-16 h-16 rounded-full bg-[#FAF8F3] text-[#0A2A5E] flex items-center justify-center mx-auto mb-4">
          <SearchX className="w-8 h-8" />
        </div>

        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#101828] mb-2">
          {language === 'ar' ? 'لم يتم العثور على منتجات مطابقة' : 'No Products Match Your Criteria'}
        </h3>

        <p className="text-sm text-[#475467] mb-6 max-w-md mx-auto leading-relaxed">
          {language === 'ar'
            ? 'يرجى تجربة تخفيف معايير التصفية أو تغيير نطاق الأسعار أو البحث عن تصنيف آخر.'
            : 'Try adjusting your filters, expanding your price range, or exploring other sofas and curtains.'}
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          {onResetFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="px-5 py-2.5 bg-[#0A2A5E] hover:bg-[#061C3F] text-white text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-2 shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'إعادة ضبط كل الفلاتر' : 'Reset All Filters'}</span>
            </button>
          )}

          <Link
            href="/shop"
            className="px-5 py-2.5 bg-[#F7F5F0] hover:bg-[#EEEAE2] text-[#475467] text-xs font-semibold rounded-xl transition-colors"
          >
            {language === 'ar' ? 'تصفح كل المنتجات' : 'Browse All Products'}
          </Link>
        </div>

        {/* Popular Category Shortcuts */}
        <div className="mt-8 pt-6 border-t border-[#ECE8DF]">
          <span className="text-xs text-[#667085] block mb-2">
            {language === 'ar' ? 'أو تصفح الفئات الأكثر طلباً في الرياض:' : 'Or explore top Riyadh collections:'}
          </span>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Link
              href="/category/sofas"
              className="text-xs px-3 py-1 rounded-full bg-[#F7F5F0] hover:bg-[#061C3F] hover:text-white transition-colors text-[#475467]"
            >
              {language === 'ar' ? 'الكنب' : 'Sofas'}
            </Link>
            <Link
              href="/category/majlis-sofas"
              className="text-xs px-3 py-1 rounded-full bg-[#F7F5F0] hover:bg-[#061C3F] hover:text-white transition-colors text-[#475467]"
            >
              {language === 'ar' ? 'المجالس' : 'Majlis'}
            </Link>
            <Link
              href="/category/blackout-curtains"
              className="text-xs px-3 py-1 rounded-full bg-[#F7F5F0] hover:bg-[#061C3F] hover:text-white transition-colors text-[#475467]"
            >
              {language === 'ar' ? 'الستائر المعتمة' : 'Blackout Curtains'}
            </Link>
            <Link
              href="/category/custom-curtains"
              className="text-xs px-3 py-1 rounded-full bg-[#F7F5F0] hover:bg-[#061C3F] hover:text-white transition-colors text-[#475467]"
            >
              {language === 'ar' ? 'ستائر حسب الطلب' : 'Custom Curtains'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        viewMode === 'grid'
          ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6'
          : 'space-y-4'
      }
    >
      {products.map((prod, idx) => (
        <ProductCard
          key={prod.id}
          product={prod}
          viewMode={viewMode}
          priorityImage={idx < 4}
        />
      ))}
    </div>
  );
};
