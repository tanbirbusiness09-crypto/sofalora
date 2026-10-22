import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';
import { X, Star, Heart, ShoppingBag, Plus, Minus, Check, ShieldCheck, Truck, ExternalLink } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    language,
    quickViewProduct,
    closeQuickView,
    addToCart,
    formatPrice,
    t,
    toggleWishlist,
    isInWishlist
  } = useShop();
  const { navigate } = useRouter();

  const [selectedColor, setSelectedColor] = useState(quickViewProduct?.colors[0]);
  const [selectedSize, setSelectedSize] = useState(quickViewProduct?.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [buttonState, setButtonState] = useState<'idle' | 'adding' | 'added'>('idle');

  // Update selected color and size whenever quickViewProduct changes
  useEffect(() => {
    if (quickViewProduct) {
      setSelectedColor(quickViewProduct.colors[0]);
      setSelectedSize(quickViewProduct.sizes[0]);
      setQuantity(1);
      setButtonState('idle');
    }
  }, [quickViewProduct]);

  // Keyboard accessibility: ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeQuickView();
      }
    };

    if (quickViewProduct) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [quickViewProduct, closeQuickView]);

  if (!quickViewProduct) return null;

  const isWishlisted = isInWishlist(quickViewProduct.id);
  const currentUnitPrice = quickViewProduct.price + (selectedSize?.priceModifier || 0);
  const totalPrice = currentUnitPrice * quantity;

  const handleAddToCart = () => {
    if (buttonState !== 'idle') return;
    setButtonState('adding');
    setTimeout(() => {
      addToCart(quickViewProduct, selectedColor, selectedSize, quantity);
      setButtonState('added');
      setTimeout(() => {
        closeQuickView();
      }, 700);
    }, 250);
  };

  const handleViewFullProduct = () => {
    closeQuickView();
    navigate(`/product/${quickViewProduct.slug || quickViewProduct.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={closeQuickView}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200 animate-in fade-in"
      />

      {/* Modal Container */}
      <div
        className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-[#E4D6C7] overflow-hidden z-10 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-label={quickViewProduct.name[language]}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 end-4 z-20 min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-white/90 text-[#3C3630] hover:bg-[#F4EDE4] flex items-center justify-center shadow-xs transition-colors active:scale-90"
          aria-label={t('closeModal')}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* Left/Start: Product Image */}
          <div className="md:col-span-5 relative bg-[#E7DACB] aspect-square md:aspect-auto">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name[language]}
              className="w-full h-full object-cover"
            />
            {quickViewProduct.badge && (
              <span className="absolute top-4 start-4 bg-[#1B211D] text-[#F1D5B2] text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                {quickViewProduct.badge[language]}
              </span>
            )}
          </div>

          {/* Right/End: Product Details & Controls */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5 text-start max-h-[85vh] overflow-y-auto">
            
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-[#85796D] mb-1.5">
                <span className="font-semibold uppercase tracking-wider">{quickViewProduct.category[language]}</span>
                <div className="flex items-center gap-1 text-[#B85C3A] font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{quickViewProduct.rating}</span>
                  <span className="text-[#A0968A]">({quickViewProduct.reviews} {t('reviewsCount')})</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-[#1B211D] font-serif-luxury leading-snug">
                {quickViewProduct.name[language]}
              </h2>

              {/* Pricing */}
              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-xl sm:text-2xl font-black text-[#1B211D] font-serif">
                  {formatPrice(currentUnitPrice)}
                </span>
                {quickViewProduct.oldPrice && (
                  <span className="text-sm text-[#94887A] line-through">
                    {formatPrice(quickViewProduct.oldPrice + (selectedSize?.priceModifier || 0))}
                  </span>
                )}
                <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  {quickViewProduct.inStock ? t('inStock') : t('outOfStock')}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#6A6055] mt-3 leading-relaxed line-clamp-3">
                {quickViewProduct.description[language]}
              </p>

              {/* Color Swatches */}
              <div className="mt-5">
                <label className="block text-xs font-bold text-[#272E29] uppercase tracking-wider mb-2">
                  {t('colorLabel')}: <span className="text-[#7A351F] font-normal">{selectedColor?.name[language]}</span>
                </label>
                <div className="flex items-center gap-2">
                  {quickViewProduct.colors.map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`relative min-w-[36px] min-h-[36px] w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${
                        selectedColor?.id === color.id
                          ? 'border-[#B85C3A] scale-110 shadow-xs ring-2 ring-[#B85C3A]/30'
                          : 'border-transparent hover:border-[#D3C3B1]'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name[language]}
                      aria-label={color.name[language]}
                    >
                      {selectedColor?.id === color.id && (
                        <Check className="w-4 h-4 text-white drop-shadow-xs" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mt-4">
                <label className="block text-xs font-bold text-[#272E29] uppercase tracking-wider mb-2">
                  {t('sizeLabel')}:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {quickViewProduct.sizes.map((size) => (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`min-h-[44px] p-2.5 rounded-xl border text-xs font-semibold text-start transition-all ${
                        selectedSize?.id === size.id
                          ? 'border-[#B85C3A] bg-[#FBF8F3] text-[#1B211D] ring-1 ring-[#B85C3A]'
                          : 'border-[#DFD2C2] hover:border-[#B85C3A] text-[#4F5852]'
                      }`}
                    >
                      <div className="truncate">{size.label[language]}</div>
                      <div className="text-[10px] text-[#85796D] mt-0.5 font-mono">{size.dimensions}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mt-4 flex items-center justify-between">
                <label className="text-xs font-bold text-[#272E29] uppercase tracking-wider">
                  {t('quantity')}:
                </label>
                <div className="flex items-center border border-[#D3C3B1] rounded-full p-1 bg-[#FBF8F3]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="min-w-[32px] min-h-[32px] w-8 h-8 rounded-full hover:bg-white flex items-center justify-center text-[#4F5852] transition-colors active:scale-95"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-[#1B211D]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="min-w-[32px] min-h-[32px] w-8 h-8 rounded-full hover:bg-white flex items-center justify-center text-[#4F5852] transition-colors active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Action Buttons & Badges */}
            <div className="pt-4 border-t border-[#E8DCCD] space-y-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={buttonState === 'adding'}
                  className={`flex-1 min-h-[48px] py-3.5 px-6 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 ${
                    buttonState === 'added'
                      ? 'bg-emerald-700 text-white'
                      : buttonState === 'adding'
                      ? 'bg-[#38332E] text-white opacity-80'
                      : 'bg-[#1B211D] hover:bg-[#8F3E24] text-white'
                  }`}
                >
                  {buttonState === 'added' ? (
                    <>
                      <Check className="w-4 h-4 animate-in zoom-in" />
                      <span>{language === 'ar' ? 'تمت الإضافة للسلة ✓' : 'Added to Cart ✓'}</span>
                    </>
                  ) : buttonState === 'adding' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{language === 'ar' ? 'جاري الإضافة...' : 'Adding...'}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#E6B183]" />
                      <span>{t('addToCart')} • {formatPrice(totalPrice)}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  className={`min-w-[48px] min-h-[48px] w-12 h-12 rounded-full border flex items-center justify-center transition-colors active:scale-95 ${
                    isWishlisted
                      ? 'border-rose-300 bg-rose-50 text-rose-600'
                      : 'border-[#D3C3B1] text-[#4F5852] hover:border-[#B85C3A] hover:text-[#B85C3A]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* View Full Product Link */}
              <button
                type="button"
                onClick={handleViewFullProduct}
                className="w-full text-center text-xs font-bold text-[#8F3E24] hover:text-[#7A331D] hover:underline flex items-center justify-center gap-1.5 py-1"
              >
                <span>{language === 'ar' ? 'عرض تفاصيل ومقاسات المنتج بالكامل' : 'View Full Product Details & Options'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              {/* Service Badges */}
              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-[#747B72]">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#B85C3A] shrink-0" />
                  <span>{t('freeHomeMeasure')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B85C3A] shrink-0" />
                  <span>{t('warrantyIncluded')}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
