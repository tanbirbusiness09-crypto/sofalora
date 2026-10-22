import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star, Check } from 'lucide-react';
import { Product } from '../../types';
import { useShop } from '../../context/LanguageContext';
import { Link } from '../../context/RouterContext';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
  onQuickView?: (product: Product) => void;
  priorityImage?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode = 'grid',
  onQuickView,
  priorityImage = false
}) => {
  const { language, addToCart, wishlist, toggleWishlist, openQuickView } = useShop();
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

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    } else {
      openQuickView(product);
    }
  };

  // ========================== LIST VIEW ==========================
  if (viewMode === 'list') {
    return (
      <div
        className="group bg-white rounded-2xl border border-[#EBE6DD] overflow-hidden hover:border-[#D6CBB8] hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row hover:-translate-y-0.5"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image Stage */}
        <div className="relative sm:w-64 md:w-72 lg:w-80 h-64 sm:h-auto shrink-0 bg-[#F4EDE4] overflow-hidden">
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
              <span className="px-2.5 py-1 bg-[#1B211D]/90 backdrop-blur-xs text-white text-[11px] font-medium tracking-wider uppercase rounded-full shadow-sm">
                {product.badge[language]}
              </span>
            )}
            {product.discount && (
              <span className="px-2.5 py-1 bg-[#8F3E24] text-white text-[11px] font-semibold rounded-full shadow-sm">
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
                : 'bg-white/90 text-[#4A453E] hover:bg-white hover:text-rose-600'
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
              <span className="text-xs uppercase tracking-wider text-[#8F3E24] font-semibold">
                {product.category[language]}
                {product.subcategory && (
                  <span className="text-[#877C71] font-normal"> • {product.subcategory[language]}</span>
                )}
              </span>

              {/* Rating */}
              <div className="flex items-center gap-1 text-xs text-[#635A50]">
                <Star className="w-3.5 h-3.5 fill-[#D99A5A] text-[#D99A5A]" />
                <span className="font-medium text-[#201D1A]">{product.rating.toFixed(1)}</span>
                <span className="text-[#877C71]">({product.reviews})</span>
              </div>
            </div>

            <Link href={productUrl}>
              <h3 className="text-lg font-serif font-bold text-[#1B211D] hover:text-[#8F3E24] transition-colors mb-2 line-clamp-1">
                {product.name[language]}
              </h3>
            </Link>

            <p className="text-xs sm:text-sm text-[#665D53] line-clamp-2 mb-4 leading-relaxed">
              {product.description[language]}
            </p>

            {/* Colors Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-[#747D74]">
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
                          ? 'ring-2 ring-[#8F3E24] ring-offset-1 border-white scale-110'
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
          <div className="pt-4 border-t border-[#EDE4D9] flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold font-serif text-[#1B211D]">
                {product.price}{' '}
                <span className="text-xs font-sans font-normal text-[#747D74]">
                  {language === 'ar' ? 'ر.س' : 'SAR'}
                </span>
              </span>
              {product.oldPrice && (
                <span className="text-sm text-[#998F84] line-through">
                  {product.oldPrice}{' '}
                  <span className="text-[10px]">{language === 'ar' ? 'ر.س' : 'SAR'}</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleQuickViewClick}
                aria-label="Quick View product"
                className="min-h-[44px] px-4 py-2 text-xs font-semibold border border-[#D8CFBF] text-[#4A4339] rounded-xl hover:border-[#1B211D] hover:text-[#1B211D] transition-colors flex items-center gap-1.5 active:scale-95"
              >
                <Eye className="w-4 h-4 text-[#8F3E24]" />
                <span>{language === 'ar' ? 'معاينة سريعة' : 'Quick View'}</span>
              </button>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={buttonState === 'adding'}
                aria-label="Add to cart"
                className={`min-h-[44px] px-5 py-2 text-xs font-bold rounded-xl flex items-center gap-2 transition-all duration-200 shadow-sm active:scale-95 ${
                  buttonState === 'added'
                    ? 'bg-emerald-700 text-white'
                    : buttonState === 'adding'
                    ? 'bg-[#3D3833] text-white opacity-80'
                    : 'bg-[#1B211D] text-white hover:bg-[#8F3E24]'
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
                    <ShoppingBag className="w-4 h-4 text-[#E6B183]" />
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
      className="group relative bg-white rounded-2xl border border-[#EBE6DD] overflow-hidden hover:border-[#D6CBB8] hover:shadow-lg transition-all duration-300 flex flex-col hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Stage with Crossfade */}
      <div className="relative aspect-[3/4] bg-[#F4EDE4] overflow-hidden">
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
            <span className="px-2 py-0.5 bg-[#1B211D]/85 backdrop-blur-xs text-white text-[10px] font-medium tracking-wide uppercase rounded-full shadow-xs">
              {product.badge[language]}
            </span>
          )}
          {product.discount && (
            <span className="px-2 py-0.5 bg-[#8F3E24] text-white text-[10px] font-semibold rounded-full shadow-xs">
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
              : 'bg-white/90 text-[#4A453E] hover:bg-white hover:text-rose-600'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-200 ${
              isWishlisted ? 'fill-current' : ''
            } ${heartAnim ? 'scale-125' : 'scale-100'}`}
          />
        </button>

        {/* Quick View Button Hover Overlay (Desktop) */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:flex justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-10">
          <button
            type="button"
            onClick={handleQuickViewClick}
            aria-label="Quick View product"
            className="w-full min-h-[40px] py-2 bg-white/95 backdrop-blur-xs hover:bg-white text-[#1B211D] text-xs font-bold rounded-xl shadow-md hover:text-[#8F3E24] transition-colors flex items-center justify-center gap-1.5 active:scale-95"
          >
            <Eye className="w-3.5 h-3.5 text-[#8F3E24]" />
            <span>{language === 'ar' ? 'معاينة سريعة' : 'Quick View'}</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-[#877C71] mb-1">
            <span className="uppercase tracking-wider truncate max-w-[65%] font-medium">
              {product.category[language]}
            </span>
            <div className="flex items-center gap-0.5 text-[#201D1A]">
              <Star className="w-3 h-3 fill-[#D99A5A] text-[#D99A5A]" />
              <span className="font-medium text-[11px]">{product.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Product Title */}
          <Link href={productUrl}>
            <h3 className="text-sm sm:text-base font-serif font-bold text-[#1B211D] hover:text-[#8F3E24] transition-colors mb-1.5 line-clamp-1">
              {product.name[language]}
            </h3>
          </Link>

          {/* Fabric / Room descriptor */}
          {product.fabric && (
            <p className="text-[11px] text-[#82786D] truncate mb-2.5">
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
                <span className="text-[10px] text-[#998F84]">+{product.colors.length - 5}</span>
              )}
            </div>
          )}
        </div>

        {/* Price and Add to Cart Button */}
        <div className="pt-2.5 border-t border-[#EDE4D9] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold font-serif text-[#1B211D]">
                {product.price}
                <span className="text-[10px] font-sans font-normal text-[#747D74] ms-1">
                  {language === 'ar' ? 'ر.س' : 'SAR'}
                </span>
              </span>
              {product.oldPrice && (
                <span className="text-xs text-[#998F84] line-through">
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
                ? 'bg-[#3D3833] text-white opacity-80'
                : 'bg-[#1B211D] text-white hover:bg-[#8F3E24]'
            }`}
          >
            {buttonState === 'added' ? (
              <Check className="w-4 h-4 animate-in zoom-in" />
            ) : buttonState === 'adding' ? (
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <ShoppingBag className="w-4 h-4 text-[#E6B183]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
