import React, { useState, useEffect } from 'react';
import { X, Star, Heart, ShoppingBag, Check, ShieldCheck, Truck, ArrowRight, ArrowLeft } from 'lucide-react';
import { Product } from '../../types';
import { useShop } from '../../context/LanguageContext';
import { Link } from '../../context/RouterContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { language, direction, addToCart, wishlist, toggleWishlist } = useShop();
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSizeIdx, setSelectedSizeIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>('');
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setSelectedColorIdx(0);
      setSelectedSizeIdx(0);
      setQuantity(1);
      setIsAdded(false);
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  if (!product) return null;

  const isWishlisted = wishlist.includes(product.id);
  const sizeModifier = product.sizes?.[selectedSizeIdx]?.priceModifier || 0;
  const currentPrice = product.price + sizeModifier;
  const productSlug = product.slug || product.id;
  const Arrow = direction === 'rtl' ? ArrowLeft : ArrowRight;

  const handleAddToCart = () => {
    const selectedSize = product.sizes?.[selectedSizeIdx];
    const selectedColor = product.colors?.[selectedColorIdx];
    addToCart(product, selectedColor, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const images = [product.image, product.secondaryImage].filter(Boolean) as string[];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 end-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#4A433A] hover:text-[#1C1A17] shadow-sm flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Gallery Stage */}
          <div className="bg-[#F6F2EC] p-6 flex flex-col justify-between">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#ECE6DD]">
              <img
                src={activeImage || product.image}
                alt={product.name[language]}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {product.badge && (
                <span className="absolute top-3 start-3 px-3 py-1 bg-[#1C1A17]/85 text-white text-xs uppercase tracking-wider rounded-full font-medium">
                  {product.badge[language]}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 mt-4">
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === img ? 'border-[#A9803C]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs uppercase tracking-wider text-[#A9803C] font-semibold">
                  {product.category[language]}
                </span>
                <div className="flex items-center gap-1 text-xs">
                  <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                  <span className="font-semibold text-[#1C1A17]">{product.rating.toFixed(1)}</span>
                  <span className="text-[#8E8377]">({product.reviews} {language === 'ar' ? 'تقييم' : 'reviews'})</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1C1A17] mb-3 leading-snug">
                {product.name[language]}
              </h2>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-[#EFE9DF]">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1A17]">
                  {currentPrice}{' '}
                  <span className="text-sm font-sans font-normal text-[#7A7165]">
                    {language === 'ar' ? 'ر.س' : 'SAR'}
                  </span>
                </span>
                {product.oldPrice && (
                  <span className="text-base text-[#9C9184] line-through">
                    {product.oldPrice + sizeModifier}{' '}
                    <span className="text-xs">{language === 'ar' ? 'ر.س' : 'SAR'}</span>
                  </span>
                )}
                {product.discount && (
                  <span className="px-2.5 py-0.5 bg-[#A9803C]/15 text-[#886221] text-xs font-semibold rounded-full">
                    {language === 'ar' ? `وفر ${product.discount}٪` : `Save ${product.discount}%`}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#665D53] mb-5 leading-relaxed">
                {product.description[language]}
              </p>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-[#302B24] mb-2">
                    {language === 'ar' ? 'اللون المحدد:' : 'Selected Color:'}{' '}
                    <span className="font-normal text-[#7A7165]">
                      {product.colors[selectedColorIdx]?.name[language]}
                    </span>
                  </label>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c, idx) => (
                      <button
                        key={c.id || idx}
                        type="button"
                        onClick={() => setSelectedColorIdx(idx)}
                        className={`w-7 h-7 rounded-full border transition-all flex items-center justify-center ${
                          selectedColorIdx === idx
                            ? 'ring-2 ring-[#A9803C] ring-offset-2 scale-110'
                            : 'border-black/20 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name[language]}
                      >
                        {selectedColorIdx === idx && (
                          <Check className={`w-3.5 h-3.5 ${c.hex.toLowerCase() === '#ffffff' ? 'text-black' : 'text-white'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-[#302B24] mb-2">
                    {language === 'ar' ? 'المقاس / الأبعاد:' : 'Size / Dimensions:'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.sizes.map((s, idx) => (
                      <button
                        key={s.id || idx}
                        type="button"
                        onClick={() => setSelectedSizeIdx(idx)}
                        className={`p-2.5 text-start rounded-lg border text-xs transition-all ${
                          selectedSizeIdx === idx
                            ? 'border-[#A9803C] bg-[#FAF6F0] font-semibold text-[#1C1A17]'
                            : 'border-[#E4DCD0] hover:border-[#BDB09E] text-[#554D43]'
                        }`}
                      >
                        <div className="truncate">{s.label[language]}</div>
                        <div className="text-[11px] text-[#8E8377] font-normal">{s.dimensions}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity + Wishlist */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center border border-[#DCD3C5] rounded-lg overflow-hidden bg-[#FAF7F2]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-sm text-[#443D35] hover:bg-[#EFE7DC] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-semibold text-[#1C1A17] min-w-[32px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2 text-sm text-[#443D35] hover:bg-[#EFE7DC] transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`flex-1 py-2.5 px-3 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
                    isWishlisted
                      ? 'border-rose-300 bg-rose-50 text-rose-600'
                      : 'border-[#DCD3C5] text-[#4E473D] hover:border-[#1C1A17]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-rose-600' : ''}`} />
                  <span>
                    {isWishlisted
                      ? language === 'ar' ? 'في المفضلة' : 'Wishlisted'
                      : language === 'ar' ? 'إضافة للمفضلة' : 'Save to Wishlist'}
                  </span>
                </button>
              </div>
            </div>

            {/* Actions & Guarantees */}
            <div>
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                  isAdded
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#1C1A17] hover:bg-[#A9803C] text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{language === 'ar' ? 'تمت الإضافة إلى السلة بنجاح!' : 'Added to Cart Successfully!'}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      {language === 'ar' ? 'إضافة إلى سلة التسوق' : 'Add to Shopping Cart'} • {currentPrice * quantity} {language === 'ar' ? 'ر.س' : 'SAR'}
                    </span>
                  </>
                )}
              </button>

              <div className="mt-3 text-center">
                <Link
                  href={`/product/${productSlug}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-xs text-[#7A7165] hover:text-[#A9803C] font-medium transition-colors"
                >
                  <span>{language === 'ar' ? 'عرض تفاصيل المنتج والمقاسات الكاملة' : 'View Full Product Details & Specs'}</span>
                  <Arrow className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Saudi Trust Badges */}
              <div className="mt-4 pt-4 border-t border-[#EFE9DF] grid grid-cols-2 gap-2 text-[11px] text-[#7A7165]">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#A9803C] shrink-0" />
                  <span>{language === 'ar' ? 'توصيل وتركيب داخل الرياض' : 'Riyadh Delivery & Install'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#A9803C] shrink-0" />
                  <span>{language === 'ar' ? 'ضمان جودة الأقمشة ٥ سنوات' : '5-Year Quality Warranty'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
