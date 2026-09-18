import { Product } from '../types';

export const ACCESSORIES_PRODUCTS: Product[] = [
  {
    id: 'prod-20',
    slug: 'recessed-s-wave-ceiling-track',
    name: {
      en: 'Recessed S-Wave Ceiling Track (3m)',
      ar: 'مجرى ستائر ويف مخفي بالجبس (٣ أمتار)'
    },
    category: {
      en: 'Curtain Accessories',
      ar: 'إكسسوارات الستائر'
    },
    categorySlug: 'accessories',
    subcategory: { en: 'Tracks & Rails', ar: 'سكك ومجاري' },
    subcategorySlug: 'tracks',
    collection: 'saudi-home',
    description: {
      en: 'Architectural aluminum profile engineered to be embedded seamlessly flush with false ceiling gypsum boards. Silent ball-bearing gliders ensure zero friction.',
      ar: 'بروفايل ألمنيوم معماري يدمج بسلاسة داخل جبس السقف المستعار ليعطي انسيابية خفية تماماً بدون ظهور المجرى، مع عجلات رولمان بلي صامتة للغاية.'
    },
    price: 280,
    oldPrice: 350,
    comparePrice: 350,
    discount: 20,
    rating: 4.96,
    reviews: 84,
    reviewCount: 84,
    badge: { en: 'Architectural Flush', ar: 'مخفي بالجبس' },
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
    fabric: { en: 'Extruded Aircraft Grade Aluminum', ar: 'ألمنيوم طائرات مسحوب عالي الصلابة' },
    pattern: { en: 'Concealed Channel', ar: 'قناة مخفية' },
    lightControl: 'room-darkening',
    colors: [
      { id: 'matte-white-track', name: { en: 'Powder Coat White', ar: 'أبيض بودرة مطفي' }, hex: '#FFFFFF' },
      { id: 'anodized-black', name: { en: 'Anodized Obsidian', ar: 'أسود مؤكسد' }, hex: '#1C1C1C' }
    ],
    sizes: [
      { id: 's1', label: { en: '3-Meter Length', ar: 'طول ٣ أمتار' }, dimensions: '300cm Track + 36 Gliders', priceModifier: 0 },
      { id: 's2', label: { en: '5-Meter Villa Span', ar: 'طول ٥ أمتار للفلل' }, dimensions: '500cm Track + 60 Gliders', priceModifier: 130 }
    ],
    room: { en: 'Villas & Modern Living Rooms', ar: 'الفلل وغرف المعيشة المعاصرة' },
    features: [
      { en: 'Pre-Spaced Wave Cords Included', ar: 'سلسلة مسافات الويف المنتظمة مرفقة' },
      { en: 'Supports Heavy Drapes up to 45kg', ar: 'يتحمل أوزان ستائر ثقيلة حتى ٤٥ كجم' }
    ],
    inStock: true,
    stock: 45,
    isBestSeller: true
  },
  {
    id: 'prod-21',
    slug: 'brushed-brass-luxury-curtain-rod',
    name: {
      en: 'Brushed Brass Luxury Curtain Rod Set',
      ar: 'قضيب ستائر فاخر من النحاس الممشط'
    },
    category: {
      en: 'Curtain Accessories',
      ar: 'إكسسوارات الستائر'
    },
    categorySlug: 'accessories',
    subcategory: { en: 'Curtain Rods', ar: 'قضبان الستائر' },
    subcategorySlug: 'rods',
    collection: 'saudi-home',
    description: {
      en: 'Solid steel rod with electroplated warm brushed brass finish and fluted crown finials, elevating classic and transitional interiors with timeless poise.',
      ar: 'قضيب فولاذي صلب مطلي بطبقة نحاس ممشط دافئ مع تيجان طرفية محفورة بفخامة، يضفي هيبة ملكية راقية على ستائر المجالس وصالات الاستقبال.'
    },
    price: 240,
    oldPrice: 299,
    comparePrice: 299,
    discount: 20,
    rating: 4.88,
    reviews: 57,
    reviewCount: 57,
    badge: { en: 'Premium Brass', ar: 'نحاس ممشط فاخر' },
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    fabric: { en: 'Heavy Gauge Steel & Solid Brass', ar: 'فولاذ ثقيل ونحاس صلب' },
    pattern: { en: 'Fluted Architectural Finial', ar: 'تاج معماري محفور' },
    lightControl: 'light-filtering',
    colors: [
      { id: 'brushed-brass', name: { en: 'Warm Brushed Brass', ar: 'نحاس ممشط دافئ' }, hex: '#CDB172' },
      { id: 'antique-bronze', name: { en: 'Antique Bronze', ar: 'برونز عتيق' }, hex: '#634F3D' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Adjustable 180-320cm', ar: 'قابل للتمدد ١٨٠-٣٢٠ سم' }, dimensions: '180cm - 320cm Telescopic', priceModifier: 0 },
      { id: 's2', label: { en: 'Extra Long 240-420cm', ar: 'طويل جداً ٢٤٠-٤٢٠ سم' }, dimensions: '240cm - 420cm Telescopic', priceModifier: 80 }
    ],
    room: { en: 'Majlis & Formal Dining Room', ar: 'المجلس وصالة الطعام الرسمية' },
    features: [
      { en: 'Includes 3 Heavy Wall Brackets', ar: 'يشمل ٣ كوابيل تثبيت جدارية متينة' },
      { en: 'Scratch & Tarnish Resistant', ar: 'مقاوم للخدش وتغير اللون' }
    ],
    inStock: true,
    stock: 36,
    isSale: true
  },
  {
    id: 'prod-22',
    slug: 'smart-wifi-motor-retrofit-kit',
    name: {
      en: 'Smart WiFi Motor Kit for Curtains',
      ar: 'محرك ذكي لتحويل الستائر إلى آلية بالواي فاي'
    },
    category: {
      en: 'Curtain Accessories',
      ar: 'إكسسوارات الستائر'
    },
    categorySlug: 'accessories',
    subcategory: { en: 'Smart Motors', ar: 'محركات ذكية' },
    subcategorySlug: 'motors',
    collection: 'saudi-home',
    description: {
      en: 'Easily retrofits existing curtains to smart automated control. Features gentle touch-start, obstacle safety stop, and full mobile app integration.',
      ar: 'يحول ستائرك الحالية بكل سهولة إلى ستائر كهربائية ذكية مع خاصية التشغيل بلمسة يد خفيفة ومستشعر أمان للتوقف التلقائي عند العوائق.'
    },
    price: 499,
    oldPrice: 620,
    comparePrice: 620,
    discount: 20,
    rating: 4.93,
    reviews: 96,
    reviewCount: 96,
    badge: { en: 'Top Tech', ar: 'تقنية متقدمة' },
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    fabric: { en: 'Brushless DC Silent Engine', ar: 'محرك تيار مستمر فائق الهدوء بدون فرش' },
    pattern: { en: 'Compact Motor Unit', ar: 'وحدة محرك مدمجة' },
    lightControl: 'room-darkening',
    colors: [
      { id: 'clean-white-motor', name: { en: 'Appliance White', ar: 'أبيض ناصع' }, hex: '#FFFFFF' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Single Motor + Remote', ar: 'محرك مفرد + ريموت' }, dimensions: 'Up to 5m Curtain Rail', priceModifier: 0 },
      { id: 's2', label: { en: 'Dual Motor (Sheer + Blackout)', ar: 'محرك مزدوج (شيفون + بلاك أوت)' }, dimensions: 'Dual Rail Kit', priceModifier: 380 }
    ],
    room: { en: 'Master Suite & High Ceiling Living', ar: 'جناح النوم والأسقف العالية' },
    features: [
      { en: 'Quiet < 30dB Operation', ar: 'صوت هادئ أقل من ٣٠ ديسيبل' },
      { en: 'Sync with Riyadh Sunrise/Sunset', ar: 'مزامنة أوتوماتيكية مع شروق وغروب شمس الرياض' }
    ],
    inStock: true,
    stock: 22,
    isBestSeller: true
  },
  {
    id: 'prod-23',
    slug: 'handcrafted-gold-tassel-tiebacks',
    name: {
      en: 'Handcrafted Royal Tassel Tiebacks (Pair)',
      ar: 'زوج أربطة ستائر ملكية بشراشيب مذهبة يدوية'
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
      en: 'Handmade luxury corded tiebacks with heavy metallic tassels, crystal bead embellishments, and rich braided ropes crafted for Saudi majlis drapery.',
      ar: 'أربطة ستائر يدوية الصنع بحبال مجدولة سميكة وشراشيب مذهبة مع كريستالات براقة لتثبيت أطراف ستائر المجالس الفخمة بأناقة ملوكية.'
    },
    price: 165,
    oldPrice: 210,
    comparePrice: 210,
    discount: 21,
    rating: 4.87,
    reviews: 68,
    reviewCount: 68,
    badge: { en: 'Handmade Pair', ar: 'طقم يدوي زوج' },
    image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
    fabric: { en: 'Braided Silk & Crystal Glass', ar: 'حرير مجدول وزجاج كريستالي' },
    pattern: { en: 'Traditional Royal Tassel', ar: 'شرابة ملكية تقليدية' },
    lightControl: 'light-filtering',
    colors: [
      { id: 'antique-gold-tie', name: { en: 'Royal Antique Gold', ar: 'ذهبي ملكي عتيق' }, hex: '#C5A059' },
      { id: 'emerald-gold', name: { en: 'Emerald Green & Gold', ar: 'زمردي مع ذهبي' }, hex: '#1B3B2B' },
      { id: 'silver-ivory-tie', name: { en: 'Silver & Pearl Ivory', ar: 'فضي وعاجي لؤلؤي' }, hex: '#DCDAD4' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Pair (85cm Loop)', ar: 'زوج (حبل ٨٥ سم)' }, dimensions: '85cm Cord + 25cm Tassel', priceModifier: 0 }
    ],
    room: { en: 'Majlis & Salon', ar: 'المجلس وصالون الضيوف' },
    features: [
      { en: 'Weighted Tassel Core', ar: 'قلب شرابة مثقل لثبات أنيق' },
      { en: 'Includes 2 Matching Brass Wall Hooks', ar: 'يشمل خطافين جداريين نحاسيين متطابقين' }
    ],
    inStock: true,
    stock: 54,
    isSale: true
  },
  {
    id: 'prod-24',
    slug: 'magnetic-leather-minimal-tiebacks',
    name: {
      en: 'Magnetic Leather Minimal Tiebacks (Pair)',
      ar: 'أربطة ستائر جلدية عصرية بإغلاق مغناطيسي'
    },
    category: {
      en: 'Curtain Accessories',
      ar: 'إكسسوارات الستائر'
    },
    categorySlug: 'accessories',
    subcategory: { en: 'Tiebacks', ar: 'أربطة ستائر' },
    subcategorySlug: 'tiebacks',
    collection: 'minimal-living',
    description: {
      en: 'Sleek Italian full-grain leather straps with powerful neodymium hidden magnets. Requires no wall drilling or hooks, allowing instant effortless styling.',
      ar: 'أحزمة جلد إيطالي فاخر مع مغناطيس نيوديميوم قوي مدمج، يثبت الستائر بأي وضعية ترغبها دون الحاجة لثقب الجدران إطلاقاً.'
    },
    price: 129,
    oldPrice: 160,
    comparePrice: 160,
    discount: 19,
    rating: 4.82,
    reviews: 75,
    reviewCount: 75,
    badge: { en: 'No Drilling', ar: 'بدون ثقب جدار' },
    image: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800&auto=format&fit=crop',
    fabric: { en: 'Genuine Full-Grain Leather', ar: 'جلد طبيعي نخب أول' },
    pattern: { en: 'Clean Minimalist Strap', ar: 'حزام جلدي بسيط وأنيق' },
    lightControl: 'light-filtering',
    colors: [
      { id: 'cognac-leather', name: { en: 'Cognac Saddle Brown', ar: 'بني سرج دافئ' }, hex: '#8B5A2B' },
      { id: 'black-leather', name: { en: 'Matte Jet Black', ar: 'أسود مطفي' }, hex: '#222222' },
      { id: 'cream-leather', name: { en: 'Natural Sand Beige', ar: 'بيج رملي طبيعي' }, hex: '#D2C3B0' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Pair (45cm)', ar: 'زوج (طول ٤٥ سم)' }, dimensions: '45cm × 3cm Wide Strap', priceModifier: 0 }
    ],
    room: { en: 'Modern Living Room & Bedroom', ar: 'غرفة المعيشة وغرفة النوم المعاصرة' },
    features: [
      { en: 'Ultra-Strong Neodymium Magnets', ar: 'مغناطيس نيوديميوم فائق القوة' },
      { en: 'Protects Delicate Sheers and Linens', ar: 'يحمي أقمشة الشيفون والكتان من التلف' }
    ],
    inStock: true,
    stock: 62,
    isNew: true
  },
  {
    id: 'prod-25',
    slug: 'silent-glide-curtain-rings-pack',
    name: {
      en: 'Silent-Glide Nylon-Lined Metal Rings (Pack of 24)',
      ar: 'حلقات ستائر معدنية ببطانة نايلون صامتة (عبوة ٢٤ قطعة)'
    },
    category: {
      en: 'Curtain Accessories',
      ar: 'إكسسوارات الستائر'
    },
    categorySlug: 'accessories',
    subcategory: { en: 'Hooks & Rings', ar: 'حلقات وخطافات' },
    subcategorySlug: 'rings',
    collection: 'saudi-home',
    description: {
      en: 'Heavy-duty steel curtain rings lined with internal nylon inserts for noiseless, frictionless gliding on metal and wooden curtain rods.',
      ar: 'حلقات معدنية عالية التحمل مبطنة داخلياً بحلقة نايلون عازلة تمنع الاحتكاك وتضمن انزلاقاً هادئاً جداً دون أي صوت أو خدش للقضيب.'
    },
    price: 85,
    oldPrice: 110,
    comparePrice: 110,
    discount: 22,
    rating: 4.79,
    reviews: 88,
    reviewCount: 88,
    badge: { en: 'Silent Pack', ar: 'انزلاق صامت' },
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
    fabric: { en: 'Hardened Steel with Nylon Ring Insert', ar: 'فولاذ مقسى مع بطانة نايلون' },
    pattern: { en: 'Smooth Round Rings with Eyelet Loop', ar: 'حلقات دائرية مع خطاف سفلي' },
    lightControl: 'light-filtering',
    colors: [
      { id: 'brass-ring', name: { en: 'Brushed Brass', ar: 'نحاس ممشط' }, hex: '#CDB172' },
      { id: 'matte-black-ring', name: { en: 'Matte Black', ar: 'أسود مطفي' }, hex: '#1C1C1C' },
      { id: 'satin-nickel', name: { en: 'Satin Nickel', ar: 'نيكل ساتان' }, hex: '#C4C6C8' }
    ],
    sizes: [
      { id: 's1', label: { en: 'Pack of 24 (45mm inner dia)', ar: 'عبوة ٢٤ حلقة (قطر داخلي ٤٥ ملم)' }, dimensions: 'Inner Diameter 45mm', priceModifier: 0 }
    ],
    room: { en: 'All Rooms', ar: 'كافة الغرف' },
    features: [
      { en: 'Zero Squeak or Scraping Noise', ar: 'انعدام تام لأصوات الاحتكاك والصرير' },
      { en: 'Supports up to 5kg per Ring', ar: 'تتحمل ٥ كجم لكل حلقة مفردة' }
    ],
    inStock: true,
    stock: 90
  }
];
