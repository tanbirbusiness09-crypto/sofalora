import React, { useState, useMemo } from 'react';
import { useShop } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { FilterState, SortOption, Category } from '../types';
import { Breadcrumbs } from '../components/PLP/Breadcrumbs';
import { CategoryHero } from '../components/PLP/CategoryHero';
import { ProductFilters } from '../components/PLP/ProductFilters';
import { ProductSortToolbar } from '../components/PLP/ProductSortToolbar';
import { ProductGrid } from '../components/PLP/ProductGrid';
import { Calendar, Phone } from 'lucide-react';

// Category-specific subcategories for interactive hero pills
const CATEGORY_SUBCATEGORIES: Record<string, { slug: string; name: { en: string; ar: string } }[]> = {
  'blackout-curtains': [
    { slug: 'triple-weave', name: { en: 'Triple Weave', ar: 'نسيج ثلاثي' } },
    { slug: 'thermal', name: { en: 'Thermal Velvet', ar: 'مخمل حراري' } },
    { slug: 's-wave-blackout', name: { en: 'S-Wave Track', ar: 'ويف انسيابي' } },
    { slug: 'hotel-blackout', name: { en: 'Hotel Grade', ar: 'فندقي فاخر' } }
  ],
  'curtains': [
    { slug: 'velvet-drapes', name: { en: 'Heritage Velvet', ar: 'مخمل ملكي' } },
    { slug: 'linen-drapes', name: { en: 'Belgian Linen', ar: 'كتان بلجيكي' } },
    { slug: 'jacquard', name: { en: 'Royal Jacquard', ar: 'جاكار مطرز' } }
  ],
  'sheer-curtains': [
    { slug: 'organza-sheer', name: { en: 'Italian Organza', ar: 'أورجانزا إيطالي' } },
    { slug: 'linen-sheer', name: { en: 'Linen Texture', ar: 'شيفون كتاني' } }
  ],
  'roller-blinds': [
    { slug: 'sunscreen', name: { en: 'UV Sunscreen', ar: 'حماية من الشمس' } },
    { slug: 'motorized', name: { en: 'Smart Motorized', ar: 'ذكية بمحرك' } },
    { slug: 'waterproof', name: { en: 'Waterproof Aluminum', ar: 'مقاومة للرطوبة' } }
  ],
  'roman-blinds': [
    { slug: 'classic-folds', name: { en: 'Classic Folds', ar: 'طيات كلاسيكية' } },
    { slug: 'kids-cordless', name: { en: 'Cordless Safety', ar: 'آمنة للأطفال' } }
  ],
  'zebra-blinds': [
    { slug: 'dual-phase', name: { en: 'Day & Night Dual', ar: 'نهارية وليلية' } }
  ],
  'custom-curtains': [
    { slug: 'wave-track', name: { en: 'Bespoke S-Wave', ar: 'انسيابية ويف' } },
    { slug: 'heritage', name: { en: 'Najdi Heritage', ar: 'تراث نجدي' } }
  ],
  'ready-made-curtains': [
    { slug: 'ready-pleat', name: { en: 'Pinch Pleat Panels', ar: 'طيات فرنسية جاهزة' } }
  ],
  'accessories': [
    { slug: 'tracks', name: { en: 'Ceiling Tracks', ar: 'سكك أسقف' } },
    { slug: 'rods', name: { en: 'Brass Rods', ar: 'قضبان نحاسية' } },
    { slug: 'motors', name: { en: 'Smart Motors', ar: 'محركات ذكية' } },
    { slug: 'tiebacks', name: { en: 'Tiebacks', ar: 'أربطة ستائر' } },
    { slug: 'rings', name: { en: 'Silent Rings', ar: 'حلقات صامتة' } }
  ]
};

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

interface CategoryPageProps {
  slug?: string;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ slug: propSlug }) => {
  const { language } = useShop();
  const { route } = useRouter();

  // Determine current category slug from props or router
  const categorySlug = propSlug || route.params.slug || 'curtains';

  // Find category meta
  const currentCategory: Category = useMemo(() => {
    return (
      CATEGORIES.find((c) => c.slug === categorySlug) || {
        id: categorySlug,
        slug: categorySlug,
        title: { en: 'Collection', ar: 'المجموعة' },
        subtitle: { en: 'Explore premium tailored window drapes', ar: 'تصفح تشكيلة الستائر الفاخرة' },
        itemCount: 20,
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop'
      }
    );
  }, [categorySlug]);

  const [activeSubcategory, setActiveSubcategory] = useState<string>('all');
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Available subcategories for this category
  const subcategories = CATEGORY_SUBCATEGORIES[categorySlug] || [];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    // 1. Must match current category
    let result = PRODUCTS.filter((p) => {
      // If product categorySlug equals this category
      if (p.categorySlug === categorySlug) return true;
      // Or if this category is 'curtains', also include other curtain sub-types
      if (categorySlug === 'curtains') {
        return ['curtains', 'blackout-curtains', 'sheer-curtains', 'custom-curtains', 'ready-made-curtains'].includes(p.categorySlug);
      }
      return false;
    });

    // 2. Subcategory filter from hero tabs
    if (activeSubcategory && activeSubcategory !== 'all') {
      result = result.filter(
        (p) => p.subcategorySlug === activeSubcategory
      );
    }

    // 3. Price filter
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // 4. Color filter
    if (filters.colors.length > 0) {
      result = result.filter((p) => {
        if (!p.colors) return false;
        return p.colors.some((c) =>
          filters.colors.some(
            (filterCol) =>
              c.id.toLowerCase().includes(filterCol) ||
              c.name.en.toLowerCase().includes(filterCol) ||
              c.name.ar.includes(filterCol)
          )
        );
      });
    }

    // 5. Fabric filter
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

    // 6. Light Control filter
    if (filters.lightControls.length > 0) {
      result = result.filter((p) => {
        if (!p.lightControl) return false;
        return filters.lightControls.includes(p.lightControl);
      });
    }

    // 7. Room filter
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

    // 8. In Stock Only
    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // 9. On Sale Only
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
        break;
    }

    return result;
  }, [categorySlug, activeSubcategory, filters, sortOption]);

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setActiveSubcategory('all');
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Breadcrumb navigation */}
        <Breadcrumbs
          items={[
            {
              label: { en: 'Categories', ar: 'الأقسام' },
              href: '/shop'
            },
            {
              label: currentCategory.title
            }
          ]}
        />

        {/* Hero Banner */}
        <CategoryHero
          category={currentCategory}
          itemCount={filteredProducts.length}
          subcategories={subcategories}
          activeSubcategory={activeSubcategory}
          onSubcategorySelect={(slug) => setActiveSubcategory(slug)}
        />

        {/* Main 2-Column PLP Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
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

            {/* Installation & Guarantee Banner */}
            <div className="mt-12 bg-white rounded-2xl border border-[#EBE5DB] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="space-y-1 text-center sm:text-start">
                <span className="text-xs uppercase font-semibold text-[#A9803C] tracking-wider">
                  {language === 'ar' ? 'تفصيل وتركيب دقيق' : 'Custom Sizing & Precision Fitting'}
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#1C1A17]">
                  {language === 'ar'
                    ? `هل ترغب في تفصيل هذه التشكيلة بمقاسات فيلتك الخاصة؟`
                    : `Want custom dimensions for these ${currentCategory.title.en}?`}
                </h3>
                <p className="text-xs text-[#73685C] max-w-lg">
                  {language === 'ar'
                    ? 'فريقنا المتخصص في الرياض يقوم برفع المقاسات وتصميم المجرى المخفي وتفصيل الأقمشة بأعلى معايير الدقة.'
                    : 'Our team delivers on-site laser measurements, motorized track installation, and bespoke finishing across all Riyadh districts.'}
                </p>
              </div>

              <a
                href="tel:+966500000000"
                className="px-5 py-3 rounded-xl bg-[#1C1A17] hover:bg-[#A9803C] text-white text-xs font-semibold transition-colors flex items-center gap-2 shrink-0 shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>{language === 'ar' ? 'طلب زيارة فني مقاسات' : 'Book Measurement Visit'}</span>
              </a>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer Modal */}
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
