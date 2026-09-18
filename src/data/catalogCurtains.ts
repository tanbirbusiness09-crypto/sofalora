import { Product } from '../types';

export const CURTAIN_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'royal-blackout-curtain',
    name: {
      en: 'Royal Blackout Curtain',
      ar: 'ستارة رويال عازلة للضوء'
    },
    category: {
      en: 'Blackout Curtains',
      ar: 'الستائر المعتمة'
    },
    categorySlug: 'blackout-curtains',
    subcategory: { en: 'Triple Weave Thermal', ar: 'حراري ثلاثي الطبقات' },
    subcategorySlug: 'triple-weave',
    collection: 'luxury-blackout',
    description: {
      en: 'Masterfully woven triple-weave blackout curtain engineered to block 100% of Riyadh’s intense sunlight while insulating against desert heat and reducing street noise.',
      ar: 'ستارة ثلاثية النسيج معززة بطبقة عزل حرارية تحجب ١٠٠٪ من أشعة شمس الظهيرة في الرياض مع عزل الحرارة وتخفيف الضوضاء الخارجية.'
    },
    price: 349,
    oldPrice: 449,
    comparePrice: 449,
    discount: 22,
    rating: 4.9,
    reviews: 126,
    reviewCount: 126,
    badge: { en: 'Bestseller', ar: 'الأكثر مبيعاً' },
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
    fabric: { en: 'Triple Weave Thermal Velvet', ar: 'مخمل حراري ثلاثي الطبقات' },
    pattern: { en: 'Smooth Matte', ar: 'مطفي ناعم' },
    lightControl: 'blackout',
    colors: [
      { id: 'champagne', name: { en: 'Desert Champagne', ar: 'شامبين صحراوي' }, hex: '#D6C7A1' },
      { id: 'charcoal', name: { en: 'Najd Charcoal', ar: 'فحمي نجدي' }, hex: '#2A2A2A' },
      { id: 'ivory', name: { en: 'Warm Ivory', ar: 'عاجي دافئ' }, hex: '#F0ECE1' },
      { id: 'olive', name: { en: 'Saudi Bronze', ar: 'برونز ملكي' }, hex: '#8C7355' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Standard Window', ar: 'نافذة قياسية' }, dimensions: '150cm × 260cm', priceModifier: 0 },
      { id: 's2', label: { en: 'Wide Window', ar: 'نافذة عريضة' }, dimensions: '220cm × 280cm', priceModifier: 90 },
      { id: 's3', label: { en: 'Villa High Ceiling', ar: 'سقف فيلا شاهق' }, dimensions: '300cm × 340cm', priceModifier: 180 }
    ],
    room: { en: 'Master Bedroom & Living Room', ar: 'غرفة النوم الرئيسية والمجلس' },
    features: [
      { en: '100% Total Darkness Blackout', ar: 'عتمة كاملة بنسبة ١٠٠٪' },
      { en: 'Reflects 45% Exterior Heat', ar: 'تعكس ٤٥٪ من حرارة الشمس' },
      { en: 'Acoustic Sound Dampening', ar: 'تخفيف صدى الصوت والضوضاء' }
    ],
    inStock: true,
    stock: 42,
    isBestSeller: true,
    isSale: true
  },
  {
    id: 'prod-2',
    slug: 'milano-sheer-curtain',
    name: {
      en: 'Milano Sheer Curtain',
      ar: 'ستارة ميلانو شيفون الشفافة'
    },
    category: {
      en: 'Sheer Curtains',
      ar: 'الستائر الشفافة'
    },
    categorySlug: 'sheer-curtains',
    subcategory: { en: 'Italian Organza', ar: 'شيفون إيطالي' },
    subcategorySlug: 'organza',
    collection: 'modern-sheer',
    description: {
      en: 'Ultra-refined Italian organza sheer curtain that creates soft diffused daylight while preserving outdoor views and complete interior daytime privacy.',
      ar: 'شيفون إيطالي انسيابي فائق النقاء يمنح الغرفة إضاءة نهارية ناعمة ودافئة مع الحفاظ على الخصوصية التامة من الخارج.'
    },
    price: 269,
    oldPrice: 329,
    comparePrice: 329,
    discount: 18,
    rating: 4.8,
    reviews: 94,
    reviewCount: 94,
    badge: { en: 'Trending', ar: 'رائج الآن' },
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    fabric: { en: 'Italian Textured Voile', ar: 'فوال إيطالي ناعم الملمس' },
    pattern: { en: 'Subtle Slub', ar: 'تموج هادئ' },
    lightControl: 'sheer',
    colors: [
      { id: 'pure-white', name: { en: 'Alabaster White', ar: 'أبيض مرمر' }, hex: '#FDFDFD' },
      { id: 'cream', name: { en: 'Warm Cream', ar: 'كريمي دافئ' }, hex: '#F5EFE6' },
      { id: 'soft-grey', name: { en: 'Mist Gray', ar: 'رمادي ضبابي' }, hex: '#E1E3E1' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Standard Window', ar: 'نافذة قياسية' }, dimensions: '150cm × 260cm', priceModifier: 0 },
      { id: 's2', label: { en: 'Double Width', ar: 'عرض مزدوج' }, dimensions: '250cm × 280cm', priceModifier: 70 },
      { id: 's3', label: { en: 'Majlis Grande', ar: 'مجلس كبير' }, dimensions: '320cm × 320cm', priceModifier: 150 }
    ],
    room: { en: 'Living Room & Dining Salon', ar: 'غرفة المعيشة وصالون الضيوف' },
    features: [
      { en: 'Gentle Daylight Diffusion', ar: 'تشتيت ناعم لأشعة الشمس' },
      { en: 'Fluid Drape Weight Hem', ar: 'حاشية سفلية مثقلة لانسيابية ملكية' },
      { en: 'Anti-Static Dust Shield', ar: 'معالجة ضد تجمع الغبار' }
    ],
    inStock: true,
    stock: 58,
    isBestSeller: true
  },
  {
    id: 'prod-3',
    slug: 'velvet-luxe-curtain',
    name: {
      en: 'Velvet Luxe Curtain',
      ar: 'ستارة فيلفيت لوكس المخملية'
    },
    category: {
      en: 'Curtains',
      ar: 'الستائر الفاخرة'
    },
    categorySlug: 'curtains',
    subcategory: { en: 'Heavyweight Velvet', ar: 'مخمل ثقيل فاخر' },
    subcategorySlug: 'velvet',
    collection: 'saudi-home',
    description: {
      en: 'Heavyweight matte velvet engineered for traditional Saudi majlis and contemporary luxury villas, delivering grand stature and deep opulent drape lines.',
      ar: 'مخمل ملكي كثيف غير لامع، صُمم للمجالس السعودية الفاخرة والفلل المعاصرة ليمنح الجلسة فخامة استثنائية وهيبة راقية.'
    },
    price: 489,
    oldPrice: 599,
    comparePrice: 599,
    discount: 18,
    rating: 4.95,
    reviews: 168,
    reviewCount: 168,
    badge: { en: 'Luxury Choice', ar: 'خيار الفخامة' },
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    fabric: { en: 'Heritage Dense Velvet 480 GSM', ar: 'مخمل تراثي كثيف ٤٨٠ جم' },
    pattern: { en: 'Solid Rich Pile', ar: 'مخمل مصمت بارز' },
    lightControl: 'room-darkening',
    colors: [
      { id: 'deep-emerald', name: { en: 'Riyadh Royal Green', ar: 'أخضر ملكي سعودي' }, hex: '#1C3B2B' },
      { id: 'midnight-navy', name: { en: 'Deep Midnight', ar: 'كحلي ليلي عميق' }, hex: '#152238' },
      { id: 'warm-taupe', name: { en: 'Dune Taupe', ar: 'توب رمادي دافئ' }, hex: '#8F8275' },
      { id: 'desert-gold', name: { en: 'Antique Gold', ar: 'ذهبي عتيق' }, hex: '#B89B5F' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Single Panel (180cm)', ar: 'لوح مفرد (١٨٠ سم)' }, dimensions: '180cm × 270cm', priceModifier: 0 },
      { id: 's2', label: { en: 'Double Panel (300cm)', ar: 'لوح مزدوج (٣٠٠ سم)' }, dimensions: '300cm × 290cm', priceModifier: 140 },
      { id: 's3', label: { en: 'Villa Ceiling (400cm)', ar: 'سقف فيلا (٤٠٠ سم)' }, dimensions: '400cm × 360cm', priceModifier: 280 }
    ],
    room: { en: 'Main Majlis & Master Suite', ar: 'المجلس الرئيسي وجناح النوم' },
    features: [
      { en: 'Weighted Pinch Pleat Header', ar: 'طيات فرنسية مثقلة بالرصاص' },
      { en: 'Thermal & Sound Shield', ar: 'عزل حراري وصوتي متميز' },
      { en: 'Fade-Resistant Yarn Dyed', ar: 'ألوان ثابتة ومقاومة للبهتان' }
    ],
    inStock: true,
    stock: 25,
    isBestSeller: true
  },
  {
    id: 'prod-4',
    slug: 'sandstone-linen-curtain',
    name: {
      en: 'Sandstone Linen Curtain',
      ar: 'ستارة كتان سندستون الطبيعية'
    },
    category: {
      en: 'Curtains',
      ar: 'الستائر الفاخرة'
    },
    categorySlug: 'curtains',
    subcategory: { en: 'Belgian Flax Linen', ar: 'كتان بلجيكي نقي' },
    subcategorySlug: 'linen',
    collection: 'natural-linen',
    description: {
      en: 'Belgian-inspired raw flax linen curtain with subtle slub texture, ideal for organic modern aesthetics and airy light-filled Riyadh villas.',
      ar: 'كتان نقي مستوحى من الطبيعة بملمس غني وبارز، ينسجم بسلاسة مع الديكورات المعاصرة والفلل المفتوحة المضيئة.'
    },
    price: 389,
    oldPrice: 479,
    comparePrice: 479,
    discount: 19,
    rating: 4.75,
    reviews: 82,
    reviewCount: 82,
    badge: { en: 'Organic Pure', ar: 'كتان طبيعي' },
    image: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800&auto=format&fit=crop',
    fabric: { en: '100% Pure Flax Linen Blend', ar: 'مزيج كتان نقي ١٠٠٪' },
    pattern: { en: 'Raw Organic Slub', ar: 'نسيج كتاني طبيعي' },
    lightControl: 'light-filtering',
    colors: [
      { id: 'sand', name: { en: 'Diriyah Sandstone', ar: 'رمل الدرعية' }, hex: '#D7C7AF' },
      { id: 'oatmeal', name: { en: 'Warm Oatmeal', ar: 'شوفان دافئ' }, hex: '#E5DED1' },
      { id: 'charcoal-linen', name: { en: 'Slate Charcoal', ar: 'فحمي حجري' }, hex: '#444240' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Standard Window', ar: 'نافذة قياسية' }, dimensions: '150cm × 260cm', priceModifier: 0 },
      { id: 's2', label: { en: 'Wide Window', ar: 'نافذة عريضة' }, dimensions: '220cm × 280cm', priceModifier: 80 },
      { id: 's3', label: { en: 'High Ceiling', ar: 'سقف مرتفع' }, dimensions: '280cm × 320cm', priceModifier: 160 }
    ],
    room: { en: 'Living Room & Dining Area', ar: 'غرفة المعيشة وصالة الطعام' },
    features: [
      { en: 'Breathable Natural Fibers', ar: 'ألياف طبيعية تسمح بالتهوية' },
      { en: 'Organic Textural Slub', ar: 'تموجات نسيج طبيعية فخمة' },
      { en: 'Machine Washable on Gentle', ar: 'سهلة الغسيل بالبرنامج اللطيف' }
    ],
    inStock: true,
    stock: 36
  },
  {
    id: 'prod-8',
    slug: 'signature-wave-curtain',
    name: {
      en: 'Signature Wave Curtain',
      ar: 'ستارة ويف المميزة بانسيابية ملكية'
    },
    category: {
      en: 'Custom Curtains',
      ar: 'ستائر حسب الطلب'
    },
    categorySlug: 'custom-curtains',
    subcategory: { en: 'S-Fold Ripple Wave', ar: 'طيات ويف انسيابية' },
    subcategorySlug: 's-wave',
    collection: 'saudi-home',
    description: {
      en: 'The pinnacle of luxury drapery. S-Fold wave tracks create continuous, mathematically identical sinusoidal folds that drape from ceiling to floor with pure majesty.',
      ar: 'قمة الفخامة المعمارية لنوافذ القصور. سكة ويف منحنية تصنع تموجات انسيابية متساوية بدقة هندسية من السقف حتى الأرض بمهابة ملكية لا مثيل لها.'
    },
    price: 590,
    oldPrice: 720,
    comparePrice: 720,
    discount: 18,
    rating: 5.0,
    reviews: 195,
    reviewCount: 195,
    badge: { en: 'Architectural Choice', ar: 'اختيار المعماريين' },
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    fabric: { en: 'Belgian Cashmere & Silk Weave', ar: 'مزيج كشمير وحرير بلجيكي' },
    pattern: { en: 'Architectural Wave', ar: 'تموج معماري منتظم' },
    lightControl: 'room-darkening',
    colors: [
      { id: 'royal-champagne', name: { en: 'Royal Champagne', ar: 'شامبين ملكي' }, hex: '#D8C9A6' },
      { id: 'al-khobar-mist', name: { en: 'Silver Mist', ar: 'ضباب فضي' }, hex: '#CBCDCB' },
      { id: 'deep-espresso', name: { en: 'Dark Espresso', ar: 'إسبريسو داكن' }, hex: '#2C221E' },
      { id: 'camel-gold', name: { en: 'Desert Gold Camel', ar: 'ذهبي جملي' }, hex: '#A88B57' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Room Span (250cm)', ar: 'عرض غرفة (٢٥٠ سم)' }, dimensions: '250cm × 300cm', priceModifier: 0 },
      { id: 's2', label: { en: 'Villa Hall (380cm)', ar: 'بهو فيلا (٣٨٠ سم)' }, dimensions: '380cm × 360cm', priceModifier: 210 },
      { id: 's3', label: { en: 'Double Height (500cm)', ar: 'ارتفاع مضاعف (٥٠٠ سم)' }, dimensions: '500cm × 550cm', priceModifier: 460 }
    ],
    room: { en: 'Double Height Villa & Reception Hall', ar: 'بهو الفيلا ذو الأسقف المرتفعة والمجالس' },
    features: [
      { en: 'Patented Smooth S-Wave Glide', ar: 'انزلاق سلس فائق الهدوء بنظام S-Wave' },
      { en: 'Pre-Set Exact Wave Spacing', ar: 'مسافات تموج مضبوطة هندسياً بالليزر' },
      { en: 'Motorized Rail Ready', ar: 'جاهزة للربط مع المحركات الكهربائية الذكية' }
    ],
    inStock: true,
    stock: 20,
    isBestSeller: true
  },
  {
    id: 'prod-9',
    slug: 'andalusian-damask-jacquard',
    name: {
      en: 'Andalusian Damask Jacquard',
      ar: 'ستارة أندلسية بنقش جاكار دمشقي'
    },
    category: {
      en: 'Curtains',
      ar: 'الستائر الفاخرة'
    },
    categorySlug: 'curtains',
    subcategory: { en: 'Woven Jacquard', ar: 'جاكار محفور' },
    subcategorySlug: 'jacquard',
    collection: 'saudi-home',
    description: {
      en: 'Ornate tone-on-tone damask weave with subtle metallic threading, ideal for welcoming guest salons and opulent dining rooms across Saudi Arabia.',
      ar: 'نسيج جاكار دمشقي بنقوش كلاسيكية هادئة وخيوط حريرية ولمعة ميتاليك ساحرة تمنح مجالس الضيافة وصالات الطعام هيبة وفخامة أصيلة.'
    },
    price: 520,
    oldPrice: 650,
    comparePrice: 650,
    discount: 20,
    rating: 4.92,
    reviews: 73,
    reviewCount: 73,
    badge: { en: 'Heritage Jacquard', ar: 'جاكار أندلسي' },
    image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
    fabric: { en: 'Brocade & Silk Jacquard', ar: 'بروكار وجاكار حريري' },
    pattern: { en: 'Damask Floral Medallion', ar: 'نقوش دمشقية تقليدية' },
    lightControl: 'room-darkening',
    colors: [
      { id: 'gold-cream', name: { en: 'Imperial Gold', ar: 'ذهبي إمبراطوري' }, hex: '#D4AF37' },
      { id: 'silver-ivory', name: { en: 'Silver Pearl', ar: 'لؤلؤي فضي' }, hex: '#E6E4E0' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Standard Window', ar: 'نافذة قياسية' }, dimensions: '160cm × 270cm', priceModifier: 0 },
      { id: 's2', label: { en: 'Double Panel', ar: 'لوح مزدوج' }, dimensions: '300cm × 300cm', priceModifier: 130 }
    ],
    room: { en: 'Formal Majlis & Salon', ar: 'المجلس الرسمي وصالون الاستقبال' },
    features: [
      { en: 'Shimmering Metallic Threads', ar: 'خيوط بريق برونزية دقيقة' },
      { en: 'Triple French Pinch Pleat', ar: 'طيات فرنسية ثلاثية راقية' }
    ],
    inStock: true,
    stock: 18,
    isSale: true
  },
  {
    id: 'prod-10',
    slug: 'sahara-thermal-blackout',
    name: {
      en: 'Sahara Thermal 100% Blackout',
      ar: 'ستارة صحارى عازلة للحرارة والضوء ١٠٠٪'
    },
    category: {
      en: 'Blackout Curtains',
      ar: 'الستائر المعتمة'
    },
    categorySlug: 'blackout-curtains',
    subcategory: { en: 'High Thermal Insulation', ar: 'عزل حراري فائق' },
    subcategorySlug: 'thermal-blackout',
    collection: 'luxury-blackout',
    description: {
      en: 'Specially coated quadruple-layer drapery engineered to withstand extreme 50°C summer heat in Riyadh, blocking daylight and insulating the room instantly.',
      ar: 'ستارة رباعية الطبقات مطورة خصيصاً لمقاومة حرارة الصيف القصوى بالرياض، تمنح الغرفة برودة منعشة وتحجب ١٠٠٪ من أشعة الشمس وضجيج الشارع.'
    },
    price: 399,
    oldPrice: 489,
    comparePrice: 489,
    discount: 18,
    rating: 4.89,
    reviews: 142,
    reviewCount: 142,
    badge: { en: 'Desert Certified', ar: 'معتمدة لأجواء المملكة' },
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
    fabric: { en: 'Quadruple Ceramic Thermal Liner', ar: 'طبقة سيراميك حرارية رباعية' },
    pattern: { en: 'Fine Texture Weave', ar: 'نسيج محبوك ناعم' },
    lightControl: 'blackout',
    colors: [
      { id: 'desert-beige', name: { en: 'Dune Beige', ar: 'بيج الكثبان' }, hex: '#CDBFA8' },
      { id: 'obsidian', name: { en: 'Night Sky', ar: 'سماء الليل' }, hex: '#1E232A' },
      { id: 'warm-grey', name: { en: 'Najdi Pebble', ar: 'حصى نجدي' }, hex: '#9B9993' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Single Panel (150cm)', ar: 'لوح مفرد (١٥٠ سم)' }, dimensions: '150cm × 260cm', priceModifier: 0 },
      { id: 's2', label: { en: 'Wide (240cm)', ar: 'عريض (٢٤٠ سم)' }, dimensions: '240cm × 280cm', priceModifier: 95 }
    ],
    room: { en: 'Bedroom & Home Cinema', ar: 'غرفة النوم والسينما المنزلية' },
    features: [
      { en: 'Blocks 100% of Direct Sun', ar: 'حجب كامل لضوء الشمس المباشر' },
      { en: 'Lowers AC Energy Usage', ar: 'تخفيض استهلاك تكييف الهواء' }
    ],
    inStock: true,
    stock: 60,
    isBestSeller: true
  },
  {
    id: 'prod-11',
    slug: 'pure-flax-voile-sheer',
    name: {
      en: 'Pure Flax Voile Sheer',
      ar: 'ستارة شيفون كتان نقي انسيابية'
    },
    category: {
      en: 'Sheer Curtains',
      ar: 'الستائر الشفافة'
    },
    categorySlug: 'sheer-curtains',
    subcategory: { en: 'Linen Sheer', ar: 'شيفون كتاني' },
    subcategorySlug: 'linen-sheer',
    collection: 'modern-sheer',
    description: {
      en: 'Feather-light organic linen blend with breathable airy drape, designed to dance gently with the evening breeze while keeping interiors sun-kissed and serene.',
      ar: 'مزيج كتاني خفيف كالحرير، ينساب بانسيابية ساحرة مع نسمات المساء ليملأ الغرفة بضوء ذهبي ناعم وهدوء شاعري.'
    },
    price: 245,
    oldPrice: 295,
    comparePrice: 295,
    discount: 17,
    rating: 4.82,
    reviews: 67,
    reviewCount: 67,
    badge: { en: 'New Season', ar: 'الموسم الجديد' },
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    fabric: { en: 'European Organic Linen Voile', ar: 'فوال كتان أوروبي عضوي' },
    pattern: { en: 'Translucent Weave', ar: 'نسيج نصف شفاف' },
    lightControl: 'sheer',
    colors: [
      { id: 'bleached-white', name: { en: 'Snow White', ar: 'أبيض ناصع' }, hex: '#FFFFFF' },
      { id: 'natural-flax', name: { en: 'Natural Raw Flax', ar: 'كتان خام طبيعي' }, hex: '#DED5C5' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Standard Window', ar: 'نافذة قياسية' }, dimensions: '150cm × 260cm', priceModifier: 0 },
      { id: 's2', label: { en: 'Double Width', ar: 'عرض مزدوج' }, dimensions: '260cm × 280cm', priceModifier: 65 }
    ],
    room: { en: 'Living Room & Veranda', ar: 'غرفة المعيشة والشرفة' },
    features: [
      { en: 'Weighted Lead Hem Wire', ar: 'سلك رصاصي مدمج لاستقامة الحاشية' },
      { en: 'Dust Repellent Coated', ar: 'مقاوم لتراكم الأتربة' }
    ],
    inStock: true,
    stock: 45,
    isNew: true
  },
  {
    id: 'prod-12',
    slug: 'ready-made-easyfit-eyelet',
    name: {
      en: 'Ready-Made EasyFit Eyelet Curtain',
      ar: 'ستارة جاهزة سهلة التركيب بحلقات مدمجة'
    },
    category: {
      en: 'Ready Made Curtains',
      ar: 'ستائر جاهزة'
    },
    categorySlug: 'ready-made-curtains',
    subcategory: { en: 'Grommet Eyelet', ar: 'حلقات معدنية' },
    subcategorySlug: 'eyelet',
    collection: 'minimal-living',
    description: {
      en: 'Pre-stitched with premium brushed nickel eyelets for rapid, effortless hanging on any existing standard curtain rod in minutes. Fully washable and durable.',
      ar: 'جاهزة للتعليق الفوري بحلقات نيكل مطفية مقاومة للصدأ، تركب بسهولة على أي سكة أو قضيب قياسي خلال دقائق دون الحاجة لفنيين.'
    },
    price: 199,
    oldPrice: 249,
    comparePrice: 249,
    discount: 20,
    rating: 4.7,
    reviews: 112,
    reviewCount: 112,
    badge: { en: 'Ready to Hang', ar: 'جاهزة للتركيب' },
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    fabric: { en: 'Pre-Shrunk Textured Poly-Cotton', ar: 'بولي قطن معالج ضد الانكماش' },
    pattern: { en: 'Modern Solid', ar: 'سادة معاصر' },
    lightControl: 'room-darkening',
    colors: [
      { id: 'taupe', name: { en: 'Soft Taupe', ar: 'توب رمادي' }, hex: '#A89E92' },
      { id: 'navy', name: { en: 'Arabian Navy', ar: 'أزرق كحلي' }, hex: '#1C2938' },
      { id: 'ivory', name: { en: 'Ivory Cream', ar: 'عاجي كريمي' }, hex: '#F6F3EC' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Single Panel 140cm', ar: 'لوح ١٤٠ سم' }, dimensions: '140cm × 250cm', priceModifier: 0 },
      { id: 's2', label: { en: 'Pair Pack (2x 140cm)', ar: 'طقم لوحين (٢× ١٤٠ سم)' }, dimensions: '280cm × 250cm', priceModifier: 120 }
    ],
    room: { en: 'Guest Bedroom & Rental Apartment', ar: 'غرف الضيوف والشقق المفروشة' },
    features: [
      { en: 'Rust-Proof 40mm Metal Rings', ar: 'حلقات معدنية ٤٠ ملم غير قابلة للصدأ' },
      { en: 'Machine Wash & Tumble Dry', ar: 'قابلة للغسيل بالغسالة والتجفيف' }
    ],
    inStock: true,
    stock: 85,
    isSale: true
  },
  {
    id: 'prod-13',
    slug: 'bespoke-goblet-pleat-silk',
    name: {
      en: 'Bespoke Goblet Pleated Silk Drapes',
      ar: 'ستائر حرير فاخرة بطيات الكأس الملكية'
    },
    category: {
      en: 'Custom Curtains',
      ar: 'ستائر حسب الطلب'
    },
    categorySlug: 'custom-curtains',
    subcategory: { en: 'Bespoke Couture', ar: 'تفصيل كوتور ملكي' },
    subcategorySlug: 'couture',
    collection: 'saudi-home',
    description: {
      en: 'Hand-tailored goblet heading reinforced with sculpted velvet collars, designed for formal diplomatic salons, villas and royal reception halls in Riyadh.',
      ar: 'خياطة يدوية متقنة لطيات الكأس الكلاسيكية محشوة بعناية لتمنح الستائر وقفة أرستقراطية مهيبة تليق بمجالس الاستقبال الفاخرة.'
    },
    price: 680,
    oldPrice: 850,
    comparePrice: 850,
    discount: 20,
    rating: 5.0,
    reviews: 58,
    reviewCount: 58,
    badge: { en: 'Bespoke Masterpiece', ar: 'تحفة تفصيل خاص' },
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?q=80&w=800&auto=format&fit=crop',
    fabric: { en: 'Dupioni Raw Silk & Cotton Interlining', ar: 'حرير دوبيوني طبيعي مع بطانة قطنية' },
    pattern: { en: 'Subtle Luster Slub', ar: 'بريق حريري راقٍ' },
    lightControl: 'room-darkening',
    colors: [
      { id: 'champagne-silk', name: { en: 'Royal Champagne', ar: 'شامبين ملكي' }, hex: '#D5C49E' },
      { id: 'emerald', name: { en: 'Saudi Emerald', ar: 'زمردي سعودي' }, hex: '#163323' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Custom Villa Measure', ar: 'مقاس حسب فيلتك' }, dimensions: 'Tailored to Window', priceModifier: 0 }
    ],
    room: { en: 'Main Villa Reception & Majlis', ar: 'بهو الاستقبال والمجلس الملكي' },
    features: [
      { en: 'Free In-Home Laser Measurement', ar: 'رفع مقاسات ليزري مجاني بالرياض' },
      { en: 'Flannel Interlining for Full Drape', ar: 'تبطين داخلي بالفانيلا لثقل ملوكي' }
    ],
    inStock: true,
    stock: 12
  },
  {
    id: 'prod-14',
    slug: 'linen-blackout-combo-curtain',
    name: {
      en: 'Linen-Look Dual Blackout Curtain',
      ar: 'ستارة مظهر الكتان المزدوجة العازلة'
    },
    category: {
      en: 'Blackout Curtains',
      ar: 'الستائر المعتمة'
    },
    categorySlug: 'blackout-curtains',
    subcategory: { en: 'Linen Blackout', ar: 'كتان عازل' },
    subcategorySlug: 'linen-blackout',
    collection: 'natural-linen',
    description: {
      en: 'Combines the relaxed, textured look of organic linen with a hidden back blackout coat that shuts out 98% of daylight and blocks thermal radiation.',
      ar: 'تجمع بين جمال وأناقة مظهر الكتان الريفي الطبيعي وبطانة عزل خلفية تخفي ٩٨٪ من الضوء وتحافظ على برودة الغرفة طوال اليوم.'
    },
    price: 360,
    oldPrice: 420,
    comparePrice: 420,
    discount: 14,
    rating: 4.86,
    reviews: 91,
    reviewCount: 91,
    badge: { en: 'Dual Action', ar: 'مزدوجة الأداء' },
    image: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    fabric: { en: 'Faux Flax with Thermocoat Backing', ar: 'كتان نسيجي مع طبقة ثيرموكوت' },
    pattern: { en: 'Coarse Linen Weave', ar: 'نسيج خيش ناعم' },
    lightControl: 'blackout',
    colors: [
      { id: 'cream-flax', name: { en: 'Warm Sand', ar: 'رمل دافئ' }, hex: '#D6CBB8' },
      { id: 'stone-grey', name: { en: 'Ash Grey', ar: 'رمادي رماد' }, hex: '#A3A29D' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Standard Window', ar: 'نافذة قياسية' }, dimensions: '150cm × 260cm', priceModifier: 0 },
      { id: 's2', label: { en: 'High Ceiling', ar: 'سقف مرتفع' }, dimensions: '220cm × 300cm', priceModifier: 85 }
    ],
    room: { en: 'Bedrooms & Living Rooms', ar: 'غرف النوم والمعيشة' },
    features: [
      { en: 'Looks Natural, Blocks Light', ar: 'مظهر طبيعي مع عزل تام للضوء' },
      { en: 'Anti-Fading Color Lock', ar: 'تثبيت لوني ضد الأشعة فوق البنفسجية' }
    ],
    inStock: true,
    stock: 40,
    isNew: true
  },
  {
    id: 'prod-15',
    slug: 'embroidered-arabesque-sheer',
    name: {
      en: 'Embroidered Arabesque Sheer Curtain',
      ar: 'ستارة شيفون مطرزة بزخارف الأرابيسك'
    },
    category: {
      en: 'Sheer Curtains',
      ar: 'الستائر الشفافة'
    },
    categorySlug: 'sheer-curtains',
    subcategory: { en: 'Embroidered Lace', ar: 'تطريز دانتيل' },
    subcategorySlug: 'lace',
    collection: 'saudi-home',
    description: {
      en: 'Intricate golden corded embroidery in traditional geometric arabesque motifs gracefully adorning high-transparency organza.',
      ar: 'تطريز هندسي أرابيسك ناعم بخيوط ذهبية دقيقة على قاعدة شيفون شفافة، يعكس روح الفنون الإسلامية والضيافة العربية الكريمة.'
    },
    price: 310,
    oldPrice: 380,
    comparePrice: 380,
    discount: 18,
    rating: 4.88,
    reviews: 63,
    reviewCount: 63,
    badge: { en: 'Heritage Embroidery', ar: 'تطريز تراثي' },
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    fabric: { en: 'Organza with Viscose Gold Thread', ar: 'أورجانزا مع خيوط فيسكوز ذهبية' },
    pattern: { en: 'Arabesque Geometric Lattice', ar: 'زخارف هندسية أرابيسك' },
    lightControl: 'sheer',
    colors: [
      { id: 'gold-on-ivory', name: { en: 'Gold on Ivory', ar: 'تطريز ذهبي على عاجي' }, hex: '#ECE3CE' },
      { id: 'white-on-white', name: { en: 'White on Pure White', ar: 'أبيض على أبيض ناصع' }, hex: '#FAF9F7' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Standard Window', ar: 'نافذة قياسية' }, dimensions: '160cm × 260cm', priceModifier: 0 },
      { id: 's2', label: { en: 'Majlis Panoramic', ar: 'بانوراما مجلس' }, dimensions: '300cm × 300cm', priceModifier: 110 }
    ],
    room: { en: 'Dining Salon & Majlis', ar: 'صالون الطعام والمجلس' },
    features: [
      { en: 'Intricate Scalloped Edge', ar: 'حواف مموجة ومطرزة بدقة' },
      { en: 'Easy Iron on Low', ar: 'كي سهل على درجة حرارة منخفضة' }
    ],
    inStock: true,
    stock: 28,
    isSale: true
  }
];
