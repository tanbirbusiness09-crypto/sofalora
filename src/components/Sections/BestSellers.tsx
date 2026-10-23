import React, { useState } from 'react';
import { useShop } from '../../context/LanguageContext';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { Star, Heart, Eye, ShoppingBag, Check } from 'lucide-react';

export const BestSellers: React.FC = () => {
  const {
    language,
    t,
    formatPrice,
    addToCart,
    openQuickView,
    toggleWishlist,
    isInWishlist
  } = useShop();

  const [activeFilter, setActiveFilter] = useState<'all' | 'curtains' | 'blinds' | 'blackout' | 'wave'>('all');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'curtains') return p.categorySlug === 'curtains';
    if (activeFilter === 'blinds') return p.categorySlug.includes('blind');
    if (activeFilter === 'blackout') return p.categorySlug === 'blackout-curtains';
    if (activeFilter === 'wave') return p.name.en.toLowerCase().includes('wave') || p.id === 'prod-8';
    return true;
  });

  return (
    <section id="bestsellers" className="py-16 sm:py-24 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold text-[#061C3F] uppercase tracking-widest block mb-2">
            {language === 'ar' ? 'تشكيلة النخبة في الرياض' : 'Riyadh Elite Curation'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2A5E] font-serif-luxury tracking-tight">
            {t('bestSellersTitle')}
          </h2>
          <p className="text-sm sm:text-base text-[#667085] mt-2">
            {t('bestSellersSubtitle')}
          </p>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#0A2A5E] text-white shadow-xs'
                  : 'bg-[#EEEAE2] text-[#4B5563] hover:bg-[#E3DED4]'
              }`}
            >
              {t('filterAll')}
            </button>
            <button
              onClick={() => setActiveFilter('curtains')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeFilter === 'curtains'
                  ? 'bg-[#0A2A5E] text-white shadow-xs'
                  : 'bg-[#EEEAE2] text-[#4B5563] hover:bg-[#E3DED4]'
              }`}
            >
              {t('filterCurtains')}
            </button>
            <button
              onClick={() => setActiveFilter('blinds')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeFilter === 'blinds'
                  ? 'bg-[#0A2A5E] text-white shadow-xs'
                  : 'bg-[#EEEAE2] text-[#4B5563] hover:bg-[#E3DED4]'
              }`}
            >
              {t('filterBlinds')}
            </button>
            <button
              onClick={() => setActiveFilter('blackout')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeFilter === 'blackout'
                  ? 'bg-[#0A2A5E] text-white shadow-xs'
                  : 'bg-[#EEEAE2] text-[#4B5563] hover:bg-[#E3DED4]'
              }`}
            >
              {t('filterBlackout')}
            </button>
            <button
              onClick={() => setActiveFilter('wave')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeFilter === 'wave'
                  ? 'bg-[#0A2A5E] text-white shadow-xs'
                  : 'bg-[#EEEAE2] text-[#4B5563] hover:bg-[#E3DED4]'
              }`}
            >
              {t('filterWave')}
            </button>
          </div>
        </div>

        {/* 8 Product Cards Grid (Responsive 2 cols on mobile, 3 on tablet, 4 on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {filteredProducts.map((product) => {
            const isWishlisted = isInWishlist(product.id);
            const isHovered = hoveredCardId === product.id;

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredCardId(product.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className="group relative bg-white rounded-2xl border border-[#E2DED4] shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Image Container */}
                <div className="relative aspect-4/5 w-full bg-[#E5E1D8] overflow-hidden">
                  
                  {/* Primary & Secondary Images Cross-Fade */}
                  <img
                    src={product.image}
                    alt={product.name[language]}
                    loading="lazy"
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                      isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                    }`}
                  />
                  <img
                    src={product.secondaryImage}
                    alt={product.name[language]}
                    loading="lazy"
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                      isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                    }`}
                  />

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-2.5 start-2.5 bg-[#0A2A5E]/90 backdrop-blur-xs text-[#E8D9B6] text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                      {product.badge[language]}
                    </span>
                  )}

                  {/* Wishlist Heart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-2.5 end-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isWishlisted
                        ? 'bg-[#C8102E] text-white shadow-md'
                        : 'bg-white/90 text-[#344054] hover:bg-white hover:text-[#C8102E] shadow-xs'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>

                  {/* Desktop Quick View Overlay Button */}
                  <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                    <button
                      onClick={() => openQuickView(product)}
                      className="w-full py-2.5 px-3 rounded-xl bg-white/95 hover:bg-white text-[#101828] text-xs font-bold shadow-lg flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#C8102E]" />
                      <span>{t('quickView')}</span>
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-3.5 sm:p-4.5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category & Rating */}
                    <div className="flex items-center justify-between gap-1 text-[11px] text-[#667085] mb-1">
                      <span className="truncate">{product.category[language]}</span>
                      <div className="flex items-center gap-0.5 text-[#C8102E] font-bold shrink-0">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{product.rating}</span>
                        <span className="text-[#8A847B] font-normal">({product.reviews})</span>
                      </div>
                    </div>

                    {/* Product Name */}
                    <h3
                      onClick={() => openQuickView(product)}
                      className="text-xs sm:text-sm font-bold text-[#101828] hover:text-[#0A2A5E] transition-colors line-clamp-1 cursor-pointer"
                    >
                      {product.name[language]}
                    </h3>

                    {/* Fabric Spec Note */}
                    <p className="text-[11px] text-[#667085] mt-0.5 truncate">
                      {product.fabric[language]}
                    </p>

                    {/* Color Swatches */}
                    <div className="flex items-center gap-1.5 mt-2.5">
                      {product.colors.map((c) => (
                        <span
                          key={c.id}
                          className="w-3.5 h-3.5 rounded-full border border-[#CFC8BA] shadow-2xs"
                          style={{ backgroundColor: c.hex }}
                          title={c.name[language]}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Price & Add to Cart Button */}
                  <div className="mt-3.5 pt-3 border-t border-[#F0EDE6] flex items-center justify-between gap-2">
                    <div>
                      <div className="text-sm sm:text-base font-extrabold text-[#0A2A5E]">
                        {formatPrice(product.price)}
                      </div>
                      {product.oldPrice && (
                        <div className="text-[11px] text-[#8A847B] line-through -mt-0.5">
                          {formatPrice(product.oldPrice)}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="inline-flex items-center justify-center gap-1 bg-[#0A2A5E] hover:bg-[#C8102E] hover:text-[#101828] text-white p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold transition-all shadow-xs shrink-0"
                      title={t('addToCart')}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline-block">{t('addToCart')}</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
