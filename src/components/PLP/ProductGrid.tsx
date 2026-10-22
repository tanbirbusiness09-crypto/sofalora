import React, { useState } from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { QuickViewModal } from './QuickViewModal';
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
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

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
            className="bg-white rounded-xl border border-[#EBE6DD] p-4 animate-pulse space-y-3"
          >
            <div className="aspect-[3/4] bg-[#ECE3D7] rounded-lg w-full" />
            <div className="h-3 bg-[#ECE3D7] rounded w-1/3" />
            <div className="h-4 bg-[#ECE3D7] rounded w-3/4" />
            <div className="h-3 bg-[#ECE3D7] rounded w-1/2" />
            <div className="h-6 bg-[#ECE3D7] rounded w-1/3 pt-2" />
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#EBE6DD] p-10 sm:p-16 text-center max-w-2xl mx-auto my-8">
        <div className="w-16 h-16 rounded-full bg-[#FAF5EE] text-[#8F3E24] flex items-center justify-center mx-auto mb-4">
          <SearchX className="w-8 h-8" />
        </div>

        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1B211D] mb-2">
          {language === 'ar' ? 'لم يتم العثور على منتجات مطابقة' : 'No Products Match Your Criteria'}
        </h3>

        <p className="text-sm text-[#70665B] mb-6 max-w-md mx-auto leading-relaxed">
          {language === 'ar'
            ? 'يرجى تجربة تخفيف معايير التصفية أو تغيير نطاق الأسعار أو البحث عن تصنيف آخر.'
            : 'Try adjusting your filters, expanding your price range, or exploring other sofas and curtains.'}
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          {onResetFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="px-5 py-2.5 bg-[#1B211D] hover:bg-[#8F3E24] text-white text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-2 shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'إعادة ضبط كل الفلاتر' : 'Reset All Filters'}</span>
            </button>
          )}

          <Link
            href="/shop"
            className="px-5 py-2.5 bg-[#FAF6F0] hover:bg-[#EFE7DB] text-[#454D47] text-xs font-semibold rounded-xl transition-colors"
          >
            {language === 'ar' ? 'تصفح كل المنتجات' : 'Browse All Products'}
          </Link>
        </div>

        {/* Popular Category Shortcuts */}
        <div className="mt-8 pt-6 border-t border-[#EDE4D9]">
          <span className="text-xs text-[#877C71] block mb-2">
            {language === 'ar' ? 'أو تصفح الفئات الأكثر طلباً في الرياض:' : 'Or explore top Riyadh collections:'}
          </span>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Link
              href="/category/sofas"
              className="text-xs px-3 py-1 rounded-full bg-[#FAF6F0] hover:bg-[#8F3E24] hover:text-white transition-colors text-[#4F5851]"
            >
              {language === 'ar' ? 'الكنب' : 'Sofas'}
            </Link>
            <Link
              href="/category/majlis-sofas"
              className="text-xs px-3 py-1 rounded-full bg-[#FAF6F0] hover:bg-[#8F3E24] hover:text-white transition-colors text-[#4F5851]"
            >
              {language === 'ar' ? 'المجالس' : 'Majlis'}
            </Link>
            <Link
              href="/category/blackout-curtains"
              className="text-xs px-3 py-1 rounded-full bg-[#FAF6F0] hover:bg-[#8F3E24] hover:text-white transition-colors text-[#4F5851]"
            >
              {language === 'ar' ? 'الستائر المعتمة' : 'Blackout Curtains'}
            </Link>
            <Link
              href="/category/custom-curtains"
              className="text-xs px-3 py-1 rounded-full bg-[#FAF6F0] hover:bg-[#8F3E24] hover:text-white transition-colors text-[#4F5851]"
            >
              {language === 'ar' ? 'ستائر حسب الطلب' : 'Custom Curtains'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
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
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        ))}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
};
