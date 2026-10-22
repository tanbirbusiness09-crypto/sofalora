import React, { useState, useMemo, useEffect } from 'react';
import { useShop } from '../context/LanguageContext';
import { useRouter, Link } from '../context/RouterContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { Breadcrumbs } from '../components/PLP/Breadcrumbs';
import { ProductCard } from '../components/PLP/ProductCard';
import {
  Star,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Ruler,
  Clock,
  Sparkles,
  Check,
  RotateCcw,
  Phone,
  Calendar,
  Share2,
  Zap,
  Sliders,
  Info,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  Lock,
  BadgeCheck,
  Building,
  CreditCard,
  Plus,
  Minus,
  ZoomIn,
  X
} from 'lucide-react';

interface ProductDetailPageProps {
  productId?: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId: propId }) => {
  const {
    language,
    direction,
    addToCart,
    wishlist,
    toggleWishlist,
    formatPrice,
    recentlyViewed,
    addRecentlyViewed
  } = useShop();
  const { route, navigate } = useRouter();

  const idOrSlug = propId || route.params.id;

  // Find product by id or slug
  const product: Product = useMemo(() => {
    if (!idOrSlug) return PRODUCTS[0];
    return (
      PRODUCTS.find((p) => p.id === idOrSlug || p.slug === idOrSlug) ||
      PRODUCTS[0]
    );
  }, [idOrSlug]);

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedColorIdx, setSelectedColorIdx] = useState<number>(0);
  const [selectedSizeIdx, setSelectedSizeIdx] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Accordion toggles matching Noon design
  const [isBestPriceOpen, setIsBestPriceOpen] = useState<boolean>(false);
  const [isDeliveryOptionsOpen, setIsDeliveryOptionsOpen] = useState<boolean>(false);

  // Custom sizing mode
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [customWidth, setCustomWidth] = useState<number>(2.5);
  const [customHeight, setCustomHeight] = useState<number>(2.8);

  // Lightbox Zoom & Mobile Sticky Bar
  const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false);
  const [showStickyBar, setShowStickyBar] = useState<boolean>(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowStickyBar(window.scrollY > 420);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard accessibility: ESC key to close zoom modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isZoomOpen) {
        setIsZoomOpen(false);
      }
    };
    if (isZoomOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isZoomOpen]);

  // Sync state on product change and record in recently viewed
  useEffect(() => {
    setActiveImage(product.image);
    setSelectedColorIdx(0);
    setSelectedSizeIdx(0);
    setQuantity(1);
    setIsAdded(false);
    setIsCustomMode(false);
    addRecentlyViewed(product.id);
  }, [product.id]);

  const isWishlisted = wishlist.includes(product.id);
  const sizeModifier = product.sizes?.[selectedSizeIdx]?.priceModifier || 0;

  // Custom size price estimation: baseline price per 4.2m² average curtain
  const pricePerSqm = Math.max(95, Math.round(product.price / 4.2));
  const customArea = Math.round(customWidth * customHeight * 100) / 100;
  const customEstimatedTotal = Math.round(customArea * pricePerSqm);

  const currentPrice = isCustomMode ? customEstimatedTotal : product.price + sizeModifier;
  const originalPrice = product.oldPrice || product.comparePrice || Math.round(currentPrice * 1.25);
  const discountPercent = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

  // Multi-image gallery for Noon vertical gallery
  const images = useMemo(() => {
    const list = [product.image, product.secondaryImage].filter(Boolean) as string[];
    // Generate extra angles/thumbnails if only 1 or 2 images exist
    if (list.length === 1) {
      list.push(product.image);
    }
    return list;
  }, [product]);

  // Related products
  const relatedProducts = useMemo(() => {
    return PRODUCTS.filter(
      (p) => p.id !== product.id && p.categorySlug === product.categorySlug
    ).slice(0, 4);
  }, [product]);

  const handleAddToCart = () => {
    const selectedColor = product.colors?.[selectedColorIdx];
    if (isCustomMode) {
      addToCart(
        product,
        selectedColor,
        undefined,
        quantity,
        {
          width: customWidth,
          height: customHeight,
          unit: 'm',
          pricePerSqm,
          estimatedTotal: customEstimatedTotal
        }
      );
    } else {
      const selectedSize = product.sizes?.[selectedSizeIdx];
      addToCart(product, selectedColor, selectedSize, quantity);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const installmentAmount = Math.round((currentPrice / 4) * 100) / 100;
  const ChevronIcon = direction === 'rtl' ? ChevronLeft : ChevronRight;

  const isProductNotFound = Boolean(idOrSlug && !PRODUCTS.some((p) => p.id === idOrSlug || p.slug === idOrSlug));

  if (isProductNotFound) {
    return (
      <div className="bg-[#FBF8F3] min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-lg w-full bg-white rounded-3xl border border-[#E7DACB] p-8 sm:p-10 shadow-sm text-center">
          <div className="w-16 h-16 rounded-full bg-[#FAF5EE] text-[#8F3E24] flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#1B211D] mb-2">
            {language === 'ar' ? 'المنتج غير متوفر حالياً' : 'Product Not Found'}
          </h1>
          <p className="text-sm text-[#747B72] mb-6">
            {language === 'ar'
              ? 'عذراً، لم نتمكن من العثور على هذا المنتج. قد يكون نفد من المخزون أو تم تحديث الرابط.'
              : 'The requested product could not be found. It may be out of stock or the link has changed.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/shop"
              className="px-6 py-2.5 rounded-xl bg-[#1B211D] hover:bg-[#8F3E24] text-white text-xs font-bold transition-all"
            >
              {language === 'ar' ? 'تصفح الكنب والستائر' : 'Browse Sofas & Curtains'}
            </Link>
            <Link
              href="/"
              className="px-6 py-2.5 rounded-xl bg-[#FAF6F0] hover:bg-[#EFE7DB] text-[#454D47] text-xs font-bold transition-all border border-[#DACDBE]"
            >
              {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F7F7] min-h-screen pb-20">
      {/* Top Breadcrumbs Bar matching Noon screenshot */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between text-xs text-neutral-500">
          <Breadcrumbs
            items={[
              { label: { en: 'Home', ar: 'الرئيسية' }, href: '/' },
              { label: { en: 'Sofas & Curtains', ar: 'الكنب والستائر' }, href: '/shop' },
              { label: product.category, href: `/category/${product.categorySlug}` },
              { label: product.name }
            ]}
          />
          <div className="hidden md:flex items-center gap-2">
            <span className="text-[10px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded font-mono">
              SKU: SL-{product.id}
            </span>
          </div>
        </div>
      </div>

      {/* Main Product Container - Exact 3-Column Noon Architecture */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-6 lg:p-8 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* 1. LEFT GALLERY: Vertical Thumbnail Strip + Big Image Stage (5 cols) */}
            <div className="lg:col-span-5 flex flex-col-reverse sm:flex-row gap-3">
              {/* Vertical Thumbnails List */}
              <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto max-h-[480px] shrink-0 pb-2 sm:pb-0 scrollbar-none">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`w-14 h-16 sm:w-16 sm:h-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 bg-[#F4EDE4] ${
                      activeImage === img
                        ? 'border-[#8F3E24] ring-1 ring-[#8F3E24]/30'
                        : 'border-neutral-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Big Main Stage */}
              <div
                onClick={() => setIsZoomOpen(true)}
                className="relative flex-1 aspect-[4/5] rounded-xl overflow-hidden bg-[#FCF9F4] border border-neutral-200 flex items-center justify-center group cursor-zoom-in"
                title={language === 'ar' ? 'انقر لتكبير ومعاينة الصورة' : 'Click to zoom and view full resolution'}
              >
                <img
                  src={activeImage || product.image}
                  alt={product.name[language]}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Floating Zoom Indicator on Hover */}
                <div className="absolute bottom-3 end-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs flex items-center gap-1 text-[11px] px-2.5 z-10 pointer-events-none">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{language === 'ar' ? 'تكبير الصورة' : 'Zoom'}</span>
                </div>

                {/* Floating Badges */}
                <div className="absolute top-3 start-3 flex flex-col gap-1.5 z-10">
                  {product.badge && (
                    <span className="px-2.5 py-1 bg-[#1B211D]/90 backdrop-blur-xs text-white text-[11px] font-bold rounded shadow-xs">
                      {product.badge[language]}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="px-2.5 py-1 bg-emerald-600 text-white text-[11px] font-bold rounded shadow-xs">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>

                {/* Wishlist & Share buttons */}
                <div className="absolute top-3 end-3 flex flex-col gap-2 z-10">
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Wishlist"
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-xs border ${
                      isWishlisted
                        ? 'bg-rose-50 text-rose-600 border-rose-200'
                        : 'bg-white/95 text-neutral-600 hover:text-rose-600 border-neutral-200'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    type="button"
                    onClick={handleShare}
                    aria-label="Share"
                    className="w-9 h-9 rounded-full bg-white/95 text-neutral-600 hover:text-[#8F3E24] flex items-center justify-center transition-all shadow-xs border border-neutral-200"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {copiedLink && (
                  <div className="absolute bottom-3 inset-x-3 bg-neutral-900/90 text-white py-2 px-3 rounded-lg text-center text-xs font-semibold backdrop-blur-xs z-20">
                    {language === 'ar' ? 'تم نسخ الرابط بنجاح!' : 'Link copied to clipboard!'}
                  </div>
                )}
              </div>
            </div>

            {/* 2. MIDDLE COLUMN: Specs, Delivery & Options (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              {/* Brand Link */}
              <div className="flex items-center justify-between">
                <Link
                  href="/shop"
                  className="text-xs font-bold text-[#8F3E24] hover:text-[#7A331D] hover:underline flex items-center gap-1 uppercase tracking-wide"
                >
                  <span>{language === 'ar' ? 'سوفالورا - المشغل الفاخر' : 'SOFALORA ATELIER'}</span>
                  <ChevronIcon className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] text-neutral-400">
                  {product.fabric?.[language]}
                </span>
              </div>

              {/* Product Title */}
              <h1 className="text-lg sm:text-xl font-bold text-neutral-900 leading-snug">
                {product.name[language]}
              </h1>

              {/* Ratings */}
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-neutral-900">{product.rating.toFixed(1)}</span>
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-neutral-200 text-neutral-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[#8F3E24] hover:text-[#7A331D] hover:underline cursor-pointer">
                  {product.reviewCount || product.reviews || 31} {language === 'ar' ? 'تقييم' : 'Ratings'}
                </span>
              </div>

              {/* Noon Price Block */}
              <div className="pt-2 pb-1 border-y border-neutral-100">
                <div className="flex items-baseline gap-2.5 flex-wrap">
                  <span className="text-2xl sm:text-3xl font-black text-neutral-900">
                    {formatPrice(currentPrice)}
                  </span>
                  {originalPrice > currentPrice && (
                    <span className="text-sm text-neutral-400 line-through">
                      {formatPrice(originalPrice)}
                    </span>
                  )}
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {language === 'ar' ? 'توصيل مجاني' : 'Free Delivery'}
                  </span>
                </div>

                {/* Best Price with offers accordion matching Noon */}
                <div className="mt-2.5 border border-neutral-200 rounded-lg overflow-hidden text-xs">
                  <button
                    type="button"
                    onClick={() => setIsBestPriceOpen(!isBestPriceOpen)}
                    className="w-full px-3 py-2 bg-neutral-50 hover:bg-neutral-100 flex items-center justify-between font-semibold text-neutral-800"
                  >
                    <span className="flex items-center gap-1.5 text-emerald-700">
                      <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                        %
                      </span>
                      <span>
                        {language === 'ar' ? 'أفضل سعر مع العروض' : 'Best Price with offers'}
                      </span>
                    </span>
                    <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform ${isBestPriceOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isBestPriceOpen && (
                    <div className="p-3 bg-white space-y-1.5 text-neutral-600 border-t border-neutral-200 text-[11px]">
                      <p>
                        • <strong>15% OFF</strong> {language === 'ar' ? 'مع بطاقات الراجحي والإنماء' : 'with Al Rajhi & Alinma credit cards'}
                      </p>
                      <p>
                        • <strong>WELCOME10</strong> {language === 'ar' ? 'خصم ١٠٪ على أول طلب منزلي' : 'extra 10% on your first sofa or curtain order'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Explore other bestsellers */}
                <Link
                  href="/shop"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#8F3E24] hover:text-[#7A331D] hover:underline"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{language === 'ar' ? 'استكشف الأكثر مبيعاً في الكنب والستائر' : 'Explore bestsellers in Sofas & Curtains'}</span>
                  <ChevronIcon className="w-3 h-3" />
                </Link>
              </div>

              {/* ATELIER DELIVERY INFORMATION Block */}
              <div className="space-y-2 text-xs">
                <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                  {language === 'ar' ? 'معلومات التوصيل والتركيب' : 'DELIVERY INFORMATION'}
                </div>

                {/* Atelier Express Tag */}
                <div className="p-3 bg-[#FBF8F3] border border-[#E8DCCD] rounded-lg">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#8F3E24] text-white px-2.5 py-0.5 rounded-full font-bold text-[10px] tracking-wider uppercase shadow-2xs">
                        {language === 'ar' ? 'توصيل وتركيب سريع' : 'EXPRESS ATELIER'}
                      </span>
                      <span className="font-bold text-neutral-900">
                        {language === 'ar' ? 'استلمها غداً في الرياض' : 'Get it Tomorrow'}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#8F3E24] font-semibold">
                      {language === 'ar' ? 'اطلب خلال ١٦س ٧د' : 'Order in 16h 7m'}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-600 mt-1">
                    {language === 'ar'
                      ? 'يشمل خدمة التركيب الليزري المجانية داخل جميع أحياء الرياض.'
                      : 'Includes free laser precision in-home installation across all Riyadh districts.'}
                  </p>
                </div>

                {/* Faster Delivery Options accordion */}
                <div className="border border-neutral-200 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setIsDeliveryOptionsOpen(!isDeliveryOptionsOpen)}
                    className="w-full px-3 py-2 bg-white hover:bg-neutral-50 flex items-center justify-between text-neutral-700 font-medium"
                  >
                    <span>{language === 'ar' ? 'خيارات استلام إضافية' : 'Faster Delivery Options'}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-neutral-500 transition-transform ${isDeliveryOptionsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isDeliveryOptionsOpen && (
                    <div className="p-3 bg-neutral-50 border-t border-neutral-200 space-y-2 text-[11px] text-neutral-600">
                      <div className="flex justify-between">
                        <span>{language === 'ar' ? 'استلام فوري من معرض طريق الملك فهد' : 'King Fahd Rd Flagship Pickup'}</span>
                        <span className="font-bold text-emerald-700">{language === 'ar' ? 'مجاناً' : 'FREE'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{language === 'ar' ? 'توصيل مستعجل VIP في نفس اليوم' : 'Same-Day VIP Priority Courier'}</span>
                        <span className="font-bold text-neutral-900">SAR 45</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Atelier VIP banner */}
                <div className="p-2.5 bg-neutral-900 text-white rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#8F3E24] text-white font-bold text-[10px] px-2 py-0.5 rounded">
                      VIP
                    </span>
                    <span className="text-[11px] font-semibold">
                      {language === 'ar' ? 'توصيل وتركيب مجاني اليوم مع عضوية VIP' : 'Get Free delivery Today with VIP'}
                    </span>
                  </div>
                  <ChevronIcon className="w-3.5 h-3.5 text-neutral-400" />
                </div>
              </div>

              {/* Color Selection with swatches */}
              {product.colors && product.colors.length > 0 && (
                <div className="pt-2">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-neutral-800">
                      {language === 'ar' ? 'اللون / القماش:' : 'Color & Fabric:'}
                    </span>
                    <span className="text-neutral-500">
                      {product.colors[selectedColorIdx]?.name[language]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedColorIdx(idx)}
                        className={`group relative p-1 rounded-full border-2 transition-all ${
                          selectedColorIdx === idx
                            ? 'border-[#8F3E24] ring-2 ring-[#8F3E24]/20'
                            : 'border-transparent hover:border-neutral-300'
                        }`}
                        title={color.name[language]}
                      >
                        <span
                          className="block w-6 h-6 rounded-full border border-black/10 shadow-xs"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection + Custom Dimension Mode */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-neutral-800">
                    {language === 'ar' ? 'المقاس / الأبعاد:' : 'Size & Dimensions:'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsCustomMode(!isCustomMode)}
                    className="text-[#8F3E24] hover:text-[#7A331D] hover:underline font-semibold flex items-center gap-1"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>
                      {isCustomMode
                        ? language === 'ar' ? 'المقاسات القياسية' : 'Standard Sizes'
                        : language === 'ar' ? 'تفصيل مخصص حسب مقاس نافذتك' : 'Custom Dimension Calculator'}
                    </span>
                  </button>
                </div>

                {isCustomMode ? (
                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg space-y-2 text-xs">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                          {language === 'ar' ? 'العرض (متر)' : 'Width (m)'}
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          min="1"
                          max="8"
                          value={customWidth}
                          onChange={(e) => setCustomWidth(parseFloat(e.target.value) || 1)}
                          className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs text-neutral-900 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                          {language === 'ar' ? 'الارتفاع (متر)' : 'Height (m)'}
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          min="1"
                          max="6"
                          value={customHeight}
                          onChange={(e) => setCustomHeight(parseFloat(e.target.value) || 1)}
                          className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs text-neutral-900 font-bold"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-[11px] pt-1 text-neutral-600 border-t border-neutral-200">
                      <span>{customArea} m² ({pricePerSqm} SAR/m²)</span>
                      <span className="font-bold text-[#8F3E24]">{formatPrice(customEstimatedTotal)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {product.sizes?.map((size, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedSizeIdx(idx)}
                        className={`py-2 px-2.5 rounded-lg border text-center transition-all text-xs ${
                          selectedSizeIdx === idx
                            ? 'border-[#8F3E24] bg-[#FBF8F3] text-[#8F3E24] font-bold ring-1 ring-[#8F3E24]'
                            : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-700'
                        }`}
                      >
                        <span className="block font-semibold">{size.label[language]}</span>
                        <span className="block text-[10px] text-neutral-500">
                          {size.dimensions}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* PAYMENT DISCOUNT banner (Tabby / Tamara) */}
              <div className="pt-2">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-neutral-900 bg-neutral-200 px-1.5 py-0.5 rounded text-[10px]">
                      tabby
                    </span>
                    <span className="font-mono font-bold text-neutral-900 bg-amber-200 px-1.5 py-0.5 rounded text-[10px]">
                      tamara
                    </span>
                    <span className="text-neutral-700 font-medium">
                      {language === 'ar'
                        ? `قسّمها على ٤ دفعات بقيمة ${formatPrice(installmentAmount)}`
                        : `Pay in 4 installments of ${formatPrice(installmentAmount)}`}
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-400">0% Interest</span>
                </div>
              </div>
            </div>

            {/* 3. RIGHT COLUMN: Buy Box & Seller Info (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="p-4 sm:p-5 bg-white border border-neutral-200 rounded-xl space-y-4 shadow-xs">
                {/* Sold by header */}
                <div className="pb-3 border-b border-neutral-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-neutral-900 text-[#8F3E24] flex items-center justify-center font-serif font-bold text-xs border border-[#8F3E24]/30">
                        MC
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-900 hover:text-[#8F3E24] flex items-center gap-1 cursor-pointer">
                          <span>{language === 'ar' ? 'المشغل الرئيسي' : 'Sold by Sofalora'}</span>
                          <ChevronIcon className="w-3 h-3 text-neutral-400" />
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                          <span className="text-amber-500 font-bold">★ 4.9</span>
                          <span>|</span>
                          <span>98% {language === 'ar' ? 'تقييم إيجابي' : 'Positive'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Seller Quality Metrics */}
                  <div className="mt-3 grid grid-cols-3 gap-1.5 text-center text-[10px] bg-neutral-50 p-2 rounded-lg border border-neutral-100">
                    <div>
                      <div className="font-bold text-emerald-700">100%</div>
                      <div className="text-neutral-500 leading-tight">{language === 'ar' ? 'تطابق الصور' : 'Item as shown'}</div>
                    </div>
                    <div>
                      <div className="font-bold text-neutral-900">4+ Y</div>
                      <div className="text-neutral-500 leading-tight">{language === 'ar' ? 'شريك معتمد' : 'Partner'}</div>
                    </div>
                    <div>
                      <div className="font-bold text-emerald-700">&lt;1%</div>
                      <div className="text-neutral-500 leading-tight">{language === 'ar' ? 'نسبة الإرجاع' : 'Low return'}</div>
                    </div>
                  </div>
                </div>

                {/* Guarantees checklist */}
                <div className="space-y-2.5 text-xs text-neutral-700">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#8F3E24] shrink-0" />
                    <span>{language === 'ar' ? 'ضمان ٥ سنوات على الأقمشة والإكسسوارات' : '5 year luxury drapery warranty'}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Truck className="w-4 h-4 text-[#8F3E24] shrink-0" />
                    <span>{language === 'ar' ? 'توصيل وتركيب مجاني في الرياض' : 'Free delivery & laser installation'}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <RotateCcw className="w-4 h-4 text-[#8F3E24] shrink-0" />
                    <span>{language === 'ar' ? 'إمكانية التعديل خلال ١٤ يوماً' : 'Easy and Hassle Free Returns'}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Lock className="w-4 h-4 text-[#8F3E24] shrink-0" />
                    <span>{language === 'ar' ? 'مدفوعات مشفرة وآمنة ١٠٠٪' : 'Secure Payments'}</span>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-700">
                    {language === 'ar' ? 'الكمية:' : 'Quantity:'}
                  </span>
                  <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-neutral-50">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="p-1.5 hover:bg-neutral-200 disabled:opacity-40 text-neutral-700"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-neutral-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1.5 hover:bg-neutral-200 text-neutral-700"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Brand Gold ADD TO CART Button */}
                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={`w-full py-3 px-4 rounded-lg font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-sm ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#8F3E24] hover:bg-[#7A331D] active:bg-[#73531F] text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{language === 'ar' ? 'تمت الإضافة للسلة!' : 'ADDED TO CART!'}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>{language === 'ar' ? 'إضافة إلى السلة' : 'ADD TO CART'}</span>
                      </>
                    )}
                  </button>

                  {/* BUY NOW Button */}
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="w-full py-3 px-4 rounded-lg font-bold text-sm tracking-wide bg-white hover:bg-[#FBF8F3] border-2 border-[#8F3E24] text-[#8F3E24] hover:text-[#7A331D] transition-all flex items-center justify-center gap-2"
                  >
                    <span>{language === 'ar' ? 'شراء الآن (دفع سريع)' : 'BUY NOW'}</span>
                  </button>
                </div>

                <div className="text-center">
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center justify-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{language === 'ar' ? 'متوفر في مشغل الرياض - تفصيل فوري' : 'In Stock - Ready for Atelier Dispatch'}</span>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Product Details Specs & Accordion Tabs */}
        <div className="mt-8 bg-white rounded-xl border border-neutral-200 p-6 sm:p-8 shadow-2xs">
          <h2 className="text-lg font-bold text-neutral-900 mb-4 pb-2 border-b border-neutral-100">
            {language === 'ar' ? 'مواصفات وتفاصيل الستارة الملكية' : 'Product Specifications & Features'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-neutral-700">
            <div className="space-y-3">
              <p className="leading-relaxed">{product.description[language]}</p>
              <div className="space-y-2 pt-2">
                <div className="flex justify-between py-1.5 border-b border-neutral-100">
                  <span className="text-neutral-500">{language === 'ar' ? 'نوع القماش' : 'Fabric Composition'}</span>
                  <span className="font-semibold text-neutral-900">{product.fabric?.[language] || 'European Velvet & Linen'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-100">
                  <span className="text-neutral-500">{language === 'ar' ? 'نسبة حجب الضوء' : 'Opacity & Blackout'}</span>
                  <span className="font-semibold text-neutral-900">{product.lightControl || '100% Thermal Blackout'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-100">
                  <span className="text-neutral-500">{language === 'ar' ? 'بلد المنشأ' : 'Origin & Craftsmanship'}</span>
                  <span className="font-semibold text-neutral-900">{language === 'ar' ? 'مشاغل الرياض اليدوية' : 'Riyadh Master Atelier'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 bg-[#FBF8F3] p-5 rounded-xl border border-neutral-200">
              <h3 className="font-bold text-neutral-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8F3E24]" />
                <span>{language === 'ar' ? 'خدمة التركيب الليزري الشاملة' : 'Complimentary White-Glove Installation'}</span>
              </h3>
              <p className="text-neutral-600 leading-relaxed text-[11px]">
                {language === 'ar'
                  ? 'يقوم فريقنا المتخصص بقياس المساحة وتركيب قطع الكنب وتثبيت الستائر وكيّ الأقمشة في موقعك لضمان تشطيب فاخر لا تشوبه شائبة.'
                  : 'Our specialists measure, place your seating, hang and steam-press your curtains on site for an immaculate finish.'}
              </p>
              <div className="flex items-center gap-3 pt-2 text-[11px] font-semibold text-neutral-800">
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  {language === 'ar' ? 'دقة مليمترية' : 'Laser Guided'}
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  {language === 'ar' ? 'محركات ذكية' : 'Smart Motor Ready'}
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  {language === 'ar' ? 'ضمان شامل' : 'Full Warranty'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-neutral-900">
                {language === 'ar' ? 'قطع مشابهة قد تنال إعجابك' : 'Similar Pieces You May Love'}
              </h2>
              <Link href="/shop" className="text-xs font-bold text-[#8F3E24] hover:text-[#7A331D] hover:underline flex items-center gap-1">
                <span>{language === 'ar' ? 'عرض الكل' : 'View All'}</span>
                <ChevronIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen High-Resolution Image Lightbox Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label={product.name[language]}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-5 end-5 min-w-[44px] min-h-[44px] w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors z-10"
            aria-label="Close zoom"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Click outside container */}
          <div className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center justify-center">
            <img
              src={activeImage || product.image}
              alt={product.name[language]}
              className="max-h-[82vh] max-w-full object-contain rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200"
            />
            <div className="mt-3 text-center text-white/80 text-xs">
              <span className="font-semibold text-white">{product.name[language]}</span>
              <span className="mx-2">•</span>
              <span>{product.fabric?.[language] || 'European Fabric'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sticky Bottom Action Bar */}
      {showStickyBar && (
        <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-3 sm:hidden z-30 shadow-2xl flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-300">
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-neutral-900 truncate">
              {product.name[language]}
            </div>
            <div className="text-sm font-black text-[#8F3E24] font-serif">
              {formatPrice(currentPrice)}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`min-h-[44px] px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors active:scale-95 ${
                isAdded ? 'bg-emerald-700 text-white' : 'bg-[#1B211D] text-white hover:bg-[#8F3E24]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{language === 'ar' ? 'تمت الإضافة ✓' : 'Added ✓'}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#E6B183]" />
                  <span>{language === 'ar' ? 'أضف للسلة' : 'Add to Cart'}</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="min-h-[44px] px-3.5 py-2 text-xs font-bold rounded-xl bg-[#8F3E24] text-white hover:bg-[#7A331D] shadow-xs active:scale-95 transition-colors"
            >
              {language === 'ar' ? 'شراء' : 'Buy'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
