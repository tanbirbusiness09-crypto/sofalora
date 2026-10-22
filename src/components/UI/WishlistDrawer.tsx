import React, { useEffect } from 'react';
import { useShop } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';
import { X, Trash2, ShoppingBag, Heart, ArrowRight, ArrowLeft } from 'lucide-react';
import { PRODUCTS } from '../../data/products';

export const WishlistDrawer: React.FC = () => {
  const {
    language,
    direction,
    isWishlistOpen,
    closeWishlist,
    wishlist,
    toggleWishlist,
    addToCart,
    formatPrice,
    t
  } = useShop();
  const { navigate } = useRouter();

  // Keyboard accessibility: ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isWishlistOpen) {
        closeWishlist();
      }
    };

    if (isWishlistOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isWishlistOpen, closeWishlist]);

  if (!isWishlistOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));
  const isRtl = direction === 'rtl';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const handleGoToWishlist = () => {
    closeWishlist();
    navigate('/wishlist');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label={t('wishlistTitle')}>
      {/* Backdrop */}
      <div
        onClick={closeWishlist}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      />

      {/* Drawer Panel */}
      <div
        className={`fixed inset-y-0 ${
          isRtl ? 'start-0' : 'end-0'
        } max-w-md w-full bg-[#FBF8F3] shadow-2xl flex flex-col z-50 transform transition-transform duration-300 animate-in ${
          isRtl ? 'slide-in-from-left' : 'slide-in-from-right'
        }`}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E5D8C9] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#8F3E24] fill-current" />
            <h3 className="text-base font-bold text-[#1B211D] font-serif-luxury">
              {t('wishlistTitle')}
            </h3>
            <span className="text-xs bg-[#F4EDE4] text-[#85796D] font-bold px-2.5 py-0.5 rounded-full">
              {wishlist.length}
            </span>
          </div>

          <button
            type="button"
            onClick={closeWishlist}
            className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full text-[#747B72] hover:bg-[#F4EDE4] flex items-center justify-center transition-colors active:scale-95"
            aria-label="Close Wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#E7DACB] text-[#85796D] flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-[#8F3E24]" />
              </div>
              <h4 className="text-sm font-bold text-[#1B211D]">
                {t('emptyWishlist')}
              </h4>
              <p className="text-xs text-[#85796D] max-w-xs mx-auto leading-relaxed">
                {t('emptyWishlistDesc')}
              </p>
              <button
                type="button"
                onClick={closeWishlist}
                className="inline-flex items-center gap-2 bg-[#1B211D] hover:bg-[#8F3E24] text-white px-6 py-3 rounded-full text-xs font-bold transition-colors active:scale-95 shadow-sm"
              >
                <span>{t('heroShopCurtains')}</span>
              </button>
            </div>
          ) : (
            wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-3.5 rounded-2xl border border-[#E4D6C7] shadow-2xs flex gap-3.5 relative hover:border-[#D6CBB8] transition-colors"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-xl bg-[#E7DACB] overflow-hidden shrink-0">
                  <img
                    src={product.image}
                    alt={product.name[language]}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#1B211D] truncate">
                      {product.name[language]}
                    </h4>
                    <span className="text-[11px] text-[#85796D] block mt-0.5 truncate">
                      {product.category[language]}
                    </span>
                    <div className="text-xs font-bold text-[#8F3E24] font-serif mt-1">
                      {formatPrice(product.price)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F5EEE5]">
                    <button
                      type="button"
                      onClick={() => {
                        addToCart(product);
                        toggleWishlist(product.id);
                      }}
                      className="min-h-[36px] inline-flex items-center gap-1.5 text-xs font-bold text-[#8F3E24] hover:text-[#7A331D] transition-colors active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'نقل إلى السلة' : 'Move to Cart'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      className="min-w-[36px] min-h-[36px] text-[#A0968A] hover:text-[#C53030] p-1.5 transition-colors flex items-center justify-center active:scale-95"
                      title={t('remove')}
                      aria-label={t('remove')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistedProducts.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#E5D8C9] bg-white shrink-0">
            <button
              type="button"
              onClick={handleGoToWishlist}
              className="w-full min-h-[44px] bg-[#1B211D] hover:bg-[#8F3E24] text-white py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <span>{language === 'ar' ? 'عرض الصفحة الكاملة للمفضلة' : 'View Full Wishlist Page'}</span>
              <ArrowIcon className="w-3.5 h-3.5 text-[#E6B183]" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
