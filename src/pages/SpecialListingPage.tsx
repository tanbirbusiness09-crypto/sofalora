import React, { useState, useMemo } from 'react';
import { useShop } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { FilterState, SortOption, Product } from '../types';
import { Breadcrumbs } from '../components/PLP/Breadcrumbs';
import { CategoryHero } from '../components/PLP/CategoryHero';
import { ProductFilters } from '../components/PLP/ProductFilters';
import { ProductSortToolbar } from '../components/PLP/ProductSortToolbar';
import { ProductGrid } from '../components/PLP/ProductGrid';
import { Sparkles, Award, Tag, Flame } from 'lucide-react';

export type SpecialType = 'new-arrivals' | 'best-sellers' | 'offers' | 'collection';

interface SpecialListingPageProps {
  type: SpecialType;
  collectionSlug?: string;
}

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

export const SpecialListingPage: React.FC<SpecialListingPageProps> = ({
  type,
  collectionSlug: propCollectionSlug
}) => {
  const { language } = useShop();
  const { route } = useRouter();

  const collectionSlug = propCollectionSlug || route.params.slug;

  const pageMeta = useMemo(() => {
    switch (type) {
      case 'new-arrivals':
        return {
          title: { en: 'New Arrivals Collection', ar: 'وصل حديثاً — تشكيلة الموسم الجديد' },
          subtitle: {
            en: 'Discover our latest contemporary textures, minimalist wave profiles, and cutting-edge motorized blind architectures.',
            ar: 'استكشف أحدث تصميمات الأقمشة الفاخرة، أنظمة الويف الانسيابية، ومظلات التحكم الذكي التي وصلت حديثاً لمعارضنا.'
          },
          image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop',
          breadcrumb: { en: 'New Arrivals', ar: 'وصل حديثاً' }
        };
      case 'best-sellers':
        return {
          title: { en: 'Best Sellers in Riyadh', ar: 'الأكثر مبيعاً وتفضيلاً في الرياض' },
          subtitle: {
            en: 'The preferred curtain and blind choices chosen by luxury homeowners, interior designers, and prestigious Riyadh villas.',
            ar: 'الخيارات الأكثر طلباً واعتماداً في الفلل والقصور والمجالس السعودية، لجودتها الاستثنائية وعزلها الفائق.'
          },
          image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop',
          breadcrumb: { en: 'Best Sellers', ar: 'الأكثر مبيعاً' }
        };
      case 'offers':
        return {
          title: { en: 'Special Offers & Seasonal Sales', ar: 'عروض حصرية وتخفيضات موسمية' },
          subtitle: {
            en: 'Enjoy up to 25% off selected blackout drapes, ready-made panels, and smart motorized retrofits for a limited period.',
            ar: 'تمتع بخصومات حصرية تصل إلى ٢٥٪ على نخبة مختارة من الستائر المعتمة، الستائر الجاهزة، ومحركات الستائر الذكية لفترة محدودة.'
          },
          image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
          breadcrumb: { en: 'Special Offers', ar: 'العروض الحصرية' }
        };
      case 'collection':
      default:
        const colNames: Record<string, { title: { en: string; ar: string }; sub: { en: string; ar: string } }> = {
          'luxury-blackout': {
            title: { en: 'Luxury Blackout Collection', ar: 'مجموعة العزل التام الفاخرة' },
            sub: { en: 'Engineered for absolute tranquility and darkness against Riyadh sun.', ar: 'عزل تام ١٠٠٪ للضوء والحرارة لتوفير أعلى درجات الهدوء والراحة.' }
          },
          'modern-sheer': {
            title: { en: 'Modern Sheer Voiles', ar: 'مجموعة الشيفون والفوال العصري' },
            sub: { en: 'Gentle diffusion of natural light preserving privacy and expansive villa views.', ar: 'ترشيح انسيابي لضوء النهار مع الحفاظ على الخصوصية التامة.' }
          },
          'saudi-home': {
            title: { en: 'Saudi Heritage & Majlis Collection', ar: 'مجموعة التراث والمجالس السعودية' },
            sub: { en: 'Rich velvets, warm metallics, and regal drapes honoring Saudi hospitality.', ar: 'مخمل ملكي ثقيل ولمسات ذهبية أصيلة تليق بأفخم المجالس وقاعات الضيافة.' }
          },
          'minimal-living': {
            title: { en: 'Minimal Living & Smart Blinds', ar: 'مجموعة البساطة العصرية والحلول الذكية' },
            sub: { en: 'Clean geometric lines, motorized rollers, and architectural blinds.', ar: 'خطوط هندسية نظيفة ومظلات ذكية تناسب الديكور المينيمالي الحديث.' }
          }
        };

        const target = (collectionSlug && colNames[collectionSlug]) || {
          title: { en: 'Curated Architectural Collection', ar: 'تشكيلة معمارية منتقاة' },
          sub: { en: 'Handpicked fabrics for refined living spaces.', ar: 'أقمشة مختارة بعناية لأرقى المساحات السكنية.' }
        };

        return {
          title: target.title,
          subtitle: target.sub,
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
          breadcrumb: target.title
        };
    }
  }, [type, collectionSlug]);

  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let baseList = [...PRODUCTS];

    // Primary type filtering
    if (type === 'new-arrivals') {
      baseList = baseList.filter((p) => p.isNew);
    } else if (type === 'best-sellers') {
      baseList = baseList.filter((p) => p.isBestSeller || p.rating >= 4.85);
    } else if (type === 'offers') {
      baseList = baseList.filter((p) => p.isSale || (p.discount && p.discount > 0) || p.oldPrice);
    } else if (type === 'collection' && collectionSlug) {
      baseList = baseList.filter((p) => p.collection === collectionSlug);
    }

    // Secondary UI filters
    if (filters.categories.length > 0) {
      baseList = baseList.filter((p) => filters.categories.includes(p.categorySlug));
    }

    baseList = baseList.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    if (filters.colors.length > 0) {
      baseList = baseList.filter((p) => {
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

    if (filters.fabrics.length > 0) {
      baseList = baseList.filter((p) => {
        if (!p.fabric) return false;
        const fabEn = p.fabric.en.toLowerCase();
        const fabAr = p.fabric.ar.toLowerCase();
        return filters.fabrics.some((f) => fabEn.includes(f) || fabAr.includes(f));
      });
    }

    if (filters.lightControls.length > 0) {
      baseList = baseList.filter((p) => {
        if (!p.lightControl) return false;
        return filters.lightControls.includes(p.lightControl);
      });
    }

    if (filters.rooms.length > 0) {
      baseList = baseList.filter((p) => {
        if (!p.room) return false;
        const roomEn = p.room.en.toLowerCase();
        const roomAr = p.room.ar.toLowerCase();
        return filters.rooms.some(
          (r: string) => roomEn.includes(r) || roomAr.includes(r)
        );
      });
    }

    if (filters.inStockOnly) {
      baseList = baseList.filter((p) => p.inStock);
    }

    // Sort
    switch (sortOption) {
      case 'bestsellers':
      case 'best-selling':
        baseList.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'newest':
        baseList.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'price-asc':
      case 'price-low':
        baseList.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
      case 'price-high':
        baseList.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
      case 'highest-rated':
        baseList.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      case 'recommended':
      default:
        break;
    }

    return baseList;
  }, [type, collectionSlug, filters, sortOption]);

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
              label: { en: 'Shop', ar: 'المتجر' },
              href: '/shop'
            },
            {
              label: pageMeta.breadcrumb
            }
          ]}
        />

        {/* Hero Banner */}
        <CategoryHero
          customTitle={pageMeta.title}
          customSubtitle={pageMeta.subtitle}
          customImage={pageMeta.image}
          itemCount={filteredProducts.length}
        />

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

      {/* Mobile Drawer */}
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
