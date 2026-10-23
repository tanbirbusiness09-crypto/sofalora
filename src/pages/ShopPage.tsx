import React, { useState, useMemo } from 'react';
import { useShop } from '../context/LanguageContext';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { FilterState, SortOption, Product } from '../types';
import { Breadcrumbs } from '../components/PLP/Breadcrumbs';
import { CategoryHero } from '../components/PLP/CategoryHero';
import { ProductFilters } from '../components/PLP/ProductFilters';
import { ProductSortToolbar } from '../components/PLP/ProductSortToolbar';
import { ProductGrid } from '../components/PLP/ProductGrid';
import { Link } from '../context/RouterContext';
import { Phone, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';

const INITIAL_FILTERS: FilterState = {
  categories: [],
  subcategories: [],
  collections: [],
  priceRange: [0, 25000],
  colors: [],
  fabrics: [],
  patterns: [],
  lightControls: [],
  rooms: [],
  inStockOnly: false,
  onSaleOnly: false
};

export const ShopPage: React.FC = () => {
  const { language, direction } = useShop();
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.categorySlug));
    }

    // Price filter
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Color filter
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

    // Fabric filter
    if (filters.fabrics.length > 0) {
      result = result.filter((p) => {
        if (!p.fabric) return false;
        const fabEn = p.fabric.en.toLowerCase();
        const fabAr = p.fabric.ar.toLowerCase();
        return filters.fabrics.some(
          (f) => fabEn.includes(f) || fabAr.includes(f)
        );
      });
    }

    // Light Control filter
    if (filters.lightControls.length > 0) {
      result = result.filter((p) => {
        if (!p.lightControl) return false;
        return filters.lightControls.includes(p.lightControl);
      });
    }

    // Room filter
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

    // In Stock Only
    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // On Sale Only
    if (filters.onSaleOnly) {
      result = result.filter((p) => p.isSale || (p.discount && p.discount > 0) || p.oldPrice);
    }

    // Sort
    switch (sortOption) {
      case 'bestsellers':
      case 'best-selling':
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || b.reviews - a.reviews);
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
        result.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
        break;
      case 'featured':
      case 'recommended':
      default:
        // Keep catalog order
        break;
    }

    return result;
  }, [filters, sortOption]);

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const Arrow = direction === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div className="bg-[#FDFCFA] min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Breadcrumb */}
        <Breadcrumbs
          items={[
            {
              label: { en: 'All Sofas & Curtains', ar: 'كافة الكنب والستائر' }
            }
          ]}
        />

        {/* Hero Banner */}
        <CategoryHero
          customTitle={{
            en: 'The Complete Sofalora Collection',
            ar: 'المجموعة الكاملة لسوفالورا'
          }}
          customSubtitle={{
            en: 'Discover sculpted sofas, majlis seating, modular sectionals, and tailored blackout and sheer curtains designed for Saudi villas and contemporary homes.',
            ar: 'اكتشف الكنب المنحوت وجلسات المجالس والكنب المقسم والستائر المعتمة والشفافة المفصلة خصيصاً للفلل والمنازل السعودية العصرية.'
          }}
          customImage="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1600&auto=format&fit=crop"
          itemCount={PRODUCTS.length}
        />

        {/* Quick Category Jump Strip */}
        <div className="mb-8 overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center gap-2.5 min-w-max">
            {CATEGORIES.slice(0, 8).map((cat) => {
              const isSelected = filters.categories.includes(cat.slug);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    const newCats = isSelected
                      ? filters.categories.filter((c) => c !== cat.slug)
                      : [...filters.categories, cat.slug];
                    setFilters({ ...filters, categories: newCats });
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
                    isSelected
                      ? 'bg-[#0A2A5E] text-white border-[#0A2A5E] shadow-sm'
                      : 'bg-white text-[#4B5563] border-[#E3DED2] hover:border-[#0A2A5E]'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: isSelected ? '#C6A15B' : '#D2CCC1' }}
                  />
                  <span>{cat.title[language]}</span>
                  <span className="text-[10px] opacity-70">({cat.itemCount})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 2-Column PLP Layout: Filters Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 bg-white rounded-2xl border border-[#E7E2D8] p-5 sticky top-24 shadow-sm">
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
            {/* Sort & View Controls */}
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

            {/* Product Cards Grid */}
            <ProductGrid
              products={filteredProducts}
              viewMode={viewMode}
              onResetFilters={handleResetFilters}
            />

            {/* Riyadh Consultation Banner */}
            <div className="mt-12 bg-gradient-to-r from-[#101828] to-[#1F2937] rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
              <div className="space-y-2 text-center sm:text-start">
                <span className="text-xs uppercase tracking-widest text-[#C6A15B] font-semibold">
                  {language === 'ar' ? 'خدمة مخصصة لمدينة الرياض' : 'Riyadh Bespoke Service'}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  {language === 'ar'
                    ? 'هل تحتاج استشارة خبير أو رفع مقاسات في فلتك؟'
                    : 'Need In-Home Sizing & Design Advice for Your Villa?'}
                </h3>
                <p className="text-xs sm:text-sm text-[#D2CCC1] max-w-xl">
                  {language === 'ar'
                    ? 'يزوركم خبير سوفالورا مع عينات الأقمشة الطبيعية والمخمل والشيفونات مجاناً داخل مدينة الرياض.'
                    : 'Our certified master draper visits your location with physical textile catalogs and precision laser measurements at zero cost.'}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href="tel:+966500000000"
                  className="px-5 py-3 rounded-xl bg-[#0A2A5E] hover:bg-[#C6A15B] text-white text-xs font-semibold transition-colors flex items-center gap-2 shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{language === 'ar' ? 'احجز زيارة مجانية' : 'Book Free Visit'}</span>
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileFiltersOpen(false)}
          />

          {/* Drawer Body */}
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
