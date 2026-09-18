import { Product, BilingualText } from '../types';
import { PRODUCTS } from './products';

export interface EditorialSubCategory {
  id: string;
  name: BilingualText;
  image: string;
  tag?: BilingualText;
  link?: string;
}

export interface EditorialSectionData {
  id: string;
  title: BilingualText;
  lifestyleImage: string;
  lifestyleHeading: BilingualText;
  lifestyleSubtitle: BilingualText;
  lifestyleCta: BilingualText;
  lifestyleBadge?: BilingualText;
  lifestyleLink?: string;
  subcategories: EditorialSubCategory[];
  topPicks: Product[];
}

// ----------------------------------------------------
// SECTION 01: Window Décor
// ----------------------------------------------------
export const WINDOW_DECOR_SECTION: EditorialSectionData = {
  id: 'window-decor',
  title: {
    en: 'Window Décor',
    ar: 'ديكور النوافذ'
  },
  lifestyleImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
  lifestyleHeading: {
    en: 'Elevate Your Living Space',
    ar: 'ارتقِ بجمال مساحة معيشتك'
  },
  lifestyleSubtitle: {
    en: 'Premium curtains designed for modern homes and radiant daylight control.',
    ar: 'ستائر فاخرة مصممة للمنازل العصرية وللتحكم المثالي في الإضاءة الطبيعية.'
  },
  lifestyleCta: {
    en: 'Explore Collection',
    ar: 'اكتشف المجموعة'
  },
  lifestyleBadge: {
    en: 'ATELIER EDIT',
    ar: 'تشكيلة الأتيليه'
  },
  subcategories: [
    {
      id: 'blackout-curtains',
      name: { en: 'Blackout Curtains', ar: 'الستائر المعتمة' },
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
      tag: { en: '100% Blackout', ar: 'عتمة ١٠٠٪' }
    },
    {
      id: 'sheer-curtains',
      name: { en: 'Sheer Curtains', ar: 'الستائر الشفافة' },
      image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800&auto=format&fit=crop',
      tag: { en: 'Soft Voile', ar: 'فوال ناعم' }
    },
    {
      id: 'roller-blinds',
      name: { en: 'Roller Blinds', ar: 'ستائر الرول' },
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
      tag: { en: 'Smart Motor', ar: 'محرك ذكي' }
    },
    {
      id: 'roman-blinds',
      name: { en: 'Roman Blinds', ar: 'الستائر الرومانية' },
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
      tag: { en: 'Architectural Folds', ar: 'طيات هندسية' }
    }
  ],
  topPicks: [
    PRODUCTS[0], // Royal Blackout
    PRODUCTS[1], // Milano Sheer
    PRODUCTS[2], // Velvet Luxe
    PRODUCTS[4], // Premium Roller Blind
    PRODUCTS[7]  // Signature Wave Curtain
  ]
};

// ----------------------------------------------------
// SECTION 02: Living Room
// ----------------------------------------------------
export const LIVING_ROOM_SECTION: EditorialSectionData = {
  id: 'living-room',
  title: {
    en: 'Living Room',
    ar: 'غرفة المعيشة'
  },
  lifestyleImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop',
  lifestyleHeading: {
    en: 'The Heart of Hospitality',
    ar: 'فخامة الاستقبال وكرم الضيافة'
  },
  lifestyleSubtitle: {
    en: 'Majestic drapes crafted for modern Riyadh majlis and expansive family salons.',
    ar: 'ستائر منسدلة بمهابة ملكية صُممت للمجالس السعودية الفاخرة وصالونات العائلة.'
  },
  lifestyleCta: {
    en: 'Explore Living Room',
    ar: 'استكشف تصاميم المعيشة'
  },
  lifestyleBadge: {
    en: 'MAJLIS COLLECTION',
    ar: 'مجموعة المجالس'
  },
  subcategories: [
    {
      id: 'living-curtains',
      name: { en: 'Living Room Curtains', ar: 'ستائر غرف المعيشة' },
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
      tag: { en: 'Floor-to-Ceiling', ar: 'من الأرض للسقف' }
    },
    {
      id: 'luxury-sheers',
      name: { en: 'Luxury Sheers', ar: 'شيفونات فاخرة' },
      image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800&auto=format&fit=crop',
      tag: { en: 'Italian Organza', ar: 'أورجانزا إيطالية' }
    },
    {
      id: 'decorative-curtains',
      name: { en: 'Decorative Curtains', ar: 'ستائر ديكورية' },
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
      tag: { en: 'French Pleats', ar: 'طيات فرنسية' }
    },
    {
      id: 'curtain-accessories',
      name: { en: 'Curtain Accessories', ar: 'إكسسوارات وسكك' },
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
      tag: { en: 'Silent Motor Rails', ar: 'سكك صامتة ذكية' }
    }
  ],
  topPicks: [
    PRODUCTS[2], // Velvet Luxe
    PRODUCTS[3], // Sandstone Linen
    PRODUCTS[1], // Milano Sheer
    PRODUCTS[7], // Signature Wave
    {
      id: 'prod-living-gold',
      name: { en: 'Imperial Damask Curtain', ar: 'ستارة دمشقية ملكية منقوشة' },
      category: { en: 'Living Room Curtains', ar: 'ستائر غرف المعيشة' },
      categorySlug: 'curtains',
      description: {
        en: 'Exquisite tone-on-tone woven damask designed for grand Riyadh reception halls, finished with brushed bronze eyelets.',
        ar: 'نسيج دمشقي بنقوش كلاسيكية ناعمة منسوجة خصيصاً للمجالس الكبرى، مع حلقات برونزية فاخرة.'
      },
      price: 520,
      oldPrice: 650,
      rating: 4.9,
      reviews: 88,
      badge: { en: 'New Arrival', ar: 'وصل حديثاً' },
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
      secondaryImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
      fabric: { en: 'Woven Jacquard Brocade', ar: 'جاكار دمشقي منسوج' },
      colors: [
        { id: 'gold-champagne', name: { en: 'Royal Gold', ar: 'ذهبي ملكي' }, hex: '#C5A869' },
        { id: 'desert-beige', name: { en: 'Warm Sand', ar: 'رمل دافئ' }, hex: '#D8CBB6' },
        { id: 'ivory-silk', name: { en: 'Silk Ivory', ar: 'عاجي حريري' }, hex: '#F7F4EB' }
      ],
      sizes: [
        { id: 's1', label: { en: 'Standard 180cm', ar: 'قياسي ١٨٠ سم' }, dimensions: '180cm × 270cm', priceModifier: 0 },
        { id: 's2', label: { en: 'Majlis Wide 300cm', ar: 'مجلس عريض ٣٠٠ سم' }, dimensions: '300cm × 300cm', priceModifier: 130 },
        { id: 's3', label: { en: 'Villa Grande 400cm', ar: 'فيلا فخمة ٤٠٠ سم' }, dimensions: '400cm × 360cm', priceModifier: 260 }
      ],
      room: { en: 'Formal Majlis & Living Salon', ar: 'المجلس الرسمي وصالون الضيوف' },
      features: [
        { en: 'Opulent woven brocade', ar: 'بروكار منسوج فائق الفخامة' },
        { en: 'Weighted lower hem', ar: 'حاشية سفلية مثقلة' }
      ],
      inStock: true
    }
  ]
};

// ----------------------------------------------------
// SECTION 03: Bedroom
// ----------------------------------------------------
export const BEDROOM_SECTION: EditorialSectionData = {
  id: 'bedroom',
  title: {
    en: 'Bedroom',
    ar: 'غرفة النوم'
  },
  lifestyleImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop',
  lifestyleHeading: {
    en: 'Serenity & Restful Darkness',
    ar: 'سكينة تامة ونوم هادئ عميق'
  },
  lifestyleSubtitle: {
    en: 'Triple-layer acoustic and thermal blackout drapes shielding 100% of Riyadh desert heat.',
    ar: 'ستائر عازلة ثلاثية الطبقات تحجب ١٠٠٪ من الضوء والحرارة لبيئة نوم هادئة ومريحة.'
  },
  lifestyleCta: {
    en: 'Explore Bedroom',
    ar: 'استكشف تصاميم غرف النوم'
  },
  lifestyleBadge: {
    en: 'COMFORT EDIT',
    ar: 'تشكيلة الراحة'
  },
  subcategories: [
    {
      id: 'blackout',
      name: { en: 'Blackout Curtains', ar: 'الستائر المعتمة' },
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
      tag: { en: '100% Light Block', ar: 'عزل تام للضوء' }
    },
    {
      id: 'thermal',
      name: { en: 'Thermal Curtains', ar: 'ستائر عازلة للحرارة' },
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
      tag: { en: 'AC Efficiency', ar: 'توفير التكييف' }
    },
    {
      id: 'sheer',
      name: { en: 'Sheer Curtains', ar: 'ستائر شفافة' },
      image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800&auto=format&fit=crop',
      tag: { en: 'Morning Glow', ar: 'إشراقة صباحية' }
    },
    {
      id: 'bedroom-sets',
      name: { en: 'Bedroom Sets', ar: 'أطقم غرف النوم' },
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
      tag: { en: 'Dual Layer', ar: 'طبقتين متناسقتين' }
    }
  ],
  topPicks: [
    PRODUCTS[0], // Royal Blackout
    PRODUCTS[6], // Classic Roman
    PRODUCTS[3], // Sandstone Linen
    PRODUCTS[1], // Milano Sheer
    {
      id: 'prod-bedroom-cashmere',
      name: { en: 'Cashmere Touch Thermal Drape', ar: 'ستارة كشمير الحرارية العازلة' },
      category: { en: 'Bedroom Curtains', ar: 'ستائر غرف النوم' },
      categorySlug: 'blackout-curtains',
      description: {
        en: 'Velvety ultra-soft drape with multi-core insulation fibers, ensuring midnight darkness even during Riyadh midday sun.',
        ar: 'ملمس كشميري فائق النعومة مع طبقات عزل داخلية تمنحك عتمة ليلية كاملة حتى في عز ظهيرة شمس الرياض.'
      },
      price: 395,
      oldPrice: 480,
      rating: 4.95,
      reviews: 142,
      badge: { en: 'Best for Sleep', ar: 'الأفضل للنوم' },
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
      secondaryImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
      fabric: { en: 'Ultra-Soft Cashmere Blend Velvet', ar: 'مخمل كشمير فائق النعومة' },
      colors: [
        { id: 'slate-blue', name: { en: 'Midnight Slate', ar: 'رمادي ليلي' }, hex: '#3B444C' },
        { id: 'taupe-warm', name: { en: 'Warm Taupe', ar: 'توب دافئ' }, hex: '#94887C' },
        { id: 'sand-mist', name: { en: 'Sand Mist', ar: 'ضباب صحراوي' }, hex: '#DCD4C6' }
      ],
      sizes: [
        { id: 's1', label: { en: 'Standard Window', ar: 'نافذة قياسية' }, dimensions: '160cm × 260cm', priceModifier: 0 },
        { id: 's2', label: { en: 'Master Suite', ar: 'جناح رئيسي' }, dimensions: '240cm × 280cm', priceModifier: 85 },
        { id: 's3', label: { en: 'Grand High Wall', ar: 'جدار مرتفع' }, dimensions: '320cm × 320cm', priceModifier: 170 }
      ],
      room: { en: 'Master Bedroom & Nursery', ar: 'غرفة النوم الرئيسية والأطفال' },
      features: [
        { en: '100% complete zero-light seal', ar: 'حجب كامل بنسبة ١٠٠٪ للضوء' },
        { en: 'Sound deadening acoustic layer', ar: 'عزل فائق لضوضاء الشارع' }
      ],
      inStock: true
    }
  ]
};

// ----------------------------------------------------
// SECTION 04: Modern Blinds
// ----------------------------------------------------
export const MODERN_BLINDS_SECTION: EditorialSectionData = {
  id: 'modern-blinds',
  title: {
    en: 'Modern Blinds',
    ar: 'الستائر الحديثة'
  },
  lifestyleImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop',
  lifestyleHeading: {
    en: 'Architectural Shading & Smart Control',
    ar: 'تظليل معماري حديث وتحكم ذكي'
  },
  lifestyleSubtitle: {
    en: 'Streamlined roller, zebra and wooden blinds compatible with modern smart home automation.',
    ar: 'ستائر رول وزيبرا وخشبية مدمجة بأحدث محركات التحكم الصامت والأنظمة الذكية.'
  },
  lifestyleCta: {
    en: 'Explore Blinds',
    ar: 'استكشف المظلات والستائر'
  },
  lifestyleBadge: {
    en: 'SMART SHADING',
    ar: 'تظليل ذكي'
  },
  subcategories: [
    {
      id: 'roller-blinds-cat',
      name: { en: 'Roller Blinds', ar: 'ستائر رول' },
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
      tag: { en: 'Minimalist Clean', ar: 'تصميم نظيف' }
    },
    {
      id: 'zebra-blinds-cat',
      name: { en: 'Zebra Blinds', ar: 'ستائر زيبرا' },
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
      tag: { en: 'Day & Night', ar: 'نهاري وليلي' }
    },
    {
      id: 'roman-blinds-cat',
      name: { en: 'Roman Blinds', ar: 'ستائر رومانية' },
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
      tag: { en: 'Fabric Folds', ar: 'طيات قماشية' }
    },
    {
      id: 'wooden-blinds-cat',
      name: { en: 'Wooden Blinds', ar: 'ستائر خشبية فاخرة' },
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
      tag: { en: 'Natural Basswood', ar: 'خشب طبيعي' }
    }
  ],
  topPicks: [
    PRODUCTS[4], // Premium Roller
    PRODUCTS[5], // Modern Zebra
    PRODUCTS[6], // Classic Roman
    {
      id: 'prod-wood-blind',
      name: { en: 'Basswood Venetian Blind', ar: 'ستارة فينيسية خشب طبيعي فاخر' },
      category: { en: 'Wooden Blinds', ar: 'ستائر خشبية' },
      categorySlug: 'roller-blinds',
      description: {
        en: 'Natural kiln-dried basswood slats with moisture seal, imparting organic warmth and precise light angle control.',
        ar: 'شرائح خشب باس وود طبيعي مجفف حرارياً ومقاوم للرطوبة، تضفي دفئاً عضوياً فخماً مع تحكم زاوي في الضوء.'
      },
      price: 365,
      oldPrice: 440,
      rating: 4.85,
      reviews: 58,
      badge: { en: 'Natural Wood', ar: 'خشب طبيعي' },
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
      secondaryImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
      fabric: { en: '50mm Natural Kiln-Dried Wood', ar: 'خشب طبيعي ٥٠ ملم مجفف' },
      colors: [
        { id: 'natural-oak', name: { en: 'Natural Oak', ar: 'بلوط طبيعي' }, hex: '#BCA47B' },
        { id: 'walnut-dark', name: { en: 'Dark Walnut', ar: 'جوز داكن' }, hex: '#4A3326' },
        { id: 'pure-white-wood', name: { en: 'White Matte', ar: 'أبيض مطفي' }, hex: '#F5F5F3' }
      ],
      sizes: [
        { id: 's1', label: { en: '100cm × 160cm', ar: '١٠٠ × ١٦٠ سم' }, dimensions: '100cm × 160cm', priceModifier: 0 },
        { id: 's2', label: { en: '160cm × 200cm', ar: '١٦٠ × ٢٠٠ سم' }, dimensions: '160cm × 200cm', priceModifier: 60 },
        { id: 's3', label: { en: '220cm × 240cm', ar: '٢٢٠ × ٢٤٠ سم' }, dimensions: '220cm × 240cm', priceModifier: 120 }
      ],
      room: { en: 'Executive Office & Study', ar: 'المكتب والملحق ومساحات العمل' },
      features: [
        { en: 'Anti-warp moisture seal', ar: 'معالجة ضد التقوس والحرارة' },
        { en: 'Heavy-duty smooth tilter', ar: 'آلية إمالة متينة وسلسة' }
      ],
      inStock: true
    },
    PRODUCTS[7] // Signature Wave
  ]
};

// ----------------------------------------------------
// CURATED COLLECTION SECTION: "Curated for Your Home"
// ----------------------------------------------------
export const CURATED_COLLECTION = {
  eyebrow: {
    en: 'Curated for Your Home',
    ar: 'مختارات لمنزلك'
  },
  title: {
    en: 'Natural Textures',
    ar: 'أنسجة وخامات طبيعية'
  },
  description: {
    en: 'Warm tones and premium fabrics for calm, elegant interiors. Sourced from sustainable European looms and hand-finished in our Riyadh atelier.',
    ar: 'ألوان دافئة وأقمشة فاخرة لمساحات هادئة وأنيقة. مختارة من أجود الأنوال الأوروبية ومحاكة بعناية في ورش عملنا بالرياض.'
  },
  cta: {
    en: 'Explore Collection',
    ar: 'اكتشف المجموعة'
  },
  heroImage: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?q=80&w=1200&auto=format&fit=crop',
  items: [
    {
      id: 'natural-1',
      title: { en: 'Pure Belgian Flax Linen', ar: 'كتان بلجيكي طبيعي نقي' },
      tag: { en: 'Raw Weave', ar: 'نسيج طبيعي' },
      price: 'From SAR 389',
      image: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'natural-2',
      title: { en: 'Textured Wool-Silk Voile', ar: 'فوال صوف وحرير منسوج' },
      tag: { en: 'Airy Daylight', ar: 'ترشيح ضوء ناعم' },
      price: 'From SAR 295',
      image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'natural-3',
      title: { en: 'Sand Dune Heavy Jacquard', ar: 'جاكار رمال الصحراء الثقيل' },
      tag: { en: 'Rich Drape', ar: 'انسيابية فاخرة' },
      price: 'From SAR 460',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop'
    }
  ]
};

// ----------------------------------------------------
// FULL-WIDTH PROMOTIONAL BANNER: "Refresh Your Windows"
// ----------------------------------------------------
export const PROMOTIONAL_BANNER = {
  eyebrow: {
    en: 'THE NEW RIYADH COLLECTION',
    ar: 'تشكيلة الرياض الجديدة'
  },
  title: {
    en: 'Refresh Your Windows',
    ar: 'جدّد إطلالة نوافذك'
  },
  subtitle: {
    en: 'Discover our latest curtain collection — precision tailored with free in-home laser measurement across Riyadh.',
    ar: 'اكتشف أحدث تشكيلات الستائر الفاخرة — تفصيل دقيق مع خدمة أخذ المقاسات بالليزر مجاناً في منزلك بالرياض.'
  },
  cta: {
    en: 'Shop New Arrivals',
    ar: 'تسوق الجديد'
  },
  secondaryCta: {
    en: 'Book In-Home Measurement',
    ar: 'حجز أخذ المقاسات'
  },
  badge: {
    en: 'COMPLIMENTARY CONSULTATION',
    ar: 'استشارة وقياس مجاني'
  },
  image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop'
};
