import { Product } from '../types';

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=1200&auto=format&fit=crop`;

export const SOFA_PRODUCTS: Product[] = [
  {
    id: 'sofa-1',
    slug: 'lina-curve-sectional-sofa',
    name: { en: 'Lina Curve Sectional Sofa', ar: 'كنبة لينا المنحنية' },
    category: { en: 'Sectional Sofas', ar: 'كنب مقسم' },
    categorySlug: 'sectional-sofas',
    subcategory: { en: 'L-Shape Sectionals', ar: 'كنب على شكل حرف L' },
    subcategorySlug: 'l-shape',
    description: {
      en: 'A sculpted L-shaped sectional upholstered in ivory Italian bouclé, with deep feather-filled seats and a softly curved chaise made for long family evenings.',
      ar: 'كنبة مقسمة على شكل حرف L بقماش بوكليه إيطالي عاجي، بمقاعد عميقة محشوة بالريش ومسند منحنٍ واسع لأمسيات عائلية مريحة.'
    },
    price: 4890,
    oldPrice: 5600,
    discount: 12,
    rating: 4.9,
    reviews: 64,
    badge: { en: 'Designer Pick', ar: 'اختيار المصممين' },
    image: IMG('photo-1555041469-a586c61ea9bc'),
    secondaryImage: IMG('photo-1493663284031-b7e3aefcae8e'),
    fabric: { en: 'Italian Bouclé', ar: 'بوكليه إيطالي' },
    pattern: { en: 'Textured Weave', ar: 'نسيج محبب' },
    colors: [
      { id: 'ivory-boucle', name: { en: 'Ivory Bouclé', ar: 'بوكليه عاجي' }, hex: '#EDE4D8' },
      { id: 'sand-boucle', name: { en: 'Warm Sand', ar: 'رملي دافئ' }, hex: '#D8C4A8' },
      { id: 'clay-boucle', name: { en: 'Terracotta Clay', ar: 'طيني تراكوتا' }, hex: '#B85C3A' }
    ],
    sizes: [
      { id: 'l-3', label: { en: '3 Seats + Chaise', ar: '٣ مقاعد + شازلونج' }, dimensions: '280cm × 180cm', priceModifier: 0 },
      { id: 'l-4', label: { en: '4 Seats + Chaise', ar: '٤ مقاعد + شازلونج' }, dimensions: '320cm × 190cm', priceModifier: 650 },
      { id: 'l-5', label: { en: '5 Seats + Chaise', ar: '٥ مقاعد + شازلونج' }, dimensions: '360cm × 200cm', priceModifier: 1250 }
    ],
    room: { en: 'Living Room & Family Salon', ar: 'غرفة المعيشة وصالون العائلة' },
    features: [
      { en: 'Feather-blend seat cushions', ar: 'وسائد جلسة مخلوطة بالريش' },
      { en: 'Solid beech hardwood frame', ar: 'هيكل من خشب الزان الصلب' },
      { en: 'Stain-resistant performance fabric', ar: 'قماش عملي مقاوم للبقع' }
    ],
    inStock: true,
    isNew: true,
    isBestSeller: true,
    collection: 'art-of-living'
  },
  {
    id: 'sofa-2',
    slug: 'rania-l-shape-velvet-sofa',
    name: { en: 'Rania L-Shape Velvet Sofa', ar: 'كنبة رانيا المخملية' },
    category: { en: 'Sectional Sofas', ar: 'كنب مقسم' },
    categorySlug: 'sectional-sofas',
    subcategory: { en: 'L-Shape Sectionals', ar: 'كنب على شكل حرف L' },
    subcategorySlug: 'l-shape',
    description: {
      en: 'A statement sectional in deep emerald velvet with brass-tipped legs and a low, architectural silhouette that anchors a modern majlis.',
      ar: 'كنبة مقسمة فاخرة بقماش مخمل زمردي غامق وأرجل نحاسية، بتصميم معماري منخفض يمنح المجلس الحديث حضوراً مميزاً.'
    },
    price: 5450,
    rating: 4.8,
    reviews: 41,
    badge: { en: 'New Arrival', ar: 'وصل حديثاً' },
    image: IMG('photo-1567016432779-094069958ea5'),
    secondaryImage: IMG('photo-1560448204-e02f11c3d0e2'),
    fabric: { en: 'Italian Cotton Velvet', ar: 'مخمل قطني إيطالي' },
    pattern: { en: 'Solid Velvet', ar: 'مخمل سادة' },
    colors: [
      { id: 'emerald', name: { en: 'Saudi Emerald', ar: 'زمردي سعودي' }, hex: '#173B32' },
      { id: 'camel', name: { en: 'Desert Camel', ar: 'جمل صحراوي' }, hex: '#B38B62' },
      { id: 'ink', name: { en: 'Midnight Ink', ar: 'كحلي ليلي' }, hex: '#202A33' }
    ],
    sizes: [
      { id: 'l-3', label: { en: '3 Seats + Chaise', ar: '٣ مقاعد + شازلونج' }, dimensions: '285cm × 180cm', priceModifier: 0 },
      { id: 'l-4', label: { en: '4 Seats + Chaise', ar: '٤ مقاعد + شازلونج' }, dimensions: '330cm × 195cm', priceModifier: 720 }
    ],
    room: { en: 'Formal Majlis & Living Room', ar: 'المجلس الرسمي وغرفة المعيشة' },
    features: [
      { en: 'High-performance velvet', ar: 'مخمل عالي الأداء' },
      { en: 'Brushed brass detailing', ar: 'تفاصيل نحاسية مصقولة' },
      { en: 'Removable cushion covers', ar: 'أغطية وسائد قابلة للفك' }
    ],
    inStock: true,
    isNew: true,
    isBestSeller: true,
    collection: 'majlis-heritage'
  },
  {
    id: 'sofa-3',
    slug: 'nada-u-shape-majlis',
    name: { en: 'Nada U-Shape Majlis Sofa', ar: 'كنبة ندى على شكل U' },
    category: { en: 'Majlis Sofas', ar: 'كنب المجالس' },
    categorySlug: 'majlis-sofas',
    subcategory: { en: 'Arabic Majlis', ar: 'مجلس عربي' },
    subcategorySlug: 'arabic-majlis',
    description: {
      en: 'A generous U-shaped majlis seating set with hand-finished tufting, designed for Saudi hospitality and long conversations over qahwa.',
      ar: 'طقم مجلس فسيح على شكل حرف U بتنجيد يدوي فاخر، مصمم لكرم الضيافة السعودية وجلسات القهوة الطويلة.'
    },
    price: 7250,
    oldPrice: 8200,
    discount: 11,
    rating: 4.95,
    reviews: 37,
    badge: { en: 'Majlis Best Seller', ar: 'الأكثر مبيعاً للمجالس' },
    image: IMG('photo-1540574163026-643ea20ade25'),
    secondaryImage: IMG('photo-1550226891-ef816aed4a98'),
    fabric: { en: 'Woven Jacquard', ar: 'جاكار منسوج' },
    pattern: { en: 'Tone-on-Tone Motif', ar: 'نقشة متدرجة' },
    colors: [
      { id: 'sand-gold', name: { en: 'Sand & Gold', ar: 'رملي وذهبي' }, hex: '#C9A87C' },
      { id: 'forest-gold', name: { en: 'Forest & Gold', ar: 'أخضر وذهبي' }, hex: '#2E4A3C' },
      { id: 'warm-grey', name: { en: 'Warm Grey', ar: 'رمادي دافئ' }, hex: '#9A948B' }
    ],
    sizes: [
      { id: 'u-6', label: { en: '6 Seat Majlis', ar: 'مجلس ٦ مقاعد' }, dimensions: '380cm × 300cm', priceModifier: 0 },
      { id: 'u-8', label: { en: '8 Seat Majlis', ar: 'مجلس ٨ مقاعد' }, dimensions: '460cm × 320cm', priceModifier: 1450 }
    ],
    room: { en: 'Formal Majlis & Reception', ar: 'المجلس الرسمي والاستقبال' },
    features: [
      { en: 'Hand-finished deep tufting', ar: 'تنجيد يدوي عميق' },
      { en: 'Solid wood frame', ar: 'هيكل خشبي صلب' },
      { en: 'Custom sizing available', ar: 'إمكانية تفصيل المقاسات' }
    ],
    inStock: true,
    isBestSeller: true,
    collection: 'majlis-heritage'
  },
  {
    id: 'sofa-4',
    slug: 'layla-three-seater-sofa',
    name: { en: 'Layla Three-Seater Sofa', ar: 'كنبة ليلى بثلاثة مقاعد' },
    category: { en: 'Sofas', ar: 'كنب' },
    categorySlug: 'sofas',
    subcategory: { en: 'Three-Seater Sofas', ar: 'كنب بثلاثة مقاعد' },
    subcategorySlug: 'three-seater',
    description: {
      en: 'A clean-lined three-seater in warm woven linen, with plush cushioning and a timeless profile that pairs beautifully with sheer curtains.',
      ar: 'كنبة بثلاثة مقاعد بخطوط نظيفة وقماش كتان منسوج دافئ، بوسائد مريحة وتصميم خالد ينسجم مع الستائر الشفافة.'
    },
    price: 3890,
    rating: 4.85,
    reviews: 58,
    badge: { en: 'Customer Favourite', ar: 'المفضلة لدى العملاء' },
    image: IMG('photo-1615874959474-d609969a20ed'),
    secondaryImage: IMG('photo-1586023492125-27b2c045efd7'),
    fabric: { en: 'Belgian Woven Linen', ar: 'كتان بلجيكي منسوج' },
    pattern: { en: 'Fine Slub', ar: 'خيط طبيعي ناعم' },
    colors: [
      { id: 'oat', name: { en: 'Warm Oat', ar: 'شوفان دافئ' }, hex: '#DCCCB6' },
      { id: 'olive', name: { en: 'Muted Olive', ar: 'زيتوني هادئ' }, hex: '#7E8064' },
      { id: 'clay', name: { en: 'Soft Clay', ar: 'طيني ناعم' }, hex: '#B9765A' }
    ],
    sizes: [
      { id: 's-3', label: { en: 'Three Seater', ar: 'ثلاثة مقاعد' }, dimensions: '230cm × 95cm', priceModifier: 0 },
      { id: 's-4', label: { en: 'Four Seater', ar: 'أربعة مقاعد' }, dimensions: '290cm × 100cm', priceModifier: 620 }
    ],
    room: { en: 'Living Room & Family Lounge', ar: 'غرفة المعيشة وجلسة العائلة' },
    features: [
      { en: 'Down-wrapped foam cushions', ar: 'وسائد إسفنجية مغلفة بالريش' },
      { en: 'Removable washable covers', ar: 'أغطية قابلة للغسل' },
      { en: 'FSC-certified hardwood', ar: 'خشب صلب معتمد' }
    ],
    inStock: true,
    isBestSeller: true,
    collection: 'everyday-luxury'
  },
  {
    id: 'sofa-5',
    slug: 'hala-two-seater-loveseat',
    name: { en: 'Hala Two-Seater Loveseat', ar: 'كنبة هالة بمقعدين' },
    category: { en: 'Sofas', ar: 'كنب' },
    categorySlug: 'sofas',
    subcategory: { en: 'Two-Seater Sofas', ar: 'كنب بمقعدين' },
    subcategorySlug: 'two-seater',
    description: {
      en: 'A compact loveseat for reading corners and bedroom suites, upholstered in soft brushed cotton with a gently curved back.',
      ar: 'كنبة صغيرة زوجية لزوايا القراءة وأجنحة النوم، بقماش قطني ناعم ومسند خلفي منحنٍ بلطف.'
    },
    price: 2790,
    oldPrice: 3200,
    rating: 4.7,
    reviews: 33,
    badge: { en: 'Compact Luxury', ar: 'فخامة عملية' },
    image: IMG('photo-1493666438817-866a91353ca9'),
    secondaryImage: IMG('photo-1519947486511-46149fa0a254'),
    fabric: { en: 'Brushed Cotton Blend', ar: 'قطن مخلوط ناعم' },
    colors: [
      { id: 'rosewood', name: { en: 'Muted Rosewood', ar: 'وردي خشبي' }, hex: '#A26B5D' },
      { id: 'sage', name: { en: 'Desert Sage', ar: 'مريمية صحراوية' }, hex: '#9AA08B' },
      { id: 'cream', name: { en: 'Soft Cream', ar: 'كريمي ناعم' }, hex: '#EFE7DA' }
    ],
    sizes: [
      { id: 'two', label: { en: 'Two Seater', ar: 'مقعدان' }, dimensions: '165cm × 88cm', priceModifier: 0 }
    ],
    room: { en: 'Bedroom & Reading Corner', ar: 'غرفة النوم وزاوية القراءة' },
    features: [
      { en: 'Compact footprint', ar: 'حجم عملي صغير' },
      { en: 'Pocket-spring comfort', ar: 'راحة بنوابض جيبية' },
      { en: 'Solid oak legs', ar: 'أرجل بلوط صلبة' }
    ],
    inStock: true,
    isSale: true,
    collection: 'everyday-luxury'
  },
  {
    id: 'sofa-6',
    slug: 'yara-modular-corner-set',
    name: { en: 'Yara Modular Corner Set', ar: 'طقم يارا المودولار' },
    category: { en: 'Sectional Sofas', ar: 'كنب مقسم' },
    categorySlug: 'sectional-sofas',
    subcategory: { en: 'Modular Sofas', ar: 'كنب مودولار' },
    subcategorySlug: 'modular',
    description: {
      en: 'A flexible modular corner set that adapts to villas and apartments alike, with deep seats, feather toppers and a tailored linen finish.',
      ar: 'طقم مودولار مرن يتكيف مع الفلل والشقق، بمقاعد عميقة وطبقات ريش علوية وتشطيب كتان أنيق.'
    },
    price: 8290,
    rating: 4.9,
    reviews: 26,
    badge: { en: 'Villa Scale', ar: 'مقاس الفلل' },
    image: IMG('photo-1550581190-9c1c48d21d6c'),
    secondaryImage: IMG('photo-1600566753086-00f18fb6b3ea'),
    fabric: { en: 'Performance Linen', ar: 'كتان عملي' },
    colors: [
      { id: 'stone', name: { en: 'Stone Grey', ar: 'رمادي حجري' }, hex: '#A9A49B' },
      { id: 'sand', name: { en: 'Dune Sand', ar: 'رمل الكثبان' }, hex: '#D2BE9F' },
      { id: 'forest', name: { en: 'Deep Forest', ar: 'غابة داكنة' }, hex: '#29453A' }
    ],
    sizes: [
      { id: 'mod-5', label: { en: '5 Modules', ar: '٥ وحدات' }, dimensions: '360cm × 220cm', priceModifier: 0 },
      { id: 'mod-6', label: { en: '6 Modules', ar: '٦ وحدات' }, dimensions: '420cm × 220cm', priceModifier: 1150 }
    ],
    room: { en: 'Villa Living Hall', ar: 'صالة الفيلا الرئيسية' },
    features: [
      { en: 'Reconfigurable modules', ar: 'وحدات قابلة لإعادة الترتيب' },
      { en: 'Feather seat toppers', ar: 'طبقات ريش فاخرة' },
      { en: 'Hidden linking system', ar: 'نظام ربط مخفي' }
    ],
    inStock: true,
    isNew: true,
    collection: 'art-of-living'
  },
  {
    id: 'sofa-7',
    slug: 'faisal-leather-majlis-set',
    name: { en: 'Faisal Leather Majlis Set', ar: 'طقم مجلس فيصل الجلدي' },
    category: { en: 'Majlis Sofas', ar: 'كنب المجالس' },
    categorySlug: 'majlis-sofas',
    subcategory: { en: 'Arabic Majlis', ar: 'مجلس عربي' },
    subcategorySlug: 'arabic-majlis',
    description: {
      en: 'A formal majlis set in full-grain camel leather with hand-stitched detailing, built for villas that entertain with distinction.',
      ar: 'طقم مجلس رسمي من الجلد الطبيعي بلون الجمل مع خياطة يدوية دقيقة، مصمم للفلل التي تستقبل ضيوفها بتميز.'
    },
    price: 9450,
    rating: 5,
    reviews: 19,
    badge: { en: 'Handcrafted', ar: 'صناعة يدوية' },
    image: IMG('photo-1493663284031-b7e3aefcae8e'),
    secondaryImage: IMG('photo-1616486338812-3dadae4b4ace'),
    fabric: { en: 'Full-Grain Leather', ar: 'جلد طبيعي كامل' },
    pattern: { en: 'Hand-Stitched', ar: 'خياطة يدوية' },
    colors: [
      { id: 'camel', name: { en: 'Camel Tan', ar: 'بني جملي' }, hex: '#A9714B' },
      { id: 'espresso', name: { en: 'Espresso', ar: 'إسبريسو داكن' }, hex: '#4A3428' },
      { id: 'ivory', name: { en: 'Ivory Leather', ar: 'جلد عاجي' }, hex: '#E9E0D2' }
    ],
    sizes: [
      { id: 'majlis-6', label: { en: '6 Seat Set', ar: 'طقم ٦ مقاعد' }, dimensions: '400cm × 300cm', priceModifier: 0 },
      { id: 'majlis-8', label: { en: '8 Seat Set', ar: 'طقم ٨ مقاعد' }, dimensions: '480cm × 320cm', priceModifier: 1900 }
    ],
    room: { en: 'Formal Majlis & Diwaniya', ar: 'المجلس الرسمي والديوانية' },
    features: [
      { en: 'Full-grain aniline leather', ar: 'جلد أنيلين طبيعي' },
      { en: 'Hand-stitched seams', ar: 'خياطة يدوية فاخرة' },
      { en: 'Lifetime frame warranty', ar: 'ضمان مدى الحياة للهيكل' }
    ],
    inStock: true,
    collection: 'majlis-heritage'
  },
  {
    id: 'sofa-8',
    slug: 'noor-accent-armchair',
    name: { en: 'Noor Accent Armchair', ar: 'كرسي نور الفاخر' },
    category: { en: 'Armchairs', ar: 'كراسي فاخرة' },
    categorySlug: 'accent-chairs',
    subcategory: { en: 'Accent Chairs', ar: 'كراسي ديكور' },
    subcategorySlug: 'accent-chair',
    description: {
      en: 'A sculptural accent chair with a curved back and tactile bouclé, designed to add warmth beside a sofa or in a bedroom corner.',
      ar: 'كرسي ديكور منحوت بمسند خلفي منحنٍ وقماش بوكليه ناعم، يضيف لمسة دافئة بجانب الكنبة أو في زاوية غرفة النوم.'
    },
    price: 1490,
    oldPrice: 1750,
    rating: 4.8,
    reviews: 72,
    badge: { en: 'Trending', ar: 'الأكثر رواجاً' },
    image: IMG('photo-1550254478-ead40cc54513'),
    secondaryImage: IMG('photo-1598300042247-d088f8ab3a91'),
    fabric: { en: 'Textured Bouclé', ar: 'بوكليه محبب' },
    colors: [
      { id: 'cream', name: { en: 'Cream Bouclé', ar: 'بوكليه كريمي' }, hex: '#EDE5D8' },
      { id: 'rust', name: { en: 'Rust Orange', ar: 'برتقالي صدئ' }, hex: '#B85C3A' },
      { id: 'sage', name: { en: 'Sage Green', ar: 'أخضر مريمي' }, hex: '#8F9B85' }
    ],
    sizes: [
      { id: 'chair', label: { en: 'Armchair', ar: 'كرسي بمسندين' }, dimensions: '78cm × 82cm', priceModifier: 0 }
    ],
    room: { en: 'Living Room & Bedroom', ar: 'غرفة المعيشة وغرفة النوم' },
    features: [
      { en: 'Sculpted curved silhouette', ar: 'تصميم منحنٍ نحتي' },
      { en: 'Solid wood base', ar: 'قاعدة خشبية صلبة' },
      { en: 'Made to order in 10 days', ar: 'تفصيل خلال ١٠ أيام' }
    ],
    inStock: true,
    isBestSeller: true,
    isSale: true,
    collection: 'everyday-luxury'
  },
  {
    id: 'sofa-9',
    slug: 'dana-lounge-chair',
    name: { en: 'Dana Lounge Chair', ar: 'كرسي دانا للاسترخاء' },
    category: { en: 'Armchairs', ar: 'كراسي فاخرة' },
    categorySlug: 'accent-chairs',
    subcategory: { en: 'Lounge Chairs', ar: 'كراسي استرخاء' },
    subcategorySlug: 'lounge-chair',
    description: {
      en: 'A deep lounge chair with a reclined back and feather-wrapped seat, made for slow mornings and a quiet cup of coffee.',
      ar: 'كرسي استرخاء عميق بمسند مائل ومقعد مغلف بالريش، مثالي للصباحات الهادئة وفنجان قهوة بلا عجلة.'
    },
    price: 1690,
    rating: 4.75,
    reviews: 28,
    badge: { en: 'Comfort Edit', ar: 'تشكيلة الراحة' },
    image: IMG('photo-1598300042247-d088f8ab3a91'),
    secondaryImage: IMG('photo-1618219908412-a29a1bb7b86e'),
    fabric: { en: 'Wool Blend', ar: 'مزيج صوف' },
    colors: [
      { id: 'charcoal', name: { en: 'Soft Charcoal', ar: 'فحمي ناعم' }, hex: '#4F5550' },
      { id: 'camel', name: { en: 'Warm Camel', ar: 'جملي دافئ' }, hex: '#B08762' },
      { id: 'olive', name: { en: 'Olive Grove', ar: 'زيتوني' }, hex: '#7C8266' }
    ],
    sizes: [
      { id: 'lounge', label: { en: 'Lounge Chair', ar: 'كرسي استرخاء' }, dimensions: '84cm × 90cm', priceModifier: 0 }
    ],
    room: { en: 'Study & Reading Room', ar: 'المكتب وغرفة القراءة' },
    features: [
      { en: 'Ergonomic reclined back', ar: 'مسند مائل مريح' },
      { en: 'Feather-wrapped seat', ar: 'مقعد مغلف بالريش' },
      { en: 'Swivel base option', ar: 'خيار قاعدة دوارة' }
    ],
    inStock: true,
    isNew: true,
    collection: 'art-of-living'
  },
  {
    id: 'sofa-10',
    slug: 'sama-pull-out-sofa-bed',
    name: { en: 'Sama Pull-Out Sofa Bed', ar: 'كنبة سما القابلة للفتح' },
    category: { en: 'Sofa Beds', ar: 'كنب سرير' },
    categorySlug: 'sofa-beds',
    subcategory: { en: 'Pull-Out Sofa Beds', ar: 'كنب سرير قابلة للفتح' },
    subcategorySlug: 'pull-out',
    description: {
      en: 'A tailored sofa by day and a comfortable double bed by night, with a smooth pull-out mechanism and hidden bedding storage.',
      ar: 'كنبة أنيقة نهاراً وسرير مزدوج مريح ليلاً، بآلية فتح سلسة وتخزين مخفي للمفارش.'
    },
    price: 2990,
    rating: 4.65,
    reviews: 46,
    badge: { en: 'Guest Ready', ar: 'جاهزة للضيوف' },
    image: IMG('photo-1550226891-ef816aed4a98'),
    secondaryImage: IMG('photo-1540574163026-643ea20ade25'),
    fabric: { en: 'Easy-Clean Weave', ar: 'نسيج سهل التنظيف' },
    colors: [
      { id: 'stone', name: { en: 'Stone', ar: 'حجري' }, hex: '#B9B2A7' },
      { id: 'navy', name: { en: 'Deep Navy', ar: 'كحلي غامق' }, hex: '#26333F' },
      { id: 'sand', name: { en: 'Warm Sand', ar: 'رملي دافئ' }, hex: '#D4C2A7' }
    ],
    sizes: [
      { id: 'two-bed', label: { en: '2-Seat / Double Bed', ar: 'مقعدان / سرير مزدوج' }, dimensions: '180cm × 95cm', priceModifier: 0 },
      { id: 'three-bed', label: { en: '3-Seat / Queen Bed', ar: '٣ مقاعد / سرير كبير' }, dimensions: '230cm × 100cm', priceModifier: 480 }
    ],
    room: { en: 'Guest Room & Multi-Use Space', ar: 'غرفة الضيوف والمساحات متعددة الاستخدام' },
    features: [
      { en: 'Smooth pull-out mechanism', ar: 'آلية فتح سلسة' },
      { en: 'Hidden bedding storage', ar: 'تخزين مخفي للمفارش' },
      { en: '10-year mechanism warranty', ar: 'ضمان ١٠ سنوات للآلية' }
    ],
    inStock: true,
    collection: 'smart-living'
  },
  {
    id: 'sofa-11',
    slug: 'reem-storage-sofa',
    name: { en: 'Reem Storage Sofa', ar: 'كنبة ريم بالتخزين' },
    category: { en: 'Sofa Beds', ar: 'كنب سرير' },
    categorySlug: 'sofa-beds',
    subcategory: { en: 'Storage Sofas', ar: 'كنب بتخزين' },
    subcategorySlug: 'storage-sofa',
    description: {
      en: 'A neatly proportioned sofa with a full-width lift-up storage base, ideal for apartments where every centimetre matters.',
      ar: 'كنبة بمقاسات مدروسة وقاعدة تخزين كاملة تفتح للأعلى، مثالية للشقق حيث كل سنتيمتر مهم.'
    },
    price: 3490,
    rating: 4.7,
    reviews: 31,
    badge: { en: 'Smart Storage', ar: 'تخزين ذكي' },
    image: IMG('photo-1519947486511-46149fa0a254'),
    secondaryImage: IMG('photo-1560448204-e02f11c3d0e2'),
    fabric: { en: 'Performance Weave', ar: 'نسيج عملي' },
    colors: [
      { id: 'ivory', name: { en: 'Warm Ivory', ar: 'عاجي دافئ' }, hex: '#E8DFD2' },
      { id: 'greige', name: { en: 'Soft Greige', ar: 'رمادي بيج' }, hex: '#B7ADA0' },
      { id: 'terracotta', name: { en: 'Terracotta', ar: 'تراكوتا' }, hex: '#B85C3A' }
    ],
    sizes: [
      { id: 'storage-3', label: { en: 'Three Seater', ar: 'ثلاثة مقاعد' }, dimensions: '220cm × 92cm', priceModifier: 0 }
    ],
    room: { en: 'Apartment Living Room', ar: 'غرفة معيشة الشقة' },
    features: [
      { en: 'Full-width storage base', ar: 'قاعدة تخزين بعرض كامل' },
      { en: 'Gas-lift opening', ar: 'فتح بمساعدة الغاز' },
      { en: 'Scratch-resistant fabric', ar: 'قماش مقاوم للخدوش' }
    ],
    inStock: true,
    collection: 'smart-living'
  },
  {
    id: 'sofa-12',
    slug: 'jade-recliner-chair',
    name: { en: 'Jade Recliner Chair', ar: 'كرسي جيد الاسترخائي' },
    category: { en: 'Armchairs', ar: 'كراسي فاخرة' },
    categorySlug: 'accent-chairs',
    subcategory: { en: 'Recliners', ar: 'كراسي استرخاء كهربائية' },
    subcategorySlug: 'recliner',
    description: {
      en: 'A quiet motorized recliner wrapped in supple leather, with a zero-gravity recline and integrated USB charging.',
      ar: 'كرسي استرخاء كهربائي هادئ مغلف بالجلد الناعم، بوضعية استلقاء مريحة وشاحن USB مدمج.'
    },
    price: 2250,
    oldPrice: 2600,
    rating: 4.8,
    reviews: 54,
    badge: { en: 'Smart Comfort', ar: 'راحة ذكية' },
    image: IMG('photo-1618219908412-a29a1bb7b86e'),
    secondaryImage: IMG('photo-1615873968403-89e068629265'),
    fabric: { en: 'Soft-Touch Leather', ar: 'جلد ناعم الملمس' },
    colors: [
      { id: 'cognac', name: { en: 'Cognac', ar: 'كونياك' }, hex: '#8B5A34' },
      { id: 'black', name: { en: 'Matte Black', ar: 'أسود مطفي' }, hex: '#222622' },
      { id: 'grey', name: { en: 'Pearl Grey', ar: 'رمادي لؤلؤي' }, hex: '#A6A6A1' }
    ],
    sizes: [
      { id: 'recliner', label: { en: 'Recliner', ar: 'كرسي استرخاء' }, dimensions: '86cm × 96cm', priceModifier: 0 }
    ],
    room: { en: 'Home Cinema & Study', ar: 'السينما المنزلية والمكتب' },
    features: [
      { en: 'Zero-gravity recline', ar: 'وضعية استلقاء مريحة' },
      { en: 'Whisper-quiet motor', ar: 'محرك صامت' },
      { en: 'Integrated USB charging', ar: 'شاحن USB مدمج' }
    ],
    inStock: false,
    isSale: true,
    collection: 'smart-living'
  }
];
