import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Heart, ShoppingBag, Star, Check, Eye, X } from 'lucide-react';
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
  const [quickOpen, setQuickOpen] = useState(false);

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
              <span className="px-2.5 py-1 bg-[#0B2345]/90 backdrop-blur-xs text-white text-[11px] font-medium tracking-wider uppercase rounded-full shadow-sm">
                {product.badge[language]}
              </span>
            )}
            {product.discount && (
              <span className="px-2.5 py-1 bg-[#B59460] text-white text-[11px] font-semibold rounded-full shadow-sm">
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
              <span className="text-xs uppercase tracking-wider text-[#0B2345] font-semibold">
                {product.category[language]}
                {product.subcategory && (
                  <span className="text-[#667085] font-normal"> • {product.subcategory[language]}</span>
                )}
              </span>

              {/* Rating */}
              {product.rating > 0 && (
                <div className="flex items-center gap-1 text-xs text-[#475467]">
                  <Star className="w-3.5 h-3.5 fill-[#B59460] text-[#B59460]" />
                  <span className="font-medium text-[#0F172A]">{product.rating.toFixed(1)}</span>
                  <span className="text-[#667085]">({product.reviews})</span>
                </div>
              )}
            </div>

            <Link href={productUrl}>
              <h3 className="text-lg font-serif font-bold text-[#101828] hover:text-[#0B2345] transition-colors mb-2 line-clamp-1">
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
                          ? 'ring-2 ring-[#0B2345] ring-offset-1 border-white scale-110'
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
                  ⃁
                </span>
              </span>
              {product.oldPrice && (
                <span className="text-sm text-[#8A847B] line-through">
                  {product.oldPrice}{' '}
                  <span className="text-[10px]">⃁</span>
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
                    : 'bg-[#0B2345] text-white hover:bg-[#071A35]'
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
                    <ShoppingBag className="w-4 h-4 text-[#D9C29A]" />
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
  const sar = '⃁';
  const onSale = Boolean(product.oldPrice && product.oldPrice > product.price);
  const outOfStock = product.inStock === false || (product.stock !== undefined && product.stock <= 0);

  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-[18px] border border-[#ECE6DA] bg-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#E2D9C9] hover:shadow-[0_26px_50px_-30px_rgba(11,35,69,0.35)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image stage */}
      <div className="relative aspect-[5/4] overflow-hidden bg-[#F3EFE8]">
        <Link href={productUrl} className="block h-full w-full" aria-label={product.name[language]}>
          <img
            src={product.image}
            alt={product.name[language]}
            loading={priorityImage ? 'eager' : 'lazy'}
            decoding="async"
            className={`h-full w-full object-cover transition-all duration-[900ms] ease-out group-hover:scale-[1.05] ${
              isHovered && product.secondaryImage ? 'opacity-0' : 'opacity-100'
            }`}
          />
          {product.secondaryImage && (
            <img
              src={product.secondaryImage}
              alt=""
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-[900ms] ease-out group-hover:scale-[1.05] ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
        </Link>

        {/* Badges: only what the product data supports */}
        <div className="pointer-events-none absolute top-3 start-3 z-10 flex flex-col items-start gap-1.5">
          {product.isNew && (
            <span className="rounded-full bg-[#EFE3CC] px-2.5 py-1 text-[10.5px] font-semibold text-[#6E5531] shadow-xs">
              {language === 'ar' ? 'جديد' : 'New'}
            </span>
          )}
          {onSale && (
            <span className="rounded-full bg-[#0B2345] px-2.5 py-1 text-[10.5px] font-semibold text-white shadow-xs">
              {product.discount ? (language === 'ar' ? `عرض -${product.discount}٪` : `Offer -${product.discount}%`) : language === 'ar' ? 'عرض' : 'Offer'}
            </span>
          )}
          {product.badge && !/^new$/i.test(product.badge.en) && (
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10.5px] font-semibold text-[#0B2345] shadow-xs backdrop-blur">
              {product.badge[language]}
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={isWishlisted}
          className={`absolute top-3 end-3 z-10 flex h-9 w-9 items-center justify-center rounded-full shadow-sm backdrop-blur transition-all duration-200 active:scale-90 ${
            isWishlisted ? 'bg-white text-[#B4233A]' : 'bg-white/85 text-[#0B2345] hover:bg-white'
          }`}
        >
          <Heart strokeWidth={1.7} className={`h-4 w-4 transition-transform ${isWishlisted ? 'fill-current' : ''} ${heartAnim ? 'scale-125' : ''}`} />
        </button>

        {/* Hover actions: quick view + add to cart */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex gap-2 transition-all duration-300 lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuickOpen(true);
            }}
            className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-white/95 text-[12px] font-semibold text-[#0B2345] shadow-sm backdrop-blur hover:bg-white"
          >
            <Eye strokeWidth={1.7} className="h-4 w-4" />
            <span>{language === 'ar' ? 'نظرة سريعة' : 'Quick View'}</span>
          </button>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={buttonState === 'adding' || outOfStock}
            aria-label={language === 'ar' ? 'أضف للسلة' : 'Add to cart'}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm transition-colors disabled:opacity-60 ${
              buttonState === 'added' ? 'bg-emerald-700 text-white' : 'bg-[#0B2345] text-white hover:bg-[#12305C]'
            }`}
          >
            {buttonState === 'added' ? (
              <Check className="h-4 w-4" />
            ) : buttonState === 'adding' ? (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <ShoppingBag strokeWidth={1.7} className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3.5">
        <div className="mb-1 flex items-center justify-between gap-2">
          <span className="sf-eyebrow truncate text-[#9A7D4F]">{product.category[language]}</span>
          {product.rating > 0 && (
            <span className="flex shrink-0 items-center gap-0.5 text-[11px] font-semibold text-[#0B2345]">
              <Star className="h-3 w-3 fill-[#B59460] text-[#B59460]" />
              {product.rating.toFixed(1)}
            </span>
          )}
        </div>
        <Link href={productUrl}>
          <h3 className="line-clamp-2 min-h-[2.6em] text-[14px] font-semibold leading-[1.3] text-[#0B2345] transition-colors hover:text-[#8A7350]">
            {product.name[language]}
          </h3>
        </Link>
        {product.colors && product.colors.length > 0 && (
          <div className="mt-2 flex items-center gap-1.5">
            {product.colors.slice(0, 5).map((col, idx) => (
              <span key={col.id || idx} title={col.name[language]} className="h-3 w-3 rounded-full border border-black/15" style={{ backgroundColor: col.hex }} />
            ))}
            {product.colors.length > 5 && <span className="text-[10px] text-[#8A847B]">+{product.colors.length - 5}</span>}
          </div>
        )}
        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-[16px] font-extrabold text-[#0B2345]">
              <span className="me-0.5 text-[11px] font-semibold text-[#6B6F76]">{sar}</span>{product.price}
            </span>
            {onSale && <span className="text-[12px] text-[#9A968E] line-through">{product.oldPrice} {sar}</span>}
          </div>
          <span className={`shrink-0 whitespace-nowrap text-[11px] font-medium ${buttonState === 'added' ? 'text-emerald-700' : outOfStock ? 'text-[#B4233A]' : 'text-[#6B6F76]'}`}>
            {buttonState === 'added'
              ? language === 'ar' ? 'تمت الإضافة ✓' : 'Added ✓'
              : outOfStock
              ? language === 'ar' ? 'غير متوفر' : 'Unavailable'
              : (product.stock ?? 99) < 20 && product.stock !== undefined
              ? language === 'ar' ? 'كمية محدودة' : 'Few left'
              : language === 'ar' ? 'متوفر' : 'In stock'}
          </span>
        </div>
      </div>

      {quickOpen && (
        <QuickViewModal
          product={product}
          onClose={() => setQuickOpen(false)}
          onAdd={handleAddToCart}
          buttonState={buttonState}
          outOfStock={outOfStock}
        />
      )}
    </div>
  );
};

interface QuickViewProps {
  product: Product;
  onClose: () => void;
  onAdd: (e: React.MouseEvent) => void;
  buttonState: 'idle' | 'adding' | 'added';
  outOfStock: boolean;
}

const QuickViewModal: React.FC<QuickViewProps> = ({ product, onClose, onAdd, buttonState, outOfStock }) => {
  const { language, wishlist, toggleWishlist } = useShop();
  const isAr = language === 'ar';
  const sar = '⃁';
  const onSale = Boolean(product.oldPrice && product.oldPrice > product.price);
  const url = `/product/${product.slug || product.id}`;
  const wished = wishlist.includes(product.id);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={product.name[language]} dir={isAr ? 'rtl' : 'ltr'}>
      <div className="sf-fade absolute inset-0 bg-[#071A35]/55 backdrop-blur-[2px]" onClick={onClose} />
      <div className="sf-pop relative grid w-full max-w-3xl overflow-hidden rounded-[22px] bg-white shadow-2xl md:grid-cols-2">
        <button type="button" onClick={onClose} aria-label={isAr ? 'إغلاق' : 'Close'} className="sf-round-btn absolute top-3 end-3 z-10 h-9 w-9 bg-white/90 text-[#0B2345] shadow-sm">
          <X className="h-4 w-4" />
        </button>
        <div className="aspect-[4/3] bg-[#F3EFE8] md:aspect-auto">
          <img src={product.image} alt={product.name[language]} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col p-6 sm:p-7">
          <span className="sf-eyebrow text-[#9A7D4F]">{product.category[language]}</span>
          <h3 className="font-serif-luxury mt-2 text-[28px] leading-tight text-[#0B2345]">{product.name[language]}</h3>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-xl font-bold text-[#0B2345]">{product.price} <span className="text-xs font-medium text-[#6B6F76]">{sar}</span></span>
            {onSale && <span className="text-sm text-[#9A968E] line-through">{product.oldPrice} {sar}</span>}
          </div>
          {product.description[language] && (
            <p className="mt-4 line-clamp-5 text-[13px] leading-relaxed text-[#4A4F57]">{product.description[language]}</p>
          )}
          <div className="mt-auto flex gap-2 pt-6">
            <button
              type="button"
              onClick={onAdd}
              disabled={buttonState === 'adding' || outOfStock}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#0B2345] text-[13px] font-semibold text-white hover:bg-[#12305C] disabled:opacity-60"
            >
              {buttonState === 'added' ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
              {outOfStock ? (isAr ? 'غير متوفر' : 'Unavailable') : buttonState === 'added' ? (isAr ? 'تمت الإضافة' : 'Added') : isAr ? 'أضف للسلة' : 'Add to Cart'}
            </button>
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-pressed={wished}
              aria-label={isAr ? 'المفضلة' : 'Wishlist'}
              className={`sf-round-btn h-11 w-11 border ${wished ? 'border-[#B4233A]/30 text-[#B4233A]' : 'border-[#DCD5C8] text-[#0B2345]'}`}
            >
              <Heart className={`h-4 w-4 ${wished ? 'fill-current' : ''}`} />
            </button>
          </div>
          <Link href={url} onClick={onClose} className="mt-3 text-center text-[12.5px] font-semibold text-[#0B2345] underline-offset-4 hover:underline">
            {isAr ? 'عرض التفاصيل الكاملة' : 'View full details'}
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
};
