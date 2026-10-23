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
  'sofas': [
    { slug: 'three-seater', name: { en: 'Three-Seater', ar: 'ثلاثة مقاعد' } },
    { slug: 'two-seater', name: { en: 'Two-Seater', ar: 'مقعدان' } },
    { slug: 'l-shape', name: { en: 'L-Shape', ar: 'تصميم L' } },
    { slug: 'modular', name: { en: 'Modular', ar: 'وحدات مرنة' } },
    { slug: 'arabic-majlis', name: { en: 'Majlis', ar: 'مجلس' } },
    { slug: 'accent-chair', name: { en: 'Accent Chairs', ar: 'كراسي مميزة' } },
    { slug: 'pull-out', name: { en: 'Sofa Beds', ar: 'كنب سرير' } }
  ],
  'sectional-sofas': [
    { slug: 'l-shape', name: { en: 'L-Shape', ar: 'تصميم L' } },
    { slug: 'u-shape', name: { en: 'U-Shape', ar: 'تصميم U' } },
    { slug: 'modular', name: { en: 'Modular', ar: 'وحدات مرنة' } }
  ],
  'majlis-sofas': [
    { slug: 'arabic-majlis', name: { en: 'Arabic Majlis', ar: 'مجلس عربي' } },
    { slug: 'floor-majlis', name: { en: 'Floor Seating', ar: 'جلسات أرضية' } }
  ],
  'accent-chairs': [
    { slug: 'accent-chair', name: { en: 'Accent Chair', ar: 'كرسي مميز' } },
    { slug: 'lounge-chair', name: { en: 'Lounge Chair', ar: 'كرسي استرخاء' } },
    { slug: 'recliner', name: { en: 'Recliner', ar: 'كرسي مريح' } }
  ],
  'sofa-beds': [
    { slug: 'pull-out', name: { en: 'Pull-Out', ar: 'قابل للسحب' } },
    { slug: 'storage-sofa', name: { en: 'Storage Sofa', ar: 'كنبة بتخزين' } }
  ],
  'blackout-curtains': [
    { slug: 'triple-weave', name: { en: 'Triple Weave', ar: 'نسيج ثلاثي' } },
    { slug: 'thermal-blackout', name: { en: 'Thermal Velvet', ar: 'مخمل حراري' } },
    { slug: 'linen-blackout', name: { en: 'Linen Blackout', ar: 'كتان معتم' } }
  ],
  'curtains': [
    { slug: 'velvet', name: { en: 'Heritage Velvet', ar: 'مخمل ملكي' } },
    { slug: 'linen', name: { en: 'Belgian Linen', ar: 'كتان بلجيكي' } },
    { slug: 'jacquard', name: { en: 'Royal Jacquard', ar: 'جاكار مطرز' } }
  ],
  'sheer-curtains': [
    { slug: 'organza', name: { en: 'Italian Organza', ar: 'أورجانزا إيطالي' } },
    { slug: 'linen-sheer', name: { en: 'Linen Texture', ar: 'شيفون كتاني' } },
    { slug: 'lace', name: { en: 'Lace Detail', ar: 'تفاصيل دانتيل' } }
  ],
  'custom-curtains': [
    { slug: 's-wave', name: { en: 'Bespoke S-Wave', ar: 'انسيابية ويف' } },
    { slug: 'couture', name: { en: 'Couture Tailoring', ar: 'خياطة كوتور' } }
  ],
  'ready-made-curtains': [
    { slug: 'eyelet', name: { en: 'Eyelet Panels', ar: 'ستائر حلقات جاهزة' } }
  ]
};

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

interface CategoryPageProps {
  slug?: string;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ slug: propSlug }) => {
  const { language } = useShop();
  const { route } = useRouter();

  // Determine current category slug from props or router
  const categorySlug = propSlug || route.params.slug || 'sofas';

  // Find category meta
  const currentCategory: Category = useMemo(() => {
    return (
      CATEGORIES.find((c) => c.slug === categorySlug) || {
        id: categorySlug,
        slug: categorySlug,
        title: { en: 'Sofas & Curtains', ar: 'الكنب والستائر' },
        subtitle: { en: 'Explore tailored seating and window couture', ar: 'تصفح الكنب والستائر المفصلة' },
        itemCount: 20,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop'
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
      // Aggregation pages: all sofas
      if (categorySlug === 'sofas') {
        return ['sofas', 'sectional-sofas', 'majlis-sofas', 'accent-chairs', 'sofa-beds'].includes(p.categorySlug);
      }
      // Or if this category is 'curtains', also include other curtain sub-types
      if (categorySlug === 'curtains') {
        return ['curtains', 'blackout-curtains', 'sheer-curtains', 'custom-curtains', 'ready-made-curtains'].includes(p.categorySlug);
      }
      return false;
    });

    // 1b. Sidebar category filter
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.categorySlug));
    }

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
        if (!p.lightControl) return true;
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
    <div className="bg-[#FDFCFA] min-h-screen pb-16">
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

            {/* Installation & Guarantee Banner */}
            <div className="mt-12 bg-white rounded-2xl border border-[#E7E2D8] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="space-y-1 text-center sm:text-start">
                <span className="text-xs uppercase font-semibold text-[#0A2A5E] tracking-wider">
                  {language === 'ar' ? 'تفصيل وتركيب دقيق' : 'Custom Sizing & Precision Fitting'}
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#101828]">
                  {language === 'ar'
                    ? `هل ترغب في تفصيل هذه التشكيلة بمقاسات فيلتك الخاصة؟`
                    : `Want custom dimensions for these ${currentCategory.title.en}?`}
                </h3>
                <p className="text-xs text-[#667085] max-w-lg">
                  {language === 'ar'
                    ? 'فريقنا المتخصص في الرياض يقوم برفع المقاسات وتصميم المجرى المخفي وتفصيل الأقمشة بأعلى معايير الدقة.'
                    : 'Our team delivers on-site laser measurements, motorized track installation, and bespoke finishing across all Riyadh districts.'}
                </p>
              </div>

              <a
                href="tel:+966500000000"
                className="px-5 py-3 rounded-xl bg-[#0A2A5E] hover:bg-[#061C3F] text-white text-xs font-semibold transition-colors flex items-center gap-2 shrink-0 shadow-sm"
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
