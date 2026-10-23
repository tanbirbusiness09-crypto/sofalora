import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { EditorialSectionData } from '../../data/editorialData';
import { useShop } from '../../context/LanguageContext';
import { EditorialProductCard } from './EditorialProductCard';

interface EditorialCategorySectionProps {
  section: EditorialSectionData;
  onExploreCategory?: (categorySlug: string) => void;
  priority?: boolean;
}

export const EditorialCategorySection: React.FC<EditorialCategorySectionProps> = ({
  section,
  onExploreCategory
}) => {
  const { language, direction, t, openConsultation } = useShop();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  // Check scroll boundaries
  const updateScrollButtons = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    
    if (direction === 'rtl') {
      const isAtStart = Math.abs(scrollLeft) < 10;
      const isAtEnd = Math.abs(scrollLeft) + clientWidth >= scrollWidth - 10;
      setCanScrollPrev(!isAtStart);
      setCanScrollNext(!isAtEnd);
    } else {
      setCanScrollPrev(scrollLeft > 10);
      setCanScrollNext(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    const node = carouselRef.current;
    if (node) {
      node.addEventListener('scroll', updateScrollButtons, { passive: true });
      window.addEventListener('resize', updateScrollButtons);
    }
    return () => {
      if (node) node.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [direction]);

  const handleScroll = (scrollDirection: 'prev' | 'next') => {
    if (!carouselRef.current) return;
    const clientWidth = carouselRef.current.clientWidth;
    const scrollAmount = clientWidth * 0.75;
    const factor = scrollDirection === 'next' ? 1 : -1;
    const actualFactor = direction === 'rtl' ? -factor : factor;

    carouselRef.current.scrollBy({
      left: scrollAmount * actualFactor,
      behavior: 'smooth'
    });
  };

  const isRTL = direction === 'rtl';

  return (
    <section id={section.id} className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* 1. Centered Section Title with Thin Decorative Lines */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-center gap-3 sm:gap-6 mb-6 sm:mb-8"
      >
        <span className="h-px w-10 sm:w-20 md:w-28 bg-[#D0C9BC]/80" aria-hidden="true" />
        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-[#101828] tracking-wide font-normal">
          {section.title[language]}
        </h2>
        <span className="h-px w-10 sm:w-20 md:w-28 bg-[#D0C9BC]/80" aria-hidden="true" />
      </motion.div>

      {/* 2. Main Large Lifestyle Image with Text Overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="group relative w-full aspect-16/9 sm:aspect-21/9 md:aspect-21/8 rounded-2xl overflow-hidden shadow-sm bg-[#E4DFD4]"
      >
        <img
          src={section.lifestyleImage}
          alt={section.title[language]}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
        />

        {/* Subtle Non-intrusive Vignette / Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10 transition-opacity duration-300" />

        {/* Top Atelier Badge (Optional) */}
        {section.lifestyleBadge && (
          <div className="absolute top-4 start-4 sm:top-6 sm:start-6 z-10">
            <span className="bg-white/85 backdrop-blur-md text-[#0F2444] text-[10px] sm:text-xs tracking-widest uppercase font-semibold px-3 py-1 rounded-full border border-white/40 shadow-xs">
              {section.lifestyleBadge[language]}
            </span>
          </div>
        )}

        {/* Text Overlay near lower-center / center */}
        <div className="absolute inset-0 flex flex-col items-center justify-end sm:justify-center text-center p-6 sm:p-10 z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-white font-normal drop-shadow-md mb-2 sm:mb-3">
              {section.lifestyleHeading[language]}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-[#E8D9B6] font-light max-w-xl mx-auto drop-shadow-sm mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-none">
              {section.lifestyleSubtitle[language]}
            </p>
            <button
              onClick={() => {
                if (onExploreCategory) {
                  onExploreCategory(section.id);
                } else {
                  openConsultation();
                }
              }}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/95 hover:bg-white text-[#101828] text-xs sm:text-sm font-semibold tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
            >
              <span>{section.lifestyleCta[language]}</span>
              {isRTL ? (
                <ArrowLeft className="w-4 h-4 text-[#0A2A5E] transition-transform duration-300 group-hover/btn:-translate-x-1" />
              ) : (
                <ArrowRight className="w-4 h-4 text-[#0A2A5E] transition-transform duration-300 group-hover/btn:translate-x-1" />
              )}
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* 3. Sub-Category Image Row (4 Categories on Desktop) */}
      <div className="mt-6 sm:mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          {section.subcategories.map((subcat, idx) => (
            <motion.div
              key={subcat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => onExploreCategory && onExploreCategory(subcat.id)}
              className="group cursor-pointer flex flex-col"
            >
              {/* Image Container with Gentle Zoom on Hover */}
              <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-[#E5E1D8] border border-[#EAE6DE]/70 shadow-2xs">
                <img
                  src={subcat.image}
                  alt={subcat.name[language]}
                  loading="lazy"
                  className="w-full h-full object-cover brightness-95 group-hover:brightness-100 transition-all duration-500 ease-out group-hover:scale-105"
                />
                {/* Subtle gradient floor */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                {/* Micro Tag / Pill */}
                {subcat.tag && (
                  <span className="absolute bottom-2 start-2 bg-white/90 backdrop-blur-xs text-[#0F2444] text-[10px] font-medium px-2 py-0.5 rounded-md shadow-2xs">
                    {subcat.tag[language]}
                  </span>
                )}
              </div>

              {/* Sub-Category Title with Hover Reaction */}
              <div className="mt-2.5 flex items-center justify-between text-[#101828] px-0.5">
                <span className="text-xs sm:text-sm font-medium tracking-tight group-hover:text-[#0A2A5E] transition-colors duration-300 line-clamp-1">
                  {subcat.name[language]}
                </span>
                {/* Subtle animated arrow */}
                <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 text-[#C8102E]">
                  {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. Top Picks Header Row: Top Picks | View All  +  Navigation Arrows */}
      <div className="mt-10 sm:mt-12 flex items-center justify-between gap-4 pb-3 border-b border-[#E8E3DA]">
        {/* Left Side (Right Side in RTL): Top Picks | View All */}
        <div className="flex items-center gap-3">
          <span className="text-sm sm:text-base md:text-lg font-bold text-[#101828] tracking-tight">
            {t('topPicks')}
          </span>
          <span className="text-[#B8B2A8]">|</span>
          <button
            onClick={() => onExploreCategory && onExploreCategory(section.id)}
            className="text-xs sm:text-sm text-[#667085] hover:text-[#0A2A5E] font-medium transition-colors inline-flex items-center gap-1 group"
          >
            <span>{t('viewAll')}</span>
            {isRTL ? (
              <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            )}
          </button>
        </div>

        {/* Opposite Side: Navigation Arrows (Direction Reverses in Arabic RTL) */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleScroll('prev')}
            disabled={!canScrollPrev}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#CFC8BA] flex items-center justify-center transition-all ${
              canScrollPrev
                ? 'text-[#101828] hover:bg-[#061C3F] hover:text-[#E8D9B6] hover:border-[#0A2A5E] shadow-2xs'
                : 'text-[#CEC7B9] border-[#E3DED4] cursor-not-allowed opacity-50'
            }`}
            aria-label="Previous products"
          >
            {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          <button
            onClick={() => handleScroll('next')}
            disabled={!canScrollNext}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#CFC8BA] flex items-center justify-center transition-all ${
              canScrollNext
                ? 'text-[#101828] hover:bg-[#061C3F] hover:text-[#E8D9B6] hover:border-[#0A2A5E] shadow-2xs'
                : 'text-[#CEC7B9] border-[#E3DED4] cursor-not-allowed opacity-50'
            }`}
            aria-label="Next products"
          >
            {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 5. Product Carousel (5 visible on desktop, 3 tablet, 2 mobile) */}
      <div className="relative mt-5">
        <div
          ref={carouselRef}
          className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-4 pt-1 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {section.topPicks.map((product, pIdx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: pIdx * 0.08 }}
              className="w-[calc(50%-6px)] sm:w-[calc(33.333%-11px)] lg:w-[calc(20%-12.8px)] shrink-0 snap-start flex"
            >
              <EditorialProductCard product={product} className="w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
