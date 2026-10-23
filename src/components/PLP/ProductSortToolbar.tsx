import React from 'react';
import { SlidersHorizontal, LayoutGrid, List, X } from 'lucide-react';
import { SortOption, FilterState, Category } from '../../types';
import { useShop } from '../../context/LanguageContext';

interface ProductSortToolbarProps {
  totalCount: number;
  sortOption: SortOption;
  onSortChange: (newSort: SortOption) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onOpenMobileFilters: () => void;
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  categories: Category[];
}

export const ProductSortToolbar: React.FC<ProductSortToolbarProps> = ({
  totalCount,
  sortOption,
  onSortChange,
  viewMode,
  onViewModeChange,
  onOpenMobileFilters,
  filters,
  onFilterChange,
  onResetFilters,
  categories
}) => {
  const { language } = useShop();

  const activeFiltersCount =
    filters.categories.length +
    filters.colors.length +
    filters.fabrics.length +
    filters.lightControls.length +
    filters.rooms.length +
    (filters.inStockOnly ? 1 : 0) +
    (filters.onSaleOnly ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 1200 ? 1 : 0);

  const removeCategoryFilter = (slug: string) => {
    onFilterChange({
      ...filters,
      categories: filters.categories.filter((c) => c !== slug)
    });
  };

  const removeColorFilter = (colorId: string) => {
    onFilterChange({
      ...filters,
      colors: filters.colors.filter((c) => c !== colorId)
    });
  };

  const removeFabricFilter = (fabricId: string) => {
    onFilterChange({
      ...filters,
      fabrics: filters.fabrics.filter((f) => f !== fabricId)
    });
  };

  const removeLightControlFilter = (lcId: string) => {
    onFilterChange({
      ...filters,
      lightControls: filters.lightControls.filter((l: string) => l !== lcId)
    });
  };

  const removeRoomFilter = (roomId: string) => {
    onFilterChange({
      ...filters,
      rooms: filters.rooms.filter((r: string) => r !== roomId)
    });
  };

  const getCategoryTitle = (slug: string) => {
    const cat = categories.find((c) => c.slug === slug);
    return cat ? cat.title[language] : slug;
  };

  return (
    <div className="bg-white rounded-xl border border-[#E7E2D8] p-3 sm:p-4 mb-6 shadow-sm">
      {/* Top Row: Count, Mobile Filter Trigger, Sort, View Mode */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {/* Left: Total Count & Mobile Trigger */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileFilters}
            className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#F7F5F0] border border-[#D8D2C6] text-xs font-semibold text-[#101828] hover:bg-[#F2EEE7] transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#0A2A5E]" />
            <span>{language === 'ar' ? 'تصفية المنتجات' : 'Filters'}</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#0A2A5E] text-white text-[11px] flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <span className="text-xs sm:text-sm text-[#667085]">
            {language === 'ar' ? (
              <>
                عرض <strong className="text-[#101828] font-semibold">{totalCount}</strong> منتجاً
              </>
            ) : (
              <>
                Showing <strong className="text-[#101828] font-semibold">{totalCount}</strong> items
              </>
            )}
          </span>
        </div>

        {/* Right: Sort and View Switcher */}
        <div className="flex items-center gap-3">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <label htmlFor="sort-select" className="hidden sm:inline text-[#667085]">
              {language === 'ar' ? 'الترتيب حسب:' : 'Sort by:'}
            </label>
            <select
              id="sort-select"
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-[#FDFCFA] border border-[#D8D2C6] text-[#101828] text-xs rounded-lg px-2.5 py-2 font-medium focus:ring-[#0A2A5E] focus:border-[#0A2A5E] cursor-pointer outline-none"
            >
              <option value="featured">
                {language === 'ar' ? 'المقترح والمميز' : 'Featured & Recommended'}
              </option>
              <option value="bestsellers">
                {language === 'ar' ? 'الأكثر مبيعاً في الرياض' : 'Best Sellers'}
              </option>
              <option value="newest">
                {language === 'ar' ? 'وصل حديثاً' : 'Newest Arrivals'}
              </option>
              <option value="price-asc">
                {language === 'ar' ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}
              </option>
              <option value="price-desc">
                {language === 'ar' ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}
              </option>
              <option value="rating">
                {language === 'ar' ? 'الأعلى تقييماً' : 'Highest Customer Rating'}
              </option>
            </select>
          </div>

          {/* View Mode Buttons */}
          <div className="hidden sm:flex items-center border border-[#D8D2C6] rounded-lg overflow-hidden bg-[#FDFCFA]">
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              title={language === 'ar' ? 'عرض شبكي' : 'Grid View'}
              className={`p-1.5 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#0A2A5E] text-white'
                  : 'text-[#475467] hover:text-black hover:bg-[#EFEBE3]'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('list')}
              title={language === 'ar' ? 'عرض قائمة' : 'List View'}
              className={`p-1.5 transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#0A2A5E] text-white'
                  : 'text-[#475467] hover:text-black hover:bg-[#EFEBE3]'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips Bar */}
      {activeFiltersCount > 0 && (
        <div className="mt-3 pt-3 border-t border-[#F0EDE6] flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-[#667085] me-1">
            {language === 'ar' ? 'التصفيات النشطة:' : 'Active Filters:'}
          </span>

          {/* Categories */}
          {filters.categories.map((slug) => (
            <span
              key={slug}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-[#F2EFE9] text-[#475467] border border-[#DED9CE]"
            >
              <span>{getCategoryTitle(slug)}</span>
              <button
                type="button"
                onClick={() => removeCategoryFilter(slug)}
                className="hover:text-black"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {/* Colors */}
          {filters.colors.map((colorId) => (
            <span
              key={colorId}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-[#F2EFE9] text-[#475467] border border-[#DED9CE] capitalize"
            >
              <span>{colorId}</span>
              <button
                type="button"
                onClick={() => removeColorFilter(colorId)}
                className="hover:text-black"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {/* Fabrics */}
          {filters.fabrics.map((fab) => (
            <span
              key={fab}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-[#F2EFE9] text-[#475467] border border-[#DED9CE] capitalize"
            >
              <span>{fab}</span>
              <button
                type="button"
                onClick={() => removeFabricFilter(fab)}
                className="hover:text-black"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {/* Light Control */}
          {filters.lightControls.map((lc: string) => (
            <span
              key={lc}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-[#F2EFE9] text-[#475467] border border-[#DED9CE] capitalize"
            >
              <span>{lc}</span>
              <button
                type="button"
                onClick={() => removeLightControlFilter(lc)}
                className="hover:text-black"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {/* Room suitability */}
          {filters.rooms.map((rm: string) => (
            <span
              key={rm}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-[#F2EFE9] text-[#475467] border border-[#DED9CE] capitalize"
            >
              <span>{rm}</span>
              <button
                type="button"
                onClick={() => removeRoomFilter(rm)}
                className="hover:text-black"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {/* In stock */}
          {filters.inStockOnly && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-[#EAF5EC] text-emerald-800 border border-emerald-200">
              <span>{language === 'ar' ? 'متوفر بالمخزون' : 'In Stock'}</span>
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, inStockOnly: false })}
                className="hover:text-emerald-950"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {/* On sale */}
          {filters.onSaleOnly && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-[#F9F2DF] text-[#8A6A2F] border border-[#E8D7B0]">
              <span>{language === 'ar' ? 'العروض' : 'On Sale'}</span>
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, onSaleOnly: false })}
                className="hover:text-black"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {/* Clear All Button */}
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs text-[#0A2A5E] hover:underline font-semibold ms-2"
          >
            {language === 'ar' ? 'مسح الكل' : 'Clear All'}
          </button>
        </div>
      )}
    </div>
  );
};
