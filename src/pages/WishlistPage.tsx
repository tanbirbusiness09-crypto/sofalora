import React, { useMemo } from 'react';
import { useShop } from '../context/LanguageContext';
import { useRouter, Link } from '../context/RouterContext';
import { PRODUCTS } from '../data/products';
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Share2,
  Sparkles,
  Check
} from 'lucide-react';
import { ProductCard } from '../components/PLP/ProductCard';

export const WishlistPage: React.FC = () => {
  const {
    wishlist,
    toggleWishlist,
    addToCart,
    language,
    direction,
    formatPrice,
    t
  } = useShop();
  const { navigate } = useRouter();

  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

  const wishlistedProducts = useMemo(() => {
    return wishlist
      .map((id) => PRODUCTS.find((p) => p.id === id))
      .filter(Boolean);
  }, [wishlist]);

  const [copiedShare, setCopiedShare] = React.useState(false);
  const [addedAll, setAddedAll] = React.useState(false);

  const handleShareWishlist = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const handleAddAllToCart = () => {
    wishlistedProducts.forEach((prod) => {
      if (!prod) return;
      const defaultColor = prod.colors?.[0];
      const defaultSize = prod.sizes?.[0];
      addToCart(prod, defaultColor, defaultSize, 1);
    });
    setAddedAll(true);
    setTimeout(() => {
      setAddedAll(false);
      navigate('/cart');
    }, 800);
  };

  return (
    <div className="bg-[#FDFCFA] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#0A2A5E] font-semibold">
              {language === 'ar' ? 'المجموعات المحفوظة' : 'Curated Favorites'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#101828] flex items-center gap-3 mt-1">
              <span>{language === 'ar' ? 'قائمة الأمنيات والمفضلة' : 'My Wishlist'}</span>
              <span className="text-sm font-sans font-semibold bg-[#EEEAE2] text-[#667085] px-3 py-0.5 rounded-full">
                {wishlist.length} {language === 'ar' ? 'منتجات' : 'items'}
              </span>
            </h1>
          </div>

          {wishlistedProducts.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleShareWishlist}
                className="inline-flex items-center gap-1.5 bg-white text-[#101828] hover:bg-[#FDFCFA] px-3.5 py-2 rounded-xl text-xs font-bold border border-[#CFC8BA] transition-all"
              >
                <Share2 className="w-3.5 h-3.5 text-[#0A2A5E]" />
                <span>
                  {copiedShare
                    ? language === 'ar'
                      ? 'تم نسخ الرابط!'
                      : 'Link Copied!'
                    : language === 'ar'
                    ? 'مشاركة القائمة'
                    : 'Share Wishlist'}
                </span>
              </button>

              <button
                type="button"
                onClick={handleAddAllToCart}
                disabled={addedAll}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                  addedAll
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#0A2A5E] hover:bg-[#061C3F] text-white'
                }`}
              >
                {addedAll ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'تمت إضافة الكل!' : 'Added All to Bag!'}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5 text-[#E3C98F]" />
                    <span>{language === 'ar' ? 'إضافة الكل إلى السلة' : 'Add All to Bag'}</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Empty State */}
        {wishlistedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E8DEC\-D] max-w-lg mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-full bg-[#FDFCFA] text-[#0A2A5E] flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold font-serif text-[#101828] mb-2">
              {language === 'ar' ? 'قائمة أمنياتك فارغة' : 'Your Wishlist is Empty'}
            </h2>
            <p className="text-xs text-[#667085] mb-6 leading-relaxed">
              {language === 'ar'
                ? 'احفظ الكنب والستائر المفضلة لديك هنا للرجوع إليها أو تنسيقها لاحقاً.'
                : 'Save your favorite sofas and curtains here for later comparison or consultation.'}
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#0A2A5E] hover:bg-[#061C3F] text-white px-6 py-3 rounded-full text-xs font-bold transition-all shadow-sm"
            >
              <span>{language === 'ar' ? 'استكشف الكنب والستائر' : 'Explore Sofas & Curtains'}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlistedProducts.map((product) => {
              if (!product) return null;
              return (
                <div key={product.id} className="relative group">
                  <ProductCard product={product} viewMode="grid" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
