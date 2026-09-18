import { Product } from '../types';

export const MORE_PRODUCTS: Product[] = [
  {
    id: 'prod-26',
    slug: 'andalus-sheer-linen-curtain',
    name: {
      en: 'Andalus Textured Sheer Curtain',
      ar: 'ستارة أندلس شيفون بنسيج ناعم'
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
      en: 'Subtle cross-weave sheer that gently filters midday desert sun into a luminous, golden ambient radiance while providing discreet daytime visual privacy.',
      ar: 'شيفون بنسيج متشابك ناعم يرشح أشعة شمس الظهيرة إلى وهج ذهبي دافئ ومريح للعين مع توفير خصوصية نهارية كاملة داخل المنزل.'
    },
    price: 279,
    oldPrice: 340,
    comparePrice: 340,
    discount: 18,
    rating: 4.87,
    reviews: 74,
    reviewCount: 74,
    badge: { en: 'Popular', ar: 'شائع' },
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800&auto=format&fit=crop',
    fabric: { en: 'Poly-Linen Soft Translucent Weave', ar: 'مزيج بولي كتان ناعم نصف شفاف' },
    pattern: { en: 'Cross-Weave Texture', ar: 'نسيج متعامد ناعم' },
    lightControl: 'sheer',
    colors: [
      { id: 'ivory-sheer', name: { en: 'Warm Ivory', ar: 'عاجي دافئ' }, hex: '#F5EFE6' },
      { id: 'pearl-sheer', name: { en: 'Pearl White', ar: 'أبيض لؤلؤي' }, hex: '#FAF8F5' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Standard Window', ar: 'نافذة قياسية' }, dimensions: '150cm × 260cm', priceModifier: 0 },
      { id: 's2', label: { en: 'Double Width', ar: 'عرض مزدوج' }, dimensions: '250cm × 280cm', priceModifier: 70 }
    ],
    room: { en: 'Living Room & Dining Salon', ar: 'غرفة المعيشة وصالون الطعام' },
    features: [
      { en: 'Natural Light Softening', ar: 'تنعيم الإضاءة الطبيعية' },
      { en: 'Machine Washable on Delicate', ar: 'قابلة للغسيل بالبرنامج اللطيف' }
    ],
    inStock: true,
    stock: 52,
    isBestSeller: true
  },
  {
    id: 'prod-27',
    slug: 'monaco-blackout-hotel-drapes',
    name: {
      en: 'Monaco Hotel-Grade 100% Blackout Drapes',
      ar: 'ستائر موناكو الفندقية عازلة للضوء ١٠٠٪'
    },
    category: {
      en: 'Blackout Curtains',
      ar: 'الستائر المعتمة'
    },
    categorySlug: 'blackout-curtains',
    subcategory: { en: 'Hotel Grade Blackout', ar: 'عزل فندقي ٥ نجوم' },
    subcategorySlug: 'hotel-blackout',
    collection: 'luxury-blackout',
    description: {
      en: 'Five-star luxury hotel specification blackout drapes featuring magnetic side seals, dense micro-velour front, and total light blocking barrier.',
      ar: 'مواصفات الفنادق العالمية من فئة ٥ نجوم، بحواف مغناطيسية تغلق الستارة بإحكام على الجدار لمنع تسرب أي شعاع ضوء نوم هادئ كلياً.'
    },
    price: 430,
    oldPrice: 540,
    comparePrice: 540,
    discount: 20,
    rating: 4.94,
    reviews: 118,
    reviewCount: 118,
    badge: { en: '5-Star Hotel Grade', ar: 'مستوى فنادق ٥ نجوم' },
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
    fabric: { en: 'Micro-Velour with Bonded Blackout Core', ar: 'مايكرو فيلور مع طبقة عزل مدمجة' },
    pattern: { en: 'Matte Smooth', ar: 'مطفي فاخر' },
    lightControl: 'blackout',
    colors: [
      { id: 'slate-blue', name: { en: 'Midnight Navy', ar: 'كحلي ليلي' }, hex: '#1B263B' },
      { id: 'taupe-monaco', name: { en: 'Warm Truffle', ar: 'ترافل دافئ' }, hex: '#776E65' },
      { id: 'charcoal-monaco', name: { en: 'Charcoal Black', ar: 'فحمي داكن' }, hex: '#242424' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Standard Window', ar: 'نافذة قياسية' }, dimensions: '160cm × 270cm', priceModifier: 0 },
      { id: 's2', label: { en: 'Wide Panel (260cm)', ar: 'لوح عريض (٢٦٠ سم)' }, dimensions: '260cm × 290cm', priceModifier: 110 }
    ],
    room: { en: 'Master Bedroom', ar: 'غرفة النوم الرئيسية' },
    features: [
      { en: '100% True Blackout Guarantee', ar: 'ضمان عتمة كاملة ١٠٠٪' },
      { en: 'Acoustic Sound Insulation', ar: 'عزل صوتي وتخفيف الصدى' }
    ],
    inStock: true,
    stock: 40,
    isSale: true
  },
  {
    id: 'prod-28',
    slug: 'cordless-kids-thermal-roman-blind',
    name: {
      en: 'Cordless Safety Blackout Roman Blind',
      ar: 'ستارة رومانية معتمة بدون حبال آمنة للأطفال'
    },
    category: {
      en: 'Roman Blinds',
      ar: 'الستائر الرومانية'
    },
    categorySlug: 'roman-blinds',
    subcategory: { en: 'Kids & Cordless', ar: 'بدون حبال للأطفال' },
    subcategorySlug: 'kids-cordless',
    collection: 'minimal-living',
    description: {
      en: '100% cordless push-pull operation certified for child and pet safety. Features thermal blackout fabric to ensure healthy daytime naps for little ones.',
      ar: 'تشغيل سلس بالسحب والدفع باليد بدون أي حبال أو سلاسل لحماية الأطفال والحيوانات الأليفة، مع عزل حراري وظلام تام لنوم هانئ للأطفال نهاراً.'
    },
    price: 310,
    oldPrice: 380,
    comparePrice: 380,
    discount: 18,
    rating: 4.89,
    reviews: 53,
    reviewCount: 53,
    badge: { en: 'Child Safe Certified', ar: 'معتمدة لأمان الأطفال' },
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800&auto=format&fit=crop',
    fabric: { en: 'Organic Cotton Twill with Thermal Core', ar: 'قطن تويل عضوي مع بطانة حرارية' },
    pattern: { en: 'Soft Solid Pastel', ar: 'سادة هادئ' },
    lightControl: 'blackout',
    colors: [
      { id: 'cloud-grey', name: { en: 'Cloud Grey', ar: 'رمادي سحابي' }, hex: '#D8DADB' },
      { id: 'powder-beige', name: { en: 'Powder Beige', ar: 'بيج بودري' }, hex: '#EAE1D2' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Window 120cm', ar: 'نافذة ١٢٠ سم' }, dimensions: '120cm × 160cm', priceModifier: 0 },
      { id: 's2', label: { en: 'Window 160cm', ar: 'نافذة ١٦٠ سم' }, dimensions: '160cm × 200cm', priceModifier: 60 }
    ],
    room: { en: 'Nursery & Children Room', ar: 'غرف الأطفال والرضع' },
    features: [
      { en: '100% Cord-Free Safe Push Pull', ar: 'سحب ورفع آمن بدون حبال' },
      { en: 'Blocks 100% of Daylight', ar: 'حجب كامل لضوء النهار' }
    ],
    inStock: true,
    stock: 35,
    isNew: true
  },
  {
    id: 'prod-29',
    slug: 'waterproof-aluminum-venetian-blind',
    name: {
      en: 'Architectural Waterproof Venetian Blind',
      ar: 'ستارة معدنية أفقية مقاومة للرطوبة والماء'
    },
    category: {
      en: 'Roller Blinds',
      ar: 'الستائر الرول'
    },
    categorySlug: 'roller-blinds',
    subcategory: { en: 'Kitchen & Bath', ar: 'مطابخ وحمامات' },
    subcategorySlug: 'waterproof',
    collection: 'minimal-living',
    description: {
      en: 'Electrostatic baked enamel aluminum slats designed for high-humidity kitchens, luxury bathrooms, and laundry suites. 100% moisture and oil-resistant.',
      ar: 'شرائح ألمنيوم مطلية بطلاء حراري كهروساكن لا يصدأ ولا يتأثر بالبخار، مثالية للمطابخ الحديثة والحمامات الفاخرة وسهلة التنظيف بالماء.'
    },
    price: 230,
    oldPrice: 280,
    comparePrice: 280,
    discount: 18,
    rating: 4.76,
    reviews: 45,
    reviewCount: 45,
    badge: { en: 'Waterproof', ar: 'مقاوم للماء' },
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
    fabric: { en: 'Spring-Tempered Aluminum Alloy', ar: 'سبائك ألمنيوم معالجة بالحرارة' },
    pattern: { en: 'Horizontal 25mm Slats', ar: 'شرائح أفقية ٢٥ ملم' },
    lightControl: 'room-darkening',
    colors: [
      { id: 'matte-white-slat', name: { en: 'Crisp White', ar: 'أبيض ناصع' }, hex: '#FFFFFF' },
      { id: 'brushed-silver', name: { en: 'Brushed Aluminum', ar: 'ألمنيوم ممشط' }, hex: '#C0C0C0' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Window 100cm', ar: 'نافذة ١٠٠ سم' }, dimensions: '100cm × 140cm', priceModifier: 0 },
      { id: 's2', label: { en: 'Window 140cm', ar: 'نافذة ١٤٠ سم' }, dimensions: '140cm × 180cm', priceModifier: 55 }
    ],
    room: { en: 'Kitchen & Luxury Bathroom', ar: 'المطبخ والحمام الفاخر' },
    features: [
      { en: '100% Rust Proof Aluminum', ar: 'ألمنيوم غير قابل للصدأ نهائياً' },
      { en: 'Tilt Wand for Precise Light', ar: 'عصا توجيه لضبط زاوية الإضاءة بدقة' }
    ],
    inStock: true,
    stock: 48
  },
  {
    id: 'prod-30',
    slug: 'heritage-najdi-embroidered-curtain',
    name: {
      en: 'Heritage Najdi Pattern Custom Drapery',
      ar: 'ستارة تراثية بنقوش نجدية فاخرة حسب الطلب'
    },
    category: {
      en: 'Custom Curtains',
      ar: 'ستائر حسب الطلب'
    },
    categorySlug: 'custom-curtains',
    subcategory: { en: 'Heritage Embroidery', ar: 'تطريز نجدي تراثي' },
    subcategorySlug: 'heritage',
    collection: 'saudi-home',
    description: {
      en: 'Inspired by Diriyah mudbrick architecture and Najdi geometric triangular motifs. Hand-embroidered along vertical lead edges on textured sand fabric.',
      ar: 'مستوحاة من عمارة الدرعية التاريخية والمثلثات النجدية التراثية، مطرزة يدوياً على حواف الستارة القماشية بملمس رملي مستوحى من طبيعة نجد العريقة.'
    },
    price: 640,
    oldPrice: 780,
    comparePrice: 780,
    discount: 18,
    rating: 4.98,
    reviews: 86,
    reviewCount: 86,
    badge: { en: 'Saudi Heritage', ar: 'تراث سعودي أصيل' },
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=800&auto=format&fit=crop',
    fabric: { en: 'Heavyweight Sand Twill with Silk Embroidery', ar: 'قماش تويل رملي سميك مع تطريز حريري' },
    pattern: { en: 'Najdi Geometric Border', ar: 'حاشية هندسية نجدية' },
    lightControl: 'room-darkening',
    colors: [
      { id: 'diriyah-sand', name: { en: 'Diriyah Terracotta & Sand', ar: 'طين ورمل الدرعية' }, hex: '#BC7D58' },
      { id: 'najd-gold', name: { en: 'Desert Camel Gold', ar: 'ذهبي جملي نجدي' }, hex: '#B89255' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Custom Villa Order', ar: 'تفصيل حسب مقاس الفيلا' }, dimensions: 'Bespoke Sizing', priceModifier: 0 }
    ],
    room: { en: 'Formal Majlis & Reception Hall', ar: 'المجلس الرسمي وقاعة الضيافة' },
    features: [
      { en: 'Authentic Saudi Design Narrative', ar: 'طابع تصميمي سعودي أصيل' },
      { en: 'Complimentary On-Site Designer Consultation', ar: 'زيارة مجانية للمصمم الداخلي لمنزلك' }
    ],
    inStock: true,
    stock: 15,
    isBestSeller: true
  },
  {
    id: 'prod-31',
    slug: 'ready-to-hang-pinch-pleat-pair',
    name: {
      en: 'Ready-to-Hang Pinch Pleat Curtains (Set of 2)',
      ar: 'طقم ستائر جاهزة بطيات فرنسية مزدوجة (لوحان)'
    },
    category: {
      en: 'Ready Made Curtains',
      ar: 'ستائر جاهزة'
    },
    categorySlug: 'ready-made-curtains',
    subcategory: { en: 'Pinch Pleat Ready', ar: 'طيات فرنسية جاهزة' },
    subcategorySlug: 'ready-pleat',
    collection: 'minimal-living',
    description: {
      en: 'Pre-pleated luxury drapes with pre-installed adjustable plastic hooks. Ready to hang onto your track or rings immediately out of the luxury travel bag.',
      ar: 'ستائر مفصلة ومزمومة بطيات فرنسية أنيقة مسبقاً، مع خطافات تعليق بلاستيكية قابلة لتعديل الارتفاع جاهزة للتعليق الفوري على أي سكة أو حلقة.'
    },
    price: 329,
    oldPrice: 399,
    comparePrice: 399,
    discount: 18,
    rating: 4.82,
    reviews: 69,
    reviewCount: 69,
    badge: { en: 'Pair Pack', ar: 'طقم لوحين' },
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    fabric: { en: 'Matte Slub Polyester Weave', ar: 'نسيج بوليستر غير لامع بتموجات راقية' },
    pattern: { en: 'Tailored Double Pinch Pleat', ar: 'طيات فرنسية مزدوجة' },
    lightControl: 'room-darkening',
    colors: [
      { id: 'almond-ready', name: { en: 'Cream Almond', ar: 'لوزي كريمي' }, hex: '#EBE2D3' },
      { id: 'smoke-grey', name: { en: 'Smoke Quartz', ar: 'رمادي دخاني' }, hex: '#8C8983' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Pair (2x 150cm)', ar: 'طقم (٢× ١٥٠ سم)' }, dimensions: '2 Panels × 150cm × 260cm', priceModifier: 0 },
      { id: 's2', label: { en: 'Pair (2x 200cm)', ar: 'طقم (٢× ٢٠٠ سم)' }, dimensions: '2 Panels × 200cm × 280cm', priceModifier: 90 }
    ],
    room: { en: 'Living Room & Bedroom', ar: 'غرفة المعيشة وغرفة النوم' },
    features: [
      { en: 'Adjustable Height Hooks Included', ar: 'خطافات قابلة لتعديل الارتفاع متضمنة' },
      { en: 'Ironed & Steamed Ready to Hang', ar: 'مكوية بالبخار وجاهزة للتعليق مباشرة' }
    ],
    inStock: true,
    stock: 50,
    isSale: true
  },
  {
    id: 'prod-32',
    slug: 'heavy-brass-magnetic-holdbacks',
    name: {
      en: 'Sculptural Brass Magnetic Holdbacks (Pair)',
      ar: 'أقراص نحاسية مغناطيسية منحوتة للستائر (زوج)'
    },
    category: {
      en: 'Curtain Accessories',
      ar: 'إكسسوارات الستائر'
    },
    categorySlug: 'accessories',
    subcategory: { en: 'Tiebacks', ar: 'أربطة ستائر' },
    subcategorySlug: 'tiebacks',
    collection: 'saudi-home',
    description: {
      en: 'Substantial round cast metal medallions featuring sunburst radial engraving and ultra-strong magnetic lock to drape fabrics with architectural drama.',
      ar: 'أقراص معدنية دائرية منحوتة بنقوش شمسية مذهبة ومغناطيس فائق القوة لتجميع الستائر وتثبيتها بشكل هندسي فخم دون لمس الجدار.'
    },
    price: 145,
    oldPrice: 180,
    comparePrice: 180,
    discount: 19,
    rating: 4.88,
    reviews: 51,
    reviewCount: 51,
    badge: { en: 'Sculpted Metal', ar: 'معدن منحوت' },
    image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
    fabric: { en: 'Solid Zinc Alloy with Brass Plating', ar: 'سبائك زنك صلبة مطلية بالنحاس' },
    pattern: { en: 'Sunburst Radial Relief', ar: 'نقوش شعاعية ناتئة' },
    lightControl: 'light-filtering',
    colors: [
      { id: 'gold-disc', name: { en: 'Royal Polished Gold', ar: 'ذهبي ملكي لامع' }, hex: '#DDBB66' },
      { id: 'antique-bronze-disc', name: { en: 'Aged Bronze', ar: 'برونز معتق' }, hex: '#584738' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Pair (6.5cm diameter)', ar: 'زوج (قطر ٦.٥ سم)' }, dimensions: '6.5cm Diameter Medallions + Steel Cable', priceModifier: 0 }
    ],
    room: { en: 'Majlis & Master Suite', ar: 'المجلس والجناح الرئيسي' },
    features: [
      { en: 'Will Not Slip on Heavy Velvet', ar: 'ثبات فائق ولا ينزلق على المخمل الثقيل' },
      { en: 'Zero Wall Screws Required', ar: 'لا يتطلب أي براغي بالجدار' }
    ],
    inStock: true,
    stock: 58,
    isNew: true
  }
];
