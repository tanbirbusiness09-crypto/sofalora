import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../../types';
import { useShop } from '../../context/LanguageContext';
import { Link } from '../../context/RouterContext';

interface EditorialProductCardProps {
  product: Product;
  className?: string;
}

export const EditorialProductCard: React.FC<EditorialProductCardProps> = ({ product, className = '' }) => {
  const { language, t, addToCart, toggleWishlist, isInWishlist } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const isWishlisted = isInWishlist(product.id);
  const productUrl = `/product/${product.slug || product.id}`;

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
      className={`group relative bg-white rounded-xl border border-[#EDE9E2] hover:border-[#CEC7BA] hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden ${className}`}
    >
      {/* 1. Image Container */}
      <div className="relative aspect-4/5 w-full bg-[#F3F1EB] overflow-hidden">
        <Link href={productUrl} className="block absolute inset-0">
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
        </Link>

        {/* Badge (Top-Start) */}
        {product.badge ? (
          <span className="absolute top-2.5 start-2.5 bg-[#0A2A5E]/85 backdrop-blur-xs text-[#E8D9B6] text-[10px] sm:text-[11px] font-semibold tracking-wider px-2 py-0.5 rounded-full shadow-xs uppercase">
            {product.badge[language]}
          </span>
        ) : discountPercent ? (
          <span className="absolute top-2.5 start-2.5 bg-[#9F0E22] text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
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
              ? 'bg-[#C8102E] text-white shadow-md'
              : 'bg-white/90 text-[#344054] hover:bg-white hover:text-[#C8102E] shadow-xs'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Add to Cart Action (Desktop) */}
        <div className="absolute inset-x-2.5 bottom-2.5 hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-10">
          <button
            onClick={handleQuickAdd}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold shadow-md transition-colors flex items-center justify-center gap-1.5 ${
              isAdded
                ? 'bg-[#166534] text-white'
                : 'bg-[#0A2A5E]/90 hover:bg-[#061C3F] text-[#E8D9B6]'
            }`}
            title={t('addToCart')}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>{t('addedToCart')}</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>{t('addToCart')}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Product Details Body */}
      <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-1 text-[11px] text-[#667085] mb-1">
            <span className="truncate">{product.category[language]}</span>
            <div className="flex items-center gap-1 text-[#C8102E] font-medium shrink-0">
              <Star className="w-3 h-3 fill-current" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Product Name */}
          <Link href={productUrl}>
            <h3
              className="text-xs sm:text-sm font-semibold text-[#101828] hover:text-[#0A2A5E] transition-colors line-clamp-1"
              title={product.name[language]}
            >
              {product.name[language]}
            </h3>
          </Link>

          {/* Color Dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2">
              {product.colors.slice(0, 4).map((c) => (
                <span
                  key={c.id}
                  className="w-3 h-3 rounded-full border border-[#CFC8BA]"
                  style={{ backgroundColor: c.hex }}
                  title={c.name[language]}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-[10px] text-[#8A847B]">+{product.colors.length - 4}</span>
              )}
            </div>
          )}
        </div>

        {/* Price & Mobile Add to Cart */}
        <div className="mt-3 pt-2.5 border-t border-[#F0EDE6] flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs sm:text-sm font-bold text-[#101828]">
                {product.price} {t('currency')}
              </span>
              {product.oldPrice && (
                <span className="text-[10px] sm:text-xs text-[#8A847B] line-through">
                  {product.oldPrice}
                </span>
              )}
            </div>
            {discountPercent && (
              <span className="text-[10px] font-semibold text-[#9F0E22]">
                {language === 'ar' ? `خصم ${discountPercent}٪` : `${discountPercent}% OFF`}
              </span>
            )}
          </div>

          {/* Mobile direct Add to Cart button */}
          <button
            onClick={handleQuickAdd}
            className={`sm:hidden p-2 rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center justify-center ${
              isAdded
                ? 'bg-[#166534] text-white'
                : 'bg-[#0A2A5E] text-[#E8D9B6] active:scale-95'
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
