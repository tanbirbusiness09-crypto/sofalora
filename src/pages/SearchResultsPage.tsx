import React, { useState, useMemo } from 'react';
import { useShop } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { FilterState, SortOption, Product } from '../types';
import { Breadcrumbs } from '../components/PLP/Breadcrumbs';
import { ProductFilters } from '../components/PLP/ProductFilters';
import { ProductSortToolbar } from '../components/PLP/ProductSortToolbar';
import { ProductGrid } from '../components/PLP/ProductGrid';
import { Search, Sparkles, X, RotateCcw } from 'lucide-react';

const INITIAL_FILTERS: FilterState = {
  categories: [],
  subcategories: [],
  collections: [],
  priceRange: [0, 1200],
  colors: [],
  fabrics: [],
  patterns: [],
  lightControls: [],
  rooms: [],
  inStockOnly: false,
  onSaleOnly: false
};

const SUGGESTED_SEARCHES = [
  { en: 'Blackout', ar: 'بلاك أوت' },
  { en: 'Velvet', ar: 'مخمل' },
  { en: 'Wave Curtain', ar: 'ستائر ويف' },
  { en: 'Italian Sheer', ar: 'شيفون إيطالي' },
  { en: 'Motorized', ar: 'محرك ذكي' },
  { en: 'Linen', ar: 'كتان' },
  { en: 'Majlis', ar: 'مجلس' },
  { en: 'Track', ar: 'مجرى مخفي' }
];

export const SearchResultsPage: React.FC = () => {
  const { language } = useShop();
  const { route, navigate } = useRouter();

  const initialQuery = route.query.q || '';
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);

  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setActiveQuery(searchTerm.trim());
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`, { scroll: false });
    }
  };

  const handleSuggestedClick = (term: string) => {
    setSearchTerm(term);
    setActiveQuery(term);
    navigate(`/search?q=${encodeURIComponent(term)}`, { scroll: false });
  };

  // Search matching logic
  const searchResults = useMemo(() => {
    const q = activeQuery.toLowerCase().trim();
    if (!q) return PRODUCTS;

    return PRODUCTS.filter((p) => {
      const matchNameEn = p.name.en.toLowerCase().includes(q);
      const matchNameAr = p.name.ar.toLowerCase().includes(q);
      const matchCatEn = p.category.en.toLowerCase().includes(q);
      const matchCatAr = p.category.ar.toLowerCase().includes(q);
      const matchSubEn = p.subcategory?.en.toLowerCase().includes(q);
      const matchSubAr = p.subcategory?.ar.toLowerCase().includes(q);
      const matchDescEn = p.description.en.toLowerCase().includes(q);
      const matchDescAr = p.description.ar.toLowerCase().includes(q);
      const matchFabricEn = p.fabric?.en.toLowerCase().includes(q);
      const matchFabricAr = p.fabric?.ar.toLowerCase().includes(q);
      const matchRoomEn = p.room?.en.toLowerCase().includes(q);
      const matchRoomAr = p.room?.ar.toLowerCase().includes(q);

      return (
        matchNameEn ||
        matchNameAr ||
        matchCatEn ||
        matchCatAr ||
        matchSubEn ||
        matchSubAr ||
        matchDescEn ||
        matchDescAr ||
        matchFabricEn ||
        matchFabricAr ||
        matchRoomEn ||
        matchRoomAr
      );
    });
  }, [activeQuery]);

  // Secondary Filters
  const filteredProducts = useMemo(() => {
    let result = [...searchResults];

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.categorySlug));
    }

    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    if (filters.colors.length > 0) {
      result = result.filter((p) => {
        if (!p.colors) return false;
        return p.colors.some((c) =>
          filters.colors.some((filterCol) =>
            c.id.toLowerCase().includes(filterCol) ||
            c.name.en.toLowerCase().includes(filterCol) ||
            c.name.ar.includes(filterCol)
          )
        );
      });
    }

    if (filters.fabrics.length > 0) {
      result = result.filter((p) => {
        if (!p.fabric) return false;
        const fabEn = p.fabric.en.toLowerCase();
        const fabAr = p.fabric.ar.toLowerCase();
        return filters.fabrics.some((f) => fabEn.includes(f) || fabAr.includes(f));
      });
    }

    if (filters.lightControls.length > 0) {
      result = result.filter((p) => {
        if (!p.lightControl) return false;
        return filters.lightControls.includes(p.lightControl);
      });
    }

    if (filters.rooms.length > 0) {
      result = result.filter((p) => {
        if (!p.room) return false;
        const roomEn = p.room.en.toLowerCase();
        const roomAr = p.room.ar.toLowerCase();
        return filters.rooms.some(
          (r: string) => roomEn.includes(r) || roomAr.includes(r)
        );
      });
    }

    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    if (filters.onSaleOnly) {
      result = result.filter((p) => p.isSale || (p.discount && p.discount > 0) || p.oldPrice);
    }

    switch (sortOption) {
      case 'bestsellers':
      case 'best-selling':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'price-asc':
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
      case 'highest-rated':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      case 'recommended':
      default:
        break;
    }

    return result;
  }, [searchResults, filters, sortOption]);

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Breadcrumb */}
        <Breadcrumbs
          items={[
            {
              label: { en: 'Search Results', ar: 'نتائج البحث' }
            }
          ]}
        />

        {/* Search Header Banner */}
        <div className="bg-white rounded-2xl border border-[#ECE6DD] p-6 sm:p-8 mb-8 shadow-sm">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1A17] mb-2">
              {language === 'ar' ? 'البحث في كتالوج ستائر محمد' : 'Search Mohammad Curtains'}
            </h1>
            <p className="text-xs sm:text-sm text-[#73685C] mb-5">
              {language === 'ar'
                ? 'ابحث بالاسم أو الخامة (مخمل، كتان، شيفون) أو نوع العزل أو السكك الذكية'
                : 'Search by drapery name, fabric type, light filtration, or smart motorized systems.'}
            </p>

            {/* Search Input Bar */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  language === 'ar'
                    ? 'مثال: ستائر بلاك أوت، مخمل ملكي، مجرى ويف، ستارة رول...'
                    : 'e.g. Royal blackout, velvet, wave track, roller blinds...'
                }
                className="w-full py-3.5 ps-11 pe-24 bg-[#FAF7F2] border border-[#DCD4C7] rounded-xl text-sm text-[#1C1A17] placeholder-[#9E9385] focus:outline-none focus:border-[#A9803C] focus:bg-white shadow-inner transition-all"
              />
              <Search className="w-5 h-5 text-[#8E8377] absolute start-3.5 top-1/2 -translate-y-1/2" />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute end-20 top-1/2 -translate-y-1/2 text-[#8E8377] hover:text-black p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="absolute end-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#1C1A17] hover:bg-[#A9803C] text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
              >
                {language === 'ar' ? 'بحث' : 'Search'}
              </button>
            </form>

            {/* Popular Suggested Search Tags */}
            <div className="flex items-center justify-center gap-1.5 flex-wrap text-xs text-[#827568]">
              <span className="me-1 font-medium text-[#4A4237]">
                {language === 'ar' ? 'كلمات شائعة:' : 'Popular:'}
              </span>
              {SUGGESTED_SEARCHES.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSuggestedClick(item[language])}
                  className="px-2.5 py-1 rounded-full bg-[#FAF6F0] hover:bg-[#A9803C] hover:text-white text-[#554D43] transition-colors border border-[#ECE4D8]"
                >
                  {item[language]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Query Result Summary */}
        {activeQuery && (
          <div className="mb-6 flex items-center justify-between flex-wrap gap-2 text-sm text-[#554D43]">
            <div>
              {language === 'ar' ? (
                <>
                  نتائج البحث عن: <strong className="text-[#1C1A17]">"{activeQuery}"</strong> (
                  <span className="text-[#A9803C] font-semibold">{filteredProducts.length}</span> نتيجة)
                </>
              ) : (
                <>
                  Search results for: <strong className="text-[#1C1A17]">"{activeQuery}"</strong> (
                  <span className="text-[#A9803C] font-semibold">{filteredProducts.length}</span> items)
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setActiveQuery('');
                navigate('/search', { scroll: false });
              }}
              className="text-xs text-[#A9803C] hover:underline flex items-center gap-1 font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'عرض كافة المنتجات' : 'View all products'}</span>
            </button>
          </div>
        )}

        {/* 2-Column PLP Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 bg-white rounded-2xl border border-[#ECE6DD] p-5 sticky top-24 shadow-sm">
            <ProductFilters
              categories={CATEGORIES}
              filters={filters}
              onFilterChange={setFilters}
              onResetFilters={handleResetFilters}
              totalResultsCount={filteredProducts.length}
            />
          </aside>

          {/* Product Listing Area */}
          <main className="lg:col-span-3">
            <ProductSortToolbar
              totalCount={filteredProducts.length}
              sortOption={sortOption}
              onSortChange={setSortOption}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
              filters={filters}
              onFilterChange={setFilters}
              onResetFilters={handleResetFilters}
              categories={CATEGORIES}
            />

            <ProductGrid
              products={filteredProducts}
              viewMode={viewMode}
              onResetFilters={handleResetFilters}
            />
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="relative z-10 w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col ms-auto">
            <ProductFilters
              categories={CATEGORIES}
              filters={filters}
              onFilterChange={setFilters}
              onResetFilters={handleResetFilters}
              isMobileDrawer={true}
              onCloseMobileDrawer={() => setIsMobileFiltersOpen(false)}
              totalResultsCount={filteredProducts.length}
            />
          </div>
        </div>
      )}
    </div>
  );
};
