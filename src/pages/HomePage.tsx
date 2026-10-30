import { NewProductsRow } from '../components/Sections/NewProductsRow';
import { PromoGrid } from '../components/Sections/PromoGrid';
import { PriceBands } from '../components/Sections/PriceBands';
import { DealsRow } from '../components/Sections/DealsRow';
import React from 'react';
import { QuickCategoryBar } from '../components/Sections/QuickCategoryBar';
import { Hero } from '../components/Hero/Hero';
import { PromoSlider } from '../components/Sections/PromoSlider';
import { EditorialCategorySection } from '../components/Sections/EditorialCategorySection';
import { FullWidthPromoBanner } from '../components/Sections/FullWidthPromoBanner';
import { ShopByRoom } from '../components/Sections/ShopByRoom';
import { InspirationGallery } from '../components/Sections/InspirationGallery';
import { ConsultationCTA } from '../components/Sections/ConsultationCTA';
import { Newsletter } from '../components/Sections/Newsletter';
import { BestSellers } from '../components/Sections/BestSellers';
import { ShopByCategory } from '../components/Sections/ShopByCategory';
import { FeaturedCollection } from '../components/Sections/FeaturedCollection';
import { CuratedCollectionSection } from '../components/Sections/CuratedCollectionSection';
import { CustomerReviews } from '../components/Sections/CustomerReviews';
import { CustomCurtainService } from '../components/Sections/CustomCurtainService';
import { PromotionalOffer } from '../components/Sections/PromotionalOffer';
import { WhyMohammadCurtains } from '../components/Sections/WhyMohammadCurtains';
import { FeatureStrip } from '../components/Sections/FeatureStrip';
import { CategoryRows } from '../components/Sections/CategoryRows';
import { CategoryGrid } from '../components/Sections/CategoryGrid';
import { NewArrivalsCarousel } from '../components/Sections/NewArrivalsCarousel';
import { CategoryProductRow } from '../components/Sections/CategoryProductRow';
import { ScrollReveal } from '../components/UI/ScrollReveal';
import {
  WINDOW_DECOR_SECTION,
  LIVING_ROOM_SECTION,
  BEDROOM_SECTION,
  MODERN_BLINDS_SECTION,
} from '../data/editorialData';
import { resolveHomeLayout } from '../data/homeSections';
import { CmsSectionScope, useWebsite } from '../context/WebsiteContext';

const reveal = (node: React.ReactNode, scale = false) =>
  scale ? (
    <ScrollReveal direction="scale" duration={600}>
      {node}
    </ScrollReveal>
  ) : (
    <ScrollReveal direction="bottom" duration={600} distance={20}>
      {node}
    </ScrollReveal>
  );

/** Section key -> renderer. Keys match the admin Website Builder profile. */
const SECTION_RENDERERS: Record<string, () => React.ReactNode> = {
  // The desktop sidebar already lists every category; keep the quick bar for mobile/tablet.
  quick_category_bar: () => <div className="lg:hidden"><QuickCategoryBar /></div>,
  hero: () => <Hero />,
  feature_strip: () => <FeatureStrip />,
  // Above the fold on desktop: rendered without the scroll-reveal fade.
  category_rows: () => <CategoryRows />,
  promo_grid: () => <PromoGrid />,
  price_bands: () => <PriceBands />,
  new_products_row: () => <NewProductsRow />,
  deals_row: () => <DealsRow />,
  category_grid: () => <CategoryGrid />,
  new_arrivals: () => <NewArrivalsCarousel />,
  row_curtains: () => reveal(<CategoryProductRow sectionKey="row_curtains" />),
  row_blinds: () => reveal(<CategoryProductRow sectionKey="row_blinds" />),
  row_sofas: () => reveal(<CategoryProductRow sectionKey="row_sofas" />),
  row_accessories: () => reveal(<CategoryProductRow sectionKey="row_accessories" />),
  promo_slider: () => <PromoSlider />,
  editorial_sofas: () => <div id="editorial-sofas">{reveal(<EditorialCategorySection section={WINDOW_DECOR_SECTION} />)}</div>,
  editorial_curtains: () => reveal(<EditorialCategorySection section={LIVING_ROOM_SECTION} />),
  promo_banner: () => <div id="promotions">{reveal(<FullWidthPromoBanner />, true)}</div>,
  editorial_pairings: () => reveal(<EditorialCategorySection section={BEDROOM_SECTION} />),
  shop_by_room: () => reveal(<ShopByRoom />),
  inspiration_gallery: () => reveal(<InspirationGallery />),
  consultation_cta: () => reveal(<ConsultationCTA />, true),
  newsletter: () => (
    <ScrollReveal direction="bottom" duration={500} distance={16}>
      <Newsletter />
    </ScrollReveal>
  ),
  editorial_atelier: () => reveal(<EditorialCategorySection section={MODERN_BLINDS_SECTION} />),
  best_sellers: () => reveal(<BestSellers />),
  shop_by_category: () => reveal(<ShopByCategory />),
  featured_collection: () => reveal(<FeaturedCollection />),
  curated_collection: () => reveal(<CuratedCollectionSection />),
  customer_reviews: () => reveal(<CustomerReviews />),
  custom_curtain_service: () => reveal(<CustomCurtainService />),
  promotional_offer: () => reveal(<PromotionalOffer />, true),
  why_us: () => reveal(<WhyMohammadCurtains />),
};

export const HomePage: React.FC = () => {
  const { content, status } = useWebsite();
  // Admin data decides the layout; built-in defaults are used only when the admin is unreachable.
  // While the first CMS response is pending, render nothing instead of flashing the default layout.
  if (status === 'loading')
    return (
      <div className="sf-home pb-6 min-h-[60vh] px-3 pt-3" aria-busy="true" aria-label="Loading">
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="w-[104px] shrink-0 lg:w-[121px]">
              <div className="aspect-square rounded-[14px] bg-[#EFE8DC] motion-safe:animate-pulse" />
              <div className="mx-auto mt-2 h-3 w-3/4 rounded bg-[#EFE8DC] motion-safe:animate-pulse" />
            </div>
          ))}
        </div>
        <div className="mt-4 grid h-[340px] grid-cols-1 gap-3 lg:grid-cols-[1fr_1fr_1fr_1.55fr]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={`rounded-[16px] bg-[#EFE8DC] motion-safe:animate-pulse ${i ? 'hidden lg:block' : ''}`} />
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[20/21] rounded-[12px] bg-[#EFE8DC] motion-safe:animate-pulse" />
          ))}
        </div>
      </div>
    );
  const resolved = resolveHomeLayout(content.homeSections);
  // The single-line category row replaces the older quick category bar when both are on.
  const layout = resolved.includes('category_rows') ? resolved.filter((k) => k !== 'quick_category_bar') : resolved;

  return (
    <div className="sf-home pb-6">
      {layout.map((key) => {
        const render = SECTION_RENDERERS[key];
        if (!render) return null;
        return (
          <div key={key} className="contents" data-home-section={key}>
            <CmsSectionScope sectionKey={key}>{render()}</CmsSectionScope>
          </div>
        );
      })}
    </div>
  );
};
