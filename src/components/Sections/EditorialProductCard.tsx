import React, { useState } from 'react';
import { Heart, Star, Eye, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../../types';
import { useShop } from '../../context/LanguageContext';

interface EditorialProductCardProps {
  product: Product;
  className?: string;
}

export const EditorialProductCard: React.FC<EditorialProductCardProps> = ({ product, className = '' }) => {
  const { language, t, openQuickView, addToCart, toggleWishlist, isInWishlist } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative bg-white rounded-xl border border-[#EDE7DF] hover:border-[#D0C2B0] hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden ${className}`}
    >
      {/* 1. Image Container */}
      <div className="relative aspect-4/5 w-full bg-[#F4EDE4] overflow-hidden">
        {/* Primary Image */}
        <img
          src={product.image}
          alt={product.name[language]}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
            isHovered && product.secondaryImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
        />

        {/* Secondary Image (Cross-Fade on Hover) */}
        {product.secondaryImage && (
          <img
            src={product.secondaryImage}
            alt={product.name[language]}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        )}

        {/* Badge (Top-Start) */}
        {product.badge ? (
          <span className="absolute top-2.5 start-2.5 bg-[#1B211D]/85 backdrop-blur-xs text-[#F1D5B2] text-[10px] sm:text-[11px] font-semibold tracking-wider px-2 py-0.5 rounded-full shadow-xs uppercase">
            {product.badge[language]}
          </span>
        ) : discountPercent ? (
          <span className="absolute top-2.5 start-2.5 bg-[#8C3A27] text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
            {language === 'ar' ? `خصم ${discountPercent}٪` : `${discountPercent}% OFF`}
          </span>
        ) : null}

        {/* Wishlist Heart Button (Top-End) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 end-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 ${
            isWishlisted
              ? 'bg-[#B85C3A] text-white shadow-md'
              : 'bg-white/90 text-[#3C3630] hover:bg-white hover:text-[#B85C3A] shadow-xs'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Quick View Overlay Action */}
        <div className="absolute inset-x-2.5 bottom-2.5 hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-10">
          <button
            onClick={() => openQuickView(product)}
            className="flex-1 py-2 px-3 rounded-lg bg-white/95 hover:bg-white text-[#1B211D] text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#B85C3A]" />
            <span>{t('quickView')}</span>
          </button>
          <button
            onClick={handleQuickAdd}
            className={`p-2 rounded-lg text-xs font-semibold shadow-md transition-colors flex items-center justify-center ${
              isAdded
                ? 'bg-[#2E5E43] text-white'
                : 'bg-[#1B211D]/90 hover:bg-[#1B211D] text-[#F1D5B2]'
            }`}
            aria-label="Add to cart"
            title={t('addToCart')}
          >
            {isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 2. Product Details Body */}
      <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-1 text-[11px] text-[#85796D] mb-1">
            <span className="truncate">{product.category[language]}</span>
            <div className="flex items-center gap-1 text-[#B85C3A] font-medium shrink-0">
              <Star className="w-3 h-3 fill-current" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => openQuickView(product)}
            className="text-xs sm:text-sm font-semibold text-[#1B211D] hover:text-[#8F3E24] transition-colors line-clamp-1 cursor-pointer"
            title={product.name[language]}
          >
            {product.name[language]}
          </h3>

          {/* Color Dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2">
              {product.colors.slice(0, 4).map((c) => (
                <span
                  key={c.id}
                  className="w-3 h-3 rounded-full border border-[#D3C3B1]"
                  style={{ backgroundColor: c.hex }}
                  title={c.name[language]}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-[10px] text-[#A0968A]">+{product.colors.length - 4}</span>
              )}
            </div>
          )}
        </div>

        {/* Price & Mobile Add to Cart */}
        <div className="mt-3 pt-2.5 border-t border-[#F1E9DF] flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs sm:text-sm font-bold text-[#1B211D]">
                {product.price} {t('currency')}
              </span>
              {product.oldPrice && (
                <span className="text-[10px] sm:text-xs text-[#A89C8F] line-through">
                  {product.oldPrice}
                </span>
              )}
            </div>
            {discountPercent && (
              <span className="text-[10px] font-semibold text-[#A2422C]">
                {language === 'ar' ? `خصم ${discountPercent}٪` : `${discountPercent}% OFF`}
              </span>
            )}
          </div>

          {/* Mobile direct Add to Cart button */}
          <button
            onClick={handleQuickAdd}
            className={`sm:hidden p-2 rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center justify-center ${
              isAdded
                ? 'bg-[#2E5E43] text-white'
                : 'bg-[#1B211D] text-[#F1D5B2] active:scale-95'
            }`}
            aria-label="Add to cart"
          >
            {isAdded ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
