import React from 'react';
import { Hero } from '../components/Hero/Hero';
import { EditorialCategorySection } from '../components/Sections/EditorialCategorySection';
import { CuratedCollectionSection } from '../components/Sections/CuratedCollectionSection';
import { FullWidthPromoBanner } from '../components/Sections/FullWidthPromoBanner';
import { ShopByRoom } from '../components/Sections/ShopByRoom';
import { CustomCurtainService } from '../components/Sections/CustomCurtainService';
import { WhyMohammadCurtains } from '../components/Sections/WhyMohammadCurtains';
import { InspirationGallery } from '../components/Sections/InspirationGallery';
import { ConsultationCTA } from '../components/Sections/ConsultationCTA';
import { Newsletter } from '../components/Sections/Newsletter';
import { ScrollReveal } from '../components/UI/ScrollReveal';
import {
  WINDOW_DECOR_SECTION,
  LIVING_ROOM_SECTION,
  BEDROOM_SECTION,
  MODERN_BLINDS_SECTION,
} from '../data/editorialData';

export const HomePage: React.FC = () => {
  return (
    <>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Editorial Section 01: Window Décor */}
      <div id="categories">
        <ScrollReveal direction="bottom" duration={600} distance={20}>
          <EditorialCategorySection section={WINDOW_DECOR_SECTION} />
        </ScrollReveal>
      </div>

      {/* 3. Curated Collection Section: "Curated for Your Home" */}
      <div id="curated-collection">
        <ScrollReveal direction="bottom" duration={600} distance={20}>
          <CuratedCollectionSection />
        </ScrollReveal>
      </div>

      {/* 4. Editorial Section 02: Living Room (Majlis Lifestyle) */}
      <ScrollReveal direction="bottom" duration={600} distance={20}>
        <EditorialCategorySection section={LIVING_ROOM_SECTION} />
      </ScrollReveal>

      {/* 5. Full-Width Promotional Banner: "Refresh Your Windows" */}
      <div id="promotions">
        <ScrollReveal direction="scale" duration={600}>
          <FullWidthPromoBanner />
        </ScrollReveal>
      </div>

      {/* 6. Editorial Section 03: Bedroom (Peaceful Rest) */}
      <ScrollReveal direction="bottom" duration={600} distance={20}>
        <EditorialCategorySection section={BEDROOM_SECTION} />
      </ScrollReveal>

      {/* 7. Shop by Room (6 Living Spaces Tailored for Riyadh Homes) */}
      <ScrollReveal direction="bottom" duration={600} distance={20}>
        <ShopByRoom />
      </ScrollReveal>

      {/* 8. Editorial Section 04: Modern Blinds */}
      <div id="blinds">
        <ScrollReveal direction="bottom" duration={600} distance={20}>
          <EditorialCategorySection section={MODERN_BLINDS_SECTION} />
        </ScrollReveal>
      </div>

      {/* 9. Custom Curtain Service (4-Step Bespoke Process) */}
      <ScrollReveal direction="bottom" duration={600} distance={20}>
        <CustomCurtainService />
      </ScrollReveal>

      {/* 10. Why Choose Sofalora (6 Guarantees & Pillars) */}
      <ScrollReveal direction="bottom" duration={600} distance={20}>
        <WhyMohammadCurtains />
      </ScrollReveal>

      {/* 11. Inspiration Gallery (Bento Photo Lookbook & Lightbox) */}
      <ScrollReveal direction="bottom" duration={600} distance={20}>
        <InspirationGallery />
      </ScrollReveal>

      {/* 12. Consultation CTA (Direct Concierge & Booking) */}
      <ScrollReveal direction="scale" duration={600}>
        <ConsultationCTA />
      </ScrollReveal>

      {/* 13. Newsletter Subscription */}
      <ScrollReveal direction="bottom" duration={500} distance={16}>
        <Newsletter />
      </ScrollReveal>
    </>
  );
};
