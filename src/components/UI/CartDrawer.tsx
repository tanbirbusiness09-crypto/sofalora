import React, { useEffect } from 'react';
import { useShop } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    language,
    direction,
    isCartOpen,
    closeCart,
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    formatPrice,
    t
  } = useShop();
  const { navigate } = useRouter();

  // Keyboard accessibility: ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };

    if (isCartOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 500;
  const shippingProgress = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  const handleGoToCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleGoToCart = () => {
    closeCart();
    navigate('/cart');
  };

  const isRtl = direction === 'rtl';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label={t('cartTitle')}>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      />

      {/* Drawer Panel */}
      <div
        className={`fixed inset-y-0 ${
          isRtl ? 'start-0' : 'end-0'
        } max-w-md w-full bg-[#FAFAF8] shadow-2xl flex flex-col z-50 transform transition-transform duration-300 animate-in ${
          isRtl ? 'slide-in-from-left' : 'slide-in-from-right'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#E2DDD2] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#0A2A5E]" />
            <h3 className="text-base font-bold text-[#101828] font-serif-luxury">
              {t('cartTitle')}
            </h3>
            <span className="text-xs bg-[#F3F1EB] text-[#667085] font-bold px-2 py-0.5 rounded-full">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </div>

          <button
            type="button"
            onClick={closeCart}
            className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full text-[#667085] hover:bg-[#F3F1EB] flex items-center justify-center transition-colors active:scale-95"
            aria-label="Close Cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Riyadh Meter */}
        <div className="bg-[#F8F6F1] border-b border-[#E8E3DA] p-3.5 text-xs text-[#475467] shrink-0">
          {cartSubtotal >= FREE_SHIPPING_THRESHOLD ? (
            <div className="flex items-center gap-2 text-[#2A7531] font-bold">
              <ShieldCheck className="w-4 h-4 text-[#2A7531]" />
              <span>{t('freeShippingBanner')}</span>
            </div>
          ) : (
            <div>
              <span className="leading-relaxed">
                {language === 'ar' ? 'أضف منتجات بقيمة ' : 'Add '}
                <strong className="text-[#101828]">{formatPrice(remainingForFreeShipping)}</strong>
                {language === 'ar'
                  ? ' إضافية للحصول على توصيل وتركيب مجاني بالرياض!'
                  : ' more for Free White-Glove Installation in Riyadh!'}
              </span>
              <div className="w-full bg-[#E3DED4] h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-[#0A2A5E] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#E5E1D8] text-[#667085] flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8 text-[#0A2A5E]" />
              </div>
              <h4 className="text-sm font-bold text-[#101828]">
                {t('emptyCart')}
              </h4>
              <p className="text-xs text-[#667085] max-w-xs mx-auto leading-relaxed">
                {t('emptyCartDesc')}
              </p>
              <button
                type="button"
                onClick={closeCart}
                className="inline-flex items-center gap-2 bg-[#0A2A5E] hover:bg-[#061C3F] text-white px-6 py-3 rounded-full text-xs font-bold transition-colors active:scale-95 shadow-sm"
              >
                <span>{t('heroShopCurtains')}</span>
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3.5 rounded-2xl border border-[#E2DED4] shadow-2xs flex gap-3.5 relative hover:border-[#D6D0C4] transition-colors"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-xl bg-[#E5E1D8] overflow-hidden shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name[language]}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#101828] truncate">
                      {item.product.name[language]}
                    </h4>

                    <div className="flex items-center gap-2 text-[11px] text-[#667085] mt-0.5">
                      {item.selectedColor && (
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-[#CFC8BA]"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{item.selectedColor.name[language]}</span>
                        </span>
                      )}
                      {item.selectedColor && item.selectedSize && <span>•</span>}
                      {item.selectedSize && (
                        <span className="truncate">{item.selectedSize.label[language]}</span>
                      )}
                    </div>

                    <div className="text-xs font-bold text-[#0A2A5E] font-serif mt-1">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </div>
                  </div>

                  {/* Quantity & Delete Controls */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F2EFE9]">
                    <div className="flex items-center border border-[#CFC8BA] rounded-full p-0.5 bg-[#FAFAF8]">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.id, Math.max(1, item.quantity - 1))}
                        aria-label="Decrease quantity"
                        className="w-6 h-6 rounded-full hover:bg-white flex items-center justify-center text-[#475467] transition-colors active:scale-90"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-[#101828]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                        className="w-6 h-6 rounded-full hover:bg-white flex items-center justify-center text-[#475467] transition-colors active:scale-90"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="min-w-[36px] min-h-[36px] text-[#8A847B] hover:text-[#C53030] p-1.5 transition-colors flex items-center justify-center"
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

        {/* Drawer Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#E2DDD2] bg-white space-y-3 shrink-0">
            <div className="flex items-center justify-between text-xs text-[#667085]">
              <span>{t('subtotal')}</span>
              <span className="font-bold text-sm text-[#101828]">
                {formatPrice(cartSubtotal)}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#667085]">
              <span>{language === 'ar' ? 'التوصيل والتركيب في الرياض' : 'Riyadh White-Glove Installation'}</span>
              <span className="font-bold text-[#2A7531]">
                {cartSubtotal >= FREE_SHIPPING_THRESHOLD ? (language === 'ar' ? 'مجاني' : 'FREE') : formatPrice(25)}
              </span>
            </div>

            <div className="pt-2 border-t border-[#F0EDE6] flex items-center justify-between text-sm font-black text-[#101828]">
              <span>{language === 'ar' ? 'الإجمالي التقديري' : 'Estimated Total'}</span>
              <span className="text-base text-[#0A2A5E] font-serif">
                {formatPrice(cartSubtotal >= FREE_SHIPPING_THRESHOLD ? cartSubtotal : cartSubtotal + 25)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={handleGoToCart}
                className="w-full min-h-[44px] bg-[#F3F1EB] hover:bg-[#E8E3DA] text-[#101828] py-2.5 px-3 rounded-xl text-xs font-bold text-center transition-all border border-[#DCD7CC] active:scale-95"
              >
                {language === 'ar' ? 'عرض السلة الكاملة' : 'View Full Cart'}
              </button>
              <button
                type="button"
                onClick={handleGoToCheckout}
                className="w-full min-h-[44px] bg-[#0A2A5E] hover:bg-[#061C3F] text-white py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95"
              >
                <span>{language === 'ar' ? 'متابعة الشراء' : 'Checkout'}</span>
                <ArrowIcon className="w-3.5 h-3.5 text-[#E3C98F]" />
              </button>
            </div>

            <div className="text-center text-[10px] text-[#8A847B]">
              {language === 'ar'
                ? 'دفع آمن 100% عبر مدى والبطاقات الائتمانية وApple Pay'
                : '100% Secure Checkout via Mada, Credit Card & Apple Pay'}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
