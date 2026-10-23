import React, { useState } from 'react';
import { Heart, ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '../../types';
import { useShop } from '../../context/LanguageContext';
import { Link } from '../../context/RouterContext';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
  priorityImage?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode = 'grid',
  priorityImage = false
}) => {
  const { language, addToCart, wishlist, toggleWishlist } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [buttonState, setButtonState] = useState<'idle' | 'adding' | 'added'>('idle');
  const [heartAnim, setHeartAnim] = useState(false);

  const isWishlisted = wishlist.includes(product.id);
  const productSlug = product.slug || product.id;
  const productUrl = `/product/${productSlug}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (buttonState !== 'idle') return;

    setButtonState('adding');
    setTimeout(() => {
      addToCart(product, product.colors?.[selectedColorIndex]);
      setButtonState('added');
      setTimeout(() => {
        setButtonState('idle');
      }, 1600);
    }, 280);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 300);
    toggleWishlist(product.id);
  };

  // ========================== LIST VIEW ==========================
  if (viewMode === 'list') {
    return (
      <div
        className="group bg-white rounded-2xl border border-[#EAE6DE] overflow-hidden hover:border-[#D6D0C4] hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row hover:-translate-y-0.5"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image Stage */}
        <div className="relative sm:w-64 md:w-72 lg:w-80 h-64 sm:h-auto shrink-0 bg-[#F3F1EB] overflow-hidden">
          <Link href={productUrl} className="block w-full h-full relative">
            <img
              src={product.image}
              alt={product.name[language]}
              loading={priorityImage ? 'eager' : 'lazy'}
              className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
                isHovered && product.secondaryImage ? 'opacity-0' : 'opacity-100'
              }`}
            />
            {product.secondaryImage && (
              <img
                src={product.secondaryImage}
                alt={`${product.name[language]} detail`}
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
          </Link>

          {/* Badges */}
          <div className="absolute top-3 start-3 flex flex-col gap-1.5 pointer-events-none z-10">
            {product.badge && (
              <span className="px-2.5 py-1 bg-[#0A2A5E]/90 backdrop-blur-xs text-white text-[11px] font-medium tracking-wider uppercase rounded-full shadow-sm">
                {product.badge[language]}
              </span>
            )}
            {product.discount && (
              <span className="px-2.5 py-1 bg-[#C8102E] text-white text-[11px] font-semibold rounded-full shadow-sm">
                {language === 'ar' ? `خصم ${product.discount}٪` : `${product.discount}% OFF`}
              </span>
            )}
          </div>

          {/* Wishlist Button with micro-pulse */}
          <button
            type="button"
            onClick={handleWishlistToggle}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`absolute top-3 end-3 min-w-[44px] min-h-[44px] w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm z-10 active:scale-90 ${
              isWishlisted
                ? 'bg-rose-50 text-rose-600 border border-rose-200'
                : 'bg-white/90 text-[#4B5563] hover:bg-white hover:text-rose-600'
            }`}
          >
            <Heart
              className={`w-4 h-4 transition-transform duration-200 ${
                isWishlisted ? 'fill-current' : ''
              } ${heartAnim ? 'scale-125' : 'scale-100'}`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs uppercase tracking-wider text-[#0A2A5E] font-semibold">
                {product.category[language]}
                {product.subcategory && (
                  <span className="text-[#667085] font-normal"> • {product.subcategory[language]}</span>
                )}
              </span>

              {/* Rating */}
              <div className="flex items-center gap-1 text-xs text-[#475467]">
                <Star className="w-3.5 h-3.5 fill-[#C6A15B] text-[#C6A15B]" />
                <span className="font-medium text-[#0F172A]">{product.rating.toFixed(1)}</span>
                <span className="text-[#667085]">({product.reviews})</span>
              </div>
            </div>

            <Link href={productUrl}>
              <h3 className="text-lg font-serif font-bold text-[#101828] hover:text-[#0A2A5E] transition-colors mb-2 line-clamp-1">
                {product.name[language]}
              </h3>
            </Link>

            <p className="text-xs sm:text-sm text-[#475467] line-clamp-2 mb-4 leading-relaxed">
              {product.description[language]}
            </p>

            {/* Colors Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-[#667085]">
                  {language === 'ar' ? 'الألوان المتاحة:' : 'Colors:'}
                </span>
                <div className="flex items-center gap-1.5">
                  {product.colors.map((color, cIdx) => (
                    <button
                      key={color.id || cIdx}
                      type="button"
                      onClick={() => setSelectedColorIndex(cIdx)}
                      title={color.name[language]}
                      aria-label={color.name[language]}
                      className={`min-w-[24px] min-h-[24px] w-6 h-6 rounded-full border transition-all ${
                        selectedColorIndex === cIdx
                          ? 'ring-2 ring-[#0A2A5E] ring-offset-1 border-white scale-110'
                          : 'border-black/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Price & Action Row */}
          <div className="pt-4 border-t border-[#ECE8DF] flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold font-serif text-[#101828]">
                {product.price}{' '}
                <span className="text-xs font-sans font-normal text-[#667085]">
                  {language === 'ar' ? 'ر.س' : 'SAR'}
                </span>
              </span>
              {product.oldPrice && (
                <span className="text-sm text-[#8A847B] line-through">
                  {product.oldPrice}{' '}
                  <span className="text-[10px]">{language === 'ar' ? 'ر.س' : 'SAR'}</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={buttonState === 'adding'}
                aria-label="Add to cart"
                className={`min-h-[44px] px-5 py-2 text-xs font-bold rounded-xl flex items-center gap-2 transition-all duration-200 shadow-sm active:scale-95 ${
                  buttonState === 'added'
                    ? 'bg-emerald-700 text-white'
                    : buttonState === 'adding'
                    ? 'bg-[#344054] text-white opacity-80'
                    : 'bg-[#0A2A5E] text-white hover:bg-[#061C3F]'
                }`}
              >
                {buttonState === 'added' ? (
                  <>
                    <Check className="w-4 h-4 animate-in zoom-in" />
                    <span>{language === 'ar' ? 'تمت الإضافة ✓' : 'Added ✓'}</span>
                  </>
                ) : buttonState === 'adding' ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{language === 'ar' ? 'جاري الإضافة...' : 'Adding...'}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#E3C98F]" />
                    <span>{language === 'ar' ? 'أضف للسلة' : 'Add to Cart'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========================== GRID VIEW ==========================
  return (
    <div
      className="group relative bg-white rounded-2xl border border-[#EAE6DE] overflow-hidden hover:border-[#D6D0C4] hover:shadow-lg transition-all duration-300 flex flex-col hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Stage with Crossfade */}
      <div className="relative aspect-[3/4] bg-[#F3F1EB] overflow-hidden">
        <Link href={productUrl} className="block w-full h-full relative">
          <img
            src={product.image}
            alt={product.name[language]}
            loading={priorityImage ? 'eager' : 'lazy'}
            className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
              isHovered && product.secondaryImage ? 'opacity-0' : 'opacity-100'
            }`}
          />
          {product.secondaryImage && (
            <img
              src={product.secondaryImage}
              alt={`${product.name[language]} detail`}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 start-2.5 flex flex-col gap-1 pointer-events-none z-10">
          {product.badge && (
            <span className="px-2 py-0.5 bg-[#0A2A5E]/85 backdrop-blur-xs text-white text-[10px] font-medium tracking-wide uppercase rounded-full shadow-xs">
              {product.badge[language]}
            </span>
          )}
          {product.discount && (
            <span className="px-2 py-0.5 bg-[#C8102E] text-white text-[10px] font-semibold rounded-full shadow-xs">
              {language === 'ar' ? `-${product.discount}٪` : `-${product.discount}%`}
            </span>
          )}
        </div>

        {/* Wishlist Button with Heart Scale Animation */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 end-2.5 min-w-[40px] min-h-[40px] w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-xs z-10 active:scale-90 ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 border border-rose-200'
              : 'bg-white/90 text-[#4B5563] hover:bg-white hover:text-rose-600'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-200 ${
              isWishlisted ? 'fill-current' : ''
            } ${heartAnim ? 'scale-125' : 'scale-100'}`}
          />
        </button>
      </div>

      {/* Product Information */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-[#667085] mb-1">
            <span className="uppercase tracking-wider truncate max-w-[65%] font-medium">
              {product.category[language]}
            </span>
            <div className="flex items-center gap-0.5 text-[#0F172A]">
              <Star className="w-3 h-3 fill-[#C6A15B] text-[#C6A15B]" />
              <span className="font-medium text-[11px]">{product.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Product Title */}
          <Link href={productUrl}>
            <h3 className="text-sm sm:text-base font-serif font-bold text-[#101828] hover:text-[#0A2A5E] transition-colors mb-1.5 line-clamp-1">
              {product.name[language]}
            </h3>
          </Link>

          {/* Fabric / Room descriptor */}
          {product.fabric && (
            <p className="text-[11px] text-[#667085] truncate mb-2.5">
              {product.fabric[language]}
            </p>
          )}

          {/* Color Dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mb-3">
              {product.colors.slice(0, 5).map((col, idx) => (
                <span
                  key={col.id || idx}
                  title={col.name[language]}
                  className="w-3 h-3 rounded-full border border-black/20"
                  style={{ backgroundColor: col.hex }}
                />
              ))}
              {product.colors.length > 5 && (
                <span className="text-[10px] text-[#8A847B]">+{product.colors.length - 5}</span>
              )}
            </div>
          )}
        </div>

        {/* Price and Add to Cart Button */}
        <div className="pt-2.5 border-t border-[#ECE8DF] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold font-serif text-[#101828]">
                {product.price}
                <span className="text-[10px] font-sans font-normal text-[#667085] ms-1">
                  {language === 'ar' ? 'ر.س' : 'SAR'}
                </span>
              </span>
              {product.oldPrice && (
                <span className="text-xs text-[#8A847B] line-through">
                  {product.oldPrice}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={buttonState === 'adding'}
            aria-label="Add to cart"
            className={`min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 shadow-2xs active:scale-90 ${
              buttonState === 'added'
                ? 'bg-emerald-700 text-white'
                : buttonState === 'adding'
                ? 'bg-[#344054] text-white opacity-80'
                : 'bg-[#0A2A5E] text-white hover:bg-[#061C3F]'
            }`}
          >
            {buttonState === 'added' ? (
              <Check className="w-4 h-4 animate-in zoom-in" />
            ) : buttonState === 'adding' ? (
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <ShoppingBag className="w-4 h-4 text-[#E3C98F]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
