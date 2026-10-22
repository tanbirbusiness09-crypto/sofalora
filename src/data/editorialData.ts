import { Product, BilingualText } from '../types';
import { SOFA_PRODUCTS } from './catalogSofas';
import { CURTAIN_PRODUCTS } from './catalogCurtains';
import { MORE_PRODUCTS } from './catalogMoreProducts';

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

const curtainTopPicks = [
  ...CURTAIN_PRODUCTS.slice(0, 4),
  ...MORE_PRODUCTS.filter((p) => ['blackout-curtains', 'sheer-curtains', 'custom-curtains'].includes(p.categorySlug)).slice(0, 1)
];

// ----------------------------------------------------
// SECTION 01: Sofas & Majlis Seating
// ----------------------------------------------------
export const WINDOW_DECOR_SECTION: EditorialSectionData = {
  id: 'sofas',
  title: {
    en: 'Sofas & Majlis Seating',
    ar: 'الكنب وجلسات المجالس'
  },
  lifestyleImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1600&auto=format&fit=crop',
  lifestyleHeading: {
    en: 'Sculpted Comfort, Made for Living',
    ar: 'راحة نحتية صُممت للحياة'
  },
  lifestyleSubtitle: {
    en: 'Curved sectionals, generous majlis sets and accent chairs upholstered in fabrics chosen for the Saudi climate.',
    ar: 'كنب منحنٍ وأطقم مجالس فسيحة وكراسي فاخرة بأقمشة مختارة لتناسب مناخ المملكة.'
  },
  lifestyleCta: {
    en: 'Explore Sofa Collection',
    ar: 'اكتشف مجموعة الكنب'
  },
  lifestyleBadge: {
    en: 'ATELIER EDIT',
    ar: 'تشكيلة الأتيليه'
  },
  lifestyleLink: '/category/sofas',
  subcategories: [
    {
      id: 'sectional-sofas',
      name: { en: 'Sectional Sofas', ar: 'الكنب المقسم' },
      image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=800&auto=format&fit=crop',
      tag: { en: 'L & U Shape', ar: 'شكل L و U' }
    },
    {
      id: 'majlis-sofas',
      name: { en: 'Majlis Sofas', ar: 'كنب المجالس' },
      image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=800&auto=format&fit=crop',
      tag: { en: 'Saudi Hospitality', ar: 'ضيافة سعودية' }
    },
    {
      id: 'accent-chairs',
      name: { en: 'Accent Chairs', ar: 'كراسي الديكور' },
      image: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?q=80&w=800&auto=format&fit=crop',
      tag: { en: 'Sculptural', ar: 'تصميم نحتي' }
    },
    {
      id: 'sofa-beds',
      name: { en: 'Sofa Beds', ar: 'كنب السرير' },
      image: 'https://images.unsplash.com/photo-1550226891-ef816aed4a98?q=80&w=800&auto=format&fit=crop',
      tag: { en: 'Guest Ready', ar: 'جاهزة للضيوف' }
    }
  ],
  topPicks: [
    SOFA_PRODUCTS[0],
    SOFA_PRODUCTS[3],
    SOFA_PRODUCTS[5],
    SOFA_PRODUCTS[7],
    SOFA_PRODUCTS[2]
  ]
};

// ----------------------------------------------------
// SECTION 02: Curtains & Window Couture
// ----------------------------------------------------
export const LIVING_ROOM_SECTION: EditorialSectionData = {
  id: 'curtains',
  title: {
    en: 'Curtains & Window Couture',
    ar: 'الستائر وأناقة النوافذ'
  },
  lifestyleImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop',
  lifestyleHeading: {
    en: 'Light, Privacy & Quiet Luxury',
    ar: 'ضوء وخصوصية وفخامة هادئة'
  },
  lifestyleSubtitle: {
    en: 'Blackout, sheer and custom-made drapes tailored to the exact millimetre for villas and apartments across Riyadh.',
    ar: 'ستائر معتمة وشفافة ومفصلة بالمليمتر للفلل والشقق في جميع أنحاء الرياض.'
  },
  lifestyleCta: {
    en: 'Explore Curtain Collection',
    ar: 'اكتشف مجموعة الستائر'
  },
  lifestyleBadge: {
    en: 'WINDOW ATELIER',
    ar: 'أتيليه النوافذ'
  },
  lifestyleLink: '/category/curtains',
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
      id: 'custom-curtains',
      name: { en: 'Custom Curtains', ar: 'ستائر حسب الطلب' },
      image: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?q=80&w=800&auto=format&fit=crop',
      tag: { en: 'Made to Measure', ar: 'تفصيل بالمقاس' }
    },
    {
      id: 'ready-made-curtains',
      name: { en: 'Ready-Made Curtains', ar: 'ستائر جاهزة' },
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
      tag: { en: 'Hang Today', ar: 'علّقها اليوم' }
    }
  ],
  topPicks: curtainTopPicks
};

// ----------------------------------------------------
// SECTION 03: The Complete Home (sofa + curtain pairings)
// ----------------------------------------------------
export const BEDROOM_SECTION: EditorialSectionData = {
  id: 'pairings',
  title: {
    en: 'Complete the Look',
    ar: 'أكمل الإطلالة'
  },
  lifestyleImage: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=1600&auto=format&fit=crop',
  lifestyleHeading: {
    en: 'Sofas & Curtains, Designed Together',
    ar: 'كنب وستائر بتصميم متناغم'
  },
  lifestyleSubtitle: {
    en: 'Our stylists pair upholstery tones with drape textures so every room feels calm, cohesive and unmistakably yours.',
    ar: 'خبراء التنسيق لدينا يزاوجون ألوان الكنب مع ملمس الستائر ليبدو كل ركن هادئاً ومتناسقاً ويعكس ذوقك.'
  },
  lifestyleCta: {
    en: 'Shop Complete Pairings',
    ar: 'تسوق الأطقم المتناسقة'
  },
  lifestyleBadge: {
    en: 'STYLE EDIT',
    ar: 'تشكيلة التنسيق'
  },
  lifestyleLink: '/shop',
  subcategories: [
    {
      id: 'sofas',
      name: { en: 'Sofas', ar: 'الكنب' },
      image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=800&auto=format&fit=crop',
      tag: { en: 'Everyday Luxury', ar: 'فخامة يومية' }
    },
    {
      id: 'blackout-curtains',
      name: { en: 'Blackout Drapes', ar: 'ستائر معتمة' },
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
      tag: { en: 'Cooler Rooms', ar: 'غرف أكثر برودة' }
    },
    {
      id: 'sheer-curtains',
      name: { en: 'Sheer Layers', ar: 'طبقات شفافة' },
      image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800&auto=format&fit=crop',
      tag: { en: 'Soft Daylight', ar: 'ضوء ناعم' }
    },
    {
      id: 'accent-chairs',
      name: { en: 'Accent Chairs', ar: 'كراسي الديكور' },
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800&auto=format&fit=crop',
      tag: { en: 'Finishing Touch', ar: 'اللمسة الأخيرة' }
    }
  ],
  topPicks: [
    SOFA_PRODUCTS[1],
    curtainTopPicks[1],
    SOFA_PRODUCTS[6],
    curtainTopPicks[0],
    SOFA_PRODUCTS[8]
  ]
};

// ----------------------------------------------------
// SECTION 04: Custom Atelier
// ----------------------------------------------------
export const MODERN_BLINDS_SECTION: EditorialSectionData = {
  id: 'atelier',
  title: {
    en: 'The Sofalora Atelier',
    ar: 'أتيليه سوفالورا'
  },
  lifestyleImage: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1600&auto=format&fit=crop',
  lifestyleHeading: {
    en: 'Made to Your Measure, Finished by Hand',
    ar: 'مفصّل على مقاسك وبلمسات يدوية'
  },
  lifestyleSubtitle: {
    en: 'Custom sofa sizes, bespoke majlis layouts and made-to-measure curtains — all measured in your home and tailored in our Riyadh atelier.',
    ar: 'مقاسات كنب مخصصة وتخطيطات مجالس فريدة وستائر مفصلة على المقاس — بقياس في منزلك وتنفيذ في أتيليهنا بالرياض.'
  },
  lifestyleCta: {
    en: 'Book a Design Consultation',
    ar: 'احجز استشارة تصميم'
  },
  lifestyleBadge: {
    en: 'BESPOKE SERVICE',
    ar: 'خدمة التفصيل الخاصة'
  },
  lifestyleLink: '/category/custom-curtains',
  subcategories: [
    {
      id: 'sectional-sofas',
      name: { en: 'Custom Sectionals', ar: 'كنب مقسم بالطلب' },
      image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=800&auto=format&fit=crop',
      tag: { en: 'Your Dimensions', ar: 'بمقاساتك' }
    },
    {
      id: 'majlis-sofas',
      name: { en: 'Bespoke Majlis', ar: 'مجالس حسب الطلب' },
      image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=800&auto=format&fit=crop',
      tag: { en: 'Hand Finished', ar: 'تشطيب يدوي' }
    },
    {
      id: 'custom-curtains',
      name: { en: 'Made-to-Measure Drapes', ar: 'ستائر بالمقاس' },
      image: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?q=80&w=800&auto=format&fit=crop',
      tag: { en: 'Laser Measured', ar: 'قياس ليزري' }
    },
    {
      id: 'curtains',
      name: { en: 'Fabric Library', ar: 'مكتبة الأقمشة' },
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
      tag: { en: '120+ Weaves', ar: 'أكثر من ١٢٠ نسيج' }
    }
  ],
  topPicks: [
    SOFA_PRODUCTS[11],
    SOFA_PRODUCTS[4],
    curtainTopPicks[3],
    SOFA_PRODUCTS[9],
    curtainTopPicks[2]
  ]
};

// ----------------------------------------------------
// CURATED COLLECTION SECTION
// ----------------------------------------------------
export const CURATED_COLLECTION = {
  eyebrow: {
    en: 'Curated for Your Home',
    ar: 'مختارات لمنزلك'
  },
  title: {
    en: 'Sofa & Curtain Pairings',
    ar: 'تنسيقات الكنب والستائر'
  },
  description: {
    en: 'Warm neutrals, sculpted seating and fluid drapery. Each pairing is styled by our Riyadh atelier to bring calm, depth and everyday luxury to your rooms.',
    ar: 'درجات محايدة دافئة وكنب منحوت وستائر منسدلة. كل تنسيق من أتيليهنا بالرياض يمنح غرفك هدوءاً وعمقاً وفخامة يومية.'
  },
  cta: {
    en: 'Explore Pairings',
    ar: 'اكتشف التنسيقات'
  },
  heroImage: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=1200&auto=format&fit=crop',
  items: [
    {
      id: 'natural-1',
      title: { en: 'Ivory Bouclé & Linen Sheer', ar: 'بوكليه عاجي وشيفون كتاني' },
      tag: { en: 'Soft Neutrals', ar: 'درجات ناعمة' },
      price: 'From SAR 3,890',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=700&auto=format&fit=crop'
    },
    {
      id: 'natural-2',
      title: { en: 'Emerald Velvet & Bronze Track', ar: 'مخمل زمردي وسكة برونزية' },
      tag: { en: 'Majlis Heritage', ar: 'تراث المجالس' },
      price: 'From SAR 5,450',
      image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=700&auto=format&fit=crop'
    },
    {
      id: 'natural-3',
      title: { en: 'Camel Leather & Blackout Drape', ar: 'جلد جملي وستارة معتمة' },
      tag: { en: 'Warm Contrast', ar: 'تباين دافئ' },
      price: 'From SAR 9,450',
      image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=700&auto=format&fit=crop'
    }
  ]
};

// ----------------------------------------------------
// FULL-WIDTH PROMOTIONAL BANNER
// ----------------------------------------------------
export const PROMOTIONAL_BANNER = {
  eyebrow: {
    en: 'THE RIYADH HOME EDIT',
    ar: 'تشكيلة المنازل الرياضية'
  },
  title: {
    en: 'Dress Your Home in Sofalora',
    ar: 'زيّن منزلك مع سوفالورا'
  },
  subtitle: {
    en: 'Save up to 20% when you pair a sofa with made-to-measure curtains. Complimentary in-home measurement and styling across Riyadh.',
    ar: 'وفّر حتى ٢٠٪ عند تنسيق كنبة مع ستائر مفصلة على المقاس. قياس وتنسيق منزلي مجاني في الرياض.'
  },
  cta: {
    en: 'Shop New Arrivals',
    ar: 'تسوق الجديد'
  },
  secondaryCta: {
    en: 'Book a Home Visit',
    ar: 'احجز زيارة منزلية'
  },
  badge: {
    en: 'COMPLIMENTARY CONSULTATION',
    ar: 'استشارة مجانية'
  },
  image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1920&auto=format&fit=crop'
};
